package com.nga.bbscode

import kotlin.test.Test
import kotlin.test.assertTrue
import kotlin.test.assertEquals

class MdToBbsTest {

    private fun convert(md: String): String = md2bbscode(md)

    private fun assertContains(name: String, md: String, expected: String) {
        val result = convert(md)
        assertTrue(
            result.contains(expected),
            "[$name] 期望包含 ${expected}，实际结果: ${result}"
        )
    }

    private fun assertAllContain(name: String, md: String, expectedList: List<String>) {
        val result = convert(md)
        for (e in expectedList) {
            assertTrue(
                result.contains(e),
                "[$name] 期望包含 $e，实际结果: $result"
            )
        }
    }

    // ========== 标题 ==========

    @Test
    fun h1() { assertContains("H1", "# Hello", "[h][b][size=160%]Hello[/size][/b][/h]") }

    @Test
    fun h2() { assertContains("H2", "## World", "[h][b][size=140%]World[/size][/b][/h]") }

    @Test
    fun h3() { assertContains("H3", "### H3", "[size=120%]") }

    @Test
    fun h4() { assertContains("H4", "#### H4", "[h][b]H4[/b][/h]") }

    @Test
    fun h5() { assertContains("H5", "##### H5", "[color=gray]") }

    @Test
    fun h6() { assertContains("H6", "###### H6", "[color=silver]") }

    @Test
    fun headingWithClosingMarker() {
        assertContains("闭合标记", "# Hello #", "[h][b][size=160%]Hello")
    }

    @Test
    fun headingWithInline() {
        val result = convert("# **bold** title")
        assertTrue(result.contains("[b]"))
        assertTrue(result.contains("[h][b][size=160%]"))
    }

    // ========== 行内样式 ==========

    @Test
    fun bold() { assertContains("粗体", "**hello**", "[b]hello[/b]") }

    @Test
    fun boldUnderscore() { assertContains("粗体 __", "__hello__", "[b]hello[/b]") }

    @Test
    fun italic() { assertContains("斜体", "*hello*", "[i]hello[/i]") }

    @Test
    fun italicUnderscore() { assertContains("斜体 _", "_hello_", "[i]hello[/i]") }

    @Test
    fun boldItalic() { assertContains("粗斜体", "***bold italic***", "[b][i]bold italic[/i][/b]") }

    @Test
    fun strikethrough() { assertContains("删除线", "~~gone~~", "[del]gone[/del]") }

    // ========== 行内代码 ==========

    @Test
    fun inlineCode() { assertContains("行内代码", "use `code` here", "[font=Lucida Console]code[/font]") }

    @Test
    fun doubleBacktick() { assertContains("双反引号", "``code with ` inside``", "[font=Lucida Console]") }

    // ========== 链接 ==========

    @Test
    fun link() {
        assertContains("标准链接", "[NGA](https://nga.178.com)", "[url=https://nga.178.com]NGA[/url]")
    }

    @Test
    fun linkWithTitle() {
        assertContains("带 title", "[text](url \"title\")", "[url=url]text[/url]")
    }

    @Test
    fun autolink() {
        assertContains("自动链接", "<https://example.com>", "[url=https://example.com]https://example.com[/url]")
    }

    // ========== 图片 ==========

    @Test
    fun image() {
        assertContains("图片", "![alt](https://x.com/img.png)", "[img]https://x.com/img.png[/img]")
    }

    // ========== 代码块 ==========

    @Test
    fun fencedCodeWithLang() {
        val result = convert("```python\nprint(\"hi\")\n```")
        assertTrue(result.contains("[code=python]"))
        assertTrue(result.contains("print(\"hi\")"))
        assertTrue(result.contains("[/code]"))
    }

    @Test
    fun fencedCodeNoLang() {
        assertAllContain("无语言", "```\nplain\n```", listOf("[code]", "plain", "[/code]"))
    }

