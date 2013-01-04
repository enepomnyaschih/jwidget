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

JW.ns("JW.Tests.Override");

JW.Tests.Override.ArrayTestCase = JW.Unit.TestCase.extend({
	setupAll: function()
	{
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
	},
	
	testEvery: function()
	{
		this.assertTrue (JW.every(this.arr, JW.isDefined));
		this.assertFalse(JW.every(this.arr, JW.isSet));
	},
	
	testEach: function()
	{
		this.addExpectedOutput(
			"0: 10",
			"1: null",
			"2: lala"
		);
		
		JW.each(this.arr, function(item, key) {
			this.output(key + ": " + item);
		}, this);
	},
	
	testSome: function()
	{
		this.assertTrue (JW.some(this.arrr, JW.isDefined));
		this.assertTrue (JW.some(this.arrr, JW.isSet));
		this.assertFalse(JW.some(this.arrr, JW.isBlank));
	},
	
	testGetValuesArray: function()
	{
		this.assertTrue(JW.equal([ 10, null, "lala" ], JW.getValuesArray(this.arr), true, true));
		this.assertNotEqual(this.arr, JW.getValuesArray(this.arr));
	},
	
	testGetValuesSet: function()
	{
		this.assertTrue(JW.equal({ "10": true, "null": true, "lala": true }, JW.getValuesSet(this.arr), true, true));
	},
	
	testClone: function()
	{
		var clone = JW.clone(this.aa);
		
		this.assertNotEqual(this.aa, clone);
		this.assertTrue(JW.equal(this.aa, clone));
	},
	
	testMap: function()
	{
		var result = JW.map(this.aa, function mapFn(item) {
			return item + 1;
		}, this);
		
		this.assertTrue(JW.Array.equal(result, [ 1, 2, 3, 4, 3, 4, 1, 2 ]));
		this.assertNotEqual(this.aa, result);
	},
	
	testMapBy: function()
	{
		this.assertTrue(JW.Array.equal(JW.mapBy(this.bb, "b"), [ 1, 2, 3 ]));
		this.assertTrue(JW.Array.equal(JW.mapBy(this.cc, "q.b"), [ 1, 2, undefined, 3 ]));
		
		var bb = this.bb.concat();
		this.assertNotEqual(bb, JW.mapBy(bb, "b"));
	},
	
	testFindBy: function()
	{
		this.assertEqual(2, JW.findBy(this.bb, 'a', 1));
		this.assertEqual(3, JW.findBy(this.cc, 'q.a', 1));
		this.assertEqual(undefined, JW.findBy(this.bb, 'a', 2));
		this.assertEqual(undefined, JW.findBy(this.cc, 'q.a', 2));
	},
	
	testSearchBy: function()
	{
		this.assertEqual(this.b3, JW.searchBy(this.bb, 'a', 1));
		this.assertEqual(this.c3, JW.searchBy(this.cc, 'q.a', 1));
		this.assertUndefined(JW.searchBy(this.bb, 'a', 2));
		this.assertUndefined(JW.searchBy(this.cc, 'q.a', 2));
	},
	
	testRemoveBy: function()
	{
		this.assertTrue(JW.Array.equal(JW.Array.removeBy(this.bb.concat(), 'a', 0), [ this.b3 ]));
		this.assertTrue(JW.Array.equal(JW.Array.removeBy(this.cc.concat(), 'q.a', 0), [ null, this.c3 ]));
		
		var bb = this.bb.concat();
		this.assertEqual(bb, JW.Array.removeBy(bb, 'a', 0));
	},
	
	testFilter: function()
	{
		var result = JW.filter(this.bb, function filterFn(item) {
			return item.a == 0;
		}, this);
		
		this.assertTrue(JW.Array.equal(result, [ this.b1, this.b2 ]));
		this.assertNotEqual(this.bb, result);
		
		result = JW.filter(this.bb, function filterFn(item) {
			return item.a != 0;
		}, this);
		
		this.assertTrue(JW.Array.equal(result, [ this.b3 ]));
	},
	
	testFilterBy: function()
	{
		this.assertTrue(JW.Array.equal(JW.filterBy(this.bb, 'a', 0), [ this.b1, this.b2 ]));
		this.assertTrue(JW.Array.equal(JW.filterBy(this.cc, 'q.a', 0), [ this.c1, this.c2 ]));
		
		var bb = this.bb.concat();
		this.assertNotEqual(bb, JW.filterBy(bb, 'a', 0));
	},
	
	testMerge: function()
	{
		var target = JW.clone(this.aa);
		this.assertEqual(target, JW.merge(target, this.arr));
		
		var expected = [ 0, 1, 2, 3, 2, 3, 0, 1, 10, null, "lala" ];
		this.assertTrue(JW.equal(expected, target, true, true));
	},
	
	testRemoveItem: function()
	{
		this.assertTrue(JW.Array.equal(JW.Array.removeItem(this.aa.concat(), 1), [ 0, 2, 3, 2, 3, 0 ]));
		
		var aa = this.aa.concat();
		this.assertEqual(aa, JW.Array.removeItem(aa, 1));
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
		
		this.assertTrue (JW.Array.equal(a1, a2));
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
		
		this.assertTrue(JW.equal(b, JW.Array.collapse(a),    true, true));
		this.assertTrue(JW.equal(c, JW.Array.collapse(a, 1), true, true));
		this.assertTrue(JW.equal(d, JW.Array.collapse(a, 2), true, true));
	},
	
	testIndexOf: function()
	{
		this.assertStrictEqual( 3, JW.Array.indexOf([ "a", "b", "c", "d", "e", "f" ], "d"));
		this.assertStrictEqual(-1, JW.Array.indexOf([ "a", "b", "c", "d", "e", "f" ], "h"));
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
	
	testFly: function()
	{
		var a = [ 0, 1, 2, 3, 2, 3, 0, 1 ];
		
		this.assertTrue(JW.equal([ 1, 2, 3, 2, 3, 1 ], JW(a).filter(function(x) { return x > 0; }), true, true));
		this.assertStrictEqual(1, JW(a).top());
		this.assertStrictEqual(2, JW(a).indexOf(2));
		this.assertStrictEqual(4, JW(a).lastIndexOf(2));
		
		JW(a).pop();
		this.assertTrue(JW.equal([ 0, 1, 2, 3, 2, 3, 0 ], a));
	}
});
