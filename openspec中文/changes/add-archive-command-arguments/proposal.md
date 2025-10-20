# 添加归档命令参数支持

## 为什么需要
当前 `/openspec:archive` 斜杠命令缺乏参数支持，迫使AI从对话上下文或列出所有变更来推断要归档哪个变更。这带来了安全风险，如果上下文模糊或存在多个变更，可能会归档错误的提案。用户期望能够显式指定变更ID，这与CLI命令 `openspec archive <id>` 的行为相匹配。

## 变更内容
- 在OpenCode归档斜杠命令的前置数据中添加 `$ARGUMENTS` 占位符（匹配提案命令的现有模式）
- 更新归档命令模板步骤，在提供参数时验证特定的变更ID参数
- 注意：Codex、GitHub Copilot和Amazon Q已经为归档命令提供了 `$ARGUMENTS`；Claude/Cursor/Windsurf/Kilocode不支持参数

## 影响范围
- 受影响的规范：`cli-update`（斜杠命令生成逻辑）
- 受影响的代码：
  - `src/core/configurators/slash/opencode.ts`（在归档前置数据中添加 `$ARGUMENTS`）
  - `src/core/templates/slash-command-templates.ts`（用于参数验证的归档模板步骤）
- 破坏性变更：否 - 这是使命令更安全的附加功能
- 面向用户：是 - OpenCode用户将能够将变更ID作为参数传递：`/openspec:archive <change-id>`