/*
	jWidget Lib tests.

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

JW.Tests.UI.Property.CheckedListenerTestCase = JW.Unit.TestCase.extend({
	setup: function()
	{
		this.el = jQuery(JW.UI.parseHtml('<input type="checkbox">'));
	},

	testListener: function()
	{
		var target = new JW.Property();
		JW.Tests.UI.Property.subscribeToProperty(this, target);
		this.setExpectedOutput("null > false");
		var listener = new JW.UI.CheckedListener(this.el, {target: target});
		this._poke();
		listener.destroy();
		target.destroy();
	},

	testAutoTarget: function()
	{
		var listener = new JW.UI.CheckedListener(this.el);
		JW.Tests.UI.Property.subscribeToProperty(this, listener.target);
		this._poke();
		listener.destroy();
	},

	testDeprecatedConstructor: function()
	{
		var target = new JW.Property();
		JW.Tests.UI.Property.subscribeToProperty(this, target);
		this.setExpectedOutput("null > false");
		var listener = new JW.UI.CheckedListener(this.el, target);
		this._poke();
		listener.destroy();
		target.destroy();
	},

	_poke: function()
	{
		this.setExpectedOutput("false > true");
		this.el.prop("checked", true);
		this.el.change();

		this.setExpectedOutput("true > false");
		this.el.prop("checked", false);
		this.el.change();
	}
});
