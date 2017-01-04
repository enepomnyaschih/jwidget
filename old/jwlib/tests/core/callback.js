/*
	jWidget Lib tests.
	
	Copyright (C) 2015 Egor Nepomnyaschih
	
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

JW.Tests.Core.CallbackTestCase = JW.Unit.TestCase.extend({
	testByField: function() {
		var obj = {
			p: {
				q: 2
			}
		};
		this.assertStrictEqual(2, JW.byField("p.q")(obj));
		this.assertStrictEqual(2, JW.byField(["p", "q"])(obj));
	},
	
	testByFieldBlank: function() {
		var obj = {
			p: {
				q: 2
			}
		};
		this.assertStrictEqual(obj, JW.byField()(obj));
		this.assertStrictEqual(obj, JW.byField("")(obj));
		this.assertStrictEqual(obj, JW.byField([])(obj));
	},
	
	testByFieldUndefined: function() {
		this.assertUndefined(JW.byField("p.q")({}));
		this.assertUndefined(JW.byField(["p", "q"])({}));
	},
	
	testByValue: function() {
		var obj = {
			p: {
				q: 2
			}
		};
		this.assertTrue(JW.byValue("p.q", 2)(obj));
		this.assertTrue(JW.byValue(["p", "q"], 2)(obj));
		this.assertFalse(JW.byValue("p.q", 3)(obj));
		this.assertFalse(JW.byValue(["p", "q"], 3)(obj));
	},
	
	testByValueBlank: function() {
		var obj = {
			p: {
				q: 2
			}
		};
		this.assertTrue(JW.byValue(null, obj)(obj));
		this.assertTrue(JW.byValue("", obj)(obj));
		this.assertTrue(JW.byValue([], obj)(obj));
		this.assertFalse(JW.byValue(null, obj)(1));
		this.assertFalse(JW.byValue("", obj)(1));
		this.assertFalse(JW.byValue([], obj)(1));
	},
	
	testByValueTypeCast: function() {
		var obj = {
			p: {
				q: "2"
			}
		};
		this.assertFalse(JW.byValue("p.q", 2)(obj));
	},
	
	testByValueUndefined: function() {
		this.assertFalse(JW.byValue("p.q", 2)({}));
		this.assertFalse(JW.byValue(["p", "q"], 2)({}));
	},
	
	testByMethod: function() {
		var obj = {
			z: 2,
			m: function(x, y) { return x + y + this.z; }
		};
		this.assertStrictEqual(9, JW.byMethod("m", [3, 4])(obj));
	},
	
	testByMethodNoArgs: function() {
		var obj = {
			m: function() { return 2; }
		};
		this.assertStrictEqual(2, JW.byMethod("m")(obj));
	}
});
