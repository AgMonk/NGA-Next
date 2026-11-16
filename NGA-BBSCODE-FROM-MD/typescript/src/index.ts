// NGA-BBSCODE-FROM-MD: Markdown → NGA BBCode 转换器
//
// 架构：逐行扫描 + 块级状态机 + 行内递归
//   1. 按行分割输入文本
//   2. 识别块级结构（代码块、表格、标题、列表、引用、水平线、段落）
//   3. 在非代码块的块级上下文中处理行内语法
//   4. 组装输出 BBCode 字符串

// ========== 公共 API ==========

/** Markdown → NGA BBCode 转换选项 */
export interface Md2BbsOptions {
  /** 是否保留 Markdown 转义符 \（默认 false，即处理转义） */
  preserveEscapes?: boolean;
}

/** 将 Markdown 字符串转换为 NGA BBCode */
export function md2bbscode(md: string, options: Md2BbsOptions = {}): string {
  const ctx: Context = {
    lines: normalizeLines(md),
    index: 0,
    result: [],
    options,
  };
  parseBlocks(ctx);
  return ctx.result.join('\n');
}

// ========== 内部类型 ==========

interface Context {
  lines: string[];
  index: number;
  result: string[];
  options: Md2BbsOptions;
}

// ========== 行规范化 ==========

function normalizeLines(text: string): string[] {
  // 统一 CRLF → LF，移除末尾空行，保留行尾空格（硬换行需要）
  return text
    .replace(/\r\n?/g, '\n')
    .replace(/\n+$/, '')
    .split('\n');
}

function peek(ctx: Context, offset = 0): string | null {
  const i = ctx.index + offset;
  return i < ctx.lines.length ? ctx.lines[i] : null;
}

function consume(ctx: Context): string {
  return ctx.lines[ctx.index++];
}

// ========== 块级解析 ==========

function parseBlocks(ctx: Context): void {
  while (ctx.index < ctx.lines.length) {
    const line = peek(ctx)!;

    // 1. Fenced code block
    const fence = matchFence(line);
    if (fence) {
      parseFencedCode(ctx, fence);
      continue;
    }

    // 2. 空行 —— 直接跳过（段落分隔靠隐式处理）
    if (isBlank(line)) {
      ctx.result.push('');
      consume(ctx);
      continue;
    }

    // 3. 表格（需要看下一行是否是分隔行）
    if (matchTableHeader(line) && matchTableDelimiter(peek(ctx, 1))) {
      parseTable(ctx);
      continue;
    }

    // 4. 标题
    const heading = matchHeading(line);
    if (heading) {
      consume(ctx);
      ctx.result.push(renderHeading(heading.level, parseInline(heading.text, ctx.options)));
      continue;
    }

    // 5. 水平线
    if (matchThematicBreak(line)) {
      consume(ctx);
      ctx.result.push('───────────────────────');
      continue;
    }

    // 6. 引用块（可能跨行）
    if (matchQuote(line)) {
      parseQuote(ctx);
      continue;
    }

    // 7. 列表（可能跨行、嵌套）
    if (matchListItem(line)) {
      parseList(ctx);
      continue;
    }

    // 8. 缩进式代码块（4+ 空格开头）
    if (/^ {4,}/.test(line) || /^\t/.test(line)) {
      parseIndentedCode(ctx);
      continue;
    }

    // 9. 普通段落
    consume(ctx);
    ctx.result.push(parseInline(line, ctx.options));
  }
}

// ========== Fenced Code Block ==========

interface FenceMatch {
  indent: number;       // 前导空格数
  marker: '`' | '~';    // ``` 或 ~~~
  length: number;       // 围栏长度
  lang: string;         // 语言标识符
}

function matchFence(line: string): FenceMatch | null {
  // 允许最多 3 个前导空格
  const m = line.match(/^( {0,3})(`{3,}|~{3,})[ \t]*([^\s`~]*)/);
  if (!m) return null;
  return {
    indent: m[1].length,
    marker: m[2][0] as '`' | '~',
    length: m[2].length,
    lang: m[3],
  };
}

function parseFencedCode(ctx: Context, fence: FenceMatch): void {
  consume(ctx); // 消耗开始围栏
  const lines: string[] = [];

  while (ctx.index < ctx.lines.length) {
    const line = peek(ctx)!;
    const closeMatch = matchFence(line);

    if (
      closeMatch &&
      closeMatch.indent <= fence.indent &&
      closeMatch.marker === fence.marker &&
      closeMatch.length >= fence.length
    ) {
      consume(ctx); // 消耗结束围栏
      break;
    }

    lines.push(line);
    consume(ctx);
  }

  const codeContent = lines.join('\n');
  const tag = fence.lang ? `[code=${fence.lang}]` : '[code]';
  ctx.result.push(`${tag}${codeContent}[/code]`);
}

