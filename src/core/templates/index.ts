import { agentsTemplate } from './agents-template.js';
import { agentsTemplateZh } from './agents-template-zh.js';
import { projectTemplate, ProjectContext } from './project-template.js';
import { projectTemplateZh } from './project-template-zh.js';
import { claudeTemplate } from './claude-template.js';
import { getAgentsRootStubTemplate } from './agents-root-stub.js';
import { getSlashCommandBody, SlashCommandId } from './slash-command-templates.js';

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

  static getClaudeTemplate(): string {
    return claudeTemplate;
  }

  static getAgentsStandardTemplate(language: string = 'en'): string {
    return getAgentsRootStubTemplate(language);
  }

  static getSlashCommandBody(id: SlashCommandId): string {
    return getSlashCommandBody(id);
  }
}

export { ProjectContext } from './project-template.js';
export type { SlashCommandId } from './slash-command-templates.js';
