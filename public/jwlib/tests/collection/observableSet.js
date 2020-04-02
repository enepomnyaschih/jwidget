﻿/*
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

JW.Tests.Collection.ObservableSetTestCase = JW.Tests.Collection.AbstractSetBase.extend({
	// override
	createSet: function(items, formatter) {
		var set = new JW.ObservableSet(items);
		JW.Tests.Collection.subscribeToSet(this, set, formatter);
		return set;
	},
	
	// override
	invoke: function(set, method, args) {
		return set[method].apply(set, args || []);
	},
	
	// override
	setObservableOutput: function() {
		this.setExpectedOutput.apply(this, arguments);
	},
	
	testNotAdapter: function() {
		var items = [this.b, this.d];
		var set = new JW.ObservableSet(items);
		this.assertStrictEqual(2, set.getLength());
		this.assertFalse(set.isEmpty());
		this.assertTrue(set.contains(this.b));
		this.assertTrue(set.contains(this.d));
		set.add(this.c);
		this.assertTrue(set.contains(this.c));
		this.assertTrue(JW.Array.equal(items, [this.b, this.d]));
	},
	
	testAdapter: function() {
		var items = {};
		JW.Set.addAll(items, [this.b, this.d]);
		var set = new JW.ObservableSet(items, this);
		this.assertStrictEqual(2, set.getLength());
		this.assertFalse(set.isEmpty());
		this.assertTrue(set.contains(this.b));
		this.assertTrue(set.contains(this.d));
		this.assertFalse(set.contains(this.c));
		this.assertFalse(JW.Set.contains(items, this.c));
		set.add(this.c);
		this.assertTrue(set.contains(this.c));
		this.assertTrue(JW.Set.contains(items, this.c));
	},
	
	testToSet: function() {
		var set = new JW.ObservableSet([this.b, this.d]);
		this.assertTrue(JW.Set.equal(set.toSet(), [this.b, this.d]));
		this.assertTrue(set.$toSet().equal([this.b, this.d]));
		this.assertFalse(set.toSet() === set.getJson());
		this.assertFalse(set.$toSet() === set);
		this.assertTrue(set.equal([this.b, this.d]));
	},
	
	testAsSet: function() {
		var set = new JW.ObservableSet([this.b, this.d]);
		this.assertTrue(set.asSet() === set.getJson());
		this.assertTrue(set.$asSet() === set);
		this.assertTrue(set.equal([this.b, this.d]));
	},

	testLateDestruction: function() {
		var test = this;

		var a = new JW.Class();
		a.destroy = function() { test.output("Destroy a"); };

		var b = new JW.Class();
		b.destroy = function() { test.output("Destroy b"); };

		var set = new JW.ObservableSet([a, b]).ownItems();
		set.spliceEvent.bind(function() { test.output("Splice"); });
		set.clearEvent.bind(function() { test.output("Clear"); });

		this.setExpectedOutput("Splice", "Destroy a");
		set.remove(a);

		this.setExpectedOutput("Clear", "Destroy b");
		set.clear();

		this.setExpectedOutput();
		set.destroy();
	}
});

JW.Tests.Collection.ObservableSet = {};
