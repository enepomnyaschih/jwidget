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
	testUnobservable: function() {
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
	
	testObservable: function() {
		var d = new JW.Proxy("d");
		var source = new JW.ObservableSet([ d ]);
		var target = this.createTarget();
		
		this.setExpectedOutput(
			"Added d at d",
			"Changed",
			"Changed size from 0 to 1"
		);
		var indexer = this.createIndexer(source, target);
		this.assertTarget({ "d": d }, target);
		
		var f = new JW.Proxy("f");
		this.setExpectedOutput(
			"Added f at f",
			"Changed",
			"Changed size from 1 to 2"
		);
		source.addAll([ f ]);
		this.assertTarget({ "d": d, "f": f }, target);
		
		var c = new JW.Proxy("c");
		this.setExpectedOutput(
			"Added c at c",
			"Changed",
			"Changed size from 2 to 3"
		);
		source.add(c);
		this.assertTarget({ "d": d, "f": f, "c": c }, target);
		
		var b = new JW.Proxy("b");
		var m = new JW.Proxy("m");
		this.setExpectedOutput(
			"Added b at b",
			"Added m at m",
			"Changed",
			"Changed size from 3 to 5"
		);
		source.addAll([ b, m ]);
		this.assertTarget({ "d": d, "f": f, "c": c, "b": b, "m": m }, target);
		
		this.setExpectedOutput();
		source.addAll([]);
		this.assertTarget({ "d": d, "f": f, "c": c, "b": b, "m": m }, target);
		
		this.setExpectedOutput(
			"Removed m at m",
			"Changed",
			"Changed size from 5 to 4"
		);
		source.remove(m);
		this.assertTarget({ "d": d, "f": f, "c": c, "b": b }, target);
		
		this.setExpectedOutput();
		source.remove(m);
		this.assertTarget({ "d": d, "f": f, "c": c, "b": b }, target);
		
		this.setExpectedOutput(
			"Removed d at d",
			"Removed f at f",
			"Removed c at c",
			"Removed b at b",
			"Changed",
			"Changed size from 4 to 0"
		);
		source.clear();
		this.assertTarget({}, target);
		
		var h = new JW.Proxy("h");
		this.setExpectedOutput(
			"Added h at h",
			"Changed",
			"Changed size from 0 to 1"
		);
		source.add(h);
		this.assertTarget({ "h": h }, target);
		
		this.setExpectedOutput(
			"Removed h at h",
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
			"Added x at x",
			"Changed",
			"Changed size from 0 to 1"
		);
		target.set(x, "x");
		this.assertTarget({ "x": x }, target);
		
		this.setExpectedOutput(
			"Added a at a",
			"Added b at b",
			"Changed",
			"Changed size from 1 to 3"
		);
		var indexer1 = this.createIndexer(source1, target);
		this.assertTarget({ "a": a, "b": b, "x": x }, target);
		
		this.setExpectedOutput(
			"Added c at c",
			"Added d at d",
			"Changed",
			"Changed size from 3 to 5"
		);
		var indexer2 = this.createIndexer(source2, target);
		this.assertTarget({ "a": a, "b": b, "c": c, "d": d, "x": x }, target);
		
		var e = new JW.Proxy("e");
		this.setExpectedOutput(
			"Added e at e",
			"Changed",
			"Changed size from 5 to 6"
		);
		source1.add(e);
		this.assertTarget({ "a": a, "b": b, "c": c, "d": d, "e": e, "x": x }, target);
		
		this.setExpectedOutput(
			"Removed d at d",
			"Changed",
			"Changed size from 6 to 5"
		);
		source2.remove(d);
		this.assertTarget({ "a": a, "b": b, "c": c, "e": e, "x": x }, target);
		
		this.setExpectedOutput(
			"Removed a at a",
			"Removed b at b",
			"Removed e at e",
			"Changed",
			"Changed size from 5 to 2"
		);
		source1.clear();
		this.assertTarget({ "c": c, "x": x }, target);
		
		this.setExpectedOutput(
			"Removed c at c",
			"Changed",
			"Changed size from 2 to 1"
		);
		indexer2.destroy();
		this.assertTarget({ "x": x }, target);
		
		this.setExpectedOutput();
		indexer1.destroy();
		this.assertTarget({ "x": x }, target);
		
		this.setExpectedOutput(
			"Removed x at x",
			"Changed",
			"Changed size from 1 to 0"
		);
		target.destroy();
		
		this.setExpectedOutput();
		source1.destroy();
		source2.destroy();
	},
	
	// tests that empty source doesn't caused target to trigger "change" on synchronizer initialization
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
		
		target.addEvent.bind(function(params) {
			this.output("Added " + params.item.value + " at " + params.key);
		}, this);
		
		target.removeEvent.bind(function(params) {
			this.output("Removed " + params.item.value + " at " + params.key);
		}, this);
		
		target.changeEvent.bind(function(params) {
			this.output("Changed");
		}, this);
		
		target.sizeChangeEvent.bind(function(params) {
			this.output("Changed size from " + params.oldSize + " to " + params.newSize);
		}, this);
		
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
