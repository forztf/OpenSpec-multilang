## 为什么
项目根目录目前接收一份完整的 OpenSpec 代理指令副本，重复了也存在于 `openspec/AGENTS.md` 中的内容。当团队编辑一个副本而不是另一个时，文件会偏离，入职助手会看到冲突的指导。

## 变更内容
- 在 `openspec init` 和后续更新期间继续在 `openspec/AGENTS.md` 中生成完整模板。
- 用简短的交接替换根级文件（`AGENTS.md` 或 `CLAUDE.md`，取决于工具选择），解释项目使用 OpenSpec 并直接指向 `openspec/AGENTS.md`。
- 添加专用存根模板，以便初始化和更新流程重用相同的最小副本指令。
- 更新 CLI 测试和文档以反映新的根级消息，并确保 OpenSpec 标记块仍保护未来更新。

## 影响
- 受影响的规范：`cli-init`、`cli-update`
- 受影响的代码：`src/core/init.ts`、`src/core/update.ts`、`src/core/templates/agents-template.ts`
- 更新提及根 `AGENTS.md` 内容的资产/自述文件以引用新的存根消息。