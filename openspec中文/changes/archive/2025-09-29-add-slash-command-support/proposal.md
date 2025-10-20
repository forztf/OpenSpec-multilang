# 为编码代理添加斜杠命令支持

## 摘要
- 使 OpenSpec 能够为支持的编码代理（Claude Code 和 Cursor）生成和更新自定义斜杠命令。
- 提供三个与 OpenSpec 工作流对齐的斜杠命令：提案（开始变更提案）、应用（实施）和归档。
- 在代理间共享斜杠命令模板以简化未来扩展。

## 动机
开发人员使用不同的编码代理和编辑器。在工具间为 OpenSpec 工作流提供一致的斜杠命令可减少摩擦并确保触发工作流的标准方式。现在支持 Claude Code 和 Cursor 为未来引入斜杠命令功能的代理奠定基础。

## 提案
1. 在 `openspec init` 期间，当用户选择支持的工具时，为三个 OpenSpec 工作流阶段生成斜杠命令配置：
   - Claude（命名空间）：`/openspec/proposal`、`/openspec/apply`、`/openspec/archive`。
   - Cursor（平面，前缀）：`/openspec-proposal`、`/openspec-apply`、`/openspec-archive`。
   - 语义：
     - 创建 – 脚手架变更（ID、`proposal.md`、`tasks.md`、增量规范）；严格验证。
     - 应用 – 实施已批准的变更；完成任务；严格验证。
     - 归档 – 部署后归档；如需要更新规范。
   - 每个命令文件必须嵌入来自 `openspec/README.md` 的简洁、逐步指令（见模板内容部分）。
2. 按工具存储斜杠命令文件：
   - Claude Code：`.claude/commands/openspec/{proposal,apply,archive}.md`
   - Cursor：`.cursor/commands/{openspec-proposal,openspec-apply,openspec-archive}.md`
   - 确保创建嵌套目录。
3. 命令文件格式和元数据：
   - 使用带可选 YAML 前言的 Markdown 用于工具元数据（名称/标题、描述、类别/标签），当工具支持时。
   - 仅在正文周围放置 OpenSpec 标记，从不在前言内。
   - 保持可见的斜杠名称、文件名和任何前言 `name`/`id` 一致对齐（例如，`proposal`、`openspec-proposal`）。
   - 命名空间：将这些归类为"OpenSpec"并优先使用唯一 ID（例如，`openspec-proposal`）以避免冲突。
4. 集中模板：定义一次命令主体并在工具间重用；应用最小的每工具包装器（前言、类别、文件名）。
5. 在 `openspec update` 期间，仅刷新标记内的现有斜杠命令文件（按文件）；不创建缺失文件或新工具。

## 设计理念
- 引入 `SlashCommandConfigurator` 来管理每工具的多个文件。
  - 暴露目标而不是单个 `configFileName`（例如，`getTargets(): Array<{ path: string; kind: 'slash'; id: string }>`）。
  - 提供 `generateAll(projectPath, openspecDir)` 用于初始化和 `updateExisting(projectPath, openspecDir)` 用于更新。
- 每工具适配器仅添加前言和路径；主体来自共享模板。
- 模板位于 `TemplateManager` 中，带有从 `openspec/README.md` 提取简洁、权威片段的助手。
- 更新流记录每文件结果，使用户确切看到哪些斜杠文件被刷新。

### 标记放置
- 标记必须仅包装 Markdown 正文内容：
  - 前言（如果存在）首先。
  - 然后 `<!-- OPENSPEC:START -->` … 正文 … `<!-- OPENSPEC:END -->`。
  - 避免将标记插入 YAML 块以防止解析错误。

### 幂等性和创建规则
- `init`：为所选工具创建所有三个文件一次；后续 `init` 运行对现有文件无操作。
- `update`：仅刷新存在的文件；跳过缺失文件而不创建新文件。
- 为 `.claude/commands/openspec/` 和 `.cursor/commands/` 创建目录是配置器的责任。

### 命令命名和用户体验
- Claude Code：在斜杠本身中使用命名空间以提高可读性和分组：`/openspec/proposal`、`/openspec/apply`、`/openspec/archive`。
- Cursor：使用带 `openspec-` 前缀的平面名称：`/openspec-proposal`、`/openspec-apply`、`/openspec-archive`。在支持时通过 `category: OpenSpec` 分组。
- 一致性：对齐文件名、可见斜杠名称和任何前言 `id`（例如，`id: openspec-apply`）。
- 迁移：在 `update` 期间不重命名现有命令；仅在 `init` 时应用新命名（或通过显式迁移步骤）。

## 开放问题
- 验证每个工具版本支持的确切元数据/前言；如果不支持，省略前言并仅发送 Markdown 正文。
- 确认目标版本的 Cursor 命令文件位置；如果 Cursor 不解析前言，则回退到仅 Markdown。
- 基于用户需求评估除初始三个之外的其他命令（例如，`/show-change`、`/validate-all`）。

## 替代方案
- 为每个工具硬编码斜杠命令文本（拒绝：重复内容；增加维护）。
- 延迟 Cursor 支持直到其配置稳定（部分接受）：在功能标志后门 Cursor 直到在真实环境中验证。

## 风险
- 工具配置格式可能更改，需要更新包装器/前言。
- 不正确的路径或类别可能隐藏命令；添加路径存在检查和清晰日志。
- 标记误用（在前言内）可能破坏解析；在测试中强制执行放置规则。

## 未来工作
- 支持暴露斜杠命令 API 的其他编辑器/代理。
- 允许用户在 `openspec init` 期间自定义命令名称和类别。
- 提供专用命令以重新生成斜杠命令而不运行完整 `update`。

## 文件格式示例
以下示例说明了预期结构。如果工具不支持前言，省略 YAML 块并仅保留标记 + 正文。

### Claude Code：`.claude/commands/openspec/proposal.md`
```markdown
---
name: OpenSpec: Proposal
description: 脚手架新的 OpenSpec 变更并严格验证。
category: OpenSpec
tags: [openspec, change]
---
<!-- OPENSPEC:START -->
...来自共享模板的命令正文...
<!-- OPENSPEC:END -->
```

斜杠调用：`/openspec/proposal`（命名空间）

### Cursor：`.cursor/commands/openspec-proposal.md`
```markdown
---
name: /openspec-proposal
id: openspec-proposal
category: OpenSpec
description: 脚手架新的 OpenSpec 变更并严格验证。
---
<!-- OPENSPEC:START -->
...来自共享模板的命令正文...
<!-- OPENSPEC:END -->
```

斜杠调用：`/openspec-proposal`（平面，前缀）

## 模板内容
模板应简洁、可操作并源自 `openspec/README.md` 以避免重复。每个命令正文包括：
- 防护：如需要问 1-2 个澄清问题；遵循最小复杂性规则；对 Node 项目使用 `pnpm`。
- 为工作流阶段（提案、应用、归档）量身定制的步骤列表，包括严格验证命令。
- 指向 `openspec show`、`openspec list` 和验证失败时的故障排除提示。

## 测试策略
- 每工具生成文件的黄金快照（前言 + 标记 + 正文）。
- 部分存在测试：如果 1-2 个文件存在，`update` 仅刷新这些而不创建缺失文件。
- 标记放置测试：确保标记从不出现在前言内；覆盖缺失/重复标记恢复行为。
- 日志测试：`update` 报告斜杠命令的每文件更新。