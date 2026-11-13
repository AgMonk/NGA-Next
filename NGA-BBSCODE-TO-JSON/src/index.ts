// NGA-BBSCODE-TO-JSON 主入口

export { parse, extractText } from './parser.js';
export type { ParseInput, ParseOutput } from './parser.js';
export type {
  BbscodeNode,
  TextNode,
  TagNode,
  NewlineNode,
  ParseOptions,
} from './types.js';
