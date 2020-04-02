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

JW.Tests.Collection.AbstractSet.IndexerTestCase = JW.Unit.TestCase.extend({
	testShorthand: function() {
		var a = new JW.Proxy("a");
		var b = new JW.Proxy("b");
		var c = new JW.Proxy("c");
		var source = new JW.Set([ a, b, c ]);
		var target = source.$$index(this.indexFunc, this);

		this.assertTarget({ "a": a, "b": b, "c": c }, target);

		target.destroy();
		source.destroy();
	},

	testUnobservableTarget: function() {
		var a = new JW.Proxy("a");
		var b = new JW.Proxy("b");
		var c = new JW.Proxy("c");
		var source = new JW.Set([ a, b, c ]);
		var target = new JW.Map();
		
		var indexer = this.createIndexer(source, target);
		this.assertTarget({ "a": a, "b": b, "c": c }, target);
		
		indexer.destroy();
		this.assertTarget({}, target);
		
		target.destroy();
		source.destroy();
	},
	
	testObservableTarget: function() {
		var a = new JW.Proxy("a");
		var b = new JW.Proxy("b");
		var c = new JW.Proxy("c");
		var source = new JW.Set([ a, b, c ]);
		var target = this.createTarget();
		
		this.setExpectedOutput(
			"Changed size from 0 to 3",
			"Spliced -{} +{a:a,b:b,c:c}",
			"Changed"
		);
		var indexer = this.createIndexer(source, target);
		this.assertTarget({ "a": a, "b": b, "c": c }, target);
		
		this.setExpectedOutput(
			"Changed size from 3 to 0",
			"Spliced -{a:a,b:b,c:c} +{}",
			"Changed"
		);
		indexer.destroy();
		this.assertTarget({}, target);
		
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
		
		var source1 = new JW.Set([ a, b ]);
		var source2 = new JW.Set([ c, d ]);
		var target = this.createTarget();
		
		this.setExpectedOutput(
			"Changed size from 0 to 1",
			"Spliced -{} +{x:x}",
			"Changed"
		);
		target.set(x, "x");
		this.assertTarget({ "x": x }, target);
		
		this.setExpectedOutput(
			"Changed size from 1 to 3",
			"Spliced -{} +{a:a,b:b}",
			"Changed"
		);
		var indexer1 = this.createIndexer(source1, target);
		this.assertTarget({ "a": a, "b": b, "x": x }, target);
		
		this.setExpectedOutput(
			"Changed size from 3 to 5",
			"Spliced -{} +{c:c,d:d}",
			"Changed"
		);
		var indexer2 = this.createIndexer(source2, target);
		this.assertTarget({ "a": a, "b": b, "c": c, "d": d, "x": x }, target);
		
		this.setExpectedOutput(
			"Changed size from 5 to 3",
			"Spliced -{a:a,b:b} +{}",
			"Changed"
		);
		indexer1.destroy();
		this.assertTarget({ "c": c, "d": d, "x": x }, target);
		
		this.setExpectedOutput(
			"Changed size from 3 to 1",
			"Spliced -{c:c,d:d} +{}",
			"Changed"
		);
		indexer2.destroy();
		this.assertTarget({ "x": x }, target);
		
		this.setExpectedOutput();
		target.destroy();
		
		this.setExpectedOutput();
		source1.destroy();
		source2.destroy();
	},
	
	// tests that empty source doesn't caused target to trigger "change" on synchronizer initialization
	testEmptyChange: function() {
		var source = new JW.Set();
		var target = this.createTarget();
		var indexer = this.createIndexer(source, target);
		indexer.destroy();
		target.destroy();
		source.destroy();
	},
	
	testAutoTarget: function() {
		var d = new JW.Proxy("d");
		var source = new JW.Set([ d ]);
		var indexer = this.createIndexer(source);
		this.assertTrue(indexer.target instanceof JW.Map);
		this.assertTarget({ "d": d }, indexer.target);
		indexer.destroy();
		source.destroy();
	},
	
	createTarget: function() {
		var target = new JW.ObservableMap();
		JW.Tests.Collection.subscribeToMap(this, target, function(x) { return x.value; });
		return target;
	},
	
	createIndexer: function(source, target) {
		return source.createIndexer({
			target : target,
			getKey : this.indexFunc,
			scope  : this
		});
	},

	indexFunc: function(item) {
		this.assertTrue(this instanceof JW.Unit.TestCase);
		return item.value;
	},
	
	assertTarget: function(expected, target) {
		this.assertTrue(JW.Map.equal(expected, target.getJson()));
	}
});
