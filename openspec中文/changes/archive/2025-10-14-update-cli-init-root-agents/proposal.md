## 为什么
OpenSpec 目前仅在团队在 `openspec init` 期间明确选择"AGENTS.md 标准"工具时才创建根级 `AGENTS.md` 存根。跳过该复选框的项目永远不会获得受管存根，因此非原生助手（Copilot、Codeium 等）没有入口点，后续的 `openspec update` 运行会静默创建文件而没有任何上下文。我们需要将存根融入初始化中，澄清工具选择体验，并保持更新工作流的一致性，以便每个团队成员从第一天起就能获得正确的指令。

## 变更内容
- 更新 `openspec init`，使根 `AGENTS.md` 存根始终生成（首次运行和扩展模式），并从共享实用程序刷新，而不是与工具选择绑定。
- 重新设计 AI 工具选择向导，将选项分为"原生支持"（Claude、Cursor、OpenCode、…）和解释始终开启的 `AGENTS.md` 交接的信息性"其他工具"部分。
- 调整 CLI 规范、提示和成功消息以反映新类别，同时保持扩展模式行为的一致性。
- 更新自动化测试和夹具以覆盖无条件存根创建和重新设计的提示流程。
- 刷新文档和入门片段，使其不再将存根描述为可选，并调出新分组。

## 影响
- 受影响的规范：`cli-init`、`cli-update`
- 受影响的代码：`src/core/init.ts`、`src/core/config.ts`、`src/core/configurators/agents.ts`、`src/core/templates/agents-root-stub.ts`、`src/core/update.ts`、`test/core/` 下的相关测试
- 文档和资产：README、CHANGELOG、任何引用选择"AGENTS.md 标准"选项的设置指南