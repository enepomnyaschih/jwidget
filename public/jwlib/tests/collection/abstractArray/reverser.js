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

JW.Tests.Collection.AbstractArray.ReverserTestCase = JW.Unit.TestCase.extend({
	testShorthand: function() {
		var source = new JW.Array([1, 2, 3, 4, 5]);
		var target = source.$$toReversed();

		this.assertTarget([5, 4, 3, 2, 1], target);

		target.destroy();
		source.destroy();
	},

	testUnobservableTarget: function() {
		var source = new JW.Array([1, 2, 3, 4, 5]);
		var target = new JW.Array();
		
		var reverser = this.createReverser(source, target);
		this.assertTarget([5, 4, 3, 2, 1], target);
		
		reverser.destroy();
		this.assertTarget([], target);
		
		this.setExpectedOutput();
		target.destroy();
		source.destroy();
	},
	
	testObservableTarget: function() {
		var source = new JW.Array([1, 2, 3, 4, 5]);
		var target = this.createTarget();
		
		this.setExpectedOutput(
			"Changed length from 0 to 5",
			"Spliced -[] +[0:[5,4,3,2,1]] to []",
			"Changed"
		);
		var reverser = this.createReverser(source, target);
		this.assertTarget([5, 4, 3, 2, 1], target);
		
		this.setExpectedOutput(
			"Changed length from 5 to 0",
			"Cleared [5,4,3,2,1]",
			"Changed"
		);
		reverser.destroy();
		this.assertTarget([], target);
		
		this.setExpectedOutput();
		target.destroy();
		source.destroy();
	},
	
	// tests that empty source doesn't caused target to trigger "change" on synchronizer initialization
	testEmptyChange: function() {
		var source = new JW.Array();
		var target = this.createTarget();
		var reverser = this.createReverser(source, target);
		reverser.destroy();
		target.destroy();
		source.destroy();
	},
	
	testAutoTarget: function() {
		var source = new JW.Array([1, 2, 3]);
		var reverser = this.createReverser(source);
		this.assertTrue(reverser.target instanceof JW.Array);
		this.assertTarget([3, 2, 1], reverser.target);
		reverser.destroy();
		source.destroy();
	},
	
	createTarget: function(target) {
		var target = new JW.ObservableArray();
		JW.Tests.Collection.subscribeToArray(this, target);
		return target;
	},
	
	createReverser: function(source, target) {
		return source.createReverser({target: target});
	},
	
	assertTarget: function(values, target) {
		this.assertTrue(target.equal(values));
	}
});
