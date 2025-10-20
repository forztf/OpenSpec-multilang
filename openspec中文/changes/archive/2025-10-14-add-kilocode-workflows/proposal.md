## 为什么
- Kilo Code 通过从 `.kilocode/workflows/`（或全局 `~/.kilocode/workflows/`）加载 markdown 工作流并在用户输入 `/workflow-name.md` 时运行它们来执行"斜杠命令"，使得项目本地工作流文件成为我们已经为其他工具提供的斜杠命令文件的类似物。\\
  ([工作流 | Kilo Code 文档](https://kilocode.ai/docs/features/slash-commands/workflows))
- 这些工作流是纯 markdown，包含逐步指令，可以调用内置工具和 MCP 集成，因此重用 OpenSpec 的共享提案/应用/归档主体使行为在助手间保持一致，而无需发明新内容。
- OpenSpec 已经检测配置的工具并在 `init`/`update` 期间刷新标记包装的文件；将相同机制扩展到 `.kilocode/workflows/openspec-*.md` 确保 Kilo Code 与单一真相源保持同步。

## 变更内容
- 在 `openspec init` 工具选择器中添加 Kilo Code，包括"已配置"检测，包括扩展模式的连接，以便团队可以刷新 Kilo Code 资产。
- 实现 `KiloCodeSlashCommandConfigurator`，创建 `.kilocode/workflows/openspec-{proposal,apply,archive}.md`，确保工作流目录存在并将共享内容包装在 OpenSpec 标记中（无需前言）。
- 教会 `openspec update` 使用共享斜杠命令模板刷新现有的 Kilo Code 工作流（仅刷新已存在的工作流）。
- 更新文档、发布说明和集成测试，使新的工作流支持与 Claude、Cursor、OpenCode 和 Windsurf 一起被覆盖。

## 影响
- 规范：`cli-init`、`cli-update`
- 代码：`src/core/config.ts`、`src/core/configurators/(registry|slash/*)`、`src/core/templates/slash-command-templates.ts`、工具摘要的 CLI 连接
- 测试：初始化/更新工作流覆盖，`.kilocode/workflows/` 中标记保留的回归
- 文档：README / CHANGELOG 更新，宣传 Kilo Code 工作流支持