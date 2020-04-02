/*
MIT License

Copyright (c) 2020 Egor Nepomnyaschih

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

JW.Tests.Collection.ObservableArray.InserterTestCase = JW.Unit.TestCase.extend({
	testInserter: function() {
		var collection = new JW.ObservableArray([ "d" ]);
		
		this.setExpectedOutput(
			"Added d at 0"
		);
		var inserter = collection.createInserter({
			addItem    : function(item, index) { this.output("Added " + item + " at " + index); },
			removeItem : function(item, index) { this.output("Removed " + item + " at " + index); },
			clearItems : function(items) { this.output("Cleared " + items.join(", ")); },
			scope      : this
		});
		
		this.setExpectedOutput(
			"Added f at 1"
		);
		collection.addAll([ "f" ]);
		
		this.setExpectedOutput(
			"Added c at 1"
		);
		collection.add("c", 1);
		
		this.setExpectedOutput(
			"Added b at 0",
			"Added m at 1"
		);
		collection.addAll([ "b", "m" ], 0);
		
		this.setExpectedOutput();
		collection.addAll([], 1);
		
		this.setExpectedOutput(
			"Added a at 5"
		);
		collection.add("a", 5);
		
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
		collection.add("k");
		
		this.setExpectedOutput(
			"Removed f at 2",
			"Added g at 2"
		);
		collection.set("g", 2);
		
		this.setExpectedOutput();
		collection.set("a", 3);
		
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
		var items = collection.getItems().concat();
		items.sort();
		collection.performReorder(items);
		
		// If length has decreased more than 3 times, clear+add is used, remove specific items instead
		this.setExpectedOutput(
			"Removed c at 1"
		);
		collection.performSplice([ "a", "d", "g", "k" ]);
		
		this.setExpectedOutput(
			"Cleared a, d, g, k",
			"Added k at 0"
		);
		collection.performSplice([ "k" ]);
		
		this.setExpectedOutput(
			"Cleared k",
			"Added u at 0",
			"Added t at 1",
			"Added c at 2"
		);
		collection.performSplice([ "u", "t", "c" ]);
		
		this.setExpectedOutput(
			"Cleared u, t, c"
		);
		collection.clear();
		
		this.setExpectedOutput(
			"Added h at 0"
		);
		collection.add("h");
		
		this.setExpectedOutput(
			"Cleared h"
		);
		inserter.destroy();
		
		this.setExpectedOutput();
		collection.destroy();
	},
	
	testAutoClear: function() {
		var collection = new JW.ObservableArray([ "a", "b", "c", "d", "e" ]);
		
		this.setExpectedOutput(
			"Added a at 0",
			"Added b at 1",
			"Added c at 2",
			"Added d at 3",
			"Added e at 4"
		);
		var inserter = collection.createInserter({
			addItem    : function(item, index) { this.output("Added " + item + " at " + index); },
			removeItem : function(item, index) { this.output("Removed " + item + " at " + index); },
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
		
		this.setExpectedOutput();
		collection.destroy();
	}
});
