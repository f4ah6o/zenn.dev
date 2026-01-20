---
title: "MoonBitからDuckDB-Wasmを利用してみた"
emoji: "🐇"
type: "idea" # tech: 技術記事 / idea: アイデア
topics: ["moonbit", "duckdb", "vibecoding"]
published: true
---
## 概要

DuckDB-Wasmをブラウザで使用して、ParquetファイルをDuckDBに読み込んでSQLクエリを実行できます。
@voluntasさんのこちらのリポジトリをMoonBitにportingしました。
@[card](https://github.com/voluntas/duckdb-wasm-parquet)
コードはApache-2.0、ParquetファイルはCC BY-NC-ND 4.0でライセンスされており、今回利用させていただきました。

## 成果物

GitHub Pagesでアプリが動きます。
@[card](https://f4ah6o.github.io/duckdb_wasm_parquet.mbt/)

リポジトリはこちら。ローカルでも実行できます。
@[card](https://github.com/f4ah6o/duckdb_wasm_parquet.mbt)

またMoonBit DuckDB client API(driver)をつくっています。
@[card](https://github.com/f4ah6o/duckdb.mbt)

Vibe codingなので恐縮ですが、テストを増やしてちゃんと動作するように作っていきます。

## 終わり

ご覧いただきありがとうございました！
コードはGPT-Codex-5.2, Opus4.5(claude code, antigravity), GLM4.7, Gemini(Deep Research, NotebookLM)を使いました。
この文章は手打ちです。

