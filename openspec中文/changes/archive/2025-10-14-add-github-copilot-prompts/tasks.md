## 实现任务

- [x] 创建 `src/core/configurators/slash/github-copilot.ts` 实现 `SlashCommandConfigurator` 基类
  - 实现 `getRelativePath()` 返回 `.github/prompts/openspec-{proposal,apply,archive}.prompt.md`
  - 实现 `getFrontmatter()` 生成带有 `description` 字段的 YAML 前言，并包含 `$ARGUMENTS` 占位符
  - 实现 `generateAll()` 创建 `.github/prompts/` 目录并写入三个带有前言、标记和共享模板主体的提示文件
  - 实现 `updateExisting()` 刷新标记之间的受管块，同时保留前言
  - 设置 `toolId = "github-copilot"` 和 `isAvailable = true`

- [x] 在 `src/core/configurators/slash/registry.ts` 中注册 GitHub Copilot 配置器
  - 导入 `GitHubCopilotSlashCommandConfigurator`
  - 添加到 `SLASH_COMMAND_CONFIGURATORS` 数组
  - 更新工具选择器显示名称为 "GitHub Copilot"

- [x] 更新 `src/core/init.ts` 在 AI 工具选择提示中包含 GitHub Copilot
  - 在可用工具列表中添加 GitHub Copilot，并检测现有的 `.github/prompts/openspec-*.prompt.md` 文件
  - 当提示文件存在时显示 "(已配置)"

- [x] 更新 `src/core/update.ts` 在存在时刷新 GitHub Copilot 提示
  - 当 `.github/prompts/` 包含 OpenSpec 提示文件时调用 `updateExisting()` 为 GitHub Copilot 配置器

- [x] 为 GitHub Copilot 斜杠命令生成添加集成测试
  - 测试 `generateAll()` 创建三个具有正确结构（前言 + 标记 + 主体）的提示文件
  - 测试 `updateExisting()` 保留前言并仅更新受管块
  - 测试更新期间不创建缺失的提示文件

- [x] 更新文档
  - 在 README 斜杠命令支持表中添加 GitHub Copilot
  - 记录 `.github/prompts/` 作为发现位置
  - 为 GitHub Copilot 支持添加 CHANGELOG 条目