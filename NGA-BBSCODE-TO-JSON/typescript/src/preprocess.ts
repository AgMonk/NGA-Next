// 预处理：在正式解析前对 BBCode 进行规范化

import { TAG_NAMES_SORTED } from './tags.js';

const NL_PLACEHOLDER = '\x07';

/** 所有已知标签名的正则部分（按长度降序） */
const TAG_NAME_PATTERN = TAG_NAMES_SORTED.join('|');

/** 匹配一个开标签或闭标签 */
const TAG_REGEX = new RegExp(
  `\\[(\\/)?(${TAG_NAME_PATTERN})(?:([=\\s][^\\]]{0,200}))?\\]`,
  'gi'
);

// ===== HTML 实体编解码 =====

const HTML_ESCAPE_MAP: Record<string, string> = {
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '$': '&#36;',
  '\\': '&#92;',
};

/** HTML 编码（只对非 BBCode 标签的文本部分转义）
 * 注意：不转义 &，否则会破坏已有的 HTML 实体 */
export function htmlEscape(text: string): string {
  return text.replace(/[<>"'$\\]/g, (ch) => HTML_ESCAPE_MAP[ch]);
}

/** HTML 解码（完整覆盖常见实体） */
export function htmlUnescape(text: string): string {
  return text
    .replace(/&(lt|gt|quot|amp);/g, (_full, ent) => {
      switch (ent) {
        case 'lt': return '<';
        case 'gt': return '>';
        case 'quot': return '"';
        case 'amp': return '&';
        default: return _full;
      }
    })
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(parseInt(code, 10)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
}

// ===== 换行符处理 =====

/** 将各种换行形式统一替换为占位符 \x07 */
export function normalizeNewlines(text: string): string {
  return text.replace(/<br\s*\/?>/gi, NL_PLACEHOLDER);
}

/** 将 \x07 占位符转回实际换行符 */
export function restoreNewlines(text: string): string {
  return text.split(NL_PLACEHOLDER).join('\n');
}

// ===== 标签内容中换行清理 =====

/** 清理标签边界多余的换行占位符 */
export function cleanBoundaryNewlines(text: string): string {
  return text
    .replace(/\x07\s*(\[\/?(?:quote|list|collapse|randomblock|lessernuke)\])/gi, '$1')
    .replace(/(\[\/?(?:quote|list|collapse|randomblock|lessernuke)\])\s*\x07/gi, '$1');
}

// ===== 预处理主函数 =====

export interface PreprocessOptions {
  /** 编码为 HTML 实体 */
  htmlEscape?: boolean;
  /** 清理边界换行 */
  cleanBoundaries?: boolean;
  /** 启用 Markdown 兼容 */
  markdownCompat?: boolean;
}

/** 完整预处理流程 */
export function preprocess(text: string, options: PreprocessOptions = {}): string {
  let result = text;

  // 1. 换行符统一
  result = normalizeNewlines(result);

  // 2. 清理标签边界换行
  if (options.cleanBoundaries !== false) {
    result = cleanBoundaryNewlines(result);
  }

  // 3. HTML 编码
  if (options.htmlEscape) {
    result = escapeTextOutsideTags(result);
  }

  // 4. Markdown 兼容转换
  if (options.markdownCompat) {
    result = markdownToBbscode(result);
  }

  return result;
}

/**
 * 只对 BBCode 标签外的文本部分进行 HTML 编码
 */
function escapeTextOutsideTags(text: string): string {
  let result = '';
  let i = 0;
  let inTag = false;
  let tagDepth = 0;

  while (i < text.length) {
    if (!inTag && text[i] === '[') {
      const remaining = text.substring(i);
      const tagMatch = remaining.match(new RegExp(`^\\[(\\/)?(${TAG_NAME_PATTERN})(?:([=\\s][^\\]]{0,200}))?\\]`, 'i'));
      if (tagMatch) {
        result += text[i];
        inTag = true;
        tagDepth = 1;
        i++;
        continue;
      }
    }
    if (inTag) {
      if (text[i] === '[') tagDepth++;
      else if (text[i] === ']') {
        tagDepth--;
        if (tagDepth === 0) inTag = false;
      }
      result += text[i];
    } else {
      result += HTML_ESCAPE_MAP[text[i]] ?? text[i];
    }
    i++;
  }

  return result;
}

// ===== Markdown → BBCode 转换 =====

/** Markdown 兼容模式转换（opt & 65536） */
export function markdownToBbscode(text: string): string {
  let result = text;

  result = result.replace(/\*\*\*(.+?)\*\*\*/g, '[b][i]$1[/i][/b]');
  result = result.replace(/\*\*(.+?)\*\*/g, '[b]$1[/b]');
  result = result.replace(/\*(.+?)\*/g, '[i]$1[/i]');
  result = result.replace(/~~(.+?)~~/g, '[del]$1[/del]');
  result = result.replace(
    /!\[(?:.*?)\]\(([-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?)\)/g,
    '[img]$1[/img]'
  );
  result = result.replace(
    /\[([^\]]+)\]\(([-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?)\)/g,
    '[url=$2]$1[/url]'
  );

  return result;
}

export { NL_PLACEHOLDER };
