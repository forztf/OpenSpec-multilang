## 为什么

用户经常需要查看变更和规范，但必须提前知道他们正在查看的是变更还是规范。当前的子命令结构（`change show`、`spec show`）在以下情况下会造成困扰：
- 用户想要快速查看项目而无需记住其类型
- 探索代码库需要在不同显示命令之间切换
- 不带参数的显示命令返回错误而不是有用的指导

## 什么变化

- 添加新的顶层 `show` 命令，用于显示具有智能选择功能的变更或规范
- 支持直接项目显示：`openspec show <item>` 并自动检测类型
- 不提供参数时支持交互式选择
- 增强现有的 `change show` 和 `spec show` 以支持交互式选择（向后兼容）
- 保持所有现有的格式选项（--json, --deltas-only, --requirements 等）

## 影响

- 需要创建的新规范：cli-show
- 需要增强的规范：cli-change, cli-spec（用于向后兼容）
- 受影响的代码：src/cli/index.ts, src/commands/show.ts（新增）, src/commands/spec.ts, src/commands/change.ts