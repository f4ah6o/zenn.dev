#!/usr/bin/env node
"use strict";

const { spawn } = require("child_process");
const path = require("path");

const args = process.argv.slice(2);
const syncScript = path.join(__dirname, "mbt-sync.js");

const watcher = spawn(process.execPath, [syncScript, "--watch"], {
  stdio: "inherit",
});

const preview = spawn("pnpx", ["zenn-cli", "preview", ...args], {
  stdio: "inherit",
});

let exiting = false;

function shutdown(signal) {
  if (exiting) {
    return;
  }
  exiting = true;
  if (watcher && !watcher.killed) {
    watcher.kill("SIGTERM");
  }
  if (signal && preview && !preview.killed) {
    preview.kill(signal);
  }
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

preview.on("exit", (code, signal) => {
  shutdown(signal);
  if (signal) {
    process.exit(1);
  }
  process.exit(code == null ? 1 : code);
});
