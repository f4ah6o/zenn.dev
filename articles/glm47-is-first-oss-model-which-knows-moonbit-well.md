---
title: "GLM 4.7を使ってMoonBitでjsライブラリを書いてみた"
emoji: "🐰"
type: "tech" 
topics: ["moonbit","js","shift-jis"] 
published: false
---

別のツールでShift_JIS対応が必要になり、MoonBitでdecoderを実装しました。実装にはClaude Opus 4.5とz.ai（智譜AI）のGLM 4.7を使い分けて進めました。

## まとめ

1. MoonBitでVibing（AIとの対話による開発）してShift_JIS decoderをつくりました
2. Opus 4.5とz.aiのGLM 4.7を利用しました
3. GLMはMoonBitの実装で実用的に使えました

## encoding_sjis
成果物は以下
@[card](https://github.com/f4ah6o/encoding_sjis.mbt)
別のツールから利用しており、動作確認済みです。

## Opus 4.5とz.aiのGLM 4.7
当初はPlanをOpus、実装をGLMのように分けていましたが、Opusの利用制限に達してからはGLMで
進めました。

MoonBit作者のBob Zhang氏がGLMはMoonBitに詳しいと述べています。

@[card](https://x.com/bobzhang1988/status/2005200552200921304)

Claude CodeでGLMを使うには環境変数の設定などが必要ですが、切り替えの使い勝手とAPI keyの保全を両立するために1password cliのラッパーを作成しました。

以下記事で紹介しています。`opz z.ai -- claude`でGLMが使えるようにしています。

@[card](https://zenn.dev/f12o/articles/opz-is-1password-cli-wrapper)

## GLMの感想

サブスクリプションでクラウド版を利用しました。
かなり使いましたが、5h制限や週間制限に達することはありませんでした。

あるときは1h近く走り続けることがありました。

また、いろいろやったけどできませんでした！と報告してくることがあり、好印象でした。
@[card](https://github.com/f4ah6o/yyjj.mbt/issues/18)
