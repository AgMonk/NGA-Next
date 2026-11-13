package com.nga.bbscode

import org.jetbrains.kotlin.konan.file.File
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertNotNull
import kotlin.test.assertTrue

class BbsCodeParserTest {

    @Test
    fun `basic bold`() {
        val r = parse("[b]bold[/b]")
        assertEquals("bold", (r.children.first() as TagNode).children.first().let {
            (it as TextNode).content
        })
    }

    @Test
    fun `nested italic inside bold`() {
        val r = parse("[b]a [i]b[/i] c[/b]")
        val bold = r.children.first() as TagNode
        assertTrue(bold.children[1] is TagNode)
        assertEquals("italic", (bold.children[1] as TagNode).name)
    }

    @Test
    fun `code tag does not recurse`() {
        val r = parse("[code]let [b]x[/b] = 1[/code]")
        val code = r.children.first() as TagNode
        val inner = code.children.first() as TextNode
        assertEquals("let [b]x[/b] = 1", inner.content)
    }

    @Test
    fun `url with params`() {
        val r = parse("[url=https://nga.178.com]NGA[/url]")
        val url = r.children.first() as TagNode
        assertEquals("url", url.name)
        assertEquals("https://nga.178.com", url.params["value"])
    }

    @Test
    fun `smile tag [s-1] is normalized`() {
        val r = parse("[s:1]")
        val smile = r.children.first() as TagNode
        assertEquals("smile", smile.name)
        assertEquals("1", smile.params["value"])
    }

    @Test
    fun `quote nesting`() {
        val r = parse("[quote]outer [quote]inner[/quote][/quote]")
        val outer = r.children.first() as TagNode
        val inner = outer.children[1] as TagNode
        assertEquals("quote", inner.name)
    }

    @Test
    fun `json serialization roundtrip`() {
        val r = parse("[b]hello[/b]")
        val json = BbsCodeJson.toJson(r)
        assertTrue(json.contains("bold"))
        assertTrue(json.contains("hello"))
        assertTrue(json.contains("text"))
    }

    @Test
    fun `pid params stay together`() {
        val r = parse("[pid=123,456]reply[/pid]")
        val pid = r.children.first() as TagNode
        assertEquals("123,456", pid.params["value"])
    }

    @Test
    fun `td multi-params`() {
        val r = parse("[td width=80 auto]cell[/td]")
        val td = r.children.first() as TagNode
        assertEquals("80", td.params["width"])
        assertEquals("true", td.params["auto"])
    }
}
