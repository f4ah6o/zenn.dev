---
title: "AletheiaでPBTを回す最小ワークフロー（MoonBit）"
emoji: "📘"
type: "tech" # tech: 技術記事 / idea: アイデア
topics: ["moonbit", "pbt", "testing", "cli"]
published: false
---

## はじめに

MoonBit で PBT（Property-Based Testing）を始めたいけど、何から手を付ければいいかわからない…という方向けに、Aletheia の最小ワークフローをまとめます。  
この記事は `../moonbit/aletheia.mbt/` にある Aletheia 本体と、それを使う agent skill（`aletheia-pbt`）の役割にフォーカスします。  
※パス表記は**手元の配置**に合わせています。読み替える場合は、Aletheia のローカル配置を置き換えてください。Agent skills の概念は理解している前提です。

## この記事でわかること

- PBT のざっくり理解（最低限）
- Aletheia の役割と最短フロー
- `aletheia-pbt` skill の使いどころ

## この記事でわからないこと

- PBT の理論的な背景や深いテクニック
- Aletheia の内部実装の詳細
- shrink 戦略やジェネレータ設計の高度な話

## 対象読者

- MoonBit を触っている（またはこれから触る）
- PBT は名前だけ知っている
- Aletheia をどう回せばよいか知りたい

## 前提

- MoonBit の基本的なビルド/実行は触ったことがある
- テストは最低限 `moon test` を回した経験がある

## まず PBT を最短で掴む

- **PBT（Property-Based Testing）**は「個別の入力例」ではなく「**性質（property）**」をテストする。
- 入力は**自動生成**され、失敗すると**縮小（shrink）**されて最小の反例が提示される。
- 例: 「`encode`したものを`decode`すると元に戻る」などが property。

ここでは**PBTの詳細理論ではなく、Aletheiaで回す実務フローに集中**します。

## Aletheia とは

Aletheia は MoonBit のソースから**PBTコードを自動生成**するツールです。検出できる典型パターン（round-trip / idempotent / producer-consumer / invariant / oracle）を見つけて、`.pbt.mbt.md` に**テンプレートを生成**し、そこから**各パッケージのテストへ同期**します。

Aletheia の中身（`../moonbit/aletheia.mbt/`）はだいたい次の構造で理解すれば十分です:

- `analyzer/`: 関数抽出や Arbitrary 判定などの解析
- `patterns/`: PBT パターン検出
- `generator/`: PBT テンプレート生成
- `pbt/`: 実行ランタイム（生成 / shrink / 実行）
- `pbt_sync/`: `.pbt.mbt.md` の同期
- `state_machine/`: ステートマシンテスト
- `src/aletheia.pbt.mbt.md`: PBTターゲットの集約

## Aletheia の最短フロー（CLI）

Aletheia を直接使うときの流れはこれだけ覚えれば十分です:

```bash
# 1) 解析（任意）: どのパターンが検出されるか確認
moon run src/aletheia -- analyze <path> --explain

# 2) 生成: .pbt.mbt.md を作る/更新する
moon run src/aletheia -- generate <path>

# 3) 同期: .pbt.mbt.md からテストへ同期
moon run src/aletheia -- sync <path>
```

Aletheia は `.pbt.mbt.md` に自動生成ブロックを作ります。ブロックの外側は**手で調整してOK**で、内側は再生成で上書きされます。

### 生成物の扱い（最低限）

- **自動生成部分**: `<!-- aletheia:begin -->` ～ `<!-- aletheia:end -->`
- **手修正は外側に置く**: 必要な property の補強・型の修正は外側に追加
- **生成を前提とする**: 生成は繰り返されるので「テンプレート」として扱う

## agent skill: `aletheia-pbt` の役割

`aletheia-pbt` は「**Aletheiaを使って `.pbt.mbt.md` を作り、同期まで回す**」ための skill です。目的は**PBTの生成/同期を確実に実行すること**で、Aletheia 自体の開発ではありません。

### 使いどころ

- 自分のMoonBitモジュール/パッケージで PBT を**導入したい**
- `.pbt.mbt.md` を**新規作成**または**再生成**したい
- 手で修正したテンプレートを**同期してテスト化**したい

### 使い方（最短）

```bash
# Aletheiaをmoonに追加（未導入なら）
moon add f4ah6o/aletheia

# 解析
moon run f4ah6o/aletheia/aletheia -- analyze <path> --explain

# 生成
moon run f4ah6o/aletheia/aletheia -- generate <path>

# 同期
moon run f4ah6o/aletheia/aletheia -- sync <path>
```

Aletheia のローカル repo があるなら、`../moonbit/aletheia.mbt/` で `moon run src/aletheia` を使ってもよいです。

## PBTに慣れていない人向けの注意点

- **最初はRound-Tripだけで良い**: `encode/decode` や `to/from` だけでも十分効果が出ます。
- **型エラーは自然**: 生成テンプレートは叩き台です。型や前提条件の修正は前提です。
- **まず失敗を1件見る**: shrink された最小ケースを見ると「PBTの価値」が体感できます。
- **性質は小さく**: 1 property = 1 つの性質に分解します。

## 最短運用メモ

- まず `generate` で叩き台を出す
- 1〜2個の property を**動く状態**にする
- `sync` してテスト化
- 失敗例を見て、性質を調整

これで「PBTの導入体験」を最短で掴める。

## 補足: Aletheia の内部は深追いしない

PBT に慣れていない段階では、Aletheia の `patterns/` や `generator/` を深入りするより、**生成 → 失敗 → 修正**のループを先に体験するほうが理解が速いです。

---

## まとめ

- Aletheia は「PBTテンプレート生成 → 同期」までを支えるツール
- `aletheia-pbt` はそれを最短で回すための skill
- まずは小さく回して、反例の価値を体験するのが近道

必要になったら次に読む: `../moonbit/aletheia.mbt/README.mbt.md`（内部構成や CLI 詳細のまとめ）。
