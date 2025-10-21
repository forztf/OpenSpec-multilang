/**
 * 本地化消息和文本支持
 */

export type SupportedLanguage = 'en' | 'zh-CN';

export interface LocalizedMessages {
  init: {
    success: string;
    successHeadline: {
      new: string;
      update: string;
    };
    toolSummary: string;
    created: string;
    refreshed: string;
    skippedExisting: string;
    skipped: string;
    rootStubCreated: string;
    rootStubUpdated: string;
    updateCommand: string;
    selectTools: string;
    selectToolsExtend: string;
    languageSelection: {
      prompt: string;
      english: string;
      chinese: string;
    };
    spinner: {
      creating: string;
      created: string;
      creatingStructure: string;
      structureCreated: string;
      skipScaffolding: string;
      configuringTools: string;
      toolsConfigured: string;
    };
    nextSteps: {
      title: string;
      populateContext: {
        title: string;
        description: string;
      };
      createProposal: {
        title: string;
        description: string;
      };
      learnWorkflow: {
        title: string;
        description: string;
      };
    };
    codexNote: {
      title: string;
      description: string;
    };
  };
  errors: {
    unsupportedLanguage: string;
    invalidLanguageOption: string;
  };
}

const messages: Record<SupportedLanguage, LocalizedMessages> = {
  en: {
    init: {
      success: 'OpenSpec initialized successfully!',
      successHeadline: {
        new: 'OpenSpec initialized successfully!',
        update: 'OpenSpec tool configuration updated!',
      },
      toolSummary: 'Tool configurations:',
      created: 'Created:',
      refreshed: 'Refreshed:',
      skippedExisting: 'Skipped (already configured):',
      skipped: 'Skipped:',
      rootStubCreated: 'Root AGENTS.md stub created for other assistants',
      rootStubUpdated: 'Root AGENTS.md stub refreshed for other assistants',
      updateCommand: 'Use `openspec update` to refresh shared OpenSpec instructions in the future.',
      selectTools: 'Which natively supported AI tools do you use?',
      selectToolsExtend: 'Which natively supported AI tools would you like to add or refresh?',
      languageSelection: {
        prompt: 'Which language would you like to use for OpenSpec templates?',
        english: 'English',
        chinese: 'Chinese (中文)',
      },
      spinner: {
        creating: 'Creating OpenSpec structure...',
        created: 'OpenSpec structure created',
        creatingStructure: 'Creating directory structure...',
        structureCreated: 'Directory structure created',
        skipScaffolding: 'Skipping scaffolding (extend mode)',
        configuringTools: 'Configuring AI tools...',
        toolsConfigured: 'AI tools configured',
      },
      nextSteps: {
        title: 'Next steps - Copy these prompts to {toolName}:',
        populateContext: {
          title: '1. Populate your project context:',
          description: '"Please read openspec/project.md and help me fill it out with details about my project, tech stack, and conventions"',
        },
        createProposal: {
          title: '2. Create your first change proposal:',
          description: '"I want to add [YOUR FEATURE HERE]. Please create an OpenSpec change proposal for this feature"',
        },
        learnWorkflow: {
          title: '3. Learn the OpenSpec workflow:',
          description: '"Please explain the OpenSpec workflow from openspec/AGENTS.md and how I should work with you on this project"',
        },
      },
      codexNote: {
        title: 'Codex setup note',
        description: 'Prompts installed to ~/.codex/prompts (or $CODEX_HOME/prompts).',
      },
    },
    errors: {
      unsupportedLanguage: 'Unsupported language: {language}. Supported languages: en, zh-CN',
      invalidLanguageOption: 'Invalid language option: {language}. Use --language en or --language zh-CN',
    },
  },
  'zh-CN': {
    init: {
      success: 'OpenSpec 初始化成功！',
      successHeadline: {
        new: 'OpenSpec 初始化成功！',
        update: 'OpenSpec 工具配置已更新！',
      },
      toolSummary: '工具配置：',
      created: '已创建：',
      refreshed: '已刷新：',
      skippedExisting: '已跳过（已配置）：',
      skipped: '已跳过：',
      rootStubCreated: '已为其他助手创建根 AGENTS.md 存根',
      rootStubUpdated: '已为其他助手刷新根 AGENTS.md 存根',
      updateCommand: '使用 `openspec update` 命令来刷新共享的 OpenSpec 指令。',
      selectTools: '您使用哪些原生支持的 AI 工具？',
      selectToolsExtend: '您想要添加或刷新哪些原生支持的 AI 工具？',
      languageSelection: {
        prompt: '您希望使用哪种语言的 OpenSpec 模板？',
        english: 'English (英文)',
        chinese: 'Chinese (中文)',
      },
      spinner: {
        creating: '正在创建 OpenSpec 结构...',
        created: 'OpenSpec 结构已创建',
        creatingStructure: '正在创建目录结构...',
        structureCreated: '目录结构已创建',
        skipScaffolding: '跳过脚手架（扩展模式）',
        configuringTools: '正在配置 AI 工具...',
        toolsConfigured: 'AI 工具已配置',
      },
      nextSteps: {
        title: '下一步 - 将这些提示复制到 {toolName}：',
        populateContext: {
          title: '1. 填充项目上下文：',
          description: '"请阅读 openspec/project.md 并帮我填写项目详情、技术栈和约定"',
        },
        createProposal: {
          title: '2. 创建第一个变更提案：',
          description: '"我想添加 [您的功能]。请为此功能创建一个 OpenSpec 变更提案"',
        },
        learnWorkflow: {
          title: '3. 学习 OpenSpec 工作流：',
          description: '"请从 openspec/AGENTS.md 解释 OpenSpec 工作流以及我应该如何与您在此项目上合作"',
        },
      },
      codexNote: {
        title: 'Codex 设置说明',
        description: '提示已安装到 ~/.codex/prompts（或 $CODEX_HOME/prompts）。',
      },
    },
    errors: {
      unsupportedLanguage: '不支持的语言：{language}。支持的语言：en, zh-CN',
      invalidLanguageOption: '无效的语言选项：{language}。请使用 --language en 或 --language zh-CN',
    },
  },
};

/**
 * 获取指定语言的本地化消息
 */
export function getLocalizedMessages(language: SupportedLanguage): LocalizedMessages {
  return messages[language];
}

/**
 * 格式化消息模板，替换占位符
 */
export function formatMessage(template: string, params: Record<string, string> = {}): string {
  return Object.entries(params).reduce(
    (result, [key, value]) => result.replace(new RegExp(`\\{${key}\\}`, 'g'), value),
    template
  );
}

/**
 * 检查是否为支持的语言
 */
export function isSupportedLanguage(language: string): language is SupportedLanguage {
  return ['en', 'zh-CN'].includes(language);
}