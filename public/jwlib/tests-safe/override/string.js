/*
	JW string prototype extension tests.
	
	Copyright (C) 2011 Egor Nepomnyaschih
	
	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU Lesser General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.
	
	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU Lesser General Public License for more details.
	
	You should have received a copy of the GNU Lesser General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

JW.ns("JW.Tests.Override");

JW.Tests.Override.StringTestCase = JW.Unit.TestCase.extend({
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
	
	testFly: function()
	{
		this.assertStrictEqual("ab-de", JW("abDe").hyphen());
	}
});
