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
	testSeparate: function() {
		this.addExpectedOutput(
			"Added d at 0",
			"Added f at 1",
			"Added c at 1",
			"Added b at 0",
			"Added a at 4",
			"Removed f at 3",
			"Removed d at 1",
			"Removed b at 0",
			"Added k at 2",
			"Replaced a with g at 1",
			"Moved k from 2 to 1",
			"Moved c from 0 to 2",
			"Cleared",
			"Added h at 0"
		);
		
		var collection = new JW.Collection();
		this.subscribe(collection);
		
		collection.add(JW("d"));
		this.assertCollection([ "d" ], collection);
		
		collection.addAll([ JW("f") ]);
		this.assertCollection([ "d", "f" ], collection);
		
		collection.add(JW("c"), 1);
		this.assertCollection([ "d", "c", "f" ], collection);
		
		collection.addAll([ JW("b"), JW("m") ], 0);
		this.assertCollection([ "b", "m", "d", "c", "f" ], collection);
		
		collection.addAll([], 1);
		this.assertCollection([ "b", "m", "d", "c", "f" ], collection);
		
		var a = JW("a");
		
		collection.add(a, 5);
		this.assertCollection([ "b", "m", "d", "c", "f", "a" ], collection);
		
		collection.remove(1);
		this.assertCollection([ "b", "d", "c", "f", "a" ], collection);
		
		collection.remove(0);
		this.assertCollection([ "d", "c", "f", "a" ], collection);
		
		collection.add(JW("k"));
		this.assertCollection([ "d", "c", "f", "a", "k" ], collection);
		
		collection.set(JW("g"), 2);
		this.assertCollection([ "d", "c", "g", "a", "k" ], collection);
		
		collection.set(a, 3);
		this.assertCollection([ "d", "c", "g", "a", "k" ], collection);
		
		collection.move(2, 1);
		this.assertCollection([ "d", "g", "c", "a", "k" ], collection);
		
		collection.move(0, 4);
		this.assertCollection([ "g", "c", "a", "k", "d" ], collection);
		
		collection.move(1, 1);
		this.assertCollection([ "g", "c", "a", "k", "d" ], collection);
		
		JW.Array.sortBy(collection.base, "base");
		collection.triggerReorder();
		this.assertCollection([ "a", "c", "d", "g", "k" ], collection);
		
		collection.base.splice(0, 2);
		collection.triggerFilter();
		this.assertCollection([ "d", "g", "k" ], collection);
		
		collection.base = [ JW("u"), JW("t"), JW("c") ];
		collection.triggerReset();
		this.assertCollection([ "u", "t", "c" ], collection);
		
		collection.clear();
		this.assertCollection([  ], collection);
		
		collection.add(JW("h"));
		this.assertCollection([ "h" ], collection);
		
		collection.destroy();
	},
	
	testEvery: function() {
		var collection = new JW.Collection([ JW(0), null, "" ]);
		
		this.assertTrue (collection.every(JW.isDefined));
		this.assertFalse(collection.every(JW.isSet));
		this.assertTrue (collection.every(JW.isBlank));
		this.assertFalse(collection.every(JW.isBlank.not()));
	},
	
	testSome: function()
	{
		var collection = new JW.Collection([ 0, null, "" ]);
		
		this.assertTrue (collection.some(JW.isDefined));
		this.assertTrue (collection.some(JW.isSet));
		this.assertTrue (collection.some(JW.isBlank));
		this.assertFalse(collection.some(JW.isBlank.not()));
	},
	
	testFilterBy: function()
	{
		var collection = new JW.Collection([
			{ q: { a: 1, b: 0 }},
			{ q: { a: 0, b: 1 }},
			{ q: { a: 0, b: 2 }},
			{ q: { a: 1, b: 3 }}
		]);
		
		var filtered = collection.filterBy("q.a", 0);
		this.assertNotEqual(collection, filtered);
		
		var expected = [
			{ q: { a: 0, b: 1 }},
			{ q: { a: 0, b: 2 }}
		];
		
		this.assertTrue(JW.equal(expected, filtered.base, true, true));
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
			this.assertStrictEqual(values[i], collection.get(i).base);
		}
	},
	
	onAdd: function(params) {
		this.output("Added " + JW.mapBy(params.items, "base").join(", ") + " at " + params.index);
	},
	
	onRemove: function(params) {
		this.output("Removed " + JW.mapBy(params.items, "base").join(", ") + " at " + params.index);
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
		this.output("Changed length from " + params.oldLength + " to " + params.toLength);
	}
});
