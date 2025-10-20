# 变更：改进确定性测试（与仓库状态隔离）

## 问题

一些单元测试（例如，ChangeCommand.show/validate）通过 `process.cwd()` 和 `openspec/changes` 读取实时仓库状态。这使得结果依赖于恰好存在的目录和 `fs.readdir` 返回的顺序，导致跨环境的不稳定成功/失败。

观察到的症状：
- 测试有时选择部分或不相关的变更文件夹。
- 当选择到无关的变更目录时出现缺少 `proposal.md` 的失败。
- 环境/沙箱差异改变 `readdir` 排序和工作进程行为。

## 目标

- 使测试确定性和封闭性。
- 移除对真实仓库内容和目录排序的依赖。
- 保持运行时行为对最终用户不变。

## 非目标

- 引入重型框架或测试工具复杂性。
- 重新设计 CLI 行为或更改用户的默认路径。

## 方法

1) 测试本地夹具根目录
- 每个接触文件系统发现的套件创建一个临时目录：
  - `openspec/changes/sample-change/proposal.md`
  - `openspec/changes/sample-change/specs/sample/spec.md`
- `beforeAll`：`process.chdir(tmpRoot)`；`afterAll`：恢复原始 cwd。
- 使用常量 `changeName = 'sample-change'`；移除对 `readdir` 顺序的依赖。

2) 可选的轻量级 DI 用于命令（如需要，最小化）
- 允许 `ChangeCommand`（及类似）接受可选的 `root` 路径（默认 `process.cwd()`），用于路径解析。
- 测试显式传递临时根目录；生产代码保持不变。

3) 强化发现助手（安全增强）
- 更新 `getActiveChangeIds()`/`getActiveChanges()` 仅包含包含 `proposal.md` 的目录（可选至少一个 `specs/*/spec.md`）。
- 防止不完整/无关的变更文件夹被视为活动。

## 理由

- 小而集中的变更消除不稳定性，而不改变用户工作流。
- 临时夹具是广为人知的测试模式，保持测试快速。
- 可选的构造函数根参数是最小的 DI 表面，避免全局存根并保持代码简单。

## 风险和缓解措施

- 风险：测试忘记恢复 `process.cwd()`。
  - 缓解：添加 `afterAll` 守护恢复 cwd；在 `afterEach` 中重置修改的 `process.exitCode`。
- 风险：如果 DI 根被误用导致行为分歧。
  - 缓解：默认为 `process.cwd()`；仅测试传递自定义根。

## 验收标准

- 以前依赖仓库状态的测试现在：
  - 创建并使用临时夹具根目录。
  - 执行期间不读取真实的 `openspec/changes`。
  - 无论目录顺序或无关文件夹如何都一致通过。
- CLI 行为对最终用户无变化（路径仍默认为 cwd）。

## 推出

- 阶段 1：将触及 `ChangeCommand.show/validate` 的套件转换为隔离夹具；在本地和 CI 中验证稳定性。
- 阶段 2：将相同模式应用于接触文件发现的任何剩余套件（`list`、`show`、`validate`、`diff`）。
- 阶段 3（可选）：如果阶段 1 不足够，引入构造函数 `root` 参数和发现强化。