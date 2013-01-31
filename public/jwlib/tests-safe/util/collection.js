/*
	JW ordered collection tests.
	
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

JW.Tests.Util.CollectionTestCase = JW.Unit.TestCase.extend({
	testCollection: function() {
		var collection = new JW.Collection();
		this.subscribe(collection);
		
		this.setExpectedOutput(
			"Added d at 0",
			"Changed",
			"Changed length from 0 to 1"
		);
		collection.add("d");
		this.assertCollection([ "d" ], collection);
		
		this.setExpectedOutput(
			"Added f at 1",
			"Changed",
			"Changed length from 1 to 2"
		);
		collection.addAll([ "f" ]);
		this.assertCollection([ "d", "f" ], collection);
		
		this.setExpectedOutput(
			"Added c at 1",
			"Changed",
			"Changed length from 2 to 3"
		);
		collection.add("c", 1);
		this.assertCollection([ "d", "c", "f" ], collection);
		
		this.setExpectedOutput(
			"Added b, m at 0",
			"Changed",
			"Changed length from 3 to 5"
		);
		collection.addAll([ "b", "m" ], 0);
		this.assertCollection([ "b", "m", "d", "c", "f" ], collection);
		
		this.setExpectedOutput();
		collection.addAll([], 1);
		this.assertCollection([ "b", "m", "d", "c", "f" ], collection);
		
		this.setExpectedOutput(
			"Added a at 5",
			"Changed",
			"Changed length from 5 to 6"
		);
		collection.add("a", 5);
		this.assertCollection([ "b", "m", "d", "c", "f", "a" ], collection);
		
		this.setExpectedOutput(
			"Removed m at 1",
			"Changed",
			"Changed length from 6 to 5"
		);
		collection.remove(1);
		this.assertCollection([ "b", "d", "c", "f", "a" ], collection);
		
		this.setExpectedOutput(
			"Removed b at 0",
			"Changed",
			"Changed length from 5 to 4"
		);
		collection.remove(0);
		this.assertCollection([ "d", "c", "f", "a" ], collection);
		
		this.setExpectedOutput(
			"Added k at 4",
			"Changed",
			"Changed length from 4 to 5"
		);
		collection.add("k");
		this.assertCollection([ "d", "c", "f", "a", "k" ], collection);
		
		this.setExpectedOutput(
			"Replaced f with g at 2",
			"Changed"
		);
		collection.set("g", 2);
		this.assertCollection([ "d", "c", "g", "a", "k" ], collection);
		
		this.setExpectedOutput();
		collection.set("a", 3);
		this.assertCollection([ "d", "c", "g", "a", "k" ], collection);
		
		this.setExpectedOutput(
			"Moved g from 2 to 1",
			"Changed"
		);
		collection.move(2, 1);
		this.assertCollection([ "d", "g", "c", "a", "k" ], collection);
		
		this.setExpectedOutput(
			"Moved d from 0 to 4",
			"Changed"
		);
		collection.move(0, 4);
		this.assertCollection([ "g", "c", "a", "k", "d" ], collection);
		
		this.setExpectedOutput();
		collection.move(1, 1);
		this.assertCollection([ "g", "c", "a", "k", "d" ], collection);
		
		this.setExpectedOutput(
			"Reordered",
			"Changed"
		);
		collection.performReorder(function(items) {
			items.sort();
		}, this);
		this.assertCollection([ "a", "c", "d", "g", "k" ], collection);
		
		this.setExpectedOutput(
			"Filtered",
			"Changed",
			"Changed length from 5 to 3"
		);
		collection.performFilter(function(items) {
			items.splice(0, 2);
		}, this);
		this.assertCollection([ "d", "g", "k" ], collection);
		
		this.setExpectedOutput(
			"Resetted",
			"Changed"
		);
		var base = collection.base;
		collection.performReset(function(items) {
			return [ "u", "t", "c" ];
		});
		this.assertStrictEqual(base, collection.base);
		this.assertCollection([ "u", "t", "c" ], collection);
		
		this.setExpectedOutput(
			"Cleared",
			"Changed",
			"Changed length from 3 to 0"
		);
		collection.clear();
		this.assertCollection([  ], collection);
		
		this.setExpectedOutput(
			"Added h at 0",
			"Changed",
			"Changed length from 0 to 1"
		);
		collection.add("h");
		this.assertCollection([ "h" ], collection);
		
		this.setExpectedOutput(
			"Cleared",
			"Changed",
			"Changed length from 1 to 0"
		);
		collection.destroy();
	},
	
	testEvery: function() {
		var collection = new JW.Collection([ "a", "A", "b" ]);
		
		this.assertFalse(collection.every(this.isUpperCase));
		this.assertFalse(collection.every(this.isA));
		this.assertTrue (collection.every(this.isString));
		this.assertFalse(collection.every(this.isNumber));
	},
	
	testSome: function() {
		var collection = new JW.Collection([ "a", "A", "b" ]);
		
		this.assertTrue (collection.some(this.isUpperCase));
		this.assertTrue (collection.some(this.isA));
		this.assertTrue (collection.some(this.isString));
		this.assertFalse(collection.some(this.isNumber));
	},
	
	testFilter: function() {
		var collection = new JW.Collection([ "a", "A", "b" ]);
		var filtered = collection.filter(this.isA);
		this.assertEqual(2, filtered.getLength());
		this.assertEqual(collection.get(0), filtered.get(0));
		this.assertEqual(collection.get(1), filtered.get(1));
	},
	
	subscribe: function(collection) {
		collection.addEvent.bind(this.onAdd, this);
		collection.removeEvent.bind(this.onRemove, this);
		collection.replaceEvent.bind(this.onReplace, this);
		collection.moveEvent.bind(this.onMove, this);
		collection.clearEvent.bind(this.onClear, this);
		collection.reorderEvent.bind(this.onReorder, this);
		collection.filterEvent.bind(this.onFilter, this);
		collection.resetEvent.bind(this.onReset, this);
		collection.changeEvent.bind(this.onChange, this);
		collection.lengthChangeEvent.bind(this.onLengthChange, this);
	},
	
	assertCollection: function(values, collection) {
		this.assertStrictEqual(values.length, collection.getLength());
		for (var i = 0; i < collection.getLength(); ++i) {
			this.assertStrictEqual(values[i], collection.get(i));
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

JW.Tests.Util.Collection = {};
