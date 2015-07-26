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