    @Test
    fun codeBlockNoInlineParse() {
        // 代码块内不应解析 **
        val result = convert("```\n**not bold**\n```")
        assertTrue(result.contains("**not bold**"))
        assertTrue(!result.contains("[b]"))
    }

    // ========== 列表 ==========

    @Test
    fun unorderedList() {
        val result = convert("- a\n- b\n- c")
        assertTrue(result.contains("[list]"))
        assertTrue(result.contains("[*]a"))
        assertTrue(result.contains("[*]b"))
        assertTrue(result.contains("[*]c"))
        assertTrue(result.contains("[/list]"))
    }

    @Test
    fun orderedList() {
        val result = convert("1. first\n2. second")
        assertTrue(result.contains("[list=1]"))
        assertTrue(result.contains("[*]first"))
        assertTrue(result.contains("[*]second"))
        assertTrue(result.contains("[/list]"))
    }

    @Test
    fun nestedList() {
        val result = convert("- outer\n  - inner")
        assertTrue(result.contains("[list]"))
        assertTrue(result.contains("[*]outer"))
        assertTrue(result.contains("[list]"))
        assertTrue(result.contains("[*]inner"))
        assertTrue(result.contains("[/list]"))
    }

    @Test
    fun listItemWithInline() {
        assertContains("列表内行内", "- **bold** item", "[b]bold[/b]")
    }

    // ========== 引用 ==========

    @Test
    fun quoteSingle() { assertContains("单行引用", "> quoted", "[quote]quoted[/quote]") }

    @Test
    fun quoteMulti() { assertContains("多行引用", "> line1\n> line2", "[quote]") }

    @Test
    fun quoteNested() { assertContains("引用嵌套", "> > deep", "[quote]") }

    // ========== 表格 ==========

    @Test
    fun basicTable() {
        val result = convert("| A | B |\n|---|---|\n| 1 | 2 |")
        assertTrue(result.contains("[table]"))
        assertTrue(result.contains("[tr][td][b]A[/b][/td][td][b]B[/b][/td][/tr]"))
        assertTrue(result.contains("[tr][td]1[/td][td]2[/td][/tr]"))
        assertTrue(result.contains("[/table]"))
    }

    @Test
    fun tableLeftAlign() {
        assertContains("左对齐", "| A |\n|:--|\n| 1 |", "[align=left]")
    }

    @Test
    fun tableCenterAlign() {
        assertContains("居中", "| A |\n|:-:|\n| 1 |", "[align=center]")
    }

    @Test
    fun tableRightAlign() {
        assertContains("右对齐", "| A |\n|--:|\n| 1 |", "[align=right]")
    }

    // ========== 水平线 ==========

    @Test
    fun thematicBreak() {
        val result = convert("before\n---\nafter")
        assertTrue(result.contains("───────────────────────"))
    }

    // ========== 转义 ==========

    @Test
    fun escapeAsterisk() { assertContains("转义 *", "\\*not italic\\*", "*not italic*") }

    @Test
    fun escapeDoubleAsterisk() {
        assertContains("转义 **", "\\*\\*not bold\\*\\*", "**not bold**")
    }

    @Test
    fun escapeBracket() {
        assertContains("转义 [", "\\[not a link\\]", "[not a link]")
    }

    // ========== 综合场景 ==========

    @Test
    fun fullPost() {
        val md = """
            # 标题

            这是一段带 **粗体** 和 [链接](https://x.com) 的文本。

            > 引用块
            > 含 *斜体*

            ```js
            console.log("hi")
            ```
        """.trimIndent()

        val result = convert(md)
        assertTrue(result.contains("[h][b][size=160%]"))
        assertTrue(result.contains("[b]粗体[/b]"))
        assertTrue(result.contains("[url=https://x.com]"))
        assertTrue(result.contains("[quote]"))
        assertTrue(result.contains("[code=js]"))
    }
}
