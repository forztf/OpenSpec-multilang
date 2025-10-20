# 设计：规范命令

## 架构决策

### 命令层次结构
我们选择了子命令模式（`spec show`、`spec list`、`spec validate`）以：
- 在通用命名空间下分组相关功能
- 启用未来可扩展性而不污染顶层 CLI
- 与计划的 `change` 命令结构保持一致

### JSON 模式结构
规范 JSON 模式遵循以下结构：
```typescript
{
  version: string,        // 用于兼容性的模式版本
  format: "spec",        // 标识这是规范文档
  sourcePath: string,    // 原始 markdown 文件路径
  id: string,           // 来自文件名的规范标识符
  title: string,        // 人类可读的标题
  overview?: string,    // 可选的概述部分
  requirements: Array<{
    id: string,
    text: string,
    scenarios: Array<{
      id: string,
      text: string
    }>
  }>
}
```

**理由：**
- 要求数组的扁平结构（vs 嵌套对象）便于迭代
- 场景嵌套在要求内以保持关系
- 元数据字段（version, format, sourcePath）用于工具集成

### 解析器架构
- **Markdown 优先方法**：解析 markdown 标题而非自定义语法
- **流式解析器**：逐行处理以高效处理大文件
- **严格的标题层次结构**：强制执行 ##/###/#### 结构以保持一致性

### 验证策略
- **解析时验证**：在解析过程中捕获结构问题
- **模式验证**：使用 Zod 进行解析数据的运行时类型检查
- **单独的验证命令**：允许在不完全解析/转换的情况下进行验证