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

JW.Tests.Collection.ObservableMap.InserterTestCase = JW.Unit.TestCase.extend({
	testInserter: function() {
		var source = new JW.ObservableMap({ "d": "D" });
		
		this.setExpectedOutput(
			"Added D at d"
		);
		var syncher = source.createInserter({
			addItem    : function(item, key) { this.output("Added " + item + " at " + key); },
			removeItem : function(key, item) { this.output("Removed " + item + " at " + key); },
			clearItems : function(items) { this.output("Cleared " + JW.Tests.Collection.formatMap(items)); },
			scope      : this
		});
		
		this.setExpectedOutput(
			"Added F at f"
		);
		source.setAll({ "f": "F" });
		
		this.setExpectedOutput(
			"Added C at c"
		);
		source.set("C", "c");
		
		this.setExpectedOutput(
			"Added B at b",
			"Added M at m"
		);
		source.setAll({ "b": "B", "m": "M" });
		
		this.setExpectedOutput();
		source.setAll({});
		
		this.setExpectedOutput(
			"Removed M at m"
		);
		source.remove("m");
		
		this.setExpectedOutput();
		source.remove("m");
		
		this.setExpectedOutput(
			"Removed F at f",
			"Added T at f"
		);
		source.set("T", "f");
		
		this.setExpectedOutput(
			"Removed C at c",
			"Added C at a"
		);
		source.setKey("c", "a");
		
		this.setExpectedOutput(
			"Removed C at a",
			"Removed T at f",
			"Added M at m"
		);
		source.splice([ "a", "f" ], { "m": "M" });
		
		this.setExpectedOutput(
			"Removed D at d",
			"Added D at a",
			"Removed M at m",
			"Added M at d"
		);
		source.performReindex({ "a": "D", "b": "B", "d": "M" });
		
		this.setExpectedOutput(
			"Removed M at d",
			"Added C at c"
		);
		source.performSplice({ "a": "D", "b": "B", "c": "C" });
		
		this.setExpectedOutput(
			"Removed B at b",
			"Removed C at c"
		);
		source.removeAll([ "b", "c" ]);
		
		this.setExpectedOutput(
			"Cleared {a:D}"
		);
		source.clear();
		
		this.setExpectedOutput(
			"Added H at h"
		);
		source.set("H", "h");
		
		this.setExpectedOutput(
			"Cleared {h:H}"
		);
		syncher.destroy();
	},
	
	testAutoClear: function() {
		var source = new JW.ObservableMap({ "a": "A", "b": "B", "c": "C" });
		
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
