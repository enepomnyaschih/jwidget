/*
	jWidget Lib tests.
	
	Copyright (C) 2015 Egor Nepomnyaschih
	
	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU Lesser General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.
	
	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU Lesser General Public License for more details.
	
	You should have received a copy of the GNU Lesser General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

JW.Tests.Collection.ObservableArray.IndexerTestCase = JW.Unit.TestCase.extend({
	testShorthand: function() {
		var d = new JW.Proxy("d");
		var source = new JW.ObservableArray([ d ]);
		var target = source.$$index(this.indexFunc, this);
		var subscription = JW.Tests.Collection.subscribeToMap(this, target, function(x) { return x.value; });

		this.assertTarget({ "d": d }, target);

		// d
		var f = new JW.Proxy("f");
		this.setExpectedOutput(
			"Changed size from 1 to 2",
			"Spliced -{} +{f:f}",
			"Changed"
		);
		source.addAll([ f ]);
		this.assertTarget({ "d": d, "f": f }, target);

		subscription.destroy();
		target.destroy();
		source.destroy();
	},

	testUnobservableTarget: function() {
		var d = new JW.Proxy("d");
		var source = new JW.ObservableArray([ d ]);
		var target = new JW.Map();
		var indexer = this.createIndexer(source, target);
		this.assertTarget({ "d": d }, target);
		
		// d
		var f = new JW.Proxy("f");
		source.addAll([ f ]);
		this.assertTarget({ "d": d, "f": f }, target);
		
		// d f
		var c = new JW.Proxy("c");
		source.add(c, 1);
		this.assertTarget({ "d": d, "f": f, "c": c }, target);
		
		// d c f
		var b = new JW.Proxy("b");
		var m = new JW.Proxy("m");
		source.addAll([ b, m ], 0);
		this.assertTarget({ "d": d, "f": f, "c": c, "b": b, "m": m }, target);
		
		// b m d c f
		this.setExpectedOutput();
		source.addAll([], 1);
		this.assertTarget({ "d": d, "f": f, "c": c, "b": b, "m": m }, target);
		
		var a = new JW.Proxy("a");
		source.add(a, 5);
		this.assertTarget({ "d": d, "f": f, "c": c, "b": b, "m": m, "a": a }, target);
		
		// b m d c f a
		source.remove(1);
		this.assertTarget({ "d": d, "f": f, "c": c, "b": b, "a": a }, target);
		
		// b d c f a
		source.remove(0);
		this.assertTarget({ "d": d, "f": f, "c": c, "a": a }, target);
		
		// d c f a
		var k = new JW.Proxy("k");
		source.add(k);
		this.assertTarget({ "d": d, "f": f, "c": c, "a": a, "k": k }, target);
		
		// d c f a k
		var g = new JW.Proxy("g");
		source.set(g, 2);
		this.assertTarget({ "d": d, "c": c, "a": a, "k": k, "g": g }, target);
		
		// d c g a k
		this.setExpectedOutput();
		source.set(a, 3);
		this.assertTarget({ "d": d, "c": c, "a": a, "k": k, "g": g }, target);
		
		this.setExpectedOutput();
		source.move(2, 1);
		this.assertTarget({ "d": d, "c": c, "a": a, "k": k, "g": g }, target);
		
		// d g c a k
		this.setExpectedOutput();
		source.move(0, 4);
		this.assertTarget({ "d": d, "c": c, "a": a, "k": k, "g": g }, target);
		
		// g c a k d
		this.setExpectedOutput();
		source.move(1, 1);
		this.assertTarget({ "d": d, "c": c, "a": a, "k": k, "g": g }, target);
		
		this.setExpectedOutput();
		var items = source.getItems().concat();
		JW.Array.sort(items, JW.byField("value"));
		source.performReorder(items);
		this.assertTarget({ "d": d, "c": c, "a": a, "k": k, "g": g }, target);
		
		// a c d g k
		source.performSplice([ a, d, g, k ]);
		this.assertTarget({ "d": d, "a": a, "k": k, "g": g }, target);
		
		// a d g k
		source.performSplice([ k ]);
		this.assertTarget({ "k": k }, target);
		
		// k
		var u = new JW.Proxy("u");
		var t = new JW.Proxy("t");
		source.performSplice([ u, t, c ]);
		this.assertTarget({ "u": u, "t": t, "c": c }, target);
		
		// u t c
		source.clear();
		this.assertTarget({}, target);
		
		// (empty)
		var h = new JW.Proxy("h");
		source.add(h);
		this.assertTarget({ "h": h }, target);
		
		// h
		indexer.destroy();
		this.assertTarget({}, target);
		
		target.destroy();
		source.destroy();
	},
	
	testObservableTarget: function() {
		var d = new JW.Proxy("d");
		var source = new JW.ObservableArray([ d ]);
		var target = this.createTarget();
		
		this.setExpectedOutput(
			"Changed size from 0 to 1",
			"Spliced -{} +{d:d}",
			"Changed"
		);
		var indexer = this.createIndexer(source, target);
		this.assertTarget({ "d": d }, target);
		
		// d
		var f = new JW.Proxy("f");
		this.setExpectedOutput(
			"Changed size from 1 to 2",
			"Spliced -{} +{f:f}",
			"Changed"
		);
		source.addAll([ f ]);
		this.assertTarget({ "d": d, "f": f }, target);
		
		// d f
		var c = new JW.Proxy("c");
		this.setExpectedOutput(
			"Changed size from 2 to 3",
			"Spliced -{} +{c:c}",
			"Changed"
		);
		source.add(c, 1);
		this.assertTarget({ "d": d, "f": f, "c": c }, target);
		
		// d c f
		var b = new JW.Proxy("b");
		var m = new JW.Proxy("m");
		this.setExpectedOutput(
			"Changed size from 3 to 5",
			"Spliced -{} +{b:b,m:m}",
			"Changed"
		);
		source.addAll([ b, m ], 0);
		this.assertTarget({ "d": d, "f": f, "c": c, "b": b, "m": m }, target);
		
		// b m d c f
		this.setExpectedOutput();
		source.addAll([], 1);
		this.assertTarget({ "d": d, "f": f, "c": c, "b": b, "m": m }, target);
		
		var a = new JW.Proxy("a");
		this.setExpectedOutput(
			"Changed size from 5 to 6",
			"Spliced -{} +{a:a}",
			"Changed"
		);
		source.add(a, 5);
		this.assertTarget({ "d": d, "f": f, "c": c, "b": b, "m": m, "a": a }, target);
		
		// b m d c f a
		this.setExpectedOutput(
			"Changed size from 6 to 5",
			"Spliced -{m:m} +{}",
			"Changed"
		);
		source.remove(1);
		this.assertTarget({ "d": d, "f": f, "c": c, "b": b, "a": a }, target);
		
		// b d c f a
		this.setExpectedOutput(
			"Changed size from 5 to 4",
			"Spliced -{b:b} +{}",
			"Changed"
		);
		source.remove(0);
		this.assertTarget({ "d": d, "f": f, "c": c, "a": a }, target);
		
		// d c f a
		var k = new JW.Proxy("k");
		this.setExpectedOutput(
			"Changed size from 4 to 5",
			"Spliced -{} +{k:k}",
			"Changed"
		);
		source.add(k);
		this.assertTarget({ "d": d, "f": f, "c": c, "a": a, "k": k }, target);
		
		// d c f a k
		var g = new JW.Proxy("g");
		this.setExpectedOutput(
			"Spliced -{f:f} +{g:g}",
			"Changed"
		);
		source.set(g, 2);
		this.assertTarget({ "d": d, "c": c, "a": a, "k": k, "g": g }, target);
		
		// d c g a k
		this.setExpectedOutput();
		source.set(a, 3);
		this.assertTarget({ "d": d, "c": c, "a": a, "k": k, "g": g }, target);
		
		this.setExpectedOutput();
		source.move(2, 1);
		this.assertTarget({ "d": d, "c": c, "a": a, "k": k, "g": g }, target);
		
		// d g c a k
		this.setExpectedOutput();
		source.move(0, 4);
		this.assertTarget({ "d": d, "c": c, "a": a, "k": k, "g": g }, target);
		
		// g c a k d
		this.setExpectedOutput();
		source.move(1, 1);
		this.assertTarget({ "d": d, "c": c, "a": a, "k": k, "g": g }, target);
		
		this.setExpectedOutput();
		var items = source.getItems().concat();
		JW.Array.sort(items, JW.byField("value"));
		source.performReorder(items);
		this.assertTarget({ "d": d, "c": c, "a": a, "k": k, "g": g }, target);
		
		// a c d g k
		this.setExpectedOutput(
			"Changed size from 5 to 4",
			"Spliced -{c:c} +{}",
			"Changed"
		);
		source.performSplice([ a, d, g, k ]);
		this.assertTarget({ "d": d, "a": a, "k": k, "g": g }, target);
		
		// a d g k
		this.setExpectedOutput(
			"Changed size from 4 to 1",
			"Spliced -{a:a,d:d,g:g} +{}",
			"Changed"
		);
		source.performSplice([ k ]);
		this.assertTarget({ "k": k }, target);
		
		// k
		var u = new JW.Proxy("u");
		var t = new JW.Proxy("t");
		this.setExpectedOutput(
			"Changed size from 1 to 3",
			"Spliced -{k:k} +{c:c,t:t,u:u}",
			"Changed"
		);
		source.performSplice([ u, t, c ]);
		this.assertTarget({ "u": u, "t": t, "c": c }, target);
		
		// u t c
		this.setExpectedOutput(
			"Changed size from 3 to 0",
			"Spliced -{c:c,t:t,u:u} +{}",
			"Changed"
		);
		source.clear();
		this.assertTarget({}, target);
		
		// (empty)
		var h = new JW.Proxy("h");
		this.setExpectedOutput(
			"Changed size from 0 to 1",
			"Spliced -{} +{h:h}",
			"Changed"
		);
		source.add(h);
		this.assertTarget({ "h": h }, target);
		
		// h
		this.setExpectedOutput(
			"Changed size from 1 to 0",
			"Spliced -{h:h} +{}",
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
		var source1 = new JW.ObservableArray([ a ]);
		var b = new JW.Proxy("b");
		var c = new JW.Proxy("c");
		var source2 = new JW.ObservableArray([ b, c ]);
		var x = new JW.Proxy("x");
		var target = this.createTarget();
		this.setExpectedOutput(
			"Changed size from 0 to 1",
			"Spliced -{} +{x:x}",
			"Changed"
		);
		target.set(x, "x");
		this.assertTarget({ "x": x }, target);
		
		this.setExpectedOutput(
			"Changed size from 1 to 2",
			"Spliced -{} +{a:a}",
			"Changed"
		);
		var indexer1 = this.createIndexer(source1, target);
		this.assertTarget({ "x": x, "a": a }, target);
		
		this.setExpectedOutput(
			"Changed size from 2 to 4",
			"Spliced -{} +{b:b,c:c}",
			"Changed"
		);
		var indexer2 = this.createIndexer(source2, target);
		this.assertTarget({ "x": x, "a": a, "b": b, "c": c }, target);
		
		var d = new JW.Proxy("d");
		this.setExpectedOutput(
			"Changed size from 4 to 5",
			"Spliced -{} +{d:d}",
			"Changed"
		);
		source1.add(d);
		this.assertTarget({ "x": x, "a": a, "b": b, "c": c, "d": d }, target);
		
		var e = new JW.Proxy("e");
		this.setExpectedOutput(
			"Spliced -{b:b} +{e:e}",
			"Changed"
		);
		source2.set(e, 0);
		this.assertTarget({ "x": x, "a": a, "c": c, "d": d, "e": e }, target);
		
		this.setExpectedOutput(
			"Changed size from 5 to 3",
			"Spliced -{a:a,d:d} +{}",
			"Changed"
		);
		source1.clear();
		this.assertTarget({ "x": x, "c": c, "e": e }, target);
		
		this.setExpectedOutput(
			"Changed size from 3 to 4",
			"Spliced -{} +{d:d}",
			"Changed"
		);
		source1.performSplice([ d ]);
		this.assertTarget({ "x": x, "c": c, "e": e, "d": d }, target);
		
		this.setExpectedOutput(
			"Changed size from 4 to 2",
			"Spliced -{c:c,e:e} +{}",
			"Changed"
		);
		indexer2.destroy();
		this.assertTarget({ "x": x, "d": d }, target);
		
		this.setExpectedOutput(
			"Changed size from 2 to 1",
			"Spliced -{d:d} +{}",
			"Changed"
		);
		indexer1.destroy();
		this.assertTarget({ "x": x }, target);
		
		this.setExpectedOutput();
		target.destroy();
		this.assertTarget({}, target);
		
		this.setExpectedOutput();
		source1.destroy();
		source2.destroy();
	},
	
	// tests that empty array doesn't trigger "change" on initialization
	testEmptyChange: function() {
		var source = new JW.ObservableArray();
		var target = this.createTarget();
		var indexer = this.createIndexer(source, target);
		indexer.destroy();
		target.destroy();
		source.destroy();
	},
	
	testAutoTarget: function() {
		var d = new JW.Proxy("d");
		var source = new JW.ObservableArray([ d ]);
		var indexer = this.createIndexer(source);
		this.assertTrue(indexer.target instanceof JW.ObservableMap);
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
