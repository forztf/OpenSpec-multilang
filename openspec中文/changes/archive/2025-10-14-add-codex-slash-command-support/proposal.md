## 为什么
- Codex（原名 Codeium Chat 的 VS Code 扩展）通过从 `~/.codex/prompts/` 读取 Markdown 提示文件来暴露"斜杠命令"。每个文件名成为用户可以运行的 `/command`，带有用于元数据的 YAML 前言（`description`、`argument-hint`）和 `$ARGUMENTS` 来捕获用户输入。Kevin Kern 分享的工作流截图（"Codex 问题分析器"）显示了 OpenSpec 应该针对的格式，以便团队可以直接从聊天调色板调用精心策划的工作流。
- 团队已经依赖 OpenSpec 来管理 Claude、Cursor、OpenCode、Kilo Code 和 Windsurf 的斜杠命令表面区域。排除 Codex 迫使他们手动复制/粘贴 OpenSpec 防护到 `~/.codex/prompts/*.md`，这很快就会偏离并破坏 CLI 的"单一真相源"承诺。
- Codex 命令存在于存储库之外（在用户的主目录下），因此提供一个自动配置器，既能搭建提示又能通过 `openspec update` 保持它们的刷新，消除了容易出错的手动步骤，并使 OpenSpec 指令在助手间保持同步。

## 变更内容
- 在 `openspec init` 工具选择器中添加 Codex，使用与其他编辑器相同的"已配置"检测，连接一个直接将受管 Markdown 提示写入 Codex 全局目录（`~/.codex/prompts` 或 `$CODEX_HOME/prompts`）并带有 OpenSpec 标记块的实现。
- 生成三个 Codex 提示文件—`openspec-proposal.md`、`openspec-apply.md` 和 `openspec-archive.md`—其内容镜像共享斜杠命令模板，同时使用 YAML 前言（`description` 和 `argument-hint` 字段）和 `$ARGUMENTS` 将所有参数捕获为单个字符串（匹配 GitHub Copilot 模式和官方 Codex 规范）。
- 记录 Codex 的仅全局发现，以及 OpenSpec 直接将提示写入 `~/.codex/prompts`（或 `$CODEX_HOME/prompts`）。
- 教会 `openspec update` 在全局目录中就地刷新现有的 Codex 提示（仅当它们已存在时），更新前言和主体。
- 记录 Codex 支持以及其它斜杠命令集成，并添加回归覆盖，通过 `CODEX_HOME` 对临时全局提示目录进行初始化/更新行为练习。

## 影响
- 规范：`cli-init`、`cli-update`
- 代码：`src/core/config.ts`、`src/core/configurators/slash/*`、`src/core/templates/slash-command-templates.ts`、CLI 工具摘要、文档
- 测试：Codex 提示搭建和刷新逻辑的集成覆盖
- 文档：宣布 Codex 斜杠命令支持的 README 和 CHANGELOG 条目

## 当前规范参考
- `specs/cli-init/spec.md`
  - 要求涵盖初始化用户体验、目录搭建、AI 工具配置以及 Claude Code、Cursor 和 OpenCode 的现有斜杠命令支持。
  - 我们在 `changes/.../specs/cli-init/spec.md` 中的 `## MODIFIED` 增量在附加新 Codex 场景之前复制完整的"斜杠命令配置"要求（标题、描述和所有场景），以便归档将保留每个先前场景。
- `specs/cli-update/spec.md`
  - 要求定义更新前提条件、模板刷新行为以及 Claude Code、Cursor 和 OpenCode 的斜杠命令刷新逻辑。
  - 相应的增量保留整个"斜杠命令更新"要求，同时添加 Codex 刷新场景，确保归档工作流替换块而不丢失现有场景或"缺少斜杠命令文件"防护。