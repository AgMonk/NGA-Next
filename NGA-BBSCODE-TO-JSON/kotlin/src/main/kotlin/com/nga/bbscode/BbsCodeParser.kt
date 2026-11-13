/*
 * 参考 nga-api Java 实现的 BBCode 递归解析器
 * 用 Jackson 序列化输出 JSON AST
 *
 * 架构：
 *   1. 预处理（preprocess）：表情归一 [s:1] → [smile=1]，<br> → \u0007
 *   2. 递归解析（parseNodes）：逐字符扫描 + 栈式嵌套匹配
 *   3. Jackson 序列化：ObjectMapper + jackson-module-kotlin
 */

package com.nga.bbscode

import com.fasterxml.jackson.annotation.JsonProperty
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.databind.SerializationFeature
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue

// ========== 节点类型 ==========

sealed class BbsNode {
    abstract val type: String
}

data class TextNode(
    override val type: String = "text",
    val content: String
) : BbsNode()

data class TagNode(
    override val type: String = "tag",
    val name: String,
    @JsonProperty("rawParams")
    val rawParams: String? = null,
    val params: Map<String, String> = emptyMap(),
    val children: List<BbsNode> = emptyList()
) : BbsNode()

data class NewlineNode(
    override val type: String = "newline"
) : BbsNode()

data class ParseResult(
    val children: List<BbsNode>,
    val source: String
)

// ========== 标签配置 ==========

data class TagConfig(
    val name: String,
    val aliases: Set<String> = emptySet(),
    val selfClosing: Boolean = false,
    val rawContent: Boolean = false,
    val maxNesting: Int? = null
)

object TagRegistry {
    private val configs: List<TagConfig> = listOf(
        // 基础样式
        TagConfig("bold", aliases = setOf("b")),
        TagConfig("italic", aliases = setOf("i")),
        TagConfig("underline", aliases = setOf("u")),
        TagConfig("strikethrough", aliases = setOf("del")),
        TagConfig("superscript", aliases = setOf("sup")),
        TagConfig("subscript", aliases = setOf("sub")),
        TagConfig("color"),
        TagConfig("size"),
        TagConfig("font"),
        TagConfig("align", aliases = setOf("l", "r")),
        TagConfig("span"),

        // 链接
        TagConfig("url"),
        TagConfig("attach"),
        TagConfig("urlreplace", rawContent = true),

        // 引用
        TagConfig("quote", maxNesting = 10),

        // 列表
        TagConfig("list", maxNesting = 5),
        TagConfig("*", selfClosing = true),

        // 表格
        TagConfig("table"),
        TagConfig("tr"),
        TagConfig("td"),

        // 媒体
        TagConfig("img"),
        TagConfig("flash"),
        TagConfig("media"),
        TagConfig("iframe"),
        TagConfig("album"),

        // 折叠
        TagConfig("collapse"),
        TagConfig("randomblock"),

        // 代码
        TagConfig("code", rawContent = true),

        // 内部链接
        TagConfig("tid"),
        TagConfig("pid"),
        TagConfig("fid"),
        TagConfig("stid"),
        TagConfig("uid"),

        // 表情
        TagConfig("smile", aliases = setOf("s"), selfClosing = true),

        // 其他
        TagConfig("dice", rawContent = true),
        TagConfig("crypt", rawContent = true),
        TagConfig("heading", aliases = setOf("h")),
        TagConfig("lessernuke"),
        TagConfig("atUser", aliases = setOf("at")),
    )

    /** 规范名/别名 → 配置 */
    private val lookup: Map<String, TagConfig> = run {
        val map = mutableMapOf<String, TagConfig>()
        for (cfg in configs) {
            map[cfg.name.lowercase()] = cfg
            for (alias in cfg.aliases) {
                map[alias.lowercase()] = cfg
            }
        }
        map
    }

    /** 所有已知标签名（用于正则匹配，按长度降序） */
    val allNames: List<String> by lazy {
        lookup.keys.sortedByDescending { it.length }
    }

    fun resolve(raw: String): TagConfig? = lookup[raw.lowercase()]

    fun normalize(raw: String): String =
        resolve(raw)?.name ?: raw.lowercase()
}

// ========== 预处理 ==========

private val NL_PLACEHOLDER = '\u0007'

private val TAG_NAME_PATTERN: String
    get() = TagRegistry.allNames.joinToString("|") { Regex.escape(it) }

private val TAG_REGEX: Regex by lazy {
    Regex("""\[(/)?(${TAG_NAME_PATTERN})(?:([=\s][^\]]{0,200}))?\]""")
}

/** 表情归一：[s:1] → [smile=1], [s:ac:goodjob] → [smile=ac:goodjob] */
fun preprocessSmiles(text: String): String {
    var result = text.replace(Regex("""\[s:(\d+(?::\d+)*)\]""", RegexOption.IGNORE_CASE), "[smile=$1]")
    result = result.replace(Regex("""\[s:([a-z0-9]+):([^\]]+)\]""", RegexOption.IGNORE_CASE), "[smile=$1:$2]")
    return result
}

