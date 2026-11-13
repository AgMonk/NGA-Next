// BBCode 核心解析器：逐字符扫描 + 栈式嵌套匹配

import type {
  BbscodeNode,
  ParseContext,
  ParseOptions,
} from './types.js';
import {
  TAG_NAMES_SORTED,
  normalizeTagName,
  getTagConfig,
} from './tags.js';
import {
  preprocess,
  htmlUnescape,
  NL_PLACEHOLDER,
} from './preprocess.js';

const DEFAULT_MAX_DEPTH = 20;

/** 标签正则：匹配开标签或闭标签，按长度优先匹配 */
const TAG_REGEX = new RegExp(
  `^\\[(\\/)?(${TAG_NAMES_SORTED.join('|')})(?:([=\\s][^\\]]{0,200}))?\\]`,
  'i'
);

export interface ParseInput {
  source: string;
  options?: ParseOptions;
}

export interface ParseOutput {
  children: BbscodeNode[];
  source: string;
  debug?: {
    preprocessed: string;
    warnings: string[];
  };
}

// ========== 表情标签预处理 ==========

function preprocessSmiles(text: string): string {
  let result = text.replace(/\[s:(\d+(?::\d+)*)\]/gi, '[smile=$1]');
  result = result.replace(/\[s:([a-z0-9]+):([^\]]+)\]/gi, '[smile=$1:$2]');
  return result;
}

// ========== 主入口 ==========

export function parse(input: string | ParseInput): ParseOutput {
  const opts: ParseOptions =
    typeof input === 'string' ? {} : input.options ?? {};
  const source = typeof input === 'string' ? input : input.source;
  const warnings: string[] = [];

  const smileProcessed = preprocessSmiles(source);
  const preprocessed = preprocess(smileProcessed, {
    htmlEscape: opts.preserveHtmlEntities ? false : true,
    markdownCompat: opts.markdownCompat,
    cleanBoundaries: true,
  });

  const ctx: ParseContext = { options: opts, depth: 0 };
  const children = parseNodes(preprocessed, ctx, warnings);

  return {
    children,
    source,
    debug: { preprocessed, warnings },
  };
}

// ========== 核心递归解析 ==========

function parseNodes(
  text: string,
  ctx: ParseContext,
  warnings: string[]
): BbscodeNode[] {
  const nodes: BbscodeNode[] = [];
  let buffer = '';

  const maxDepth = ctx.options.maxDepth ?? DEFAULT_MAX_DEPTH;
  if (ctx.depth > maxDepth) {
    warnings.push(`Maximum nesting depth ${maxDepth} exceeded`);
    return [makeTextNode(text)];
  }

  let i = 0;
  while (i < text.length) {
    const ch = text[i];

    if (ch === NL_PLACEHOLDER) {
      if (buffer.length > 0) {
        nodes.push(makeTextNode(buffer));
        buffer = '';
      }
      nodes.push({ type: 'newline' });
      i++;
      continue;
    }

    if (ch === '[') {
      const match = TAG_REGEX.exec(text.substring(i));
      if (match) {
        const isClosing = match[1] === '/';
        const rawTagName = match[2];
        const rawParams = match[3];
        const matchLen = match[0].length;

        const canonicalName = normalizeTagName(rawTagName);
        const cfg = getTagConfig(canonicalName);

        if (!cfg) {
          buffer += ch;
          i++;
          continue;
        }

        if (isClosing) {
          buffer += match[0];
          i += matchLen;
          continue;
        }

        const innerStart = i + matchLen;
        const closePos = findCloseTag(text, innerStart, canonicalName, cfg);

        if (closePos === -1) {
          buffer += match[0];
          i += matchLen;
          warnings.push(`Unclosed tag: [${rawTagName}]`);
          continue;
        }

        if (buffer.length > 0) {
          nodes.push(makeTextNode(buffer));
          buffer = '';
        }

        const innerContent = text.substring(innerStart, closePos);
        const closeTagLen = `[/${rawTagName}]`.length;
        const closeTagEnd = closePos + closeTagLen;

        const tagNode = buildTagNode(
          canonicalName, rawParams, innerContent, cfg, ctx, warnings
        );
        nodes.push(tagNode);

        i = closeTagEnd;
        continue;
      }
    }

    buffer += ch;
    i++;
  }

  if (buffer.length > 0) {
    nodes.push(makeTextNode(buffer));
  }

  return nodes;
}

