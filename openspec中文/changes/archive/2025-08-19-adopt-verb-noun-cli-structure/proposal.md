# 变更：采用动词-名词 CLI 结构（弃用名词基础命令）

## 为什么

大多数广泛使用的 CLI（git、docker、kubectl）以动作（动词）开始，后跟对象（名词）。这符合用户的思维方式："对 Y 做 X"。使用动词作为顶级命令可以提高清晰度、可发现性和可扩展性。

## 变更内容

- 推广顶级动词命令作为主要入口点：`list`、`show`、`validate`、`diff`、`archive`。
- 弃用名词基础的顶级命令：`openspec spec ...` 和 `openspec change ...`。
- 在适用时通过标志引入一致的名词范围（例如，`--changes`、`--specs`）并保持智能默认值。
- 当名称冲突时为 `show` 和 `validate` 澄清消歧。

### 映射（从 → 到）

- **列表**
  - 从：`openspec change list`
  - 到：`openspec list --changes`（默认），或 `openspec list --specs`

- **显示**
  - 从：`openspec spec show <spec-id>` / `openspec change show <change-id>`
  - 到：`openspec show <item-id>` 带自动检测，如歧义使用 `--type spec|change`

- **验证**
  - 从：`openspec spec validate <spec-id>` / `openspec change validate <change-id>`
  - 到：`openspec validate <item-id> --type spec|change`，或批量：`openspec validate --specs` / `--changes` / `--all`

### 向后兼容性

- 保持 `openspec spec` 和 `openspec change` 可用，带一个发布周期的弃用警告。
- 更新帮助文本以指向动词-名词替代方案。

## 影响

- **受影响的规范**：
  - `cli-list`：添加 `--specs` 支持和显式 `--changes`（默认保持变更为默认）
  - `openspec-conventions`：添加明确要求建立动词-名词 CLI 设计和弃用指导
- **受影响的代码**：
  - `src/cli/index.ts`：取消顶级 `list` 的弃用；将 `change list` 标记为已弃用；确保帮助文本和警告对齐
  - `src/core/list.ts`：支持通过 `--specs` 列出规范并默认为变更；共享输出形状
  - 可选跟进：收紧 `show`/`validate` 帮助和歧义处理

## 明确变更

**CLI 设计**
- 从：混合模型带有名词（`spec`、`change`）和一些顶级动词；`openspec list` 目前已弃用
- 到：动词作为主要：`openspec list|show|validate|diff|archive`；名词通过标志或项目 ID 范围；名词命令已弃用
- 原因：与常见 CLI 对齐；改善用户体验；更简单的心理模型
- 影响：非破坏性带弃用期；用户逐步迁移

**列表行为**
- 从：`openspec change list`（主要），`openspec list`（已弃用）
- 到：`openspec list` 作为主要，默认为 `--changes`；添加 `--specs` 列出规范
- 原因：一致的动词-名词风格；更好的可发现性
- 影响：新选项；通过默认值保持现有行为

## 推出和弃用策略

- 在一个发布中对名词基础命令显示弃用警告。
- 在 `openspec/README.md` 和 CLI 帮助中记录新用法。
- 一个发布后，考虑移除名词基础命令，或保持为无警告的瘦别名。

## 开放问题

- `show` 是否也应接受 `--changes`/`--specs` 用于无 ID 的发现？（此处范围外；当前自动检测和 `--type` 保持。）