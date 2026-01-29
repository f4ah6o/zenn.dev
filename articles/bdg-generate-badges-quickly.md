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

@[card](https://github.com/f4ah6o/bdg-rs)

## 機能

- JavaScript(Node), Rust, Moonbitを認識
- ライセンス、GitHub Actionsも認識
- README.mdにShields.ioの形式のリンクを自動挿入

## 使い方

インストールは`cargo`をつかいます。
```bash
cargo install bdg
```

実行
```bash
bdg add
```



