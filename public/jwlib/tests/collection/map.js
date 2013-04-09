/*
	jWidget Lib tests.
	
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

JW.Tests.Collection.MapTestCase = function(config) {
	JW.Tests.Collection.MapTestCase._super.call(this, config);
};

JW.extend(JW.Tests.Collection.MapTestCase, JW.Unit.TestCase, {
	testRemoveItem: function() {
		var map = new JW.Map({ "a": 0, "b": 2, "c": 3, "d": 2, "e": 3, "f": 0 });
		this.assertStrictEqual("b", map.removeItem(2));
		this.assertUndefined(map.removeItem(1));
		this.assertTrue(JW.Map.equal({ "a": 0, "c": 3, "d": 2, "e": 3, "f": 0 }, map.getJson()));
	},
	
	testRemoveItemStatic: function() {
		var map = { "a": 0, "b": 2, "c": 3, "d": 2, "e": 3, "f": 0 };
		this.assertStrictEqual("b", JW.Map.removeItem(map, 2));
		this.assertUndefined(JW.Map.removeItem(map, 1));
		this.assertTrue(JW.Map.equal({ "a": 0, "c": 3, "d": 2, "e": 3, "f": 0 }, map));
	},
	
	testEqual: function() {
		var a = new JW.Map({ "a": 0, "b": 2, "c": 3, "d": 2, "e": 3, "f": 0 });
		var b = new JW.Map({ "a": 0, "b": 2, "c": 3, "d": 2, "e": 3, "f": 0 });
		var c = new JW.Map({ "a": 0, "f": 0, "b": 2, "c": 3, "d": 2, "e": 3 });
		var d = new JW.Map({ "a": 0, "b": 2, "c": 3, "d": 3, "e": 3, "f": 0 });
		var e = new JW.Map({ "a": 0, "b": 2, "c": 3, "D": 2, "e": 3, "f": 0 });
		var f = new JW.Map({ "a": 0, "b": 2, "c": 3, "d": 2, "e": 3, "f": 0, "g": 0 });
		var g = new JW.Map({ "a": 0, "b": 2, "c": 3, "d": 2, "e": 3 });
		this.assertTrue(a.equal(a));
		this.assertTrue(a.equal(b));
		this.assertTrue(a.equal(c));
		this.assertFalse(a.equal(d));
		this.assertFalse(a.equal(e));
		this.assertFalse(a.equal(f));
		this.assertFalse(a.equal(g));
	},
	
	testEqualStatic: function() {
		var a = { "a": 0, "b": 2, "c": 3, "d": 2, "e": 3, "f": 0 };
		var b = { "a": 0, "b": 2, "c": 3, "d": 2, "e": 3, "f": 0 };
		var c = { "a": 0, "f": 0, "b": 2, "c": 3, "d": 2, "e": 3 };
		var d = { "a": 0, "b": 2, "c": 3, "d": 3, "e": 3, "f": 0 };
		var e = { "a": 0, "b": 2, "c": 3, "D": 2, "e": 3, "f": 0 };
		var f = { "a": 0, "b": 2, "c": 3, "d": 2, "e": 3, "f": 0, "g": 0 };
		var g = { "a": 0, "b": 2, "c": 3, "d": 2, "e": 3 };
		this.assertTrue(JW.Map.equal(a, a));
		this.assertTrue(JW.Map.equal(a, b));
		this.assertTrue(JW.Map.equal(a, c));
		this.assertFalse(JW.Map.equal(a, d));
		this.assertFalse(JW.Map.equal(a, e));
		this.assertFalse(JW.Map.equal(a, f));
		this.assertFalse(JW.Map.equal(a, g));
	}
});
