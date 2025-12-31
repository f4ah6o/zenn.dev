---
title: "GLM 4.7を使ってMoonBitでjsライブラリを書いてみた"
emoji: "🐰"
type: "tech" 
topics: ["moonbit","js","shift-jis"] 
published: false
---

別のツールでShift_JIS対応が必要になり、MoonBitでdecoderを実装しました。実装にはClaude Opus 4.5とz.aiのGLM 4.7を使い分けて進めました。

## まとめ

1. MoonBitでVibingしてShift_JIS decoderをつくりました
2. Opus 4.5とz.aiのGLM 4.7を利用しました
3. GLMはMoonBitの実装で実用的に使えました

## encoding_sjis
成果物は以下で
@[card](https://github.com/f4ah6o/encoding_sjis.mbt)
別のツールから利用しており、一応の動作は確認しています。

## Opus 4.5とz.aiのGLM 4.7
当初はPlanをOpus、実装をGLMのように分けていましたが、Opusの利用制限に達してからはGLMで
進めました。

MoonBitのHongbo Zhang氏がGLMはMoonBitに詳しい最初のoss llm modelだポストしていました。

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

## Why MoonBit

[Jw_cad](https://www.jwcad.net)という2D CADソフトがあるのですが、おそらく日本でしか利用されていないため関連するOSSが
少ない状況です。
そこでGoでparserをつくり、なんとか動くようになったものの、browser viewerで躓いておりました。

今回休暇の間にClaudeのHoliday giftやGLMのサブスクの割引があったので、試しにMoonBitでやってみたところうまくいってしまいました。

1. Goで[jww parser](https://github.com/f4ah6o/jww-parser)を実装
2. [MoonBitにport](https://github.com/f4ah6o/jww_parser.mbt)
3. [SVGのViewer](https://github.com/f4ah6o/svg_jww.mbt)
