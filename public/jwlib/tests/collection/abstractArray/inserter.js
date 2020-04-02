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

JW.Tests.Collection.AbstractArray.InserterTestCase = JW.Unit.TestCase.extend({
	testInserter: function() {
		var collection = new JW.Array([ "a", "b", "c", "d", "e" ]);
		
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
			clearItems : function(items) { this.output("Cleared " + items.join(", ")); },
			scope      : this
		});
		
		this.setExpectedOutput(
			"Cleared a, b, c, d, e"
		);
		inserter.destroy();
		
		this.setExpectedOutput();
		collection.destroy();
	},
	
	testAutoClear: function() {
		var collection = new JW.Array([ "a", "b", "c", "d", "e" ]);
		
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
