# CLI 初始化规范

## 目的

`openspec init` 命令应在任何项目中创建完整的 OpenSpec 目录结构，支持多种 AI 编码助手，使用户能够立即采用 OpenSpec 约定。

## 行为

### 进度指示器

当执行初始化步骤时
则在后台静默验证环境（除非出错否则无输出）
并使用 ora 旋转器显示进度：
- 显示旋转器："⠋ Creating OpenSpec structure..."
- 然后成功："✔ OpenSpec structure created"
- 显示旋转器："⠋ Configuring AI tools..."
- 然后成功："✔ AI tools configured"

### 目录创建

当执行 `openspec init` 时
则创建以下目录结构：
```
openspec/
├── project.md
├── README.md
├── specs/
└── changes/
    └── archive/
```

### 文件生成

命令应生成：
- `README.md` 包含 AI 助手的完整 OpenSpec 指令
- `project.md` 包含项目上下文模板

### AI 工具配置

当交互式运行时
则提示用户选择要配置的 AI 工具：
- Claude Code（使用 OpenSpec 标记更新/创建 CLAUDE.md）
- Cursor（未来）
- Aider（未来）

### AI 工具配置详情

当选择 Claude Code 时
则在项目根目录（不在 openspec/ 内）创建或更新 `CLAUDE.md`

当 CLAUDE.md 不存在时
则创建新文件，其中包含用标记包装的 OpenSpec 内容：
```markdown
<!-- OPENSPEC:START -->
# OpenSpec Project

This document provides instructions for AI coding assistants on how to use OpenSpec conventions for spec-driven development. Follow these rules precisely when working on OpenSpec-enabled projects.

This project uses OpenSpec for spec-driven development. Specifications are the source of truth.

See @openspec/README.md for detailed conventions and guidelines.
<!-- OPENSPEC:END -->
```

当 CLAUDE.md 已存在时
则保留所有现有内容
并在文件开头使用标记插入 OpenSpec 内容
并确保如果标记已存在则不重复

标记系统应：
- 使用 `<!-- OPENSPEC:START -->` 标记托管内容的开始
- 使用 `<!-- OPENSPEC:END -->` 标记托管内容的结束
- 允许 OpenSpec 更新其内容而不影响用户自定义
- 完整保留标记外的所有内容

为什么使用标记：
- 用户可能有现有的 CLAUDE.md 指令想要保留
- OpenSpec 可以在未来的版本中更新其指令
- 在 OpenSpec 托管内容和用户托管内容之间有明确的边界

### 交互模式

当运行时
则提示用户："Which AI tool do you use?"
并显示包含可用工具的单选菜单：
- Claude Code
并显示禁用选项为"即将推出"（不可选择）：
- Cursor (coming soon)
- Aider (coming soon)  
- Continue (coming soon)

用户导航：
- 使用箭头键在选项间移动
- 按 Enter 选择高亮选项

### 安全检查

当 `openspec/` 目录已存在时
则使用 ora 失败指示器显示错误：
"✖ Error: OpenSpec seems to already be initialized. Use 'openspec update' to update the structure."

当检查初始化可行性时
则静默验证目标目录中的写入权限
仅在权限不足时显示错误

### 成功输出

当初始化成功完成时
则显示用于 AI 驱动工作流的可操作提示：
```
✔ OpenSpec initialized successfully!

Next steps - Copy these prompts to Claude:

────────────────────────────────────────────────────────────
1. Populate your project context:
   "Please read openspec/project.md and help me fill it out
    with details about my project, tech stack, and conventions"

2. Create your first change proposal:
   "I want to add [YOUR FEATURE HERE]. Please create an
    OpenSpec change proposal for this feature"

3. Learn the OpenSpec workflow:
   "Please explain the OpenSpec workflow from openspec/README.md
    and how I should work with you on this project"
────────────────────────────────────────────────────────────
```

提示应：
- 可复制粘贴以便与 AI 工具立即使用
- 指导用户完成 AI 驱动的工作流
- 将占位符文本（[YOUR FEATURE HERE]）替换为实际功能

### 退出代码

- 0: 成功
- 1: 一般错误（包括 OpenSpec 目录已存在）
- 2: 权限不足（为未来使用保留）
- 3: 用户取消操作（为未来使用保留）

## 为什么

手动创建 OpenSpec 结构容易出错并造成采用困难。标准化的初始化命令确保：
- 所有项目的一致结构
- 始终包含适当的 AI 指令文件
- 新项目的快速入门
- 从一开始就明确约定