// ========== 缩进式代码块 ==========

function parseIndentedCode(ctx: Context): void {
  const lines: string[] = [];
  while (ctx.index < ctx.lines.length) {
    const line = peek(ctx)!;
    if (isBlank(line)) {
      // 空行可能是代码块的一部分，也可能标志结束
      // 看下一行是否仍然缩进
      const next = peek(ctx, 1);
      if (next && (/^ {4,}/.test(next) || /^\t/.test(next))) {
        lines.push('');
        consume(ctx);
        continue;
      }
      break; // 代码块结束
    }
    if (/^ {4,}/.test(line)) {
      lines.push(line.replace(/^ {4}/, ''));
      consume(ctx);
      continue;
    }
    if (/^\t/.test(line)) {
      lines.push(line.replace(/^\t/, ''));
      consume(ctx);
      continue;
    }
    break;
  }

  if (lines.length > 0) {
    ctx.result.push(`[code]${lines.join('\n')}[/code]`);
  }
}

// ========== 标题 ==========

interface HeadingMatch {
  level: number;
  text: string;
}

function matchHeading(line: string): HeadingMatch | null {
  const m = line.match(/^(#{1,6})[ \t]+(.*?)(?:[ \t]+#+)?[ \t]*$/);
  if (!m) return null;
  return { level: m[1].length, text: m[2] };
}

function renderHeading(level: number, inner: string): string {
  switch (level) {
    case 1:
      return `[h][b][size=160%]${inner}[/size][/b][/h]`;
    case 2:
      return `[h][b][size=140%]${inner}[/size][/b][/h]`;
    case 3:
      return `[h][b][size=120%]${inner}[/size][/b][/h]`;
    case 4:
      return `[h][b]${inner}[/b][/h]`;
    case 5:
      return `[h][b][color=gray]${inner}[/color][/b][/h]`;
    default:
      return `[h][b][color=silver]${inner}[/color][/b][/h]`;
  }
}

// ========== 水平线 ==========

function matchThematicBreak(line: string): boolean {
  // 单独一行，三个以上的 - * _ 序列，可带空格
  const s = line.trim();
  if (s.length < 3) return false;
  const first = s[0];
  if (!'*-_'.includes(first)) return false;
  // 剩余字符只能是 first 或空白
  for (let i = 1; i < s.length; i++) {
    if (s[i] !== first && s[i] !== ' ' && s[i] !== '\t') return false;
  }
  // 必须至少 3 个 first 字符
  let count = 0;
  for (const c of s) if (c === first) count++;
  return count >= 3;
}

// ========== 引用块 ==========

function matchQuote(line: string): boolean {
  return /^>\s?/.test(line);
}

function parseQuote(ctx: Context): void {
  const lines: string[] = [];
  while (ctx.index < ctx.lines.length) {
    const line = peek(ctx)!;
    if (matchQuote(line)) {
      lines.push(line.replace(/^>\s?/, ''));
      consume(ctx);
      continue;
    }
    // 空行 + 下一行也是引用 → 继续
    if (isBlank(line)) {
      const next = peek(ctx, 1);
      if (next && matchQuote(next)) {
        // 引用块之间的空行合并
        consume(ctx);
        continue;
      }
      break;
    }
    break;
  }

  // 在引用块内部递归处理
  const innerResult: string[] = [];
  const innerCtx: Context = {
    lines: lines.length > 0 ? lines : [''],
    index: 0,
    result: innerResult,
    options: ctx.options,
  };
  parseBlocks(innerCtx);
  const inner = innerResult.join('\n');

  ctx.result.push(`[quote]${inner}[/quote]`);
}

// ========== 列表 ==========

interface ListItem {
  indent: number;     // 缩进层级（空格数 / 2 向下取整）
  ordered: boolean;
  marker: string;
  content: string;
}

function matchListItem(line: string): ListItem | null {
  // 匹配 "- text" / "* text" / "+ text" / "1. text" / "1) text"
  const m = line.match(/^( {0,5})([-*+]|\d+[.)])[ \t]+(.*)/);
  if (!m) return null;

  const indentSpaces = m[1].length;
  const marker = m[2];
  const ordered = /\d+[.)]/.test(marker);

  return {
    indent: Math.floor(indentSpaces / 2),
    ordered,
    marker,
    content: m[3],
  };
}

