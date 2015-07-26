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
