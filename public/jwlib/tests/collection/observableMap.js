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

JW.Tests.Collection.ObservableMapTestCase = JW.Tests.Collection.AbstractMapBase.extend({
	// override
	createMap: function(items, formatter) {
		var map = new JW.ObservableMap(items);
		JW.Tests.Collection.subscribeToMap(this, map, formatter);
		return map;
	},
	
	// override
	invoke: function(map, method, args) {
		return map[method].apply(map, args || []);
	},
	
	// override
	setObservableOutput: function() {
		this.setExpectedOutput.apply(this, arguments);
	},
	
	testNotAdapter: function() {
		var items = {a: 2, b: 4};
		var map = new JW.ObservableMap(items);
		this.assertStrictEqual(2, map.getLength());
		this.assertFalse(map.isEmpty());
		this.assertStrictEqual(2, map.get("a"));
		this.assertStrictEqual(4, map.get("b"));
		map.set(3, "a");
		this.assertStrictEqual(3, map.get("a"));
		this.assertStrictEqual(2, items.a);
	},
	
	testAdapter: function() {
		var items = {a: 2, b: 4};
		var map = new JW.ObservableMap(items, true);
		this.assertStrictEqual(2, map.getLength());
		this.assertFalse(map.isEmpty());
		this.assertStrictEqual(2, map.get("a"));
		this.assertStrictEqual(4, map.get("b"));
		map.set(3, "a");
		this.assertStrictEqual(3, map.get("a"));
		this.assertStrictEqual(3, items.a);
	},
	
	testToMap: function() {
		var map = new JW.ObservableMap({a: 2, b: 4});
		this.assertTrue(JW.Map.equal(map.toMap(), map.getJson()));
		this.assertTrue(map.$toMap().equal(map.getJson()));
		this.assertFalse(map.toMap() === map.getJson());
		this.assertFalse(map.$toMap() === map);
		this.assertTrue(map.equal({a: 2, b: 4}));
	},
	
	testAsMap: function() {
		var map = new JW.ObservableMap({a: 2, b: 4});
		this.assertTrue(map.asMap() === map.getJson());
		this.assertTrue(map.$asMap() === map);
		this.assertTrue(map.equal({a: 2, b: 4}));
	},

	testLateDestruction: function() {
		var test = this;

		var a = new JW.Class();
		a.destroy = function() { test.output("Destroy a"); };

		var b = new JW.Class();
		b.destroy = function() { test.output("Destroy b"); };

		var c = new JW.Class();
		c.destroy = function() { test.output("Destroy c"); };

		var d = new JW.Class();
		d.destroy = function() { test.output("Destroy d"); };

		var set = new JW.ObservableMap({a: a, b: b, c: c}).ownItems();
		set.spliceEvent.bind(function() { test.output("Splice"); });
		set.clearEvent.bind(function() { test.output("Clear"); });

		this.setExpectedOutput("Splice", "Destroy a");
		set.remove("a");

		this.setExpectedOutput("Splice", "Destroy b");
		set.set(d, "b");

		this.setExpectedOutput("Splice", "Destroy c");
		set.splice(["c"], {});

		this.setExpectedOutput("Clear", "Destroy d");
		set.clear();

		this.setExpectedOutput();
		set.destroy();
	}
});

JW.Tests.Collection.ObservableMap = {};
