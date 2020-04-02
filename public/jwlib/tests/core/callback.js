/*
MIT License

Copyright (c) 2020 Egor Nepomnyaschih

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
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
