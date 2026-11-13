// BBCode AST 节点类型定义

/** 文本节点 */
export interface TextNode {
  type: 'text';
  /** 文本内容（已解码） */
  content: string;
}

/** 标签节点 */
export interface TagNode {
  type: 'tag';
  /** 标签名，小写，如 'b', 'url', 'quote' */
  name: string;
  /** 原始参数字符串，如 '=red', '=800,600'，无参数时 undefined */
  rawParams?: string;
  /** 解析后的参数键值对，方便使用 */
  params: Record<string, string>;
  /** 子节点 */
  children: BbscodeNode[];
}

/** 换行节点（解析过程中由 \x07 产生） */
export interface NewlineNode {
  type: 'newline';
}

export type BbscodeNode = TextNode | TagNode | NewlineNode;

/** 解析上下文，传递选项和中间状态 */
export interface ParseContext {
  /** 解析选项 */
  options: ParseOptions;
  /** 当前深度（用于限制递归） */
  depth: number;
}

/** 解析选项 */
export interface ParseOptions {
  /** 最大嵌套深度，默认 20 */
  maxDepth?: number;
  /** 启用 Markdown 兼容模式（opt & 65536） */
  markdownCompat?: boolean;
  /** 解析前是否保留 HTML 实体（默认 false，会解码） */
  preserveHtmlEntities?: boolean;
}

/** 解析结果 */
export interface ParseResult {
  /** 根节点列表 */
  children: BbscodeNode[];
  /** 原始 BBCode 输入 */
  source: string;
}
