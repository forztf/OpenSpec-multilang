# CLI 初始化规范

## 目的

`openspec init` 命令应在任何项目中创建完整的 OpenSpec 目录结构，支持多个 AI 编码助手，从而立即采用 OpenSpec 规范。

## 要求
### 要求：进度指示器

命令应在初始化期间显示进度指示器，为每个步骤提供清晰的反馈。

#### 场景：显示初始化进度

- **当** 执行初始化步骤时
- **则** 在后台静默验证环境（无错误时不输出）
- **并** 使用 ora 微调器显示进度：
  - 显示微调器："⠋ 正在创建 OpenSpec 结构..."
  - 然后成功："✔ OpenSpec 结构已创建"
  - 显示微调器："⠋ 正在配置 AI 工具..."
  - 然后成功："✔ AI 工具已配置"

### 要求：目录创建

命令应创建完整的 OpenSpec 目录结构，包含所有必需的目录和文件。

#### 场景：创建 OpenSpec 结构

- **当** 执行 `openspec init` 时
- **则** 创建以下目录结构：
```
openspec/
├── project.md
├── AGENTS.md
├── specs/
└── changes/
    └── archive/
```

### 要求：文件生成

命令应生成具有适当内容的必需模板文件，以便立即使用。

#### 场景：生成模板文件

- **当** 初始化 OpenSpec 时
- **则** 生成包含 AI 助手完整 OpenSpec 指令的 `openspec/AGENTS.md`
- **并** 生成带有项目上下文模板的 `project.md`

### 要求：AI 工具配置

命令应使用分组选择体验配置 AI 编码助手与 OpenSpec 指令，以便团队可以启用原生集成，同时始终为其他助手提供指导。

#### 场景：提示 AI 工具选择

- **当** 以交互方式运行时
- **则** 呈现一个多选向导，将选项分为两个标题：
  - **原生支持的提供商** 显示每个可用的第一方集成（Claude Code、Cursor、OpenCode、…）及其复选框
  - **其他工具** 说明根级别的 `AGENTS.md` 存根始终为 AGENTS 兼容的助手生成，且无法取消选择
- **并** 将已配置的原生工具标记为"（已配置）"，以表示选择它们将刷新托管内容
- **并** 将禁用或不可用的提供商标记为"即将推出"，以便用户知道它们尚不能选择
- **并** 即使未选择任何原生提供商，也允许确认选择，因为根存根默认保持启用
- **并** 在扩展模式下将基本提示文本更改为"您要添加或刷新哪些原生支持的 AI 工具？"

### 要求：AI 工具配置详情

命令应使用标记系统正确配置选定的 AI 工具与 OpenSpec 特定指令。

#### 场景：配置 Claude Code

- **当** 选择 Claude Code 时
- **则** 在项目根目录（而非 openspec/ 内部）创建或更新 `CLAUDE.md`
- **并** 使用指向队友到 `@/openspec/AGENTS.md` 的短存根填充托管块

#### 场景：创建新的 CLAUDE.md

- **当** CLAUDE.md 不存在时
- **则** 创建新文件，其中包含用标记包装的存根指令，以便完整工作流程保留在 `openspec/AGENTS.md` 中：
```markdown
<!-- OPENSPEC:START -->
# OpenSpec 指令

此项目使用 OpenSpec 管理 AI 助手工作流程。

- 完整指导位于 '@/openspec/AGENTS.md'。
- 保留此托管块，以便 'openspec update' 可以刷新指令。
<!-- OPENSPEC:END -->
```

### 要求：交互模式

命令应为 AI 工具选择提供带有清晰导航说明的交互式菜单。

#### 场景：显示交互式菜单

- **当** 在全新或扩展模式下运行时
- **则** 呈现一个循环选择菜单，允许用户使用空格键切换工具，并使用回车键查看选择
- **并** 当按下回车键选择高亮显示但尚未选择的可选工具时，自动将其添加到选择中，然后再进行查看，以便配置高亮显示的工具
- **并** 将已配置的工具标记为"（已配置）"，同时将禁用选项标记为"即将推出"
- **并** 在扩展模式下将提示文本更改为"您要添加或刷新哪些 AI 工具？"
- **并** 显示内联说明，阐明空格键切换工具，回车键在选择高亮显示的工具后查看选择

