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
