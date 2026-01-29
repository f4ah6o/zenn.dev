---
title: "Badgeをシュッとつくれるcliつくった"
emoji: "💎"
type: "tech" # tech: 技術記事 / idea: アイデア
topics: ["badge"]
published: true
---
READMEによくあるBadgeを簡単につくれるcli`bdg`をつくりました。
<!-- bdg:begin -->
[![crates.io](https://img.shields.io/crates/v/bdg.svg)](https://crates.io/crates/bdg)
[![CI](https://github.com/f4ah6o/bdg-rs/actions/workflows/rust.yaml/badge.svg)](https://github.com/f4ah6o/bdg-rs/actions/workflows/rust.yaml)
<!-- bdg:end -->

## 成果物
- javascript(package.json), Rust(Cargo.toml), Moonbit(moon.mod.json)を認識
- LicenseやGitHub Actionsも認識
- README.mdにShields.ioの形式のリンクを自動挿入

@[card](https://github.com/f4ah6o/bdg-rs)

## 使い方

インストールは`cargo`をつかいます。
```bash
cargo install bdg
```

実行
```bash
bdg add
```



