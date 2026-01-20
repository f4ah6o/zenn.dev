---
title: "MoonBitからDuckDB-Wasmを利用してみた"
emoji: "🐇"
type: "tech" # tech: 技術記事 / idea: アイデア
topics: ["moonbit", "duckdb", "vibecoding"]
published: false
---
## 概要

## Coding Agent

1. Codex(GPT-5.2-Codex xhigh)
2. Claude Code(Opus 4.5)
  * 主にPlan mode
3. Claude Code(GLM 4.7)
  * 実装時に利用
  * APIトークンは1Passwordに保存して[自前のラッパーcli]()で切り替えています

### Skills

* ![card](https://github.com/moonbitlang/moonbit-agent-guide)
  * [fork](https://github.com/f4ah6o/moonbit-agent-guide)してClaude CodeはMarketplaceからUpdateできるようにしました。
  * Claude Codeはいまいち認識してくれず、いちいちSkillのパスをプロンプトに入れています。
  * Codexは`$skill-installer install <repo url>`でインストールできて、勝手に使ってます。

## 注意事項


