/*
MIT License

Copyright (c) 2020 Egor Nepomnyaschih

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

JW.Tests.Util.StringTestCase = JW.Unit.TestCase.extend({
	testHtmlEncode: function()
	{
		var html = '<div width="100" height="100" style="background-color: red;">&nbsp;<script type="text/javascript">while(1)alert();</script></div>';
		var expected = '&lt;div width=&quot;100&quot; height=&quot;100&quot; style=&quot;background-color: red;&quot;&gt;&amp;nbsp;&lt;script type=&quot;text/javascript&quot;&gt;while(1)alert();&lt;/script&gt;&lt;/div&gt;';
		this.assertStrictEqual(expected, JW.String.htmlEncode(html));
		
		this.assertStrictEqual("undefined", JW.String.htmlEncode(undefined));
	},
	
	testHtmlDecode: function()
	{
		var html = '&lt;div width=&quot;100&quot; height=&quot;100&quot; style=&quot;background-color: red;&quot;&gt;&amp;nbsp;&lt;script type=&quot;text/javascript&quot;&gt;while(1)alert();&lt;/script&gt;&lt;/div&gt;';
		var expected = '<div width="100" height="100" style="background-color: red;">&nbsp;<script type="text/javascript">while(1)alert();</script></div>';
		this.assertStrictEqual(expected, JW.String.htmlDecode(html));
		
		this.assertStrictEqual("undefined", JW.String.htmlDecode(undefined));
	},
	
	testEllipsis: function()
	{
		this.assertStrictEqual("  abcde...", JW.String.ellipsis("  abcdefghijklmno", 10));
		this.assertStrictEqual("  abc!!111", JW.String.ellipsis("  abcdefghijklmno", 10, "!!111"));
	},
	
	testPrepend: function()
	{
		this.assertStrictEqual("0000054", JW.String.prepend("54", 7, "0"));
	},
	
	testCapitalize: function()
	{
		this.assertStrictEqual("Abcde", JW.String.capitalize("abcde"));
		this.assertStrictEqual("ABCDE", JW.String.capitalize("ABCDE"));
		this.assertStrictEqual(" abcd", JW.String.capitalize(" abcd"));
		this.assertStrictEqual("Ab-de", JW.String.capitalize("ab-de"));
	},
	
	testCamel: function()
	{
		this.assertStrictEqual("abcde", JW.String.camel("abcde"));
		this.assertStrictEqual("ABCDE", JW.String.camel("ABCDE"));
		this.assertStrictEqual(" abcd", JW.String.camel(" abcd"));
		this.assertStrictEqual("abDe",  JW.String.camel("ab-de"));
		this.assertStrictEqual("abDe",  JW.String.camel("abDe"));
		this.assertStrictEqual("abCDe", JW.String.camel("ab-c-de"));
		this.assertStrictEqual("abCDe", JW.String.camel("abCDe"));
	},
	
	testHyphen: function()
	{
		this.assertStrictEqual("abcde",      JW.String.hyphen("abcde"));
		this.assertStrictEqual("-a-b-c-d-e", JW.String.hyphen("ABCDE"));
		this.assertStrictEqual(" abcd",      JW.String.hyphen(" abcd"));
		this.assertStrictEqual("ab-de",      JW.String.hyphen("ab-de"));
		this.assertStrictEqual("ab-de",      JW.String.hyphen("abDe"));
		this.assertStrictEqual("ab-c-de",    JW.String.hyphen("ab-c-de"));
		this.assertStrictEqual("ab-c-de",    JW.String.hyphen("abCDe"));
	},
	
	testTrim: function()
	{
		this.assertStrictEqual("lala",    JW.String.trim("   lala  "));
		this.assertStrictEqual("la   la", JW.String.trim("   la   la  "));
		this.assertStrictEqual("lala",    JW.String.trim("   lala"));
		this.assertStrictEqual("lala",    JW.String.trim("lala  "));
		this.assertStrictEqual("lala",    JW.String.trim("lala"));
		this.assertStrictEqual("la   la", JW.String.trim("la   la"));
		this.assertStrictEqual("",        JW.String.trim("    "));
		this.assertStrictEqual("",        JW.String.trim(""));
		this.assertStrictEqual("lala",    JW.String.trim("  \r\t lala  \n"));
	},
	
	testParseClass: function()
	{
		this.assertTrue(
			JW.Array.equal(["a", "b", "c", "d", "e"],
			JW.String.parseClass(["  a    b ", "c", [], "", [["d", "    ", "e"]]])));
	}
});
