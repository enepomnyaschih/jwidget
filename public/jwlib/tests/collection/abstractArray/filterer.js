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

JW.Tests.Collection.AbstractArray.FiltererTestCase = JW.Unit.TestCase.extend({
	testShorthand: function() {
		var source = new JW.Array([1, 2, 3, 4, 5, 7]);
		var target = source.$$filter(this.filterFunc, this);

		this.assertTarget([1, 3, 5, 7], target);

		target.destroy();
		source.destroy();
	},

	testUnobservableTarget: function() {
		var source = new JW.Array([1, 2, 3, 4, 5, 7]);
		var target = new JW.Array();
		
		var filterer = this.createFilterer(source, target);
		this.assertTarget([1, 3, 5, 7], target);
		
		filterer.destroy()
		this.assertTarget([], target);
		
		target.destroy();
		source.destroy();
	},
	
	testObservableTarget: function() {
		var source = new JW.Array([1, 2, 3, 4, 5, 7]);
		var target = this.createTarget();
		
		this.setExpectedOutput(
			"Changed length from 0 to 4",
			"Spliced -[] +[0:[1,3,5,7]] to []",
			"Changed"
		);
		var filterer = this.createFilterer(source, target);
		this.assertTarget([1, 3, 5, 7], target);
		
		this.setExpectedOutput(
			"Changed length from 4 to 0",
			"Cleared [1,3,5,7]",
			"Changed"
		);
		filterer.destroy()
		this.assertTarget([], target);
		
		this.setExpectedOutput();
		target.destroy();
		source.destroy();
	},
	
	// tests that empty source doesn't caused target to trigger "change" on synchronizer initialization
	testEmptyChange: function() {
		var source = new JW.Array();
		var target = this.createTarget();
		var filterer = this.createFilterer(source, target);
		filterer.destroy();
		target.destroy();
		source.destroy();
	},
	
	testAutoTarget: function() {
		var source = new JW.Array([1, 2, 3]);
		var filterer = this.createFilterer(source);
		this.assertTrue(filterer.target instanceof JW.Array);
		this.assertTarget([1, 3], filterer.target);
		filterer.destroy();
		source.destroy();
	},
	
	testRefilterAt: function() {
		var source = new JW.Array([1, 2, 3, 4, 5, 7]);
		var target = this.createTarget();
		
		this.setExpectedOutput(
			"Changed length from 0 to 4",
			"Spliced -[] +[0:[1,3,5,7]] to []",
			"Changed"
		);
		var filterer = this.createFilterer(source, target);
		this.assertTarget([1, 3, 5, 7], target);
		
		this.setExpectedOutput(
			"Changed length from 4 to 5",
			"Spliced -[] +[2:[9]] to [1,3,5,7]",
			"Changed"
		);
		source.set(9, 3);
		filterer.refilterAt(3);
		this.assertTarget([1, 3, 9, 5, 7], target);
		
		this.setExpectedOutput(
			"Changed length from 5 to 4",
			"Spliced -[4:[7]] +[] to [1,3,9,5,7]",
			"Changed"
		);
		source.set(6, 5);
		filterer.refilterAt(5);
		this.assertTarget([1, 3, 9, 5], target);
		
		source.set(8, 1);
		filterer.refilterAt(1);
		this.assertTarget([1, 3, 9, 5], target);
		
		this.setExpectedOutput(
			"Changed length from 4 to 0",
			"Cleared [1,3,9,5]",
			"Changed"
		);
		filterer.destroy()
		this.assertTarget([], target);
		
		this.setExpectedOutput();
		target.destroy();
		source.destroy();
	},
	
	testRefilter: function() {
		var source = new JW.Array([1, 3, 2, 4, 6, 5, 7, 9, 11, 8, 10, 12, 14, 16]); // 11000111100000
		var target = this.createTarget();
		
		this.setExpectedOutput(
			"Changed length from 0 to 6",
			"Spliced -[] +[0:[1,3,5,7,9,11]] to []",
			"Changed"
		);
		var filterer = this.createFilterer(source, target);
		this.assertTarget([1, 3, 5, 7, 9, 11], filterer.target);
		
		source.clear();
		source.addAll([1, 20, 2, 21, 23, 22, 24, 9, 11, 25, 10, 27, 14, 16]);
		
		this.setExpectedOutput(
			"Changed length from 6 to 7",
			"Spliced -[1:[3,5,7]] +[1:[21,23],5:[25,27]] to [1,3,5,7,9,11]",
			"Changed"
		);
		filterer.refilter();
		this.assertTarget([1, 21, 23, 9, 11, 25, 27], filterer.target);
		
		source.clear();
		source.addAll([1, 20, 2, 21, 23, 22, 3, 9, 11, 25, 5, 27, 14, 16]);
		
		this.setExpectedOutput(
			"Changed length from 7 to 9",
			"Spliced -[] +[3:[3],7:[5]] to [1,21,23,9,11,25,27]",
			"Changed"
		);
		filterer.refilter();
		this.assertTarget([1, 21, 23, 3, 9, 11, 25, 5, 27], filterer.target);
		
		this.setExpectedOutput(
			"Changed length from 9 to 0",
			"Cleared [1,21,23,3,9,11,25,5,27]",
			"Changed"
		);
		filterer.destroy();
		source.destroy();
	},
	
	createTarget: function(target) {
		var target = new JW.ObservableArray();
		JW.Tests.Collection.subscribeToArray(this, target);
		return target;
	},
	
	createFilterer: function(source, target) {
		return source.createFilterer({
			target: target,
			filterItem: this.filterFunc,
			scope: this
		});
	},

	filterFunc: function(x) {
		this.assertTrue(this instanceof JW.Unit.TestCase);
		return x % 2 === 1;
	},
	
	assertTarget: function(values, target) {
		this.assertTrue(target.equal(values));
	}
});
