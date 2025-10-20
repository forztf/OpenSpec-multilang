## 修改后的要求

### 要求：目录创建
命令应创建完整的 OpenSpec 目录结构，包含所有必需的目录和文件。

#### 场景：创建 OpenSpec 结构
- **当** 执行 `openspec init` 时
- **则** 创建以下目录结构：
```
openspec/
├── project.md
├── AGENTS.md
├── specs/
└── changes/
    └── archive/
```

### 要求：文件生成
命令应生成具有适当内容的必需模板文件，以便立即使用。

#### 场景：生成模板文件
- **当** 初始化 OpenSpec 时
- **则** 生成包含 AI 助手 OpenSpec 指令的 `AGENTS.md`
- **并且** 生成带有项目上下文模板的 `project.md`

### 要求：AI 工具配置详情

命令应使用标记系统正确配置选定的 AI 工具与 OpenSpec 特定指令。

#### 场景：创建新的 CLAUDE.md
- **当** CLAUDE.md 不存在时
- **则** 创建包含 OpenSpec 内容的新文件，用标记包装，包括对 `@openspec/AGENTS.md` 的引用

### 要求：成功输出

命令应在成功初始化后提供清晰、可操作的后续步骤。

#### 场景：显示成功消息
- **当** 初始化成功完成时
- **则** 包含提示："请解释来自 openspec/AGENTS.md 的 OpenSpec 工作流以及我应该如何与您在这个项目上合作"