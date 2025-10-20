## 1. Factory工具注册
- [x] 1.1 将Factory/Droid元数据添加到init/update使用的原生工具注册表（ID、显示名称、命令路径、可用性标志）。
- [x] 1.2 在交互式提示和非交互式`--tools`解析中，将Factory与现有的斜杠命令集成一起显示。

## 2. 斜杠命令模板
- [x] 2.1 根据Factory的CLI格式，为Factory的`openspec-proposal`、`openspec-apply`和`openspec-archive`自定义命令创建共享模板。
- [x] 2.2 将模板连接到init/update中，以便在创建时生成并在刷新时尊重OpenSpec标记。

## 3. 验证
- [x] 3.1 更新或添加自动化覆盖，确保Factory命令文件正确搭建和刷新。
- [x] 3.2 如果需要规范，在面向用户的副本（帮助文本、README片段）中记录新选项。