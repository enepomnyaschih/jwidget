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

JW.Tests.Collection.ObservableSet.ObserverTestCase = JW.Unit.TestCase.extend({
	testObserver: function() {
		var d = new JW.Proxy("d");
		var source = new JW.ObservableSet([ d ]);
		
		this.setExpectedOutput(
			"Added d"
		);
		var syncher = source.createObserver({
			addItem    : function(item) { this.output("Added " + item.value); },
			removeItem : function(item) { this.output("Removed " + item.value); },
			clearItems : function(items) {
				items = items.concat();
				JW.Array.sort(items, JW.byField("value"));
				this.output("Cleared " + JW.Array.map(items, JW.byField("value")).join(", "));
			},
			scope      : this
		});
		
		var f = new JW.Proxy("f");
		this.setExpectedOutput(
			"Added f"
		);
		source.addAll([ f ]);
		
		var c = new JW.Proxy("c");
		this.setExpectedOutput(
			"Added c"
		);
		source.add(c);
		
		var b = new JW.Proxy("b");
		var m = new JW.Proxy("m");
		this.setExpectedOutput(
			"Added b",
			"Added m"
		);
		source.addAll([ b, m ]);
		
		this.setExpectedOutput();
		source.addAll([]);
		
		this.setExpectedOutput(
			"Removed m"
		);
		source.remove(m);
		
		this.setExpectedOutput();
		source.remove(m);
		
		this.setExpectedOutput(
			"Removed b",
			"Removed f"
		);
		source.removeAll([ f, b ]);
		
		this.setExpectedOutput(
			"Removed d",
			"Added f",
			"Added b"
		);
		source.splice([ d ], [ f, b ]);
		
		this.setExpectedOutput(
			"Cleared b, c, f"
		);
		source.clear();
		
		var h = new JW.Proxy("h");
		this.setExpectedOutput(
			"Added h"
		);
		source.add(h);
		
		this.setExpectedOutput(
			"Cleared h"
		);
		syncher.destroy();
	},
	
	testAutoClear: function() {
		var a = new JW.Proxy("a");
		var b = new JW.Proxy("b");
		var c = new JW.Proxy("c");
		var source = new JW.ObservableSet([ a, b, c ]);
		
		this.setExpectedOutput(
			"Added a",
			"Added b",
			"Added c"
		);
		var syncher = source.createObserver({
			addItem    : function(item) { this.output("Added " + item.value); },
			removeItem : function(item) { this.output("Removed " + item.value); },
			scope      : this
		});
		
		this.setExpectedOutput(
			"Removed c",
			"Removed b",
			"Removed a"
		);
		syncher.destroy();
	}
});