/** <br> → 占位符 */
fun normalizeNewlines(text: String): String =
    text.replace(Regex("""<br\s*/?>""", RegexOption.IGNORE_CASE), NL_PLACEHOLDER.toString())

/** 清理块级标签边界的换行 */
fun cleanBoundaryNewlines(text: String): String {
    val blockTags = listOf("quote", "list", "collapse", "randomblock", "lessernuke")
    val tagPat = blockTags.joinToString("|")
    return text
        .replace(Regex("""\u0007\s*(\[/?(?:$tagPat)\])""", RegexOption.IGNORE_CASE), "$1")
        .replace(Regex("""(\[/?(?:$tagPat)\])\s*\u0007""", RegexOption.IGNORE_CASE), "$1")
}

/** HTML 编码（只对标签外的文本部分） */
fun htmlEscapeOutsideTags(text: String): String {
    val escapeMap = mapOf(
        '<' to "&lt;", '>' to "&gt;", '"' to "&quot;",
        '\'' to "&#39;", '$' to "&#36;", '\\' to "&#92;"
    )
    val openTagPat = Regex("""^\[(/)?(${TAG_NAME_PATTERN})(?:([=\s][^\]]{0,200}))?\]""", RegexOption.IGNORE_CASE)

    val sb = StringBuilder()
    var i = 0
    while (i < text.length) {
        if (text[i] == '[') {
            val remaining = text.substring(i)
            val match = openTagPat.find(remaining)
            if (match != null && match.range.first == 0) {
                sb.append(text, i, i + match.value.length)
                i += match.value.length
                continue
            }
        }
        sb.append(escapeMap[text[i]] ?: text[i])
        i++
    }
    return sb.toString()
}

/** HTML 解码 */
fun htmlUnescape(text: String): String {
    val ampPat = Regex("""&(lt|gt|quot|amp);""")
    val decPat = Regex("""&#(\d+);""")
    val hexPat = Regex("""&#x([0-9a-fA-F]+);""")
    return text
        .replace(ampPat) { m ->
            when (m.groupValues[1]) {
                "lt" -> "<"; "gt" -> ">"; "quot" -> "\""; "amp" -> "&"
                else -> m.value
            }
        }
        .replace(decPat) { m -> m.groupValues[1].toInt().toChar().toString() }
        .replace(hexPat) { m -> m.groupValues[1].toInt(16).toChar().toString() }
}

/** 完整预处理 */
fun preprocess(text: String): String {
    var result = preprocessSmiles(text)
    result = normalizeNewlines(result)
    result = cleanBoundaryNewlines(result)
    result = htmlEscapeOutsideTags(result)
    return result
}

// ========== 核心递归解析 ==========

private const val DEFAULT_MAX_DEPTH = 20

/** 递归入口 */
fun parse(source: String): ParseResult {
    val preprocessed = preprocess(source)
    val children = parseNodes(preprocessed, depth = 0, maxDepth = DEFAULT_MAX_DEPTH)
    return ParseResult(children = children, source = source)
}

private fun parseNodes(text: String, depth: Int, maxDepth: Int): List<BbsNode> {
    if (depth > maxDepth) return listOf(TextNode(content = text))

    val openTagPat = Regex("""^\[(/)?(${TAG_NAME_PATTERN})(?:([=\s][^\]]{0,200}))?\]""", RegexOption.IGNORE_CASE)
    val nodes = mutableListOf<BbsNode>()
    val buffer = StringBuilder()

    var i = 0
    while (i < text.length) {
        val ch = text[i]

        if (ch == NL_PLACEHOLDER) {
            if (buffer.isNotEmpty()) {
                nodes.add(TextNode(content = htmlUnescape(buffer.toString())))
                buffer.clear()
            }
            nodes.add(NewlineNode())
            i++
            continue
        }

        if (ch == '[') {
            val remaining = text.substring(i)
            val match = openTagPat.find(remaining)
            if (match != null && match.range.first == 0) {
                val isClosing = match.groupValues[1] == "/"
                val rawTagName = match.groupValues[2]
                val rawParams = match.groupValues[3].ifBlank { null }
                val matchLen = match.value.length

                val canonicalName = TagRegistry.normalize(rawTagName)
                val cfg = TagRegistry.resolve(canonicalName)

                if (cfg == null || isClosing) {
                    buffer.append(ch)
                    i++
                    continue
                }

                val innerStart = i + matchLen
                val closePos = findCloseTag(text, innerStart, canonicalName, cfg)
                if (closePos == -1) {
                    buffer.append(ch)
                    i++
                    continue
                }

                if (buffer.isNotEmpty()) {
                    nodes.add(TextNode(content = htmlUnescape(buffer.toString())))
                    buffer.clear()
                }

                val innerContent = text.substring(innerStart, closePos)
                val closeTagLen = "[/$rawTagName]".length

                val tagNode = buildTagNode(canonicalName, rawParams, innerContent, cfg, depth, maxDepth)
                nodes.add(tagNode)

                i = closePos + closeTagLen
                continue
            }
        }

        buffer.append(ch)
        i++
    }

    if (buffer.isNotEmpty()) {
        nodes.add(TextNode(content = htmlUnescape(buffer.toString())))
    }

    return nodes
}

