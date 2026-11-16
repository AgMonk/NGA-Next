/*
 * NGA-BBSCODE-FROM-MD: Markdown → NGA BBCode 转换器 (Kotlin 实现)
 *
 * 架构：与 TypeScript 版本保持一致
 *   1. 按行分割输入文本
 *   2. 识别块级结构（代码块、表格、标题、列表、引用、水平线、段落）
 *   3. 在非代码块的块级上下文中处理行内语法
 *   4. 组装输出 BBCode 字符串
 */

package com.nga.bbscode

// ========== 公共 API ==========

/** Markdown → NGA BBCode 转换选项 */
data class Md2BbsOptions(
    /** 是否保留 Markdown 转义符 \（默认 false，即处理转义） */
    val preserveEscapes: Boolean = false
)

/** 将 Markdown 字符串转换为 NGA BBCode */
fun md2bbscode(md: String, options: Md2BbsOptions = Md2BbsOptions()): String {
    val ctx = Context(normalizeLines(md), options = options)
    parseBlocks(ctx)
    return ctx.result.joinToString("\n")
}

// ========== 内部类型 ==========

private class Context(
    val lines: List<String>,
    var index: Int = 0,
    val result: MutableList<String> = mutableListOf(),
    val options: Md2BbsOptions
) {
    fun peek(offset: Int = 0): String? = lines.getOrNull(index + offset)
    fun consume(): String = lines[index++]
}

private data class HeadingMatch(val level: Int, val text: String)
private data class FenceMatch(
    val indent: Int,
    val marker: Char,
    val length: Int,
    val lang: String
)
private data class ListItem(
    val indent: Int,
    val ordered: Boolean,
    val content: String
)
private data class TableCell(val content: String, val align: String? = null)

// ========== 行规范化 ==========

private fun normalizeLines(text: String): List<String> {
    return text
        .replace(Regex("\r\n?"), "\n")
        .replace(Regex("\n+$"), "")
        .split("\n")
}

private fun isBlank(line: String): Boolean = line.trim().isEmpty()

// ========== 块级解析 ==========

private fun parseBlocks(ctx: Context) {
    while (ctx.index < ctx.lines.size) {
        val line = ctx.peek()!!

        // 1. Fenced code block
        val fence = matchFence(line)
        if (fence != null) {
            parseFencedCode(ctx, fence)
            continue
        }

        // 2. 空行
        if (isBlank(line)) {
            ctx.result.add("")
            ctx.consume()
            continue
        }

        // 3. 表格
        if (matchTableHeader(line) && matchTableDelimiter(ctx.peek(1))) {
            parseTable(ctx)
            continue
        }

        // 4. 标题
        val heading = matchHeading(line)
        if (heading != null) {
            ctx.consume()
            ctx.result.add(renderHeading(heading.level, parseInline(heading.text, ctx.options)))
            continue
        }

        // 5. 水平线
        if (matchThematicBreak(line)) {
            ctx.consume()
            ctx.result.add("───────────────────────")
            continue
        }

        // 6. 引用块
        if (matchQuote(line)) {
            parseQuote(ctx)
            continue
        }

        // 7. 列表
        if (matchListItem(line) != null) {
            parseList(ctx)
            continue
        }

        // 8. 缩进式代码块
        if (line.matches(Regex("^ {4,}")) || line.matches(Regex("^\t"))) {
            parseIndentedCode(ctx)
            continue
        }

        // 9. 普通段落
        ctx.consume()
        ctx.result.add(parseInline(line, ctx.options))
    }
}

// ========== Fenced Code Block ==========

private val fenceRegex = Regex("^( {0,3})(`{3,}|~{3,})[ \\t]*([^\\s`~]*)")

private fun matchFence(line: String): FenceMatch? {
    val m = fenceRegex.find(line) ?: return null
    return FenceMatch(
        indent = m.groupValues[1].length,
        marker = m.groupValues[2][0],
        length = m.groupValues[2].length,
        lang = m.groupValues[3]
    )
}

