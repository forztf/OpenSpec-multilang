# cli-validate 规范

## 目的
待定 - 由归档变更 improve-validate-error-messages 创建。归档后更新目的。

## 要求
### 要求：验证应提供可操作的修复步骤

验证输出应包括修复每个错误的具体指导，包括预期结构、示例标题和验证修复的建议命令。

#### 场景：变更中未找到增量

- **当** 验证具有零个解析增量的变更时
- **则** 显示错误"未找到增量"，并提供指导：
  - 解释变更规范必须包括 `## ADDED Requirements`、`## MODIFIED Requirements`、`## REMOVED Requirements` 或 `## RENAMED Requirements`
  - 提醒作者文件必须位于 `openspec/changes/{id}/specs/<capability>/spec.md` 下
  - 包含明确说明："规范增量文件不能在操作标题之前以标题开头"
  - 建议运行 `openspec change show {id} --json --deltas-only` 进行调试

#### 场景：缺失必需部分

- **当** 缺少必需部分时
- **则** 包括预期的标题名称和最小骨架：
  - 对于规范：`## Purpose`、`## Requirements`
  - 对于变更：`## Why`、`## What Changes`
  - 提供缺失部分的示例片段，其中包含可复制的占位符文本
  - 提及 `openspec/AGENTS.md` 中的快速参考部分作为权威模板

#### 场景：缺失需求描述性文本

- **当** 需求标题在场景之前缺少描述性文本时
- **则** 发出错误，解释 `### Requirement:` 行必须在任何 `#### Scenario:` 标题之前后跟叙述性文本
  - 显示合规示例："### Requirement: Foo" 后跟 "系统应..."
  - 建议在列出场景之前添加 1-2 句描述规范性行为的句子
  - 引用 `openspec/AGENTS.md` 中的预验证清单

### 要求：验证器应检测可能格式错误的场景并发出修复警告

验证器应识别看起来像场景的带项目符号行（例如，以 WHEN/THEN/AND 开头的行），并发出带有到 `#### Scenario:` 转换示例的针对性警告。

#### 场景：需求下的带项目符号 WHEN/THEN

- **当** 在需求下找到以 WHEN/THEN/AND 开头的项目符号，但没有 `#### Scenario:` 标题时
- **则** 发出警告："场景必须使用 '#### Scenario:' 标题"，并显示转换模板：
```
#### Scenario: 简短名称
- **WHEN** ...
- **THEN** ...
- **AND** ...
```

### 要求：所有问题应包括文件路径和结构化位置

错误、警告和信息消息应包括：
- 源文件路径（`openspec/changes/{id}/proposal.md`、`.../specs/{cap}/spec.md`）
- 结构化路径（例如，`deltas[0].requirements[0].scenarios`）

#### 场景：Zod 验证错误

- **当** 模式验证失败时
- **则** 消息应包括 `file`、`path` 和适用的修复提示

### 要求：无效结果应在人类可读输出中包含后续步骤页脚

当项目无效且未使用 `--json` 时，CLI 应附加一个后续步骤页脚，包括：
- 带有计数的摘要行
- 前 3 个指导要点（针对最常见或阻止性错误）
- 建议使用 `--json` 和/或调试命令重新运行

#### 场景：变更无效摘要

- **当** 变更验证失败时
- **则** 打印"后续步骤"，其中包含 2-3 个针对性要点，并建议 `openspec change show <id> --json --deltas-only`

### 要求：顶级验证命令

CLI 应提供具有灵活选择选项的顶级 `validate` 命令，用于验证变更和规范。

#### 场景：交互式验证选择

- **当** 执行不带参数的 `openspec validate` 时
- **则** 提示用户选择要验证的内容（全部、变更、规范或特定项目）
- **并** 根据选择执行验证
- **并** 使用适当的格式化显示结果

#### 场景：非交互式环境不提示

- **假设** 标准输入不是 TTY 或提供了 `--no-interactive` 或设置了环境变量 `OPEN_SPEC_INTERACTIVE=0`
- **当** 执行不带参数的 `openspec validate` 时
- **则** 不进行交互式提示
- **并** 打印有帮助的提示，列出可用的命令/标志，并以代码 1 退出

#### 场景：直接项目验证

- **当** 执行 `openspec validate <item-name>` 时
- **则** 自动检测项目是变更还是规范
- **并** 验证指定项目
- **并** 显示验证结果

### 要求：批量和过滤验证

验证命令应支持批量验证（--all）和按类型过滤验证（--changes、--specs）的标志。

#### 场景：验证所有内容

- **当** 执行 `openspec validate --all` 时
- **则** 验证 `openspec/changes/` 中的所有变更（排除 archive）
- **并** 验证 `openspec/specs/` 中的所有规范
- **并** 显示显示通过/失败项目的摘要
- **并** 如果任何验证失败，则以代码 1 退出

#### 场景：批量验证的范围

