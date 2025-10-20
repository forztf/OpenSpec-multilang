## 修改后的要求

### 要求：项目结构
OpenSpec 项目应为规范和变更维护一致的目录结构。

#### 场景：初始化项目结构
- **当** OpenSpec 项目初始化时
- **则** 它应具有此结构：
```
openspec/
├── project.md              # 项目特定上下文
├── AGENTS.md               # AI 助手指令
├── specs/                  # 当前部署的功能
│   └── [capability]/       # 单一、专注的功能
│       ├── spec.md         # WHAT 和 WHY
│       └── design.md       # HOW（可选，用于已建立的模式）
└── changes/                # 提议的变更
   ├── [change-name]/      # 描述性变更标识符
   │   ├── proposal.md     # 为什么、什么和影响
   │   ├── tasks.md        # 实现清单
   │   ├── design.md       # 技术决策（可选）
   │   └── specs/          # 完整未来状态
   │       └── [capability]/
   │           └── spec.md # 纯净 markdown（无差异语法）
   └── archive/            # 已完成的变更
       └── YYYY-MM-DD-[name]/
```