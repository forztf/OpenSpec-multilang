# 向 Init/Update 添加 AGENTS.md 标准支持

## 摘要
- 教会 `openspec init` 使用与 `CLAUDE.md` 相同的标记系统管理根级 `AGENTS.md` 文件。
- 允许 `openspec update` 刷新或脚手架根 `AGENTS.md`，使 AGENTS 兼容工具始终接收当前指令。
- 保持现有的 `openspec/AGENTS.md` 模板作为规范来源，同时确保读取 `AGENTS.md` 选择加入指令的助手自动获得最新指导。

## 动机
README 现在指向 AGENTS.md 兼容助手的团队，但 CLI 只管理 `CLAUDE.md`。项目必须手工制作根 `AGENTS.md` 文件以从标准中受益，除非维护者记得手动复制内容，否则更新将偏离。扩展 `init` 和 `update` 弥补了这一差距，使 OpenSpec 实际上兑现了一流 AGENTS 支持的承诺。

## 提案
1. 使用"AGENTS.md 标准"选项扩展 `openspec init` 选择流程，该选项创建或刷新用 OpenSpec 标记包装的根 `AGENTS.md` 文件，镜像现有的 CLAUDE 集成。
2. 生成文件时，从 `openspec/AGENTS.md` 中使用的相同模板中提取受管内容，确保两个位置保持同步。
3. 更新 `openspec update`，使其始终刷新根 `AGENTS.md`（如果缺失则创建）， alongside `openspec/AGENTS.md` 和任何其他配置的助手。
4. 在 CLI 规范中记录新行为，并通过测试验证标记处理（无重复，保留块外的用户内容）以覆盖两个命令。

## 范围外
- 添加超出共享指令块的额外 AGENTS 特定提示或工作流。
- 非交互标志或一次运行中批量配置多个标准。
- 模板存储或加载方式的更广泛重构。

## 风险和缓解措施
- **风险：** 意外覆盖受管块周围的用户编辑内容。
  - **缓解：** 重用与 `CLAUDE.md` 共享的现有标记更新助手，并添加测试覆盖包含块前后自定义文本的文件。
- **风险：** `openspec/AGENTS.md` 和根文件之间的分歧。
  - **缓解：** 从规范模板中获取根文件内容，而不是内联复制字符串。
- **风险：** 对文件创建时间的困惑。
  - **缓解：** 记录创建 vs 更新，并确保帮助文本在 `init` 期间引用 AGENTS 选项。