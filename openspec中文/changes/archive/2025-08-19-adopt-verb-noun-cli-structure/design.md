# 设计：动词-名词 CLI 结构采用

## 概述
我们将使动词命令（`list`、`show`、`validate`、`diff`、`archive`）成为主要接口，并将名词命令（`spec`、`change`）作为已弃用别名保持一个发布。

## 决策

1. 保持路由集中在 `src/cli/index.ts`。
2. 向 `openspec list` 添加 `--specs`/`--changes`，以 `--changes` 为默认值。
3. 对 `openspec change list` 以及更一般的任何 `openspec change ...` 和 `openspec spec ...` 子命令显示弃用警告。
4. 不改变 `show`/`validate` 行为超出帮助文本；它们已经支持 `--type` 用于消歧。

## 向后兼容性
所有名词基础命令继续工作，带有明确的弃用警告，指导用户使用动词优先的等效命令。

## 范围外
`openspec list` 跨模式的 JSON 输出对等性和 `show --specs/--changes` 发现是后续工作。