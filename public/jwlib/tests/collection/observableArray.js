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

JW.Tests.Collection.ObservableArrayTestCase = JW.Tests.Collection.AbstractArrayBase.extend({
	// override
	createArray: function(items, formatter) {
		var array = new JW.ObservableArray(items);
		JW.Tests.Collection.subscribeToArray(this, array, formatter);
		return array;
	},
	
	// override
	invoke: function(array, method, args) {
		return array[method].apply(array, args || []);
	},
	
	// override
	setObservableOutput: function() {
		this.setExpectedOutput.apply(this, arguments);
	},
	
	testNotAdapter: function() {
		var items = [2, 4];
		var array = new JW.ObservableArray(items);
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
		var array = new JW.ObservableArray(items, true);
		this.assertStrictEqual(2, array.getLength());
		this.assertFalse(array.isEmpty());
		this.assertStrictEqual(2, array.get(0));
		this.assertStrictEqual(4, array.get(1));
		array.set(3, 0);
		this.assertStrictEqual(3, array.get(0));
		this.assertStrictEqual(3, items[0]);
	},
	
	testToArray: function() {
		var array = new JW.ObservableArray([2, 4]);
		this.assertTrue(JW.Array.equal(array.toArray(), array.getItems()));
		this.assertTrue(array.$toArray().equal(array.getItems()));
		this.assertFalse(array.toArray() === array.getItems());
		this.assertFalse(array.$toArray() === array);
		this.assertTrue(array.equal([2, 4]));
	},
	
	testAsArray: function() {
		var array = new JW.ObservableArray([2, 4]);
		this.assertTrue(array.asArray() === array.getItems());
		this.assertTrue(array.$asArray() === array);
		this.assertTrue(array.equal([2, 4]));
	},

	testLateDestruction: function() {
		var test = this;

		var a = new JW.Class();
		a.destroy = function() { test.output("Destroy a"); };

		var b = new JW.Class();
		b.destroy = function() { test.output("Destroy b"); };

		var c = new JW.Class();
		c.destroy = function() { test.output("Destroy c"); };

		var set = new JW.ObservableArray([a, b]).ownItems();
		set.replaceEvent.bind(function() { test.output("Replace"); });
		set.spliceEvent.bind(function() { test.output("Splice"); });
		set.clearEvent.bind(function() { test.output("Clear"); });

		this.setExpectedOutput("Replace", "Destroy a");
		set.set(c, 0);

		this.setExpectedOutput("Splice", "Destroy b");
		set.remove(1);

		this.setExpectedOutput("Clear", "Destroy c");
		set.clear();

		this.setExpectedOutput();
		set.destroy();
	}
});

JW.Tests.Collection.ObservableArray = {};
