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

JW.Tests.Collection.ArrayTestCase = JW.Tests.Collection.AbstractArrayBase.extend({
	// override
	createArray: function(items) {
		return new JW.Array(items);
	},
	
	// override
	invoke: function(array, method, args) {
		return array[method].apply(array, args || []);
	},
	
	testNotAdapter: function() {
		var items = [2, 4];
		var array = new JW.Array(items);
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
		var array = new JW.Array(items, true);
		this.assertStrictEqual(2, array.getLength());
		this.assertFalse(array.isEmpty());
		this.assertStrictEqual(2, array.get(0));
		this.assertStrictEqual(4, array.get(1));
		array.set(3, 0);
		this.assertStrictEqual(3, array.get(0));
		this.assertStrictEqual(3, items[0]);
	},
	
	testToArray: function() {
		var array = new JW.Array([2, 4]);
		this.assertTrue(JW.Array.equal(array.toArray(), array.getItems()));
		this.assertTrue(array.$toArray().equal(array.getItems()));
		this.assertFalse(array.toArray() === array.getItems());
		this.assertFalse(array.$toArray() === array);
		this.assertTrue(array.equal([2, 4]));
	},
	
	testAsArray: function() {
		var array = new JW.Array([2, 4]);
		this.assertTrue(array.asArray() === array.getItems());
		this.assertTrue(array.$asArray() === array);
		this.assertTrue(array.equal([2, 4]));
	},
	
	testOwnItemsOff: function() {
		var cls = function(testCase, value) {
			cls._super.call(this);
			this.testCase = testCase;
			this.value = value;
		};
		
		JW.extend(cls, JW.Class, {
			destroyObject: function() {
				this.testCase.output("destroy " + this.value);
				this._super();
			}
		});
		
		var array = new JW.Array([
			new cls(this, "a"),
			new cls(this, "b"),
			new cls(this, "c"),
			new cls(this, "d"),
			new cls(this, "e"),
			new cls(this, "f"),
			new cls(this, "g")
		]);
		array.set(new cls(this, "k"), 0); // kbcdefg
		array.remove(0); // bcdefg
		array.removeAll(1, 2); // befg
		array.move(1, 2);  // bfeg
		array.clear();
		array.addAll([
			new cls(this, "a"),
			new cls(this, "b")
		]);
		array.destroy();
	},
	
	testOwnItemsOn: function() {
		var cls = function(testCase, value) {
			cls._super.call(this);
			this.testCase = testCase;
			this.value = value;
		};
		
		JW.extend(cls, JW.Class, {
			destroyObject: function() {
				this.testCase.output("destroy " + this.value);
				this._super();
			}
		});
		
		var array = new JW.Array([
			new cls(this, "a"),
			new cls(this, "b"),
			new cls(this, "c"),
			new cls(this, "d"),
			new cls(this, "e"),
			new cls(this, "f"),
			new cls(this, "g")
		]).ownItems();
		this.setExpectedOutput(
			"destroy a"
		);
		array.set(new cls(this, "k"), 0); // kbcdefg
		this.setExpectedOutput(
			"destroy k"
		);
		array.remove(0); // bcdefg
		this.setExpectedOutput(
			"destroy d",
			"destroy c"
		);
		array.removeAll(1, 2); // befg
		this.setExpectedOutput();
		array.move(1, 2);  // bfeg
		this.setExpectedOutput(
			"destroy g",
			"destroy e",
			"destroy f",
			"destroy b"
		);
		array.clear();
		this.setExpectedOutput();
		array.addAll([
			new cls(this, "a"),
			new cls(this, "b")
		]);
		this.setExpectedOutput(
			"destroy b",
			"destroy a"
		);
		array.destroy();
	}
});

JW.Tests.Collection.Array = {};