private fun parseFencedCode(ctx: Context, fence: FenceMatch) {
    ctx.consume()
    val lines = mutableListOf<String>()

    while (ctx.index < ctx.lines.size) {
        val line = ctx.peek()!!
        val closeMatch = matchFence(line)
        if (closeMatch != null &&
            closeMatch.indent <= fence.indent &&
            closeMatch.marker == fence.marker &&
            closeMatch.length >= fence.length
        ) {
            ctx.consume()
            break
        }
        lines.add(line)
        ctx.consume()
    }

    val codeContent = lines.joinToString("\n")
    val tag = if (fence.lang.isNotEmpty()) "[code=${fence.lang}]" else "[code]"
    ctx.result.add("$tag$codeContent[/code]")
}

// ========== 缩进式代码块 ==========

private fun parseIndentedCode(ctx: Context) {
    val lines = mutableListOf<String>()
    while (ctx.index < ctx.lines.size) {
        val line = ctx.peek()!!
        if (isBlank(line)) {
            val next = ctx.peek(1)
            if (next != null && (next.matches(Regex("^ {4,}")) || next.matches(Regex("^\t")))) {
                lines.add("")
                ctx.consume()
                continue
            }
            break
        }
        val m4 = Regex("^ {4}(.*)").find(line)
        if (m4 != null) {
            lines.add(m4.groupValues[1])
            ctx.consume()
            continue
        }
        val mTab = Regex("^\t(.*)").find(line)
        if (mTab != null) {
            lines.add(mTab.groupValues[1])
            ctx.consume()
            continue
        }
        break
    }

    if (lines.isNotEmpty()) {
        ctx.result.add("[code]${lines.joinToString("\n")}[/code]")
    }
}

// ========== 标题 ==========

private val headingRegex = Regex("^(#{1,6})[ \\t]+(.*?)(?:[ \\t]+#+)?[ \\t]*$")

private fun matchHeading(line: String): HeadingMatch? {
    val m = headingRegex.find(line) ?: return null
    return HeadingMatch(m.groupValues[1].length, m.groupValues[2])
}

private fun renderHeading(level: Int, inner: String): String = when (level) {
    1 -> "[h][b][size=160%]$inner[/size][/b][/h]"
    2 -> "[h][b][size=140%]$inner[/size][/b][/h]"
    3 -> "[h][b][size=120%]$inner[/size][/b][/h]"
    4 -> "[h][b]$inner[/b][/h]"
    5 -> "[h][b][color=gray]$inner[/color][/b][/h]"
    else -> "[h][b][color=silver]$inner[/color][/b][/h]"
}

// ========== 水平线 ==========

private fun matchThematicBreak(line: String): Boolean {
    val s = line.trim()
    if (s.length < 3) return false
    val first = s[0]
    if (first !in "*-_") return false
    for (i in 1 until s.length) {
        val c = s[i]
        if (c != first && c != ' ' && c != '\t') return false
    }
    return s.count { it == first } >= 3
}

// ========== 引用块 ==========

private val quoteStripRegex = Regex("^>[ \\t]?")

private fun matchQuote(line: String): Boolean = line.startsWith(">")

private fun parseQuote(ctx: Context) {
    val lines = mutableListOf<String>()
    while (ctx.index < ctx.lines.size) {
        val line = ctx.peek()!!
        if (matchQuote(line)) {
            lines.add(line.replace(quoteStripRegex, ""))
            ctx.consume()
            continue
        }
        if (isBlank(line)) {
            val next = ctx.peek(1)
            if (next != null && matchQuote(next)) {
                ctx.consume()
                continue
            }
            break
        }
        break
    }

    val innerResult = mutableListOf<String>()
    val innerCtx = Context(
        lines = lines.ifEmpty { listOf("") },
        result = innerResult,
        options = ctx.options
    )
    parseBlocks(innerCtx)
    ctx.result.add("[quote]${innerResult.joinToString("\n")}[/quote]")
}

// ========== 列表 ==========

private val listRegex = Regex("^( {0,5})([-*+]|\\d+[.)])[ \\t]+(.*)")

private fun matchListItem(line: String): ListItem? {
    val m = listRegex.find(line) ?: return null
    val ordered = m.groupValues[2].matches(Regex("\\d+[.)]"))
    return ListItem(
        indent = m.groupValues[1].length / 2,
        ordered = ordered,
        content = m.groupValues[3]
    )
}

