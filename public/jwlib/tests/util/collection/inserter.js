/*
	jWidget Lib tests.
	
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

JW.Tests.Util.Collection.InserterTestCase = JW.Unit.TestCase.extend({
	testInserter: function() {
		var collection = new JW.Collection([ JW("d") ]);
		
		this.setExpectedOutput(
			"Added d at 0"
		);
		var inserter = new JW.Collection.Inserter({
			source     : collection,
			addItem    : function(item, index) { this.output("Added " + item.base + " at " + index); },
			removeItem : function(index, item) { this.output("Removed " + item.base + " at " + index); },
			clearItems : function(items) { this.output("Cleared " + JW.mapBy(items, "base").join(", ")); },
			scope      : this
		});
		
		this.setExpectedOutput(
			"Added f at 1"
		);
		collection.addAll([ JW("f") ]);
		
		this.setExpectedOutput(
			"Added c at 1"
		);
		collection.add(JW("c"), 1);
		
		this.setExpectedOutput(
			"Added b at 0",
			"Added m at 1"
		);
		collection.addAll([ JW("b"), JW("m") ], 0);
		
		this.setExpectedOutput();
		collection.addAll([], 1);
		
		var a = JW("a");
		
		this.setExpectedOutput(
			"Added a at 5"
		);
		collection.add(a, 5);
		
		this.setExpectedOutput(
			"Removed m at 1"
		);
		collection.remove(1);
		
		this.setExpectedOutput(
			"Removed b at 0"
		);
		collection.remove(0);
		
		this.setExpectedOutput(
			"Added k at 4"
		);
		collection.add(JW("k"));
		
		this.setExpectedOutput(
			"Removed f at 2",
			"Added g at 2"
		);
		collection.set(JW("g"), 2);
		
		this.setExpectedOutput();
		collection.set(a, 3);
		
		this.setExpectedOutput(
			"Removed g at 2",
			"Added g at 1"
		);
		collection.move(2, 1);
		
		this.setExpectedOutput(
			"Removed d at 0",
			"Added d at 4"
		);
		collection.move(0, 4);
		
		this.setExpectedOutput();
		collection.move(1, 1);
		
		this.setExpectedOutput(
			"Cleared g, c, a, k, d",
			"Added a at 0",
			"Added c at 1",
			"Added d at 2",
			"Added g at 3",
			"Added k at 4"
		);
		JW.Array.sortBy(collection.base, "base");
		collection.triggerReorder();
		
		// If length has decreased more than 3 times, clear+add is used, remove specific items instead
		this.setExpectedOutput(
			"Removed c at 1"
		);
		collection.base.splice(1, 1);
		collection.triggerFilter();
		
		this.setExpectedOutput(
			"Cleared a, d, g, k",
			"Added k at 0"
		);
		collection.base.splice(0, 3);
		collection.triggerFilter();
		
		this.setExpectedOutput(
			"Cleared k",
			"Added u at 0",
			"Added t at 1",
			"Added c at 2"
		);
		collection.base = [ JW("u"), JW("t"), JW("c") ];
		collection.triggerReset();
		
		this.setExpectedOutput(
			"Cleared u, t, c"
		);
		collection.clear();
		
		this.setExpectedOutput(
			"Added h at 0"
		);
		collection.add(JW("h"));
		
		this.setExpectedOutput(
			"Cleared h"
		);
		inserter.destroy();
		collection.destroy();
	},
	
	testAutoClear: function() {
		var collection = new JW.Collection([ JW("a"), JW("b"), JW("c"), JW("d"), JW("e") ]);
		
		this.setExpectedOutput(
			"Added a at 0",
			"Added b at 1",
			"Added c at 2",
			"Added d at 3",
			"Added e at 4"
		);
		var inserter = new JW.Collection.Inserter({
			source     : collection,
			addItem    : function(item, index) { this.output("Added " + item.base + " at " + index); },
			removeItem : function(index, item) { this.output("Removed " + item.base + " at " + index); },
			scope      : this
		});
		
		this.setExpectedOutput(
			"Removed e at 4",
			"Removed d at 3",
			"Removed c at 2",
			"Removed b at 1",
			"Removed a at 0"
		);
		inserter.destroy();
		collection.destroy();
	}
});
