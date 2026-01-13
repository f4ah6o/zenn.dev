---
title: MoonBitでPBTを実行する
---
# PBT with MBT

## MoonBitのPBT環境について

MoonBitは新興の言語ですが、うれしいことに公式がPBTライブラリを開発しています。
![card](https://github.com/moonbitlang/quickcheck)

ただ言語自体がまだ安定していないため、moonbitlang/quickcheck もドキュメントが古い箇所があります。

この本では`moonbitlang/quickcheck@0.9.10`を利用します。

## 

```bash
moon new <project name>
cd <project name>
```

## \*.mbt.md
`moon new <path>`で生成されるREADME.mbt.mdは通常のMarkdownとして動作しますが、コードブロックが`moon check`や`moon test`の対象となります。
この本も実行可能になればよかったのですが、残念ながらzenn.devの仕様に合わず動作しません。代わりにGitHubのこの本のリポジトリは`moon test`を利用できるように作成していを利用できるように作成しています。

