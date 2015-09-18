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

JW.Tests.Collection.ObservableSet.IndexerTestCase = JW.Unit.TestCase.extend({
	testShorthand: function() {
		var d = new JW.Proxy("d");
		var source = new JW.ObservableSet([ d ]);
		var target = source.$$index(this.indexFunc, this);
		var subscription = JW.Tests.Collection.subscribeToMap(this, target, function(x) { return x.value; });

		this.assertTarget({ "d": d }, target);

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
		var source = new JW.ObservableSet([ d ]);
		var target = new JW.Map();
		
		var indexer = this.createIndexer(source, target);
		this.assertTarget({ "d": d }, target);
		
		var f = new JW.Proxy("f");
		source.addAll([ f ]);
		this.assertTarget({ "d": d, "f": f }, target);
		
		var c = new JW.Proxy("c");
		source.add(c);
		this.assertTarget({ "d": d, "f": f, "c": c }, target);
		
		var b = new JW.Proxy("b");
		var m = new JW.Proxy("m");
		source.addAll([ b, m ]);
		this.assertTarget({ "d": d, "f": f, "c": c, "b": b, "m": m }, target);
		
		source.addAll([]);
		this.assertTarget({ "d": d, "f": f, "c": c, "b": b, "m": m }, target);
		
		source.remove(m);
		this.assertTarget({ "d": d, "f": f, "c": c, "b": b }, target);
		
		source.remove(m);
		this.assertTarget({ "d": d, "f": f, "c": c, "b": b }, target);
		
		source.removeAll([ f, b ]);
		this.assertTarget({ "d": d, "c": c }, target);
		
		source.splice([ d ], [ f, b ]);
		this.assertTarget({ "c": c, "b": b, "f": f }, target);
		
		source.clear();
		this.assertTarget({}, target);
		
		var h = new JW.Proxy("h");
		source.add(h);
		this.assertTarget({ "h": h }, target);
		
		indexer.destroy();
		this.assertTarget({}, target);
		
		target.destroy();
		source.destroy();
	},
	
	testObservableTarget: function() {
		var d = new JW.Proxy("d");
		var source = new JW.ObservableSet([ d ]);
		var target = this.createTarget();
		
		this.setExpectedOutput(
			"Changed size from 0 to 1",
			"Spliced -{} +{d:d}",
			"Changed"
		);
		var indexer = this.createIndexer(source, target);
		this.assertTarget({ "d": d }, target);
		
		var f = new JW.Proxy("f");
		this.setExpectedOutput(
			"Changed size from 1 to 2",
			"Spliced -{} +{f:f}",
			"Changed"
		);
		source.addAll([ f ]);
		this.assertTarget({ "d": d, "f": f }, target);
		
		var c = new JW.Proxy("c");
		this.setExpectedOutput(
			"Changed size from 2 to 3",
			"Spliced -{} +{c:c}",
			"Changed"
		);
		source.add(c);
		this.assertTarget({ "d": d, "f": f, "c": c }, target);
		
		var b = new JW.Proxy("b");
		var m = new JW.Proxy("m");
		this.setExpectedOutput(
			"Changed size from 3 to 5",
			"Spliced -{} +{b:b,m:m}",
			"Changed"
		);
		source.addAll([ b, m ]);
		this.assertTarget({ "d": d, "f": f, "c": c, "b": b, "m": m }, target);
		
		this.setExpectedOutput();
		source.addAll([]);
		this.assertTarget({ "d": d, "f": f, "c": c, "b": b, "m": m }, target);
		
		this.setExpectedOutput(
			"Changed size from 5 to 4",
			"Spliced -{m:m} +{}",
			"Changed"
		);
		source.remove(m);
		this.assertTarget({ "d": d, "f": f, "c": c, "b": b }, target);
		
		this.setExpectedOutput();
		source.remove(m);
		this.assertTarget({ "d": d, "f": f, "c": c, "b": b }, target);
		
		this.setExpectedOutput(
			"Changed size from 4 to 2",
			"Spliced -{b:b,f:f} +{}",
			"Changed"
		);
		source.removeAll([ f, b ]);
		this.assertTarget({ "d": d, "c": c }, target);
		
		this.setExpectedOutput(
			"Changed size from 2 to 3",
			"Spliced -{d:d} +{b:b,f:f}",
			"Changed"
		);
		source.splice([ d ], [ f, b ]);
		this.assertTarget({ "c": c, "b": b, "f": f }, target);
		
		this.setExpectedOutput(
			"Changed size from 3 to 0",
			"Spliced -{b:b,c:c,f:f} +{}",
			"Changed"
		);
		source.clear();
		this.assertTarget({}, target);
		
		var h = new JW.Proxy("h");
		this.setExpectedOutput(
			"Changed size from 0 to 1",
			"Spliced -{} +{h:h}",
			"Changed"
		);
		source.add(h);
		this.assertTarget({ "h": h }, target);
		
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
		var b = new JW.Proxy("b");
		var c = new JW.Proxy("c");
		var d = new JW.Proxy("d");
		var x = new JW.Proxy("x");
		
		var source1 = new JW.ObservableSet([ a, b ]);
		var source2 = new JW.ObservableSet([ c, d ]);
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
		
		var e = new JW.Proxy("e");
		this.setExpectedOutput(
			"Changed size from 5 to 6",
			"Spliced -{} +{e:e}",
			"Changed"
		);
		source1.add(e);
		this.assertTarget({ "a": a, "b": b, "c": c, "d": d, "e": e, "x": x }, target);
		
		this.setExpectedOutput(
			"Changed size from 6 to 5",
			"Spliced -{d:d} +{}",
			"Changed"
		);
		source2.remove(d);
		this.assertTarget({ "a": a, "b": b, "c": c, "e": e, "x": x }, target);
		
		this.setExpectedOutput(
			"Changed size from 5 to 2",
			"Spliced -{a:a,b:b,e:e} +{}",
			"Changed"
		);
		source1.clear();
		this.assertTarget({ "c": c, "x": x }, target);
		
		this.setExpectedOutput(
			"Changed size from 2 to 1",
			"Spliced -{c:c} +{}",
			"Changed"
		);
		indexer2.destroy();
		this.assertTarget({ "x": x }, target);
		
		this.setExpectedOutput();
		indexer1.destroy();
		this.assertTarget({ "x": x }, target);
		
		this.setExpectedOutput();
		target.destroy();
		
		this.setExpectedOutput();
		source1.destroy();
		source2.destroy();
	},
	
	// tests that empty source doesn't cause target to trigger "change" on synchronizer initialization
	testEmptyChange: function() {
		var source = new JW.ObservableSet();
		var target = this.createTarget();
		var indexer = this.createIndexer(source, target);
		indexer.destroy();
		target.destroy();
		source.destroy();
	},
	
	testAutoTarget: function() {
		var d = new JW.Proxy("d");
		var source = new JW.ObservableSet([ d ]);
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
