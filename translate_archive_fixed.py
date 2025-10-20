#!/usr/bin/env python3
"""
批量翻译 OpenSpec archive 目录中的 Markdown 文件 - 修复版
"""

import os
import re
import shutil
from pathlib import Path

def translate_markdown_content(content):
    """将 Markdown 内容从英文翻译为中文"""
    
    # 常见的技术术语和 CLI 命令映射
    term_mapping = {
        # 基础术语
        'Proposal': '提案',
        'Specification': '规范',
        'Design': '设计',
        'Tasks': '任务',
        'Change': '变更',
        'Command': '命令',
        'Validation': '验证',
        'Implementation': '实现',
        'Configuration': '配置',
        'Interactive': '交互式',
        'Automation': '自动化',
        'Workflow': '工作流',
        
        # CLI 命令
        'Init': '初始化',
        'Update': '更新',
        'List': '列表',
        'Archive': '归档',
        'Diff': '差异',
        'Show': '显示',
        'View': '查看',
        'Validate': '验证',
        'Spec': '规范',
        
        # 技术术语
        'TypeScript': 'TypeScript',
        'Zod': 'Zod',
        'GitHub': 'GitHub',
        'Copilot': 'Copilot',
        'Codex': 'Codex',
        'KiloCode': 'KiloCode',
        'Windsurf': 'Windsurf',
        'Agent': '智能体',
        'Agents': '智能体',
        'Dashboard': '仪表板',
        'Onboarding': '入门引导',
        'Slash command': '斜杠命令',
        
        # 功能描述
        'Add support for': '添加对...的支持',
        'Improve': '改进',
        'Enhance': '增强',
        'Update': '更新',
        'Fix': '修复',
        'Remove': '移除',
        'Adopt': '采用',
        'Implement': '实现',
        
        # 小写版本
        'proposal': '提案',
        'specification': '规范',
        'design': '设计',
        'tasks': '任务',
        'change': '变更',
        'command': '命令',
        'validation': '验证',
        'implementation': '实现',
        'configuration': '配置',
        'interactive': '交互式',
        'automation': '自动化',
        'workflow': '工作流',
        'init': '初始化',
        'update': '更新',
        'list': '列表',
        'archive': '归档',
        'diff': '差异',
        'show': '显示',
        'view': '查看',
        'validate': '验证',
        'spec': '规范',
        'agent': '智能体',
        'agents': '智能体',
        'dashboard': '仪表板',
        'onboarding': '入门引导',
        'slash command': '斜杠命令',
        'add support for': '添加对...的支持',
        'improve': '改进',
        'enhance': '增强',
        'fix': '修复',
        'remove': '移除',
        'adopt': '采用',
        'implement': '实现',
    }
    
    def translate_line(line):
        """翻译单行文本"""
        # 保持代码块和表格格式不变
        if line.strip().startswith('```') or line.strip().startswith('|'):
            return line
        
        # 保持日期格式标题不变
        if re.match(r'^#\s+\d{4}-\d{2}-\d{2}', line):
            return line
        
        # 保持文件路径和URL不变
        if re.search(r'[\\/]|http[s]?://', line):
            return line
        
        # 逐步翻译
        translated = line
        for eng, cn in term_mapping.items():
            # 使用单词边界匹配
            translated = re.sub(r'\b' + re.escape(eng) + r'\b', cn, translated, flags=re.IGNORECASE)
        
        return translated
    
    lines = content.split('\n')
    translated_lines = [translate_line(line) for line in lines]
    
    return '\n'.join(translated_lines)

def copy_and_translate_markdown_files(source_dir, target_dir):
    """复制并翻译所有 Markdown 文件"""
    
    print(f"处理: {source_dir}")
    
    for root, dirs, files in os.walk(source_dir):
        # 计算相对路径
        rel_path = os.path.relpath(root, source_dir)
        target_path = os.path.join(target_dir, rel_path)
        
        # 创建目标目录
        os.makedirs(target_path, exist_ok=True)
        
        # 处理 Markdown 文件
        for file in files:
            if file.endswith('.md'):
                source_file = os.path.join(root, file)
                target_file = os.path.join(target_path, file)
                
                print(f"  📝 翻译: {file}")
                
                try:
                    # 读取源文件
                    with open(source_file, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    # 翻译内容
                    translated_content = translate_markdown_content(content)
                    
                    # 写入目标文件
                    with open(target_file, 'w', encoding='utf-8') as f:
                        f.write(translated_content)
                        
                except Exception as e:
                    print(f"  ❌ 错误处理 {file}: {e}")

def main():
    source_base = "h:\\code\\OpenSpec\\openspec\\changes\\archive"
    target_base = "h:\\code\\OpenSpec\\openspec\\changes\\archive-cn"
    
    print("🚀 开始批量翻译 OpenSpec archive 文件...")
    print(f"📁 源目录: {source_base}")
    print(f"📁 目标目录: {target_base}")
    
    # 清除并重新创建目标目录
    if os.path.exists(target_base):
        shutil.rmtree(target_base)
    os.makedirs(target_base)
    
    # 处理所有子目录
    for item in os.listdir(source_base):
        item_path = os.path.join(source_base, item)
        if os.path.isdir(item_path):
            copy_and_translate_markdown_files(item_path, target_base)
    
    # 验证结果
    total_files = 0
    for root, dirs, files in os.walk(target_base):
        total_files += len([f for f in files if f.endswith('.md')])
    
    print(f"\n✅ 翻译完成！")
    print(f"📊 总文件数: {total_files}")
    print(f"📁 输出目录: {target_base}")

if __name__ == "__main__":
    main()