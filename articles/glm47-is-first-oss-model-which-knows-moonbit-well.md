---
title: "GLM 4.7を使ってMoonbitでjsライブラリを書いてみた"
emoji: "🐰"
type: "tech" 
topics: ["moonbit","js","shift-jis"] 
published: false
---

## まとめ

1. MoonbitのVibingでShift_JIS decoderをつくりました
2. Opus4.5とz.aiのGLM 4.7を利用しました
3. 主観ベースだとGLM悪くないです

## encoding_sjis
成果物は以下
@[card](https://github.com/f4ah6o/encoding_sjis.mbt)
別のツールから利用しており一応の動作を確認しています。

## Opus4.5とz.aiのGLM 4.7
当初はPlanをOpus、実装をGLMのように分けていましたが、Opusの利用制限に達してからはGLMで
進めました。

GLMはMoonbitに詳しいそうです。

@[card](https://x.com/bobzhang1988/status/2005200552200921304)

Claude CodeでGLMを使うには環境変数の設定などが必要ですが、切り替えの使い勝手とAPI keyの保全を両立するために1password cliのラッパーを作成しました。

以下記事で紹介しています。`opz z.ai -- claude`でGLMが使えるようにしています。

@[card](https://zenn.dev/f12o/articles/opz-is-1password-cli-wrapper)

## GLMの感想

サブスクリプションでクラウド版を利用しました。
かなり使ったつもりでも5h制限や週間制限まで使い切れませんでした。

あるときは1h近く走り続けることがありました。

また、いろいろやったけどできませんでした！と報告してくることがあり、好印象でした。
@[card](https://github.com/f4ah6o/yyjj.mbt/issues/18)
