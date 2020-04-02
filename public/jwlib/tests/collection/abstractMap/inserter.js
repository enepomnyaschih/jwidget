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

JW.Tests.Collection.AbstractMap.InserterTestCase = JW.Unit.TestCase.extend({
	testInserter: function() {
		var source = new JW.Map({ "a": "A", "b": "B", "c": "C" });
		
		this.setExpectedOutput(
			"Added A at a",
			"Added B at b",
			"Added C at c"
		);
		var syncher = source.createInserter({
			addItem    : function(item, key) { this.output("Added " + item + " at " + key); },
			removeItem : function(key, item) { this.output("Removed " + item + " at " + key); },
			clearItems : function(items) { this.output("Cleared " + JW.Tests.Collection.formatMap(items)); },
			scope      : this
		});
		
		this.setExpectedOutput(
			"Cleared {a:A,b:B,c:C}"
		);
		syncher.destroy();
	},
	
	testAutoClear: function() {
		var source = new JW.Map({ "a": "A", "b": "B", "c": "C" });
		
		this.setExpectedOutput(
			"Added A at a",
			"Added B at b",
			"Added C at c"
		);
		var syncher = source.createInserter({
			addItem    : function(item, key) { this.output("Added " + item + " at " + key); },
			removeItem : function(key, item) { this.output("Removed " + item + " at " + key); },
			scope      : this
		});
		
		this.setExpectedOutput(
			"Removed A at a",
			"Removed B at b",
			"Removed C at c"
		);
		syncher.destroy();
	}
});
