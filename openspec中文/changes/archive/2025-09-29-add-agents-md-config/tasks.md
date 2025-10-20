# 实现任务

## 1. 扩展初始化工作流
- [x] 1.1 在 `openspec init` 工具选择提示中添加"AGENTS.md 标准"选项，尊重现有的 UI 约定。
- [x] 1.2 当选择该选项时，使用 OpenSpec 标记生成或刷新根级 `AGENTS.md` 文件，从规范模板获取内容。

## 2. 增强更新命令
- [x] 2.1 确保 `openspec update` 从最新模板写入根 `AGENTS.md`（如果缺失则创建）， alongside `openspec/AGENTS.md`。
- [x] 2.2 更新成功消息和日志以反映 AGENTS 标准文件的创建 vs 刷新。

## 3. 共享模板处理
- [x] 3.1 如有必要重构模板实用程序，使两个命令重用相同内容而不重复。
- [x] 3.2 添加自动化测试，覆盖有和没有现有 `AGENTS.md` 的项目的初始化/更新流程，确保标记行为正确。

## 4. 文档
- [x] 4.1 更新 CLI 规范和面向用户的文档以描述 AGENTS 标准支持。
- [x] 4.2 运行 `openspec validate add-agents-md-config --strict` 并记录任何显著的行为变化。