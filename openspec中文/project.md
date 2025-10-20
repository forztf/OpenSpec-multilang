# OpenSpec 项目概述

一个极简的 CLI 工具，帮助开发者设置 OpenSpec 文件结构并保持 AI 指令更新。AI 工具本身通过直接操作 Markdown 文件来处理所有变更管理的复杂性。

## 技术栈
- 语言：TypeScript
- 运行时：Node.js（≥20.19.0，ESM 模块）
- 包管理器：pnpm
- CLI 框架：Commander.js
- 用户交互：@inquirer/prompts
- 分发：npm 包

## 项目结构
```
src/
├── cli/        # CLI 命令实现
├── core/       # 核心 OpenSpec 逻辑（模板、结构）
└── utils/      # 共享工具（文件操作、回滚）

dist/           # 编译输出（gitignore）
```

## 约定
- 启用 TypeScript 严格模式
- 所有异步操作使用 Async/await
- 最小依赖原则
- CLI、核心逻辑和工具之间的清晰分离
- AI 友好的代码，具有描述性名称

## 错误处理
- 让错误冒泡到 CLI 级别以实现一致的用户消息
- 使用带有描述性消息的本地 Error 类型
- 使用适当的退出代码：0（成功）、1（一般错误）、2（误用）
- 在工具函数中不使用 try-catch，在命令级别处理

## 日志记录
- 直接使用控制台方法（无日志库）
- console.log() 用于正常输出
- console.error() 用于错误（输出到 stderr）
- 初始不提供详细/调试模式（保持简单）

## 测试策略
- 开发期间通过 `pnpm link` 进行手动测试
- 仅对关键路径进行冒烟测试（init、help 命令）
- 初始不包含单元测试 - 当复杂性增加时添加
- 测试命令：`pnpm test:smoke`（添加时）

## 开发工作流
- 使用 pnpm 进行所有包管理
- 运行 `pnpm run build` 编译 TypeScript
- 运行 `pnpm run dev` 进入开发模式
- 使用 `pnpm link` 进行本地测试
- 遵循 OpenSpec 自身的变更驱动开发流程