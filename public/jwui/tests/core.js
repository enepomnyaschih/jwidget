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

JW.Tests = {};
JW.Tests.UI = {};

JW.Tests.UI.CoreTestCase = JW.Unit.TestCase.extend({
	testTemplate: function()
	{
		JW.Tests.UI.CoreTestCase.BaseComponent = JW.UI.Component.extend();
		
		JW.UI.template(JW.Tests.UI.CoreTestCase.BaseComponent, { main: '<a href="#"></a>', abc: '<div class="abc"></div>', def: '<div class="lalala"></div>' });
		JW.UI.template(JW.Tests.UI.CoreTestCase.BaseComponent, { def: '<div class="def"></div>', ghi: '<div class="ghi"></div>' });
		
		JW.Tests.UI.CoreTestCase.ChildComponent = JW.Tests.UI.CoreTestCase.BaseComponent.extend();
		JW.UI.template(JW.Tests.UI.CoreTestCase.ChildComponent, { abc: '<div class="jjj"></div>', ttt: '<div class="ttt"></div>' });
		
		this.assertStrictEqual('<a href="#"></a>',        JW.Tests.UI.CoreTestCase.BaseComponent.prototype.templates.main.html);
		this.assertStrictEqual('<div class="abc"></div>', JW.Tests.UI.CoreTestCase.BaseComponent.prototype.templates.abc.html);
		this.assertStrictEqual('<div class="def"></div>', JW.Tests.UI.CoreTestCase.BaseComponent.prototype.templates.def.html);
		this.assertStrictEqual('<div class="ghi"></div>', JW.Tests.UI.CoreTestCase.BaseComponent.prototype.templates.ghi.html);
		this.assertUndefined  (JW.Tests.UI.CoreTestCase.BaseComponent.prototype.templates.ttt);
		
		this.assertStrictEqual('<a href="#"></a>',        JW.Tests.UI.CoreTestCase.ChildComponent.prototype.templates.main.html);
		this.assertStrictEqual('<div class="jjj"></div>', JW.Tests.UI.CoreTestCase.ChildComponent.prototype.templates.abc.html);
		this.assertStrictEqual('<div class="def"></div>', JW.Tests.UI.CoreTestCase.ChildComponent.prototype.templates.def.html);
		this.assertStrictEqual('<div class="ghi"></div>', JW.Tests.UI.CoreTestCase.ChildComponent.prototype.templates.ghi.html);
		this.assertStrictEqual('<div class="ttt"></div>', JW.Tests.UI.CoreTestCase.ChildComponent.prototype.templates.ttt.html);
	}
});
