---
title: "`u-ichi/reviewable-html-workbench`を参考にWebアプリに注釈機能をつけるViteプラグインをつくりました"
emoji: "😽" # アイキャッチとして使われる絵文字（1文字だけ）
type: "tech" # tech: 技術記事 / idea: アイデア記事
topics: ["vite", "plugin", "frontend"] # タグ。["markdown", "rust", "aws"]のように指定する
published: false # 公開設定（falseにすると下書き）
---

## 成果物

Webアプリに注釈とコメントの機能を追加する Vite プラグインを作りました。
既存の画面にレイヤーを重ね、右下のボタンから対象要素や画面範囲を選んでコメントできます。

@[card](https://github.com/f4ah6o/markable)

動くサンプルはこちらです。
別の方が作ったサンプルページに Markable を追加しています。

https://f4ah6o.github.io/markable/

Vue Todo デモでは、このように既存の画面へ注釈 UI を重ねています。

![Vue Todo デモに Markable の注釈 UI を重ねた画面](/images/markable-vite-plugin/vue-todo-markable.png)

オリジナルのサンプルページと並べると、アプリ本体はそのままで、右下に feedback ボタンだけが追加されていることがわかります。

![オリジナルの Vue Todo デモと Markable を追加した Vue Todo デモの比較](/images/markable-vite-plugin/vue-todo-original-vs-markable.png)

本番向けの feedback モードでは、右下にフィードバック送信用のボタンを表示します。

![Vue Todo デモに feedback ボタンを表示した画面](/images/markable-vite-plugin/feedback-button.png)

コメント対象は、DOM 要素として選ぶことも、画面上の矩形範囲として選ぶこともできます。

![要素選択と Box 選択をしている Markable の画面](/images/markable-vite-plugin/element-and-box-selection.png)

登録後は、最近のマークとして画面上に残ります。
JSON ボタンから、対象要素やビューポートなどを含むデータをコピーできます。

![Markable で登録したコメントが最近のマークとして表示された画面](/images/markable-vite-plugin/after-save.png)

## きっかけ

Codex app の In-app ブラウザにある注釈機能が便利だと思っていたところ、次のポストを見つけました。

@[card](https://x.com/u1/status/2065832522198761650)

リポジトリはこちらです。
MIT ライセンスで公開されています。

@[card](https://github.com/u-ichi/reviewable-html-workbench)

skill として使ってみると、ポストのスクリーンショットに近い見た目で注釈が生成されました。
この UX は AI と人間のやり取りだけでなく、人間同士の不具合報告、要望、フィードバックにも使えそうだと感じました。

## Vite プラグインにした理由

欲しかったのは、アプリの本体とは別に差し込める注釈レイヤーです。

開発中のレビューでも、運用中のフィードバックでも、必要な操作はあまり変わりません。
起動するボタンがあり、画面上の要素や範囲を選び、コメントを入力できればよいはずです。

そのため、できるだけ既存の実装を触らずに追加できる形にしたくなりました。
最初に思いついたのが Vite プラグインです。
Vite のアプリであれば、プラグインを設定するだけで同じ注釈 UI を追加できます。

## 実装まで

ChatGPT の Web チャットに相談したところ、Vite プラグインとして実装できそうだとわかりました。
そのまま GitHub プラグインからリポジトリを操作し、コードまで書いてもらいました。

リポジトリの作成と GitHub Pages の設定は、iPhone のブラウザから行いました。
パソコンを開かなくても、GitHub Pages にデプロイしたサンプルページまで確認できました。