private fun parseList(ctx: Context) {
    val items = mutableListOf<ListItem>()
    while (ctx.index < ctx.lines.size) {
        val item = matchListItem(ctx.peek()!!)
        if (item != null) {
            items.add(item)
            ctx.consume()
            continue
        }
        val line = ctx.peek()!!
        if (isBlank(line)) {
            val next = ctx.peek(1)
            if (next != null && matchListItem(next) != null) {
                ctx.consume()
                continue
            }
            break
        }
        break
    }
    if (items.isNotEmpty()) {
        ctx.result.add(renderList(items, ctx.options))
    }
}

private fun renderList(items: List<ListItem>, options: Md2BbsOptions): String {
    val stack = mutableListOf<Boolean>() // stores "ordered?" flag per level
    val sb = StringBuilder()
    var currentIndent = -1

    for (item in items) {
        while (stack.isNotEmpty() && item.indent < currentIndent) {
            sb.append("[/list]")
            stack.removeAt(stack.size - 1)
            currentIndent--
        }

        when {
            item.indent > currentIndent -> {
                sb.append(if (item.ordered) "[list=1]" else "[list]")
                stack.add(item.ordered)
                currentIndent = item.indent
            }
            item.indent == currentIndent && stack.isNotEmpty() -> {
                if (stack.last() != item.ordered) {
                    sb.append("[/list]")
                    stack.removeAt(stack.size - 1)
                    sb.append(if (item.ordered) "[list=1]" else "[list]")
                    stack.add(item.ordered)
                }
            }
        }

        sb.append("[*]").append(parseInline(item.content, options))
    }

    while (stack.isNotEmpty()) {
        sb.append("[/list]")
        stack.removeAt(stack.size - 1)
    }
    return sb.toString()
}

// ========== 表格 ==========

private fun matchTableHeader(line: String): Boolean {
    val trimmed = line.trim()
    if (!trimmed.startsWith("|")) return false
    return trimmed.contains("|") && trimmed.contains(Regex("\\|\\s*\\S"))
}

private val delimiterCellRegex = Regex("^\\s*:?-{1,}:?\\s*$")

private fun matchTableDelimiter(line: String?): Boolean {
    if (line == null) return false
    val cells = line.trim()
        .split("|")
        .filter { it.trim().isNotEmpty() }
    if (cells.isEmpty()) return false
    return cells.all { it.matches(delimiterCellRegex) }
}

private fun parseTable(ctx: Context) {
    val headerLine = ctx.consume()
    val delimLine = ctx.consume()
    val aligns = parseTableAligns(delimLine)

    val dataRows = mutableListOf<String>()
    while (ctx.index < ctx.lines.size) {
        val line = ctx.peek()!!
        if (line.trim().startsWith("|")) {
            dataRows.add(line)
            ctx.consume()
            continue
        }
        break
    }

    val sb = StringBuilder()
    sb.append("[table]\n")

    // 表头
    val headerCells = parseTableRow(headerLine, aligns.size)
    sb.append("[tr]")
    for (i in headerCells.indices) {
        val cell = headerCells[i]
        var content = parseInline(cell.content, ctx.options)
        val align = aligns.getOrNull(i)
        if (align != null) content = "[align=$align]$content[/align]"
        sb.append("[td][b]${content}[/b][/td]")
    }
    sb.append("[/tr]\n")

    // 数据行
    for (row in dataRows) {
        val cells = parseTableRow(row, aligns.size)
        sb.append("[tr]")
        for (i in cells.indices) {
            val cell = cells[i]
            var content = parseInline(cell.content, ctx.options)
            val align = aligns.getOrNull(i)
            if (align != null) content = "[align=$align]$content[/align]"
            sb.append("[td]${content}[/td]")
        }
        sb.append("[/tr]\n")
    }

    sb.append("[/table]")
    ctx.result.add(sb.toString())
}

private fun parseTableAligns(delimLine: String): List<String?> {
    return delimLine.trim()
        .split("|")
        .filter { it.trim().isNotEmpty() }
        .map { cell ->
            val c = cell.trim()
            val left = c.startsWith(":")
            val right = c.endsWith(":") && c.length > 1
            when {
                left && right -> "center"
                left -> "left"
                right -> "right"
                else -> null
            }
        }
}

