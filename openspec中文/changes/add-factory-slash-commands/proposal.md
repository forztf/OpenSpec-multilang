## 为什么需要
Factory的Droid CLI最近发布了自定义斜杠命令，与其他本地助手集成镜像。使用OpenSpec的团队希望获得与Cursor、Windsurf等工具相同的托管工作流程，这样init/update命令可以在无需手动设置的情况下配置和刷新Factory命令。

## 变更内容
- 扩展原生工具注册表，使Factory/Droid在`openspec init`期间与其他斜杠命令集成一起显示。
- 添加共享模板，生成三个Factory自定义命令（proposal、apply、archive）并将其包装在OpenSpec标记中以便安全刷新。
- 更新init和update命令流程，以便在选择或已存在该工具时创建或刷新Factory命令文件。
- 刷新CLI规范以记录Factory支持并调整验证期望。

## 影响范围
- 受影响的规范：`specs/cli-init`、`specs/cli-update`
- 受影响的代码（预期）：工具注册表、斜杠命令模板管理器、init/update命令助手、文档片段