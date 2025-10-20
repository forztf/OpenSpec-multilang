import { describe, it, expect } from 'vitest';
import {
  getLocalizedMessages,
  formatMessage,
  isSupportedLanguage,
  type SupportedLanguage
} from '../../src/core/localization.js';

describe('Localization', () => {
  describe('isSupportedLanguage', () => {
    it('should return true for supported languages', () => {
      expect(isSupportedLanguage('en')).toBe(true);
      expect(isSupportedLanguage('zh-CN')).toBe(true);
    });

    it('should return false for unsupported languages', () => {
      expect(isSupportedLanguage('fr')).toBe(false);
      expect(isSupportedLanguage('es')).toBe(false);
      expect(isSupportedLanguage('invalid')).toBe(false);
      expect(isSupportedLanguage('')).toBe(false);
    });
  });

  describe('getLocalizedMessages', () => {
    it('should return English messages for "en" language', () => {
      const messages = getLocalizedMessages('en');
      
      expect(messages.init.success).toBe('OpenSpec initialized successfully!');
      expect(messages.init.toolSummary).toBe('Tool configurations:');
      expect(messages.errors.unsupportedLanguage).toBe('Unsupported language: {language}. Supported languages: en, zh-CN');
    });

    it('should return Chinese messages for "zh-CN" language', () => {
      const messages = getLocalizedMessages('zh-CN');
      
      expect(messages.init.success).toBe('OpenSpec 初始化成功！');
      expect(messages.init.toolSummary).toBe('工具配置：');
      expect(messages.errors.unsupportedLanguage).toBe('不支持的语言：{language}。支持的语言：en, zh-CN');
    });

    it('should default to English for invalid language', () => {
      const messages = getLocalizedMessages('invalid' as SupportedLanguage);
      
      expect(messages.init.success).toBe('OpenSpec initialized successfully!');
      expect(messages.init.toolSummary).toBe('Tool configurations:');
    });
  });

  describe('formatMessage', () => {
    it('should replace single parameter in English message', () => {
      const template = 'Unsupported language: {language}. Supported languages: en, zh-CN';
      const result = formatMessage(template, { language: 'fr' });
      
      expect(result).toBe('Unsupported language: fr. Supported languages: en, zh-CN');
    });

    it('should replace single parameter in Chinese message', () => {
      const template = '不支持的语言：{language}。支持的语言：en, zh-CN';
      const result = formatMessage(template, { language: 'fr' });
      
      expect(result).toBe('不支持的语言：fr。支持的语言：en, zh-CN');
    });

    it('should replace multiple parameters', () => {
      const template = 'Hello {name}, you have {count} messages';
      const result = formatMessage(template, { name: 'John', count: '5' });
      
      expect(result).toBe('Hello John, you have 5 messages');
    });

    it('should handle missing parameters gracefully', () => {
      const template = 'Hello {name}, you have {count} messages';
      const result = formatMessage(template, { name: 'John' });
      
      expect(result).toBe('Hello John, you have {count} messages');
    });

    it('should handle empty parameters object', () => {
      const template = 'Hello {name}';
      const result = formatMessage(template, {});
      
      expect(result).toBe('Hello {name}');
    });

    it('should handle template without parameters', () => {
      const template = 'Hello world';
      const result = formatMessage(template, { name: 'John' });
      
      expect(result).toBe('Hello world');
    });
  });
});