/** 栈式查找闭标签 */
private fun findCloseTag(
    text: String,
    searchFrom: Int,
    canonicalName: String,
    cfg: TagConfig
): Int {
    if (cfg.selfClosing) return searchFrom

    val escape = { s: String -> Regex.escape(s) }
    val openAliases = (listOf(canonicalName) + cfg.aliases).map(escape)

    val openPat = Regex("""\[${openAliases.joinToString("|")}(?:[=\s][^\]]{0,200})?\]""", RegexOption.IGNORE_CASE)
    val closePat = Regex("""\[/(${openAliases.joinToString("|")})\]""", RegexOption.IGNORE_CASE)

    var depth = 1
    var pos = searchFrom
    while (pos < text.length) {
        val window = text.substring(pos)
        val openMatch = openPat.find(window)
        val closeMatch = closePat.find(window)

        val hasOpen = openMatch != null
        val hasClose = closeMatch != null

        if (!hasOpen && !hasClose) return -1

        when {
            hasOpen && (!hasClose || openMatch!!.range.first < closeMatch!!.range.first) -> {
                depth++
                pos += openMatch.value.length
            }
            hasClose -> {
                depth--
                if (depth == 0) return pos + closeMatch.range.first
                pos += closeMatch.value.length
            }
        }
    }
    return -1
}

/** 构建标签节点 */
private fun buildTagNode(
    canonicalName: String,
    rawParams: String?,
    innerContent: String,
    cfg: TagConfig,
    parentDepth: Int,
    maxDepth: Int
): TagNode {
    val params = parseParams(rawParams)

    val children = if (cfg.rawContent) {
        listOf(TextNode(content = htmlUnescape(innerContent)))
    } else {
        parseNodes(innerContent, parentDepth + 1, maxDepth)
    }

    return TagNode(
        name = canonicalName,
        rawParams = rawParams,
        params = params,
        children = children
    )
}

/**
 * 解析标签参数
 *   [pid=123,456]      → { value: '123,456' }
 *   [td width=80 auto] → { width: '80', auto: 'true' }
 */
private fun parseParams(raw: String?): Map<String, String> {
    if (raw == null) return emptyMap()
    var s = raw.trim()
    if (s.startsWith("=")) s = s.substring(1)
    if (s.isEmpty()) return emptyMap()

    val result = mutableMapOf<String, String>()

    val hasKeyValue = Regex("""(?:[\s,])[a-zA-Z][a-zA-Z0-9]*=""").find(" $s") != null

    if (hasKeyValue) {
        val parts = mutableListOf<String>()
        s.split(Regex("""\s+""")).forEach { seg ->
            if (seg.contains("=")) {
                seg.split(Regex(""",(?=[a-zA-Z]+=)""")).forEach { parts.add(it) }
            } else if (seg.contains(",")) {
                seg.split(",").filter { it.isNotEmpty() }.forEach { parts.add(it) }
            } else {
                parts.add(seg)
            }
        }
        for (part in parts) {
            if (part.isEmpty()) continue
            if (part.contains("=")) {
                val eq = part.indexOf('=')
                val key = part.substring(0, eq).trim()
                val value = part.substring(eq + 1).trim()
                if (key.isNotEmpty()) result[key] = value
            } else {
                result[part] = "true"
            }
        }
        return result
    }

    result["value"] = s
    return result
}

// ========== JSON 序列化 ==========

object BbsCodeJson {
    val mapper: ObjectMapper = jacksonObjectMapper().apply {
        enable(SerializationFeature.INDENT_OUTPUT)
    }

    /** 序列化 JSON 字符串 */
    fun toJson(result: ParseResult): String = mapper.writeValueAsString(result)
    fun nodesToJson(nodes: List<BbsNode>): String = mapper.writeValueAsString(nodes)

    /** 反序列化（便于测试/调试） */
    inline fun <reified T : Any> fromJson(json: String): T = mapper.readValue(json)
}

// ========== main ==========

fun main(args: Array<String>) {
    val sample = "[b]Hello [url=https://nga.178.com]NGA[/url]![/b]\n" +
            "[quote]This is a quote with [color=red]red text[/color].[/quote]\n" +
            "[code]let x = [b]1[/b];[/code]"

    val result = parse(sample)
    println(BbsCodeJson.toJson(result))
}
