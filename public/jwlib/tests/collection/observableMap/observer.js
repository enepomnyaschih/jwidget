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

JW.Tests.Collection.ObservableMap.ObserverTestCase = JW.Unit.TestCase.extend({
	testObserver: function() {
		var source = new JW.ObservableMap({ "d": "D" });
		
		this.setExpectedOutput(
			"Added D"
		);
		var syncher = source.createObserver({
			addItem    : function(item) { this.output("Added " + item); },
			removeItem : function(item) { this.output("Removed " + item); },
			clearItems : function(items) {
				items = items.concat();
				items.sort();
				this.output("Cleared " + items.join(", "));
			},
			scope      : this
		});
		
		this.setExpectedOutput(
			"Added F"
		);
		source.setAll({ "f": "F" });
		
		this.setExpectedOutput(
			"Added C"
		);
		source.set("C", "c");
		
		this.setExpectedOutput(
			"Added B",
			"Added M"
		);
		source.setAll({ "b": "B", "m": "M" });
		
		this.setExpectedOutput();
		source.setAll({});
		
		this.setExpectedOutput(
			"Removed M"
		);
		source.remove("m");
		
		this.setExpectedOutput();
		source.remove("m");
		
		this.setExpectedOutput(
			"Removed F",
			"Added T"
		);
		source.set("T", "f");
		
		this.setExpectedOutput();
		source.setKey("c", "a");
		
		this.setExpectedOutput(
			"Removed T",
			"Removed C",
			"Added M"
		);
		source.splice([ "a", "f" ], { "m": "M" });
		
		this.setExpectedOutput();
		source.performReindex({ "a": "D", "b": "B", "d": "M" });
		
		this.setExpectedOutput(
			"Removed M",
			"Added C"
		);
		source.performSplice({ "a": "D", "b": "B", "c": "C" });
		
		this.setExpectedOutput(
			"Removed C",
			"Removed B"
		);
		source.removeAll([ "b", "c" ]);
		
		this.setExpectedOutput(
			"Cleared D"
		);
		source.clear();
		
		this.setExpectedOutput(
			"Added H"
		);
		source.set("H", "h");
		
		this.setExpectedOutput(
			"Cleared H"
		);
		syncher.destroy();
	},
	
	testAutoClear: function() {
		var source = new JW.ObservableMap({ "a": "A", "b": "B", "c": "C" });
		
		this.setExpectedOutput(
			"Added A",
			"Added B",
			"Added C"
		);
		var syncher = source.createObserver({
			addItem    : function(item) { this.output("Added " + item); },
			removeItem : function(item) { this.output("Removed " + item); },
			scope      : this
		});
		
		this.setExpectedOutput(
			"Removed C",
			"Removed B",
			"Removed A"
		);
		syncher.destroy();
	}
});
