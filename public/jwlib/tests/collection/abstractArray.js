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

JW.Tests.Collection.AbstractArrayBase = JW.Unit.TestCase.extend({
	/*
	JW.AbstractArray createArray(items, formatter);
	Mixed invoke(target, method, args);
	*/

	setObservableOutput: function() {},

	testEmpty: function() {
		var array = this.createArray();
		this.assertStrictEqual(0, this.invoke(array, "getLength"));
		this.assertTrue(this.invoke(array, "isEmpty"));
		this.assertUndefined(this.invoke(array, "get", [0]));
		this.assertUndefined(this.invoke(array, "getFirst"));
		this.assertUndefined(this.invoke(array, "getFirstKey"));
		this.assertUndefined(this.invoke(array, "getLast"));
		this.assertUndefined(this.invoke(array, "getLastKey"));
		this.assertTrue(JW.Array.equal(this.invoke(array, "getKeys"), []));
		this.assertTrue(this.invoke(array, "$getKeys").equal([]));
		this.assertFalse(this.invoke(array, "containsItem", [0]));
		this.assertFalse(this.invoke(array, "containsKey", [0]));
		this.assertUndefined(this.invoke(array, "keyOf", [0]));
		this.assertStrictEqual(-1, this.invoke(array, "indexOf", [0]));
		this.assertTrue(this.invoke(array, "every", [JW.isInt]));
		this.assertFalse(this.invoke(array, "some", [JW.isInt]));
		this.assertUndefined(this.invoke(array, "search", [JW.isInt]));
		this.assertUndefined(this.invoke(array, "find", [JW.isInt]));
		this.assertTrue(JW.Array.equal(this.invoke(array, "filter", [JW.isInt]), []));
		this.assertTrue(this.invoke(array, "$filter", [JW.isInt]).equal([]));
		this.assertTrue(JW.Array.equal(this.invoke(array, "map", [function(x) { return x + 1; }]), []));
		this.assertTrue(this.invoke(array, "$map", [function(x) { return x + 1; }]).equal([]));
		this.assertTrue(JW.Array.equal(this.invoke(array, "toSorted"), []));
		this.assertTrue(this.invoke(array, "$toSorted").equal([]));
		this.assertTrue(JW.Array.equal(this.invoke(array, "toSortedComparing"), []));
		this.assertTrue(this.invoke(array, "$toSortedComparing").equal([]));
		this.assertTrue(JW.Array.equal(this.invoke(array, "getSortingKeys"), []));
		this.assertTrue(this.invoke(array, "$getSortingKeys").equal([]));
		this.assertTrue(JW.Array.equal(this.invoke(array, "getSortingKeysComparing"), []));
		this.assertTrue(this.invoke(array, "$getSortingKeysComparing").equal([]));
		this.assertTrue(JW.Map.equal(this.invoke(array, "index", [function(x) { return x; }]), {}));
		this.assertTrue(this.invoke(array, "$index", [function(x) { return x; }]).equal({}));
		this.assertTrue(JW.Array.equal(this.invoke(array, "toArray"), []));
		this.assertTrue(this.invoke(array, "$toArray").equal([]));
		this.assertTrue(JW.Map.equal(this.invoke(array, "toMap"), {}));
		this.assertTrue(this.invoke(array, "$toMap").equal({}));
		this.assertTrue(JW.Set.equal(this.invoke(array, "toSet"), []));
		this.assertTrue(this.invoke(array, "$toSet").equal([]));
		this.assertTrue(JW.Array.equal(this.invoke(array, "asArray"), []));
		this.assertTrue(this.invoke(array, "$asArray").equal([]));
		this.assertTrue(JW.Map.equal(this.invoke(array, "asMap"), {}));
		this.assertTrue(this.invoke(array, "$asMap").equal({}));
		this.assertTrue(JW.Set.equal(this.invoke(array, "asSet"), []));
		this.assertTrue(this.invoke(array, "$asSet").equal([]));
		this.assertTrue(this.invoke(array, "backEvery", [JW.isInt]));
	},

	testItems: function() {
		var array = this.createArray([2, 4]);
		this.assertStrictEqual(2, this.invoke(array, "getLength"));
		this.assertFalse(this.invoke(array, "isEmpty"));
		this.assertStrictEqual(2, this.invoke(array, "get", [0]));
		this.assertStrictEqual(4, this.invoke(array, "get", [1]));
		this.assertStrictEqual(2, this.invoke(array, "getFirst"));
		this.assertStrictEqual(0, this.invoke(array, "getFirstKey"));
		this.assertStrictEqual(4, this.invoke(array, "getLast"));
		this.assertStrictEqual(1, this.invoke(array, "getLastKey"));
		this.assertTrue(JW.Array.equal(this.invoke(array, "getKeys"), [0, 1]));
		this.assertTrue(this.invoke(array, "$getKeys").equal([0, 1]));
		this.assertFalse(this.invoke(array, "containsItem", [0]));
		this.assertTrue(this.invoke(array, "containsItem", [2]));
		this.assertFalse(this.invoke(array, "containsKey", [2]));
		this.assertTrue(this.invoke(array, "containsKey", [0]));
		this.assertUndefined(this.invoke(array, "keyOf", [0]));
		this.assertStrictEqual(0, this.invoke(array, "keyOf", [2]));
		this.assertStrictEqual(-1, this.invoke(array, "indexOf", [0]));
		this.assertStrictEqual(0, this.invoke(array, "indexOf", [2]));
		this.assertTrue(this.invoke(array, "every", [JW.isInt]));
		this.assertTrue(this.invoke(array, "some", [JW.isInt]));
		this.assertStrictEqual(2, this.invoke(array, "search", [JW.isInt]));
		this.assertStrictEqual(0, this.invoke(array, "find", [JW.isInt]));
		this.assertTrue(JW.Array.equal(this.invoke(array, "filter", [JW.isInt]), [2, 4]));
		this.assertTrue(this.invoke(array, "$filter", [JW.isInt]).equal([2, 4]));
		this.assertTrue(JW.Array.equal(this.invoke(array, "map", [function(x) { return x + 1; }]), [3, 5]));
		this.assertTrue(this.invoke(array, "$map", [function(x) { return x + 1; }]).equal([3, 5]));
		this.assertTrue(JW.Array.equal(this.invoke(array, "toSorted"), [2, 4]));
		this.assertTrue(this.invoke(array, "$toSorted").equal([2, 4]));
		this.assertTrue(JW.Array.equal(this.invoke(array, "toSortedComparing"), [2, 4]));
		this.assertTrue(this.invoke(array, "$toSortedComparing").equal([2, 4]));
		this.assertTrue(JW.Array.equal(this.invoke(array, "getSortingKeys"), [0, 1]));
		this.assertTrue(this.invoke(array, "$getSortingKeys").equal([0, 1]));
		this.assertTrue(JW.Array.equal(this.invoke(array, "getSortingKeysComparing"), [0, 1]));
		this.assertTrue(this.invoke(array, "$getSortingKeysComparing").equal([0, 1]));
		this.assertTrue(JW.Map.equal(this.invoke(array, "index", [function(x) { return x; }]), {"2": 2, "4": 4}));
		this.assertTrue(this.invoke(array, "$index", [function(x) { return x; }]).equal({"2": 2, "4": 4}));
		this.assertTrue(JW.Array.equal(this.invoke(array, "toArray"), [2, 4]));
		this.assertTrue(this.invoke(array, "$toArray").equal([2, 4]));
		this.assertTrue(JW.Map.equal(this.invoke(array, "toMap"), {"0": 2, "1": 4}));
		this.assertTrue(this.invoke(array, "$toMap").equal({"0": 2, "1": 4}));
		//this.assertTrue(JW.Set.equal(array.toSet(), [2, 4]));
		//this.assertTrue(array.$toSet().equal([2, 4]));
		this.assertTrue(JW.Array.equal(this.invoke(array, "asArray"), [2, 4]));
		this.assertTrue(this.invoke(array, "$asArray").equal([2, 4]));
		this.assertTrue(JW.Map.equal(this.invoke(array, "asMap"), {"0": 2, "1": 4}));
		this.assertTrue(this.invoke(array, "$asMap").equal({"0": 2, "1": 4}));
		//this.assertTrue(JW.Set.equal(array.asSet(), [2, 4]));
		//this.assertTrue(array.$asSet().equal([2, 4]));
		this.assertTrue(this.invoke(array, "backEvery", [JW.isInt]));
	},

	testEvery: function() {
		var array = this.createArray([2, 3.5, 4]);
		this.assertTrue(this.invoke(array, "every", [JW.isNumber]));
		this.assertFalse(this.invoke(array, "every", [JW.isInt]));
		this.assertFalse(this.invoke(array, "every", [JW.isString]));

		this.setExpectedOutput(
			"2 at 0",
			"3.5 at 1",
			"4 at 2"
		);
		this.invoke(array, "every", [function(item, index) {
			this.output(item + " at " + index);
		}, this]);

		this.setExpectedOutput(
			"2 at 0",
			"3.5 at 1"
		);
		this.invoke(array, "every", [function(item, index) {
			this.output(item + " at " + index);
			return JW.isInt(item);
		}, this]);
	},

	testSome: function() {
		var array = this.createArray([2, 3.5, 4]);
		this.assertTrue(this.invoke(array, "some", [JW.isNumber]));
		this.assertTrue(this.invoke(array, "some", [JW.isInt]));
		this.assertFalse(this.invoke(array, "some", [JW.isString]));

		this.setExpectedOutput(
			"2 at 0"
		);
		this.invoke(array, "some", [function(item, index) {
			this.output(item + " at " + index);
		}, this]);

		this.setExpectedOutput(
			"2 at 0",
			"3.5 at 1"
		);
		this.invoke(array, "some", [function(item, index) {
			this.output(item + " at " + index);
			return !JW.isInt(item);
		}, this]);
	},

	testEach: function() {
		var array = this.createArray([2, 3.5, 4]);
		this.setExpectedOutput(
			"2 at 0",
			"3.5 at 1",
			"4 at 2"
		);
		this.invoke(array, "each", [function(item, index) {
			this.output(item + " at " + index);
			return false;
		}, this]);
	},

	testSearch: function() {
		var array = this.createArray([2.5, 3.5, 4]);
		this.assertStrictEqual(4, this.invoke(array, "search", [JW.isInt]));
	},

	testFind: function() {
		var array = this.createArray([2.5, 3.5, 4]);
		this.assertStrictEqual(2, this.invoke(array, "find", [JW.isInt]));
	},

	testFilter: function() {
		var array = this.createArray([2, 3.5, 4]);
		this.assertTrue(JW.Array.equal(this.invoke(array, "filter", [JW.isInt]), [2, 4]));
		this.assertTrue(this.invoke(array, "$filter", [JW.isInt]).equal([2, 4]));
		this.assertTrue(this.invoke(array, "equal", [[2, 3.5, 4]]));
	},

	testCount: function() {
		var array = this.createArray([2, 3.5, 4]);
		this.assertStrictEqual(2, this.invoke(array, "count", [JW.isInt]));
		this.assertTrue(this.invoke(array, "equal", [[2, 3.5, 4]]));
	},

	testMap: function() {
		var array = this.createArray([2, 4]);
		this.assertTrue(JW.Array.equal(this.invoke(array, "map", [function(x) { return x + 1; }]), [3, 5]));
		this.assertTrue(this.invoke(array, "$map", [function(x) { return x + 1; }]).equal([3, 5]));
		this.assertTrue(this.invoke(array, "equal", [[2, 4]]));
	},

	testToSorted: function() {
		var array = this.createArray([3, 2, 4]);
		this.assertTrue(JW.Array.equal(this.invoke(array, "toSorted"), [2, 3, 4]));
		this.assertTrue(this.invoke(array, "$toSorted").equal([2, 3, 4]));
		this.assertTrue(JW.Array.equal(this.invoke(array, "toSorted", [null, null, -1]), [4, 3, 2]));
		this.assertTrue(this.invoke(array, "$toSorted", [null, null, -1]).equal([4, 3, 2]));
		this.assertTrue(JW.Array.equal(this.invoke(array, "toSorted", [function(x) { return -x; }]), [4, 3, 2]));
		this.assertTrue(this.invoke(array, "$toSorted", [function(x) { return -x; }]).equal([4, 3, 2]));
		this.assertTrue(JW.Array.equal(this.invoke(array, "toSorted", [function(x) { return -x; }, null, -1]), [2, 3, 4]));
		this.assertTrue(this.invoke(array, "$toSorted", [function(x) { return -x; }, null, -1]).equal([2, 3, 4]));
		this.assertTrue(this.invoke(array, "equal", [[3, 2, 4]]));
	},

	testToSortedComparing: function() {
		var array = this.createArray([3, 2, 4]);
		this.assertTrue(JW.Array.equal(this.invoke(array, "toSortedComparing"), [2, 3, 4]));
		this.assertTrue(this.invoke(array, "$toSortedComparing").equal([2, 3, 4]));
		this.assertTrue(JW.Array.equal(this.invoke(array, "toSortedComparing", [null, null, -1]), [4, 3, 2]));
		this.assertTrue(this.invoke(array, "$toSortedComparing", [null, null, -1]).equal([4, 3, 2]));
		this.assertTrue(JW.Array.equal(this.invoke(array, "toSortedComparing", [function(x, y) { return -JW.cmp(x, y); }]), [4, 3, 2]));
		this.assertTrue(this.invoke(array, "$toSortedComparing", [function(x, y) { return -JW.cmp(x, y); }]).equal([4, 3, 2]));
		this.assertTrue(JW.Array.equal(this.invoke(array, "toSortedComparing", [function(x, y) { return -JW.cmp(x, y); }, null, -1]), [2, 3, 4]));
		this.assertTrue(this.invoke(array, "$toSortedComparing", [function(x, y) { return -JW.cmp(x, y); }, null, -1]).equal([2, 3, 4]));
		this.assertTrue(this.invoke(array, "equal", [[3, 2, 4]]));
	},

	testGetSortingKeys: function() {
		var array = this.createArray([3, 2, 4]);
		this.assertTrue(JW.Array.equal(this.invoke(array, "getSortingKeys"), [1, 0, 2]));
		this.assertTrue(this.invoke(array, "$getSortingKeys").equal([1, 0, 2]));
		this.assertTrue(JW.Array.equal(this.invoke(array, "getSortingKeys", [null, null, -1]), [2, 0, 1]));
		this.assertTrue(this.invoke(array, "$getSortingKeys", [null, null, -1]).equal([2, 0, 1]));
		this.assertTrue(JW.Array.equal(this.invoke(array, "getSortingKeys", [function(x) { return -x; }]), [2, 0, 1]));
		this.assertTrue(this.invoke(array, "$getSortingKeys", [function(x) { return -x; }]).equal([2, 0, 1]));
		this.assertTrue(JW.Array.equal(this.invoke(array, "getSortingKeys", [function(x) { return -x; }, null, -1]), [1, 0, 2]));
		this.assertTrue(this.invoke(array, "$getSortingKeys", [function(x) { return -x; }, null, -1]).equal([1, 0, 2]));
		this.assertTrue(this.invoke(array, "equal", [[3, 2, 4]]));
	},

	testGetSortingKeysComparing: function() {
		var array = this.createArray([3, 2, 4]);
		this.assertTrue(JW.Array.equal(this.invoke(array, "getSortingKeysComparing"), [1, 0, 2]));
		this.assertTrue(this.invoke(array, "$getSortingKeysComparing").equal([1, 0, 2]));
		this.assertTrue(JW.Array.equal(this.invoke(array, "getSortingKeysComparing", [null, null, -1]), [2, 0, 1]));
		this.assertTrue(this.invoke(array, "$getSortingKeysComparing", [null, null, -1]).equal([2, 0, 1]));
		this.assertTrue(JW.Array.equal(this.invoke(array, "getSortingKeysComparing", [function(x, y) { return -JW.cmp(x, y); }]), [2, 0, 1]));
		this.assertTrue(this.invoke(array, "$getSortingKeysComparing", [function(x, y) { return -JW.cmp(x, y); }]).equal([2, 0, 1]));
		this.assertTrue(JW.Array.equal(this.invoke(array, "getSortingKeysComparing", [function(x, y) { return -JW.cmp(x, y); }, null, -1]), [1, 0, 2]));
		this.assertTrue(this.invoke(array, "$getSortingKeysComparing", [function(x, y) { return -JW.cmp(x, y); }, null, -1]).equal([1, 0, 2]));
		this.assertTrue(this.invoke(array, "equal", [[3, 2, 4]]));
	},

	testIndex: function() {
		var array = this.createArray([2, 4]);
		this.assertTrue(JW.Map.equal(this.invoke(array, "index", [function(x) { return x + 1; }]), {"3": 2, "5": 4}));
		this.assertTrue(this.invoke(array, "$index", [function(x) { return x + 1; }]).equal({"3": 2, "5": 4}));
		this.assertTrue(this.invoke(array, "equal", [[2, 4]]));
	},

	testToSet: function() {
		var items = [new JW.Proxy(), new JW.Proxy()];
		var array = this.createArray(items);
		this.assertTrue(JW.Set.equal(this.invoke(array, "toSet"), items));
		this.assertTrue(this.invoke(array, "$toSet").equal(items));
		this.assertTrue(this.invoke(array, "equal", [items]));
	},

	testAsSet: function() {
		var items = [new JW.Proxy(), new JW.Proxy()];
		var array = this.createArray(items);
		this.assertTrue(JW.Set.equal(this.invoke(array, "asSet"), items));
		this.assertTrue(this.invoke(array, "$asSet").equal(items));
		this.assertTrue(this.invoke(array, "equal", [items]));
	},

	testBackEvery: function() {
		var array = this.createArray([2, 3.5, 4]);
		this.assertTrue(this.invoke(array, "backEvery", [JW.isNumber]));
		this.assertFalse(this.invoke(array, "backEvery", [JW.isInt]));
		this.assertFalse(this.invoke(array, "backEvery", [JW.isString]));

		this.setExpectedOutput(
			"4 at 2",
			"3.5 at 1",
			"2 at 0"
		);
		this.invoke(array, "backEvery", [function(item, index) {
			this.output(item + " at " + index);
		}, this]);

		this.setExpectedOutput(
			"4 at 2",
			"3.5 at 1"
		);
		this.invoke(array, "backEvery", [function(item, index) {
			this.output(item + " at " + index);
			return JW.isInt(item);
		}, this]);
	},

	testAdd: function() {
		var array = this.createArray([2, 4]);

		this.setObservableOutput(
			"Changed length from 2 to 3",
			"Spliced -[] +[2:[3]] to [2,4]",
			"Changed"
		);
		this.invoke(array, "add", [3]);
		this.assertTrue(this.invoke(array, "equal", [[2, 4, 3]]));
	},

	testTryAdd: function() {
		var array = this.createArray([2, 4]);

		this.setObservableOutput(
			"Changed length from 2 to 3",
			"Spliced -[] +[2:[3]] to [2,4]",
			"Changed"
		);
		this.assertTrue(this.invoke(array, "tryAdd", [3]));
		this.assertTrue(this.invoke(array, "equal", [[2, 4, 3]]));
	},

	testAddAll: function() {
		var array = this.createArray([2, 4]);

		this.setObservableOutput(
			"Changed length from 2 to 4",
			"Spliced -[] +[2:[3,5]] to [2,4]",
			"Changed"
		);
		this.invoke(array, "addAll", [[3, 5]]);
		this.assertTrue(this.invoke(array, "equal", [[2, 4, 3, 5]]));
	},

	testTryAddAll: function() {
		var array = this.createArray([2, 4]);

		this.setObservableOutput(
			"Changed length from 2 to 4",
			"Spliced -[] +[2:[3,5]] to [2,4]",
			"Changed",
			"Changed length from 4 to 6",
			"Spliced -[] +[1:[6,7]] to [2,4,3,5]",
			"Changed"
		);
		this.assertTrue(this.invoke(array, "tryAddAll", [[3, 5]]));
		this.assertTrue(this.invoke(array, "equal", [[2, 4, 3, 5]]));
		this.assertTrue(this.invoke(array, "tryAddAll", [[6, 7], 1]));
		this.assertTrue(this.invoke(array, "equal", [[2, 6, 7, 4, 3, 5]]));
	},

	testSet: function() {
		var array = this.createArray([2, 4]);

		this.setObservableOutput();
		this.assertStrictEqual(4, this.invoke(array, "set", [4, 1]));
		this.assertTrue(this.invoke(array, "equal", [[2, 4]]));

		this.setObservableOutput(
			"Replaced 4 with 3 at 1",
			"Changed"
		);
		this.assertStrictEqual(4, this.invoke(array, "set", [3, 1]));
		this.assertTrue(this.invoke(array, "equal", [[2, 3]]));
	},

	testTrySet: function() {
		var array = this.createArray([2, 4]);

		this.setObservableOutput();
		this.assertUndefined(this.invoke(array, "trySet", [4, 1]));
		this.assertTrue(this.invoke(array, "equal", [[2, 4]]));

		this.setObservableOutput(
			"Replaced 4 with 3 at 1",
			"Changed"
		);
		this.assertStrictEqual(4, this.invoke(array, "trySet", [3, 1]).value);
		this.assertTrue(this.invoke(array, "equal", [[2, 3]]));
	},

	testRemove: function() {
		var array = this.createArray([2, 4, 3]);

		this.setObservableOutput(
			"Changed length from 3 to 2",
			"Spliced -[1:[4]] +[] to [2,4,3]",
			"Changed"
		);
		this.assertStrictEqual(4, this.invoke(array, "remove", [1]));
		this.assertTrue(this.invoke(array, "equal", [[2, 3]]));
	},

	testTryRemove: function() {
		var array = this.createArray([2, 4, 3]);

		this.setObservableOutput(
			"Changed length from 3 to 2",
			"Spliced -[1:[4]] +[] to [2,4,3]",
			"Changed"
		);
		this.assertStrictEqual(4, this.invoke(array, "tryRemove", [1]));
		this.assertTrue(this.invoke(array, "equal", [[2, 3]]));
	},

	testRemoveAll: function() {
		var array = this.createArray([2, 4, 3]);

		this.setObservableOutput();
		this.assertTrue(JW.Array.equal(this.invoke(array, "removeAll", [1, 0]), []));
		this.assertTrue(this.invoke(array, "equal", [[2, 4, 3]]));

		this.setObservableOutput(
			"Changed length from 3 to 1",
			"Spliced -[1:[4,3]] +[] to [2,4,3]",
			"Changed"
		);
		this.assertTrue(JW.Array.equal(this.invoke(array, "removeAll", [1, 2]), [4, 3]));
		this.assertTrue(this.invoke(array, "equal", [[2]]));

		var array = this.createArray([2, 4, 3]);

		this.setObservableOutput();
		this.assertTrue(this.invoke(array, "$removeAll", [1, 0]).equal([]));
		this.assertTrue(this.invoke(array, "equal", [[2, 4, 3]]));

		this.setObservableOutput(
			"Changed length from 3 to 1",
			"Spliced -[1:[4,3]] +[] to [2,4,3]",
			"Changed"
		);
		this.assertTrue(this.invoke(array, "$removeAll", [1, 2]).equal([4, 3]));
		this.assertTrue(this.invoke(array, "equal", [[2]]));
	},

	testTryRemoveAll: function() {
		var array = this.createArray([2, 4, 3]);

		this.setObservableOutput();
		this.assertUndefined(this.invoke(array, "tryRemoveAll", [1, 0]));
		this.assertTrue(this.invoke(array, "equal", [[2, 4, 3]]));

		this.setObservableOutput(
			"Changed length from 3 to 1",
			"Spliced -[1:[4,3]] +[] to [2,4,3]",
			"Changed"
		);
		this.assertTrue(JW.Array.equal(this.invoke(array, "tryRemoveAll", [1, 2]), [4, 3]));
		this.assertTrue(this.invoke(array, "equal", [[2]]));
	},

	testRemoveItem: function() {
		var array = this.createArray([2, 4, 3, 4]);
		this.setObservableOutput();
		this.invoke(array, "removeItem", [1]);
		this.assertTrue(this.invoke(array, "equal", [[2, 4, 3, 4]]));

		this.setObservableOutput(
			"Changed length from 4 to 3",
			"Spliced -[1:[4]] +[] to [2,4,3,4]",
			"Changed"
		);
		this.invoke(array, "removeItem", [4]);
		this.assertTrue(this.invoke(array, "equal", [[2, 3, 4]]));
	},

	testRemoveItems: function() {
		var a = new JW.Proxy("a");
		var b = new JW.Proxy("b");
		var c = new JW.Proxy("c");
		var d = new JW.Proxy("d");
		var array = this.createArray([a, b, a, c], function(x) { return x.value; });

		this.setObservableOutput();
		this.invoke(array, "removeItems", [[]]);
		this.assertTrue(this.invoke(array, "equal", [[a, b, a, c]]));

		this.setObservableOutput();
		this.invoke(array, "removeItems", [[d]]);
		this.assertTrue(this.invoke(array, "equal", [[a, b, a, c]]));

		this.setObservableOutput(
			"Changed length from 4 to 1",
			"Spliced -[0:[a],2:[a,c]] +[] to [a,b,a,c]",
			"Changed"
		);
		this.invoke(array, "removeItems", [[a, c]]);
		this.assertTrue(this.invoke(array, "equal", [[b]]));
	},

	testPop: function() {
		var array = this.createArray([2, 4, 3]);

		this.setObservableOutput(
			"Changed length from 3 to 2",
			"Spliced -[2:[3]] +[] to [2,4,3]",
			"Changed"
		);
		this.assertStrictEqual(3, this.invoke(array, "pop"));
		this.assertTrue(this.invoke(array, "equal", [[2, 4]]));
	},

	testMove: function() {
		var array = this.createArray([2, 4, 3]);

		this.setObservableOutput();
		this.assertStrictEqual(4, this.invoke(array, "move", [1, 1]));
		this.assertTrue(this.invoke(array, "equal", [[2, 4, 3]]));

		this.setObservableOutput(
			"Moved 4 from 1 to 0",
			"Changed"
		);
		this.assertStrictEqual(4, this.invoke(array, "move", [1, 0]));
		this.assertTrue(this.invoke(array, "equal", [[4, 2, 3]]));
	},

	testTryMove: function() {
		var array = this.createArray([2, 4, 3]);

		this.setObservableOutput();
		this.assertUndefined(this.invoke(array, "tryMove", [1, 1]));
		this.assertTrue(this.invoke(array, "equal", [[2, 4, 3]]));

		this.setObservableOutput(
			"Moved 4 from 1 to 0",
			"Changed"
		);
		this.assertStrictEqual(4, this.invoke(array, "tryMove", [1, 0]));
		this.assertTrue(this.invoke(array, "equal", [[4, 2, 3]]));
	},

	testClear: function() {
		var array = this.createArray();

		this.setObservableOutput();
		this.assertTrue(JW.Array.equal(this.invoke(array, "clear"), []));
		this.assertTrue(this.invoke(array, "$clear").equal([]));
		this.assertTrue(this.invoke(array, "equal", [[]]));

		var array = this.createArray([2, 4, 3]);

		this.setObservableOutput(
			"Changed length from 3 to 0",
			"Cleared [2,4,3]",
			"Changed"
		);
		this.assertTrue(JW.Array.equal(this.invoke(array, "clear"), [2, 4, 3]));
		this.assertTrue(this.invoke(array, "equal", [[]]));

		var array = this.createArray([2, 4, 3]);

		this.setObservableOutput(
			"Changed length from 3 to 0",
			"Cleared [2,4,3]",
			"Changed"
		);
		this.assertTrue(this.invoke(array, "$clear").equal([2, 4, 3]));
		this.assertTrue(this.invoke(array, "equal", [[]]));
	},

	testTryClear: function() {
		var array = this.createArray();

		this.setObservableOutput();
		this.assertUndefined(this.invoke(array, "tryClear"), []);
		this.assertTrue(this.invoke(array, "equal", [[]]));

		var array = this.createArray([2, 4, 3]);

		this.setObservableOutput(
			"Changed length from 3 to 0",
			"Cleared [2,4,3]",
			"Changed"
		);
		this.assertTrue(JW.Array.equal(this.invoke(array, "tryClear"), [2, 4, 3]));
		this.assertTrue(this.invoke(array, "equal", [[]]));
	},

	testSplice: function() {
		var array = this.createArray([1, 2, 3, 4, 5, 6]);

		this.setObservableOutput();
		var expected = new JW.AbstractArray.SpliceResult([1, 2, 3, 4, 5, 6], [], []);
		var got = this.invoke(array, "splice", [[
			new JW.AbstractArray.IndexCount(1, 0),
			new JW.AbstractArray.IndexCount(3, 0),
		], [
			new JW.AbstractArray.IndexItems(3, []),
		]]);
		JW.Tests.Collection.assertArraySpliceResult(this, expected, got);
		this.assertTrue(this.invoke(array, "equal", [[1, 2, 3, 4, 5, 6]]));

		this.setObservableOutput(
			"Spliced -[1:[2,3],4:[5,6]] +[0:[7,8,10],5:[9]] to [1,2,3,4,5,6]",
			"Changed"
		);
		var expected = new JW.AbstractArray.SpliceResult([1, 2, 3, 4, 5, 6], [
			new JW.AbstractArray.IndexItems(1, [2, 3]),
			new JW.AbstractArray.IndexItems(4, [5, 6])
		], [
			new JW.AbstractArray.IndexItems(0, [7, 8, 10]),
			new JW.AbstractArray.IndexItems(5, [9])
		]);
		var got = this.invoke(array, "splice", [[
			new JW.AbstractArray.IndexCount(1, 1),
			new JW.AbstractArray.IndexCount(2, 0),
			new JW.AbstractArray.IndexCount(2, 1),
			new JW.AbstractArray.IndexCount(3, 0),
			new JW.AbstractArray.IndexCount(4, 2)
		], [
			new JW.AbstractArray.IndexItems(0, [7, 8]),
			new JW.AbstractArray.IndexItems(2, []),
			new JW.AbstractArray.IndexItems(2, [10]),
			new JW.AbstractArray.IndexItems(4, []),
			new JW.AbstractArray.IndexItems(5, [9])
		]]);
		JW.Tests.Collection.assertArraySpliceResult(this, expected, got);
		this.assertTrue(this.invoke(array, "equal", [[7, 8, 10, 1, 4, 9]]));
	},

	testTrySplice: function() {
		var array = this.createArray([1, 2, 3, 4, 5, 6]);

		this.setObservableOutput();
		this.assertUndefined(this.invoke(array, "trySplice", [[
			new JW.AbstractArray.IndexCount(1, 0),
			new JW.AbstractArray.IndexCount(3, 0),
		], [
			new JW.AbstractArray.IndexItems(3, []),
		]]));
		this.assertTrue(this.invoke(array, "equal", [[1, 2, 3, 4, 5, 6]]));

		this.setObservableOutput(
			"Spliced -[1:[2,3],4:[5,6]] +[0:[7,8,10],5:[9]] to [1,2,3,4,5,6]",
			"Changed"
		);
		var expected = new JW.AbstractArray.SpliceResult([1, 2, 3, 4, 5, 6], [
			new JW.AbstractArray.IndexItems(1, [2, 3]),
			new JW.AbstractArray.IndexItems(4, [5, 6])
		], [
			new JW.AbstractArray.IndexItems(0, [7, 8, 10]),
			new JW.AbstractArray.IndexItems(5, [9])
		]);
		var got = this.invoke(array, "trySplice", [[
			new JW.AbstractArray.IndexCount(1, 1),
			new JW.AbstractArray.IndexCount(2, 0),
			new JW.AbstractArray.IndexCount(2, 1),
			new JW.AbstractArray.IndexCount(3, 0),
			new JW.AbstractArray.IndexCount(4, 2)
		], [
			new JW.AbstractArray.IndexItems(0, [7, 8]),
			new JW.AbstractArray.IndexItems(2, []),
			new JW.AbstractArray.IndexItems(2, [10]),
			new JW.AbstractArray.IndexItems(4, []),
			new JW.AbstractArray.IndexItems(5, [9])
		]]);
		JW.Tests.Collection.assertArraySpliceResult(this, expected, got);
		this.assertTrue(this.invoke(array, "equal", [[7, 8, 10, 1, 4, 9]]));
	},

	testReorder: function() {
		var array = this.createArray([1, 2, 3, 4, 5, 6]);

		this.setObservableOutput();
		this.invoke(array, "reorder", [[0, 1, 2, 3, 4, 5]]);
		this.assertTrue(this.invoke(array, "equal", [[1, 2, 3, 4, 5, 6]]));

		this.setObservableOutput(
			"Reordered [1,2,3,4,5,6] by [2,1,4,5,0,3]",
			"Changed"
		);
		this.invoke(array, "reorder", [[2, 1, 4, 5, 0, 3]]);
		this.assertTrue(this.invoke(array, "equal", [[5, 2, 1, 6, 3, 4]]));
	},

	testTryReorder: function() {
		var array = this.createArray([1, 2, 3, 4, 5, 6]);

		this.setObservableOutput();
		this.assertUndefined(this.invoke(array, "tryReorder", [[0, 1, 2, 3, 4, 5]]));
		this.assertTrue(this.invoke(array, "equal", [[1, 2, 3, 4, 5, 6]]));

		this.setObservableOutput(
			"Reordered [1,2,3,4,5,6] by [2,1,4,5,0,3]",
			"Changed"
		);
		this.assertTrue(JW.Array.equal(this.invoke(array, "tryReorder", [[2, 1, 4, 5, 0, 3]]), [1, 2, 3, 4, 5, 6]));
		this.assertTrue(this.invoke(array, "equal", [[5, 2, 1, 6, 3, 4]]));
	},

	testSort: function() {
		var array = this.createArray([1, 2, 3, 4, 5, 6]);

		this.setObservableOutput();
		this.invoke(array, "sort");
		this.assertTrue(this.invoke(array, "equal", [[1, 2, 3, 4, 5, 6]]));

		var array = this.createArray([5, 2, 1, 6, 3, 4]);

		this.setObservableOutput(
			"Reordered [5,2,1,6,3,4] by [4,1,0,5,2,3]",
			"Changed"
		);
		this.invoke(array, "sort");
		this.assertTrue(this.invoke(array, "equal", [[1, 2, 3, 4, 5, 6]]));

		var array = this.createArray([5, 2, 1, 6, 3, 4]);

		this.setObservableOutput(
			"Reordered [5,2,1,6,3,4] by [1,4,5,0,3,2]",
			"Changed"
		);
		this.invoke(array, "sort", [function(x) { return -x; }]);
		this.assertTrue(this.invoke(array, "equal", [[6, 5, 4, 3, 2, 1]]));

		var array = this.createArray([5, 2, 1, 6, 3, 4]);

		this.setObservableOutput(
			"Reordered [5,2,1,6,3,4] by [1,4,5,0,3,2]",
			"Changed"
		);
		this.invoke(array, "sort", [null, null, -1]);
		this.assertTrue(this.invoke(array, "equal", [[6, 5, 4, 3, 2, 1]]));

		var array = this.createArray([5, 2, 1, 6, 3, 4]);

		this.setObservableOutput(
			"Reordered [5,2,1,6,3,4] by [4,1,0,5,2,3]",
			"Changed"
		);
		this.invoke(array, "sort", [function(x) { return -x; }, this, -1]);
		this.assertTrue(this.invoke(array, "equal", [[1, 2, 3, 4, 5, 6]]));
	},

	testSortComparing: function() {
		var array = this.createArray([1, 2, 3, 4, 5, 6]);

		this.setObservableOutput();
		this.invoke(array, "sortComparing");
		this.assertTrue(this.invoke(array, "equal", [[1, 2, 3, 4, 5, 6]]));

		var array = this.createArray([5, 2, 1, 6, 3, 4]);

		this.setObservableOutput(
			"Reordered [5,2,1,6,3,4] by [4,1,0,5,2,3]",
			"Changed"
		);
		this.invoke(array, "sortComparing");
		this.assertTrue(this.invoke(array, "equal", [[1, 2, 3, 4, 5, 6]]));

		var array = this.createArray([5, 2, 1, 6, 3, 4]);

		this.setObservableOutput(
			"Reordered [5,2,1,6,3,4] by [1,4,5,0,3,2]",
			"Changed"
		);
		this.invoke(array, "sortComparing", [function(x, y) { return -JW.cmp(x, y); }]);
		this.assertTrue(this.invoke(array, "equal", [[6, 5, 4, 3, 2, 1]]));

		var array = this.createArray([5, 2, 1, 6, 3, 4]);

		this.setObservableOutput(
			"Reordered [5,2,1,6,3,4] by [1,4,5,0,3,2]",
			"Changed"
		);
		this.invoke(array, "sortComparing", [null, null, -1]);
		this.assertTrue(this.invoke(array, "equal", [[6, 5, 4, 3, 2, 1]]));

		var array = this.createArray([5, 2, 1, 6, 3, 4]);

		this.setObservableOutput(
			"Reordered [5,2,1,6,3,4] by [4,1,0,5,2,3]",
			"Changed"
		);
		this.invoke(array, "sortComparing", [function(x, y) { return -JW.cmp(x, y); }, this, -1]);
		this.assertTrue(this.invoke(array, "equal", [[1, 2, 3, 4, 5, 6]]));
	},

	testMerge: function() {
		var array = this.createArray([this.createArray([1, 2]), this.createArray([3, 4])]);
		var merged = this.invoke(array, "merge");
		this.assertTrue(JW.Array.equal(merged, [1, 2, 3, 4]));

		var $merged = this.invoke(array, "$merge");
		this.assertTrue($merged.equal([1, 2, 3, 4]));
	},

	testReverse: function() {
		var array = this.createArray([1, 2, 3, 4]);

		this.setObservableOutput(
			"Reordered [1,2,3,4] by [3,2,1,0]",
			"Changed"
		);
		this.invoke(array, "reverse");
		this.assertTrue(this.invoke(array, "equal", [[4, 3, 2, 1]]));
	},

	testToReversed: function() {
		var array = this.createArray([1, 2, 3, 4]);

		var result = this.invoke(array, "toReversed");
		this.assertTrue(this.invoke(array, "equal", [[1, 2, 3, 4]]));
		this.assertTrue(JW.Array.equal(result, [4, 3, 2, 1]));

		var $result = this.invoke(array, "$toReversed");
		this.assertTrue(this.invoke(array, "equal", [[1, 2, 3, 4]]));
		this.assertTrue($result.equal([4, 3, 2, 1]));
	},

	testPerformSplice: function() {
		var array = this.createArray([1, 2, 3, 4, 5, 6]);
		this.setObservableOutput();
		this.invoke(array, "performSplice", [[1, 2, 3, 4, 5, 6]]);
		this.assertTrue(this.invoke(array, "equal", [[1, 2, 3, 4, 5, 6]]));

		this.setObservableOutput(
			"Changed length from 6 to 7",
			"Spliced -[1:[2],3:[4]] +[2:[7],4:[8],6:[9]] to [1,2,3,4,5,6]",
			"Changed"
		);
		this.invoke(array, "performSplice", [[1, 3, 7, 5, 8, 6, 9]]);
		this.assertTrue(this.invoke(array, "equal", [[1, 3, 7, 5, 8, 6, 9]]));
	},

	testPerformFilter: function() {
		var array = this.createArray([1, 2, 3, 4, 5, 6]);
		this.setObservableOutput();
		this.invoke(array, "performFilter", [[1, 2, 3, 4, 5, 6]]);
		this.assertTrue(this.invoke(array, "equal", [[1, 2, 3, 4, 5, 6]]));

		this.setObservableOutput(
			"Changed length from 6 to 4",
			"Spliced -[1:[2],3:[4]] +[] to [1,2,3,4,5,6]",
			"Changed"
		);
		this.invoke(array, "performFilter", [[1, 3, 5, 6]]);
		this.assertTrue(this.invoke(array, "equal", [[1, 3, 5, 6]]));
	},

	testPerformReorder: function() {
		var array = this.createArray([1, 2, 3, 4, 5, 6]);
		this.setObservableOutput();
		this.invoke(array, "performReorder", [[1, 2, 3, 4, 5, 6]]);
		this.assertTrue(this.invoke(array, "equal", [[1, 2, 3, 4, 5, 6]]));

		this.setObservableOutput(
			"Reordered [1,2,3,4,5,6] by [2,1,4,5,0,3]",
			"Changed"
		);
		this.invoke(array, "performReorder", [[5, 2, 1, 6, 3, 4]]);
		this.assertTrue(this.invoke(array, "equal", [[5, 2, 1, 6, 3, 4]]));
	},

	testDetectSplice: function() {
		var array = this.createArray([1, 2, 3, 4, 5, 6]);
		this.assertUndefined(this.invoke(array, "detectSplice", [[1, 2, 3, 4, 5, 6]]));
		this.assertTrue(this.invoke(array, "equal", [[1, 2, 3, 4, 5, 6]]));

		var expected = new JW.AbstractArray.SpliceParams([
			new JW.AbstractArray.IndexCount(1, 2),
			new JW.AbstractArray.IndexCount(4, 2)
		], [
			new JW.AbstractArray.IndexItems(0, [7, 8, 10]),
			new JW.AbstractArray.IndexItems(5, [9])
		]);
		var got = this.invoke(array, "detectSplice", [[7, 8, 10, 1, 4, 9]]);
		JW.Tests.Collection.assertArraySpliceParams(this, expected, got);
		this.assertTrue(this.invoke(array, "equal", [[1, 2, 3, 4, 5, 6]]));
	},

	testDetectFilter: function() {
		var array = this.createArray([1, 2, 3, 4, 5, 6]);
		this.assertUndefined(this.invoke(array, "detectFilter", [[1, 2, 3, 4, 5, 6]]));
		this.assertTrue(this.invoke(array, "equal", [[1, 2, 3, 4, 5, 6]]));

		var expected = new JW.AbstractArray.SpliceParams([
			new JW.AbstractArray.IndexCount(1, 2),
			new JW.AbstractArray.IndexCount(4, 2)
		], []);
		var got = this.invoke(array, "detectFilter", [[1, 4]]);
		JW.Tests.Collection.assertArraySpliceParams(this, expected, new JW.AbstractArray.SpliceParams(got, []));
		this.assertTrue(this.invoke(array, "equal", [[1, 2, 3, 4, 5, 6]]));
	},

	testDetectReorder: function() {
		var array = this.createArray([1, 2, 3, 4, 5, 6]);
		this.assertUndefined(this.invoke(array, "detectReorder", [[1, 2, 3, 4, 5, 6]]));
		this.assertTrue(this.invoke(array, "equal", [[1, 2, 3, 4, 5, 6]]));
		this.assertTrue(JW.Array.equal(this.invoke(array, "detectReorder", [[5, 2, 1, 6, 3, 4]]), [2, 1, 4, 5, 0, 3]));
		this.assertTrue(this.invoke(array, "equal", [[1, 2, 3, 4, 5, 6]]));
	},

	testDetectSort: function() {
		var array = this.createArray([1, 2, 3, 4, 5, 6]);
		this.assertUndefined(this.invoke(array, "detectSort"));
		this.assertTrue(this.invoke(array, "equal", [[1, 2, 3, 4, 5, 6]]));
		this.assertTrue(JW.Array.equal(this.invoke(array, "detectSort", [function(x) { return -x; }]), [5, 4, 3, 2, 1, 0]));
		this.assertTrue(this.invoke(array, "equal", [[1, 2, 3, 4, 5, 6]]));
		this.assertTrue(JW.Array.equal(this.invoke(array, "detectSort", [null, null, -1]), [5, 4, 3, 2, 1, 0]));
		this.assertTrue(this.invoke(array, "equal", [[1, 2, 3, 4, 5, 6]]));
		this.assertUndefined(this.invoke(array, "detectSort", [function(x) { return -x; }, this, -1]));
		this.assertTrue(this.invoke(array, "equal", [[1, 2, 3, 4, 5, 6]]));

		var array = this.createArray([5, 2, 1, 6, 3, 4]);
		this.assertTrue(JW.Array.equal(this.invoke(array, "detectSort"), [4, 1, 0, 5, 2, 3]));
		this.assertTrue(this.invoke(array, "equal", [[5, 2, 1, 6, 3, 4]]));
		this.assertTrue(JW.Array.equal(this.invoke(array, "detectSort", [function(x) { return -x; }]), [1, 4, 5, 0, 3, 2]));
		this.assertTrue(this.invoke(array, "equal", [[5, 2, 1, 6, 3, 4]]));
	},

	testDetectSortComparing: function() {
		var array = this.createArray([1, 2, 3, 4, 5, 6]);
		this.assertUndefined(this.invoke(array, "detectSortComparing"));
		this.assertTrue(this.invoke(array, "equal", [[1, 2, 3, 4, 5, 6]]));
		this.assertTrue(JW.Array.equal(this.invoke(array, "detectSortComparing", [function(x, y) { return -JW.cmp(x, y); }]), [5, 4, 3, 2, 1, 0]));
		this.assertTrue(this.invoke(array, "equal", [[1, 2, 3, 4, 5, 6]]));
		this.assertTrue(JW.Array.equal(this.invoke(array, "detectSortComparing", [null, null, -1]), [5, 4, 3, 2, 1, 0]));
		this.assertTrue(this.invoke(array, "equal", [[1, 2, 3, 4, 5, 6]]));
		this.assertUndefined(this.invoke(array, "detectSortComparing", [function(x, y) { return -JW.cmp(x, y); }, this, -1]), [0, 1, 2, 3, 4, 5]);
		this.assertTrue(this.invoke(array, "equal", [[1, 2, 3, 4, 5, 6]]));

		var array = this.createArray([5, 2, 1, 6, 3, 4]);
		this.assertTrue(JW.Array.equal(this.invoke(array, "detectSortComparing"), [4, 1, 0, 5, 2, 3]));
		this.assertTrue(this.invoke(array, "equal", [[5, 2, 1, 6, 3, 4]]));
		this.assertTrue(JW.Array.equal(this.invoke(array, "detectSortComparing", [function(x, y) { return -JW.cmp(x, y); }]), [1, 4, 5, 0, 3, 2]));
		this.assertTrue(this.invoke(array, "equal", [[5, 2, 1, 6, 3, 4]]));
	},

	testCollapse: function() {
		var a = [1, 2, 3];
		var b = [5, 6];
		var c = [8, 9];
		var d = [b, 7, c];
		var array = this.createArray([a, 4, d, 10]);
		this.assertTrue(JW.Array.equal(this.invoke(array, "collapse"), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
		this.assertTrue(this.invoke(array, "equal", [[a, 4, d, 10]]));
		this.assertTrue(JW.Array.equal(this.invoke(array, "collapse", [1]), [1, 2, 3, 4, b, 7, c, 10]));
		this.assertTrue(this.invoke(array, "equal", [[a, 4, d, 10]]));
		this.assertTrue(JW.Array.equal(this.invoke(array, "collapse", [0]), [a, 4, d, 10]));
		this.assertTrue(this.invoke(array, "equal", [[a, 4, d, 10]]));
	},

	testEqual: function() {
		var array = this.createArray([2, 3]);
		this.assertTrue(this.invoke(array, "equal", [[2, 3]]));
		this.assertFalse(this.invoke(array, "equal", [[2, 3, 4]]));
		this.assertFalse(this.invoke(array, "equal", [[2]]));
		this.assertFalse(this.invoke(array, "equal", [[3, 2]]));
		this.assertFalse(this.invoke(array, "equal", [[2, 4]]));
		this.assertFalse(this.invoke(array, "equal", [[1, 3]]));
	},

	testBinarySearch: function() {
		this.assertStrictEqual(0, this.invoke(this.createArray(), "binarySearch", [4]));
		this.assertStrictEqual(0, this.invoke(this.createArray([1]), "binarySearch", [0]));
		this.assertStrictEqual(1, this.invoke(this.createArray([1]), "binarySearch", [1]));
		this.assertStrictEqual(1, this.invoke(this.createArray([1]), "binarySearch", [2]));
		this.assertStrictEqual(0, this.invoke(this.createArray([1, 3]), "binarySearch", [0]));
		this.assertStrictEqual(1, this.invoke(this.createArray([1, 3]), "binarySearch", [1]));
		this.assertStrictEqual(1, this.invoke(this.createArray([1, 3]), "binarySearch", [2]));
		this.assertStrictEqual(2, this.invoke(this.createArray([1, 3]), "binarySearch", [3]));
		this.assertStrictEqual(2, this.invoke(this.createArray([1, 3]), "binarySearch", [4]));
		this.assertStrictEqual(0, this.invoke(this.createArray([0, 1, 4, 7, 10, 15]), "binarySearch", [-2]));
		this.assertStrictEqual(1, this.invoke(this.createArray([0, 1, 4, 7, 10, 15]), "binarySearch", [0]));
		this.assertStrictEqual(1, this.invoke(this.createArray([0, 1, 4, 7, 10, 15]), "binarySearch", [.5]));
		this.assertStrictEqual(2, this.invoke(this.createArray([0, 1, 4, 7, 10, 15]), "binarySearch", [1]));
		this.assertStrictEqual(2, this.invoke(this.createArray([0, 1, 4, 7, 10, 15]), "binarySearch", [2]));
		this.assertStrictEqual(3, this.invoke(this.createArray([0, 1, 4, 7, 10, 15]), "binarySearch", [4]));
		this.assertStrictEqual(3, this.invoke(this.createArray([0, 1, 4, 7, 10, 15]), "binarySearch", [5]));
		this.assertStrictEqual(4, this.invoke(this.createArray([0, 1, 4, 7, 10, 15]), "binarySearch", [7]));
		this.assertStrictEqual(4, this.invoke(this.createArray([0, 1, 4, 7, 10, 15]), "binarySearch", [9]));
		this.assertStrictEqual(5, this.invoke(this.createArray([0, 1, 4, 7, 10, 15]), "binarySearch", [10]));
		this.assertStrictEqual(5, this.invoke(this.createArray([0, 1, 4, 7, 10, 15]), "binarySearch", [14]));
		this.assertStrictEqual(6, this.invoke(this.createArray([0, 1, 4, 7, 10, 15]), "binarySearch", [15]));
		this.assertStrictEqual(6, this.invoke(this.createArray([0, 1, 4, 7, 10, 15]), "binarySearch", [18]));
	},

	testBinarySearchBack: function() {
		this.assertStrictEqual(0, this.invoke(this.createArray(), "binarySearch", [4, null, null, -1]));
		this.assertStrictEqual(1, this.invoke(this.createArray([1]), "binarySearch", [0, null, null, -1]));
		this.assertStrictEqual(1, this.invoke(this.createArray([1]), "binarySearch", [1, null, null, -1]));
		this.assertStrictEqual(0, this.invoke(this.createArray([1]), "binarySearch", [2, null, null, -1]));
		this.assertStrictEqual(2, this.invoke(this.createArray([3, 1]), "binarySearch", [0, null, null, -1]));
		this.assertStrictEqual(2, this.invoke(this.createArray([3, 1]), "binarySearch", [1, null, null, -1]));
		this.assertStrictEqual(1, this.invoke(this.createArray([3, 1]), "binarySearch", [2, null, null, -1]));
		this.assertStrictEqual(1, this.invoke(this.createArray([3, 1]), "binarySearch", [3, null, null, -1]));
		this.assertStrictEqual(0, this.invoke(this.createArray([3, 1]), "binarySearch", [4, null, null, -1]));
		this.assertStrictEqual(6, this.invoke(this.createArray([15, 10, 7, 4, 1, 0]), "binarySearch", [-2, null, null, -1]));
		this.assertStrictEqual(6, this.invoke(this.createArray([15, 10, 7, 4, 1, 0]), "binarySearch", [0, null, null, -1]));
		this.assertStrictEqual(5, this.invoke(this.createArray([15, 10, 7, 4, 1, 0]), "binarySearch", [.5, null, null, -1]));
		this.assertStrictEqual(5, this.invoke(this.createArray([15, 10, 7, 4, 1, 0]), "binarySearch", [1, null, null, -1]));
		this.assertStrictEqual(4, this.invoke(this.createArray([15, 10, 7, 4, 1, 0]), "binarySearch", [2, null, null, -1]));
		this.assertStrictEqual(4, this.invoke(this.createArray([15, 10, 7, 4, 1, 0]), "binarySearch", [4, null, null, -1]));
		this.assertStrictEqual(3, this.invoke(this.createArray([15, 10, 7, 4, 1, 0]), "binarySearch", [5, null, null, -1]));
		this.assertStrictEqual(3, this.invoke(this.createArray([15, 10, 7, 4, 1, 0]), "binarySearch", [7, null, null, -1]));
		this.assertStrictEqual(2, this.invoke(this.createArray([15, 10, 7, 4, 1, 0]), "binarySearch", [9, null, null, -1]));
		this.assertStrictEqual(2, this.invoke(this.createArray([15, 10, 7, 4, 1, 0]), "binarySearch", [10, null, null, -1]));
		this.assertStrictEqual(1, this.invoke(this.createArray([15, 10, 7, 4, 1, 0]), "binarySearch", [14, null, null, -1]));
		this.assertStrictEqual(1, this.invoke(this.createArray([15, 10, 7, 4, 1, 0]), "binarySearch", [15, null, null, -1]));
		this.assertStrictEqual(0, this.invoke(this.createArray([15, 10, 7, 4, 1, 0]), "binarySearch", [18, null, null, -1]));
	}
});

JW.Tests.Collection.AbstractArray = {};
