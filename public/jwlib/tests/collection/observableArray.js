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

JW.Tests.Collection.ObservableArrayTestCase = JW.Tests.Collection.AbstractArrayBase.extend({
	// override
	createArray: function(items, formatter) {
		var array = new JW.ObservableArray(items);
		JW.Tests.Collection.subscribeToArray(this, array, formatter);
		return array;
	},
	
	// override
	invoke: function(array, method, args) {
		return array[method].apply(array, args || []);
	},
	
	// override
	setObservableOutput: function() {
		this.setExpectedOutput.apply(this, arguments);
	},
	
	testNotAdapter: function() {
		var items = [2, 4];
		var array = new JW.ObservableArray(items);
		this.assertStrictEqual(2, array.getLength());
		this.assertFalse(array.isEmpty());
		this.assertStrictEqual(2, array.get(0));
		this.assertStrictEqual(4, array.get(1));
		array.set(3, 0);
		this.assertStrictEqual(3, array.get(0));
		this.assertStrictEqual(2, items[0]);
	},
	
	testAdapter: function() {
		var items = [2, 4];
		var array = new JW.ObservableArray(items, true);
		this.assertStrictEqual(2, array.getLength());
		this.assertFalse(array.isEmpty());
		this.assertStrictEqual(2, array.get(0));
		this.assertStrictEqual(4, array.get(1));
		array.set(3, 0);
		this.assertStrictEqual(3, array.get(0));
		this.assertStrictEqual(3, items[0]);
	},
	
	testToArray: function() {
		var array = new JW.ObservableArray([2, 4]);
		this.assertTrue(JW.Array.equal(array.toArray(), array.getItems()));
		this.assertTrue(array.$toArray().equal(array.getItems()));
		this.assertFalse(array.toArray() === array.getItems());
		this.assertFalse(array.$toArray() === array);
		this.assertTrue(array.equal([2, 4]));
	},
	
	testAsArray: function() {
		var array = new JW.ObservableArray([2, 4]);
		this.assertTrue(array.asArray() === array.getItems());
		this.assertTrue(array.$asArray() === array);
		this.assertTrue(array.equal([2, 4]));
	},

	testLateDestruction: function() {
		var test = this;

		var a = new JW.Class();
		a.destroy = function() { test.output("Destroy a"); };

		var b = new JW.Class();
		b.destroy = function() { test.output("Destroy b"); };

		var c = new JW.Class();
		c.destroy = function() { test.output("Destroy c"); };

		var set = new JW.ObservableArray([a, b]).ownItems();
		set.replaceEvent.bind(function() { test.output("Replace"); });
		set.spliceEvent.bind(function() { test.output("Splice"); });
		set.clearEvent.bind(function() { test.output("Clear"); });

		this.setExpectedOutput("Replace", "Destroy a");
		set.set(c, 0);

		this.setExpectedOutput("Splice", "Destroy b");
		set.remove(1);

		this.setExpectedOutput("Clear", "Destroy c");
		set.clear();

		this.setExpectedOutput();
		set.destroy();
	}
});

JW.Tests.Collection.ObservableArray = {};
