/*
	jWidget Lib tests.

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

JW.Tests.Collection.Array.StaticMethodsTestCase = JW.Tests.Collection.AbstractArrayBase.extend({
	// override
	createArray: function(items) {
		return items || [];
	},

	// override
	invoke: function(array, method, args) {
		return JW.Array[method].apply(window, [array].concat(JW.args(args || [])));
	},

	testToArray: function() {
		var array = this.createArray([2, 4]);
		this.assertTrue(JW.Array.equal(JW.Array.toArray(array), array));
		this.assertTrue(JW.Array.$toArray(array).equal(array));
		this.assertFalse(JW.Array.toArray(array) === array);
		this.assertFalse(JW.Array.$toArray(array).getItems() === array);
		this.assertTrue(JW.Array.equal(array, [2, 4]));
	},

	testAsArray: function() {
		var array = this.createArray([2, 4]);
		this.assertTrue(JW.Array.asArray(array) === array);
		this.assertTrue(JW.Array.$asArray(array).getItems() === array);
		this.assertTrue(JW.Array.equal(array, [2, 4]));
	},

	testTryAddAllHuge: function() {
		var array = [];
		for (var i = 0; i < 300000; ++i) {
			array.push(i);
		}
		this.assertTrue(JW.Array.tryAddAll([], array));
	},

	testTryAddAllHuge2: function() {
		var array = [];
		for (var i = 0; i < 300000; ++i) {
			array.push(i);
		}
		this.assertTrue(JW.Array.tryAddAll([1], array, 0));
	}
/*
	// The next tests are dependent on hardware performance, and sometimes fail.
	// For debugging purposes only.
	testTryAddAllHugeTime: function() {
		var array = [];
		for (var i = 0; i < 300000; ++i) {
			array.push(i);
		}
		this.assertPerformance(50, function() {
			JW.Array.tryAddAll([], array);
		});
	}*/
});
