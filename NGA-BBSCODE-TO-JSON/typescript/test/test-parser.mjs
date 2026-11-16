// NGA-BBSCODE-TO-JSON 测试
import { parse, extractText } from '../dist/index.js';

let pass = 0;
let fail = 0;

function test(name, input, check) {
  const result = parse(input);
  const ok = check(result.children);
  if (ok) {
    pass++;
    console.log(`✓ ${name}`);
  } else {
    fail++;
    console.log(`✗ ${name}`);
    console.log(`  输入: ${JSON.stringify(input)}`);
    console.log(`  输出: ${JSON.stringify(result.children, null, 2)}`);
    if (result.debug?.warnings.length) {
      console.log(`  警告: ${result.debug.warnings.join(', ')}`);
    }
  }
  return ok;
}

// ===== 1. 纯文本 =====
test('纯文本', 'hello world', (c) =>
  c.length === 1 && c[0].type === 'text' && c[0].content === 'hello world'
);

// ===== 2. 基础样式 =====
test('加粗 [b]', '[b]bold[/b]', (c) =>
  c[0].type === 'tag' && c[0].name === 'bold' && c[0].children[0].content === 'bold'
);

test('斜体 [i]', '[i]italic[/i]', (c) => c[0].name === 'italic');
test('下划线 [u]', '[u]underline[/u]', (c) => c[0].name === 'underline');
test('删除线 [del]', '[del]strike[/del]', (c) => c[0].name === 'strikethrough');

test('颜色 [color] 合法颜色名', '[color=red]text[/color]', (c) =>
  c[0].name === 'color' && c[0].params.value === 'red'
);

test('颜色 [color] HEX 值（官方渲染层会报错，但解析器如实记录）', '[color=#ff0000]text[/color]', (c) =>
  c[0].name === 'color' && c[0].params.value === '#ff0000'
);

test('颜色 [color] 任意值（解析器只管语法）', '[color=任意值]text[/color]', (c) =>
  c[0].name === 'color' && c[0].params.value === '任意值'
);

test('字号 [size] 百分比', '[size=120%]big[/size]', (c) =>
  c[0].name === 'size' && c[0].params.value === '120%'
);

test('字体 [font]', '[font=Arial]text[/font]', (c) =>
  c[0].name === 'font' && c[0].params.value === 'Arial'
);

// ===== 3. 嵌套样式 =====
test('嵌套样式 [b][i]...[/i][/b]', '[b]bold [i]italic[/i][/b]', (c) => {
  const b = c[0];
  return b.children.length === 2 &&
    b.children[0].content === 'bold ' &&
    b.children[1].name === 'italic';
});

test('三层嵌套 [b][i][u]...[/u][/i][/b]', '[b][i][u]deep[/u][/i][/b]', (c) => {
  const b = c[0], i = b.children[0], u = i.children[0];
  return b.name === 'bold' && i.name === 'italic' && u.name === 'underline';
});

// ===== 4. 链接 =====
test('URL 有参数 [url=xxx]yyy[/url]', '[url=https://nga.178.com]NGA[/url]', (c) =>
  c[0].name === 'url' && c[0].params.value === 'https://nga.178.com'
);

// ===== 5. 引用 =====
test('简单引用', '[quote]quoted text[/quote]', (c) =>
  c[0].name === 'quote' && c[0].children[0].content === 'quoted text'
);

test('嵌套引用', '[quote]outer [quote]inner[/quote][/quote]', (c) =>
  c[0].children[1]?.type === 'tag' && c[0].children[1].name === 'quote'
);

// ===== 6. 列表 =====
test('无序列表 [list]', '[list][*]a[*]b[*]c[/list]', (c) =>
  c[0].name === 'list' && c[0].children.length >= 3
);

// ===== 7. 代码块 =====
test('代码块内部不递归', '[code]let [b]x[/b] = 1;[/code]', (c) =>
  c[0].name === 'code' &&
  c[0].children.length === 1 &&
  c[0].children[0].content === 'let [b]x[/b] = 1;'
);

test('带语言的代码块', '[code=javascript]var x = 1;[/code]', (c) =>
  c[0].params.value === 'javascript'
);

// ===== 8. 图片 =====
test('图片 [img]', '[img]https://example.com/a.jpg[/img]', (c) =>
  c[0].name === 'img'
);

// ===== 9. 表情 =====
test('数字表情 [s:1]', '[s:1]', (c) =>
  c[0].name === 'smile' && c[0].params.value === '1'
);

