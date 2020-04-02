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

JW.ns("JW.Tests.Schema.DigMyData");

JW.Tests.Schema.DigMyData.CalcLinesTestCase = JW.Schema.TestCase.extend({
	schemaUrl: "/tests/schema/digmydata/calclines",
	
	testValid: function()
	{
		this.assertValidName("valid");
	},
	
	testInvalid: function()
	{
		this.assertInvalidName("invalid", null, true, [
			"Data is invalid. Full errors list:",
			"calclines.0.id: integer expected",
			"calclines.0.title: string expected",
			"calclines.0.format: value is not an element of enumeration",
			"calclines.0.definition: string expected",
			"calclines.0.valid: boolean expected",
			"calclines.1.id: must be more than 0",
			"calclines.1.title: string expected",
			"calclines.1.definition: string expected",
			"calclines.1.valid: boolean expected",
			"calclines.1: garbage found: valud"
		].join("\n"));
	}
});
