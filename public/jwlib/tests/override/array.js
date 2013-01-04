/*
	JW array prototype extension tests.
	
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
		this.assertTrue (this.arr.every(JW.isDefined));
		this.assertFalse(this.arr.every(JW.isSet));
	},
	
	testEach: function()
	{
		this.addExpectedOutput(
			"0: 10",
			"1: null",
			"2: lala"
		);
		
		this.arr.each(function(item, key) {
			this.output(key + ": " + item);
		}, this);
	},
	
	testSome: function()
	{
		this.assertTrue (this.arrr.some(JW.isDefined));
		this.assertTrue (this.arrr.some(JW.isSet));
		this.assertFalse(this.arrr.some(JW.isBlank));
	},
	
	testGetValuesArray: function()
	{
		this.assertTrue(JW.equal([ 10, null, "lala" ], this.arr.getValuesArray(), true, true));
		this.assertNotEqual(this.arr, this.arr.getValuesArray());
	},
	
	testGetValuesSet: function()
	{
		this.assertTrue(JW.equal({ "10": true, "null": true, "lala": true }, this.arr.getValuesSet(), true, true));
	},
	
	testClone: function()
	{
		var clone = this.aa.clone();
		
		this.assertNotEqual(this.aa, clone);
		this.assertTrue(JW.equal(this.aa, clone));
	},
	
	testMap: function()
	{
		var result = this.aa.map(function mapFn(item) {
			return item + 1;
		}, this);
		
		this.assertTrue(result.equal([ 1, 2, 3, 4, 3, 4, 1, 2 ]));
		this.assertNotEqual(this.aa, result);
	},
	
	testMapBy: function()
	{
		this.assertTrue(this.bb.mapBy("b").equal([ 1, 2, 3 ]));
		this.assertTrue(this.cc.mapBy("q.b").equal([ 1, 2, undefined, 3 ]));
		
		var bb = this.bb.concat();
		this.assertNotEqual(bb, bb.mapBy("b"));
	},
	
	testFindBy: function()
	{
		this.assertEqual(2, this.bb.findBy('a', 1));
		this.assertEqual(3, this.cc.findBy('q.a', 1));
		this.assertEqual(undefined, this.bb.findBy('a', 2));
		this.assertEqual(undefined, this.cc.findBy('q.a', 2));
	},
	
	testSearchBy: function()
	{
		this.assertEqual(this.b3, this.bb.searchBy('a', 1));
		this.assertEqual(this.c3, this.cc.searchBy('q.a', 1));
		this.assertUndefined(this.bb.searchBy('a', 2));
		this.assertUndefined(this.cc.searchBy('q.a', 2));
	},
	
	testRemoveBy: function()
	{
		this.assertTrue(this.bb.concat().removeBy('a', 0).equal([ this.b3 ]));
		this.assertTrue(this.cc.concat().removeBy('q.a', 0).equal([ null, this.c3 ]));
		
		var bb = this.bb.concat();
		this.assertEqual(bb, bb.removeBy('a', 0));
	},
	
	testFilter: function()
	{
		var result = this.bb.filter(function filterFn(item) {
			return item.a == 0;
		}, this);
		
		this.assertTrue(result.equal([ this.b1, this.b2 ]));
		this.assertNotEqual(this.bb, result);
		
		result = this.bb.filter(function filterFn(item) {
			return item.a != 0;
		}, this);
		
		this.assertTrue(result.equal([ this.b3 ]));
	},
	
	testFilterBy: function()
	{
		this.assertTrue(this.bb.filterBy('a', 0).equal([ this.b1, this.b2 ]));
		this.assertTrue(this.cc.filterBy('q.a', 0).equal([ this.c1, this.c2 ]));
		
		var bb = this.bb.concat();
		this.assertNotEqual(bb, bb.filterBy('a', 0));
	},
	
	testMerge: function()
	{
		var target = this.aa.clone();
		this.assertEqual(target, target.merge(this.arr));
		
		var expected = [ 0, 1, 2, 3, 2, 3, 0, 1, 10, null, "lala" ];
		this.assertTrue(JW.equal(expected, target, true, true));
	},
	
	testRemoveItem: function()
	{
		this.assertTrue(this.aa.concat().removeItem(1).equal([ 0, 2, 3, 2, 3, 0 ]));
		
		var aa = this.aa.concat();
		this.assertEqual(aa, aa.removeItem(1));
	},
	
	testEqual: function()
	{
		this.assertTrue(this.aa.concat().equal(this.aa));
		
		var a1 = [ 0, 1, 2, 5, 4 ];
		var a2 = [ "0", "1", "2", "5", "4" ];
		var a3 = [ 0, 1, 3, 5, 4 ];
		var a4 = [ 0, 1, 2, 5 ];
		var a5 = [ 0, 1, 2, 5, 4, 3 ];
		var a6 = [ 0, 5, 2, 1, 4 ];
		
		this.assertTrue (a1.equal(a2));
		this.assertFalse(a1.equal(a3));
		this.assertFalse(a1.equal(a4));
		this.assertFalse(a1.equal(a5));
		this.assertFalse(a1.equal(a6));
	},
	
	testPushAll: function()
	{
		var a = [ 0, 1, 2, 3 ];
		a.pushAll([ 4, 5, 6 ]);
		this.assertTrue([ 0, 1, 2, 3, 4, 5, 6 ].equal(a));
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
		bb.sortBy("p.q");
		this.assertTrue(bb.equal(b));
		
		var cc = a.concat();
		cc.sortBy("p.q", -1);
		this.assertTrue(cc.equal(c));
	},
	
	testTop: function()
	{
		this.assertUndefined([].top());
		this.assertStrictEqual(10, [ 10 ].top());
		this.assertStrictEqual(20, [ 10, 20 ].top());
		this.assertStrictEqual(null, [ 10, 20, null ].top());
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
		
		this.assertTrue(JW.equal(b, a.collapse(),  true, true));
		this.assertTrue(JW.equal(c, a.collapse(1), true, true));
		this.assertTrue(JW.equal(d, a.collapse(2), true, true));
	},
	
	testIndexOf: function()
	{
		this.assertStrictEqual( 3, [ "a", "b", "c", "d", "e", "f" ].indexOf("d"));
		this.assertStrictEqual(-1, [ "a", "b", "c", "d", "e", "f" ].indexOf("h"));
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
