/*
	JW equal function tests.
	
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

JW.ns("JW.Tests.Core");

JW.Tests.Core.EqualTestCase = JW.Unit.TestCase.extend({
	testEqualSimple: function()
	{
		this.assertTrue (JW.equal(10, 10));
		this.assertTrue (JW.equal(true, true));
		this.assertTrue (JW.equal(false, false));
		this.assertTrue (JW.equal("aka", "aka"));
		this.assertTrue (JW.equal(null, undefined));
		this.assertTrue (JW.equal(10, "10"));
		this.assertTrue (JW.equal(1, true));
		
		this.assertFalse(JW.equal("true", true));
		this.assertFalse(JW.equal(null, 0));
		this.assertFalse(JW.equal(10, 20));
		this.assertFalse(JW.equal(true, false));
		this.assertFalse(JW.equal(null, 1));
		this.assertFalse(JW.equal("aka", "AKA"));
	},
	
	testEqualSimpleStrict: function()
	{
		this.assertTrue (JW.equal(10, 10, false, true));
		this.assertTrue (JW.equal(true, true, false, true));
		this.assertTrue (JW.equal(false, false, false, true));
		this.assertTrue (JW.equal("aka", "aka", false, true));
		
		this.assertFalse(JW.equal(null, undefined, false, true));
		this.assertFalse(JW.equal(10, "10", false, true));
		this.assertFalse(JW.equal(1, true, false, true));
		this.assertFalse(JW.equal("true", true, false, true));
		this.assertFalse(JW.equal(null, 0, false, true));
		this.assertFalse(JW.equal(10, 20, false, true));
		this.assertFalse(JW.equal(true, false, false, true));
		this.assertFalse(JW.equal(null, 1, false, true));
		this.assertFalse(JW.equal("aka", "AKA", false, true));
	},
	
	testEqualArray: function()
	{
		this.assertTrue (JW.equal([ 10, 20, "30" ], [ "10", 20, 30 ]));
		this.assertTrue (JW.equal([ 10, 20,  30  ], [  10,  20, 30 ], false, true));
		
		this.assertFalse(JW.equal([ 10, 20,  35  ], [  10,  20, 30 ]));
		this.assertFalse(JW.equal([ 10, 20,  30  ], [  10,  20, 30, 40 ]));
		this.assertFalse(JW.equal([ 10, 20,  30  ], [  10,  20 ]));
		this.assertFalse(JW.equal([ 10, 20, "30" ], [ "10", 20, 30 ], false, true));
		
		this.assertTrue (JW.equal([ {}, {}, {} ], [ {}, {}, {} ], true));
		this.assertFalse(JW.equal([ {}, {}, {} ], [ {}, {}, {} ]));
		
		this.assertTrue (JW.equal([ { a: 10 }, { b: 20 } ], [ { a: "10" }, { b: "20" } ], true));
		this.assertFalse(JW.equal([ { a: 10 }, { b: 20 } ], [ { a: "10" }, { b: "20" } ], true, true));
		this.assertFalse(JW.equal([ { a: 10 }, { b: 20 } ], [ { A: "10" }, { b: "20" } ], true));
		
		var a = {}, b = {}, c = {};
		this.assertTrue (JW.equal([ a, b, c ], [ a, b, c ]));
	},
	
	testEqualObject: function()
	{
		this.assertTrue (JW.equal({ a: 10, b: 20 }, { a: "10", b: "20" }));
		this.assertTrue (JW.equal({ a: 10, b: 20 }, { a:  10,  b:  20  }, false, true));
		
		this.assertFalse(JW.equal({ a: 10, b: 25 }, { a:  10,  b:  20  }));
		this.assertFalse(JW.equal({ a: 10, c: 20 }, { a:  10,  b:  20  }));
		this.assertFalse(JW.equal({ a: 10, b: 20 }, { a:  10 }));
		this.assertFalse(JW.equal({ a: 10, b: 20 }, { a:  10,  b:  20, c: 30 }));
		this.assertFalse(JW.equal({ a: 10, b: 20 }, { a: "10", b: "20" }, false, true));
		
		this.assertTrue (JW.equal({ a: {}, b: {} }, { a: {}, b: {} }, true));
		this.assertFalse(JW.equal({ a: {}, b: {} }, { a: {}, b: {} }));
		
		this.assertTrue (JW.equal({ a: [ 10 ], b: [ 20 ] }, { a: [ "10" ], b: [ "20" ] }, true));
		this.assertFalse(JW.equal({ a: [ 10 ], b: [ 20 ] }, { a: [ "10" ], b: [ "20" ] }, true, true));
		this.assertFalse(JW.equal({ a: [ 10 ], b: [ 20 ] }, { a: [ "10" ], b: [ "20", null ] }, true));
	},
	
	testEqualInfinite: function()
	{
		var a = {
			a: true,
			b: {},
			c: 10,
			d: [ 50, [] ]
		};
		
		var b = {
			a: true,
			b: {},
			c: 10,
			d: [ 50, [] ]
		};
		
		var c = {
			a: true,
			b: {
				k: {
					a: true,
					b: {},
					c: 10,
					d: [ 50, [] ]
				}
			},
			c: 10,
			d: [ 50, [ a ] ]
		};
		
		a.b.k = b;
		b.b.k = a;
		a.d[1].push(a);
		b.d[1].push(b);
		
		this.assertTrue (JW.equal(a, b, true, true));
		this.assertFalse(JW.equal(c, b, true));
		this.assertFalse(JW.equal(a, c, true));
	}
});
