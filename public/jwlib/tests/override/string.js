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
		this.assertStrictEqual("  abcde...", ("  abcdefghijklmno").ellipsis(10));
		this.assertStrictEqual("  abc!!111", ("  abcdefghijklmno").ellipsis(10, "!!111"));
	},
	
	testPrepend: function()
	{
		this.assertStrictEqual("0000054", "54".prepend(7, "0"));
	},
	
	testCapitalize: function()
	{
		this.assertStrictEqual("Abcde", ("abcde").capitalize());
		this.assertStrictEqual("ABCDE", ("ABCDE").capitalize());
		this.assertStrictEqual(" abcd", (" abcd").capitalize());
		this.assertStrictEqual("Ab-de", ("ab-de").capitalize());
	},
	
	testCamel: function()
	{
		this.assertStrictEqual("abcde", ("abcde").camel());
		this.assertStrictEqual("ABCDE", ("ABCDE").camel());
		this.assertStrictEqual(" abcd", (" abcd").camel());
		this.assertStrictEqual("abDe",  ("ab-de").camel());
		this.assertStrictEqual("abDe",  ("abDe").camel());
		this.assertStrictEqual("abCDe", ("ab-c-de").camel());
		this.assertStrictEqual("abCDe", ("abCDe").camel());
	},
	
	testHyphen: function()
	{
		this.assertStrictEqual("abcde",      ("abcde").hyphen());
		this.assertStrictEqual("-a-b-c-d-e", ("ABCDE").hyphen());
		this.assertStrictEqual(" abcd",      (" abcd").hyphen());
		this.assertStrictEqual("ab-de",      ("ab-de").hyphen());
		this.assertStrictEqual("ab-de",      ("abDe").hyphen());
		this.assertStrictEqual("ab-c-de",    ("ab-c-de").hyphen());
		this.assertStrictEqual("ab-c-de",    ("abCDe").hyphen());
	},
	
	testTrim: function()
	{
		this.assertStrictEqual("lala", ("   lala  ").trim());
		this.assertStrictEqual("la   la", ("   la   la  ").trim());
		this.assertStrictEqual("lala", ("   lala").trim());
		this.assertStrictEqual("lala", ("lala  ").trim());
		this.assertStrictEqual("lala", ("lala").trim());
		this.assertStrictEqual("la   la", ("la   la").trim());
		this.assertStrictEqual("", ("    ").trim());
		this.assertStrictEqual("", ("").trim());
		this.assertStrictEqual("lala", ("  \r\t lala  \n").trim());
	},
	
	testFly: function()
	{
		this.assertStrictEqual("ab-de", JW("abDe").hyphen());
	}
});
