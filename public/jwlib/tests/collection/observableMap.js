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

JW.Tests.Collection.ObservableMapTestCase = JW.Tests.Collection.AbstractMapBase.extend({
	// override
	createMap: function(items, formatter) {
		var map = new JW.ObservableMap(items);
		JW.Tests.Collection.subscribeToMap(this, map, formatter);
		return map;
	},
	
	// override
	invoke: function(map, method, args) {
		return map[method].apply(map, args || []);
	},
	
	// override
	setObservableOutput: function() {
		this.setExpectedOutput.apply(this, arguments);
	},
	
	testNotAdapter: function() {
		var items = {a: 2, b: 4};
		var map = new JW.ObservableMap(items);
		this.assertStrictEqual(2, map.getLength());
		this.assertFalse(map.isEmpty());
		this.assertStrictEqual(2, map.get("a"));
		this.assertStrictEqual(4, map.get("b"));
		map.set(3, "a");
		this.assertStrictEqual(3, map.get("a"));
		this.assertStrictEqual(2, items.a);
	},
	
	testAdapter: function() {
		var items = {a: 2, b: 4};
		var map = new JW.ObservableMap(items, true);
		this.assertStrictEqual(2, map.getLength());
		this.assertFalse(map.isEmpty());
		this.assertStrictEqual(2, map.get("a"));
		this.assertStrictEqual(4, map.get("b"));
		map.set(3, "a");
		this.assertStrictEqual(3, map.get("a"));
		this.assertStrictEqual(3, items.a);
	},
	
	testToMap: function() {
		var map = new JW.ObservableMap({a: 2, b: 4});
		this.assertTrue(JW.Map.equal(map.toMap(), map.getJson()));
		this.assertTrue(map.$toMap().equal(map.getJson()));
		this.assertFalse(map.toMap() === map.getJson());
		this.assertFalse(map.$toMap() === map);
		this.assertTrue(map.equal({a: 2, b: 4}));
	},
	
	testAsMap: function() {
		var map = new JW.ObservableMap({a: 2, b: 4});
		this.assertTrue(map.asMap() === map.getJson());
		this.assertTrue(map.$asMap() === map);
		this.assertTrue(map.equal({a: 2, b: 4}));
	},

	testLateDestruction: function() {
		var test = this;

		var a = new JW.Class();
		a.destroy = function() { test.output("Destroy a"); };

		var b = new JW.Class();
		b.destroy = function() { test.output("Destroy b"); };

		var c = new JW.Class();
		c.destroy = function() { test.output("Destroy c"); };

		var d = new JW.Class();
		d.destroy = function() { test.output("Destroy d"); };

		var set = new JW.ObservableMap({a: a, b: b, c: c}).ownItems();
		set.spliceEvent.bind(function() { test.output("Splice"); });
		set.clearEvent.bind(function() { test.output("Clear"); });

		this.setExpectedOutput("Splice", "Destroy a");
		set.remove("a");

		this.setExpectedOutput("Splice", "Destroy b");
		set.set(d, "b");

		this.setExpectedOutput("Splice", "Destroy c");
		set.splice(["c"], {});

		this.setExpectedOutput("Clear", "Destroy d");
		set.clear();

		this.setExpectedOutput();
		set.destroy();
	}
});

JW.Tests.Collection.ObservableMap = {};
