# CLI更新规范增量

## 修改的需求

### 需求：斜杠命令更新
更新命令应刷新配置工具的现有斜杠命令文件而不创建新文件，并确保OpenCode归档命令接受变更ID参数。

#### 场景：更新OpenCode的斜杠命令
- **当** `.opencode/command/` 包含 `openspec-proposal.md`、`openspec-apply.md` 和 `openspec-archive.md`
- **那么** 使用共享模板刷新每个文件
- **并且** 确保模板包含相关工作流程阶段的说明
- **并且** 确保归档命令在前置数据中包含 `$ARGUMENTS` 占位符以接受变更ID参数

## 新增的需求

### 需求：归档命令参数支持
归档斜杠命令模板应支持可选的变更ID参数，适用于支持 `$ARGUMENTS` 占位符的工具。

#### 场景：带变更ID参数的归档命令
- **当** 用户使用变更ID调用 `/openspec:archive <change-id>`
- **那么** 模板应指示AI根据 `openspec list` 验证提供的变更ID
- **并且** 如果有效，使用提供的变更ID进行归档
- **并且** 如果提供的变更ID不匹配可归档的变更，快速失败

#### 场景：不带参数的归档命令（向后兼容）
- **当** 用户调用 `/openspec:archive` 而不提供变更ID
- **那么** 模板应指示AI从上下文或运行 `openspec list` 来识别变更ID
- **并且** 继续使用现有行为（保持向后兼容）

#### 场景：OpenCode归档模板生成
- **当** 生成OpenCode归档斜杠命令文件时
- **那么** 在前置数据中包含 `$ARGUMENTS` 占位符
- **并且** 将其包装在清晰的结构中，如 `<ChangeId>\n  $ARGUMENTS\n</ChangeId>` 以指示期望的参数
- **并且** 在模板主体中包含验证步骤以检查变更ID是否有效