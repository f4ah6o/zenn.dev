#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const args = process.argv.slice(2);
const options = {
  staged: false,
  watch: false,
  intervalMs: 1000,
};

for (let i = 0; i < args.length; i += 1) {
  const arg = args[i];
  if (arg === "--staged") {
    options.staged = true;
  } else if (arg === "--watch") {
    options.watch = true;
  } else if (arg === "--interval") {
    const value = Number(args[i + 1]);
    if (!Number.isFinite(value) || value <= 0) {
      console.error("Invalid --interval value.");
      process.exit(1);
    }
    options.intervalMs = value;
    i += 1;
  } else if (arg === "--help" || arg === "-h") {
    printHelp();
    process.exit(0);
  } else {
    console.error(`Unknown argument: ${arg}`);
    printHelp();
    process.exit(1);
  }
}

const repoRoot = getRepoRoot();
process.chdir(repoRoot);

if (options.watch && options.staged) {
  console.error("Cannot combine --watch with --staged.");
  process.exit(1);
}

if (options.watch) {
  runWatch(options.intervalMs);
} else if (options.staged) {
  syncStaged();
} else {
  syncAll();
}

function printHelp() {
  console.log(`Usage:
  node scripts/mbt-sync.js            Sync all *.mbt.md to *.md
  node scripts/mbt-sync.js --staged   Sync only staged *.mbt.md and stage *.md
  node scripts/mbt-sync.js --watch    Watch *.mbt.md and keep *.md in sync
  node scripts/mbt-sync.js --interval 1000  Watch interval in ms (with --watch)
`);
}

function getRepoRoot() {
  const result = spawnSync("git", ["rev-parse", "--show-toplevel"], {
    encoding: "utf8",
  });
  if (result.status !== 0) {
    return process.cwd();
  }
  return result.stdout.trim() || process.cwd();
}

function runGit(args) {
  const result = spawnSync("git", args, { encoding: "utf8" });
  if (result.status !== 0) {
    const message = result.stderr.trim() || "git command failed";
    throw new Error(message);
  }
  return result.stdout;
}

function isTracked(filePath) {
  const result = spawnSync("git", ["ls-files", "--error-unmatch", "--", filePath], {
    encoding: "utf8",
  });
  return result.status === 0;
}

function toPosixPath(filePath) {
  return filePath.split(path.sep).join(path.posix.sep);
}

function mbtToMdPath(filePath) {
  if (!filePath.endsWith(".mbt.md")) {
    return null;
  }
  return filePath.replace(/\.mbt\.md$/, ".md");
}

function copyMbtToMd(srcAbsPath, dstAbsPath) {
  const srcData = fs.readFileSync(srcAbsPath);
  if (fs.existsSync(dstAbsPath)) {
    const dstData = fs.readFileSync(dstAbsPath);
    if (Buffer.compare(srcData, dstData) === 0) {
      return false;
    }
  }
  fs.mkdirSync(path.dirname(dstAbsPath), { recursive: true });
  fs.writeFileSync(dstAbsPath, srcData);
  return true;
}

function removeMdFile(absPath) {
  if (!fs.existsSync(absPath)) {
    return false;
  }
  fs.unlinkSync(absPath);
  return true;
}

function syncStaged() {
  const entries = getStagedEntries();
  if (entries.length === 0) {
    return;
  }

  for (const entry of entries) {
    if (entry.status === "D") {
      deleteForPath(entry.file, true);
    } else if (entry.status === "R") {
      deleteForPath(entry.from, true);
      copyForPath(entry.to, true);
    } else if (entry.status === "C") {
      copyForPath(entry.to, true);
    } else {
      copyForPath(entry.file, true);
    }
  }
}

function copyForPath(relativeMbtPath, stage) {
  const dstRelative = mbtToMdPath(relativeMbtPath);
  if (!dstRelative) {
    return;
  }
  const srcAbs = path.resolve(repoRoot, relativeMbtPath);
  const dstAbs = path.resolve(repoRoot, dstRelative);
  if (!fs.existsSync(srcAbs)) {
    return;
  }
  copyMbtToMd(srcAbs, dstAbs);
  if (stage) {
    runGit(["add", "--", toPosixPath(dstRelative)]);
  }
}

function deleteForPath(relativeMbtPath, stage) {
  const dstRelative = mbtToMdPath(relativeMbtPath);
  if (!dstRelative) {
    return;
  }
  const dstAbs = path.resolve(repoRoot, dstRelative);
  removeMdFile(dstAbs);
  if (stage && isTracked(dstRelative)) {
    runGit(["rm", "--cached", "--", toPosixPath(dstRelative)]);
  }
}

function getStagedEntries() {
  let output = "";
  try {
    output = runGit(["diff", "--cached", "--name-status", "-z", "--", "*.mbt.md"]);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
  if (!output) {
    return [];
  }
  const parts = output.split("\0").filter((part) => part.length > 0);
  const entries = [];
  for (let i = 0; i < parts.length; ) {
    const status = parts[i++];
    if (!status) {
      continue;
    }
    if (status.startsWith("R") || status.startsWith("C")) {
      const from = parts[i++] || "";
      const to = parts[i++] || "";
      entries.push({ status: status[0], from, to });
    } else {
      const file = parts[i++] || "";
      entries.push({ status: status[0], file });
    }
  }
  return entries;
}

function syncAll() {
  const files = collectMbtFiles(repoRoot);
  for (const filePath of files) {
    const relativePath = path.relative(repoRoot, filePath);
    copyForPath(relativePath, false);
  }
}

function runWatch(intervalMs) {
  console.log(`[mbt-sync] watching *.mbt.md every ${intervalMs}ms`);
  const lastSeen = new Map();

  const tick = () => {
    const files = collectMbtFiles(repoRoot);
    const seen = new Set();

    for (const filePath of files) {
      const relativePath = path.relative(repoRoot, filePath);
      let stat;
      try {
        stat = fs.statSync(filePath);
      } catch (error) {
        continue;
      }
      const currentMtime = stat.mtimeMs;
      const previousMtime = lastSeen.get(relativePath);

      seen.add(relativePath);
      if (previousMtime === undefined || currentMtime > previousMtime) {
        copyForPath(relativePath, false);
        lastSeen.set(relativePath, currentMtime);
      }
    }

    for (const knownPath of Array.from(lastSeen.keys())) {
      if (!seen.has(knownPath)) {
        deleteForPath(knownPath, false);
        lastSeen.delete(knownPath);
      }
    }
  };

  tick();
  setInterval(tick, intervalMs);
}

function collectMbtFiles(rootDir) {
  const results = [];
  const stack = [rootDir];

  while (stack.length > 0) {
    const dir = stack.pop();
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.isDirectory()) {
        if (entry.name === ".git" || entry.name === "node_modules") {
          continue;
        }
        stack.push(path.join(dir, entry.name));
      } else if (entry.isFile() && entry.name.endsWith(".mbt.md")) {
        results.push(path.join(dir, entry.name));
      }
    }
  }

  return results;
}
