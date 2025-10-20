#!/usr/bin/env python3
"""
批量翻译 OpenSpec archive 目录中的 Markdown 文件
支持：proposal.md, tasks.md, spec.md, design.md
"""

import os
import re
import shutil
from pathlib import Path

def translate_markdown_content(content):
    """将 Markdown 内容从英文翻译为中文"""
    
    # 常见的 CLI 命令和术语映射
    term_mapping = {
        # 基础术语
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
        
        # CLI 命令
        'init': '初始化',
        'update': '更新',
        'list': '列表',
        'archive': '归档',
        'diff': '差异',
        'show': '显示',
        'view': '查看',
        'validate': '验证',
        'spec': '规范',
        
        # 技术术语
        'TypeScript': 'TypeScript',
        'Zod': 'Zod',
        'GitHub': 'GitHub',
        'Copilot': 'Copilot',
        'Codex': 'Codex',
        'KiloCode': 'KiloCode',
        'Windsurf': 'Windsurf',
        'agent': '智能体',
        'agents': '智能体',
        'dashboard': '仪表板',
        'onboarding': '入门引导',
        'slash command': '斜杠命令',
        
        # 功能描述
        'add support for': '添加对...的支持',
        'improve': '改进',
        'enhance': '增强',
        'update': '更新',
        'fix': '修复',
        'remove': '移除',
        'adopt': '采用',
        'implement': '实现',
    }
    
    # 特殊处理标题行
    def translate_title(title):
        # 处理日期格式标题
        if re.match(r'^#\s+\d{4}-\d{2}-\d{2}', title):
            return title  # 保持日期格式不变
        
        # 处理普通标题
        for eng, cn in term_mapping.items():
            title = title.replace(eng, cn)
        return title
    
    lines = content.split('\n')
    translated_lines = []
    
    for line in lines:
        # 跳过代码块和特殊格式
        if line.strip().startswith('```') or line.strip().startswith('|'):
            translated_lines.append(line)
            continue
            
        # 处理标题
        if line.startswith('#'):
            translated_lines.append(translate_title(line))
            continue
            
        # 普通文本翻译
        translated_line = line
        for eng, cn in term_mapping.items():
            # 使用单词边界匹配
            translated_line = re.sub(r'\b' + re.escape(eng) + r'\b', cn, translated_line, flags=re.IGNORECASE)
        
        translated_lines.append(translated_line)
    
    return '\n'.join(translated_lines)

def process_directory(source_dir, target_dir):
    """处理单个目录的所有 Markdown 文件"""
    
    print(f"处理目录: {source_dir}")
    
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
                
                print(f"  翻译: {file}")
                
                # 读取源文件
                with open(source_file, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # 翻译内容
                translated_content = translate_markdown_content(content)
                
                # 写入目标文件
                with open(target_file, 'w', encoding='utf-8') as f:
                    f.write(translated_content)

def main():
    source_base = "h:\\code\\OpenSpec\\openspec\\changes\\archive"
    target_base = "h:\\code\\OpenSpec\\openspec\\changes\\archive-cn"
    
    print("开始批量翻译 OpenSpec archive 文件...")
    print(f"源目录: {source_base}")
    print(f"目标目录: {target_base}")
    
    # 确保目标目录存在
    os.makedirs(target_base, exist_ok=True)
    
    # 处理所有子目录
    for item in os.listdir(source_base):
        item_path = os.path.join(source_base, item)
        if os.path.isdir(item_path):
            process_directory(item_path, target_base)
    
    print("\n翻译完成！")
    print(f"输出目录: {target_base}")

if __name__ == "__main__":
    main()