function parseList(ctx: Context): void {
  const items: ListItem[] = [];

  while (ctx.index < ctx.lines.length) {
    const line = peek(ctx)!;
    const item = matchListItem(line);
    if (item) {
      items.push(item);
      consume(ctx);
      // 收集列表项的续行（缩进大于该项 indent + 1 的行）
      // 标准 Markdown 比较复杂，这里简化：同一级别的列表项连续出现即停止
      continue;
    }
    // 遇到空行，看下一行是否还是列表
    if (isBlank(line)) {
      const next = peek(ctx, 1);
      if (next && matchListItem(next)) {
        // 跳过空行继续收集
        consume(ctx);
        continue;
      }
      break;
    }
    break;
  }

  if (items.length === 0) return;

  ctx.result.push(renderList(items, ctx.options));
}

function renderList(items: ListItem[], options: Md2BbsOptions): string {
  // 按缩进分组，处理嵌套
  // 策略：用栈跟踪当前开着的 list 层级
  const stack: { ordered: boolean }[] = [];
  let result = '';
  let currentIndent = -1;

  for (const item of items) {
    // 根据缩进调整栈
    while (stack.length > 0 && item.indent < currentIndent) {
      result += '[/list]';
      stack.pop();
      currentIndent -= 1;
    }

    if (item.indent > currentIndent) {
      // 开启新层级
      result += item.ordered ? '[list=1]' : '[list]';
      stack.push({ ordered: item.ordered });
      currentIndent = item.indent;
    } else if (item.indent === currentIndent && stack.length > 0) {
      // 检查有序/无序是否切换
      const top = stack[stack.length - 1];
      if (top.ordered !== item.ordered) {
        // 关闭旧的，开新的
        result += '[/list]';
        stack.pop();
        result += item.ordered ? '[list=1]' : '[list]';
        stack.push({ ordered: item.ordered });
      }
    }

    result += `[*]${parseInline(item.content, options)}`;
  }

  // 关闭所有未关闭的 list
  while (stack.length > 0) {
    result += '[/list]';
    stack.pop();
  }

  return result;
}

// ========== 表格 ==========

interface TableCell {
  content: string;
  align: 'left' | 'right' | 'center' | null;
}

function matchTableHeader(line: string): boolean {
  const trimmed = line.trim();
  if (!trimmed.startsWith('|')) return false;
  // 至少有 1 个 |，且至少有 1 个非空单元格
  return /\|/.test(trimmed) && /\|\s*\S/.test(trimmed);
}

function matchTableDelimiter(line: string | null): boolean {
  if (!line) return false;
  const trimmed = line.trim();
  // 必须包含：| + 可选空格 + (:?-+:?) + 可选空格 + | 这样的序列
  const cells = trimmed.split('|').filter((c) => c.trim() !== '');
  if (cells.length < 1) return false;
  return cells.every((cell) => /^\s*:?-{1,}:?\s*$/.test(cell));
}

function parseTable(ctx: Context): void {
  const headerLine = consume(ctx);
  const delimLine = consume(ctx);

  // 解析对齐
  const aligns = parseTableAligns(delimLine);

  // 收集所有数据行
  const dataRows: string[] = [];
  while (ctx.index < ctx.lines.length) {
    const line = peek(ctx)!;
    const trimmed = line.trim();
    if (trimmed.startsWith('|')) {
      dataRows.push(line);
      consume(ctx);
      continue;
    }
    break;
  }

  // 构建表格
  let table = '[table]\n';

  // 表头行
  const headerCells = parseTableRow(headerLine, aligns.length);
  table += '[tr]';
  for (let i = 0; i < headerCells.length; i++) {
    const cell = headerCells[i];
    const align = aligns[i] ?? null;
    let content = parseInline(cell.content, ctx.options);
    if (align) content = `[align=${align}]${content}[/align]`;
    table += `[td][b]${content}[/b][/td]`;
  }
  table += '[/tr]\n';

  // 数据行
  for (const row of dataRows) {
    const cells = parseTableRow(row, aligns.length);
    table += '[tr]';
    for (let i = 0; i < cells.length; i++) {
      const cell = cells[i];
      const align = aligns[i] ?? null;
      let content = parseInline(cell.content, ctx.options);
      if (align) content = `[align=${align}]${content}[/align]`;
      table += `[td]${content}[/td]`;
    }
    table += '[/tr]\n';
  }

  table += '[/table]';
  ctx.result.push(table);
}

