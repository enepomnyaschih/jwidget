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

JW.Tests.Collection.AbstractMap.OrdererTestCase = JW.Unit.TestCase.extend({
	setup: function() {
		this.a = new JW.Proxy("a");
		this.b = new JW.Proxy("b");
		this.c = new JW.Proxy("c");
		this.d = new JW.Proxy("d");
		this.x = new JW.Proxy("x");
	},

	testShorthand: function() {
		var source = new JW.Map({"A": this.a, "B": this.b});
		var target = source.$$toArray();

		this.assertTarget([this.a, this.b], target);

		target.destroy();
		source.destroy();
	},
	
	testUnobservableTarget: function() {
		var source = new JW.Map({"A": this.a, "B": this.b});
		var target = new JW.Array();
		
		var orderer = this.createOrderer(source, target);
		this.assertTarget([this.a, this.b], target);
		
		orderer.destroy();
		this.assertTarget([], target);
		
		target.destroy();
		source.destroy();
	},
	
	testObservableTarget: function() {
		var source = new JW.Map({"A": this.a, "B": this.b});
		var target = this.createTarget();
		
		this.setExpectedOutput(
			"Changed length from 0 to 2",
			"Spliced -[] +[0:[a,b]] to []",
			"Changed"
		);
		var orderer = this.createOrderer(source, target);
		this.assertTarget([this.a, this.b], target);
		
		this.setExpectedOutput(
			"Changed length from 2 to 0",
			"Spliced -[0:[a,b]] +[] to [a,b]",
			"Changed"
		);
		orderer.destroy();
		this.assertTarget([], target);
		
		this.setExpectedOutput();
		target.destroy();
		source.destroy();
	},
	
	testMultiSource: function() {
		var source1 = new JW.Map({"A": this.a, "B": this.b});
		var source2 = new JW.Map({"C": this.c, "D": this.d});
		var target = this.createTarget();
		
		this.setExpectedOutput(
			"Changed length from 0 to 1",
			"Spliced -[] +[0:[x]] to []",
			"Changed"
		);
		target.add(this.x);
		this.assertTarget([this.x], target);
		
		this.setExpectedOutput(
			"Changed length from 1 to 3",
			"Spliced -[] +[1:[a,b]] to [x]",
			"Changed"
		);
		var orderer1 = this.createOrderer(source1, target);
		this.assertTarget([this.x, this.a, this.b], target);
		
		this.setExpectedOutput(
			"Changed length from 3 to 5",
			"Spliced -[] +[3:[c,d]] to [x,a,b]",
			"Changed"
		);
		var orderer2 = this.createOrderer(source2, target);
		this.assertTarget([this.x, this.a, this.b, this.c, this.d], target);
		
		this.setExpectedOutput(
			"Changed length from 5 to 3",
			"Spliced -[1:[a,b]] +[] to [x,a,b,c,d]",
			"Changed"
		);
		orderer1.destroy();
		this.assertTarget([this.x, this.c, this.d], target);
		
		this.setExpectedOutput(
			"Changed length from 3 to 1",
			"Spliced -[1:[c,d]] +[] to [x,c,d]",
			"Changed"
		);
		orderer2.destroy();
		this.assertTarget([this.x], target);
		
		this.setExpectedOutput();
		target.destroy();
		
		this.setExpectedOutput();
		source1.destroy();
		source2.destroy();
	},
	
	// tests that empty array doesn't trigger "change" on initialization
	testEmptyChange: function() {
		var source = new JW.Map();
		var target = this.createTarget();
		var orderer = this.createOrderer(source, target);
		orderer.destroy();
		target.destroy();
		source.destroy();
	},
	
	testAutoTarget: function() {
		var source = new JW.Map({"D": this.d});
		var orderer = this.createOrderer(source);
		this.assertTrue(orderer.target instanceof JW.Array);
		this.assertTarget([this.d], orderer.target);
		orderer.destroy();
		source.destroy();
	},
	
	createTarget: function() {
		var target = new JW.ObservableArray();
		JW.Tests.Collection.subscribeToArray(this, target, function(x) { return x.value; });
		return target;
	},
	
	createOrderer: function(source, target) {
		return source.createOrderer({
			target : target
		});
	},
	
	assertTarget: function(values, target) {
		this.assertTrue(target.equal(values))
	}
});
