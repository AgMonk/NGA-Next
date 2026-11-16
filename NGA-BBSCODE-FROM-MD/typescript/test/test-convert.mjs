// TypeScript 运行时 polyfill：动态 import 编译后的 dist/index.js
import { md2bbscode } from '../dist/index.js';

let passed = 0;
let failed = 0;

function test(name, md, expectedContains) {
  const result = md2bbscode(md);
  const ok = expectedContains.every((s) => result.includes(s));
  if (ok) {
    passed++;
    console.log(`  ✓ ${name}`);
  } else {
    failed++;
    console.log(`  ✗ ${name}`);
    console.log(`    MARKDOWN: ${JSON.stringify(md)}`);
    console.log(`    RESULT:   ${JSON.stringify(result)}`);
    console.log(`    SHOULD CONTAIN: ${JSON.stringify(expectedContains)}`);
  }
}

console.log('Markdown → BBCode 转换测试\n');

// ========== 标题 ==========
console.log('块级：标题');
test('H1', '# Hello', ['[h][b][size=160%]Hello[/size][/b][/h]']);
test('H2', '## World', ['[h][b][size=140%]World[/size][/b][/h]']);
test('H3', '### H3', ['[size=120%]']);
test('H4', '#### H4', ['[h][b]H4[/b][/h]']);
test('H5', '##### H5', ['[color=gray]']);
test('H6', '###### H6', ['[color=silver]']);
test('带闭合标记的 H1', '# Hello #', ['[h][b][size=160%]Hello']);
test('H1 中的行内', '# **bold** title', ['[b]', '[h][b][size=160%]']);

// ========== 行内样式 ==========
console.log('\n行内：样式');
test('粗体（**）', '**hello**', ['[b]hello[/b]']);
test('粗体（__）', '__hello__', ['[b]hello[/b]']);
test('斜体（*）', '*hello*', ['[i]hello[/i]']);
test('斜体（_）', '_hello_', ['[i]hello[/i]']);
test('粗斜体', '***bold italic***', ['[b][i]bold italic[/i][/b]']);
test('删除线', '~~gone~~', ['[del]gone[/del]']);

// ========== 行内代码 ==========
console.log('\n行内：代码');
test('行内代码', 'use `code` here', ['[font=Lucida Console]code[/font]']);
test('双反引号', '``code with ` inside``', ['[font=Lucida Console]']);

// ========== 链接 ==========
console.log('\n行内：链接');
test('标准链接', '[NGA](https://nga.178.com)', ['[url=https://nga.178.com]NGA[/url]']);
test('带 title 的链接', '[text](url "title")', ['[url=url]text[/url]']);
test('自动链接', '<https://example.com>', ['[url=https://example.com]https://example.com[/url]']);

// ========== 图片 ==========
console.log('\n行内：图片');
test('图片', '![alt](https://x.com/img.png)', ['[img]https://x.com/img.png[/img]']);

// ========== 代码块 ==========
console.log('\n块级：代码块');
test('Fenced Code 带语言', '```python\nprint("hi")\n```', ['[code=python]print("hi")[/code]']);
test('Fenced Code 无语言', '```\nplain\n```', ['[code]plain[/code]']);
test('代码块内不解析行内', '```\n**not bold**\n```', ['**not bold**']);

// ========== 列表 ==========
console.log('\n块级：列表');
test('无序列表', '- a\n- b\n- c', ['[list]', '[*]a', '[*]b', '[*]c', '[/list]']);
test('有序列表', '1. first\n2. second', ['[list=1]', '[*]first', '[*]second', '[/list]']);
test('嵌套列表', '- outer\n  - inner', ['[list]', '[list]', '[*]inner', '[/list]', '[/list]']);
test('列表项内行内', '- **bold** item', ['[b]bold[/b]']);

// ========== 引用 ==========
console.log('\n块级：引用');
test('单行引用', '> quoted', ['[quote]quoted[/quote]']);
test('多行引用', '> line1\n> line2', ['[quote]']);
test('引用内嵌套', '> > deep', ['[quote]']);

// ========== 表格 ==========
console.log('\n块级：表格');
test('基础表格', '| A | B |\n|---|---|\n| 1 | 2 |', ['[table]', '[tr][td][b]A[/b][/td][td][b]B[/b][/td][/tr]', '[tr][td]1[/td][td]2[/td][/tr]', '[/table]']);
test('左对齐', '| A |\n|:--|\n| 1 |', ['[align=left]']);
test('居中', '| A |\n|:-:|\n| 1 |', ['[align=center]']);
test('右对齐', '| A |\n|--:|\n| 1 |', ['[align=right]']);

// ========== 水平线 ==========
console.log('\n块级：水平线');
test('--- 水平线', 'before\n---\nafter', ['───────────────────────']);

// ========== 转义 ==========
console.log('\n转义');
test('转义 *', '\\*not italic\\*', ['*not italic*']);
test('转义 **', '\\*\\*not bold\\*\\*', ['**not bold**']);
test('转义 [', '\\[not a link\\]', ['[not a link]']);

// ========== 综合 ==========
console.log('\n综合场景');
test('完整帖子', '# 标题\n\n这是一段带 **粗体** 和 [链接](https://x.com) 的文本。\n\n> 引用块\n> 含 *斜体*\n\n```js\nconsole.log("hi")\n```',
  ['[h][b][size=160%]', '[b]粗体[/b]', '[url=https://x.com]', '[quote]', '[code=js]']);

// ========== 结果 ==========
console.log(`\n结果: ${passed} 通过 / ${failed} 失败`);
if (failed > 0) process.exit(1);
