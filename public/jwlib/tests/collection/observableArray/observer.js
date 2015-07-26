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

JW.Tests.Collection.ObservableArray.ObserverTestCase = JW.Unit.TestCase.extend({
	testObserver: function() {
		var collection = new JW.ObservableArray([ "d" ]);
		
		this.setExpectedOutput(
			"Added d"
		);
		var syncher = collection.createObserver({
			addItem    : function(item) { this.output("Added " + item); },
			removeItem : function(item) { this.output("Removed " + item); },
			clearItems : function(items) { this.output("Cleared " + items.join(", ")); },
			scope      : this
		});
		
		this.setExpectedOutput(
			"Added f"
		);
		collection.addAll([ "f" ]);
		
		this.setExpectedOutput(
			"Added c"
		);
		collection.add("c", 1);
		
		this.setExpectedOutput(
			"Added b",
			"Added m"
		);
		collection.addAll([ "b", "m" ], 0);
		
		this.setExpectedOutput();
		collection.addAll([], 1);
		
		this.setExpectedOutput(
			"Added a"
		);
		collection.add("a", 5);
		
		this.setExpectedOutput(
			"Removed m"
		);
		collection.remove(1);
		
		this.setExpectedOutput(
			"Removed b"
		);
		collection.remove(0);
		
		this.setExpectedOutput(
			"Added k"
		);
		collection.add("k");
		
		this.setExpectedOutput(
			"Removed f",
			"Added g"
		);
		collection.set("g", 2);
		
		this.setExpectedOutput();
		collection.set("a", 3);
		
		this.setExpectedOutput();
		collection.move(2, 1);
		
		this.setExpectedOutput();
		collection.move(0, 4);
		
		this.setExpectedOutput();
		collection.move(1, 1);
		
		this.setExpectedOutput();
		var items = collection.getItems().concat();
		items.sort();
		collection.performReorder(items);
		
		// If length has decreased more than 3 times, clear+add is used, remove specific items instead
		this.setExpectedOutput(
			"Removed c"
		);
		collection.performSplice([ "a", "d", "g", "k" ]);
		
		this.setExpectedOutput(
			"Cleared a, d, g, k",
			"Added k"
		);
		collection.performSplice([ "k" ]);
		
		this.setExpectedOutput(
			"Cleared k",
			"Added u",
			"Added t",
			"Added c"
		);
		collection.performSplice([ "u", "t", "c" ]);
		
		this.setExpectedOutput(
			"Cleared u, t, c"
		);
		collection.clear();
		
		this.setExpectedOutput(
			"Added h"
		);
		collection.add("h");
		
		this.setExpectedOutput(
			"Cleared h"
		);
		syncher.destroy();
		
		this.setExpectedOutput();
		collection.destroy();
	},
	
	testAutoClear: function() {
		var collection = new JW.ObservableArray([ "a", "b", "c", "d", "e" ]);
		
		this.setExpectedOutput(
			"Added a",
			"Added b",
			"Added c",
			"Added d",
			"Added e"
		);
		var syncher = collection.createObserver({
			addItem    : function(item) { this.output("Added " + item); },
			removeItem : function(item) { this.output("Removed " + item); },
			scope      : this
		});
		
		this.setExpectedOutput(
			"Removed e",
			"Removed d",
			"Removed c",
			"Removed b",
			"Removed a"
		);
		syncher.destroy();
		
		this.setExpectedOutput();
		collection.destroy();
	}
});
