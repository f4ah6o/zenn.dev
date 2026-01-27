---
title: "Skillのインストールを簡単にするcliを作った"
emoji: "🪏"
type: "tech" # tech: 技術記事 / idea: アイデア
topics: ["agentskills"]
published: true
---

:::message alert
Agent skillsは便利ですが、セキュリティリスクも指摘されています。
信頼できない、または不明なソースからSkillを使用する必要がある場合は、細心の注意を払い、使用前に徹底的に監査してください(see [セキュリティに関する考慮事項
](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview#security-considerations))。
:::

## 概要

[Agent skills](https://agentskills.io/home)の管理に[Claude plugin marketplace](https://code.claude.com/docs/ja/plugin-marketplaces)を利用すると便利だったので、他のコーディングエージェント（`codex`,`opencode`,`antigravity`）でも利用できるCLIを作成しました。

Claude codeは標準機能を使えば良いので対象外です。プラグインに自動更新機能があるので他のエージェントも対応してほしいです。
Claude plugin marketplacesの仕様で管理すると複数のskillを一元管理できるメリットがあります。

:::details 参考（3rd party skillsの管理）
自分用のskill管理リポジトリでは、他の方が作成したskillの更新チェックをスクリプトとGitHub Actionsでおこなっています。
@[card](https://github.com/f4ah6o/skills-bonsai)
:::

## 成果物

`cargo`でインストールできます。
@[card](https://github.com/f4ah6o/skop-rs)

## 使い方

### インストール

```bash
cargo install skop
```

### スキルのインストール

リポジトリの`.claude-plugin/marketplace.json`を利用します。
実行ディレクトリ直下にエージェントごとにディレクトリを作成してcloneします。

```bash
# mean github.com/owner/repo
skop add <owner>/<repo>
```

### 実行例

marketplace.jsonのpluginsに定義されているskill(plugin)情報を利用します。
plugin marketplacesの仕様上はMCPなどskill以外にも利用できますが`skop`ではskill前提で動作します。
頻繁に使わないコマンドは使い方を忘れるので、インタラクティブに設定を進められるようにしました。

以下は自分用Skillでの実行例です。プラグインなら自分が管理していないSkillも含められるんです！
コピーするとどうしても最新に追従する必要がありますが、その手間を省くことができます。
```bash
$skop add f4ah6o/skill-bonsai
Select skills to install (space: toggle, ↑/↓: move, enter: confirm, q: quit)
> [x] git-wt   
  [x] moonbit-agent-guide
  [x] moonbit-refactoring
  [x] pbt-workflow-guide

Select targets (space: toggle, ↑/↓: move, enter: confirm, q: quit)
> [ ] all
  [ ] codex
  [ ] opencode
  [ ] antigravity

Scanning marketplace to build skill list...
Installing skill: moonbit-agent-guide
Installing skill: moonbit-refactoring
Installing skill: moonbit-agent-guide
Installing skill: moonbit-refactoring
Installing skill: pbt-workflow-guide
Installing skill: git-wt
```

## おわり

最後までご覧いただきありがとうございました！
