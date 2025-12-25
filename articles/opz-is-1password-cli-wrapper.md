# 1password-cli`op`の不便さを解消するCLIラッパー`opz`を作った

1Password CLIの`op`コマンドを使うと、1Passwordに保存しているシークレットを環境変数としてそのまま利用できます。
パスワードやAPIトークンを平文で保存せず、セキュリティ的に安心です。

ですが、実際に使ってみて不便さを感じ、CLIラッパーの`opz`を作りました。

@[card](https://github.com/f4ah6o/opz)

## `op run`のつらさ

1. 毎回`.env`を作成するのが面倒
2. 環境変数名を覚えられない
3. `op://<vault>/<item>/<field>`という参照パスが長くて覚えられない。特に日本語で項目名を保存するとIDが含まれるので、毎回コピペが必要
4. `op run --env-file <item-name> -- <command>`というコマンドが長く、タイプするのが大変

## `opz`のゴール

### 1. 無駄なくコマンドを実行したい

```bash
opz <item-name> -- <command>
```

項目名とコマンドを指定するだけ。

### 2. `.env`の生成

```bash
opz gen <item-name> [.env]
```

* 本当は`opx`という名前にしたかったのですが、既に存在していたので`opz`にしました

## 覚えること/覚えられること

* `<item-name>`: 1Passwordに登録した項目名
* `<command>`: 実行したいコマンド

## 1Passwordでの設定

コマンド実行に必要な環境変数はすべてitemに保存しておきます。

1. 各フィールドのラベルに環境変数名を入力する（例: `API_KEY`）
2. シークレット以外の情報も登録する（例: APIのURLなど）
3. アイテム名は覚えやすいものにする（日本語OK）

## 使い方

### 前提

* `op`を設定済み
* `cargo`

### インストール

```bash
cargo install opz
```

### 基本形

```bash
# 項目名を指定してコマンドを実行
opz <item-name> -- <command>
# opz run <item-name> -- <command>  # 同じ意味
```

### サブコマンド

```bash
# 項目をキーワード検索
opz find <keyword>

# .envファイルのみ生成
opz gen <item-name> [env file name]
```

## 動作フロー

コマンド実行時の内部処理は以下の通りです。

1. `op item list`で項目一覧を取得し、指定した項目名を検索
2. `op item get`で項目のフィールド情報を取得し、`op://`形式で参照文字列を構築
3. 環境変数をインラインで直接代入する時に`op read`を使用してコマンドを実行
  * 本当は`op run --env-file`を使いたかったが、Claudeで起動に失敗するため断念
