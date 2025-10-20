# cli-show 规范

## 目的
待定 - 由归档变更 add-interactive-show-command 创建。归档后更新目的。

## 要求
### 要求：顶级显示命令

CLI 应提供具有智能选择的顶级 `show` 命令，用于显示变更和规范。

#### 场景：交互式显示选择

- **当** 执行不带参数的 `openspec show` 时
- **则** 提示用户选择类型（变更或规范）
- **并** 显示所选类型的可用项目列表
- **并** 显示所选项目的内容

#### 场景：非交互式环境不提示

- **假设** 标准输入不是 TTY 或提供了 `--no-interactive` 或设置了环境变量 `OPEN_SPEC_INTERACTIVE=0`
- **当** 执行不带参数的 `openspec show` 时
- **则** 不提示
- **并** 打印有帮助的提示，包含 `openspec show <item>` 或 `openspec change/spec show` 的示例
- **并** 以代码 1 退出

#### 场景：直接项目显示

- **当** 执行 `openspec show <item-name>` 时
- **则** 自动检测项目是变更还是规范
- **并** 显示项目的内容
- **并** 根据项目类型使用适当的格式化

#### 场景：类型检测和歧义处理

- **当** 执行 `openspec show <item-name>` 时
- **则** 如果 `<item-name>` 唯一匹配变更或规范，则显示该项目
- **并** 如果两者都匹配，则打印歧义错误并建议 `--type change|spec` 或使用 `openspec change show`/`openspec spec show`
- **并** 如果都不匹配，则打印未找到并带有最近匹配建议

#### 场景：显式类型覆盖

- **当** 执行 `openspec show --type change <item>` 时
- **则** 将 `<item>` 视为变更 ID 并显示它（跳过自动检测）

- **当** 执行 `openspec show --type spec <item>` 时
- **则** 将 `<item>` 视为规范 ID 并显示它（跳过自动检测）

### 要求：输出格式选项

显示命令应支持与现有命令一致的各种输出格式。

#### 场景：JSON 输出

- **当** 执行 `openspec show <item> --json` 时
- **则** 以 JSON 格式输出项目
- **并** 包含解析的元数据和结构
- **并** 保持与现有变更/规范显示命令的格式一致性

#### 场景：标志范围界定和委托

- **当** 通过顶级命令显示变更或规范时
- **则** 接受常见标志，如 `--json`
- **并** 将特定类型的标志传递给相应的实现
  - 仅变更标志：`--deltas-only`（别名 `--requirements-only` 已弃用）
  - 仅规范标志：`--requirements`、`--no-scenarios`、`-r/--requirement`
- **并** 忽略检测类型的无关标志并显示警告

### 要求：交互性控制

- CLI 应遵守 `--no-interactive` 以禁用提示。
- CLI 应遵守 `OPEN_SPEC_INTERACTIVE=0` 以全局禁用提示。
- 仅当标准输入是 TTY 且未禁用交互性时才显示交互式提示。

#### 场景：变更特定选项

- **当** 使用 `openspec show <change-name> --deltas-only` 显示变更时
- **则** 仅以 JSON 格式显示增量
- **并** 保持与现有变更显示选项的兼容性

#### 场景：规范特定选项

- **当** 使用 `openspec show <spec-id> --requirements` 显示规范时
- **则** 仅以 JSON 格式显示需求
- **并** 支持其他规范选项（--no-scenarios、-r）
- **并** 保持与现有规范显示选项的兼容性