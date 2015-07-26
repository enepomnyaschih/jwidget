/*
	jWidget Lib tests.

	Copyright (C) 2015 Egor Nepomnyaschih

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

JW.Tests.UI.Property.RadioListenerTestCase = JW.Unit.TestCase.extend({
	setup: function()
	{
		this.el = jQuery(JW.UI.parseHtml(
			'<form>' +
				'<input type="radio" name="myradio" value="x" checked>' +
				'<input type="radio" name="myradio" value="y">' +
				'<input type="radio" name="myradio" value="z">' +
			'</form>'
		));
	},

	testListener: function()
	{
		var target = new JW.Property();
		JW.Tests.UI.Property.subscribeToProperty(this, target);
		this.setExpectedOutput("null > x");
		var listener = new JW.UI.RadioListener(this.el, "myradio", {target: target});
		this._poke();
		listener.destroy();
		target.destroy();
	},

	testAutoTarget: function()
	{
		var listener = new JW.UI.RadioListener(this.el, "myradio");
		JW.Tests.UI.Property.subscribeToProperty(this, listener.target);
		this._poke();
		listener.destroy();
	},

	testDeprecatedConstructor: function()
	{
		var target = new JW.Property();
		JW.Tests.UI.Property.subscribeToProperty(this, target);
		this.setExpectedOutput("null > x");
		var listener = new JW.UI.RadioListener(this.el, "myradio", target);
		this._poke();
		listener.destroy();
		target.destroy();
	},

	_poke: function()
	{
		this.setExpectedOutput("x > y");
		this._select("y");

		this.setExpectedOutput("y > null");
		this._select(null);

		this.setExpectedOutput("null > z");
		this._select("z");
	},

	_select: function(value)
	{
		var a = this.el.find(":checked");
		var b = this.el.find("[value=" + value + "]");
		a.length && a.prop("checked", false);
		b.length && b.prop("checked", true);
		a.length && a.change();
		b.length && b.change();
	}
});
