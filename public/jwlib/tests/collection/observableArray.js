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
			"Spliced -[] +[0:[d]] to []",
			"Changed",
			"Changed length from 0 to 1"
		);
		array.add("d");
		this.assertArray([ "d" ], array);
		
		this.setExpectedOutput(
			"Spliced -[] +[1:[f]] to [d]",
			"Changed",
			"Changed length from 1 to 2"
		);
		array.addAll([ "f" ]);
		this.assertArray([ "d", "f" ], array);
		
		this.setExpectedOutput(
			"Spliced -[] +[1:[c]] to [d,f]",
			"Changed",
			"Changed length from 2 to 3"
		);
		array.add("c", 1);
		this.assertArray([ "d", "c", "f" ], array);
		
		this.setExpectedOutput(
			"Spliced -[] +[0:[b, m]] to [d,c,f]",
			"Changed",
			"Changed length from 3 to 5"
		);
		array.addAll([ "b", "m" ], 0);
		this.assertArray([ "b", "m", "d", "c", "f" ], array);
		
		this.setExpectedOutput();
		array.addAll([], 1);
		this.assertArray([ "b", "m", "d", "c", "f" ], array);
		
		this.setExpectedOutput(
			"Spliced -[] +[5:[a]] to [b,m,d,c,f]",
			"Changed",
			"Changed length from 5 to 6"
		);
		array.add("a", 5);
		this.assertArray([ "b", "m", "d", "c", "f", "a" ], array);
		
		this.setExpectedOutput(
			"Spliced -[1:[m]] +[] to [b,m,d,c,f,a]",
			"Changed",
			"Changed length from 6 to 5"
		);
		array.remove(1);
		this.assertArray([ "b", "d", "c", "f", "a" ], array);
		
		this.setExpectedOutput(
			"Spliced -[0:[b]] +[] to [b,d,c,f,a]",
			"Changed",
			"Changed length from 5 to 4"
		);
		array.remove(0);
		this.assertArray([ "d", "c", "f", "a" ], array);
		
		this.setExpectedOutput(
			"Spliced -[] +[4:[k]] to [d,c,f,a]",
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
			"Spliced -[0:[g,c],3:[k]] +[0:[o,n,m],2:[p]] to [g,c,a,k,d]",
			"Changed",
			"Changed length from 5 to 6"
		);
		array.splice(
			[
				new JW.AbstractArray.IndexCount(0, 2),
				new JW.AbstractArray.IndexCount(3, 1),
				new JW.AbstractArray.IndexCount(4, 0)
			],
			[
				new JW.AbstractArray.IndexItems(0, [ "o", "n", "m" ]),
				new JW.AbstractArray.IndexItems(1, []),
				new JW.AbstractArray.IndexItems(2, [ "p" ])
			]
		);
		this.assertArray([ "o", "n", "m", "a", "d", "p" ], array);
		
		this.setExpectedOutput(
			"Reordered [o,n,m,a,d,p] by [3,2,4,0,1,5]",
			"Changed"
		);
		array.reorder([ 3, 2, 4, 0, 1, 5 ]);
		this.assertArray([ "a", "d", "n", "o", "m", "p" ], array);
		
		this.setExpectedOutput();
		array.reorder([ 0, 1, 2, 3, 4, 5 ]);
		this.assertArray([ "a", "d", "n", "o", "m", "p" ], array);
		
		this.setExpectedOutput(
			"Reordered [a,d,n,o,m,p] by [0,1,3,4,2,5]",
			"Changed"
		);
		var items = array.getItems().concat();
		items.sort();
		array.performReorder(items);
		this.assertArray([ "a", "d", "m", "n", "o", "p" ], array);
		
		this.setExpectedOutput(
			"Spliced -[0:[a],4:[o]] +[1:[q,r]] to [a,d,m,n,o,p]",
			"Changed"
		);
		var items = array.getItems().concat();
		items.splice(4, 1);
		items.splice(0, 1);
		items.splice(1, "q", "r");
		array.performSplice(items);
		this.assertArray([ "d", "q", "r", "m", "n", "p" ], array);
		
		this.setExpectedOutput(
			"Cleared [d,q,r,m,n,p]",
			"Changed",
			"Changed length from 6 to 0"
		);
		array.clear();
		this.assertArray([], array);
		
		this.setExpectedOutput(
			"Spliced -[] +[0:[h]] to []",
			"Changed",
			"Changed length from 0 to 1"
		);
		array.add("h");
		this.assertArray([ "h" ], array);
		
		this.setExpectedOutput(
			"Cleared [h]",
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
		this.subscribe(array);
		
		this.setExpectedOutput(
			"Spliced -[1:[2]] +[] to [0,2,3,2,3,0]",
			"Changed",
			"Changed length from 6 to 5"
		);
		this.assertStrictEqual(1, array.removeItem(2));
		this.setExpectedOutput();
		this.assertUndefined(array.removeItem(1));
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
	
	testTop: function() {
		this.assertUndefined(new JW.ObservableArray().top());
		this.assertStrictEqual("c", new JW.ObservableArray([ "a", "b", "c" ]).top());
	},
	
	testPop: function() {
		var arr = new JW.ObservableArray([ "a", "b", "c" ]);
		this.subscribe(arr);
		this.setExpectedOutput(
			"Spliced -[2:[c]] +[] to [a,b,c]",
			"Changed",
			"Changed length from 3 to 2"
		);
		this.assertStrictEqual("c", arr.pop());
		this.setExpectedOutput();
		this.assertTrue(JW.Array.equal([ "a", "b" ], arr.getItems(), true, true));
	},
	
	testPopEmpty: function() {
		var arr = new JW.ObservableArray();
		this.subscribe(arr);
		this.setExpectedOutput();
		this.assertUndefined(arr.pop());
		this.assertTrue(JW.Array.equal([], arr.getItems(), true, true));
	},
	
	subscribe: function(array) {
		JW.Tests.Collection.subscribeToArray(this, array);
	},
	
	assertArray: function(values, array) {
		JW.Tests.Collection.assertArray(this, values, array);
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
