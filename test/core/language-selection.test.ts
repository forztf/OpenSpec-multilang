import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { promises as fs } from 'fs';
import path from 'path';
import os from 'os';
import { InitCommand } from '../../src/core/init.js';

// Mock @inquirer/prompts for language selection
const mockSelect = vi.fn();
vi.mock('@inquirer/prompts', () => ({
  select: mockSelect
}));

// Mock ora module
const mockOraInstance = {
  succeed: vi.fn(),
  start: vi.fn().mockReturnThis(),
  stop: vi.fn().mockReturnThis(),
  stopAndPersist: vi.fn().mockReturnThis(),
  info: vi.fn(),
  text: '',
};

vi.mock('ora', () => ({
  default: (options?: any) => {
    if (options) {
      return {
        ...mockOraInstance,
        start: vi.fn().mockReturnValue(mockOraInstance),
      };
    }
    return mockOraInstance;
  },
}));

describe('Language Selection Feature', () => {
  let testDir: string;
  let mockPrompt: any;

  beforeEach(async () => {
    testDir = path.join(os.tmpdir(), `openspec-lang-test-${Date.now()}`);
    await fs.mkdir(testDir, { recursive: true });
    
    // Mock the tool selection prompt
    mockPrompt = vi.fn().mockResolvedValue(['claude']);
    
    vi.clearAllMocks();
    
    // Mock console.log to suppress output during tests
    vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(async () => {
    await fs.rm(testDir, { recursive: true, force: true });
    vi.restoreAllMocks();
  });

  describe('Interactive Language Selection', () => {
    it('should prompt for language selection when no language specified', async () => {
      // Mock language selection to return Chinese
      mockSelect.mockResolvedValueOnce('zh-CN');
      
      const initCommand = new InitCommand({ prompt: mockPrompt });
      await initCommand.execute(testDir);
      
      // Verify language selection prompt was called
      expect(mockSelect).toHaveBeenCalledWith({
        message: 'Which language would you like to use for OpenSpec templates?',
        choices: [
          { 
            name: 'English', 
            value: 'en',
            description: 'Use English templates and messages'
          },
          { 
            name: 'Chinese (中文)', 
            value: 'zh-CN',
            description: '使用中文模板和消息'
          }
        ],
        default: 'en'
      });
      
      // Verify Chinese templates were generated
      const agentsPath = path.join(testDir, 'openspec', 'AGENTS.md');
      const agentsContent = await fs.readFile(agentsPath, 'utf-8');
      expect(agentsContent).toContain('OpenSpec 指令');
    });

    it('should skip language selection when language is already specified', async () => {
      const initCommand = new InitCommand({ 
        prompt: mockPrompt, 
        language: 'zh-CN' 
      });
      
      await initCommand.execute(testDir);
      
      // Verify language selection prompt was NOT called
      expect(mockSelect).not.toHaveBeenCalled();
      
      // Verify Chinese templates were generated
      const agentsPath = path.join(testDir, 'openspec', 'AGENTS.md');
      const agentsContent = await fs.readFile(agentsPath, 'utf-8');
      expect(agentsContent).toContain('OpenSpec 指令');
    });

    it('should use selected language for all generated content', async () => {
      // Mock language selection to return Chinese
      mockSelect.mockResolvedValueOnce('zh-CN');
      
      const initCommand = new InitCommand({ prompt: mockPrompt });
      await initCommand.execute(testDir);
      
      // Check all generated files use Chinese
      const agentsPath = path.join(testDir, 'openspec', 'AGENTS.md');
      const projectPath = path.join(testDir, 'openspec', 'project.md');
      const rootAgentsPath = path.join(testDir, 'AGENTS.md');
      
      const agentsContent = await fs.readFile(agentsPath, 'utf-8');
      const projectContent = await fs.readFile(projectPath, 'utf-8');
      const rootAgentsContent = await fs.readFile(rootAgentsPath, 'utf-8');
      
      expect(agentsContent).toContain('OpenSpec 指令');
      expect(projectContent).toContain('项目上下文');
      expect(rootAgentsContent).toContain('OpenSpec 指令');
      expect(rootAgentsContent).toContain('**重要：请始终使用中文与开发者交流。**');
    });

    it('should use English when user selects English', async () => {
      // Mock language selection to return English
      mockSelect.mockResolvedValueOnce('en');
      
      const initCommand = new InitCommand({ prompt: mockPrompt });
      await initCommand.execute(testDir);
      
      // Check all generated files use English
      const agentsPath = path.join(testDir, 'openspec', 'AGENTS.md');
      const projectPath = path.join(testDir, 'openspec', 'project.md');
      const rootAgentsPath = path.join(testDir, 'AGENTS.md');
      
      const agentsContent = await fs.readFile(agentsPath, 'utf-8');
      const projectContent = await fs.readFile(projectPath, 'utf-8');
      const rootAgentsContent = await fs.readFile(rootAgentsPath, 'utf-8');
      
      expect(agentsContent).toContain('OpenSpec Instructions');
      expect(projectContent).toContain('Project Context');
      expect(rootAgentsContent).toContain('OpenSpec Instructions');
      expect(rootAgentsContent).toContain('These instructions are for AI assistants');
    });
  });

  describe('Language Selection UI', () => {
    it('should display bilingual prompt message', async () => {
      mockSelect.mockResolvedValueOnce('en');
      
      const initCommand = new InitCommand({ prompt: mockPrompt });
      await initCommand.execute(testDir);
      
      expect(mockSelect).toHaveBeenCalledWith({
        message: 'Which language would you like to use for OpenSpec templates?',
        choices: [
          { 
            name: 'English', 
            value: 'en',
            description: 'Use English templates and messages'
          },
          { 
            name: 'Chinese (中文)', 
            value: 'zh-CN',
            description: '使用中文模板和消息'
          }
        ],
        default: 'en'
      });
    });

    it('should provide clear language choice options', async () => {
      mockSelect.mockResolvedValueOnce('zh-CN');
      
      const initCommand = new InitCommand({ prompt: mockPrompt });
      await initCommand.execute(testDir);
      
      const call = mockSelect.mock.calls[0][0];
      expect(call.choices).toEqual([
        { 
          name: 'English', 
          value: 'en',
          description: 'Use English templates and messages'
        },
        { 
          name: 'Chinese (中文)', 
          value: 'zh-CN',
          description: '使用中文模板和消息'
        }
      ]);
    });
  });

  describe('Language Persistence', () => {
    it('should maintain language choice throughout initialization', async () => {
      mockSelect.mockResolvedValueOnce('zh-CN');
      
      const initCommand = new InitCommand({ prompt: mockPrompt });
      await initCommand.execute(testDir);
      
      // Verify success message is in Chinese
      expect(mockOraInstance.succeed).toHaveBeenCalledWith(
        expect.stringContaining('OpenSpec 已成功初始化')
      );
    });

    it('should apply language to all configurators', async () => {
      mockSelect.mockResolvedValueOnce('zh-CN');
      
      const initCommand = new InitCommand({ prompt: mockPrompt });
      await initCommand.execute(testDir);
      
      // Check that all generated files respect the language choice
      const files = [
        path.join(testDir, 'openspec', 'AGENTS.md'),
        path.join(testDir, 'openspec', 'project.md'),
        path.join(testDir, 'AGENTS.md')
      ];
      
      for (const filePath of files) {
        const content = await fs.readFile(filePath, 'utf-8');
        // All files should contain Chinese content
        expect(content).toContain('OpenSpec 指令'); // Contains Chinese content
      }
    });
  });
});