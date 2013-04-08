/*
	JW ordered array tests.
	
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

JW.Tests.Collection.ObservableArrayTestCase = JW.Unit.TestCase.extend({
	testObservableArray: function() {
		var array = new JW.ObservableArray();
		this.subscribe(array);
		
		this.setExpectedOutput(
			"Added d at 0",
			"Changed",
			"Changed length from 0 to 1"
		);
		array.add("d");
		this.assertArray([ "d" ], array);
		
		this.setExpectedOutput(
			"Added f at 1",
			"Changed",
			"Changed length from 1 to 2"
		);
		array.addAll([ "f" ]);
		this.assertArray([ "d", "f" ], array);
		
		this.setExpectedOutput(
			"Added c at 1",
			"Changed",
			"Changed length from 2 to 3"
		);
		array.add("c", 1);
		this.assertArray([ "d", "c", "f" ], array);
		
		this.setExpectedOutput(
			"Added b, m at 0",
			"Changed",
			"Changed length from 3 to 5"
		);
		array.addAll([ "b", "m" ], 0);
		this.assertArray([ "b", "m", "d", "c", "f" ], array);
		
		this.setExpectedOutput();
		array.addAll([], 1);
		this.assertArray([ "b", "m", "d", "c", "f" ], array);
		
		this.setExpectedOutput(
			"Added a at 5",
			"Changed",
			"Changed length from 5 to 6"
		);
		array.add("a", 5);
		this.assertArray([ "b", "m", "d", "c", "f", "a" ], array);
		
		this.setExpectedOutput(
			"Removed m at 1",
			"Changed",
			"Changed length from 6 to 5"
		);
		array.remove(1);
		this.assertArray([ "b", "d", "c", "f", "a" ], array);
		
		this.setExpectedOutput(
			"Removed b at 0",
			"Changed",
			"Changed length from 5 to 4"
		);
		array.remove(0);
		this.assertArray([ "d", "c", "f", "a" ], array);
		
		this.setExpectedOutput(
			"Added k at 4",
			"Changed",
			"Changed length from 4 to 5"
		);
		array.add("k");
		this.assertArray([ "d", "c", "f", "a", "k" ], array);
		
		this.setExpectedOutput(
			"Replaced f with g at 2",
			"Changed"
		);
		array.set("g", 2);
		this.assertArray([ "d", "c", "g", "a", "k" ], array);
		
		this.setExpectedOutput();
		array.set("a", 3);
		this.assertArray([ "d", "c", "g", "a", "k" ], array);
		
		this.setExpectedOutput(
			"Moved g from 2 to 1",
			"Changed"
		);
		array.move(2, 1);
		this.assertArray([ "d", "g", "c", "a", "k" ], array);
		
		this.setExpectedOutput(
			"Moved d from 0 to 4",
			"Changed"
		);
		array.move(0, 4);
		this.assertArray([ "g", "c", "a", "k", "d" ], array);
		
		this.setExpectedOutput();
		array.move(1, 1);
		this.assertArray([ "g", "c", "a", "k", "d" ], array);
		
		this.setExpectedOutput(
			"Reordered",
			"Changed"
		);
		array.performReorder(function(items) {
			items.sort();
		}, this);
		this.assertArray([ "a", "c", "d", "g", "k" ], array);
		
		this.setExpectedOutput(
			"Filtered",
			"Changed",
			"Changed length from 5 to 3"
		);
		array.performFilter(function(items) {
			items.splice(0, 2);
		}, this);
		this.assertArray([ "d", "g", "k" ], array);
		
		this.setExpectedOutput(
			"Resetted",
			"Changed"
		);
		var base = array.base;
		array.performReset(function(items) {
			return [ "u", "t", "c" ];
		});
		this.assertStrictEqual(base, array.base);
		this.assertArray([ "u", "t", "c" ], array);
		
		this.setExpectedOutput(
			"Cleared",
			"Changed",
			"Changed length from 3 to 0"
		);
		array.clear();
		this.assertArray([  ], array);
		
		this.setExpectedOutput(
			"Added h at 0",
			"Changed",
			"Changed length from 0 to 1"
		);
		array.add("h");
		this.assertArray([ "h" ], array);
		
		this.setExpectedOutput(
			"Cleared",
			"Changed",
			"Changed length from 1 to 0"
		);
		array.destroy();
	},
	
	testEvery: function() {
		var array = new JW.ObservableArray([ "a", "A", "b" ]);
		
		this.assertFalse(array.every(this.isUpperCase));
		this.assertFalse(array.every(this.isA));
		this.assertTrue (array.every(this.isString));
		this.assertFalse(array.every(this.isNumber));
	},
	
	testSome: function() {
		var array = new JW.ObservableArray([ "a", "A", "b" ]);
		
		this.assertTrue (array.some(this.isUpperCase));
		this.assertTrue (array.some(this.isA));
		this.assertTrue (array.some(this.isString));
		this.assertFalse(array.some(this.isNumber));
	},
	
	testFilter: function() {
		var array = new JW.ObservableArray([ "a", "A", "b" ]);
		var filtered = array.filter(this.isA);
		this.assertTrue(filtered instanceof JW.Array);
		this.assertEqual(2, filtered.getLength());
		this.assertEqual(array.get(0), filtered.get(0));
		this.assertEqual(array.get(1), filtered.get(1));
	},
	
	testMap: function() {
		var array = new JW.ObservableArray([ "a", "b", "c" ]);
		var mapped = array.map(function(x) { return x.toUpperCase(); });
		this.assertTrue(mapped instanceof JW.Array);
		this.assertStrictEqual(3, mapped.getLength());
		this.assertStrictEqual("A", mapped.get(0));
		this.assertStrictEqual("B", mapped.get(1));
		this.assertStrictEqual("C", mapped.get(2));
	},
	
	testClone: function() {
		var array = new JW.ObservableArray([ "a", "b", "c" ]);
		var cloned = array.clone();
		this.assertTrue(cloned instanceof JW.ObservableArray);
		this.assertStrictNotEqual(array, cloned);
		this.assertStrictEqual(3, cloned.getLength());
		this.assertStrictEqual("a", cloned.get(0));
		this.assertStrictEqual("b", cloned.get(1));
		this.assertStrictEqual("c", cloned.get(2));
	},
	
	testCloneUnobservable: function() {
		var array = new JW.ObservableArray([ "a", "b", "c" ]);
		var cloned = array.cloneUnobservable();
		this.assertTrue(cloned instanceof JW.Array);
		this.assertStrictEqual(3, cloned.getLength());
		this.assertStrictEqual("a", cloned.get(0));
		this.assertStrictEqual("b", cloned.get(1));
		this.assertStrictEqual("c", cloned.get(2));
	},
	
	testRemoveItem: function()
	{
		var array = new JW.ObservableArray([ 0, 2, 3, 2, 3, 0 ]);
		this.assertStrictEqual(1, array.removeItem(2));
		this.assertTrue(JW.Array.equal([ 0, 3, 2, 3, 0 ], array.getItems(), true, true));
	},
	
	testMapFields: function() {
		var array = new JW.ObservableArray([
			{ x: "a", y: "d" },
			{ x: "b", y: "e" },
			{ x: "c", y: "f" }
		]);
		var mapped = array.mapFields();
		this.assertTrue(mapped.x instanceof JW.Array);
		this.assertTrue(mapped.y instanceof JW.Array);
		this.assertStrictEqual(3, mapped.x.getLength());
		this.assertStrictEqual(3, mapped.y.getLength());
		this.assertStrictEqual("a", mapped.x.get(0));
		this.assertStrictEqual("b", mapped.x.get(1));
		this.assertStrictEqual("c", mapped.x.get(2));
		this.assertStrictEqual("d", mapped.y.get(0));
		this.assertStrictEqual("e", mapped.y.get(1));
		this.assertStrictEqual("f", mapped.y.get(2));
	},
	
	subscribe: function(array) {
		array.addEvent.bind(this.onAdd, this);
		array.removeEvent.bind(this.onRemove, this);
		array.replaceEvent.bind(this.onReplace, this);
		array.moveEvent.bind(this.onMove, this);
		array.clearEvent.bind(this.onClear, this);
		array.reorderEvent.bind(this.onReorder, this);
		array.filterEvent.bind(this.onFilter, this);
		array.resetEvent.bind(this.onReset, this);
		array.changeEvent.bind(this.onChange, this);
		array.lengthChangeEvent.bind(this.onLengthChange, this);
	},
	
	assertArray: function(values, array) {
		this.assertStrictEqual(values.length, array.getLength());
		for (var i = 0; i < array.getLength(); ++i) {
			this.assertStrictEqual(values[i], array.get(i));
		}
	},
	
	onAdd: function(params) {
		this.output("Added " + params.items.join(", ") + " at " + params.index);
	},
	
	onRemove: function(params) {
		this.output("Removed " + params.items.join(", ") + " at " + params.index);
	},
	
	onReplace: function(params) {
		this.output("Replaced " + params.oldItem + " with " + params.newItem + " at " + params.index);
	},
	
	onMove: function(params) {
		this.output("Moved " + params.item + " from " + params.fromIndex + " to " + params.toIndex);
	},
	
	onClear: function(params) {
		this.output("Cleared");
	},
	
	onReorder: function(params) {
		this.output("Reordered");
	},
	
	onFilter: function(params) {
		this.output("Filtered");
	},
	
	onReset: function(params) {
		this.output("Resetted");
	},
	
	onChange: function(params) {
		this.output("Changed");
	},
	
	onLengthChange: function(params) {
		this.output("Changed length from " + params.oldLength + " to " + params.newLength);
	},
	
	isUpperCase: function(value) {
		return value.toUpperCase() === value;
	},
	
	isA: function(value) {
		return value.toUpperCase() === "A";
	},
	
	isString: function(value) {
		return typeof value === "string";
	},
	
	isNumber: function(value) {
		return typeof value === "number";
	}
});

JW.Tests.Collection.ObservableArray = {};
