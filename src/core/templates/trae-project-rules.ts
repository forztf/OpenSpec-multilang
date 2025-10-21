export function getTraeProjectRulesTemplate(language: string = 'en'): string {
  if (language === 'zh' || language === 'zh-CN') {
    return `# Trae IDE 的 OpenSpec 使用说明

本项目使用 OpenSpec 管理 AI 助手工作流。

## 快速参考
- 完整指南：\`@/openspec/AGENTS.md\`
- 创建提案：使用 OpenSpec 变更工作流
- 校验变更：\`openspec validate --strict\`

## 项目规则集成
在 Trae IDE 中使用 OpenSpec 时：
1. 始终阅读 \`@/openspec/AGENTS.md\` 获取完整说明
2. 遵循三阶段流程：创建 → 实施 → 归档
3. 使用 \`openspec\` 命令进行校验与管理

请保留此受管块，便于 \`openspec update\` 刷新说明。`;
  }

  return `# OpenSpec Instructions for Trae IDE

This project uses OpenSpec to manage AI assistant workflows.

## Quick Reference
- Full guidance: \`@/openspec/AGENTS.md\`
- Create proposals: Use OpenSpec change workflow
- Validate changes: \`openspec validate --strict\`

## Project Rules Integration
When working with OpenSpec in Trae IDE:
1. Always read \`@/openspec/AGENTS.md\` for complete instructions
2. Follow the three-stage workflow: Create → Implement → Archive
3. Use \`openspec\` commands for validation and management

Keep this managed block so \`openspec update\` can refresh the instructions.`;
}