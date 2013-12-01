/*
	JW array prototype extension tests.
	
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

JW.Tests.Collection.ArrayTestCase = JW.Tests.Collection.AbstractArrayBase.extend({
	// override
	createArray: function(items) {
		return new JW.Array(items);
	},
	
	// override
	invoke: function(array, method, args) {
		return array[method].apply(array, args || []);
	},
	
	testNotAdapter: function() {
		var items = [2, 4];
		var array = new JW.Array(items);
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
		var array = new JW.Array(items, true);
		this.assertStrictEqual(2, array.getLength());
		this.assertFalse(array.isEmpty());
		this.assertStrictEqual(2, array.get(0));
		this.assertStrictEqual(4, array.get(1));
		array.set(3, 0);
		this.assertStrictEqual(3, array.get(0));
		this.assertStrictEqual(3, items[0]);
	},
	
	testToArray: function() {
		var array = new JW.Array([2, 4]);
		this.assertTrue(JW.Array.equal(array.toArray(), array.getItems()));
		this.assertTrue(array.$toArray().equal(array.getItems()));
		this.assertFalse(array.toArray() === array.getItems());
		this.assertFalse(array.$toArray() === array);
		this.assertTrue(array.equal([2, 4]));
	},
	
	testAsArray: function() {
		var array = new JW.Array([2, 4]);
		this.assertTrue(array.asArray() === array.getItems());
		this.assertTrue(array.$asArray() === array);
		this.assertTrue(array.equal([2, 4]));
	}
});

JW.Tests.Collection.Array = {};
