# Add Trae IDE Support

## Why

Trae AI 是一个新兴的 AI 驱动的 IDE，具有独特的项目规则管理系统。该 IDE 使用 `.trae\rules\project_rules.md` 文件来存储项目特定的 AI 代理指令和规则。为了让使用 Trae IDE 的开发者能够充分利用 OpenSpec 的规范驱动开发流程，我们需要添加对 Trae IDE 的原生支持。

## What Changes

- 在 AI 工具配置选项中添加 Trae IDE 支持
- 创建 Trae IDE 配置器，能够检测和配置 `.trae\rules\project_rules.md` 文件
- 在初始化和更新过程中支持 Trae IDE 的项目规则文件管理
- 为 Trae IDE 提供专门的 OpenSpec 指令模板

## RootAgents

- Trae 的项目规则路径为 `.trae\rules\project_rules.md`
- 通过在 `project_rules.md` 注入 OpenSpec 管理标记块（`<!-- OPENSPEC:START -->`/`<!-- OPENSPEC:END -->`）实现 RootAgents 集成
- 初始化与更新仅替换受管块内的内容，保留块外的用户自定义规则
- 受管块提供 Trae 的 OpenSpec 指令交接，指向 `@/openspec/AGENTS.md` 并概述工作流

## Impact

- 受影响的规范：cli-init, cli-update
- 受影响的代码：
  - `src/core/configurators/` - 新增 Trae 配置器
  - `src/core/configurators/registry.ts` - 注册 Trae 配置器
  - CLI 初始化和更新逻辑
- 新增功能：Trae IDE 用户可以通过 `openspec init` 和 `openspec update` 命令自动配置项目规则文件