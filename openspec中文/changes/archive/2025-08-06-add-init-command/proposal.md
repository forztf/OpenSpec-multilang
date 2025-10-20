# 为 OpenSpec 添加初始化命令

## 为什么

项目需要一种简单的方式来采用 OpenSpec 约定。目前，用户必须手动创建目录结构并理解所有约定，这会增加采用的难度。初始化命令将能够即时设置 OpenSpec，具备正确的结构和指导。

## 什么变化

- 添加 `openspec init` CLI 命令，创建完整的 OpenSpec 目录结构
- 生成模板文件（包含 AI 指令的 README.md，project.md 模板）
- 交互式提示选择要配置的 AI 工具（初始为 Claude Code，其他标记为"即将推出"）
- 支持多种 AI 编码助手，具有可扩展的插件架构
- 使用内容标记智能更新文件以保留现有配置
- 支持通过 `--dir` 标志自定义目录命名
- 验证以防止覆盖现有的 OpenSpec 结构
- 显示清晰的错误信息和有用的指导（例如，建议对现有结构使用 'openspec update'）
- 成功初始化后显示可操作的后续步骤

### 破坏性变更
- 无 - 这是一项新功能

## 影响

- 受影响的规范：无（新功能）
- 受影响的代码：
  - src/cli/index.ts（添加初始化命令）
  - src/core/init.ts（新增 - 初始化逻辑）
  - src/core/templates/（新增 - 模板文件）
  - src/core/configurators/（新增 - AI 工具插件）
  - src/utils/file-system.ts（新增 - 文件操作）