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

JW.Tests.Collection.AbstractSet.SorterComparingTestCase = JW.Unit.TestCase.extend({
	setup: function() {
		this.a = new JW.Proxy(0);
		this.b = new JW.Proxy(1);
		this.c = new JW.Proxy(2);
		this.d = new JW.Proxy(3);
		this.e = new JW.Proxy(4);
		this.f = new JW.Proxy(5);
		this.g = new JW.Proxy(6);
		this.h = new JW.Proxy(7);
		this.i = new JW.Proxy(8);
	},

	testShorthand: function() {
		var source = new JW.Set([this.a, this.b, this.c, this.d]);
		var target = source.$$toSortedComparing(this.compare, this);

		this.assertTarget([0, 2, 3, 1], target);

		target.destroy();
		source.destroy();
	},
	
	testUnobservableTarget: function() {
		var source = new JW.Set([this.a, this.b, this.c, this.d]);
		var target = new JW.Array();
		
		var sorterComparing = this.createSorterComparing(source, target, this.compare);
		this.assertTarget([0, 2, 3, 1], target);
		
		sorterComparing.destroy();
		this.assertTarget([], target);
		
		target.destroy();
		source.destroy();
	},
	
	testObservableTarget: function() {
		var source = new JW.Set([this.a, this.b, this.c, this.d]);
		var target = this.createTarget();
		
		this.setExpectedOutput(
			"Changed length from 0 to 4",
			"Spliced -[] +[0:[0,2,3,1]] to []",
			"Changed"
		);
		var sorterComparing = this.createSorterComparing(source, target, this.compare);
		this.assertTarget([0, 2, 3, 1], target);
		
		this.setExpectedOutput(
			"Changed length from 4 to 0",
			"Spliced -[0:[0,2,3,1]] +[] to [0,2,3,1]",
			"Changed"
		);
		sorterComparing.destroy();
		this.assertTarget([], target);
		
		this.setExpectedOutput();
		target.destroy();
		source.destroy();
	},
	
	testMultiSource: function() {
		var source1 = new JW.Set([this.a, this.b, this.c, this.d]);
		var source2 = new JW.Set([this.e, this.f, this.g, this.h]);
		var target = this.createTarget();
		
		this.setExpectedOutput(
			"Changed length from 0 to 1",
			"Spliced -[] +[0:[8]] to []",
			"Changed"
		);
		target.add(this.i);
		this.assertTarget([ 8 ], target);
		
		this.setExpectedOutput(
			"Changed length from 1 to 5",
			"Spliced -[] +[0:[0,2],3:[3,1]] to [8]",
			"Changed"
		);
		var sorterComparing1 = this.createSorterComparing(source1, target, this.compare);
		this.assertTarget([0, 2, 8, 3, 1], target);
		
		this.setExpectedOutput(
			"Changed length from 5 to 9",
			"Spliced -[] +[2:[4,6],5:[7,5]] to [0,2,8,3,1]",
			"Changed"
		);
		var sorterComparing2 = this.createSorterComparing(source2, target, this.compare);
		this.assertTarget([0, 2, 4, 6, 8, 7, 5, 3, 1], target);
		
		this.setExpectedOutput(
			"Changed length from 9 to 5",
			"Spliced -[0:[0,2],7:[3,1]] +[] to [0,2,4,6,8,7,5,3,1]",
			"Changed"
		);
		sorterComparing1.destroy();
		this.assertTarget([4, 6, 8, 7, 5], target);
		
		this.setExpectedOutput(
			"Changed length from 5 to 1",
			"Spliced -[0:[4,6],3:[7,5]] +[] to [4,6,8,7,5]",
			"Changed"
		);
		sorterComparing2.destroy();
		this.assertTarget([8], target);
		
		this.setExpectedOutput();
		target.destroy();
		
		this.setExpectedOutput();
		source1.destroy();
		source2.destroy();
	},
	
	// tests that empty array doesn't trigger "change" on initialization
	testEmptyChange: function() {
		var source = new JW.Set();
		var target = this.createTarget();
		var sorterComparing = this.createSorterComparing(source, target, this.compare);
		sorterComparing.destroy();
		target.destroy();
		source.destroy();
	},
	
	testAutoTarget: function() {
		var source = new JW.Set([this.a, this.b, this.c, this.d]);
		var sorterComparing = this.createSorterComparing(source, null, this.compare);
		this.assertTrue(sorterComparing.target instanceof JW.Array);
		this.assertTarget([0, 2, 3, 1], sorterComparing.target);
		sorterComparing.destroy();
		source.destroy();
	},
	
	testDefaultCompare: function() {
		var source = new JW.Set([this.e, this.d, this.c, this.a, this.b]);
		var target = new JW.Array();
		var sorterComparing = this.createSorterComparing(source, target);
		this.assertTarget([0, 1, 2, 3, 4], target);
		sorterComparing.destroy();
		target.destroy();
		source.destroy();
	},
	
	createTarget: function() {
		var target = new JW.ObservableArray();
		JW.Tests.Collection.subscribeToArray(this, target, function(x) { return x.value; });
		return target;
	},
	
	createSorterComparing: function(source, target, compare) {
		return source.createSorterComparing({
			target: target,
			compare: compare,
			scope: this
		});
	},
	
	assertTarget: function(values, target) {
		this.assertTrue(target.$map(JW.byField("value")).equal(values));
	},
	
	compare: function(x, y) {
		this.assertTrue(this instanceof JW.Unit.TestCase);
		x = x.value;
		y = y.value;
		return JW.cmp(x % 2, y % 2) || ((x % 2) ? -JW.cmp(x, y) : JW.cmp(x, y));
	}
});
