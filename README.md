# Zenn CLI

* [📘 How to use](https://zenn.dev/zenn/articles/zenn-cli-guide)

## MoonBit article sync

This repo treats `*.mbt.md` as the source and copies them to `*.md` so deploys do not rely on symlinks.

### Setup (git hook)

Enable the shared pre-commit hook so staged `*.mbt.md` are copied and staged as `*.md`:

```
git config core.hooksPath .githooks
```

### Preview (watch sync)

Run Zenn preview with a watcher that keeps `*.md` in sync:

```
node scripts/mbt-preview.sh
```

### One-off sync

```
node scripts/mbt-sync.js
```
