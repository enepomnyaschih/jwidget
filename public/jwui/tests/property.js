/*
	jWidget UI tests.
	
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

JW.Tests.UI.PropertyTestCase = JW.Unit.TestCase.extend({
	testClassNameUpdater: function()
	{
		var el = jQuery('<div class="elem"></div>')[0];
		var color = new JW.Property("red");

		var updater = new JW.UI.ClassNameUpdater(el, color);
		this.assertStrictEqual("elem red", el.className);

		color.set("blue");
		this.assertStrictEqual("elem blue", el.className);

		color.set(null);
		this.assertStrictEqual("elem", el.className);

		color.set("green");
		this.assertStrictEqual("elem green", el.className);

		updater.destroy();
		this.assertStrictEqual("elem", el.className);
	}
});
