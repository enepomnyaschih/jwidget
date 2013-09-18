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
	}
});