- **当** 使用 `--all` 或 `--changes` 验证时
- **则** 包括 `openspec/changes/` 下的所有变更提案
- **并** 排除 `openspec/changes/archive/` 目录

- **当** 使用 `--specs` 验证时
- **则** 包括在 `openspec/specs/<id>/spec.md` 下具有 `spec.md` 的所有规范

#### 场景：验证所有变更

- **当** 执行 `openspec validate --changes` 时
- **则** 验证 `openspec/changes/` 中的所有变更（排除 archive）
- **并** 显示每个变更的结果
- **并** 显示摘要统计信息

#### 场景：验证所有规范

- **当** 执行 `openspec validate --specs` 时
- **则** 验证 `openspec/specs/` 中的所有规范
- **并** 显示每个规范的结果
- **并** 显示摘要统计信息

### 要求：验证选项和进度指示

验证命令应支持标准验证选项（--strict、--json）并在批量操作期间显示进度。

#### 场景：严格验证

- **当** 执行 `openspec validate --all --strict` 时
- **则** 对所有项目应用严格验证
- **并** 将警告视为错误
- **并** 如果任何项目有警告或错误，则失败

#### 场景：JSON 输出

- **当** 执行 `openspec validate --all --json` 时
- **则** 以 JSON 格式输出验证结果
- **并** 包括每个项目的详细问题
- **并** 包括摘要统计信息

#### 场景：批量验证的 JSON 输出模式

- **当** 执行 `openspec validate --all --json`（或 `--changes` / `--specs`）时
- **则** 输出具有以下形状的 JSON 对象：
  - `items`：具有字段 `{ id: string, type: "change"|"spec", valid: boolean, issues: Issue[], durationMs: number }` 的对象数组
  - `summary`：对象 `{ totals: { items: number, passed: number, failed: number }, byType: { change?: { items: number, passed: number, failed: number }, spec?: { items: number, passed: number, failed: number } } }`
  - `version`：模式的字符串标识符（例如，`"1.0"`）
- **并** 如果任何 `items[].valid === false`，则以代码 1 退出

其中 `Issue` 遵循现有的每项目验证报告形状 `{ level: "ERROR"|"WARNING"|"INFO", path: string, message: string }`。

#### 场景：显示验证进度

- **当** 验证多个项目（--all、--changes 或 --specs）时
- **则** 显示进度指示器或状态更新
- **并** 指示当前正在验证哪个项目
- **并** 显示通过/失败项目的运行计数

#### 场景：性能的并发限制

- **当** 验证多个项目时
- **则** 使用有界并发（例如，并行 4-8 个）运行验证
- **并** 确保进度指示器保持响应

### 要求：项目类型检测和歧义处理

验证命令应处理模糊名称和显式类型覆盖，以确保清晰、确定性的行为。

#### 场景：具有自动类型检测的直接项目验证

- **当** 执行 `openspec validate <item-name>` 时
- **则** 如果 `<item-name>` 唯一匹配变更或规范，则验证该项目

#### 场景：变更和规范名称之间的歧义

- **假设** `<item-name>` 同时作为变更和规范存在
- **当** 执行 `openspec validate <item-name>` 时
- **则** 打印歧义错误，解释两个匹配项
- **并** 建议传递 `--type change` 或 `--type spec`，或使用 `openspec change validate` / `openspec spec validate`
- **并** 在不执行验证的情况下以代码 1 退出

#### 场景：未知项目名称

- **当** `<item-name>` 既不匹配变更也不匹配规范时
- **则** 打印未找到错误
- **并** 在可用时显示最近匹配建议
- **并** 以代码 1 退出

#### 场景：显式类型覆盖

- **当** 执行 `openspec validate --type change <item>` 时
- **则** 将 `<item>` 视为变更 ID 并验证它（跳过自动检测）

- **当** 执行 `openspec validate --type spec <item>` 时
- **则** 将 `<item>` 视为规范 ID 并验证它（跳过自动检测）

### 要求：交互性控制

- CLI 应遵守 `--no-interactive` 以禁用提示。
- CLI 应遵守 `OPEN_SPEC_INTERACTIVE=0` 以全局禁用提示。
- 仅当标准输入是 TTY 且未禁用交互性时才显示交互式提示。

#### 场景：通过标志或环境禁用提示

- **当** 使用 `--no-interactive` 或环境 `OPEN_SPEC_INTERACTIVE=0` 执行 `openspec validate` 时
- **则** CLI 不应显示交互式提示
- **并** 应根据需要打印非交互式提示或选定输出

### 要求：解析器应处理跨平台行结尾

Markdown 解析器应正确识别部分，无论行结尾格式如何（LF、CRLF、CR）。

#### 场景：使用 CRLF 行结尾解析必需部分

- **假设** 使用 CRLF 行结尾保存的变更提案 Markdown
- **并** 文档包含 `## Why` 和 `## What Changes`
- **当** 运行 `openspec validate <change-id>` 时
- **则** 验证应识别部分且不应引发解析错误