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
	},

	// https://github.com/enepomnyaschih/jwidget/issues/127
	testDestructionOrder: function() {
		/* Preset */

		var ChildView = function(text) {
			ChildView._super.call(this);
			this.text = text;
		};

		JW.extend(ChildView, JW.UI.Component, {
			renderRoot: function(el) {
				el.text(this.text);
			}
		});

		JW.UI.template(ChildView, {main: '<div jwclass="child"></div>'});

		var ParentView = function() {
			ParentView._super.call(this);
		};

		JW.extend(ParentView, JW.UI.Component, {
			renderChild: function() {
				return this.own(new ChildView("Child"));
			}
		});

		JW.UI.template(ParentView, {main: '<div jwclass="parent"><div jwid="child"></div></div>'});

		/* Test case */

		var parent = new ParentView();
		parent.render();
		this.assertStrictEqual("Child", parent.el.children().text());
		this.assertTrue(parent.el.children().hasClass("child"));
		this.assertTrue(parent.el.children().hasClass("parent-child"));
		parent.destroy();
	},

	testClearDivInSet: function() {
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

		JW.UI.template(ItemView, {main: '<div></div>'});

		var SetView = function() {
			SetView._super.call(this);
			this.items = this.own(new JW.ObservableSet()).ownItems();
		};

		JW.extend(SetView, JW.UI.Component, {
			renderRoot: function() {
				return this.items;
			}
		});

		JW.UI.template(SetView, {main: '<div><div class="clear"></div></div>'});

		/* Test case */

		var view = new SetView();
		var items = view.items;
		var a, b, c, d, e, f;
		items.add(a = new ItemView("a"));
		items.add(b = new ItemView("b"));
		view.render();
		this.assertStrictEqual('<div>a</div><div>b</div><div class="clear"></div>', view.el.html());

		items.addAll([c = new ItemView("c"), d = new ItemView("d")]);
		this.assertStrictEqual('<div>a</div><div>b</div><div>c</div><div>d</div><div class="clear"></div>', view.el.html());

		items.removeAll([b, c]);
		this.assertStrictEqual('<div>a</div><div>d</div><div class="clear"></div>', view.el.html());

		items.addAll([e = new ItemView("e"), f = new ItemView("f")]);
		this.assertStrictEqual('<div>a</div><div>d</div><div>e</div><div>f</div><div class="clear"></div>', view.el.html());

		items.remove(a);
		this.assertStrictEqual('<div>d</div><div>e</div><div>f</div><div class="clear"></div>', view.el.html());

		items.clear();
		this.assertStrictEqual('<div class="clear"></div>', view.el.html());

		items.addAll([a, b]);
		this.assertStrictEqual('<div>a</div><div>b</div><div class="clear"></div>', view.el.html());

		view.destroy();
	},

	testClearDivInArray: function() {
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

		JW.UI.template(ItemView, {main: '<div></div>'});

		var ArrayView = function() {
			ArrayView._super.call(this);
			this.items = this.own(new JW.ObservableArray()).ownItems();
		};

		JW.extend(ArrayView, JW.UI.Component, {
			renderRoot: function() {
				return this.items;
			}
		});

		JW.UI.template(ArrayView, {main: '<div><div class="clear"></div></div>'});

		/* Test case */

		var view = new ArrayView();
		var items = view.items;
		items.add(new ItemView("a"));
		items.add(new ItemView("b"));
		view.render();
		this.assertStrictEqual('<div>a</div><div>b</div><div class="clear"></div>', view.el.html());

		items.addAll([new ItemView("c"), new ItemView("d")]);
		this.assertStrictEqual('<div>a</div><div>b</div><div>c</div><div>d</div><div class="clear"></div>', view.el.html());

		items.remove(1);
		this.assertStrictEqual('<div>a</div><div>c</div><div>d</div><div class="clear"></div>', view.el.html());

		items.clear();
		this.assertStrictEqual('<div class="clear"></div>', view.el.html());

		items.addAll([new ItemView("a"), new ItemView("b")]);
		this.assertStrictEqual('<div>a</div><div>b</div><div class="clear"></div>', view.el.html());

		view.destroy();
	},

	testRenderingOrder: function() {
		var self = this;

		var View = function() {
			View._super.call(this);
		};

		JW.extend(View, JW.UI.Component, {
			renderDelOne: function() {
				self.output("del-one");
				return false;
			},

			renderSkipOne: function() {
				self.fail("unexpected skip-one rendering");
			},

			renderDelTwo: function(el) {
				self.output("del-two");
				el.remove();
			},

			renderSkipTwo: function() {
				self.fail("unexpected skip-two rendering");
			},

			renderDelThree: function() {
				self.output("del-three");
				return false;
			},

			renderSkipThree: function() {
				self.fail("unexpected skip-three rendering");
			},

			renderDelFour: function() {
				self.output("del-four");
				return false;
			},

			renderPartialFour: function(el) {
				self.output("partial-four");
				self.assertStrictEqual(1, el.length);
			},

			renderDelFive: function() {
				self.output("del-five");
				return false;
			},

			renderPartialFive: function(el) {
				self.output("partial-five");
				self.assertStrictEqual(1, el.length);
			},

			renderDelSix: function() {
				self.output("del-six");
				return false;
			},

			renderSkipSix: function() {
				self.fail("unexpected skip-six rendering");
			},

			renderLoop: function() {
				self.output("loop");
			}
		});

		JW.UI.template(View, {
			main:
				'<div jwclass="my-component">' +
					// case 1 - element is skipped if parent rendering has returned false
					'<div jwid="del-one">' +
						'<div jwid="skip-one"></div>' +
					'</div>' +

					// case 2 - element is skipped if parent rendering has removed the element
					'<div jwid="del-two">' +
						'<div jwid="skip-two"></div>' +
					'</div>' +

					// case 3 - add extra parent element
					'<div jwid="root-three">' +
						'<div jwid="del-three">' +
							'<div jwid="skip-three"></div>' +
						'</div>' +
					'</div>' +

					// case 4 - loop
					'<div jwid="loop">' +
						'<div jwid="loop"></div>' +
					'</div>' +

					// case 5 - multi-element, partially inside, prefix case
					'<div jwid="partial-four"></div>' +
					'<div jwid="del-four">' +
						'<div jwid="partial-four"></div>' +
					'</div>' +

					// case 6 - multi-element, partially inside, postfix case
					'<div jwid="del-five">' +
						'<div jwid="partial-five"></div>' +
					'</div>' +
					'<div jwid="partial-five"></div>' +

					// case 7 - multi-element completely inside
					'<div jwid="del-six">' +
						'<div jwid="skip-six"></div>' +
						'<div jwid="skip-six"></div>' +
					'</div>' +
				'</div>'
		});

		this.setExpectedOutput(
			"del-one",
			"del-two",
			"del-three",
			"del-four",
			"partial-four",
			"del-five",
			"partial-five",
			"del-six",
			"loop"
		);

		new View().render();
	}
});
