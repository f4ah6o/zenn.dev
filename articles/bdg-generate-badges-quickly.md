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
こういうのをたまに作りたくなるのですが、検索性が悪い上に作り方もよくわからない！ということである程度覚えやすく、自動化できるようになりました。

## 成果物

@[card](https://github.com/f4ah6o/bdg-rs)

## 機能

自分がよく使うパッケージレジストリ等に対応させています。
- JavaScript(Node), Rust, Moonbitを認識
- ライセンス、GitHub Actionsも認識
- README.mdにShields.ioの形式のリンクを自動挿入

## 使い方

インストールは`cargo`をつかいます。
```bash
cargo install bdg
```

### 実行
```bash
bdg add
```

コマンドは覚えられないのでTUIでインタラクティブに実行します。

### 削除

```bash
bdg remove
```
