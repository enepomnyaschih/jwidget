/*
	JW utility methods tests.
	
	Copyright (C) 2014 Egor Nepomnyaschih
	
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

JW.ns("JW.Tests.UI");

JW.Tests.UI.CoreTestCase = JW.Unit.TestCase.extend({
	testTemplate: function()
	{
		JW.Tests.UI.CoreTestCase.BaseComponent = JW.UI.Component.extend();
		
		JW.UI.template(JW.Tests.UI.CoreTestCase.BaseComponent, { main: '<a href="#" />', abc: '<div class="abc" />', def: '<div class="lalala" />' });
		JW.UI.template(JW.Tests.UI.CoreTestCase.BaseComponent, { def: '<div class="def" />', ghi: '<div class="ghi" />' });
		
		JW.Tests.UI.CoreTestCase.ChildComponent = JW.Tests.UI.CoreTestCase.BaseComponent.extend();
		JW.UI.template(JW.Tests.UI.CoreTestCase.ChildComponent, { abc: '<div class="jjj" />', ttt: '<div class="ttt" />' });
		
		this.assertStrictEqual('<a href="#" />',      JW.Tests.UI.CoreTestCase.BaseComponent.prototype.templates.main);
		this.assertStrictEqual('<div class="abc" />', JW.Tests.UI.CoreTestCase.BaseComponent.prototype.templates.abc);
		this.assertStrictEqual('<div class="def" />', JW.Tests.UI.CoreTestCase.BaseComponent.prototype.templates.def);
		this.assertStrictEqual('<div class="ghi" />', JW.Tests.UI.CoreTestCase.BaseComponent.prototype.templates.ghi);
		this.assertUndefined  (JW.Tests.UI.CoreTestCase.BaseComponent.prototype.templates.ttt);
		
		this.assertStrictEqual('<a href="#" />',      JW.Tests.UI.CoreTestCase.ChildComponent.prototype.templates.main);
		this.assertStrictEqual('<div class="jjj" />', JW.Tests.UI.CoreTestCase.ChildComponent.prototype.templates.abc);
		this.assertStrictEqual('<div class="def" />', JW.Tests.UI.CoreTestCase.ChildComponent.prototype.templates.def);
		this.assertStrictEqual('<div class="ghi" />', JW.Tests.UI.CoreTestCase.ChildComponent.prototype.templates.ghi);
		this.assertStrictEqual('<div class="ttt" />', JW.Tests.UI.CoreTestCase.ChildComponent.prototype.templates.ttt);
	}
});
