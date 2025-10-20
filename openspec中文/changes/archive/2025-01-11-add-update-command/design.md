# 技术设计

## 架构决策

### 简单优先
- 无版本跟踪 - 始终在命令时更新
- 仅完全替换 OpenSpec 管理的文件（例如，`openspec/README.md`）
- 基于标记的更新用户拥有的文件（例如，`CLAUDE.md`）
- 模板与包捆绑 - 无需网络
- 最小错误处理 - 仅检查先决条件

### 模板策略
- 使用现有模板工具
  - `src/core/templates/readme-template.ts` 中的 `readmeTemplate` 用于 `openspec/README.md`
  - `TemplateManager.getClaudeTemplate()` 用于 `CLAUDE.md`
- 目录名固定为 `openspec`（来自 `OPENSPEC_DIR_NAME`）

### 文件操作
- 使用异步工具保持一致性
  - `FileSystemUtils.writeFile` 用于 `openspec/README.md`
  - `FileSystemUtils.updateFileWithMarkers` 用于 `CLAUDE.md`
- 无需原子操作 - 用户有 git
- 继续前检查目录存在

## 实现

### 更新命令 (`src/core/update.ts`)
```typescript
export class UpdateCommand {
  async execute(projectPath: string): Promise<void> {
    const openspecDirName = OPENSPEC_DIR_NAME;
    const openspecPath = path.join(projectPath, openspecDirName);

    // 1. 检查 openspec 目录存在
    if (!await FileSystemUtils.directoryExists(openspecPath)) {
      throw new Error(`No OpenSpec directory found. Run 'openspec init' first.`);
    }

    // 2. 更新 README.md (完全替换)
    const readmePath = path.join(openspecPath, 'README.md');
    await FileSystemUtils.writeFile(readmePath, readmeTemplate);

    // 3. 更新 CLAUDE.md (基于标记)
    const claudePath = path.join(projectPath, 'CLAUDE.md');
    const claudeContent = TemplateManager.getClaudeTemplate();
    await FileSystemUtils.updateFileWithMarkers(
      claudePath,
      claudeContent,
      OPENSPEC_MARKERS.start,
      OPENSPEC_MARKERS.end
    );

    // 4. 成功消息 (ASCII 安全, 终端可选复选标记)
    console.log('Updated OpenSpec instructions');
  }
}
```

## 为什么采用这种方法

### 优势
- **极其简单**: 总共约 40 行代码
- **快速**: 无版本检查, 最小解析
- **可预测**: 每次相同结果; 幂等
- **可维护**: 重用现有工具

### 接受的权衡
- 无版本跟踪 (不必要的复杂性)
- 仅完全覆盖 OpenSpec 管理的文件
- 基于标记管理用户拥有的文件更新

## 错误处理

仅处理关键错误:
- 缺少 `openspec` 目录 → 抛出错误由 CLI 处理以呈现友好消息
- 文件写入失败 → 让错误冒泡到 CLI

## 测试策略

初始手动冒烟测试足够:
1. 在测试项目中运行 `openspec init`
2. 修改两个文件 (包括 `CLAUDE.md` 中标记周围的自定义内容)
3. 运行 `openspec update`
4. 验证 `openspec/README.md` 完全替换; `CLAUDE.md` OpenSpec 块更新而不会改变标记外的用户内容
5. 运行命令两次以验证幂等性和无重复标记
6. 测试缺少 `openspec` 目录 (期望失败)