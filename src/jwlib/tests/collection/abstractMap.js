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

JW.Tests.Collection.AbstractMapBase = JW.Unit.TestCase.extend({
	/*
	JW.AbstractMap createMap(items, formatter);
	Mixed invoke(target, method, args);
	*/

	setObservableOutput: function() {},

	testEmpty: function() {
		var map = this.createMap();
		this.assertStrictEqual(0, this.invoke(map, "getLength"));
		this.assertTrue(this.invoke(map, "isEmpty"));
		this.assertUndefined(this.invoke(map, "get", [0]));
		this.assertUndefined(this.invoke(map, "getFirst"));
		this.assertUndefined(this.invoke(map, "getFirstKey"));
		this.assertTrue(JW.Array.equal(this.invoke(map, "getKeys"), []));
		this.assertTrue(this.invoke(map, "$getKeys").equal([]));
		this.assertFalse(this.invoke(map, "containsItem", [0]));
		this.assertFalse(this.invoke(map, "containsKey", [0]));
		this.assertUndefined(this.invoke(map, "keyOf", [0]));
		this.assertTrue(this.invoke(map, "every", [JW.isInt]));
		this.assertFalse(this.invoke(map, "some", [JW.isInt]));
		this.assertUndefined(this.invoke(map, "search", [JW.isInt]));
		this.assertUndefined(this.invoke(map, "find", [JW.isInt]));
		this.assertTrue(JW.Map.equal(this.invoke(map, "filter", [JW.isInt]), {}));
		this.assertTrue(this.invoke(map, "$filter", [JW.isInt]).equal({}));
		this.assertTrue(JW.Map.equal(this.invoke(map, "map", [function(x) { return x + 1; }]), {}));
		this.assertTrue(this.invoke(map, "$map", [function(x) { return x + 1; }]).equal({}));
		this.assertTrue(JW.Array.equal(this.invoke(map, "toSorted"), []));
		this.assertTrue(this.invoke(map, "$toSorted").equal([]));
		this.assertTrue(JW.Array.equal(this.invoke(map, "toSortedComparing"), []));
		this.assertTrue(this.invoke(map, "$toSortedComparing").equal([]));
		this.assertTrue(JW.Array.equal(this.invoke(map, "getSortingKeys"), []));
		this.assertTrue(this.invoke(map, "$getSortingKeys").equal([]));
		this.assertTrue(JW.Array.equal(this.invoke(map, "getSortingKeysComparing"), []));
		this.assertTrue(this.invoke(map, "$getSortingKeysComparing").equal([]));
		this.assertTrue(JW.Map.equal(this.invoke(map, "index", [function(x) { return x; }]), {}));
		this.assertTrue(this.invoke(map, "$index", [function(x) { return x; }]).equal({}));
		this.assertTrue(JW.Array.equal(this.invoke(map, "toArray"), []));
		this.assertTrue(this.invoke(map, "$toArray").equal([]));
		this.assertTrue(JW.Map.equal(this.invoke(map, "toMap"), {}));
		this.assertTrue(this.invoke(map, "$toMap").equal({}));
		this.assertTrue(JW.Set.equal(this.invoke(map, "toSet"), []));
		this.assertTrue(this.invoke(map, "$toSet").equal([]));
		this.assertTrue(JW.Array.equal(this.invoke(map, "asArray"), []));
		this.assertTrue(this.invoke(map, "$asArray").equal([]));
		this.assertTrue(JW.Map.equal(this.invoke(map, "asMap"), {}));
		this.assertTrue(this.invoke(map, "$asMap").equal({}));
		this.assertTrue(JW.Set.equal(this.invoke(map, "asSet"), []));
		this.assertTrue(this.invoke(map, "$asSet").equal([]));
	},

	testItems: function() {
		var map = this.createMap({"a": 2, "b": 4});
		this.assertStrictEqual(2, this.invoke(map, "getLength"));
		this.assertFalse(this.invoke(map, "isEmpty"));
		this.assertStrictEqual(2, this.invoke(map, "get", ["a"]));
		this.assertStrictEqual(4, this.invoke(map, "get", ["b"]));
		this.assertStrictEqual(2, this.invoke(map, "getFirst"));
		this.assertStrictEqual("a", this.invoke(map, "getFirstKey"));
		this.assertTrue(JW.Array.equal(this.invoke(map, "getKeys"), ["a", "b"]));
		this.assertTrue(this.invoke(map, "$getKeys").equal(["a", "b"]));
		this.assertFalse(this.invoke(map, "containsItem", [0]));
		this.assertTrue(this.invoke(map, "containsItem", [2]));
		this.assertFalse(this.invoke(map, "containsKey", ["c"]));
		this.assertTrue(this.invoke(map, "containsKey", ["a"]));
		this.assertUndefined(this.invoke(map, "keyOf", [0]));
		this.assertStrictEqual("a", this.invoke(map, "keyOf", [2]));
		this.assertTrue(this.invoke(map, "every", [JW.isInt]));
		this.assertTrue(this.invoke(map, "some", [JW.isInt]));
		this.assertStrictEqual(2, this.invoke(map, "search", [JW.isInt]));
		this.assertStrictEqual("a", this.invoke(map, "find", [JW.isInt]));
		this.assertTrue(JW.Map.equal(this.invoke(map, "filter", [JW.isInt]), {"a": 2, "b": 4}));
		this.assertTrue(this.invoke(map, "$filter", [JW.isInt]).equal({"a": 2, "b": 4}));
		this.assertTrue(JW.Map.equal(this.invoke(map, "map", [function(x) { return x + 1; }]), {"a": 3, "b": 5}));
		this.assertTrue(this.invoke(map, "$map", [function(x) { return x + 1; }]).equal({"a": 3, "b": 5}));
		this.assertTrue(JW.Array.equal(this.invoke(map, "toSorted"), [2, 4]));
		this.assertTrue(this.invoke(map, "$toSorted").equal([2, 4]));
		this.assertTrue(JW.Array.equal(this.invoke(map, "toSortedComparing"), [2, 4]));
		this.assertTrue(this.invoke(map, "$toSortedComparing").equal([2, 4]));
		this.assertTrue(JW.Array.equal(this.invoke(map, "getSortingKeys"), ["a", "b"]));
		this.assertTrue(this.invoke(map, "$getSortingKeys").equal(["a", "b"]));
		this.assertTrue(JW.Array.equal(this.invoke(map, "getSortingKeysComparing"), ["a", "b"]));
		this.assertTrue(this.invoke(map, "$getSortingKeysComparing").equal(["a", "b"]));
		this.assertTrue(JW.Map.equal(this.invoke(map, "index", [function(x) { return x; }]), {"2": 2, "4": 4}));
		this.assertTrue(this.invoke(map, "$index", [function(x) { return x; }]).equal({"2": 2, "4": 4}));
		this.assertTrue(JW.Array.equal(this.invoke(map, "toArray"), [2, 4]));
		this.assertTrue(this.invoke(map, "$toArray").equal([2, 4]));
		this.assertTrue(JW.Map.equal(this.invoke(map, "toMap"), {"a": 2, "b": 4}));
		this.assertTrue(this.invoke(map, "$toMap").equal({"a": 2, "b": 4}));
		//this.assertTrue(JW.Set.equal(map.toSet(), [2, 4]));
		//this.assertTrue(map.$toSet().equal([2, 4]));
		this.assertTrue(JW.Array.equal(this.invoke(map, "asArray"), [2, 4]));
		this.assertTrue(this.invoke(map, "$asArray").equal([2, 4]));
		this.assertTrue(JW.Map.equal(this.invoke(map, "asMap"), {"a": 2, "b": 4}));
		this.assertTrue(this.invoke(map, "$asMap").equal({"a": 2, "b": 4}));
		//this.assertTrue(JW.Set.equal(map.asSet(), [2, 4]));
		//this.assertTrue(map.$asSet().equal([2, 4]));
	},

	testEvery: function() {
		var map = this.createMap({a: 2, b: 3.5, c: 4});
		this.assertTrue(this.invoke(map, "every", [JW.isNumber]));
		this.assertFalse(this.invoke(map, "every", [JW.isInt]));
		this.assertFalse(this.invoke(map, "every", [JW.isString]));

		this.setExpectedOutput(
			"2 at a",
			"3.5 at b",
			"4 at c"
		);
		this.invoke(map, "every", [function(item, index) {
			this.output(item + " at " + index);
		}, this]);

		this.setExpectedOutput(
			"2 at a",
			"3.5 at b"
		);
		this.invoke(map, "every", [function(item, index) {
			this.output(item + " at " + index);
			return JW.isInt(item);
		}, this]);
	},

	testSome: function() {
		var map = this.createMap({a: 2, b: 3.5, c: 4});
		this.assertTrue(this.invoke(map, "some", [JW.isNumber]));
		this.assertTrue(this.invoke(map, "some", [JW.isInt]));
		this.assertFalse(this.invoke(map, "some", [JW.isString]));

		this.setExpectedOutput(
			"2 at a"
		);
		this.invoke(map, "some", [function(item, index) {
			this.output(item + " at " + index);
		}, this]);

		this.setExpectedOutput(
			"2 at a",
			"3.5 at b"
		);
		this.invoke(map, "some", [function(item, index) {
			this.output(item + " at " + index);
			return !JW.isInt(item);
		}, this]);
	},

	testEach: function() {
		var map = this.createMap({a: 2, b: 3.5, c: 4});
		this.setExpectedOutput(
			"2 at a",
			"3.5 at b",
			"4 at c"
		);
		this.invoke(map, "each", [function(item, index) {
			this.output(item + " at " + index);
			return false;
		}, this]);
	},

	testSearch: function() {
		var map = this.createMap({a: 2.5, b: 3.5, c: 4});
		this.assertStrictEqual(4, this.invoke(map, "search", [JW.isInt]));
	},

	testFind: function() {
		var map = this.createMap({a: 2.5, b: 3.5, c: 4});
		this.assertStrictEqual("c", this.invoke(map, "find", [JW.isInt]));
	},

	testFilter: function() {
		var map = this.createMap({a: 2, b: 3.5, c: 4});
		this.assertTrue(JW.Map.equal(this.invoke(map, "filter", [JW.isInt]), {a: 2, c: 4}));
		this.assertTrue(this.invoke(map, "$filter", [JW.isInt]).equal({a: 2, c: 4}));
		this.assertTrue(this.invoke(map, "equal", [{a: 2, b: 3.5, c: 4}]));
	},

	testCount: function() {
		var map = this.createMap({a: 2, b: 3.5, c: 4});
		this.assertStrictEqual(2, this.invoke(map, "count", [JW.isInt]));
		this.assertTrue(this.invoke(map, "equal", [{a: 2, b: 3.5, c: 4}]));
	},

	testMap: function() {
		var map = this.createMap({a: 2, b: 4});
		this.assertTrue(JW.Map.equal(this.invoke(map, "map", [function(x) { return x + 1; }]), {a: 3, b: 5}));
		this.assertTrue(this.invoke(map, "$map", [function(x) { return x + 1; }]).equal({a: 3, b: 5}));
		this.assertTrue(this.invoke(map, "equal", [{a: 2, b: 4}]));
	},

	testToSorted: function() {
		var map = this.createMap({a: 3, b: 2, c: 4});
		this.assertTrue(JW.Array.equal(this.invoke(map, "toSorted"), [2, 3, 4]));
		this.assertTrue(this.invoke(map, "$toSorted").equal([2, 3, 4]));
		this.assertTrue(JW.Array.equal(this.invoke(map, "toSorted", [null, null, -1]), [4, 3, 2]));
		this.assertTrue(this.invoke(map, "$toSorted", [null, null, -1]).equal([4, 3, 2]));
		this.assertTrue(JW.Array.equal(this.invoke(map, "toSorted", [function(x) { return -x; }]), [4, 3, 2]));
		this.assertTrue(this.invoke(map, "$toSorted", [function(x) { return -x; }]).equal([4, 3, 2]));
		this.assertTrue(JW.Array.equal(this.invoke(map, "toSorted", [function(x) { return -x; }, null, -1]), [2, 3, 4]));
		this.assertTrue(this.invoke(map, "$toSorted", [function(x) { return -x; }, null, -1]).equal([2, 3, 4]));
		this.assertTrue(this.invoke(map, "equal", [{a: 3, b: 2, c: 4}]));
	},

	testToSortedComparing: function() {
		var map = this.createMap({a: 3, b: 2, c: 4});
		this.assertTrue(JW.Array.equal(this.invoke(map, "toSortedComparing"), [2, 3, 4]));
		this.assertTrue(this.invoke(map, "$toSortedComparing").equal([2, 3, 4]));
		this.assertTrue(JW.Array.equal(this.invoke(map, "toSortedComparing", [null, null, -1]), [4, 3, 2]));
		this.assertTrue(this.invoke(map, "$toSortedComparing", [null, null, -1]).equal([4, 3, 2]));
		this.assertTrue(JW.Array.equal(this.invoke(map, "toSortedComparing", [function(x, y) { return -JW.cmp(x, y); }]), [4, 3, 2]));
		this.assertTrue(this.invoke(map, "$toSortedComparing", [function(x, y) { return -JW.cmp(x, y); }]).equal([4, 3, 2]));
		this.assertTrue(JW.Array.equal(this.invoke(map, "toSortedComparing", [function(x, y) { return -JW.cmp(x, y); }, null, -1]), [2, 3, 4]));
		this.assertTrue(this.invoke(map, "$toSortedComparing", [function(x, y) { return -JW.cmp(x, y); }, null, -1]).equal([2, 3, 4]));
		this.assertTrue(this.invoke(map, "equal", [{a: 3, b: 2, c: 4}]));
	},

	testGetSortingKeys: function() {
		var map = this.createMap({a: 3, b: 2, c: 4});
		this.assertTrue(JW.Array.equal(this.invoke(map, "getSortingKeys"), ["b", "a", "c"]));
		this.assertTrue(this.invoke(map, "$getSortingKeys").equal(["b", "a", "c"]));
		this.assertTrue(JW.Array.equal(this.invoke(map, "getSortingKeys", [null, null, -1]), ["c", "a", "b"]));
		this.assertTrue(this.invoke(map, "$getSortingKeys", [null, null, -1]).equal(["c", "a", "b"]));
		this.assertTrue(JW.Array.equal(this.invoke(map, "getSortingKeys", [function(x) { return -x; }]), ["c", "a", "b"]));
		this.assertTrue(this.invoke(map, "$getSortingKeys", [function(x) { return -x; }]).equal(["c", "a", "b"]));
		this.assertTrue(JW.Array.equal(this.invoke(map, "getSortingKeys", [function(x) { return -x; }, null, -1]), ["b", "a", "c"]));
		this.assertTrue(this.invoke(map, "$getSortingKeys", [function(x) { return -x; }, null, -1]).equal(["b", "a", "c"]));
		this.assertTrue(this.invoke(map, "equal", [{a: 3, b: 2, c: 4}]));
	},

	testGetSortingKeysComparing: function() {
		var map = this.createMap({a: 3, b: 2, c: 4});
		this.assertTrue(JW.Array.equal(this.invoke(map, "getSortingKeysComparing"), ["b", "a", "c"]));
		this.assertTrue(this.invoke(map, "$getSortingKeysComparing").equal(["b", "a", "c"]));
		this.assertTrue(JW.Array.equal(this.invoke(map, "getSortingKeysComparing", [null, null, -1]), ["c", "a", "b"]));
		this.assertTrue(this.invoke(map, "$getSortingKeysComparing", [null, null, -1]).equal(["c", "a", "b"]));
		this.assertTrue(JW.Array.equal(this.invoke(map, "getSortingKeysComparing", [function(x, y) { return -JW.cmp(x, y); }]), ["c", "a", "b"]));
		this.assertTrue(this.invoke(map, "$getSortingKeysComparing", [function(x, y) { return -JW.cmp(x, y); }]).equal(["c", "a", "b"]));
		this.assertTrue(JW.Array.equal(this.invoke(map, "getSortingKeysComparing", [function(x, y) { return -JW.cmp(x, y); }, null, -1]), ["b", "a", "c"]));
		this.assertTrue(this.invoke(map, "$getSortingKeysComparing", [function(x, y) { return -JW.cmp(x, y); }, null, -1]).equal(["b", "a", "c"]));
		this.assertTrue(this.invoke(map, "equal", [{a: 3, b: 2, c: 4}]));
	},

	testIndex: function() {
		var map = this.createMap({a: 2, b: 4});
		this.assertTrue(JW.Map.equal(this.invoke(map, "index", [function(x) { return x + 1; }]), {"3": 2, "5": 4}));
		this.assertTrue(this.invoke(map, "$index", [function(x) { return x + 1; }]).equal({"3": 2, "5": 4}));
		this.assertTrue(this.invoke(map, "equal", [{a: 2, b: 4}]));
	},

	testToSet: function() {
		var items = [new JW.Proxy(), new JW.Proxy()];
		var map = this.createMap({a: items[0], b: items[1]});
		this.assertTrue(JW.Set.equal(this.invoke(map, "toSet"), items));
		this.assertTrue(this.invoke(map, "$toSet").equal(items));
		this.assertTrue(this.invoke(map, "equal", [{a: items[0], b: items[1]}]));
	},

	testAsSet: function() {
		var items = [new JW.Proxy(), new JW.Proxy()];
		var map = this.createMap({a: items[0], b: items[1]});
		this.assertTrue(JW.Set.equal(this.invoke(map, "asSet"), items));
		this.assertTrue(this.invoke(map, "$asSet").equal(items));
		this.assertTrue(this.invoke(map, "equal", [{a: items[0], b: items[1]}]));
	},

	testSet: function() {
		var map = this.createMap({a: 2, b: 4});

		this.setObservableOutput();
		this.assertStrictEqual(4, this.invoke(map, "set", [4, "b"]));
		this.assertTrue(this.invoke(map, "equal", [{a: 2, b: 4}]));

		this.setObservableOutput(
			"Spliced -{b:4} +{b:3}",
			"Changed"
		);
		this.assertStrictEqual(4, this.invoke(map, "set", [3, "b"]));
		this.assertTrue(this.invoke(map, "equal", [{a: 2, b: 3}]));

		this.setObservableOutput(
			"Changed size from 2 to 3",
			"Spliced -{} +{c:5}",
			"Changed"
		);
		this.assertUndefined(this.invoke(map, "set", [5, "c"]));
		this.assertTrue(this.invoke(map, "equal", [{a: 2, b: 3, c: 5}]));
	},

	testTrySet: function() {
		var map = this.createMap({a: 2, b: 4});

		this.setObservableOutput();
		this.assertUndefined(this.invoke(map, "trySet", [4, "b"]));
		this.assertTrue(this.invoke(map, "equal", [{a: 2, b: 4}]));

		this.setObservableOutput(
			"Spliced -{b:4} +{b:3}",
			"Changed"
		);
		this.assertStrictEqual(4, this.invoke(map, "trySet", [3, "b"]).value);
		this.assertTrue(this.invoke(map, "equal", [{a: 2, b: 3}]));

		this.setObservableOutput(
			"Changed size from 2 to 3",
			"Spliced -{} +{c:5}",
			"Changed"
		);
		this.assertUndefined(this.invoke(map, "trySet", [5, "c"]).value);
		this.assertTrue(this.invoke(map, "equal", [{a: 2, b: 3, c: 5}]));
	},

	testSetAll: function() {
		var map = this.createMap({a: 2, b: 4, c: 5});

		this.setObservableOutput();
		this.invoke(map, "setAll", [{}]);
		this.assertTrue(this.invoke(map, "equal", [{a: 2, b: 4, c: 5}]));

		this.setObservableOutput();
		this.invoke(map, "setAll", [{a: 2, b: 4}]);
		this.assertTrue(this.invoke(map, "equal", [{a: 2, b: 4, c: 5}]));

		this.setObservableOutput(
			"Changed size from 3 to 4",
			"Spliced -{b:4} +{b:3,d:6}",
			"Changed"
		);
		this.invoke(map, "setAll", [{b: 3, c: 5, d: 6}]);
		this.assertTrue(this.invoke(map, "equal", [{a: 2, b: 3, c: 5, d: 6}]));
	},

	testSetAllVerbose: function() {
		var map = this.createMap({a: 2, b: 4, c: 5});
		var empty = new JW.AbstractMap.SpliceResult({}, {});

		this.setObservableOutput();
		JW.Tests.Collection.assertMapSpliceResult(this, empty, this.invoke(map, "setAllVerbose", [{}]));
		this.assertTrue(this.invoke(map, "equal", [{a: 2, b: 4, c: 5}]));

		this.setObservableOutput();
		JW.Tests.Collection.assertMapSpliceResult(this, empty, this.invoke(map, "setAllVerbose", [{a: 2, b: 4}]));
		this.assertTrue(this.invoke(map, "equal", [{a: 2, b: 4, c: 5}]));

		this.setObservableOutput(
			"Changed size from 3 to 4",
			"Spliced -{b:4} +{b:3,d:6}",
			"Changed"
		);
		var expected = new JW.AbstractMap.SpliceResult({b: 4}, {b: 3, d: 6});
		JW.Tests.Collection.assertMapSpliceResult(this, expected, this.invoke(map, "setAllVerbose", [{b: 3, c: 5, d: 6}]));
		this.assertTrue(this.invoke(map, "equal", [{a: 2, b: 3, c: 5, d: 6}]));
	},

	testTrySetAll: function() {
		var map = this.createMap({a: 2, b: 4, c: 5});
		var empty = new JW.AbstractMap.SpliceResult({}, {});

		this.setObservableOutput();
		this.assertUndefined(this.invoke(map, "trySetAll", [{}]));
		this.assertTrue(this.invoke(map, "equal", [{a: 2, b: 4, c: 5}]));

		this.setObservableOutput();
		this.assertUndefined(this.invoke(map, "trySetAll", [{a: 2, b: 4}]));
		this.assertTrue(this.invoke(map, "equal", [{a: 2, b: 4, c: 5}]));

		this.setObservableOutput(
			"Changed size from 3 to 4",
			"Spliced -{b:4} +{b:3,d:6}",
			"Changed"
		);
		var expected = new JW.AbstractMap.SpliceResult({b: 4}, {b: 3, d: 6});
		JW.Tests.Collection.assertMapSpliceResult(this, expected, this.invoke(map, "trySetAll", [{b: 3, c: 5, d: 6}]));
		this.assertTrue(this.invoke(map, "equal", [{a: 2, b: 3, c: 5, d: 6}]));
	},

	testRemove: function() {
		var map = this.createMap({a: 2, b: 4});

		this.setObservableOutput();
		this.assertUndefined(this.invoke(map, "remove", ["c"]));
		this.assertTrue(this.invoke(map, "equal", [{a: 2, b: 4}]));

		this.setObservableOutput(
			"Changed size from 2 to 1",
			"Spliced -{b:4} +{}",
			"Changed"
		);
		this.assertStrictEqual(4, this.invoke(map, "remove", ["b"]));
		this.assertTrue(this.invoke(map, "equal", [{a: 2}]));
	},

	testTryRemove: function() {
		var map = this.createMap({a: 2, b: 4});

		this.setObservableOutput();
		this.assertUndefined(this.invoke(map, "tryRemove", ["c"]));
		this.assertTrue(this.invoke(map, "equal", [{a: 2, b: 4}]));

		this.setObservableOutput(
			"Changed size from 2 to 1",
			"Spliced -{b:4} +{}",
			"Changed"
		);
		this.assertStrictEqual(4, this.invoke(map, "tryRemove", ["b"]));
		this.assertTrue(this.invoke(map, "equal", [{a: 2}]));
	},

	testRemoveAll: function() {
		var map = this.createMap({a: 2, b: 4, c: 3});

		this.setObservableOutput();
		this.invoke(map, "removeAll", [[]]);
		this.assertTrue(this.invoke(map, "equal", [{a: 2, b: 4, c: 3}]));

		this.setObservableOutput();
		this.invoke(map, "removeAll", [["d", "e"]]);
		this.assertTrue(this.invoke(map, "equal", [{a: 2, b: 4, c: 3}]));

		this.setObservableOutput(
			"Changed size from 3 to 1",
			"Spliced -{b:4,c:3} +{}",
			"Changed"
		);
		this.invoke(map, "removeAll", [["b", "c", "d"]]);
		this.assertTrue(this.invoke(map, "equal", [{a: 2}]));
	},

	testRemoveAllVerbose: function() {
		var map = this.createMap({a: 2, b: 4, c: 3});

		this.setObservableOutput();
		this.assertTrue(JW.Map.equal(this.invoke(map, "removeAllVerbose", [[]]), {}));
		this.assertTrue(this.invoke(map, "equal", [{a: 2, b: 4, c: 3}]));

		this.setObservableOutput();
		this.assertTrue(JW.Map.equal(this.invoke(map, "removeAllVerbose", [["d", "e"]]), {}));
		this.assertTrue(this.invoke(map, "equal", [{a: 2, b: 4, c: 3}]));

		this.setObservableOutput(
			"Changed size from 3 to 1",
			"Spliced -{b:4,c:3} +{}",
			"Changed"
		);
		this.assertTrue(JW.Map.equal(this.invoke(map, "removeAllVerbose", [["b", "c", "d"]]), {b: 4, c: 3}));
		this.assertTrue(this.invoke(map, "equal", [{a: 2}]));
	},

	test$RemoveAllVerbose: function() {
		var map = this.createMap({a: 2, b: 4, c: 3});

		this.setObservableOutput();
		this.assertTrue(this.invoke(map, "$removeAllVerbose", [[]]).equal({}));
		this.assertTrue(this.invoke(map, "equal", [{a: 2, b: 4, c: 3}]));

		this.setObservableOutput();
		this.assertTrue(this.invoke(map, "$removeAllVerbose", [["d", "e"]]).equal({}));
		this.assertTrue(this.invoke(map, "equal", [{a: 2, b: 4, c: 3}]));

		this.setObservableOutput(
			"Changed size from 3 to 1",
			"Spliced -{b:4,c:3} +{}",
			"Changed"
		);
		this.assertTrue(this.invoke(map, "$removeAllVerbose", [["b", "c", "d"]]).equal({b: 4, c: 3}));
		this.assertTrue(this.invoke(map, "equal", [{a: 2}]));
	},

	testTryRemoveAll: function() {
		var map = this.createMap({a: 2, b: 4, c: 3});

		this.setObservableOutput();
		this.assertUndefined(this.invoke(map, "tryRemoveAll", [[]]), {});
		this.assertTrue(this.invoke(map, "equal", [{a: 2, b: 4, c: 3}]));

		this.setObservableOutput();
		this.assertUndefined(this.invoke(map, "tryRemoveAll", [["d", "e"]]), {});
		this.assertTrue(this.invoke(map, "equal", [{a: 2, b: 4, c: 3}]));

		this.setObservableOutput(
			"Changed size from 3 to 1",
			"Spliced -{b:4,c:3} +{}",
			"Changed"
		);
		this.assertTrue(JW.Map.equal(this.invoke(map, "tryRemoveAll", [["b", "c", "d"]]), {b: 4, c: 3}));
		this.assertTrue(this.invoke(map, "equal", [{a: 2}]));
	},

	testRemoveItem: function() {
		var map = this.createMap({a: 2, b: 4, c: 3, d: 4});

		this.setObservableOutput();
		this.invoke(map, "removeItem", [1]);
		this.assertTrue(this.invoke(map, "equal", [{a: 2, b: 4, c: 3, d: 4}]));

		this.setObservableOutput(
			"Changed size from 4 to 3",
			"Spliced -{b:4} +{}",
			"Changed"
		);
		this.invoke(map, "removeItem", [4]);
		this.assertTrue(this.invoke(map, "equal", [{a: 2, c: 3, d: 4}]));
	},

	testRemoveItems: function() {
		var a = new JW.Proxy("a");
		var b = new JW.Proxy("b");
		var c = new JW.Proxy("c");
		var d = new JW.Proxy("d");
		var map = this.createMap({a: a, b: b, c: a, d: c}, function(x) { return x.value; });

		this.setObservableOutput();
		this.invoke(map, "removeItems", [[]]);
		this.assertTrue(this.invoke(map, "equal", [{a: a, b: b, c: a, d: c}]));

		this.setObservableOutput();
		this.invoke(map, "removeItems", [[d]]);
		this.assertTrue(this.invoke(map, "equal", [{a: a, b: b, c: a, d: c}]));

		this.setObservableOutput(
			"Changed size from 4 to 1",
			"Spliced -{a:a,c:a,d:c} +{}",
			"Changed"
		);
		this.invoke(map, "removeItems", [[a, c]]);
		this.assertTrue(this.invoke(map, "equal", [{b: b}]));
	},

	testSetKey: function() {
		var map = this.createMap({a: 2, b: 4});

		this.setObservableOutput();
		this.assertStrictEqual(4, this.invoke(map, "setKey", ["b", "b"]));
		this.assertTrue(this.invoke(map, "equal", [{a: 2, b: 4}]));

		this.setObservableOutput(
			"Reindexed by {b:c}",
			"Changed"
		);
		this.assertStrictEqual(4, this.invoke(map, "setKey", ["b", "c"]));
		this.assertTrue(this.invoke(map, "equal", [{a: 2, c: 4}]));
	},

	testTrySetKey: function() {
		var map = this.createMap({a: 2, b: 4});

		this.setObservableOutput();
		this.assertUndefined(this.invoke(map, "trySetKey", ["b", "b"]));
		this.assertTrue(this.invoke(map, "equal", [{a: 2, b: 4}]));

		this.setObservableOutput(
			"Reindexed by {b:c}",
			"Changed"
		);
		this.assertStrictEqual(4, this.invoke(map, "trySetKey", ["b", "c"]));
		this.assertTrue(this.invoke(map, "equal", [{a: 2, c: 4}]));
	},

	testClear: function() {
		var map = this.createMap();

		this.setObservableOutput();
		this.assertTrue(JW.Map.equal(this.invoke(map, "clear"), {}));
		this.assertTrue(this.invoke(map, "$clear").equal({}));
		this.assertTrue(this.invoke(map, "equal", [{}]));

		var map = this.createMap({a: 2, b: 4});
		this.setObservableOutput(
			"Changed size from 2 to 0",
			"Cleared {a:2,b:4}",
			"Changed"
		);
		this.assertTrue(JW.Map.equal(this.invoke(map, "clear"), {a: 2, b: 4}));
		this.assertTrue(this.invoke(map, "equal", [{}]));

		var map = this.createMap({a: 2, b: 4});
		this.setObservableOutput(
			"Changed size from 2 to 0",
			"Cleared {a:2,b:4}",
			"Changed"
		);
		this.assertTrue(this.invoke(map, "$clear").equal({a: 2, b: 4}));
		this.assertTrue(this.invoke(map, "equal", [{}]));
	},

	testTryClear: function() {
		var map = this.createMap();

		this.setObservableOutput();
		this.assertUndefined(this.invoke(map, "tryClear"));
		this.assertTrue(this.invoke(map, "equal", [{}]));

		var map = this.createMap({a: 2, b: 4});
		this.setObservableOutput(
			"Changed size from 2 to 0",
			"Cleared {a:2,b:4}",
			"Changed"
		);
		this.assertTrue(JW.Map.equal(this.invoke(map, "tryClear"), {a: 2, b: 4}));
		this.assertTrue(this.invoke(map, "equal", [{}]));
	},

	testSplice: function() {
		var map = this.createMap({a: 1, b: 2, c: 3, d: 4});
		var empty = new JW.AbstractMap.SpliceResult({}, {});

		this.setObservableOutput();
		var got = this.invoke(map, "splice", [["e"], {c: 3}]);
		JW.Tests.Collection.assertMapSpliceResult(this, empty, got);
		this.assertTrue(this.invoke(map, "equal", [{a: 1, b: 2, c: 3, d: 4}]));

		this.setObservableOutput(
			"Changed size from 4 to 5",
			"Spliced -{a:1,b:2,d:4} +{b:3,d:6,e:5,f:7}",
			"Changed"
		);
		var expected = new JW.AbstractMap.SpliceResult({a: 1, b: 2, d: 4}, {b: 3, d: 6, e: 5, f: 7});
		var got = this.invoke(map, "splice", [["a", "b", "e", "g"], {b: 3, d: 6, e: 5, f: 7}]);
		JW.Tests.Collection.assertMapSpliceResult(this, expected, got);
		this.assertTrue(this.invoke(map, "equal", [{b: 3, c: 3, d: 6, e: 5, f: 7}]));
	},

	testTrySplice: function() {
		var map = this.createMap({a: 1, b: 2, c: 3, d: 4});

		this.setObservableOutput();
		this.assertUndefined(this.invoke(map, "trySplice", [["e"], {c: 3}]));
		this.assertTrue(this.invoke(map, "equal", [{a: 1, b: 2, c: 3, d: 4}]));

		this.setObservableOutput(
			"Changed size from 4 to 5",
			"Spliced -{a:1,b:2,d:4} +{b:3,d:6,e:5,f:7}",
			"Changed"
		);
		var expected = new JW.AbstractMap.SpliceResult({a: 1, b: 2, d: 4}, {b: 3, d: 6, e: 5, f: 7});
		var got = this.invoke(map, "trySplice", [["a", "b", "e", "g"], {b: 3, d: 6, e: 5, f: 7}]);
		JW.Tests.Collection.assertMapSpliceResult(this, expected, got);
		this.assertTrue(this.invoke(map, "equal", [{b: 3, c: 3, d: 6, e: 5, f: 7}]));
	},

	testReindex: function() {
		var map = this.createMap({a: 1, b: 2, c: 3, d: 4, e: 5});

		this.setObservableOutput();
		this.assertTrue(JW.Map.equal(this.invoke(map, "reindex", [{}]), {}));
		this.assertTrue(this.invoke(map, "equal", [{a: 1, b: 2, c: 3, d: 4, e: 5}]));

		this.setObservableOutput();
		this.assertTrue(JW.Map.equal(this.invoke(map, "reindex", [{b: "b", c: "c"}]), {}));
		this.assertTrue(this.invoke(map, "equal", [{a: 1, b: 2, c: 3, d: 4, e: 5}]));

		this.setObservableOutput(
			"Reindexed by {a:d,c:f,d:a}",
			"Changed"
		);
		this.assertTrue(JW.Map.equal(this.invoke(map, "reindex", [{a: "d", b: "b", c: "f", d: "a"}]), {a: "d", c: "f", d: "a"}));
		this.assertTrue(this.invoke(map, "equal", [{a: 4, b: 2, d: 1, e: 5, f: 3}]));
	},

	testTryReindex: function() {
		var map = this.createMap({a: 1, b: 2, c: 3, d: 4, e: 5});

		this.setObservableOutput();
		this.assertUndefined(this.invoke(map, "tryReindex", [{}]), {});
		this.assertTrue(this.invoke(map, "equal", [{a: 1, b: 2, c: 3, d: 4, e: 5}]));

		this.setObservableOutput();
		this.assertUndefined(this.invoke(map, "tryReindex", [{b: "b", c: "c"}]), {});
		this.assertTrue(this.invoke(map, "equal", [{a: 1, b: 2, c: 3, d: 4, e: 5}]));

		this.setObservableOutput(
			"Reindexed by {a:d,c:f,d:a}",
			"Changed"
		);
		this.assertTrue(JW.Map.equal(this.invoke(map, "tryReindex", [{a: "d", b: "b", c: "f", d: "a"}]), {a: "d", c: "f", d: "a"}));
		this.assertTrue(this.invoke(map, "equal", [{a: 4, b: 2, d: 1, e: 5, f: 3}]));
	},

	testPerformSplice: function() {
		var map = this.createMap({a: 1, b: 2, c: 3, d: 4});

		this.setObservableOutput();
		this.invoke(map, "performSplice", [{a: 1, b: 2, c: 3, d: 4}]);
		this.assertTrue(this.invoke(map, "equal", [{a: 1, b: 2, c: 3, d: 4}]));

		this.setObservableOutput(
			"Changed size from 4 to 5",
			"Spliced -{b:2,c:3} +{b:3,e:5,f:6}",
			"Changed"
		);
		this.invoke(map, "performSplice", [{a: 1, b: 3, d: 4, e: 5, f: 6}]);
		this.assertTrue(this.invoke(map, "equal", [{a: 1, b: 3, d: 4, e: 5, f: 6}]));
	},

	testPerformReindex: function() {
		var map = this.createMap({a: 1, b: 2, c: 3, d: 4, e: 5});

		this.setObservableOutput();
		this.invoke(map, "performReindex", [{a: 1, b: 2, c: 3, d: 4, e: 5}]);
		this.assertTrue(this.invoke(map, "equal", [{a: 1, b: 2, c: 3, d: 4, e: 5}]));

		this.setObservableOutput(
			"Reindexed by {a:d,c:f,d:a}",
			"Changed"
		);
		this.invoke(map, "performReindex", [{a: 4, b: 2, d: 1, e: 5, f: 3}]);
		this.assertTrue(this.invoke(map, "equal", [{a: 4, b: 2, d: 1, e: 5, f: 3}]));
	},

	testDetectSplice: function() {
		var map = this.createMap({a: 1, b: 2, c: 3, d: 4});

		this.assertUndefined(this.invoke(map, "detectSplice", [{a: 1, b: 2, c: 3, d: 4}]));
		this.assertTrue(this.invoke(map, "equal", [{a: 1, b: 2, c: 3, d: 4}]));

		var expected = new JW.AbstractMap.SpliceParams(["c"], {b: 3, e: 5, f: 6});
		var got = this.invoke(map, "detectSplice", [{a: 1, b: 3, d: 4, e: 5, f: 6}]);
		JW.Tests.Collection.assertMapSpliceParams(this, expected, got);
		this.assertTrue(this.invoke(map, "equal", [{a: 1, b: 2, c: 3, d: 4}]));
	},

	testDetectReindex: function() {
		var map = this.createMap({a: 1, b: 2, c: 3, d: 4, e: 5});

		this.assertUndefined(this.invoke(map, "detectReindex", [{a: 1, b: 2, c: 3, d: 4, e: 5}]));
		this.assertTrue(this.invoke(map, "equal", [{a: 1, b: 2, c: 3, d: 4, e: 5}]));

		var expected = {a: "d", c: "f", d: "a"};
		var got = this.invoke(map, "detectReindex", [{a: 4, b: 2, d: 1, e: 5, f: 3}]);
		this.assertTrue(JW.Map.equal(expected, got));
		this.assertTrue(this.invoke(map, "equal", [{a: 1, b: 2, c: 3, d: 4, e: 5}]));
	},

	testEqual: function() {
		var map = this.createMap({a: 2, b: 3});
		this.assertTrue(this.invoke(map, "equal", [{a: 2, b: 3}]));
		this.assertTrue(this.invoke(map, "equal", [{b: 3, a: 2}]));
		this.assertFalse(this.invoke(map, "equal", [{a: 2, b: 3, c: 4}]));
		this.assertFalse(this.invoke(map, "equal", [{a: 2}]));
		this.assertFalse(this.invoke(map, "equal", [{a: 3, b: 2}]));
		this.assertFalse(this.invoke(map, "equal", [{a: 2, b: 4}]));
		this.assertFalse(this.invoke(map, "equal", [{a: 1, b: 3}]));
	}
});

JW.Tests.Collection.AbstractMap = {};