function parseTableAligns(delimLine: string): ('left' | 'right' | 'center' | null)[] {
  const trimmed = delimLine.trim();
  return trimmed
    .split('|')
    .filter((c) => c.trim() !== '')
    .map((cell) => {
      const c = cell.trim();
      const left = c.startsWith(':');
      const right = c.endsWith(':') && c.length > 1;
      if (left && right) return 'center';
      if (left) return 'left';
      if (right) return 'right';
      return null;
    });
}

function parseTableRow(line: string, expectedCols: number): TableCell[] {
  const trimmed = line.trim();
  // 去掉首尾的 |
  const inner = trimmed.replace(/^\|/, '').replace(/\|$/, '');
  // 按未转义的 | 分割
  const rawCells: string[] = [];
  let current = '';
  for (let i = 0; i < inner.length; i++) {
    if (inner[i] === '\\' && i + 1 < inner.length && inner[i + 1] === '|') {
      current += '|';
      i++; // 跳过转义的 \
    } else if (inner[i] === '|') {
      rawCells.push(current);
      current = '';
    } else {
      current += inner[i];
    }
  }
  rawCells.push(current);

  const cells = rawCells.map((c) => ({ content: c.trim(), align: null as 'left' | 'right' | 'center' | null }));

  // 补齐列数
  while (cells.length < expectedCols) {
    cells.push({ content: '', align: null });
  }
  // 截断多余列
  if (cells.length > expectedCols) {
    cells.length = expectedCols;
  }

  return cells;
}

// ========== 行内解析 ==========

function parseInline(text: string, options: Md2BbsOptions): string {
  // 行内解析是递归的，需要一个迭代器来逐字符处理
  let result = text;

  // 先处理转义（替换为占位符）
  const placeholders: string[] = [];
  const escaped = options.preserveEscapes
    ? result
    : result.replace(/\\[`*_~\[\]()!\\]/g, (match) => {
        placeholders.push(match[1]);
        return `\x00ESC${placeholders.length - 1}\x00`;
      });
  result = escaped;

  // 处理图片（必须在链接之前）: ![alt](url)
  result = result.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_m, _alt, url) => {
    return `[img]${url}[/img]`;
  });

  // 处理链接: [text](url) 和 [text](url "title") — 忽略 title
  result = result.replace(
    /\[([^\]]+)\]\(([^)\s]+)(?:\s+"[^"]*"|\s+'[^']*'|\s+\([^)]*\))?\s*\)/g,
    (_m, linkText, url) => {
      return `[url=${url}]${linkText}[/url]`;
    }
  );
  // 自动链接 <http://...>
  result = result.replace(/<(https?:\/\/[^>\s]+)>/g, (_m, url) => {
    return `[url=${url}]${url}[/url]`;
  });

  // 行内代码（反引号，支持双反引号）: `code` 和 ``code with ` inside``
  // 先处理双反引号包裹
  result = result.replace(/``([^`]+)``/g, (_m, code) => {
    return `[font=Lucida Console]${code}[/font]`;
  });
  // 再处理单反引号
  result = result.replace(/`([^`]+)`/g, (_m, code) => {
    return `[font=Lucida Console]${code}[/font]`;
  });

  // 删除线 ~~text~~
  result = result.replace(/~~([^~]+)~~/g, '[del]$1[/del]');

  // 粗斜体 ***text***（三个星号）
  // 注意：必须在粗体和斜体之前处理，避免被拆分
  result = result.replace(/\*\*\*([^*\n]+?)\*\*\*/g, '[b][i]$1[/i][/b]');
  result = result.replace(/___([^_\n]+?)___/g, '[b][i]$1[/i][/b]');

  // 粗体 **text** 或 __text__
  result = result.replace(/\*\*([^*\n]+?)\*\*/g, '[b]$1[/b]');
  result = result.replace(/__([^_\n]+?)__/g, '[b]$1[/b]');

  // 斜体 *text* 或 _text_
  // *text* 要求 * 不能紧挨着单词字符（防止误匹配 he*llo）
  result = result.replace(/(^|[^*a-zA-Z0-9])\*([^*\n]+?)\*([^*a-zA-Z0-9]|$)/g, '$1[i]$2[/i]$3');
  result = result.replace(/(^|[^_a-zA-Z0-9])_([^_\n]+?)_([^_a-zA-Z0-9]|$)/g, '$1[i]$2[/i]$3');

  // 行尾两个空格 + 换行 → <br>
  result = result.replace(/  $/, '<br>');

  // 恢复转义占位符
  result = result.replace(/\x00ESC(\d+)\x00/g, (_m, idx) => {
    const i = parseInt(idx, 10);
    return placeholders[i];
  });

  return result;
}

// ========== 辅助函数 ==========

function isBlank(line: string): boolean {
  return line.trim() === '';
}