/** 在 innerStart 之后查找闭标签位置（处理嵌套） */
function findCloseTag(
  text: string,
  searchFrom: number,
  canonicalName: string,
  cfg: ReturnType<typeof getTagConfig>
): number {
  if (!cfg) return -1;
  if (cfg.selfClosing) return searchFrom;

  const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const openAliases = [canonicalName, ...(cfg.aliases ?? [])].map(escape);

  const openPattern = new RegExp(
    `\\[(?:${openAliases.join('|')})(?:[=\\s][^\\]]{0,200})?\\]`,
    'gi'
  );
  const closePattern = new RegExp(
    `\\[/(?:${openAliases.join('|')})\\]`,
    'gi'
  );

  let depth = 1;
  let pos = searchFrom;

  while (true) {
    const searchWindow = text.substring(pos);
    openPattern.lastIndex = 0;
    closePattern.lastIndex = 0;

    const openMatch = openPattern.exec(searchWindow);
    const closeMatch = closePattern.exec(searchWindow);

    if (!openMatch && !closeMatch) return -1;

    if (openMatch && (!closeMatch || openMatch.index < closeMatch.index)) {
      depth++;
      pos += openMatch.index + openMatch[0].length;
    } else if (closeMatch) {
      depth--;
      if (depth === 0) {
        return pos + closeMatch.index;
      }
      pos += closeMatch.index + closeMatch[0].length;
    }
  }
}

/** 构建标签节点 */
function buildTagNode(
  canonicalName: string,
  rawParams: string | undefined,
  innerContent: string,
  cfg: ReturnType<typeof getTagConfig>,
  ctx: ParseContext,
  warnings: string[]
) {
  const params = parseTagParams(rawParams);

  let children: BbscodeNode[];
  if (cfg?.rawContent) {
    children = [makeTextNode(htmlUnescape(innerContent))];
  } else {
    children = parseNodes(innerContent, { ...ctx, depth: ctx.depth + 1 }, warnings);
  }

  return {
    type: 'tag' as const,
    name: canonicalName,
    rawParams,
    params,
    children,
  };
}

/**
 * 解析标签参数
 *   [pid=123,456]           → { value: '123,456' }
 *   [color=red]             → { value: 'red' }
 *   [td width=80 auto]      → { width: '80', auto: 'true' }
 *   [td=width=80 auto]      → { width: '80', auto: 'true' }
 */
function parseTagParams(raw: string | undefined): Record<string, string> {
  const result: Record<string, string> = {};
  if (!raw) return result;

  let s = raw.trim();
  if (s.startsWith('=')) s = s.substring(1);
  if (!s) return result;

  // 是否有 key=value 模式（字母开头，等号，后面非空）
  // 规则：如果出现 " 字母=值 " 或者 ",字母=值"，就是多参数
  const hasKeyValue = /(?:[\s,])[a-zA-Z][a-zA-Z0-9]*=/.test(' ' + s);

  if (hasKeyValue) {
    // 先按空格分割，再处理
    // 但 key=value 中可能含逗号如 colspan=2,rowspan=3
    const parts: string[] = [];
    // 先把 "key=val1,val2" 这种当作一个 part
    s.split(/[\s]+/).forEach((seg) => {
      if (seg.includes('=')) {
        // 这个 segment 可能含逗号参数 "key=val1,key2=val2"
        seg.split(/,(?=[a-zA-Z]+=)/).forEach((p) => parts.push(p));
      } else if (seg.includes(',')) {
        seg.split(',').filter(Boolean).forEach((p) => parts.push(p));
      } else {
        parts.push(seg);
      }
    });

    for (const part of parts) {
      if (!part) continue;
      if (part.includes('=')) {
        const eq = part.indexOf('=');
        const key = part.substring(0, eq).trim();
        const val = part.substring(eq + 1).trim();
        if (key) result[key] = val;
      } else {
        result[part] = 'true';
      }
    }
    return result;
  }

  result.value = s;
  return result;
}

function makeTextNode(content: string): BbscodeNode {
  return { type: 'text', content: htmlUnescape(content) };
}

// ========== 便捷函数 ==========

/** 只提取纯文本（去掉所有 BBCode 标签） */
export function extractText(input: string): string {
  const result = parse(input);
  return nodesToString(result.children);
}

function nodesToString(nodes: BbscodeNode[]): string {
  return nodes
    .map((n) => {
      if (n.type === 'text') return n.content;
      if (n.type === 'newline') return '\n';
      return nodesToString(n.children);
    })
    .join('');
}
