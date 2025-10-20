# CLI 验证命令规范

## 新增要求

### 要求：顶级验证命令

CLI 应提供一个顶级 `validate` 命令，用于验证变更和规范，并带有灵活的选择选项。

#### 场景：交互式验证选择

- **当** 执行 `openspec validate` 无参数时
- **则** 提示用户选择要验证的内容（全部、变更、规范或特定项目）
- **并且** 根据选择执行验证
- **并且** 显示适当格式的结果

#### 场景：非交互式环境不提示

- **假设** stdin 不是 TTY 或提供了 `--no-interactive` 或环境变量 `OPEN_SPEC_INTERACTIVE=0`
- **当** 执行 `openspec validate` 无参数时
- **则** 不进行交互式提示
- **并且** 打印有用的提示，列出可用命令/标志并以代码 1 退出

#### 场景：直接项目验证

- **当** 执行 `openspec validate <item-name>` 时
- **则** 自动检测项目是变更还是规范
- **并且** 验证指定项目
- **并且** 显示验证结果

### 要求：批量和过滤验证

验证命令应支持批量验证标志（--all）和按类型过滤验证（--changes、--specs）。

#### 场景：验证所有内容

- **当** 执行 `openspec validate --all` 时
- **则** 验证 openspec/changes/ 下的所有变更（排除归档）
- **并且** 验证 openspec/specs/ 下的所有规范
- **并且** 显示通过/失败项目的摘要
- **并且** 如果任何验证失败则以代码 1 退出

#### 场景：批量验证范围

- **当** 使用 `--all` 或 `--changes` 验证时
- **则** 包含 `openspec/changes/` 下的所有变更提案
- **并且** 排除 `openspec/changes/archive/` 目录

- **当** 使用 `--specs` 验证时
- **则** 包含 `openspec/specs/<id>/spec.md` 下的所有规范

#### 场景：验证所有变更

- **当** 执行 `openspec validate --changes` 时
- **则** 验证 openspec/changes/ 下的所有变更（排除归档）
- **并且** 显示每个变更的结果
- **并且** 显示摘要统计

#### 场景：验证所有规范

- **当** 执行 `openspec validate --specs` 时
- **则** 验证 openspec/specs/ 下的所有规范
- **并且** 显示每个规范的结果
- **并且** 显示摘要统计

### 要求：验证选项和进度指示

验证命令应支持标准验证选项（--strict、--json）并在批量操作期间显示进度。

#### 场景：严格验证

- **当** 执行 `openspec validate --all --strict` 时
- **则** 对所有项目应用严格验证
- **并且** 将警告视为错误
- **并且** 如果任何项目有警告或错误则失败

#### 场景：JSON 输出

- **当** 执行 `openspec validate --all --json` 时
- **则** 将验证结果输出为 JSON
- **并且** 包含每个项目的详细问题
- **并且** 包含摘要统计

#### 场景：批量验证的 JSON 输出模式

- **当** 执行 `openspec validate --all --json`（或 `--changes` / `--specs`）时
- **则** 输出具有以下形状的 JSON 对象：
  - `items`：包含字段 `{ id: string, type: "change"|"spec", valid: boolean, issues: Issue[], durationMs: number }` 的对象数组
  - `summary`：对象 `{ totals: { items: number, passed: number, failed: number }, byType: { change?: { items: number, passed: number, failed: number }, spec?: { items: number, passed: number, failed: number } } }`
  - `version`：模式的字符串标识符（例如，`"1.0"`）
- **并且** 如果任何 `items[].valid === false` 则以代码 1 退出

其中 `Issue` 遵循现有的每项目验证报告形状 `{ level: "ERROR"|"WARNING"|"INFO", path: string, message: string }`。

#### 场景：显示验证进度

- **当** 验证多个项目（--all、--changes 或 --specs）时
- **则** 显示进度指示器或状态更新
- **并且** 指示当前正在验证的项目
- **并且** 显示通过/失败项目的运行计数

#### 场景：性能的并发限制

- **当** 验证多个项目时
- **则** 以有界并发运行验证（例如，4-8 个并行）
- **并且** 确保进度指示器保持响应

### 要求：项目类型检测和歧义处理

验证命令应处理歧义名称和显式类型覆盖，以确保清晰、确定的行为。

#### 场景：带自动类型检测的直接项目验证

- **当** 执行 `openspec validate <item-name>` 时
- **则** 如果 `<item-name>` 唯一匹配变更或规范，则验证该项目

#### 场景：变更和规范名称之间的歧义

- **假设** `<item-name>` 同时作为变更和规范存在
- **当** 执行 `openspec validate <item-name>` 时
- **则** 打印解释两个匹配的歧义错误
- **并且** 建议传递 `--type change` 或 `--type spec`，或使用 `openspec change validate` / `openspec spec validate`
- **并且** 不执行验证以代码 1 退出

#### 场景：未知项目名称

- **当** `<item-name>` 既不匹配变更也不匹配规范时
- **则** 打印未找到错误
- **并且** 在可用时显示最近匹配建议
- **并且** 以代码 1 退出

#### 场景：显式类型覆盖

- **当** 执行 `openspec validate --type change <item>` 时
- **则** 将 `<item>` 视为变更 ID 并验证它（跳过自动检测）

- **当** 执行 `openspec validate --type spec <item>` 时
- **则** 将 `<item>` 视为规范 ID 并验证它（跳过自动检测）

### 要求：交互性控制

- CLI 应尊重 `--no-interactive` 以禁用提示。
- CLI 应尊重 `OPEN_SPEC_INTERACTIVE=0` 以全局禁用提示。
- 交互式提示应仅在 stdin 是 TTY 且未禁用交互性时显示。

#### 场景：通过标志或环境禁用提示

- **当** 使用 `--no-interactive` 或环境 `OPEN_SPEC_INTERACTIVE=0` 执行 `openspec validate` 时
- **则** CLI 不应显示交互式提示
- **并且** 应适当打印非交互式提示或选择的输出