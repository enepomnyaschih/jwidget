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

JW.Tests.Collection.ObservableSet.FiltererTestCase = JW.Unit.TestCase.extend({
	setup: function() {
		this.a = new JW.Proxy(1);
		this.b = new JW.Proxy(2);
		this.c = new JW.Proxy(3);
		this.d = new JW.Proxy(4);
		this.e = new JW.Proxy(5);
		this.f = new JW.Proxy(6);
		this.g = new JW.Proxy(7);
	},
	
	testShorthand: function() {
		var source = new JW.ObservableSet([this.a, this.b, this.c, this.d, this.e]);
		var target = source.$$filter(this.filterFunc, this);
		var subscription = JW.Tests.Collection.subscribeToSet(this, target, function(x) { return x.value; });

		this.assertTarget([this.a, this.c, this.e], target);

		this.setExpectedOutput(
			"Spliced -[1] +[7]",
			"Changed"
		);
		source.splice([this.a, this.b, this.d], [this.f, this.g]);
		this.assertTarget([this.c, this.e, this.g], target);

		subscription.destroy();
		target.destroy();
		source.destroy();
	},

	testUnobservableTarget: function() {
		var source = new JW.ObservableSet([this.a, this.b, this.c, this.d, this.e]);
		var target = new JW.Set();
		
		var filterer = this.createFilterer(source, target);
		this.assertTarget([this.a, this.c, this.e], target);
		
		source.splice([this.a, this.b, this.d], [this.f, this.g]);
		this.assertTarget([this.c, this.e, this.g], target);
		
		source.clear();
		this.assertTarget([], target);
		
		source.addAll([this.a, this.b, this.c]);
		this.assertTarget([this.a, this.c], target);
		
		filterer.destroy();
		this.assertTarget([], target);
		
		target.destroy();
		source.destroy();
	},
	
	testObservableTarget: function() {
		var source = new JW.ObservableSet([this.a, this.b, this.c, this.d, this.e]);
		var target = this.createTarget();
		
		this.setExpectedOutput(
			"Changed size from 0 to 3",
			"Spliced -[] +[1,3,5]",
			"Changed"
		);
		var filterer = this.createFilterer(source, target);
		this.assertTarget([this.a, this.c, this.e], target);
		
		this.setExpectedOutput(
			"Spliced -[1] +[7]",
			"Changed"
		);
		source.splice([this.a, this.b, this.d], [this.f, this.g]);
		this.assertTarget([this.c, this.e, this.g], target);
		
		this.setExpectedOutput(
			"Changed size from 3 to 0",
			"Spliced -[3,5,7] +[]",
			"Changed"
		);
		source.clear();
		this.assertTarget([], target);
		
		this.setExpectedOutput(
			"Changed size from 0 to 2",
			"Spliced -[] +[1,3]",
			"Changed"
		);
		source.addAll([this.a, this.b, this.c]);
		this.assertTarget([this.a, this.c], target);
		
		this.setExpectedOutput(
			"Changed size from 2 to 0",
			"Spliced -[1,3] +[]",
			"Changed"
		);
		filterer.destroy();
		this.assertTarget([], target);
		
		this.setExpectedOutput();
		target.destroy();
		source.destroy();
	},
	
	testMultiSource: function() {
		var source1 = new JW.ObservableSet([this.a, this.b]);
		var source2 = new JW.ObservableSet([this.c, this.d]);
		var target = this.createTarget();
		
		this.setExpectedOutput(
			"Changed size from 0 to 1",
			"Spliced -[] +[5]",
			"Changed"
		);
		target.add(this.e);
		this.assertTarget([this.e], target);
		
		this.setExpectedOutput(
			"Changed size from 1 to 2",
			"Spliced -[] +[1]",
			"Changed"
		);
		var filterer1 = this.createFilterer(source1, target);
		this.assertTarget([this.a, this.e], target);
		
		this.setExpectedOutput(
			"Changed size from 2 to 3",
			"Spliced -[] +[3]",
			"Changed"
		);
		var filterer2 = this.createFilterer(source2, target);
		this.assertTarget([this.a, this.c, this.e], target);
		
		this.setExpectedOutput(
			"Spliced -[1] +[7]",
			"Changed"
		);
		source1.splice([this.a], [this.f, this.g]);
		this.assertTarget([this.c, this.e, this.g], target);
		
		this.setExpectedOutput(
			"Changed size from 3 to 2",
			"Spliced -[3] +[]",
			"Changed"
		);
		source2.splice([this.c], [this.b]);
		this.assertTarget([this.e, this.g], target);
		
		this.setExpectedOutput(
			"Changed size from 2 to 1",
			"Spliced -[7] +[]",
			"Changed"
		);
		filterer1.destroy();
		this.assertTarget([this.e], target);
		
		this.setExpectedOutput();
		filterer2.destroy();
		this.assertTarget([this.e], target);
		
		this.setExpectedOutput();
		target.destroy();
		
		this.setExpectedOutput();
		source1.destroy();
		source2.destroy();
	},
	
	// tests that empty array doesn't trigger "change" on initialization
	testEmptyChange: function() {
		var source = new JW.ObservableSet();
		var target = this.createTarget();
		var filterer = this.createFilterer(source, target);
		filterer.destroy();
		target.destroy();
		source.destroy();
	},
	
	testAutoTarget: function() {
		var source = new JW.ObservableSet([this.a, this.b, this.c]);
		var filterer = this.createFilterer(source);
		this.assertTrue(filterer.target instanceof JW.ObservableSet);
		this.assertTarget([this.a, this.c], filterer.target);
		filterer.destroy();
		source.destroy();
	},
	
	createTarget: function() {
		var target = new JW.ObservableSet();
		JW.Tests.Collection.subscribeToSet(this, target, function(x) { return x.value; });
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
		return x.get() % 2 === 1;
	},
	
	assertTarget: function(values, target) {
		this.assertTrue(target.equal(values));
	}
});
