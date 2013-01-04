/*
	JW ordered collection tests.
	
	Copyright (C) 2011 Egor Nepomnyaschih
	
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

JW.ns("JW.Tests.Util");

JW.Tests.Util.CollectionTestCase = JW.Unit.TestCase.extend({
	testSeparate: function()
	{
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
		
		collection.addItem("d");
		this.assertCollection([ "d" ], collection);
		
		collection.addItem("f");
		this.assertCollection([ "d", "f" ], collection);
		
		collection.addItemAt("c", 1);
		this.assertCollection([ "d", "c", "f" ], collection);
		
		collection.addItemAt("b", 0);
		this.assertCollection([ "b", "d", "c", "f" ], collection);
		
		collection.addItemAt("a", 4);
		this.assertCollection([ "b", "d", "c", "f", "a" ], collection);
		
		collection.removeItem("f");
		this.assertCollection([ "b", "d", "c", "a" ], collection);
		
		collection.removeItemAt(1);
		this.assertCollection([ "b", "c", "a" ], collection);
		
		collection.removeItemAt(0);
		this.assertCollection([ "c", "a" ], collection);
		
		collection.addItem("k");
		this.assertCollection([ "c", "a", "k" ], collection);
		
		collection.setItem(1, "g");
		this.assertCollection([ "c", "g", "k" ], collection);
		
		collection.moveItem(2, 1);
		this.assertCollection([ "c", "k", "g" ], collection);
		
		collection.moveItem(0, 2);
		this.assertCollection([ "k", "g", "c" ], collection);
		
		collection.clear();
		this.assertCollection([  ], collection);
		
		collection.addItem("h");
		this.assertCollection([ "h" ], collection);
		
		collection.destroy();
	},
	
	testAdapter: function()
	{
		this.addExpectedOutput(
			"Added d at 2",
			"Added f at 3",
			"Added c at 1",
			"Added b at 0",
			"Added a at 6",
			"Removed f at 5",
			"Removed p at 1",
			"Removed b at 0",
			"Added k at 4",
			"Replaced m with g at 1",
			"Moved a from 3 to 1",
			"Moved c from 0 to 2",
			"Cleared",
			"Added h at 0"
		);
		
		var base = [ "p", "m" ];
		
		var collection = new JW.Collection();
		collection.base = base;
		
		this.subscribe(collection);
		this.assertCollection([ "p", "m" ], collection, base);
		
		collection.addItem("d");
		this.assertCollection([ "p", "m", "d" ], collection, base);
		
		collection.addItem("f");
		this.assertCollection([ "p", "m", "d", "f" ], collection, base);
		
		collection.addItemAt("c", 1);
		this.assertCollection([ "p", "c", "m", "d", "f" ], collection, base);
		
		collection.addItemAt("b", 0);
		this.assertCollection([ "b", "p", "c", "m", "d", "f" ], collection, base);
		
		collection.addItemAt("a", 6);
		this.assertCollection([ "b", "p", "c", "m", "d", "f", "a" ], collection, base);
		
		collection.removeItem("f");
		this.assertCollection([ "b", "p", "c", "m", "d", "a" ], collection, base);
		
		collection.removeItemAt(1);
		this.assertCollection([ "b", "c", "m", "d", "a" ], collection, base);
		
		collection.removeItemAt(0);
		this.assertCollection([ "c", "m", "d", "a" ], collection, base);
		
		collection.addItem("k");
		this.assertCollection([ "c", "m", "d", "a", "k" ], collection, base);
		
		collection.setItem(1, "g");
		this.assertCollection([ "c", "g", "d", "a", "k" ], collection, base);
		
		collection.moveItem(3, 1);
		this.assertCollection([ "c", "a", "g", "d", "k" ], collection, base);
		
		collection.moveItem(0, 2);
		this.assertCollection([ "a", "g", "c", "d", "k" ], collection, base);
		
		collection.clear();
		this.assertCollection([  ], collection, base);
		
		collection.addItem("h");
		this.assertCollection([ "h" ], collection, base);
		
		collection.destroy();
	},
	
	testEvery: function()
	{
		var collection = new JW.Collection([ 0, null, "" ]);
		
		this.assertTrue (collection.every(JW.isDefined));
		this.assertFalse(collection.every(JW.isSet));
		this.assertTrue (collection.every(JW.isBlank));
		this.assertFalse(collection.every(JW.Function.not(JW.isBlank)));
	},
	
	testSome: function()
	{
		var collection = new JW.Collection([ 0, null, "" ]);
		
		this.assertTrue (collection.some(JW.isDefined));
		this.assertTrue (collection.some(JW.isSet));
		this.assertTrue (collection.some(JW.isBlank));
		this.assertFalse(collection.some(JW.Function.not(JW.isBlank)));
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
	
	subscribe: function(collection)
	{
		collection.bind("add",     this.onAdd,     this);
		collection.bind("remove",  this.onRemove,  this);
		collection.bind("replace", this.onReplace, this);
		collection.bind("move",    this.onMove,    this);
		collection.bind("clear",   this.onClear,   this);
	},
	
	assertCollection: function(values, collection, base)
	{
		this.assertStrictEqual(values.length, collection.getLength());
		this.assertStrictEqual(values.length, collection.base.length);
		for (var i = 0; i < collection.getLength(); ++i)
		{
			this.assertStrictEqual(values[i], collection.getItemAt(i));
			this.assertStrictEqual(values[i], collection.base[i]);
		}
		
		if (!base)
			return;
		
		this.assertTrue(JW.equal(values, base, false, true));
	},
	
	onAdd: function(event, index, item)
	{
		this.output("Added " + item + " at " + index);
	},
	
	onRemove: function(event, index, item)
	{
		this.output("Removed " + item + " at " + index);
	},
	
	onReplace: function(event, index, oldItem, newItem)
	{
		this.output("Replaced " + oldItem + " with " + newItem + " at " + index);
	},
	
	onMove: function(event, fromIndex, toIndex, item)
	{
		this.output("Moved " + item + " from " + fromIndex + " to " + toIndex);
	},
	
	onClear: function(event)
	{
		this.output("Cleared");
	}
});
