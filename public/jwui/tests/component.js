/*
	jWidget UI tests.
	
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

JW.Tests.UI.ComponentTestCase = JW.Unit.TestCase.extend({
	testCollection: function()
	{
		/* Preset */

		var ItemView = function(id) {
			ItemView._super.call(this);
			this.id = id;
		};

		JW.extend(ItemView, JW.UI.Component, {
			renderRoot: function(el) {
				el.text(this.id);
			}
		});

		JW.UI.template(ItemView, {main: '<li></li>'});

		var SetView = function() {
			SetView._super.call(this);
			this.items = this.own(new JW.ObservableSet()).ownItems();
		};

		JW.extend(SetView, JW.UI.Component, {
			renderRoot: function() {
				return this.items;
			}
		});

		JW.UI.template(SetView, {main: '<ul></ul>'});

		/* Test case */

		var view = new SetView();
		var items = view.items;
		var a, b, c, d, e, f;
		items.add(a = new ItemView("a"));
		items.add(b = new ItemView("b"));
		view.render();
		this.assertStrictEqual('<li>a</li><li>b</li>', view.el.html());

		items.addAll([c = new ItemView("c"), d = new ItemView("d")]);
		this.assertStrictEqual('<li>a</li><li>b</li><li>c</li><li>d</li>', view.el.html());

		items.removeAll([b, c]);
		this.assertStrictEqual('<li>a</li><li>d</li>', view.el.html());

		items.addAll([e = new ItemView("e"), f = new ItemView("f")]);
		this.assertStrictEqual('<li>a</li><li>d</li><li>e</li><li>f</li>', view.el.html());

		items.remove(a);
		this.assertStrictEqual('<li>d</li><li>e</li><li>f</li>', view.el.html());

		items.clear();
		this.assertStrictEqual('', view.el.html());

		items.addAll([a, b]);
		this.assertStrictEqual('<li>a</li><li>b</li>', view.el.html());

		view.destroy();
	}
});
