## 新增的需求
### 需求：范围感知的变更验证
验证器应仅验证变更中存在的工件，避免对仅提案或仅工具变更报错。

#### 场景：仅提案变更
- **当** 变更包含`proposal.md`但没有`specs/`目录或包含无`*/spec.md`文件
- **那么** 验证提案（Why/What部分）
- **并且** 不需要或验证规范增量

#### 场景：当规范存在时的增量验证
- **当** 变更包含一个或多个`specs/<capability>/spec.md`文件
- **那么** 使用现有规则验证增量格式的规范（SHALL/MUST、场景、重复、冲突）

## 修改的需求
### 需求：验证应提供可操作的修复步骤
验证输出应包含修复每个错误的具体指导，包括预期结构、示例标题和建议的命令来验证修复。

#### 场景：变更中未找到增量
- **当** 验证包含`specs/`且有一个或多个`*/spec.md`文件但解析器找到零增量的变更
- **那么** 显示错误"No deltas found"并提供指导：
  - 确保`openspec/changes/{id}/specs/`有包含增量标题的`.md`文件
  - 使用增量标题：`## ADDED Requirements`、`## MODIFIED Requirements`、`## REMOVED Requirements`、`## RENAMED Requirements`
  - 每个需求必须包含至少一个`#### Scenario:`块
  - 尝试：`openspec change show {id} --json --deltas-only`来检查解析的增量