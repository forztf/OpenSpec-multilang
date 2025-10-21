import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { franc } from 'franc';

/**
 * 支持的语言类型
 */
export type SupportedLanguage = 'zh-CN' | 'en-US';

/**
 * 语言检测选项
 */
export interface LanguageDetectionOptions {
  /** 命令行指定的语言参数 */
  cliLanguage?: string;
  /** 项目根目录路径 */
  projectPath?: string;
  /** 是否启用环境变量检测 */
  enableEnvDetection?: boolean;
}

/**
 * 语言检测结果
 */
export interface LanguageDetectionResult {
  /** 检测到的语言 */
  language: SupportedLanguage;
  /** 检测来源 */
  source: 'cli' | 'file' | 'environment' | 'default';
  /** 检测详情 */
  details?: string;
}

/**
 * 语言检测工具类
 * 
 * 按以下优先级检测项目语言：
 * 1. 命令行参数（最高优先级）
 * 2. 现有文件内容推断
 * 3. 环境变量检测
 * 4. 默认回退（英文）
 */
export class LanguageDetector {
  /**
   * 检测项目语言
   * 
   * @param options 检测选项
   * @returns 语言检测结果
   */
  public static detectLanguage(options: LanguageDetectionOptions = {}): LanguageDetectionResult {
    const { cliLanguage, projectPath, enableEnvDetection = true } = options;

    // 1. 命令行参数优先级最高
    if (cliLanguage) {
      const normalizedLanguage = this.normalizeLanguageCode(cliLanguage);
      if (normalizedLanguage) {
        return {
          language: normalizedLanguage,
          source: 'cli',
          details: `命令行参数: ${cliLanguage} → ${normalizedLanguage}`
        };
      }
    }

    // 2. 从现有文件内容推断
    if (projectPath) {
      const fileLanguage = this.detectFromFile(projectPath);
      if (fileLanguage) {
        return {
          language: fileLanguage,
          source: 'file',
          details: `从 AGENTS.md 文件内容检测到中文字符`
        };
      }
    }

    // 3. 从环境变量检测
    if (enableEnvDetection) {
      const envLanguage = this.detectFromEnvironment();
      if (envLanguage) {
        return {
          language: envLanguage,
          source: 'environment',
          details: `环境变量 LANG: ${process.env.LANG}`
        };
      }
    }

    // 4. 默认回退到英文
    return {
      language: 'en-US',
      source: 'default',
      details: '使用默认语言'
    };
  }

  /**
   * 标准化语言代码
   * 支持多种格式转换为标准格式
   * 
   * @param languageCode 输入的语言代码
   * @returns 标准化的语言代码，如果不支持则返回 null
   */
  public static normalizeLanguageCode(languageCode: string): SupportedLanguage | null {
    if (!languageCode) return null;

    const normalized = languageCode.toLowerCase().trim();

    // 中文格式映射
    const chineseFormats = [
      'zh-cn',
      'zh_cn',
      'zh-hans',
      'zh_hans',
      'zh',
      'chinese',
      'chs'
    ];

    // 英文格式映射
    const englishFormats = [
      'en-us',
      'en_us',
      'en-gb',
      'en_gb',
      'en',
      'english',
      'eng'
    ];

    if (chineseFormats.includes(normalized)) {
      return 'zh-CN';
    }

    if (englishFormats.includes(normalized)) {
      return 'en-US';
    }

    // 处理环境变量格式 (如 zh_CN.UTF-8)
    if (normalized.startsWith('zh_cn') || normalized.startsWith('zh-cn')) {
      return 'zh-CN';
    }

    if (normalized.startsWith('en_us') || normalized.startsWith('en-us')) {
      return 'en-US';
    }

    return null;
  }

  /**
   * 从现有文件内容推断语言
   * 使用 franc 库检测文件内容的语言
   * 
   * @param projectPath 项目根目录路径
   * @returns 检测到的语言，如果无法确定则返回 null
   */
  public static detectFromFile(projectPath: string): SupportedLanguage | null {
    try {
      const agentsPath = join(projectPath, 'openspec', 'AGENTS.md');
      
      if (!existsSync(agentsPath)) {
        return null;
      }

      const content = readFileSync(agentsPath, 'utf-8');
      
      // 使用 franc 库检测语言
      const detectedLanguage = franc(content);
      
      // 将 franc 的语言代码映射到我们支持的语言
      if (detectedLanguage === 'cmn' || detectedLanguage === 'chi') {
        // cmn: 中文（普通话），chi: 中文（通用）
        return 'zh-CN';
      }
      
      if (detectedLanguage === 'eng') {
        // eng: 英文
        return 'en-US';
      }
      
      // 如果 franc 无法确定语言（返回 'und'）或检测为其他语言，
      // 回退到原有的中文字符检测作为补充
      if (this.containsChinese(content)) {
        return 'zh-CN';
      }

      // 如果文件存在但无法确定语言，推断为英文项目
      return 'en-US';
    } catch (error) {
      // 文件读取失败，无法确定语言
      return null;
    }
  }

  /**
   * 从环境变量检测语言
   * 检查 LANG 环境变量
   * 
   * @returns 检测到的语言，如果无法确定则返回 null
   */
  public static detectFromEnvironment(): SupportedLanguage | null {
    const lang = process.env.LANG;
    
    if (!lang) {
      return null;
    }

    return this.normalizeLanguageCode(lang);
  }

  /**
   * 检测文本是否包含中文字符
   * 作为 franc 库的补充，用于处理混合语言或检测失败的情况
   * 
   * @param text 要检测的文本
   * @returns 是否包含中文字符
   */
  public static containsChinese(text: string): boolean {
    if (!text) return false;

    // 中文字符的 Unicode 范围
    // \u4e00-\u9fff: 中日韩统一表意文字
    // \u3400-\u4dbf: 中日韩统一表意文字扩展A
    // \uf900-\ufaff: 中日韩兼容表意文字
    const chineseRegex = /[\u4e00-\u9fff\u3400-\u4dbf\uf900-\ufaff]/;
    
    return chineseRegex.test(text);
  }

  /**
   * 获取支持的语言列表
   * 
   * @returns 支持的语言代码数组
   */
  public static getSupportedLanguages(): SupportedLanguage[] {
    return ['zh-CN', 'en-US'];
  }

  /**
   * 检查语言代码是否受支持
   * 
   * @param languageCode 语言代码
   * @returns 是否受支持
   */
  public static isLanguageSupported(languageCode: string): boolean {
    return this.normalizeLanguageCode(languageCode) !== null;
  }
}