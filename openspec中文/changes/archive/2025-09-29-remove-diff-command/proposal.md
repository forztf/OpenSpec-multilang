# 移除 Diff 命令

## 问题

`openspec diff` 命令因以下几个原因给 OpenSpec CLI 增加了不必要的复杂性：

1. **功能冗余**：`openspec show` 命令已经通过结构化 JSON 输出和 markdown 渲染提供了全面的变更可视化
2. **维护负担**：diff 命令需要单独的依赖（jest-diff）和额外的代码复杂性（约 227 行）
3. **价值有限**：开发人员可以使用现有工具实现更好的 diff 可视化：
   - Git diff 用于实际文件变更
   - `show` 命令用于结构化变更查看
   - 标准 diff 实用程序用于直接比较规范文件
4. **不符合动词-名词模式**：该命令不遵循其他命令正在迁移到的首选动词优先命令结构

## 解决方案

完全移除 `openspec diff` 命令并指导用户使用更合适的替代方案：

1. **查看变更内容**：使用 `openspec show <change-name>` 提供：
   - 带 `--json` 标志的结构化 JSON 输出
   - 用于人类可读格式的 markdown 渲染
   - 带 `--deltas-only` 标志的仅增量视图
   - 完整规范内容可视化

2. **比较文件**：使用标准工具：
   - `git diff` 用于版本控制比较
   - 系统 diff 实用程序用于逐文件比较
   - IDE diff 查看器用于视觉比较

## 好处

- **降低复杂性**：移除约 227 行代码和 jest-diff 依赖
- **更清晰的用户旅程**：引导用户使用规范的 `show` 命令查看变更
- **更低的维护成本**：需要维护和测试的命令更少
- **更好的对齐**：专注于核心 OpenSpec 工作流，无冗余功能

## 实现

### 要移除的文件
- `/src/core/diff.ts` - 完整的 diff 命令实现
- `/openspec/specs/cli-diff/spec.md` - diff 命令规范

### 要更新的文件
- `/src/cli/index.ts` - 移除 diff 命令注册（第 8、84-96 行）
- `/package.json` - 移除 jest-diff 依赖
- `/README.md` - 移除 diff 命令文档
- `/openspec/README.md` - 移除 diff 命令引用
- 提及 `openspec diff` 的各种文档文件

### 用户迁移指南

当前使用 `openspec diff` 的用户应过渡到：

```bash
# 之前
openspec diff add-feature

# 之后 - 查看变更提案
openspec show add-feature

# 之后 - 仅查看增量
openspec show add-feature --json --deltas-only

# 之后 - 使用 git 进行文件比较
git diff openspec/specs openspec/changes/add-feature/specs
```

## 风险

- **用户干扰**：现有用户可能有依赖 diff 命令的工作流
  - 缓解措施：提供清晰的迁移指南和弃用期
  
- **失去视觉 diff**：彩色统一 diff 格式将不再可用
  - 缓解措施：用户可以使用 git diff 或其他工具进行视觉比较

## 成功指标

- 成功移除且无损坏依赖
- 文档更新以反映变更
- 无 diff 命令的测试通过
- 通过移除 jest-diff 依赖减小包大小