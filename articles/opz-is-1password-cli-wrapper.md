`op run`を使うと1Passwordで管理しているSecretsを環境変数にそのまま使うことができます。
パスワードやAPIトークンを平文で保存する必要がなくなり、不可欠なツールになっています。
ただ以下のような不便さを感じるようになり、脳に収まるop run CLI wrapperを作りました。

## `op run`のつらさ
1. 毎回`.env` 容易するの面倒
2. 環境変数名覚えられない
3. `op://foo/bar/baz`長くて覚えられない。日本語で保存するとitemのidが入るので毎回コピペが必要になる
4. `op run --env-file foo -- bar`長い

## ゴール
```bash
opx foo -- bar
```
* 同じような動機でcrates.ioで`opx`は使われていたので、Nextぐらいの感覚で`opz`に変更した

### 覚えられるもの
* foo: 1Passwordに保存した項目名
* bar: コマンド名

### 覚えられないもの
see `op run`のつらさ

## 1Passwordでの設定

1. ラベル(field)に環境変数名を入力する
2. 秘密情報でなくても同じように登録する（URLとか）
3. 項目名を覚えやすいものにする。日本語OK

## 動作フロー
opが使える状態であることが前提です。
コマンド実行
```bash
opz foo -- bar
```
1. `op item list`で一覧を取得しfooで検索
2. `op item get`でfieldを取得し`op://`形式でenv情報を構築
3. .envファイルを生成
4. `op run --env-file .env -- bar`を実行
