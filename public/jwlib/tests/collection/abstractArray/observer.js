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

JW.Tests.Collection.AbstractArray.ObserverTestCase = JW.Unit.TestCase.extend({
	testObserver: function() {
		var collection = new JW.Array([ "a", "b", "c", "d", "e" ]);
		
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
			clearItems : function(items) { this.output("Cleared " + items.join(", ")); },
			scope      : this
		});
		
		this.setExpectedOutput(
			"Cleared a, b, c, d, e"
		);
		syncher.destroy();
		
		this.setExpectedOutput();
		collection.destroy();
	},
	
	testAutoClear: function() {
		var collection = new JW.Array([ "a", "b", "c", "d", "e" ]);
		
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
