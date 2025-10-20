## 为什么
- GitHub Copilot 通过 `.github/prompts/<name>.prompt.md` 中的 markdown 文件支持自定义斜杠命令。每个文件包含带有 `description` 标签的 YAML 前言，并使用 `$ARGUMENTS` 捕获用户输入。这种格式允许团队直接在 Copilot 的聊天界面中暴露精心策划的工作流。
- 团队已经依赖 OpenSpec 来管理 Claude Code、Cursor、OpenCode、Codex、Kilo Code 和 Windsurf 的斜杠命令配置。排除 GitHub Copilot 迫使开发人员手动维护 `.github/prompts/` 中的 OpenSpec 提示，这会导致偏离并破坏 OpenSpec 的"单一真相源"承诺。
- GitHub Copilot 从存储库的 `.github/prompts/` 目录中发现提示，使得版本控制和团队共享变得简单。通过 `openspec init` 和 `openspec update` 添加自动生成和刷新，消除了手动同步，使 OpenSpec 指令在所有 AI 助手中保持一致。

## 变更内容
- 在 `openspec init` 工具选择器中添加 GitHub Copilot，具有与其它编辑器类似的"已配置"检测，连接一个将受管 Markdown 提示文件写入 `.github/prompts/` 并带有 OpenSpec 标记块的实现。
- 生成三个 GitHub Copilot 提示文件—`openspec-proposal.prompt.md`、`openspec-apply.prompt.md` 和 `openspec-archive.prompt.md`—其内容镜像共享斜杠命令模板，同时符合 Copilot 的前言和 `$ARGUMENTS` 占位符约定。
- 记录 GitHub Copilot 的基于存储库的发现，以及 OpenSpec 将提示写入 `.github/prompts/` 并带有受管块。
- 教会 `openspec update` 在存储库的 `.github/prompts/` 目录中就地刷新现有的 GitHub Copilot 提示（仅当它们已存在时）。
- 记录 GitHub Copilot 支持以及其它斜杠命令集成，并添加测试覆盖，练习 `.github/prompts/` 文件的初始化/更新行为。

## 影响
- 规范：`cli-init`、`cli-update`
- 代码：`src/core/configurators/slash/github-copilot.ts`（新增）、`src/core/configurators/slash/registry.ts`、`src/core/templates/slash-command-templates.ts`、CLI 工具摘要、文档
- 测试：GitHub Copilot 提示脚手架和刷新逻辑的集成覆盖
- 文档：宣布 GitHub Copilot 斜杠命令支持的 README 和 CHANGELOG 条目

## 当前规范参考
- `specs/cli-init/spec.md`
  - 要求涵盖初始化用户体验、目录脚手架、AI 工具配置以及 Claude Code、Cursor、OpenCode、Codex、Kilo Code 和 Windsurf 的现有斜杠命令支持。
  - 我们在 `changes/.../specs/cli-init/spec.md` 中的 `## MODIFIED` 增量将复制完整的"斜杠命令配置"要求（标题、描述和所有场景），然后附加新的 GitHub Copilot 场景，以便归档保留每个先前场景。
- `specs/cli-update/spec.md`
  - 要求定义更新前提条件、模板刷新行为以及现有工具的斜杠命令刷新逻辑。
  - 相应的增量保留整个"斜杠命令更新"要求，同时添加 GitHub Copilot 刷新场景，确保归档工作流替换块而不丢失现有场景或"缺少斜杠命令文件"防护。