### 要求：安全检查

命令应执行安全检查，以防止覆盖现有结构并确保适当的权限。

#### 场景：检测现有初始化

- **当** `openspec/` 目录已存在时
- **则** 通知用户 OpenSpec 已初始化，跳过重新创建基础结构，并进入扩展模式
- **并** 继续执行 AI 工具选择步骤，以便可以配置其他工具
- **并** 仅当用户拒绝添加任何 AI 工具时才显示现有初始化错误消息

### 要求：成功输出

命令应在成功初始化后提供清晰、可操作的后续步骤。

#### 场景：显示成功消息

- **当** 初始化成功完成时
- **则** 包含提示："请从 openspec/AGENTS.md 解释 OpenSpec 工作流程以及我应如何与您在此项目上合作"

### 要求：退出代码

命令应使用一致的退出代码来指示不同的失败模式。

#### 场景：返回退出代码

- **当** 命令完成时
- **则** 返回适当的退出代码：
  - 0：成功
  - 1：一般错误（包括 OpenSpec 目录已存在时）
  - 2：权限不足（保留供将来使用）
  - 3：用户取消操作（保留供将来使用）

### 要求：额外的 AI 工具初始化

`openspec init` 应允许用户在初始设置后为新的 AI 编码助手添加配置文件。

#### 场景：在初始设置后配置额外工具

- **假设** `openspec/` 目录已存在且至少存在一个 AI 工具文件
- **当** 用户运行 `openspec init` 并选择不同的受支持 AI 工具时
- **则** 以与首次初始化相同的方式生成该工具的配置文件，并带有 OpenSpec 标记
- **并** 除了需要刷新的托管部分外，保持现有工具配置文件不变
- **并** 以代码 0 退出，并显示成功摘要，突出显示新添加的工具文件

### 要求：成功输出增强

`openspec init` 应在初始化或扩展模式完成后总结工具操作。

#### 场景：显示工具摘要

- **当** 命令成功完成时
- **则** 显示已创建、刷新或跳过（包括已配置的跳过）的工具有类别摘要
- **并** 使用选定工具的名称个性化"后续步骤"标题，当没有剩余工具时默认为通用标签

### 要求：退出代码调整

`openspec init` 应将没有新原生工具选择的扩展模式视为成功刷新。

#### 场景：允许空扩展运行

- **当** OpenSpec 已初始化且用户未选择其他原生支持工具时
- **则** 成功完成，同时刷新根 `AGENTS.md` 存根
- **并** 以代码 0 退出

### 要求：斜杠命令配置

初始化命令应使用共享模板为支持的编辑器生成斜杠命令文件。

#### 场景：为 Claude Code 生成斜杠命令

- **当** 用户在初始化期间选择 Claude Code 时
- **则** 创建 `.claude/commands/openspec/proposal.md`、`.claude/commands/openspec/apply.md` 和 `.claude/commands/openspec/archive.md`
- **并** 从共享模板填充每个文件，以便命令文本与其他工具匹配
- **并** 每个模板包含相关 OpenSpec 工作流程阶段的指令

#### 场景：为 Cursor 生成斜杠命令

- **当** 用户在初始化期间选择 Cursor 时
- **则** 创建 `.cursor/commands/openspec-proposal.md`、`.cursor/commands/openspec-apply.md` 和 `.cursor/commands/openspec-archive.md`
- **并** 从共享模板填充每个文件，以便命令文本与其他工具匹配
- **并** 每个模板包含相关 OpenSpec 工作流程阶段的指令

#### 场景：为 OpenCode 生成斜杠命令

- **当** 用户在初始化期间选择 OpenCode 时
- **则** 创建 `.opencode/commands/openspec-proposal.md`、`.opencode/commands/openspec-apply.md` 和 `.opencode/commands/openspec-archive.md`
- **并** 从共享模板填充每个文件，以便命令文本与其他工具匹配
- **并** 每个模板包含相关 OpenSpec 工作流程阶段的指令

#### 场景：为 Windsurf 生成斜杠命令

