# CLI Update 规格增量变更

## ADDED Requirements

### Requirement: 语言检测和保持
命令 SHALL 自动检测项目的语言设置并在更新时保持语言一致性。

#### Scenario: 中文项目语言保持
- **WHEN** 在包含中文 `openspec/AGENTS.md` 文件的项目中运行 `openspec update`
- **THEN** 检测到项目使用中文
- **AND** 使用中文模板更新所有相关文件
- **AND** 保持项目的中文语言设置

#### Scenario: 英文项目语言保持
- **WHEN** 在包含英文 `openspec/AGENTS.md` 文件的项目中运行 `openspec update`
- **THEN** 检测到项目使用英文
- **AND** 使用英文模板更新所有相关文件
- **AND** 保持项目的英文语言设置

#### Scenario: 新项目默认行为
- **WHEN** 在没有现有 `openspec/AGENTS.md` 文件的项目中运行 `openspec update`
- **THEN** 默认使用英文模板
- **AND** 生成英文版本的文件

### Requirement: 显式语言覆盖
命令 SHALL 支持通过命令行参数显式指定语言，覆盖自动检测结果。

#### Scenario: 强制使用中文更新
- **WHEN** 运行 `openspec update --language zh-CN` 或 `openspec update --language zh-cn`
- **THEN** 无论项目当前语言如何，都使用中文模板更新
- **AND** 将项目语言切换为中文
- **AND** 支持多种中文语言代码格式：`zh-CN`、`zh-cn`、`zh`

#### Scenario: 强制使用英文更新
- **WHEN** 运行 `openspec update --language en-US` 或 `openspec update --language en-us` 或 `openspec update --language en`
- **THEN** 无论项目当前语言如何，都使用英文模板更新
- **AND** 将项目语言切换为英文
- **AND** 支持多种英文语言代码格式：`en-US`、`en-us`、`en`

#### Scenario: 无效语言参数
- **WHEN** 使用不支持的语言代码运行 `openspec update --language invalid`
- **THEN** 以退出代码 1 退出并显示错误消息
- **AND** 显示支持的语言选项列表

### Requirement: 智能语言检测
命令 SHALL 实现多层次的语言检测机制，按优先级确定使用的语言。

#### 智能语言检测机制
系统按以下优先级检测项目语言：

1. **命令行参数**（最高优先级）
   - 支持标准格式：`zh-CN`、`en-US`
   - 支持小写格式：`zh-cn`、`en-us`
   - 支持简化格式：`zh`、`en`

2. **现有文件内容推断**
   - 检查 `openspec/AGENTS.md` 文件内容
   - 识别中文字符判断为中文项目
   - 无中文字符判断为英文项目

3. **环境变量检测**
   - 检查系统 `LANG` 环境变量
   - 支持格式：`zh_CN.UTF-8`、`zh_cn.UTF-8`、`en_US.UTF-8`
   - 根据语言代码前缀判断语言

4. **默认回退**
   - 当以上方法都无法确定时，默认使用英文

#### Scenario: 命令行参数优先级
- **WHEN** 同时存在命令行参数和项目文件语言设置
- **THEN** 优先使用命令行参数指定的语言
- **AND** 忽略自动检测结果

#### Scenario: 文件内容检测
- **WHEN** 未指定命令行参数且存在 `openspec/AGENTS.md` 文件
- **THEN** 分析文件内容检测中文字符
- **AND** 根据检测结果确定项目语言

#### Scenario: 环境变量回退
- **WHEN** 未指定命令行参数且无法从文件检测语言
- **THEN** 检查系统 `LANG` 环境变量
- **AND** 如果环境变量包含 `zh_CN` 则使用中文，否则使用英文

#### Scenario: 默认回退机制
- **WHEN** 所有检测方法都无法确定语言
- **THEN** 默认使用英文
- **AND** 保持向后兼容性

### Requirement: 一致性模板更新
命令 SHALL 确保所有更新的文件使用相同的语言。

#### Scenario: AGENTS.md 语言一致性
- **WHEN** 检测到或指定使用中文
- **THEN** 使用中文模板更新 `openspec/AGENTS.md`
- **AND** 使用中文模板更新根目录 `AGENTS.md`（如果存在）

#### Scenario: Slash Commands 语言一致性
- **WHEN** 更新 slash command 文件
- **THEN** 所有 slash command 文件使用相同的检测语言
- **AND** 保持与 AGENTS.md 文件的语言一致性

### Requirement: 语言检测日志
命令 SHALL 提供语言检测过程的透明日志信息。

#### Scenario: 检测过程日志
- **WHEN** 运行 update 命令
- **THEN** 记录语言检测的过程和结果
- **AND** 显示最终使用的语言设置

#### Scenario: 检测失败日志
- **WHEN** 语言检测过程中出现错误
- **THEN** 记录错误信息和回退策略
- **AND** 继续执行更新操作

### Requirement: 向后兼容性
命令 SHALL 保持与现有项目和工作流的完全兼容性。

#### Scenario: 现有英文项目兼容性
- **WHEN** 在现有英文项目中运行 `openspec update`
- **THEN** 行为与之前版本完全一致
- **AND** 不改变任何现有文件的语言

#### Scenario: 无参数调用兼容性
- **WHEN** 运行不带任何参数的 `openspec update`
- **THEN** 保持现有的默认行为
- **AND** 不引入任何破坏性变更

### Requirement: 错误处理和恢复
命令 SHALL 优雅处理语言检测和更新过程中的错误。

#### Scenario: 文件读取失败处理
- **WHEN** 无法读取 `openspec/AGENTS.md` 文件进行语言检测
- **THEN** 记录警告信息并继续其他检测方法
- **AND** 不中断更新流程

#### Scenario: 环境变量异常处理
- **WHEN** 环境变量格式异常或无法访问
- **THEN** 记录调试信息并使用默认语言
- **AND** 确保更新操作正常完成