# 初始化命令的实现任务

## 1. 核心基础设施
- [x] 1.1 创建 src/utils/file-system.ts 包含目录/文件创建工具
- [x] 1.2 创建 src/core/templates/index.ts 用于模板管理
- [x] 1.3 创建 src/core/init.ts 包含主要初始化逻辑
- [x] 1.4 创建 src/core/config.ts 用于配置管理

## 2. 模板文件
- [x] 2.1 创建 src/core/templates/readme-template.ts 包含 OpenSpec README 内容
- [x] 2.2 创建 src/core/templates/project-template.ts 包含可定制的 project.md
- [x] 2.3 创建 src/core/templates/claude-template.ts 用于带标记的 CLAUDE.md 内容

## 3. AI 工具配置器
- [x] 3.1 创建 src/core/configurators/base.ts 包含 ToolConfigurator 接口
- [x] 3.2 创建 src/core/configurators/claude.ts 用于 Claude Code 配置
- [x] 3.3 创建 src/core/configurators/registry.ts 用于工具注册
- [x] 3.4 实现基于标记的现有配置文件更新

## 4. 初始化命令实现
- [x] 4.1 使用 Commander 在 src/cli/index.ts 中添加初始化命令
- [x] 4.2 使用多选提示实现 AI 工具选择（Claude Code 可用，其他标记为"即将推出"）- 至少需要一个选择
- [x] 4.3 添加对现有 OpenSpec 目录的验证并提供有用的错误信息
- [x] 4.4 实现目录结构创建
- [x] 4.5 实现使用模板和标记的文件生成

## 5. 用户体验
- [x] 5.1 添加彩色控制台输出以提升用户体验
- [x] 5.2 实现进度指示器（步骤 1/3, 2/3, 3/3）
- [x] 5.3 添加成功信息和可操作的后续步骤（编辑 project.md，创建第一个变更）
- [x] 5.4 添加带帮助信息的错误处理

## 6. 测试和文档
- [x] 6.1 为文件系统工具添加单元测试
- [x] 6.2 为基于标记的文件更新添加单元测试
- [x] 6.3 为初始化命令添加集成测试
- [x] 6.4 更新 package.json 中的正确 bin 配置
- [x] 6.5 端到端测试构建的 CLI 命令