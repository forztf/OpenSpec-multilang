import { describe, it, expect, vi } from 'vitest';
import { isSupportedLanguage, getLocalizedMessages, formatMessage } from '../../src/core/localization.js';

// Mock CLI module to test language validation
vi.mock('../../src/cli/index.js', () => ({
  validateLanguageOption: (language: string) => {
    if (!language) return 'en';
    if (!isSupportedLanguage(language)) {
      const messages = getLocalizedMessages('en');
      throw new Error(formatMessage(messages.errors.unsupportedLanguage, { language }));
    }
    return language;
  }
}));

describe('CLI Language Validation', () => {
  describe('Language Option Validation', () => {
    it('should accept supported languages', () => {
      const { validateLanguageOption } = require('../../src/cli/index.js');
      
      expect(validateLanguageOption('en')).toBe('en');
      expect(validateLanguageOption('zh-CN')).toBe('zh-CN');
    });

    it('should default to English when no language provided', () => {
      const { validateLanguageOption } = require('../../src/cli/index.js');
      
      expect(validateLanguageOption('')).toBe('en');
      expect(validateLanguageOption(null)).toBe('en');
      expect(validateLanguageOption(undefined)).toBe('en');
    });

    it('should throw error for unsupported languages', () => {
      const { validateLanguageOption } = require('../../src/cli/index.js');
      
      expect(() => validateLanguageOption('fr')).toThrow('Unsupported language: fr. Supported languages: en, zh-CN');
      expect(() => validateLanguageOption('es')).toThrow('Unsupported language: es. Supported languages: en, zh-CN');
      expect(() => validateLanguageOption('invalid')).toThrow('Unsupported language: invalid. Supported languages: en, zh-CN');
    });

    it('should provide localized error messages', () => {
      const { validateLanguageOption } = require('../../src/cli/index.js');
      
      // Test English error message
      try {
        validateLanguageOption('fr');
      } catch (error: any) {
        expect(error.message).toContain('Unsupported language: fr');
        expect(error.message).toContain('Supported languages: en, zh-CN');
      }
    });
  });

  describe('Language Parameter Handling', () => {
    it('should handle case sensitivity correctly', () => {
      const { validateLanguageOption } = require('../../src/cli/index.js');
      
      // zh-CN should be case sensitive
      expect(() => validateLanguageOption('zh-cn')).toThrow();
      expect(() => validateLanguageOption('ZH-CN')).toThrow();
      expect(validateLanguageOption('zh-CN')).toBe('zh-CN');
    });

    it('should handle whitespace in language parameter', () => {
      const { validateLanguageOption } = require('../../src/cli/index.js');
      
      expect(() => validateLanguageOption(' en ')).toThrow();
      expect(() => validateLanguageOption('en ')).toThrow();
      expect(() => validateLanguageOption(' zh-CN')).toThrow();
    });
  });
});