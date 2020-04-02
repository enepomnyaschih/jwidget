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

JW.Tests.Collection.ObservableMap.ListerTestCase = JW.Unit.TestCase.extend({
	testShorthand: function() {
		var testCase = this;
		var d = new JW.Proxy("d");
		var source = new JW.ObservableMap({ "d": d });
		var target = source.$$toSet();
		var subscription = JW.Tests.Collection.subscribeToSet(this, target);

		this.assertTarget([ d ], target);

		var f = new JW.Proxy("f");
		this.setExpectedOutput(
			"Changed size from 1 to 2",
			"Spliced -[] +[f]",
			"Changed"
		);
		source.setAll({ "f": f });
		this.assertTarget([ d, f ], target);

		subscription.destroy();
		target.destroy();
		source.destroy();
	},

	testUnobservableTarget: function() {
		var testCase = this;
		var d = new JW.Proxy("d");
		var source = new JW.ObservableMap({ "d": d });
		var target = new JW.Set();
		
		var lister = this.createLister(source, target);
		this.assertTarget([ d ], target);
		
		var f = new JW.Proxy("f");
		source.setAll({ "f": f });
		this.assertTarget([ d, f ], target);
		
		var c = new JW.Proxy("c");
		source.set(c, "c");
		this.assertTarget([ d, f, c ], target);
		
		var b = new JW.Proxy("b");
		var m = new JW.Proxy("m");
		source.setAll({ "b": b, "m": m });
		this.assertTarget([ d, f, c, b, m ], target);
		
		source.setAll({});
		this.assertTarget([ d, f, c, b, m ], target);
		
		source.remove("m");
		this.assertTarget([ d, f, c, b ], target);
		
		source.remove("m");
		this.assertTarget([ d, f, c, b ], target);
		
		source.setKey("c", "a");
		this.assertTarget([ d, f, c, b ], target);
		
		source.splice([ "a", "f" ], { "m": m });
		this.assertTarget([ d, b, m ], target);
		
		source.performReindex({ "a": d, "b": b, "d": m });
		this.assertTarget([ d, b, m ], target);
		
		source.performSplice({ "a": d, "b": b, "c": c });
		this.assertTarget([ d, b, c ], target);
		
		source.removeAll([ "b", "c" ]);
		this.assertTarget([ d ], target);
		
		source.clear();
		this.assertTarget([], target);
		
		var h = new JW.Proxy("h");
		source.set(h, "h");
		this.assertTarget([ h ], target);
		
		lister.destroy();
		this.assertTarget([], target);
		
		target.destroy();
		source.destroy();
	},
	
	testObservableTarget: function() {
		var testCase = this;
		var d = new JW.Proxy("d");
		var source = new JW.ObservableMap({ "d": d });
		var target = this.createTarget();
		
		this.setExpectedOutput(
			"Changed size from 0 to 1",
			"Spliced -[] +[d]",
			"Changed"
		);
		var lister = this.createLister(source, target);
		this.assertTarget([ d ], target);
		
		var f = new JW.Proxy("f");
		this.setExpectedOutput(
			"Changed size from 1 to 2",
			"Spliced -[] +[f]",
			"Changed"
		);
		source.setAll({ "f": f });
		this.assertTarget([ d, f ], target);
		
		var c = new JW.Proxy("c");
		this.setExpectedOutput(
			"Changed size from 2 to 3",
			"Spliced -[] +[c]",
			"Changed"
		);
		source.set(c, "c");
		this.assertTarget([ d, f, c ], target);
		
		var b = new JW.Proxy("b");
		var m = new JW.Proxy("m");
		this.setExpectedOutput(
			"Changed size from 3 to 5",
			"Spliced -[] +[b,m]",
			"Changed"
		);
		source.setAll({ "b": b, "m": m });
		this.assertTarget([ d, f, c, b, m ], target);
		
		this.setExpectedOutput();
		source.setAll({});
		this.assertTarget([ d, f, c, b, m ], target);
		
		this.setExpectedOutput(
			"Changed size from 5 to 4",
			"Spliced -[m] +[]",
			"Changed"
		);
		source.remove("m");
		this.assertTarget([ d, f, c, b ], target);
		
		this.setExpectedOutput();
		source.remove("m");
		this.assertTarget([ d, f, c, b ], target);
		
		this.setExpectedOutput();
		source.setKey("c", "a");
		this.assertTarget([ d, f, c, b ], target);
		
		this.setExpectedOutput(
			"Changed size from 4 to 3",
			"Spliced -[c,f] +[m]",
			"Changed"
		);
		source.splice([ "a", "f" ], { "m": m });
		this.assertTarget([ d, b, m ], target);
		
		this.setExpectedOutput();
		source.performReindex({ "a": d, "b": b, "d": m });
		this.assertTarget([ d, b, m ], target);
		
		this.setExpectedOutput(
			"Spliced -[m] +[c]",
			"Changed"
		);
		source.performSplice({ "a": d, "b": b, "c": c });
		this.assertTarget([ d, b, c ], target);
		
		this.setExpectedOutput(
			"Changed size from 3 to 1",
			"Spliced -[b,c] +[]",
			"Changed"
		);
		source.removeAll([ "b", "c" ]);
		this.assertTarget([ d ], target);
		
		this.setExpectedOutput(
			"Changed size from 1 to 0",
			"Spliced -[d] +[]",
			"Changed"
		);
		source.clear();
		this.assertTarget([], target);
		
		var h = new JW.Proxy("h");
		this.setExpectedOutput(
			"Changed size from 0 to 1",
			"Spliced -[] +[h]",
			"Changed"
		);
		source.set(h, "h");
		this.assertTarget([ h ], target);
		
		this.setExpectedOutput(
			"Changed size from 1 to 0",
			"Spliced -[h] +[]",
			"Changed"
		);
		lister.destroy();
		this.assertTarget([], target);
		
		this.setExpectedOutput();
		target.destroy();
		source.destroy();
	},
	
	testMultiSource: function() {
		var a = new JW.Proxy("a");
		var b = new JW.Proxy("b");
		var c = new JW.Proxy("c");
		var d = new JW.Proxy("d");
		var x = new JW.Proxy("x");
		
		var source1 = new JW.ObservableMap({ "a": a, "b": b });
		var source2 = new JW.ObservableMap({ "c": c, "d": d });
		var target = this.createTarget();
		
		this.setExpectedOutput(
			"Changed size from 0 to 1",
			"Spliced -[] +[x]",
			"Changed"
		);
		target.add(x);
		this.assertTarget([ x ], target);
		
		this.setExpectedOutput(
			"Changed size from 1 to 3",
			"Spliced -[] +[a,b]",
			"Changed"
		);
		var lister1 = this.createLister(source1, target);
		this.assertTarget([ a, b, x ], target);
		
		this.setExpectedOutput(
			"Changed size from 3 to 5",
			"Spliced -[] +[c,d]",
			"Changed"
		);
		var lister2 = this.createLister(source2, target);
		this.assertTarget([ a, b, c, d, x ], target);
		
		var e = new JW.Proxy("e");
		this.setExpectedOutput(
			"Changed size from 5 to 6",
			"Spliced -[] +[e]",
			"Changed"
		);
		source1.set(e, "e");
		this.assertTarget([ a, b, c, d, e, x ], target);
		
		var f = new JW.Proxy("f");
		this.setExpectedOutput(
			"Spliced -[d] +[f]",
			"Changed"
		);
		source2.set(f, "d");
		this.assertTarget([ a, b, c, e, f, x ], target);
		
		this.setExpectedOutput(
			"Changed size from 6 to 3",
			"Spliced -[a,b,e] +[]",
			"Changed"
		);
		source1.clear();
		this.assertTarget([ c, f, x ], target);
		
		this.setExpectedOutput();
		lister1.destroy();
		this.assertTarget([ c, f, x ], target);
		
		this.setExpectedOutput(
			"Changed size from 3 to 1",
			"Spliced -[c,f] +[]",
			"Changed"
		);
		lister2.destroy();
		this.assertTarget([ x ], target);
		
		this.setExpectedOutput();
		target.destroy();
		
		this.setExpectedOutput();
		source1.destroy();
		source2.destroy();
	},
	
	// tests that empty source doesn't caused target to trigger "change" on synchronizer initialization
	testEmptyChange: function() {
		var source = new JW.ObservableMap();
		var target = this.createTarget();
		var lister = this.createLister(source, target);
		lister.destroy();
		target.destroy();
		source.destroy();
	},
	
	testAutoTarget: function() {
		var d = new JW.Proxy("d");
		var source = new JW.ObservableMap({ "d": d });
		var lister = this.createLister(source);
		this.assertTrue(lister.target instanceof JW.ObservableSet);
		this.assertTarget([ d ], lister.target);
		lister.destroy();
		source.destroy();
	},
	
	createTarget: function() {
		var target = new JW.ObservableSet();
		JW.Tests.Collection.subscribeToSet(this, target);
		return target;
	},
	
	createLister: function(source, target) {
		return source.createLister({
			target : target
		});
	},
	
	assertTarget: function(values, target) {
		this.assertStrictEqual(values.length, target.getLength());
		for (var i = 0; i < values.length; ++i) {
			this.assertTrue(target.contains(values[i]));
		}
	}
});
