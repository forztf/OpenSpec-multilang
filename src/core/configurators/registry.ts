import { ToolConfigurator } from './base.js';
import { ClaudeConfigurator } from './claude.js';
import { AgentsStandardConfigurator } from './agents.js';
import { TraeConfigurator } from './trae.js';

export class ToolRegistry {
  private static tools: Map<string, ToolConfigurator> = new Map();

  static {
    const claudeConfigurator = new ClaudeConfigurator();
    const agentsConfigurator = new AgentsStandardConfigurator();
    const traeConfigurator = new TraeConfigurator();
    // Register with the ID that matches the checkbox value
    this.tools.set('claude', claudeConfigurator);
    this.tools.set('agents', agentsConfigurator);
    this.tools.set('trae', traeConfigurator);
  }

  static register(tool: ToolConfigurator): void {
    this.tools.set(tool.name.toLowerCase().replace(/\s+/g, '-'), tool);
  }

  static get(toolId: string): ToolConfigurator | undefined {
    return this.tools.get(toolId);
  }

  static getAll(): ToolConfigurator[] {
    return Array.from(this.tools.values());
  }

  static getAvailable(): ToolConfigurator[] {
    return this.getAll().filter(tool => tool.isAvailable);
  }
}
