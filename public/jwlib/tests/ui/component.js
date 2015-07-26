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

JW.Tests.UI.ComponentTestCase = JW.Unit.TestCase.extend({
	testReplaceable: function()
	{
		var testCase = this;
		
		var Document = function(name) {
			Document._super.call(this);
			this.name = name;
		};
		
		JW.extend(Document, JW.Class, {
			// String name
		});
		
		var DocumentView = function(document) {
			DocumentView._super.call(this);
			this.document = document;
		};
		
		JW.extend(DocumentView, JW.UI.Component, {
			// Document document;
			
			afterRender: function() {
				this._super();
				testCase.output("Create " + this.document.name);
				this.el.text(this.document.name);
			},
			
			unrender: function() {
				testCase.output("Destroy " + this.document.name);
				this._super();
			}
		});
		
		var MyComponent = function(document) {
			MyComponent._super.call(this);
			this.document = document;
		};
		
		JW.extend(MyComponent, JW.UI.Component, {
			// JW.Property<Document> document;
			
			renderDocument: function() {
				return this.own(new JW.Mapper([this.document], {
					createValue: function(document) {
						return new DocumentView(document);
					},
					destroyValue: JW.destroy,
					scope: this
				})).target;
			}
		});
		
		JW.UI.template(MyComponent, {
			main:
				'<div jwclass="my-component">' +
					'<div jwid="document"></div>' +
				'</div>'
		});
		
		var document = new JW.Property(new Document("apple"));
		var component = new MyComponent(document);
		
		this.setExpectedOutput("Create apple");
		component.render();
		this.assertStrictEqual('<div class="my-component-document">apple</div>', component.el.html());
		this.assertTrue(component.children.containsKey("document"));
		
		this.setExpectedOutput("Create banana", "Destroy apple");
		document.set(new Document("banana"));
		this.assertStrictEqual('<div class="my-component-document">banana</div>', component.el.html());
		
		this.setExpectedOutput("Destroy banana");
		document.set(null);
		this.assertStrictEqual('<div class="my-component-document"></div>', component.el.html());
		this.assertFalse(component.children.containsKey("document"));
		
		this.setExpectedOutput("Create cytrus");
		document.set(new Document("cytrus"));
		this.assertStrictEqual('<div class="my-component-document">cytrus</div>', component.el.html());
		
		this.setExpectedOutput("Destroy cytrus");
		component.destroy();
	},
	
	testRenderRoot: function()
	{
		var Component = function(text) {
			Component._super.call(this);
			this.text = text;
		};
		
		JW.extend(Component, JW.UI.Component, {
			renderRoot: function(el) {
				el.text(this.text);
			}
		});
		
		var component = new Component("apple");
		component.render();
		this.assertStrictEqual("apple", component.el.text());
		component.destroy();
		
		// JW.AbstractArray
		var Container = function(values) {
			Container._super.call(this);
			this.values = values;
		};
		
		JW.extend(Container, JW.UI.Component, {
			renderRoot: function() {
				return this.own(JW.Array.$map(this.values, function(text) {
					return new Component(text);
				}, this)).ownItems();
			}
		});
		
		var container = new Container(["apple", "banana"]);
		container.render();
		this.assertStrictEqual('<div>apple</div><div>banana</div>', container.el.html());
		container.destroy();
		
		// JW.UI.Component (denied)
		var DeniedComponent = function() {
			DeniedComponent._super.call(this);
		};
		
		JW.extend(DeniedComponent, JW.UI.Component, {
			renderRoot: function() {
				return this.own(new Component("apple"));
			}
		});
		
		JW.UI.template(DeniedComponent, {
			main: '<div my-attr="banana"><span></span></div>'
		});
		
		var deniedComponent = new DeniedComponent();
		deniedComponent.render();
		this.assertStrictEqual('<span></span>', deniedComponent.el.html());
		this.assertStrictEqual("banana", deniedComponent.el.attr("my-attr"));
		
		// false (denied)
		var DeniedFalse = function() {
			DeniedFalse._super.call(this);
		};
		
		JW.extend(DeniedFalse, JW.UI.Component, {
			renderRoot: function() {
				return false;
			}
		});
		
		JW.UI.template(DeniedFalse, {
			main: '<div my-attr="banana"><span></span></div>'
		});
		
		var deniedFalse = new DeniedFalse();
		deniedFalse.render();
		this.assertStrictEqual('<span></span>', deniedFalse.el.html());
		this.assertStrictEqual("banana", deniedFalse.el.attr("my-attr"));
	},
	
	testWrapMap: function() {
		var tags = [
			"option",
			"optgroup",
			"thead",
			"tbody",
			"tfoot",
			"colgroup",
			"caption",
			"col",
			"tr",
			"td",
			"th",
			"li"
		];
		
		JW.Array.each(tags, this._testWrapMapTag, this);
	},
	
	_testWrapMapTag: function(tag) {
		try {
			var Component = function() {
				Component._super.call(this);
			};
			
			JW.extend(Component, JW.UI.Component);
			
			JW.UI.template(Component, {
				main: '<' + tag + '></' + tag + '>'
			});
			
			var component = new Component();
			component.render();
			this.assertStrictEqual(tag, component.el[0].tagName.toLowerCase());
			component.destroy();
		} catch (e) {
			throw new Error("Tag " + tag + " is not wrapped correctly: " + e);
		}
	},
	
	testUsingElement: function() {
		var testCase = this;
		var root = JW.UI.parseHtml(
			'<div jwclass="my-component">' +
				'<div jwid="first">' +
					'<div jwid="second"></div>' +
				'</div>' +
			'</div>');
		document.body.appendChild(root);
		var wasAfterAppend = false;
		var Component = function() {
			Component._super.call(this);
		};
		JW.extend(Component, JW.UI.Component, {
			renderRoot: function(el) {
				testCase.assertStrictEqual("my-component", JW.String.trim(el.attr("class")));
			},
			renderFirst: function(el) {
				testCase.assertStrictEqual("my-component-first", JW.String.trim(el.attr("class")));
			},
			renderSecond: function(el) {
				testCase.assertStrictEqual("my-component-second", JW.String.trim(el.attr("class")));
			},
			afterAppend: function() {
				this._super();
				wasAfterAppend = true;
			}
		});
		var component = new Component().using(root).render();
		this.assertStrictEqual(root, component.el[0]);
		this.assertTrue(wasAfterAppend);
		component.destroy();
		this.assertStrictEqual(0, jQuery("#my-component").length);
	}
});
