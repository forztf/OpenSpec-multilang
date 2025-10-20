# 设计：变更命令

## 架构决策

### 命令结构
与规范命令类似，我们使用子命令（`change show`、`change list`、`change validate`）：
- 与规范命令模式保持一致
- 关注点清晰分离
- 为变更管理功能提供未来可扩展性

### 变更的 JSON 模式
```typescript
{
  version: string,           // 模式版本
  format: "change",         // 标识为变更文档
  sourcePath: string,       // 原始 markdown 文件路径
  id: string,              // 变更标识符
  title: string,           // 变更标题
  why: string,            // 动机部分
  whatChanges: Array<{
    type: "ADDED" | "MODIFIED" | "REMOVED" | "RENAMED",
    deltas: Array<{
      specId: string,
      description: string,
      requirements?: Array<Requirement>  // 仅用于 ADDED/MODIFIED
    }>
  }>
}
```

**理由：**
- 按操作类型对差异进行分组以获得更清晰的组织
- 可选的要求字段（仅对 ADDED/MODIFIED 相关）
- 重用规范命令中的 RequirementSchema 以保持一致性

### 差异操作
**四种操作类型：**
1. **ADDED**: 添加到规范的新要求
2. **MODIFIED**: 对现有要求的变更
3. **REMOVED**: 要删除的要求
4. **RENAMED**: 规范标识符变更

**设计选择：** 显式操作类型而非基于差异的方法，因为：
- 在 markdown 中具有人类可读性
- 明确传达意图
- 更易于验证和工具化

### 对规范命令的依赖
- **共享模式**: 重用 RequirementSchema 和 ScenarioSchema
- **实现顺序**: 必须先实现规范命令
- **通用解析器工具**: 共享 markdown 解析逻辑

### 向后兼容性
- 保持现有的 `list` 命令功能并添加弃用警告
- 迁移路径: `list` → `change list` 具有相同功能
- 逐步过渡以避免破坏现有工作流