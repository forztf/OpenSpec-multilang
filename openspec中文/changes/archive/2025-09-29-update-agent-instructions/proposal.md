# 更新 OpenSpec 代理指令

## 为什么

当前的 OpenSpec 代理指令需要更新，以遵循 AI 助手指令的最佳实践（简洁性、清晰性、消除歧义），确保 CLI 命令与实际实现保持一致，并正确记录代理应遵循的三阶段工作流模式。

## 变更内容

### 核心结构改进
- **前置三阶段工作流** 作为主要心智模型：
  1. 创建变更提案（proposal.md、规范增量、design.md、tasks.md）
  2. 实现变更提案：
     - 首先阅读 proposal.md 以理解变更
     - 如果存在 design.md 则阅读以获取技术上下文
     - 阅读 tasks.md 获取实现清单
     - 逐个完成任务
     - 完成后立即标记每个任务为完成
  3. 归档变更提案（部署后使用 archive 命令）
- **将指令长度减少 50%**，同时保持所有关键信息
- **用清晰的层次结构重构**：核心工作流 → 快速开始 → 命令 → 详情 → 边缘情况

### 决策清晰度增强
- **为常见场景添加清晰的决策树**（错误 vs 功能，需要提案 vs 不需要）
- **删除混淆代理决策的模糊条件**
- **添加"任何任务之前"清单** 用于上下文收集
- **添加"创建规范之前"规则** - 始终先检查现有规范以避免重复

### CLI 文档更新
- **完整的命令文档** 包含所有当前功能：
  - `openspec init [path]` - 在项目中初始化 OpenSpec
  - `openspec list` - 列出所有活动变更（默认）
  - `openspec list --specs` - 列出所有规范
  - `openspec show [item]` - 显示变更或规范并自动检测
  - `openspec show` - 交互模式进行选择
  - `openspec diff [change]` - 显示变更的规范差异
  - `openspec validate [item]` - 验证变更或规范
  - `openspec archive [change]` - 部署后归档已完成的变更
  - `openspec update [path]` - 更新 OpenSpec 指令文件
- **记录所有标志和选项**：
  - `--json` 输出格式用于程序化使用
  - `--type change|spec` 用于消除歧义
  - `--skip-specs` 用于仅工具归档
  - `--strict` 用于严格验证模式
  - `--no-interactive` 禁用提示
- **删除已弃用的命令引用**（名词优先模式如 `openspec change show`）
- **为每个命令变体添加具体示例**
- **记录调试命令**：
  - `openspec show [change] --json --deltas-only` 用于检查增量
  - `openspec validate [change] --strict` 用于全面验证

### 规范文件结构文档
- **完整的规范文件示例** 显示正确结构：
  ```markdown
  ## ADDED Requirements
  ### Requirement: 清晰的要求陈述
  系统应提供功能...
  
  #### Scenario: 描述性场景名称
  - **当** 条件发生时
  - **则** 预期结果
  - **并且** 额外结果
  ```
- **场景格式化要求**（关键 - 最常见错误）：
  - 必须使用 `#### Scenario:` 标头（4个井号）
  - 不是项目符号列表或粗体文本
  - 每个要求必须至少有一个场景
- **增量文件位置** - 清晰解释：
  - 规范文件放在 `changes/{name}/specs/` 目录中
  - 增量自动从这些文件中提取
  - 使用操作前缀：ADDED、MODIFIED、REMOVED、RENAMED

### 故障排除部分
- **常见错误和解决方案**：
  - "变更必须至少有一个增量" → 检查 specs/ 目录是否存在 .md 文件
  - "要求必须至少有一个场景" → 检查场景是否使用 `#### Scenario:` 格式
  - 静默场景解析失败 → 验证确切的标题格式
- **增量检测调试**：
  - 使用 `openspec show [change] --json --deltas-only` 检查解析的增量
  - 检查规范文件是否有操作前缀（## ADDED Requirements）
  - 验证 specs/ 子目录结构
- **验证最佳实践**：
  - 始终使用 `--strict` 标志进行全面检查
  - 使用 JSON 输出进行调试：`--json | jq '.deltas'`

### 代理特定改进
- **实现工作流** - 清晰的逐步过程：
  1. 阅读 proposal.md 以理解正在构建的内容
  2. 阅读 design.md（如果存在）以获取技术决策
  3. 阅读 tasks.md 获取实现清单
  4. 按顺序逐个实现任务
  5. 立即标记每个任务为完成：`- [x] 任务已完成`
  6. 永远不要跳过或批量完成任务
- **规范发现工作流** - 创建新规范前始终检查现有规范：
  - 使用 `openspec list --specs` 查看所有当前规范
  - 创建前检查功能是否已存在
  - 优先修改现有规范而不是创建重复规范
- **工具选择矩阵** - 何时使用 Grep vs Glob vs Read
- **错误恢复模式** - 如何处理常见失败
- **上下文管理指南** - 开始任务前要阅读的内容
- **验证工作流** - 如何确认变更正确

### 最佳实践部分
- **保持简洁** - 适当时使用单行答案
- **保持具体** - 使用确切的文件路径和行号（file.ts:42）
- **从简单开始** - 默认使用 <100 行，单文件实现
- **为复杂性辩护** - 任何优化都需要数据/指标

## 影响

- 受影响的规范：无（这是工具/文档变更）
- 受影响的代码：
  - `src/core/templates/claude-template.ts` - 更新 CLAUDE.md 模板
- 受影响的文档：
  - `openspec/README.md` - 主 OpenSpec 指令
  - `openspec init` 命令生成的 CLAUDE.md 文件

注意：这是不需要规范更新的工具/基础设施变更。归档时，使用 `openspec archive update-agent-instructions --skip-specs`。