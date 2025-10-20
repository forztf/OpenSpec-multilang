## 修改后的要求
### 要求：验证应提供可操作的补救步骤
验证输出应包含修复每个错误的具体指导，包括期望的结构、示例标题和建议的命令以验证修复。

#### 场景：变更中未找到增量
- **当** 验证零个解析增量的变更时
- **则** 显示错误"未找到增量"并提供指导：
  - 解释变更规范必须包含 `## ADDED Requirements`、`## MODIFIED Requirements`、`## REMOVED Requirements` 或 `## RENAMED Requirements`
  - 提醒作者文件必须位于 `openspec/changes/{id}/specs/<capability>/spec.md` 下
  - 包含明确说明："规范增量文件不能在操作标题之前以标题开头"
  - 建议运行 `openspec change show {id} --json --deltas-only` 进行调试

#### 场景：缺少必需部分
- **当** 缺少必需部分时
- **则** 包含期望的标题名称和最小骨架：
  - 对于规范：`## Purpose`、`## Requirements`
  - 对于变更：`## Why`、`## What Changes`
  - 提供缺少部分的示例片段，其中包含可复制的占位符散文
  - 提及 `openspec/AGENTS.md` 中的快速参考部分作为权威模板

#### 场景：缺少要求描述文本
- **当** 要求标题在场景之前缺少描述性文本时
- **则** 发出错误，解释 `### Requirement:` 行后面必须在任何 `#### Scenario:` 标题之前有叙述性文本
  - 显示合规示例："### Requirement: Foo" 后跟 "The system SHALL ..."
  - 建议在列出场景之前添加 1-2 句描述规范行为的句子
  - 引用 `openspec/AGENTS.md` 中的预验证检查清单

### 要求：验证器应检测可能格式错误的场景并发出带有修复的警告
验证器应识别看起来像场景的项目符号行（例如，以 WHEN/THEN/AND 开头的行），并发出带有转换示例到 `#### Scenario:` 的定向警告。

#### 场景：要求下的项目符号 WHEN/THEN
- **当** 在没有 `#### Scenario:` 标题的要求下找到以 WHEN/THEN/AND 开头的项目符号时
- **则** 发出警告："场景必须使用 '#### Scenario:' 标题"，并显示转换模板：
```
#### 场景：简短名称
- **当** ...
- **则** ...
- **并且** ...
```