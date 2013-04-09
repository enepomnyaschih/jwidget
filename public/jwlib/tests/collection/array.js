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

JW.Tests.Collection.ArrayTestCase = function(config) {
	JW.Tests.Collection.ArrayTestCase._super.call(this, config);
	this.aa = [ 0, 1, 2, 3, 2, 3, 0, 1 ];
	this.b1 = { a: 0, b: 1 };
	this.b2 = { a: 0, b: 2 };
	this.b3 = { a: 1, b: 3 };
	this.bb = [ this.b1, this.b2, this.b3 ];
	this.c1 = { q: this.b1 };
	this.c2 = { q: this.b2 };
	this.c3 = { q: this.b3 };
	this.cc = [ this.c1, this.c2, null, this.c3 ];
	this.arr = [ 10, null, "lala" ];
	this.arrr = [ 10, "lala" ];
};

JW.extend(JW.Tests.Collection.ArrayTestCase, JW.Unit.TestCase, {
	testEvery: function()
	{
		this.assertTrue (JW.Array.every(this.arr, JW.isDefined));
		this.assertFalse(JW.Array.every(this.arr, JW.isSet));
		this.assertTrue (JW.Array.every(this.arr, JW.emptyFn));
	},
	
	testEach: function()
	{
		this.addExpectedOutput(
			"0: 10",
			"1: null",
			"2: lala"
		);
		
		JW.Array.each(this.arr, function(item, key) {
			this.output(key + ": " + item);
		}, this);
	},
	
	testSome: function()
	{
		this.assertTrue (JW.Array.some(this.arrr, JW.isDefined));
		this.assertTrue (JW.Array.some(this.arrr, JW.isSet));
		this.assertFalse(JW.Array.some(this.arrr, JW.isBlank));
		this.assertTrue (JW.Array.some(this.arrr, JW.emptyFn));
	},
	
	testGetValuesArray: function()
	{
		this.assertTrue(JW.Array.equal([ 10, null, "lala" ], JW.Array.getValuesArray(this.arr)));
		this.assertNotEqual(this.arr, JW.Array.getValuesArray(this.arr));
	},
	
	testGetValuesSet: function()
	{
		this.assertTrue(JW.Map.equal({ "10": 10, "lala": "lala" }, JW.Array.indexBy(this.arr)));
	},
	
	testClone: function()
	{
		var clone = JW.Array.clone(this.aa);
		
		this.assertNotEqual(this.aa, clone);
		this.assertTrue(JW.Array.equal(this.aa, clone));
	},
	
	testMap: function()
	{
		var result = JW.Array.map(this.aa, function(item) {
			return item + 1;
		}, this);
		
		this.assertTrue(JW.Array.equal(result, [ 1, 2, 3, 4, 3, 4, 1, 2 ]));
		this.assertNotEqual(this.aa, result);
	},
	
	testMapBy: function()
	{
		this.assertTrue(JW.Array.equal(JW.Array.mapBy(this.bb, "b"), [ 1, 2, 3 ]));
		this.assertTrue(JW.Array.equal(JW.Array.mapBy(this.cc, "q.b"), [ 1, 2, undefined, 3 ]));
		
		var bb = this.bb.concat();
		this.assertNotEqual(bb, JW.Array.mapBy(bb, "b"));
	},
	
	testFindStatic: function()
	{
		var arr = [ 1, 2, 3, 3, 4 ];
		this.assertStrictEqual(2, JW.Array.find(arr, function(x) { return x === 3; }));
		this.assertUndefined(JW.Array.find(arr, function(x) { return x === 0; }));
		this.assertStrictEqual(0, JW.Array.find(arr, JW.emptyFn));
	},
	
	testFindBy: function()
	{
		this.assertEqual(2, JW.Array.findBy(this.bb, 'a', 1));
		this.assertEqual(3, JW.Array.findBy(this.cc, 'q.a', 1));
		this.assertEqual(undefined, JW.Array.findBy(this.bb, 'a', 2));
		this.assertEqual(undefined, JW.Array.findBy(this.cc, 'q.a', 2));
	},
	
	testSearchStatic: function()
	{
		var arr = [ 1, 2, 3, 3, 4 ];
		this.assertStrictEqual(3, JW.Array.search(arr, function(x) { return x === 3; }));
		this.assertUndefined(JW.Array.search(arr, function(x) { return x === 0; }));
		this.assertStrictEqual(1, JW.Array.search(arr, JW.emptyFn));
	},
	
	testSearchBy: function()
	{
		this.assertEqual(this.b3, JW.Array.searchBy(this.bb, 'a', 1));
		this.assertEqual(this.c3, JW.Array.searchBy(this.cc, 'q.a', 1));
		this.assertUndefined(JW.Array.searchBy(this.bb, 'a', 2));
		this.assertUndefined(JW.Array.searchBy(this.cc, 'q.a', 2));
	},
	
	testFilter: function()
	{
		var result = JW.Array.filter(this.bb, function(item) {
			return item.a == 0;
		}, this);
		
		this.assertTrue(JW.Array.equal(result, [ this.b1, this.b2 ]));
		this.assertNotEqual(this.bb, result);
		
		result = JW.Array.filter(this.bb, function(item) {
			return item.a != 0;
		}, this);
		
		this.assertTrue(JW.Array.equal(result, [ this.b3 ]));
	},
	
	testFilterStatic: function()
	{
		this.assertTrue(JW.Array.equal([ 1, 3, 3 ], JW.Array.filter([ 1, 2, 3, 3, 4 ], function(x) { return x % 2 === 1; })));
		this.assertTrue(JW.Array.equal([ 1, 2, 3, 0, 3, 0, 4 ], JW.Array.filter([ 1, 2, 3, 0, 3, 0, 4 ], JW.emptyFn)));
	},
	
	testFilterBy: function()
	{
		this.assertTrue(JW.Array.equal(JW.Array.filterBy(this.bb, 'a', 0), [ this.b1, this.b2 ]));
		this.assertTrue(JW.Array.equal(JW.Array.filterBy(this.cc, 'q.a', 0), [ this.c1, this.c2 ]));
		
		var bb = this.bb.concat();
		this.assertNotEqual(bb, JW.Array.filterBy(bb, 'a', 0));
	},
	
	testRemoveItem: function()
	{
		var array = new JW.Array([ 0, 2, 3, 2, 3, 0 ]);
		this.assertStrictEqual(1, array.removeItem(2));
		this.assertUndefined(array.removeItem(1));
		this.assertTrue(JW.Array.equal([ 0, 3, 2, 3, 0 ], array.getItems(), true, true));
	},
	
	testRemoveItemStatic: function()
	{
		var array = [ 0, 2, 3, 2, 3, 0 ];
		this.assertStrictEqual(1, JW.Array.removeItem(array, 2));
		this.assertUndefined(JW.Array.removeItem(array, 1));
		this.assertTrue(JW.Array.equal([ 0, 3, 2, 3, 0 ], array, true, true));
	},
	
	testEqual: function()
	{
		this.assertTrue(JW.Array.equal(this.aa.concat(), this.aa));
		
		var a1 = [ 0, 1, 2, 5, 4 ];
		var a2 = [ "0", "1", "2", "5", "4" ];
		var a3 = [ 0, 1, 3, 5, 4 ];
		var a4 = [ 0, 1, 2, 5 ];
		var a5 = [ 0, 1, 2, 5, 4, 3 ];
		var a6 = [ 0, 5, 2, 1, 4 ];
		var a7 = [ 0, 1, 2, 5, 4 ];
		
		this.assertTrue (JW.Array.equal(a1, a1));
		this.assertTrue (JW.Array.equal(a1, a7));
		this.assertFalse(JW.Array.equal(a1, a2));
		this.assertFalse(JW.Array.equal(a1, a3));
		this.assertFalse(JW.Array.equal(a1, a4));
		this.assertFalse(JW.Array.equal(a1, a5));
		this.assertFalse(JW.Array.equal(a1, a6));
	},
	
	testPushAll: function()
	{
		var a = [ 0, 1, 2, 3 ];
		JW.Array.pushAll(a, [ 4, 5, 6 ]);
		this.assertTrue(JW.Array.equal([ 0, 1, 2, 3, 4, 5, 6 ], a));
	},
	
	testSortBy: function()
	{
		var b1 = { p: { q: 1 } };
		var b2 = { p: { q: 2 } };
		var b3 = { p: { q: 3 } };
		var b4 = { p: { q: 4 } };
		var b5 = { p: { q: 5 } };
		
		var a = [ b2, b5, b4, b1, b3 ];
		var b = [ b1, b2, b3, b4, b5 ];
		var c = [ b5, b4, b3, b2, b1 ];
		
		var bb = a.concat();
		JW.Array.sortBy(bb, "p.q");
		this.assertTrue(JW.Array.equal(bb, b));
		
		var cc = a.concat();
		JW.Array.sortBy(cc, "p.q", -1);
		this.assertTrue(JW.Array.equal(cc, c));
	},
	
	testTop: function()
	{
		this.assertUndefined(JW.Array.top([]));
		this.assertStrictEqual(10, JW.Array.top([ 10 ]));
		this.assertStrictEqual(20, JW.Array.top([ 10, 20 ]));
		this.assertStrictEqual(null, JW.Array.top([ 10, 20, null ]));
	},
	
	testCollapse: function()
	{
		var a = [
			"a",
			[
				"b",
				"c"
			],
			[
				null,
				"d",
				[
					"e",
					"f"
				]
			],
			null,
			"g",
			[
				[
					[
						"h",
						"i"
					]
				]
			]
		];
		
		var b = [
			"a",
			"b",
			"c",
			null,
			"d",
			"e",
			"f",
			null,
			"g",
			"h",
			"i"
		];
		
		var c = [
			"a",
			"b",
			"c",
			null,
			"d",
			[
				"e",
				"f"
			],
			null,
			"g",
			[
				[
					"h",
					"i"
				]
			]
		];
		
		var d = [
			"a",
			"b",
			"c",
			null,
			"d",
			"e",
			"f",
			null,
			"g",
			[
				"h",
				"i"
			]
		];
		
		this.assertTrue(this.equal(b, JW.Array.collapse(a),    true, true));
		this.assertTrue(this.equal(c, JW.Array.collapse(a, 1), true, true));
		this.assertTrue(this.equal(d, JW.Array.collapse(a, 2), true, true));
	},
	
	testIndexOf: function()
	{
		this.assertStrictEqual(3, JW.Array.indexOf([ "a", "b", "c", "d", "e", "f" ], "d"));
		this.assertUndefined(JW.Array.indexOf([ "a", "b", "c", "d", "e", "f" ], "h"));
	},
	
	testCmp: function()
	{
		this.assertTrue(JW.Array.cmp([ "a" ], []) > 0);
		this.assertTrue(JW.Array.cmp([], [ "a" ]) < 0);
		this.assertTrue(JW.Array.cmp([ "a", "b" ], []) > 0);
		this.assertTrue(JW.Array.cmp([], [ "a", "b" ]) < 0);
		this.assertTrue(JW.Array.cmp([ "a", "c" ], [ "a", "b" ]) > 0);
		this.assertTrue(JW.Array.cmp([ "a", "b" ], [ "a", "c" ]) < 0);
		this.assertTrue(JW.Array.cmp([ "a", "B" ], [ "a", "b" ]) != 0);
		this.assertTrue(JW.Array.cmp([ "a", "b" ], [ "a", "b" ]) == 0);
		this.assertTrue(JW.Array.cmp([ "a", "B" ], [ "a", "c" ], true) < 0);
		this.assertTrue(JW.Array.cmp([ "a", "B" ], [ "A", "b" ], true) == 0);
	},
	
	equal: function(x, y, recursively, strict)
	{
		var pairs = [];
		var eq = strict ? JW.seq : JW.eq;
		var req;
		
		function rec(x, y)
		{
			// Either not object/array
			if (typeof x !== "object" || typeof y !== "object")
				return eq(x, y);
			
			// May be the same?
			if (x === y)
				return true;
			
			// May be have different type? (object/array)
			var xa = JW.isArray(x);
			var ya = JW.isArray(y);
			
			if (xa !== ya)
				return false;
			
			// May be this is infinite inclusion?
			for (var i = 0; i < pairs.length; ++i)
			{
				if ((pairs[i][0] === x && pairs[i][1] === y) ||
					(pairs[i][0] === y && pairs[i][1] === x))
					return true;
			}
			
			pairs.push([ x, y ]);
			
			// May be they are both arrays?
			if (xa)
			{
				if (x.length !== y.length)
					return false;
				
				for (var i = 0; i < x.length; ++i)
				{
					if (!req(x[i], y[i]))
						return false;
				}
				
				return true;
			}
			
			// They are objects!
			var keys = {};
			
			for (var i in x)
			{
				keys[i] = true;
				if (!req(x[i], y[i]))
					return false;
			}
			
			for (var i in y)
			{
				if (!keys[i])
					return false;
				delete keys[i];
			}
			
			for (var i in keys)
				return false;
			
			return true
		}
		
		req = recursively ? rec : eq;
		
		return rec(x, y);
	}
});
