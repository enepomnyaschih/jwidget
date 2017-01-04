/*
	jWidget Lib tests.
	
	Copyright (C) 2015 Egor Nepomnyaschih
	
	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU Lesser General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.
	
	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU Lesser General Public License for more details.
	
	You should have received a copy of the GNU Lesser General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

JW.Tests.Collection.AbstractSet.OrdererTestCase = JW.Unit.TestCase.extend({
	setup: function() {
		this.a = new JW.Proxy("a");
		this.b = new JW.Proxy("b");
		this.c = new JW.Proxy("c");
		this.d = new JW.Proxy("d");
		this.x = new JW.Proxy("x");
	},

	testShorthand: function() {
		var source = new JW.Set([this.a, this.b]);
		var target = source.$$toArray();

		this.assertTarget([this.a, this.b], target);

		target.destroy();
		source.destroy();
	},
	
	testUnobservableTarget: function() {
		var source = new JW.Set([this.a, this.b]);
		var target = new JW.Array();
		
		var orderer = this.createOrderer(source, target);
		this.assertTarget([this.a, this.b], target);
		
		orderer.destroy();
		this.assertTarget([], target);
		
		target.destroy();
		source.destroy();
	},
	
	testObservableTarget: function() {
		var source = new JW.Set([this.a, this.b]);
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
		var source1 = new JW.Set([this.a, this.b]);
		var source2 = new JW.Set([this.c, this.d]);
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
		var source = new JW.Set();
		var target = this.createTarget();
		var orderer = this.createOrderer(source, target);
		orderer.destroy();
		target.destroy();
		source.destroy();
	},
	
	testAutoTarget: function() {
		var source = new JW.Set([this.d]);
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
