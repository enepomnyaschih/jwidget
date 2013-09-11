/*
	jWidget Lib tests.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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
			"Spliced -{} +{d:d}",
			"Changed",
			"Changed size from 0 to 1"
		);
		var indexer = this.createIndexer(source, target);
		this.assertTarget({ "d": d }, target);
		
		var f = new JW.Proxy("f");
		this.setExpectedOutput(
			"Spliced -{} +{f:f}",
			"Changed",
			"Changed size from 1 to 2"
		);
		source.addAll([ f ]);
		this.assertTarget({ "d": d, "f": f }, target);
		
		var c = new JW.Proxy("c");
		this.setExpectedOutput(
			"Spliced -{} +{c:c}",
			"Changed",
			"Changed size from 2 to 3"
		);
		source.add(c);
		this.assertTarget({ "d": d, "f": f, "c": c }, target);
		
		var b = new JW.Proxy("b");
		var m = new JW.Proxy("m");
		this.setExpectedOutput(
			"Spliced -{} +{b:b,m:m}",
			"Changed",
			"Changed size from 3 to 5"
		);
		source.addAll([ b, m ]);
		this.assertTarget({ "d": d, "f": f, "c": c, "b": b, "m": m }, target);
		
		this.setExpectedOutput();
		source.addAll([]);
		this.assertTarget({ "d": d, "f": f, "c": c, "b": b, "m": m }, target);
		
		this.setExpectedOutput(
			"Spliced -{m:m} +{}",
			"Changed",
			"Changed size from 5 to 4"
		);
		source.remove(m);
		this.assertTarget({ "d": d, "f": f, "c": c, "b": b }, target);
		
		this.setExpectedOutput();
		source.remove(m);
		this.assertTarget({ "d": d, "f": f, "c": c, "b": b }, target);
		
		this.setExpectedOutput(
			"Spliced -{b:b,f:f} +{}",
			"Changed",
			"Changed size from 4 to 2"
		);
		source.removeAll([ f, b ]);
		this.assertTarget({ "d": d, "c": c }, target);
		
		this.setExpectedOutput(
			"Spliced -{d:d} +{b:b,f:f}",
			"Changed",
			"Changed size from 2 to 3"
		);
		source.splice([ d ], [ f, b ]);
		this.assertTarget({ "c": c, "b": b, "f": f }, target);
		
		this.setExpectedOutput(
			"Spliced -{b:b,c:c,f:f} +{}",
			"Changed",
			"Changed size from 3 to 0"
		);
		source.clear();
		this.assertTarget({}, target);
		
		var h = new JW.Proxy("h");
		this.setExpectedOutput(
			"Spliced -{} +{h:h}",
			"Changed",
			"Changed size from 0 to 1"
		);
		source.add(h);
		this.assertTarget({ "h": h }, target);
		
		this.setExpectedOutput(
			"Spliced -{h:h} +{}",
			"Changed",
			"Changed size from 1 to 0"
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
			"Spliced -{} +{x:x}",
			"Changed",
			"Changed size from 0 to 1"
		);
		target.set(x, "x");
		this.assertTarget({ "x": x }, target);
		
		this.setExpectedOutput(
			"Spliced -{} +{a:a,b:b}",
			"Changed",
			"Changed size from 1 to 3"
		);
		var indexer1 = this.createIndexer(source1, target);
		this.assertTarget({ "a": a, "b": b, "x": x }, target);
		
		this.setExpectedOutput(
			"Spliced -{} +{c:c,d:d}",
			"Changed",
			"Changed size from 3 to 5"
		);
		var indexer2 = this.createIndexer(source2, target);
		this.assertTarget({ "a": a, "b": b, "c": c, "d": d, "x": x }, target);
		
		var e = new JW.Proxy("e");
		this.setExpectedOutput(
			"Spliced -{} +{e:e}",
			"Changed",
			"Changed size from 5 to 6"
		);
		source1.add(e);
		this.assertTarget({ "a": a, "b": b, "c": c, "d": d, "e": e, "x": x }, target);
		
		this.setExpectedOutput(
			"Spliced -{d:d} +{}",
			"Changed",
			"Changed size from 6 to 5"
		);
		source2.remove(d);
		this.assertTarget({ "a": a, "b": b, "c": c, "e": e, "x": x }, target);
		
		this.setExpectedOutput(
			"Spliced -{a:a,b:b,e:e} +{}",
			"Changed",
			"Changed size from 5 to 2"
		);
		source1.clear();
		this.assertTarget({ "c": c, "x": x }, target);
		
		this.setExpectedOutput(
			"Spliced -{c:c} +{}",
			"Changed",
			"Changed size from 2 to 1"
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
			scope  : this,
			
			getKey: function(item) {
				return item.value;
			}
		});
	},
	
	assertTarget: function(expected, target) {
		this.assertTrue(JW.Map.equal(expected, target.getJson()));
	}
});
