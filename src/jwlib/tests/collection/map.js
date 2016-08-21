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

JW.Tests.Collection.MapTestCase = JW.Tests.Collection.AbstractMapBase.extend({
	// override
	createMap: function(items) {
		return new JW.Map(items);
	},
	
	// override
	invoke: function(map, method, args) {
		return map[method].apply(map, args || []);
	},
	
	testNotAdapter: function() {
		var items = {a: 2, b: 4};
		var map = new JW.Map(items);
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
		var map = new JW.Map(items, true);
		this.assertStrictEqual(2, map.getLength());
		this.assertFalse(map.isEmpty());
		this.assertStrictEqual(2, map.get("a"));
		this.assertStrictEqual(4, map.get("b"));
		map.set(3, "a");
		this.assertStrictEqual(3, map.get("a"));
		this.assertStrictEqual(3, items.a);
	},
	
	testToMap: function() {
		var map = new JW.Map({a: 2, b: 4});
		this.assertTrue(JW.Map.equal(map.toMap(), map.getJson()));
		this.assertTrue(map.$toMap().equal(map.getJson()));
		this.assertFalse(map.toMap() === map.getJson());
		this.assertFalse(map.$toMap() === map);
		this.assertTrue(map.equal({a: 2, b: 4}));
	},
	
	testAsMap: function() {
		var map = new JW.Map({a: 2, b: 4});
		this.assertTrue(map.asMap() === map.getJson());
		this.assertTrue(map.$asMap() === map);
		this.assertTrue(map.equal({a: 2, b: 4}));
	},
	
	testOwnItemsOff: function() {
		var cls = function(testCase, value) {
			cls._super.call(this);
			this.testCase = testCase;
			this.value = value;
		};
		
		JW.extend(cls, JW.Class, {
			destroyObject: function() {
				this.testCase.output("destroy " + this.value);
				this._super();
			}
		});
		
		var map = new JW.Map({
			A: new cls(this, "a"),
			B: new cls(this, "b"),
			C: new cls(this, "c"),
			D: new cls(this, "d"),
			E: new cls(this, "e")
		});
		map.set(new cls(this, "k"), "A");
		map.setAll({
			B: new cls(this, "l"),
			C: new cls(this, "m"),
		});
		map.remove("A");
		map.removeAll(["B", "C"]);
		map.setKey("D", "F");
		map.clear();
		map.setAll({
			A: new cls(this, "a"),
			B: new cls(this, "b")
		});
		map.destroy();
	},
	
	testOwnItemsOn: function() {
		var cls = function(testCase, value) {
			cls._super.call(this);
			this.testCase = testCase;
			this.value = value;
		};
		
		JW.extend(cls, JW.Class, {
			destroy: function() {
				this.testCase.output("destroy " + this.value);
				this._super();
			}
		});
		
		var map = new JW.Map({
			A: new cls(this, "a"),
			B: new cls(this, "b"),
			C: new cls(this, "c"),
			D: new cls(this, "d"),
			E: new cls(this, "e")
		}).ownItems();
		this.setExpectedOutput(
			"destroy a"
		);
		map.set(new cls(this, "k"), "A");
		this.setExpectedOutput(
			"destroy b",
			"destroy c"
		);
		map.setAll({
			B: new cls(this, "l"),
			C: new cls(this, "m"),
		});
		this.setExpectedOutput(
			"destroy k"
		);
		map.remove("A");
		this.setExpectedOutput(
			"destroy l",
			"destroy m"
		);
		map.removeAll(["B", "C"]);
		//this.setExpectedOutput();
		//map.setKey("D", "F"); // browser-dependent behavior
		this.setExpectedOutput(
			"destroy e",
			"destroy d"
		);
		map.clear();
		this.setExpectedOutput();
		map.setAll({
			A: new cls(this, "a"),
			B: new cls(this, "b")
		});
		this.setExpectedOutput(
			"destroy b",
			"destroy a"
		);
		map.destroy();
	},
/*
	// The next tests are dependent on hardware performance, and sometimes fail.
	// For debugging purposes only.
	testSetPerformance: function() {
		this.assertPerformance(100, function() {
			var map = new JW.Map();
			for (var i = 0; i < 10000; ++i) {
				map.set(i, "a" + i);
			}
		});
	},

	testSetAllPerformance: function() {
		var cases = [];
		for (var i = 0; i < 1000; ++i) {
			var values = {};
			for (var j = 0; j < 10; ++j) {
				var k = 10 * i + j;
				values["a" + k] = k;
			}
			cases.push(values);
		}
		this.assertPerformance(20, function() {
			var map = new JW.Map();
			for (var i = 0; i < 1000; ++i) {
				map.setAll(cases[i]);
			}
		});
	},

	testRemovePerformance: function() {
		this.assertPerformance(100, function() {
			var values = {};
			for (var i = 0; i < 10000; ++i) {
				values["a" + i] = i;
			}
			var map = new JW.Map(values, true);
			for (var i = 0; i < 10000; ++i) {
				map.remove("a" + i);
			}
		});
	},

	testRemoveAllPerformance: function() {
		var values = {};
		for (var i = 0; i < 30000; ++i) {
			values["a" + i] = i;
		}
		var cases = [];
		for (var i = 0; i < 3000; ++i) {
			var keys = [];
			for (var j = 0; j < 10; ++j) {
				keys.push("a" + (10 * i + j));
			}
			cases.push(keys);
		}
		var map = new JW.Map(values, true);
		this.assertPerformance(30, function() {
			for (var i = 0; i < 3000; ++i) {
				map.removeAll(cases[i]);
			}
		});
	},

	testSetKeyPerformance: function() {
		this.assertPerformance(100, function() {
			var values = {};
			for (var i = 0; i < 10000; ++i) {
				values["a" + i] = i;
			}
			var map = new JW.Map(values, true);
			for (var i = 0; i < 10000; ++i) {
				map.setKey("a" + i, "b" + i);
			}
		});
	},

	testClearPerformance: function() {
		this.assertPerformance(20, function() {
			var values = {};
			for (var i = 0; i < 100; ++i) {
				values["a" + i] = i;
			}
			var map = new JW.Map();
			for (var i = 0; i < 100; ++i) {
				map.setAll(values);
				map.clear();
			}
		});
	},

	testReindexPerformance: function() {
		this.assertPerformance(100, function() {
			var values = {};
			for (var i = 0; i < 100; ++i) {
				values["a" + i] = i;
			}
			var map = new JW.Map(values, true);
			for (var i = 0; i < 100; ++i) {
				map.reindex(JW.Map.single("a" + i, "b" + i));
			}
		});
	},
*/
});

JW.Tests.Collection.Map = {};
