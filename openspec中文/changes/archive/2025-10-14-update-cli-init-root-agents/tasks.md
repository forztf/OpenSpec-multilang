## 1. 实现
- [x] 1.1 重构 `openspec init` 始终生成根 `AGENTS.md` 存根（初始运行和扩展模式），通过共享辅助逻辑。
- [x] 1.2 重新设计 AI 工具选择向导，以显示"原生支持"与"其他工具"分组，并使存根成为必选项。
- [x] 1.3 更新 CLI 消息、模板和配置器，使新流程在 init 和 update 命令中保持同步。
- [x] 1.4 刷新单元/集成测试，以覆盖无条件存根和重新分组的提示布局。
- [x] 1.5 更新文档、README 片段和 CHANGELOG 条目中提到的可选 `AGENTS.md` 体验。

## 2. 验证
- [x] 2.1 运行 `pnpm test` 针对 CLI init/update 测试套件。
- [x] 2.2 执行 `openspec validate update-cli-init-root-agents --strict`。
- [x] 2.3 执行手动冒烟测试：在临时目录中运行 `openspec init`，确认存根和分组提示，在扩展模式下重新运行。