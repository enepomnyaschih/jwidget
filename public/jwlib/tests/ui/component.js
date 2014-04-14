/*
	jWidget Lib tests.
	
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
			
			renderComponent: function() {
				this._super();
				testCase.output("Create " + this.document.name);
				this.el.text(this.document.name);
			},
			
			destroyComponent: function() {
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
					'<div jwid="document" />' +
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
	}
});
