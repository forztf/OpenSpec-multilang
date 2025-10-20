import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { promises as fs } from 'fs';
import path from 'path';
import os from 'os';
import { InitCommand } from '../../src/core/init.js';

// Mock the select function from @inquirer/prompts
const mockSelect = vi.fn();
vi.mock('@inquirer/prompts', () => ({
  select: mockSelect
}));

// Mock ora
const mockOraInstance = {
  succeed: vi.fn(),
  start: vi.fn().mockReturnThis(),
  stop: vi.fn().mockReturnThis(),
  stopAndPersist: vi.fn().mockReturnThis(),
  info: vi.fn(),
  text: '',
};

vi.mock('ora', () => ({
  default: vi.fn(() => mockOraInstance),
}));

describe('Language Selection Integration Tests', () => {
  let testDir: string;
  let mockPrompt: any;

  beforeEach(async () => {
    testDir = path.join(os.tmpdir(), `openspec-integration-test-${Date.now()}`);
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

  describe('End-to-End Language Selection', () => {
    it('should create complete Chinese project when zh-CN is selected', async () => {
      // Mock language selection to return Chinese
      mockSelect.mockResolvedValueOnce('zh-CN');
      
      const initCommand = new InitCommand({ prompt: mockPrompt });
      await initCommand.execute(testDir);
      
      // Verify all expected files exist
      const expectedFiles = [
        'openspec/AGENTS.md',
        'openspec/project.md',
        'AGENTS.md'
      ];
      
      for (const filePath of expectedFiles) {
        const fullPath = path.join(testDir, filePath);
        expect(await fs.access(fullPath).then(() => true).catch(() => false)).toBe(true);
      }
      
      // Verify Chinese content in all files
      const agentsPath = path.join(testDir, 'openspec', 'AGENTS.md');
      const projectPath = path.join(testDir, 'openspec', 'project.md');
      const rootAgentsPath = path.join(testDir, 'AGENTS.md');
      
      const agentsContent = await fs.readFile(agentsPath, 'utf-8');
      const projectContent = await fs.readFile(projectPath, 'utf-8');
      const rootAgentsContent = await fs.readFile(rootAgentsPath, 'utf-8');
      
      // Check for specific Chinese content
      expect(agentsContent).toContain('OpenSpec 指令');
      expect(agentsContent).toContain('使用 OpenSpec 进行规范驱动开发');
      expect(projectContent).toContain('项目上下文');
      expect(rootAgentsContent).toContain('OpenSpec 指令');
      expect(rootAgentsContent).toContain('AI 助手');
    });

    it('should create complete English project when en is selected', async () => {
      // Mock language selection to return English
      mockSelect.mockResolvedValueOnce('en');
      
      const initCommand = new InitCommand({ prompt: mockPrompt });
      await initCommand.execute(testDir);
      
      // Verify English content in all files
      const agentsPath = path.join(testDir, 'openspec', 'AGENTS.md');
      const projectPath = path.join(testDir, 'openspec', 'project.md');
      const rootAgentsPath = path.join(testDir, 'AGENTS.md');
      
      const agentsContent = await fs.readFile(agentsPath, 'utf-8');
      const projectContent = await fs.readFile(projectPath, 'utf-8');
      const rootAgentsContent = await fs.readFile(rootAgentsPath, 'utf-8');
      
      // Check for specific English content
      expect(agentsContent).toContain('OpenSpec Instructions');
      expect(agentsContent).toContain('spec-driven development');
      expect(projectContent).toContain('Project Context');
      expect(rootAgentsContent).toContain('OpenSpec Instructions');
      expect(rootAgentsContent).toContain('AI assistants');
    });

    it('should handle CLI language parameter correctly', async () => {
      // Test with explicit language parameter (no prompt should be called)
      const initCommand = new InitCommand({ 
        prompt: mockPrompt,
        language: 'zh-CN'
      });
      
      await initCommand.execute(testDir);
      
      // Verify language selection prompt was NOT called
      expect(mockSelect).not.toHaveBeenCalled();
      
      // Verify Chinese content was generated
      const agentsPath = path.join(testDir, 'openspec', 'AGENTS.md');
      const agentsContent = await fs.readFile(agentsPath, 'utf-8');
      expect(agentsContent).toContain('OpenSpec 指令');
    });

    it('should display localized success messages', async () => {
      mockSelect.mockResolvedValueOnce('zh-CN');
      
      const initCommand = new InitCommand({ prompt: mockPrompt });
      await initCommand.execute(testDir);
      
      // Verify Chinese success message was displayed
      expect(mockOraInstance.succeed).toHaveBeenCalledWith(
        expect.stringContaining('OpenSpec 已成功初始化')
      );
    });

    it('should use localized progress indicators', async () => {
      mockSelect.mockResolvedValueOnce('zh-CN');
      
      const initCommand = new InitCommand({ prompt: mockPrompt });
      await initCommand.execute(testDir);
      
      // Verify that ora was called with Chinese text
      const oraCalls = vi.mocked(require('ora').default).mock.calls;
      const hasChineseProgress = oraCalls.some((call: any) => {
        const options = call[0];
        return options && options.text && options.text.includes('正在');
      });
      
      expect(hasChineseProgress).toBe(true);
    });
  });

  describe('Language Consistency', () => {
    it('should maintain language consistency across all generated files', async () => {
      mockSelect.mockResolvedValueOnce('zh-CN');
      
      const initCommand = new InitCommand({ prompt: mockPrompt });
      await initCommand.execute(testDir);
      
      // Check that all files use consistent Chinese content
      const files = [
        path.join(testDir, 'openspec', 'AGENTS.md'),
        path.join(testDir, 'openspec', 'project.md'),
        path.join(testDir, 'AGENTS.md')
      ];
      
      for (const filePath of files) {
        const content = await fs.readFile(filePath, 'utf-8');
        // Each file should contain some Chinese characters
        expect(content).toMatch(/[\u4e00-\u9fff]/);
      }
    });

    it('should handle mixed language scenarios gracefully', async () => {
      // Test with English selection but verify no Chinese leakage
      mockSelect.mockResolvedValueOnce('en');
      
      const initCommand = new InitCommand({ prompt: mockPrompt });
      await initCommand.execute(testDir);
      
      const agentsPath = path.join(testDir, 'openspec', 'AGENTS.md');
      const agentsContent = await fs.readFile(agentsPath, 'utf-8');
      
      // Should not contain Chinese characters when English is selected
      expect(agentsContent).not.toMatch(/[\u4e00-\u9fff]/);
      expect(agentsContent).toContain('OpenSpec Instructions');
    });
  });
});