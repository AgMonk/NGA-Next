// 标签配置

/** 正则特殊字符（需要转义） */
const REGEX_SPECIAL = /[.*+?^${}()|[\]\\]/g;

function escapeForRegex(str: string): string {
  return str.replace(REGEX_SPECIAL, '\\$&');
}

/** 标签配置 */
export interface TagConfig {
  /** 规范名（小写） */
  name: string;
  /** 别名列表（解析后统一转成规范名） */
  aliases?: string[];
  /** 是否是自闭合标签（无内容） */
  selfClosing?: boolean;
  /** 内部内容不递归解析 */
  rawContent?: boolean;
  /** 最大嵌套深度（超过会被截断） */
  maxNesting?: number;
  /** 是否允许带参数 */
  allowParams?: boolean;
}

/**
 * 所有可识别的标签
 * 别名用于解析时匹配，统一转换为规范 name
 */
export const TAG_CONFIGS: TagConfig[] = [
  // ===== 基础样式 =====
  { name: 'bold', aliases: ['b'] },
  { name: 'italic', aliases: ['i'] },
  { name: 'underline', aliases: ['u'] },
  { name: 'strikethrough', aliases: ['del'] },
  { name: 'superscript', aliases: ['sup'] },
  { name: 'subscript', aliases: ['sub'] },
  { name: 'color', allowParams: true },
  { name: 'size', allowParams: true },
  { name: 'font', allowParams: true },
  { name: 'align', aliases: ['l', 'r'], allowParams: true },
  { name: 'span', allowParams: true },

  // ===== 链接 =====
  { name: 'url', allowParams: true },
  { name: 'attach' },
  { name: 'urlreplace', rawContent: true },

  // ===== 引用 =====
  { name: 'quote', maxNesting: 10 },

  // ===== 列表 =====
  { name: 'list', allowParams: true, maxNesting: 5 },
  { name: '*', selfClosing: true }, // 列表项分隔符

  // ===== 表格 =====
  { name: 'table' },
  { name: 'tr' },
  { name: 'td', allowParams: true },

  // ===== 媒体 =====
  { name: 'img', allowParams: true },
  { name: 'flash', allowParams: true },
  { name: 'media', allowParams: true },
  { name: 'iframe', allowParams: true },
  { name: 'album', allowParams: true },

  // ===== 折叠/随机 =====
  { name: 'collapse', allowParams: true },
  { name: 'randomblock' },

  // ===== 代码（内部不递归）=====
  { name: 'code', allowParams: true, rawContent: true },

  // ===== 内部链接 =====
  { name: 'tid', allowParams: true },
  { name: 'pid', allowParams: true },
  { name: 'fid', allowParams: true },
  { name: 'stid', allowParams: true },
  { name: 'uid', allowParams: true },

  // ===== 表情 =====
  { name: 'smile', aliases: ['s'], selfClosing: true },

  // ===== 其他 =====
  { name: 'dice', rawContent: true },
  { name: 'crypt', rawContent: true },
  { name: 'heading', aliases: ['h'] },
  { name: 'lessernuke' },
  { name: 'atUser', aliases: ['at'] },
];

/** 标签名 → 配置 */
export const TAG_MAP: Map<string, TagConfig> = (() => {
  const map = new Map<string, TagConfig>();
  for (const cfg of TAG_CONFIGS) {
    map.set(cfg.name, cfg);
    if (cfg.aliases) {
      for (const alias of cfg.aliases) {
        map.set(alias, cfg);
      }
    }
  }
  return map;
})();

/**
 * 按长度降序排列的标签名列表（已转义正则特殊字符）
 * 用于正则匹配时优先匹配长标签
 */
export const TAG_NAMES_SORTED: string[] = (() => {
  const names = new Set<string>();
  for (const cfg of TAG_CONFIGS) {
    names.add(cfg.name);
    if (cfg.aliases) {
      for (const alias of cfg.aliases) {
        names.add(alias);
      }
    }
  }
  return Array.from(names)
    .sort((a, b) => b.length - a.length)
    .map(escapeForRegex);
})();

/**
 * 将别名转为规范名
 */
export function normalizeTagName(raw: string): string {
  const lower = raw.toLowerCase();
  const cfg = TAG_MAP.get(lower);
  return cfg ? cfg.name : lower;
}

/**
 * 获取标签配置（通过别名或规范名）
 */
export function getTagConfig(name: string): TagConfig | undefined {
  return TAG_MAP.get(name.toLowerCase());
}