- **当** 用户在初始化期间选择 Windsurf 时
- **则** 创建 `.windsurf/workflows/openspec-proposal.md`、`.windsurf/workflows/openspec-apply.md` 和 `.windsurf/workflows/openspec-archive.md`
- **并** 从共享模板填充每个文件（用 OpenSpec 标记包装），以便工作流程文本与其他工具匹配
- **并** 每个模板包含相关 OpenSpec 工作流程阶段的指令

#### 场景：为 Kilo Code 生成斜杠命令

- **当** 用户在初始化期间选择 Kilo Code 时
- **则** 创建 `.kilocode/workflows/openspec-proposal.md`、`.kilocode/workflows/openspec-apply.md` 和 `.kilocode/workflows/openspec-archive.md`
- **并** 从共享模板填充每个文件（用 OpenSpec 标记包装），以便工作流程文本与其他工具匹配
- **并** 每个模板包含相关 OpenSpec 工作流程阶段的指令

#### 场景：为 Codex 生成斜杠命令

- **当** 用户在初始化期间选择 Codex 时
- **则** 在 `~/.codex/prompts/openspec-proposal.md`、`~/.codex/prompts/openspec-apply.md` 和 `~/.codex/prompts/openspec-archive.md` 创建全局提示文件（或在 `$CODEX_HOME/prompts` 下，如果已设置）
- **并** 从共享模板填充每个文件，将第一个编号占位符（`$1`）映射到主要用户输入（例如，变更标识符或问题文本）
- **并** 用 OpenSpec 标记包装生成的内容，以便 `openspec update` 可以刷新提示而不触及周围的定制注释

#### 场景：为 GitHub Copilot 生成斜杠命令

- **当** 用户在初始化期间选择 GitHub Copilot 时
- **则** 创建 `.github/prompts/openspec-proposal.prompt.md`、`.github/prompts/openspec-apply.prompt.md` 和 `.github/prompts/openspec-archive.prompt.md`
- **并** 使用包含总结工作流程阶段的 `description` 字段的 YAML 前端元数据填充每个文件
- **并** 包含 `$ARGUMENTS` 占位符以捕获用户输入
- **并** 用 OpenSpec 标记包装共享模板主体，以便 `openspec update` 可以刷新内容
- **并** 每个模板包含相关 OpenSpec 工作流程阶段的指令

### 要求：非交互模式

命令应通过命令行选项支持非交互操作，以便自动化和 CI/CD 使用案例。

#### 场景：非交互式选择所有工具

- **当** 使用 `--tools all` 运行时
- **则** 自动选择每个可用的 AI 工具而不提示
- **并** 使用选定的工具进行初始化

#### 场景：非交互式选择特定工具

- **当** 使用 `--tools claude,cursor` 运行时
- **则** 解析逗号分隔的工具 ID 并根据可用工具进行验证
- **并** 仅使用指定的有效工具进行初始化

#### 场景：非交互式跳过工具配置

- **当** 使用 `--tools none` 运行时
- **则** 完全跳过 AI 工具配置
- **并** 仅创建 OpenSpec 目录结构和模板文件

#### 场景：无效的工具规范

- **当** 使用包含任何不在 AI 工具注册表中的 ID 的 `--tools` 运行时
- **则** 以代码 1 退出并显示可用值（`all`、`none` 或受支持的工具 ID）

#### 场景：帮助文本列出可用的工具 ID

- **当** 显示 `openspec init` 的 CLI 帮助时
- **则** 显示 `--tools` 选项描述，其中包含从 AI 工具注册表派生的有效值

### 要求：根指令存根

`openspec init` 应始终搭建根级别的 `AGENTS.md` 交接，以便每个队友都能找到主要的 OpenSpec 指令。

#### 场景：创建根 `AGENTS.md`

- **假设** 项目可能已经包含也可能不包含 `AGENTS.md` 文件
- **当** 在全新或扩展模式下完成初始化时
- **则** 使用来自 `TemplateManager.getAgentsStandardTemplate()` 的托管标记块在存储库根目录创建或刷新 `AGENTS.md`
- **并** 保留托管标记之外的任何现有内容，同时替换其中的存根文本
- **并** 无论选择哪些原生 AI 工具，都创建存根

## 原因

手动创建 OpenSpec 结构容易出错且会产生采用摩擦。标准化的初始化命令确保：
- 所有项目中的结构一致
- 始终包含适当的 AI 指令文件
- 新项目的快速入门
- 从一开始就有清晰的规范