private fun parseTableRow(line: String, expectedCols: Int): List<TableCell> {
    val trimmed = line.trim()
    val inner = trimmed.removePrefix("|").removeSuffix("|")
    val rawCells = mutableListOf<String>()
    var current = StringBuilder()
    var i = 0
    while (i < inner.length) {
        if (inner[i] == '\\' && i + 1 < inner.length && inner[i + 1] == '|') {
            current.append('|')
            i += 2
            continue
        }
        if (inner[i] == '|') {
            rawCells.add(current.toString())
            current = StringBuilder()
            i++
            continue
        }
        current.append(inner[i])
        i++
    }
    rawCells.add(current.toString())

    val cells = rawCells.map { TableCell(it.trim()) }.toMutableList()
    while (cells.size < expectedCols) cells.add(TableCell(""))
    return cells.take(expectedCols)
}

// ========== 行内解析 ==========

private fun parseInline(text: String, options: Md2BbsOptions): String {
    var result = text

    // 转义处理
    val placeholders = mutableListOf<Char>()
    if (!options.preserveEscapes) {
        result = Regex("\\\\[`*_~\\[\\]()!\\\\]").replace(result) { match ->
            val escapedChar = match.value[1]
            placeholders.add(escapedChar)
            "\u0000ESC${placeholders.size - 1}\u0000"
        }
    }

    // 图片 ![alt](url)
    result = Regex("!\\[([^\\]]*)\\]\\(([^)]+)\\)").replace(result) {
        "[img]${it.groupValues[2]}[/img]"
    }

    // 链接 [text](url) 可选 title
    result = Regex(
        "\\[([^\\]]+)\\]\\(([^)\\s]+)(?:\\s+\"[^\"]*\"|\\s+'[^']*'|\\s+\\([^)]*\\))?\\s*\\)"
    ).replace(result) {
        "[url=${it.groupValues[2]}]${it.groupValues[1]}[/url]"
    }

    // 自动链接 <http://...>
    result = Regex("<(https?://[^>\\s]+)>").replace(result) {
        val url = it.groupValues[1]
        "[url=$url]$url[/url]"
    }

    // 行内代码：先双反引号再单反引号
    result = Regex("``([^`]+)``").replace(result) {
        "[font=Lucida Console]${it.groupValues[1]}[/font]"
    }
    result = Regex("`([^`]+)`").replace(result) {
        "[font=Lucida Console]${it.groupValues[1]}[/font]"
    }

    // 删除线
    result = Regex("~~([^~]+)~~").replace(result, "[del]$1[/del]")

    // 粗斜体（必须在粗体/斜体之前）
    result = Regex("\\*\\*\\*([^*\\n]+?)\\*\\*\\*").replace(result, "[b][i]$1[/i][/b]")
    result = Regex("___([^_\\n]+?)___").replace(result, "[b][i]$1[/i][/b]")

    // 粗体
    result = Regex("\\*\\*([^*\\n]+?)\\*\\*").replace(result, "[b]$1[/b]")
    result = Regex("__([^_\\n]+?)__").replace(result, "[b]$1[/b]")

    // 斜体（词边界）
    result = Regex("(^|[^*a-zA-Z0-9])\\*([^*\\n]+?)\\*([^*a-zA-Z0-9]|$)").replace(result) {
        "${it.groupValues[1]}[i]${it.groupValues[2]}[/i]${it.groupValues[3]}"
    }
    result = Regex("(^|[^_a-zA-Z0-9])_([^_\\n]+?)_([^_a-zA-Z0-9]|$)").replace(result) {
        "${it.groupValues[1]}[i]${it.groupValues[2]}[/i]${it.groupValues[3]}"
    }

    // 行尾硬换行
    result = result.replace(Regex("  $"), "<br>")

    // 恢复转义占位符
    result = Regex("\u0000ESC(\\d+)\u0000").replace(result) {
        val idx = it.groupValues[1].toInt()
        placeholders[idx].toString()
    }

    return result
}

// ========== Main ==========

fun main() {
    val testMd = """
        # 测试标题

        这是 **粗体** 和 *斜体* 文本。

        > 这是引用块
        > 多行内容

        ```python
        def hello():
            print("hi")
        ```

        | A | B |
        |---|---|
        | 1 | 2 |

        - 列表项 1
        - 列表项 2
          - 嵌套
    """.trimIndent()

    println(md2bbscode(testMd))
}
