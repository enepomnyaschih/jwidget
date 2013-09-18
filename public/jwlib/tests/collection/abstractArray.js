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
		this.assertStrictEquals(-1, array.indexOf(0));
		this.assertTrue(JW.Array.equal(array.getItems(), []));
		this.assertTrue(array.every(JW.isInt));
		this.assertFalse(array.some(JW.isInt));
		this.assertUndefined(array.search(JW.isInt));
		this.assertUndefined(array.find(JW.isInt));
		this.assertTrue(JW.Array.equal(array.filter(isInt), []));
		this.assertTrue(array.$filter(isInt).equal([]));
		this.assertTrue(JW.Array.equal(array.map(function(x) { return x + 1; }), []));
		this.assertTrue(array.$map(function(x) { return x + 1; }).equal([]));
		this.assertTrue(JW.Array.equal(array.map(function(x) { return x + 1; }), []));
		this.assertTrue(array.$map(function(x) { return x + 1; }).equal([]));
	},
	
	testItems: function() {
		var items = [2, 4];
		var array = this.createArray(items);
		this.assertStrictEqual(2, array.getLength());
		this.assertFalse(array.isEmpty());
		this.assertStrictEqual(2, array.get(0));
		this.assertStrictEqual(4, array.get(1));
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
