import { agentsTemplate } from './agents-template.js';
import { agentsTemplateZh } from './agents-template-zh.js';
import { projectTemplate, ProjectContext } from './project-template.js';
import { projectTemplateZh } from './project-template-zh.js';
import { claudeTemplate } from './claude-template.js';
import { clineTemplate } from './cline-template.js';
import { getAgentsRootStubTemplate } from './agents-root-stub.js';
import { getSlashCommandBody, SlashCommandId } from './slash-command-templates.js';
import { getTraeProjectRulesTemplate } from './trae-project-rules.js';

export interface Template {
  path: string;
  content: string | ((context: ProjectContext) => string);
}

export class TemplateManager {
  static getTemplates(context: ProjectContext = {}, language: string = 'en'): Template[] {
    const selectedAgentsTemplate = language === 'zh-CN' ? agentsTemplateZh : agentsTemplate;
    const selectedProjectTemplate = language === 'zh-CN' ? projectTemplateZh : projectTemplate;
    
    return [
      {
        path: 'AGENTS.md',
        content: selectedAgentsTemplate
      },
      {
        path: 'project.md',
        content: selectedProjectTemplate(context)
      }
    ];
  }

  static getClaudeTemplate(language: string = 'en'): string {
    if (language === 'zh' || language === 'zh-CN') {
      return getAgentsRootStubTemplate(language);
    }
    return claudeTemplate;
  }

  static getClineTemplate(): string {
    return clineTemplate;
  }

  static getClineTemplate(): string {
    return clineTemplate;
  }

  static getAgentsStandardTemplate(language: string = 'en'): string {
    return getAgentsRootStubTemplate(language);
  }

  static getTraeProjectRulesTemplate(language: string = 'en'): string {
    return getTraeProjectRulesTemplate(language);
  }

  static getSlashCommandBody(id: SlashCommandId): string {
    return getSlashCommandBody(id);
  }
}

export { ProjectContext } from './project-template.js';
export type { SlashCommandId } from './slash-command-templates.js';
