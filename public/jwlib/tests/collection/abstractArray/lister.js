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

JW.Tests.Collection.AbstractArray.ListerTestCase = JW.Unit.TestCase.extend({
	testShorthand: function() {
		var a = new JW.Proxy("a");
		var b = new JW.Proxy("b");

		var source = new JW.Array([ a, b ]);
		var target = source.$$toSet();

		this.assertTarget([ a, b ], target);

		target.destroy();
		source.destroy();
	},

	testUnobservableTarget: function() {
		var a = new JW.Proxy("a");
		var b = new JW.Proxy("b");
		
		var source = new JW.Array([ a, b ]);
		var target = new JW.Set();
		
		var lister = this.createLister(source, target);
		this.assertTarget([ a, b ], target);
		
		lister.destroy();
		this.assertTarget([], target);
		
		target.destroy();
		source.destroy();
	},
	
	testObservableTarget: function() {
		var a = new JW.Proxy("a");
		var b = new JW.Proxy("b");
		
		var source = new JW.Array([ a, b ]);
		var target = this.createTarget();
		
		this.setExpectedOutput(
			"Changed size from 0 to 2",
			"Spliced -[] +[a,b]",
			"Changed"
		);
		var lister = this.createLister(source, target);
		this.assertTarget([ a, b ], target);
		
		this.setExpectedOutput(
			"Changed size from 2 to 0",
			"Spliced -[a,b] +[]",
			"Changed"
		);
		lister.destroy();
		this.assertTarget([], target);
		
		this.setExpectedOutput();
		target.destroy();
		source.destroy();
	},
	
	testMultiSource: function() {
		var a = new JW.Proxy("a");
		var b = new JW.Proxy("b");
		var c = new JW.Proxy("c");
		var d = new JW.Proxy("d");
		var x = new JW.Proxy("x");
		
		var source1 = new JW.Array([ a, b ]);
		var source2 = new JW.Array([ c, d ]);
		var target = this.createTarget();
		
		this.setExpectedOutput(
			"Changed size from 0 to 1",
			"Spliced -[] +[x]",
			"Changed"
		);
		target.add(x);
		this.assertTarget([ x ], target);
		
		this.setExpectedOutput(
			"Changed size from 1 to 3",
			"Spliced -[] +[a,b]",
			"Changed"
		);
		var lister1 = this.createLister(source1, target);
		this.assertTarget([ a, b, x ], target);
		
		this.setExpectedOutput(
			"Changed size from 3 to 5",
			"Spliced -[] +[c,d]",
			"Changed"
		);
		var lister2 = this.createLister(source2, target);
		this.assertTarget([ a, b, c, d, x ], target);
		
		this.setExpectedOutput(
			"Changed size from 5 to 3",
			"Spliced -[a,b] +[]",
			"Changed"
		);
		lister1.destroy();
		this.assertTarget([ c, d, x ], target);
		
		this.setExpectedOutput(
			"Changed size from 3 to 1",
			"Spliced -[c,d] +[]",
			"Changed"
		);
		lister2.destroy();
		this.assertTarget([ x ], target);
		
		this.setExpectedOutput();
		target.destroy();
		
		this.setExpectedOutput();
		source1.destroy();
		source2.destroy();
	},
	
	// tests that empty array doesn't trigger "change" on initialization
	testEmptyChange: function() {
		var source = new JW.Array();
		var target = this.createTarget();
		var lister = this.createLister(source, target);
		lister.destroy();
		target.destroy();
		source.destroy();
	},
	
	testAutoTarget: function() {
		var d = new JW.Proxy("d");
		var source = new JW.Array([ d ]);
		var lister = this.createLister(source);
		this.assertTrue(lister.target instanceof JW.Set);
		this.assertTarget([ d ], lister.target);
		lister.destroy();
		source.destroy();
	},
	
	createTarget: function() {
		var target = new JW.ObservableSet();
		JW.Tests.Collection.subscribeToSet(this, target);
		return target;
	},
	
	createLister: function(source, target) {
		return source.createLister({
			target : target
		});
	},
	
	assertTarget: function(values, target) {
		this.assertStrictEqual(values.length, target.getLength());
		for (var i = 0; i < values.length; ++i) {
			this.assertTrue(target.contains(values[i]));
		}
	}
});
