/*
	JW ordered collection syncher tests.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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

JW.ns("JW.Tests.Util");

JW.Tests.Util.SyncherTestCase = JW.Unit.TestCase.extend({
	setupAll: function()
	{
		var testCase = this;
		
		this.Child = JW.Class.extend({
			data : null, // [readonly] String
			
			init: function(data)
			{
				this._super();
				this.data = data;
				testCase.output("Create child " + this.data);
			},
			
			destroy: function()
			{
				testCase.output("Destroy child " + this.data);
			}
		});
		
		this.Controller = JW.Config.extend({
			model       : null,     // [required] JW.Collection of String
			indexer     : null,     // [optional] String
			
			syncher     : null,     // [readonly] JW.Syncher
			children    : null,     // [readonly] Array of testCase.Child
			
			init: function(config)
			{
				this._super(config);
				
				this.children = [];
				this.syncher = new JW.Syncher({
					collection  : this.model,
					creator     : testCase.Child.create,
					destroyer   : "destroy",
					inserter    : this.addChildAt,
					remover     : this.removeChildAt,
					clearer     : this.clear,
					indexer     : this.indexer,
					scope       : this
				});
			},
			
			destroy: function()
			{
				this.syncher.destroy();
			},
			
			addChildAt: function(child, index)
			{
				this.children.splice(index, 0, child);
				testCase.output("Add child " + child.data + " at " + index);
			},
			
			removeChildAt: function(index)
			{
				var child = this.children[index];
				this.children.splice(index, 1);
				testCase.output("Remove child " + child.data + " at " + index);
			},
			
			clear: function()
			{
				this.children.splice(0, this.children.length);
				testCase.output("Clear");
			}
		});
	},
	
	testSyncher: function()
	{
		var model = new JW.Collection([ "p", "m" ]);
		
		this.setExpectedOutput(
			"Create child p",
			"Add child p at 0",
			"Create child m",
			"Add child m at 1"
		);
		var controller = new this.Controller({
			model   : model,
			indexer : ""
		});
		
		this.setExpectedOutput(
			"Create child d",
			"Add child d at 2"
		);
		model.addItem("d");
		
		this.setExpectedOutput(
			"Create child f",
			"Add child f at 3"
		);
		model.addItem("f");
		
		this.setExpectedOutput(
			"Create child c",
			"Add child c at 1"
		);
		model.addItemAt("c", 1);
		
		this.setExpectedOutput(
			"Create child b",
			"Add child b at 0"
		);
		model.addItemAt("b", 0);
		
		this.setExpectedOutput(
			"Create child a",
			"Add child a at 6"
		);
		model.addItemAt("a", 6);
		
		this.setExpectedOutput(
			"Remove child f at 5",
			"Destroy child f"
		);
		model.removeItem("f");
		
		this.setExpectedOutput(
			"Remove child p at 1",
			"Destroy child p"
		);
		model.removeItemAt(1);
		
		this.setExpectedOutput(
			"Remove child b at 0",
			"Destroy child b"
		);
		model.removeItemAt(0);
		
		this.setExpectedOutput(
			"Create child k",
			"Add child k at 4"
		);
		model.addItem("k");
		
		this.setExpectedOutput(
			"Remove child m at 1",
			"Destroy child m",
			"Create child g",
			"Add child g at 1"
		);
		model.setItem(1, "g");
		
		this.setExpectedOutput(
			"Remove child a at 3",
			"Add child a at 1"
		);
		model.moveItem(3, 1);
		
		this.setExpectedOutput(
			"Remove child c at 0",
			"Add child c at 2"
		);
		model.moveItem(0, 2);
		
		this.setExpectedOutput(
			"Clear",
			"Add child a at 0",
			"Add child c at 1",
			"Add child d at 2",
			"Add child g at 3",
			"Add child k at 4"
		);
		model.base.sort();
		model.triggerReorder();
		
		this.setExpectedOutput(
			"Clear",
			"Destroy child a",
			"Add child c at 0",
			"Add child d at 1",
			"Destroy child g",
			"Add child k at 2"
		);
		JW.Array.removeItem(model.base, "a");
		JW.Array.removeItem(model.base, "g");
		model.triggerFilter();
		
		this.setExpectedOutput(
			"Clear",
			"Destroy child c",
			"Destroy child d",
			"Destroy child k",
			"Create child p",
			"Add child p at 0",
			"Create child a",
			"Add child a at 1",
			"Create child q",
			"Add child q at 2",
			"Create child e",
			"Add child e at 3",
			"Create child c",
			"Add child c at 4"
		);
		model.base = [ "p", "a", "q", "e", "c" ];
		model.triggerReset();
		
		this.setExpectedOutput(
			"Clear",
			"Destroy child p",
			"Destroy child a",
			"Destroy child q",
			"Destroy child e",
			"Destroy child c"
		);
		model.clear();
		
		this.setExpectedOutput(
			"Create child h",
			"Add child h at 0"
		);
		model.addItem("h");
		
		this.setExpectedOutput(
			"Clear",
			"Destroy child h"
		);
		controller.destroy();
	},
	
	testNoIndexerReorder: function()
	{
		this.setExpectedOutput(
			"Create child b",
			"Add child b at 0",
			"Create child a",
			"Add child a at 1",
			"Create child e",
			"Add child e at 2",
			"Create child d",
			"Add child d at 3",
			"Create child c",
			"Add child c at 4",
			"Create child a",
			"Add child a at 5"
		);
		
		var model = new JW.Collection([ "b", "a", "e", "d", "c", "a" ]);
		
		var controller = new this.Controller({
			model : model
		});
		
		this.setExpectedOutput(
			"Clear",
			"Add child a at 0",
			"Add child a at 1",
			"Add child b at 2",
			"Add child c at 3",
			"Add child d at 4",
			"Add child e at 5"
		);
		model.base.sort();
		model.triggerReorder();
		
		this.assertNotEqual(controller.children[0], controller.children[1]);
	},
	
	testArraySyncher: function()
	{
		var source = new JW.Collection([
			{ id : "a" },
			{ id : "b" },
			{ id : "a" },
			{ id : "c" }
		]);
		
		var target = JW([]);
		
		var syncher = new JW.Syncher({
			collection : source,
			inserter   : target.insertItemAt,
			remover    : target.removeItemAt,
			clearer    : target.clearItems,
			scope      : target
		});
		this.assertTrue(JW.Array.equal(source.base, target.base));
		
		source.addItem({ id : "d" });
		this.assertTrue(JW.Array.equal(source.base, target.base));
		
		source.addItemAt({ id : "e" }, 1);
		this.assertTrue(JW.Array.equal(source.base, target.base));
		
		source.removeItemAt(1);
		this.assertTrue(JW.Array.equal(source.base, target.base));
		
		source.setItem(1, { id : "f" });
		this.assertTrue(JW.Array.equal(source.base, target.base));
		
		source.moveItem(3, 1);
		this.assertTrue(JW.equal([ { id : "a" }, { id : "c" }, { id : "f" }, { id : "a" }, { id : "d" } ], target.base, true, true));
		this.assertTrue(JW.Array.equal(source.base, target.base));
		
		JW.Array.sortBy(source.base, "id");
		source.triggerReorder();
		this.assertTrue(JW.equal([ { id : "a" }, { id : "a" }, { id : "c" }, { id : "d" }, { id : "f" } ], target.base, true, true));
		this.assertTrue(JW.Array.equal(source.base, target.base));
		
		JW.Array.removeItemAt(source.base, 2);
		source.triggerFilter();
		this.assertTrue(JW.equal([ { id : "a" }, { id : "a" }, { id : "d" }, { id : "f" } ], target.base, true, true));
		this.assertTrue(JW.Array.equal(source.base, target.base));
		
		source.base = [ { id : "p" }, { id : "a" }, { id : "p" }, { id : "q" } ];
		source.triggerReset();
		this.assertTrue(JW.Array.equal(source.base, target.base));
		
		source.clear();
		this.assertEqual(0, target.base.length);
		
		source.addItem({ id : "h" });
		this.assertTrue(JW.Array.equal(source.base, target.base));
		
		syncher.destroy();
		this.assertEqual(0, target.base.length);
	}
});
