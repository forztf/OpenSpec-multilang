## 1. CLI 集成
- [x] 1.1 在初始化工具选择器中添加 Codex，显示文本澄清提示位于全局 `.codex/prompts/` 目录中，并实现"已配置"检测，通过检查受管 Codex 提示文件。
- [x] 1.2 实现 `CodexSlashCommandConfigurator`，写入 `.codex/prompts/openspec-{proposal,apply,archive}.md`，确保提示目录存在并将内容包装在 OpenSpec 标记中。
- [x] 1.3 将配置器注册到斜杠命令注册表中，并在初始化/更新连接中包含 Codex，以便两个命令在适当时调用新的配置器。

## 2. 提示模板
- [x] 2.1 扩展共享斜杠命令模板（或添加 Codex 特定包装器）以注入编号占位符（`$1`、`$2`、…），其中 Codex 期望用户提供参数。
- [x] 2.2 验证生成的 Markdown 是否符合 Codex 的格式期望（无前言，标题优先布局）并匹配参考截图中显示的问题分析器样式。

## 3. 更新支持和测试
- [x] 3.1 更新 `openspec update` 流程以刷新现有的 Codex 提示，而不创建新提示（当文件缺失时）。
- [x] 3.2 添加集成覆盖，通过设置 `CODEX_HOME` 对临时全局 Codex 提示目录进行初始化/更新练习，断言标记保留和幂等更新。
- [x] 3.3 在 README 和 CHANGELOG 中记录 Codex 的仅全局发现和自动安装。
- [x] 3.3 确认错误处理在 CLI 无法写入 Codex 提示目录时（权限、缺少主目录等）显示清晰路径。

## 4. 文档
- [x] 4.1 在 README 和变更日志中记录 Codex 斜杠命令支持，与其他助手集成一起。
- [x] 4.2 添加发布说明片段，指向生成的 `/openspec-proposal`、`/openspec-apply` 和 `/openspec-archive` 命令的 Codex 用户。