test('分组表情 [s:ac:goodjob]', '[s:ac:goodjob]', (c) =>
  c[0].params.value === 'ac:goodjob'
);

// ===== 10. 内部链接 =====
test('tid 标签', '[tid=12345]标题[/tid]', (c) =>
  c[0].name === 'tid' && c[0].params.value === '12345'
);

test('pid 标签（逗号不分割）', '[pid=123,456]回复[/pid]', (c) =>
  c[0].name === 'pid' && c[0].params.value === '123,456'
);

// ===== 11. 换行 =====
test('<br> 转换为换行节点', 'line1<br>line2', (c) =>
  c.length === 3 && c[1].type === 'newline'
);

// ===== 12. HTML 实体解码 =====
test('HTML 实体解码', '[b]Tom &amp; Jerry[/b]', (c) =>
  c[0].children[0].content === 'Tom & Jerry'
);

// ===== 13. 混合内容 =====
test('混合文本和标签', '你好 [b]世界[/b]！', (c) =>
  c.length === 3 && c[0].content === '你好 ' && c[2].content === '！'
);

// ===== 14. 骰子 =====
test('骰子不递归内部', '[dice]2d6+3[/dice]', (c) =>
  c[0].name === 'dice' && c[0].children[0].content === '2d6+3'
);

// ===== 15. 未闭合标签 =====
test('未闭合标签（当作文本）', '[b]test', (c) => c.length >= 1);

// ===== 16. td 参数：width/colspan/rowspan 等号可选 + top 关键字 =====
test('td width 有等号', '[td width=80]cell[/td]', (c) =>
  c[0].name === 'td' && c[0].params.width === '80'
);
test('td width 无等号（官方支持）', '[td width80]cell[/td]', (c) =>
  c[0].params.width === '80'
);
test('td colspan 有等号', '[td colspan=2]cell[/td]', (c) =>
  c[0].params.colspan === '2'
);
test('td colspan 无等号（官方支持）', '[td colspan2]cell[/td]', (c) =>
  c[0].params.colspan === '2'
);
test('td rowspan + top', '[td rowspan3 top]cell[/td]', (c) =>
  c[0].params.rowspan === '3' && c[0].params.verticalAlign === 'top'
);

// ===== 17. img 参数：直接跟数字或 -数字（无等号）=====
test('img 有参数 [img-1]', '[img-1]url[/img]', (c) =>
  c[0].name === 'img' && c[0].params.value === '-1'
);
test('img 正号参数 [img123]', '[img123]url[/img]', (c) =>
  c[0].params.value === '123'
);
test('img 无参数', '[img]url[/img]', (c) =>
  c[0].params.value === undefined || Object.keys(c[0].params).length === 0
);

// ===== 18. 内部链接：等号可选 =====
test('tid 无等号 [tid123]', '[tid123]标题[/tid]', (c) =>
  c[0].params.value === '123'
);
test('tid 有等号 [tid=123]', '[tid=123]标题[/tid]', (c) =>
  c[0].params.value === '123'
);
test('pid 无等号 [pid123,456]', '[pid123,456]回复[/pid]', (c) =>
  c[0].params.value === '123,456'
);

// ===== 19. list 单字符参数 =====
test('list 有序 [list=1]', '[list=1][*]a[/list]', (c) =>
  c[0].name === 'list' && c[0].params.value === '1'
);
test('list 无参数（无序）', '[list][*]a[/list]', (c) =>
  c[0].params.value === undefined
);

// ===== 20. iframe 逗号参数 =====
test('iframe 有尺寸 [iframe=500,600]', '[iframe=500,600]http://x[/iframe]', (c) =>
  c[0].name === 'iframe' && c[0].params.value === '500,600'
);

// ===== 21. color bg 前缀 =====
test('color 背景色前缀 [color=bgred]', '[color=bgred]text[/color]', (c) =>
  c[0].name === 'color' && c[0].params.value === 'bgred'
);

// ===== 22. flash 视频/音频 =====
test('flash=video', '[flash=video]http://x[/flash]', (c) =>
  c[0].name === 'flash' && c[0].params.value === 'video'
);
test('media=audio', '[media=audio]http://x[/media]', (c) =>
  c[0].name === 'media' && c[0].params.value === 'audio'
);

// ===== 结果 =====
console.log(`\n${pass} 通过, ${fail} 失败, 总计 ${pass + fail}`);
process.exit(fail > 0 ? 1 : 0);
