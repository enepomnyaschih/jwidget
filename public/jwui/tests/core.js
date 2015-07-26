/*
	jWidget UI tests.
	
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
