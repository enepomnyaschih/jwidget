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

JW.Tests.Collection.Set.StaticMethodsTestCase = JW.Tests.Collection.AbstractSetBase.extend({
	// override
	createSet: function(items) {
		items = items || [];
		var set = {};
		for (var i = 0; i < items.length; ++i) {
			set[items[i]._iid] = items[i];
		}
		return set;
	},
	
	// override
	invoke: function(set, method, args) {
		return JW.Set[method].apply(window, [set].concat(JW.args(args || [])));
	},
	
	testToSet: function() {
		var set = this.createSet([this.b, this.d]);
		this.assertTrue(JW.Set.equal(JW.Set.toSet(set), [this.b, this.d]));
		this.assertTrue(JW.Set.$toSet(set).equal([this.b, this.d]));
		this.assertFalse(JW.Set.toSet(set) === set);
		this.assertFalse(JW.Set.$toSet(set).getJson() === set);
		this.assertTrue(JW.Set.equal(set, [this.b, this.d]));
	},
	
	testAsSet: function() {
		var set = this.createSet([this.b, this.d]);
		this.assertTrue(JW.Set.asSet(set) === set);
		this.assertTrue(JW.Set.$asSet(set).getJson() === set);
		this.assertTrue(JW.Set.equal(set, [this.b, this.d]));
	}
});
