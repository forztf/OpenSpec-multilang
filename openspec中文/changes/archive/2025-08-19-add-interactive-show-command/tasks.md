# 实现任务 — 添加交互式显示命令

## 目标
- 添加具有智能选择和类型检测的顶层 `show` 命令。
- 在未提供 ID 时为 `change show` 和 `spec show` 添加交互式选择。
- 保持原始优先输出行为和现有的 JSON 格式/过滤器。
- 始终尊重 `--no-interactive` 和 `OPEN_SPEC_INTERACTIVE=0`。

---

## 1) CLI 连接
- [x] 在 `src/cli/index.ts` 中添加顶层命令：`program.command('show [item-name]')`
  - 选项：
    - `--json`
    - `--type <type>` 其中 `<type>` 是 `change|spec`
    - `--no-interactive`
    - 使用 `.allowUnknownOption(true)` 允许传递特定类型的标志，以便顶层可以将标志转发给底层类型处理器。
  - 操作：实例化 `new ShowCommand().execute(itemName, options)`。
- [x] 更新 `change show` 子命令以接受 `--no-interactive` 并将其传递给 `ChangeCommand.show(...)`。
- [x] 更改 `spec show` 子命令以接受可选 ID（`show [spec-id]`），添加 `--no-interactive`，并传递给规范显示实现。

验收标准：
- `openspec show` 存在并在无参数的非交互环境中打印有用的提示。
- 其他类型的未知标志不会导致解析崩溃；它们会被适当警告/忽略。

---

## 2) 新模块：`src/commands/show.ts`
- [x] 创建 `ShowCommand` 包含：
  - `execute(itemName?: string, options?: { json?: boolean; type?: string; noInteractive?: boolean; [k: string]: any })`
  - 当 `!itemName` 且启用交互时的交互路径：
    - 提示："您想显示什么？" → `change` 或 `spec`。
    - 加载所选类型的可用 ID 并提示选择。
    - 委托给特定类型的显示实现。
  - 当 `!itemName` 时的非交互路径：
    - 打印包含示例的提示：
      - `openspec show <item>`
      - `openspec change show`
      - `openspec spec show`
    - 以代码 1 退出。
  - 当提供 `itemName` 时的直接项目路径：
    - 通过 `--type` 的类型覆盖优先。
    - 否则使用 `getActiveChangeIds()` 和 `getSpecIds()` 进行检测。
    - 如果有歧义且无覆盖：打印错误 + 建议传递 `--type` 或使用子命令；以代码 1 退出。
    - 如果未知：打印未找到并提供最近匹配建议；以代码 1 退出。
    - 成功时：委托给特定类型显示。
- [x] 标志作用域和传递：
  - 通用：`--json` → 转发给两种类型。
  - 仅变更：`--deltas-only`、`--requirements-only`（已弃用别名）。
  - 仅规范：`--requirements`、`--no-scenarios`、`-r/--requirement`。
  - 为已解析类型警告并忽略不相关的标志。

验收标准：
- `openspec show <change-id> --json --deltas-only` 的输出与 `openspec change show <id> --json --deltas-only` 匹配。
- `openspec show <spec-id> --json --requirements` 的输出与 `openspec spec show <id> --json --requirements` 匹配。
- 歧义和未找到行为与 `cli-show` 规范匹配。

---

## 3) 将规范显示重构为可重用 API
- [x] 在 `src/commands/spec.ts` 中，将显示逻辑提取到导出的 `SpecCommand` 中，包含 `show(specId?: string, options?: { json?: boolean; requirements?: boolean; scenarios?: boolean; requirement?: string; noInteractive?: boolean })`。
  - 重用当前助手（`parseSpecFromFile`、`filterSpec`、原始优先打印）。
  - 保留 `registerSpecCommand` 但委托给 `new SpecCommand().show(...)`。
- [x] 更新 CLI 规范显示子命令为可选参数和交互行为（见第 4 节）。

验收标准：
- 现有的 `spec show` 测试继续通过。
- 新的 `SpecCommand.show` 可以从 `ShowCommand` 调用。

---

## 4) 子命令中的向后兼容交互
- [x] `src/commands/change.ts` → 扩展 `show(changeName?: string, options?: { json?: boolean; requirementsOnly?: boolean; deltasOnly?: boolean; noInteractive?: boolean })`：
  - 当 `!changeName` 且启用交互时：从 `getActiveChangeIds()` 提示并显示所选变更。
  - 非交互回退：保持当前行为（打印可用 ID + `openspec change list` 提示，设置 `process.exitCode = 1`）。
- [x] `src/commands/spec.ts` → `SpecCommand.show` 如上：
  - 当 `!specId` 且启用交互时：从 `getSpecIds()` 提示并显示所选规范。
  - 非交互回退：打印与现有行为相同的缺少参数错误并设置非零退出代码。

验收标准：
- 非交互中的 `openspec change show` 打印列表提示并以非零退出。
- 非交互中的 `openspec spec show` 打印缺少参数错误并以非零退出。

---

## 5) 共享工具
- [x] 从 `src/commands/validate.ts` 中提取 `nearestMatches` 和 `levenshtein` 到 `src/utils/match.ts`（导出助手）。
- [x] 更新 `ValidateCommand` 和新的 `ShowCommand` 以从 `utils/match` 导入。

验收标准：
- 构建成功且共享助手无重复。

---

## 6) 提示、警告和消息
- [x] 顶层 `show` 提示（非交互无参数）：
  - 行包括：`openspec show <item>`、`openspec change show`、`openspec spec show` 和"或在交互终端中运行"。
- [x] 歧义消息建议 `--type change|spec` 和子命令。
- [x] 未找到建议最近匹配（最多 5 个）。
- [x] 为已解析类型警告不相关标志（打印到 stderr，不崩溃）。

验收标准：
- 消息与 `cli-show` 规范措辞意图和 elsewhere 使用的样式匹配。

---

## 7) 测试
添加镜像现有模式的测试（通过 `OPEN_SPEC_INTERACTIVE=0` 进行非 TTY 模拟）。

- [x] `test/commands/show.test.ts`
  - 非交互，无参数 → 打印提示并以非零退出。
  - 变更和规范的直接项目检测。
  - 两者都存在时的歧义情况 → 错误和 `--type` 建议。
  - 未找到情况 → 最近匹配建议。
  - 传递标志：变更 `--json --deltas-only`，规范 `--json --requirements`。
- [x] `test/commands/change.interactive-show.test.ts`（非交互回退）
  - 确保无参数的 `openspec change show` 打印可用 ID + 列表提示并以非零退出。
- [x] `test/commands/spec.interactive-show.test.ts`（非交互回退）
  - 确保无参数的 `openspec spec show` 打印缺少参数错误并以非零退出。

验收标准：
- 构建后所有新测试通过；现有测试无回归。

---

## 8) 文档（可选但推荐）
- [x] 更新 `openspec/README.md` 使用示例以包含具有类型检测和标志的新 `show` 命令。

---

## 9) 非功能性检查
- [x] 运行 `pnpm build` 和所有测试（`pnpm test`）。
- [x] 确保无 linter/类型错误且消息与现有样式一致。

---

## 一致性注意事项
- 遵循文本输出的原始优先行为：传递文件内容无格式化，镜像当前 `change show` 和 `spec show`。
- 重用 `isInteractive` 和 `item-discovery` 助手以获得一致的提示行为。
- 保持 JSON 输出形状与当前 `ChangeCommand.show` 和 `spec show` 输出相同。