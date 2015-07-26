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

JW.Tests.Property.MapperTestCase = JW.Unit.TestCase.extend({
	testMapper: function()
	{
		var source1 = new JW.Property(1);
		var source2 = new JW.Property("a");
		var target = new JW.Property();
		
		this.setExpectedOutput("Create 1a");
		var mapper = new JW.Mapper([ source1, source2 ], {
			target: target,
			createValue: function(a, b) {
				var result = "" + a + b;
				this.output("Create " + result);
				return result;
			},
			destroyValue: function(result) {
				this.output("Destroy " + result);
			},
			scope: this
		});
		this.assertStrictEqual("1a", target.get());
		
		this.setExpectedOutput("Create 2a", "Destroy 1a");
		source1.set(2);
		this.assertStrictEqual("2a", target.get());
		
		this.setExpectedOutput("Destroy 2a");
		source2.set(null)
		this.assertStrictEqual(null, target.get());
		
		this.setExpectedOutput("Create 2b");
		source2.set("b");
		this.assertStrictEqual("2b", target.get());
		
		this.setExpectedOutput("Destroy 2b");
		mapper.destroy();
		this.assertStrictEqual(null, target.get());
		
		source1.set(3);
		source2.set("c");
		this.assertStrictEqual(null, target.get());
	},
	
	testWatchAndScope: function()
	{
		var source1 = new JW.Property(1);
		var source2 = new JW.Property("a");
		var value = 1;
		var event = new JW.Event();
		var property = new JW.Property();
		var target = new JW.Property();
		
		var mapper = new JW.Mapper([ source1, source2 ], {
			target: target,
			createValue: function(a, b) {
				this.assertStrictEqual(2, arguments.length);
				return a + b + value;
			},
			scope: this
		});
		mapper.bind(event);
		mapper.watch(property);
		this.assertStrictEqual("1a1", target.get());
		
		source1.set(2);
		this.assertStrictEqual("2a1", target.get());
		
		source2.set("b");
		this.assertStrictEqual("2b1", target.get());
		
		value = 2;
		this.assertStrictEqual("2b1", target.get());
		
		event.trigger(new JW.EventParams(this));
		this.assertStrictEqual("2b2", target.get());
		
		value = 3;
		property.set(false);
		this.assertStrictEqual("2b3", target.get());
		
		this.setExpectedOutput();
		mapper.destroy();
		this.assertStrictEqual(null, target.get());
		
		source1.set(3);
		source2.set("c");
		event.trigger(new JW.EventParams(this));
		property.set(true);
		this.assertStrictEqual(null, target.get());
	},
	
	testAutoTarget: function()
	{
		var source1 = new JW.Property(1);
		var source2 = new JW.Property("a");
		
		var mapper = new JW.Mapper([ source1, source2 ], {
			createValue: function(a, b) {
				return a + b;
			},
			scope: this
		});
		var target = mapper.target;
		this.assertStrictEqual("1a", target.get());
		
		source1.set(2);
		this.assertStrictEqual("2a", target.get());
		
		source2.set("b");
		this.assertStrictEqual("2b", target.get());
		
		mapper.destroy();
		source1.set(3);
		source2.set("c");
	},
	
	testDestroyValue: function()
	{
		var source = new JW.Property("a");
		
		this.setExpectedOutput(
			"Create by a"
		);
		var mapper = new JW.Mapper([ source ], {
			createValue: function(source) {
				this.output("Create by " + source);
				return source.toUpperCase();
			},
			destroyValue: function(target, source) {
				this.output("Destroy " + target + " by " + source);
			},
			scope: this
		});
		
		var target = mapper.target;
		this.assertStrictEqual("A", target.get());
		
		this.setExpectedOutput(
			"Create by b",
			"Destroy A by a"
		);
		source.set("b");
		this.assertStrictEqual("B", target.get());;
		
		this.setExpectedOutput(
			"Destroy B by b"
		);
		mapper.destroy();
		
		this.setExpectedOutput();
		source.set("c");
	},
	
	testChaining: function()
	{
		var Document = function(name) {
			Document._super.call(this);
			this.name = name;
		};
		
		JW.extend(Document, JW.Class);
		
		var Folder = function(name, document) {
			Folder._super.call(this);
			this.name = name;
			this.selectedDocument = this.own(new JW.Property(document));
		};
		
		JW.extend(Folder, JW.Class);
		
		var document1 = new Document("d1");
		var document2 = new Document("d2");
		var folder1 = new Folder("f1", document1);
		var folder2 = new Folder("f2", document2);
		
		var selectedFolder = new JW.Property(folder1);
		var fullName = new JW.Property();
		
		this.setExpectedOutput(null);
		var updater = new JW.Updater([fullName], this.output, this);
		
		this.setExpectedOutput("f1/d1");
		var mapper = new JW.Mapper([selectedFolder], {
			createValue: function(folder) {
				return new JW.Functor([folder.selectedDocument], function(document) {
					return folder.name + "/" + document.name;
				}, this, { target: fullName });
			},
			destroyValue: JW.destroy,
			scope: this
		});
		
		this.setExpectedOutput("f1/d2");
		folder1.selectedDocument.set(document2);
		
		this.setExpectedOutput("f2/d2");
		selectedFolder.set(folder2);
		
		this.setExpectedOutput();
		mapper.destroy();
		updater.destroy();
	},
	
	testChaining2: function()
	{
		var Document = function(name) {
			Document._super.call(this);
			this.name = name;
		};
		
		JW.extend(Document, JW.Class);
		
		var Folder = function(name, document) {
			Folder._super.call(this);
			this.name = name;
			this.selectedDocument = this.own(new JW.Property(document));
		};
		
		JW.extend(Folder, JW.Class);
		
		var document1 = new Document("d1");
		var document2 = new Document("d2");
		var folder1 = new Folder("f1", document1);
		var folder2 = new Folder("f2", document2);
		
		var selectedFolder = new JW.Property(folder1);
		var fullName = new JW.Property();
		
		this.setExpectedOutput(null);
		var updater = new JW.Updater([fullName], this.output, this);
		
		this.setExpectedOutput("f1/d1");
		var mapper = new JW.Mapper([selectedFolder], {
			createValue: function(folder) {
				return new JW.Mapper([folder.selectedDocument], {
					target: fullName,
					createValue: function(document) {
						return folder.name + "/" + document.name;
					},
					scope: this
				});
			},
			destroyValue: JW.destroy,
			scope: this
		});
		
		this.setExpectedOutput("f1/d2");
		folder1.selectedDocument.set(document2);
		
		this.setExpectedOutput("f2/d2");
		selectedFolder.set(folder2);
		
		this.setExpectedOutput(null);
		mapper.destroy();
		updater.destroy();
	},
	
	testAcceptNull: function()
	{
		var source1 = new JW.Property(1);
		var source2 = new JW.Property("a");
		var target = new JW.Property();
		
		this.setExpectedOutput("Create 1a");
		var mapper = new JW.Mapper([ source1, source2 ], {
			target: target,
			acceptNull: true,
			createValue: function(a, b) {
				var result = "" + a + b;
				this.output("Create " + result);
				return result;
			},
			destroyValue: function(result) {
				this.output("Destroy " + result);
			},
			scope: this
		});
		this.assertStrictEqual("1a", target.get());
		
		this.setExpectedOutput("Create 2a", "Destroy 1a");
		source1.set(2);
		this.assertStrictEqual("2a", target.get());
		
		this.setExpectedOutput("Create 2null", "Destroy 2a");
		source2.set(null)
		this.assertStrictEqual("2null", target.get());
		
		this.setExpectedOutput("Create 2b", "Destroy 2null");
		source2.set("b");
		this.assertStrictEqual("2b", target.get());
		
		this.setExpectedOutput("Destroy 2b");
		mapper.destroy();
		this.assertStrictEqual(null, target.get());
		
		source1.set(3);
		source2.set("c");
		this.assertStrictEqual(null, target.get());
	},
	
	testNull: function()
	{
		var source = new JW.Property();
		var target = new JW.Property();
		var mapper = new JW.Mapper([ source ], {
			target: target,
			createValue: function() {
				this.fail();
			},
			destroyValue: function() {
				this.fail();
			},
			scope: this
		});
		mapper.destroy();
	},
	
	testBlank: function()
	{
		var target = new JW.Property();
		
		this.setExpectedOutput("Create");
		var mapper = new JW.Mapper([], {
			target: target,
			createValue: function() {
				this.output("Create");
				return "a";
			},
			destroyValue: function(x) {
				this.assertStrictEqual("a", x);
				this.output("Destroy");
			},
			scope: this
		});
		this.assertStrictEqual("a", target.get());
		
		this.setExpectedOutput("Destroy");
		mapper.destroy();
		this.assertStrictEqual(null, target.get());
	}
});
