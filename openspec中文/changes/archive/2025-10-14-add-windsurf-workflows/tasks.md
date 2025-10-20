## 1. CLI 连接
- [x] 1.1 在 `openspec init` 中添加 Windsurf 到可选择的 AI 工具，包括"已配置"检测。
- [x] 1.2 注册 `WindsurfSlashCommandConfigurator`，将工作流写入 `.windsurf/workflows/` 并确保目录存在。
- [x] 1.3 确保 `openspec update` 在选择 winds 时拉取 Windsurf 配置器，并在文件不存在时跳过创建。

## 2. 工作流模板
- [x] 2.1 重用共享的提案/应用/归档主体，在 OpenSpec 标记前添加 Windsurf 特定的标题/描述。
- [x] 2.2 确认生成的 Markdown（每个文件）保持在 Windsurf 文档中提到的 12k 字符上限以下。

## 3. 测试和保障
- [x] 3.1 扩展初始化测试以断言选择 Windsurf 时创建 `.windsurf/workflows/openspec-*.md`。
- [x] 3.2 扩展更新测试以断言现有 Windsurf 工作流被刷新且不存在的文件被忽略。
- [x] 3.3 为 Windsurf 工作流文件内的标记保留添加回归覆盖。

## 4. 文档
- [x] 4.1 更新 README（和任何面向用户的文档）以在原生斜杠/工作流集成下列出 Windsurf。
- [x] 4.2 如适用，在发布说明或 CHANGELOG 中突出 Windsurf 工作流支持。