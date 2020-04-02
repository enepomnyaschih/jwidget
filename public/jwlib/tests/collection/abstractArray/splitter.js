/*
	jWidget library tests.
	
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

JW.Tests.Collection.AbstractArray.SplitterTestCase = JW.Unit.TestCase.extend({
	testSplitter: function() {
		var testCase = this;
		var rowId = 0;
		
		var source = new JW.Array([
			"a", "b", "c",
			"d", "e", "f",
			"g"
		]);
		
		var splitter = source.createSplitter({
			capacity : 3
		});
		
		this.assertStrictEqual(3, splitter.rows.getLength());
		this.assertTrue(splitter.rows.get(0) instanceof JW.Array);
		this.assertTrue(splitter.rows.get(1) instanceof JW.Array);
		this.assertTrue(splitter.rows.get(2) instanceof JW.Array);
		
		this.assertTarget([ "a", "b", "c" ], splitter.rows.get(0));
		this.assertTarget([ "d", "e", "f" ], splitter.rows.get(1));
		this.assertTarget([ "g" ], splitter.rows.get(2));
		
		splitter.destroy();
		source.destroy();
	},
	
	assertTarget: function(values, target) {
		this.assertStrictEqual(values.length, target.getLength());
		for (var i = 0; i < target.getLength(); ++i) {
			this.assertStrictEqual(values[i], target.get(i));
		}
	}
});
