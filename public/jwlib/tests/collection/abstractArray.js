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

JW.Tests.Collection.AbstractArray = JW.Unit.TestCase.extend({
	/*
	JW.AbstractArray createArray(items, adapter);
	*/
	
	testEmpty: function() {
		var array = this.createArray();
		this.assertStrictEqual(0, array.getLength());
		this.assertTrue(array.isEmpty());
		this.assertUndefined(array.get(0));
		this.assertUndefined(array.getFirst());
		this.assertUndefined(array.getFirstKey());
		this.assertUndefined(array.getLast());
		this.assertUndefined(array.getLastKey());
		this.assertTrue(JW.Array.equal(array.getKeys(), []));
		this.assertTrue(array.$getKeys().equal([]));
		this.assertFalse(array.containsItem(0));
		this.assertFalse(array.containsKey(0));
		this.assertUndefined(array.keyOf(0));
		this.assertStrictEqual(-1, array.indexOf(0));
		this.assertTrue(JW.Array.equal(array.getItems(), []));
		this.assertTrue(array.every(JW.isInt));
		this.assertFalse(array.some(JW.isInt));
		this.assertUndefined(array.search(JW.isInt));
		this.assertUndefined(array.find(JW.isInt));
		this.assertTrue(JW.Array.equal(array.filter(JW.isInt), []));
		this.assertTrue(array.$filter(JW.isInt).equal([]));
		this.assertTrue(JW.Array.equal(array.map(function(x) { return x + 1; }), []));
		this.assertTrue(array.$map(function(x) { return x + 1; }).equal([]));
		this.assertTrue(JW.Array.equal(array.toSorted(), []));
		this.assertTrue(array.$toSorted().equal([]));
		this.assertTrue(JW.Array.equal(array.toSortedComparing(), []));
		this.assertTrue(array.$toSortedComparing().equal([]));
		this.assertTrue(JW.Array.equal(array.getSortingKeys(), []));
		this.assertTrue(array.$getSortingKeys().equal([]));
		this.assertTrue(JW.Array.equal(array.getSortingKeysComparing(), []));
		this.assertTrue(array.$getSortingKeysComparing().equal([]));
		this.assertTrue(JW.Map.equal(array.index(function(x) { return x; }), {}));
		this.assertTrue(array.$index(function(x) { return x; }).equal({}));
		this.assertTrue(JW.Array.equal(array.toArray(), []));
		this.assertTrue(array.$toArray().equal([]));
		this.assertTrue(JW.Map.equal(array.toMap(), {}));
		this.assertTrue(array.$toMap().equal({}));
		this.assertTrue(JW.Set.equal(array.toSet(), []));
		this.assertTrue(array.$toSet().equal([]));
		this.assertTrue(JW.Array.equal(array.asArray(), []));
		this.assertTrue(array.$asArray().equal([]));
		this.assertTrue(JW.Map.equal(array.asMap(), {}));
		this.assertTrue(array.$asMap().equal({}));
		this.assertTrue(JW.Set.equal(array.asSet(), []));
		this.assertTrue(array.$asSet().equal([]));
		this.assertTrue(array.backEvery(JW.isInt));
	},
	
	testItems: function() {
		var items = [2, 4];
		var array = this.createArray(items);
		this.assertStrictEqual(2, array.getLength());
		this.assertFalse(array.isEmpty());
		this.assertStrictEqual(2, array.get(0));
		this.assertStrictEqual(4, array.get(1));
		this.assertStrictEqual(2, array.getFirst());
		this.assertStrictEqual(0, array.getFirstKey());
		this.assertStrictEqual(4, array.getLast());
		this.assertStrictEqual(1, array.getLastKey());
		this.assertTrue(JW.Array.equal(array.getKeys(), [0, 1]));
		this.assertTrue(array.$getKeys().equal([0, 1]));
		this.assertFalse(array.containsItem(0));
		this.assertTrue(array.containsItem(2));
		this.assertFalse(array.containsKey(2));
		this.assertTrue(array.containsKey(0));
		this.assertUndefined(array.keyOf(0));
		this.assertStrictEqual(0, array.keyOf(2));
		this.assertStrictEqual(-1, array.indexOf(0));
		this.assertStrictEqual(0, array.indexOf(2));
		this.assertTrue(JW.Array.equal(array.getItems(), [2, 4]));
		this.assertTrue(array.every(JW.isInt));
		this.assertTrue(array.some(JW.isInt));
		this.assertStrictEqual(2, array.search(JW.isInt));
		this.assertStrictEqual(0, array.find(JW.isInt));
		this.assertTrue(JW.Array.equal(array.filter(JW.isInt), [2, 4]));
		this.assertTrue(array.$filter(JW.isInt).equal([2, 4]));
		this.assertTrue(JW.Array.equal(array.map(function(x) { return x + 1; }), [3, 5]));
		this.assertTrue(array.$map(function(x) { return x + 1; }).equal([3, 5]));
		this.assertTrue(JW.Array.equal(array.toSorted(), [2, 4]));
		this.assertTrue(array.$toSorted().equal([2, 4]));
		this.assertTrue(JW.Array.equal(array.toSortedComparing(), [2, 4]));
		this.assertTrue(array.$toSortedComparing().equal([2, 4]));
		this.assertTrue(JW.Array.equal(array.getSortingKeys(), [0, 1]));
		this.assertTrue(array.$getSortingKeys().equal([0, 1]));
		this.assertTrue(JW.Array.equal(array.getSortingKeysComparing(), [0, 1]));
		this.assertTrue(array.$getSortingKeysComparing().equal([0, 1]));
		this.assertTrue(JW.Map.equal(array.index(function(x) { return x; }), {"2": 2, "4": 4}));
		this.assertTrue(array.$index(function(x) { return x; }).equal({"2": 2, "4": 4}));
		this.assertTrue(JW.Array.equal(array.toArray(), [2, 4]));
		this.assertTrue(array.$toArray().equal([2, 4]));
		this.assertTrue(JW.Map.equal(array.toMap(), {"0": 2, "1": 4}));
		this.assertTrue(array.$toMap().equal({"0": 2, "1": 4}));
		//this.assertTrue(JW.Set.equal(array.toSet(), [2, 4]));
		//this.assertTrue(array.$toSet().equal([2, 4]));
		this.assertTrue(JW.Array.equal(array.asArray(), [2, 4]));
		this.assertTrue(array.$asArray().equal([2, 4]));
		this.assertTrue(JW.Map.equal(array.asMap(), {"0": 2, "1": 4}));
		this.assertTrue(array.$asMap().equal({"0": 2, "1": 4}));
		//this.assertTrue(JW.Set.equal(array.asSet(), [2, 4]));
		//this.assertTrue(array.$asSet().equal([2, 4]));
		this.assertTrue(array.backEvery(JW.isInt));
		array.set(3, 0);
		this.assertStrictEqual(3, array.get(0));
		this.assertStrictEqual(2, items[0]);
	},
	
	testAdapter: function() {
		var items = [2, 4];
		var array = this.createArray(items, true);
		this.assertStrictEqual(2, array.getLength());
		this.assertFalse(array.isEmpty());
		this.assertStrictEqual(2, array.get(0));
		this.assertStrictEqual(4, array.get(1));
		array.set(3, 0);
		this.assertStrictEqual(3, array.get(0));
		this.assertStrictEqual(3, items[0]);
	},
	
	testEvery: function() {
		var array = this.createArray([2, 3.5, 4]);
		this.assertTrue(array.every(JW.isNumber));
		this.assertFalse(array.every(JW.isInt));
		this.assertFalse(array.every(JW.isString));
		
		this.setExpectedOutput(
			"2 at 0",
			"3.5 at 1",
			"4 at 2"
		);
		array.every(function(item, index) {
			this.output(item + " at " + index);
		}, this);
		
		this.setExpectedOutput(
			"2 at 0",
			"3.5 at 1"
		);
		array.every(function(item, index) {
			this.output(item + " at " + index);
			return JW.isInt(item);
		}, this);
	},
	
	testSome: function() {
		var array = this.createArray([2, 3.5, 4]);
		this.assertTrue(array.some(JW.isNumber));
		this.assertTrue(array.some(JW.isInt));
		this.assertFalse(array.some(JW.isString));
		
		this.setExpectedOutput(
			"2 at 0"
		);
		array.some(function(item, index) {
			this.output(item + " at " + index);
		}, this);
		
		this.setExpectedOutput(
			"2 at 0",
			"3.5 at 1"
		);
		array.some(function(item, index) {
			this.output(item + " at " + index);
			return !JW.isInt(item);
		}, this);
	},
	
	testEach: function() {
		var array = this.createArray([2, 3.5, 4]);
		this.setExpectedOutput(
			"2 at 0",
			"3.5 at 1",
			"4 at 2"
		);
		array.each(function(item, index) {
			this.output(item + " at " + index);
			return false;
		}, this);
	},
	
	testSearch: function() {
		var array = this.createArray([2.5, 3.5, 4]);
		this.assertStrictEqual(4, array.search(JW.isInt));
	},
	
	testFind: function() {
		var array = this.createArray([2.5, 3.5, 4]);
		this.assertStrictEqual(2, array.find(JW.isInt));
	},
	
	testFilter: function() {
		var array = this.createArray([2, 3.5, 4]);
		this.assertTrue(JW.Array.equal(array.filter(JW.isInt), [2, 4]));
		this.assertTrue(array.$filter(JW.isInt).equal([2, 4]));
		this.assertTrue(array.equal([2, 3.5, 4]));
	},
	
	testMap: function() {
		var array = this.createArray([2, 4]);
		this.assertTrue(JW.Array.equal(array.map(function(x) { return x + 1; }), [3, 5]));
		this.assertTrue(array.$map(function(x) { return x + 1; }).equal([3, 5]));
		this.assertTrue(array.equal([2, 4]));
	},
	
	testToSorted: function() {
		var array = this.createArray([3, 2, 4]);
		this.assertTrue(JW.Array.equal(array.toSorted(), [2, 3, 4]));
		this.assertTrue(array.$toSorted().equal([2, 3, 4]));
		this.assertTrue(JW.Array.equal(array.toSorted(null, null, -1), [4, 3, 2]));
		this.assertTrue(array.$toSorted(null, null, -1).equal([4, 3, 2]));
		this.assertTrue(JW.Array.equal(array.toSorted(function(x) { return -x; }), [4, 3, 2]));
		this.assertTrue(array.$toSorted(function(x) { return -x; }).equal([4, 3, 2]));
		this.assertTrue(JW.Array.equal(array.toSorted(function(x) { return -x; }, null, -1), [2, 3, 4]));
		this.assertTrue(array.$toSorted(function(x) { return -x; }, null, -1).equal([2, 3, 4]));
		this.assertTrue(array.equal([3, 2, 4]));
	},
	
	testToSortedComparing: function() {
		var array = this.createArray([3, 2, 4]);
		this.assertTrue(JW.Array.equal(array.toSortedComparing(), [2, 3, 4]));
		this.assertTrue(array.$toSortedComparing().equal([2, 3, 4]));
		this.assertTrue(JW.Array.equal(array.toSortedComparing(null, null, -1), [4, 3, 2]));
		this.assertTrue(array.$toSortedComparing(null, null, -1).equal([4, 3, 2]));
		this.assertTrue(JW.Array.equal(array.toSortedComparing(function(x, y) { return -JW.cmp(x, y); }), [4, 3, 2]));
		this.assertTrue(array.$toSortedComparing(function(x, y) { return -JW.cmp(x, y); }).equal([4, 3, 2]));
		this.assertTrue(JW.Array.equal(array.toSortedComparing(function(x, y) { return -JW.cmp(x, y); }, null, -1), [2, 3, 4]));
		this.assertTrue(array.$toSortedComparing(function(x, y) { return -JW.cmp(x, y); }, null, -1).equal([2, 3, 4]));
		this.assertTrue(array.equal([3, 2, 4]));
	},
	
	testGetSortingKeys: function() {
		var array = this.createArray([3, 2, 4]);
		this.assertTrue(JW.Array.equal(array.getSortingKeys(), [1, 0, 2]));
		this.assertTrue(array.$getSortingKeys().equal([1, 0, 2]));
		this.assertTrue(JW.Array.equal(array.getSortingKeys(null, null, -1), [2, 0, 1]));
		this.assertTrue(array.$getSortingKeys(null, null, -1).equal([2, 0, 1]));
		this.assertTrue(JW.Array.equal(array.getSortingKeys(function(x) { return -x; }), [2, 0, 1]));
		this.assertTrue(array.$getSortingKeys(function(x) { return -x; }).equal([2, 0, 1]));
		this.assertTrue(JW.Array.equal(array.getSortingKeys(function(x) { return -x; }, null, -1), [1, 0, 2]));
		this.assertTrue(array.$getSortingKeys(function(x) { return -x; }, null, -1).equal([1, 0, 2]));
		this.assertTrue(array.equal([3, 2, 4]));
	},
	
	testGetSortingKeysComparing: function() {
		var array = this.createArray([3, 2, 4]);
		this.assertTrue(JW.Array.equal(array.getSortingKeysComparing(), [1, 0, 2]));
		this.assertTrue(array.$getSortingKeysComparing().equal([1, 0, 2]));
		this.assertTrue(JW.Array.equal(array.getSortingKeysComparing(null, null, -1), [2, 0, 1]));
		this.assertTrue(array.$getSortingKeysComparing(null, null, -1).equal([2, 0, 1]));
		this.assertTrue(JW.Array.equal(array.getSortingKeysComparing(function(x, y) { return -JW.cmp(x, y); }), [2, 0, 1]));
		this.assertTrue(array.$getSortingKeysComparing(function(x, y) { return -JW.cmp(x, y); }).equal([2, 0, 1]));
		this.assertTrue(JW.Array.equal(array.getSortingKeysComparing(function(x, y) { return -JW.cmp(x, y); }, null, -1), [1, 0, 2]));
		this.assertTrue(array.$getSortingKeysComparing(function(x, y) { return -JW.cmp(x, y); }, null, -1).equal([1, 0, 2]));
		this.assertTrue(array.equal([3, 2, 4]));
	},
	
	testIndex: function() {
		var array = this.createArray([2, 4]);
		this.assertTrue(JW.Map.equal(array.index(function(x) { return x + 1; }), {"3": 2, "5": 4}));
		this.assertTrue(array.$index(function(x) { return x + 1; }).equal({"3": 2, "5": 4}));
		this.assertTrue(array.equal([2, 4]));
	},
	
	testToArray: function() {
		var array = this.createArray([2, 4]);
		this.assertTrue(JW.Array.equal(array.toArray(), array.getItems()));
		this.assertTrue(array.$toArray().equal(array.getItems()));
		this.assertFalse(array.toArray() === array.getItems());
		this.assertFalse(array.$toArray() === array);
	},
	
	testToSet: function() {
		var array = this.createArray([new JW.Proxy(), new JW.Proxy()]);
		this.assertTrue(JW.Set.equal(array.toSet(), array.getItems()));
		this.assertTrue(array.$toSet().equal(array.getItems()));
	},
	
	testAsArray: function() {
		var array = this.createArray([2, 4]);
		this.assertTrue(array.asArray() === array.getItems());
		this.assertTrue(array.$asArray() === array);
	},
	
	testAsSet: function() {
		var array = this.createArray([new JW.Proxy(), new JW.Proxy()]);
		this.assertTrue(JW.Set.equal(array.asSet(), array.getItems()));
		this.assertTrue(array.$asSet().equal(array.getItems()));
	},
	
	testBackEvery: function() {
		var array = this.createArray([2, 3.5, 4]);
		this.assertTrue(array.backEvery(JW.isNumber));
		this.assertFalse(array.backEvery(JW.isInt));
		this.assertFalse(array.backEvery(JW.isString));
		
		this.setExpectedOutput(
			"4 at 2",
			"3.5 at 1",
			"2 at 0"
		);
		array.backEvery(function(item, index) {
			this.output(item + " at " + index);
		}, this);
		
		this.setExpectedOutput(
			"4 at 2",
			"3.5 at 1"
		);
		array.backEvery(function(item, index) {
			this.output(item + " at " + index);
			return JW.isInt(item);
		}, this);
	},
	
	testAdd: function() {
		var array = this.createArray([2, 4]);
		array.add(3);
		this.assertTrue(array.equal([2, 4, 3]));
	},
	
	testTryAdd: function() {
		var array = this.createArray([2, 4]);
		this.assertTrue(array.tryAdd(3));
		this.assertTrue(array.equal([2, 4, 3]));
	},
	
	testAddAll: function() {
		var array = this.createArray([2, 4]);
		array.addAll([3, 5]);
		this.assertTrue(array.equal([2, 4, 3, 5]));
	},
	
	testTryAddAll: function() {
		var array = this.createArray([2, 4]);
		this.assertTrue(array.tryAddAll([3, 5]));
		this.assertTrue(array.equal([2, 4, 3, 5]));
	},
	
	testSet: function() {
		var array = this.createArray([2, 4]);
		this.assertStrictEqual(4, array.set(4, 1));
		this.assertTrue(array.equal([2, 4]));
		this.assertStrictEqual(4, array.set(3, 1));
		this.assertTrue(array.equal([2, 3]));
	},
	
	testTrySet: function() {
		var array = this.createArray([2, 4]);
		this.assertUndefined(array.trySet(4, 1));
		this.assertTrue(array.equal([2, 4]));
		this.assertStrictEqual(4, array.trySet(3, 1).value);
		this.assertTrue(array.equal([2, 3]));
	},
	
	testRemove: function() {
		var array = this.createArray([2, 4, 3]);
		this.assertStrictEqual(4, array.remove(1));
		this.assertTrue(array.equal([2, 3]));
	},
	
	testTryRemove: function() {
		var array = this.createArray([2, 4, 3]);
		this.assertStrictEqual(4, array.tryRemove(1));
		this.assertTrue(array.equal([2, 3]));
	},
	
	testRemoveAll: function() {
		var array = this.createArray([2, 4, 3]);
		this.assertTrue(JW.Array.equal(array.removeAll(1, 0), []));
		this.assertTrue(array.equal([2, 4, 3]));
		this.assertTrue(JW.Array.equal(array.removeAll(1, 2), [4, 3]));
		this.assertTrue(array.equal([2]));
		
		var array = this.createArray([2, 4, 3]);
		this.assertTrue(array.$removeAll(1, 0).equal([]));
		this.assertTrue(array.equal([2, 4, 3]));
		this.assertTrue(array.$removeAll(1, 2).equal([4, 3]));
		this.assertTrue(array.equal([2]));
	},
	
	testTryRemoveAll: function() {
		var array = this.createArray([2, 4, 3]);
		this.assertUndefined(array.tryRemoveAll(1, 0));
		this.assertTrue(array.equal([2, 4, 3]));
		this.assertTrue(JW.Array.equal(array.tryRemoveAll(1, 2), [4, 3]));
		this.assertTrue(array.equal([2]));
	},
	
	testRemoveItem: function() {
		var array = this.createArray([2, 4, 3]);
		array.removeItem(4);
		this.assertTrue(array.equal([2, 3]));
	},
	
	testRemoveItems: function() {
		var a = new JW.Proxy();
		var b = new JW.Proxy();
		var c = new JW.Proxy();
		var array = this.createArray([a, b, c]);
		array.removeItems([a, c]);
		this.assertTrue(array.equal([b]));
	},
	
	testRemoveItem: function() {
		var array = this.createArray([2, 4, 3]);
		this.assertStrictEqual(3, array.pop());
		this.assertTrue(array.equal([2, 4]));
	},
	
	testMove: function() {
		var array = this.createArray([2, 4, 3]);
		this.assertStrictEqual(4, array.move(1, 1));
		this.assertTrue(array.equal([2, 4, 3]));
		this.assertStrictEqual(4, array.move(1, 0));
		this.assertTrue(array.equal([4, 2, 3]));
	},
	
	testTryMove: function() {
		var array = this.createArray([2, 4, 3]);
		this.assertUndefined(array.tryMove(1, 1));
		this.assertTrue(array.equal([2, 4, 3]));
		this.assertStrictEqual(4, array.tryMove(1, 0));
		this.assertTrue(array.equal([4, 2, 3]));
	},
	
	testClear: function() {
		var array = this.createArray();
		this.assertTrue(JW.Array.equal(array.clear(), []));
		this.assertTrue(array.$clear().equal([]));
		this.assertTrue(array.equal([]));
		
		var array = this.createArray([2, 4, 3]);
		this.assertTrue(JW.Array.equal(array.clear(), [2, 4, 3]));
		this.assertTrue(array.equal([]));
		
		var array = this.createArray([2, 4, 3]);
		this.assertTrue(array.$clear().equal([2, 4, 3]));
		this.assertTrue(array.equal([]));
	},
	
	testTryClear: function() {
		var array = this.createArray();
		this.assertUndefined(array.tryClear(), []);
		this.assertTrue(array.equal([]));
		
		var array = this.createArray([2, 4, 3]);
		this.assertTrue(JW.Array.equal(array.tryClear(), [2, 4, 3]));
		this.assertTrue(array.equal([]));
	},
	
	testSplice: function() {
		var array = this.createArray([1, 2, 3, 4, 5, 6]);
		var expected = new JW.AbstractArray.SpliceResult([1, 2, 3, 4, 5, 6], [], []);
		var got = array.splice([
			new JW.AbstractArray.IndexCount(1, 0),
			new JW.AbstractArray.IndexCount(3, 0),
		], [
			new JW.AbstractArray.IndexItems(3, []),
		]);
		JW.Tests.Collection.assertArraySpliceResult(this, expected, got);
		this.assertTrue(array.equal([1, 2, 3, 4, 5, 6]));
		
		var expected = new JW.AbstractArray.SpliceResult([1, 2, 3, 4, 5, 6], [
			new JW.AbstractArray.IndexItems(1, [2, 3]),
			new JW.AbstractArray.IndexItems(4, [5, 6])
		], [
			new JW.AbstractArray.IndexItems(0, [7, 8, 10]),
			new JW.AbstractArray.IndexItems(5, [9])
		]);
		var got = array.splice([
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
		]);
		JW.Tests.Collection.assertArraySpliceResult(this, expected, got);
		this.assertTrue(array.equal([7, 8, 10, 1, 4, 9]));
	}
});
