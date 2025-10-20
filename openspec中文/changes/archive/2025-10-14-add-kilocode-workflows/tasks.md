## 1. CLI 连接
- [x] 1.1 在 `openspec init` 中添加 Kilo Code 到可选择的 AI 工具，包括"已配置"检测和成功摘要。
- [x] 1.2 注册 `KiloCodeSlashCommandConfigurator` 与其他斜杠命令工具一起。

## 2. 工作流生成
- [x] 2.1 实现配置器，使其创建 `.kilocode/workflows/`（如需要）并写入带有 OpenSpec 标记的 `openspec-{proposal,apply,archive}.md`。
- [x] 2.2 重用共享的斜杠命令主体而不带前言；验证生成的文件保持纯 Markdown，无额外元数据。

## 3. 更新支持
- [x] 3.1 确保 `openspec update` 刷新现有的 Kilo Code 工作流，同时跳过不存在的工作流。
- [x] 3.2 添加回归覆盖，确认更新期间标记内容被替换（不重复）。

## 4. 文档
- [x] 4.1 更新 README / 文档以注明 Kilo Code 工作流支持和路径（`.kilocode/workflows/`）。
- [x] 4.2 如适用，在 CHANGELOG 或发布说明中提及集成。