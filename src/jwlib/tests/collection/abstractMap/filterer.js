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

JW.Tests.Collection.AbstractMap.FiltererTestCase = JW.Unit.TestCase.extend({
	testShorthand: function() {
		var source = new JW.Map({a: 1, b: 2, c: 3, d: 4, e: 5});
		var target = source.$$filter(this.filterFunc, this);

		this.assertTarget({a: 1, c: 3, e: 5}, target);

		target.destroy();
		source.destroy();
	},

	testUnobservableTarget: function() {
		var source = new JW.Map({a: 1, b: 2, c: 3, d: 4, e: 5});
		var target = new JW.Map();
		
		var filterer = this.createFilterer(source, target);
		this.assertTarget({a: 1, c: 3, e: 5}, target);
		
		filterer.destroy();
		this.assertTarget({}, target);
		
		this.setExpectedOutput();
		target.destroy();
		source.destroy();
	},
	
	testObservableTarget: function() {
		var source = new JW.Map({a: 1, b: 2, c: 3, d: 4, e: 5});
		var target = this.createTarget();
		
		this.setExpectedOutput(
			"Changed size from 0 to 3",
			"Spliced -{} +{a:1,c:3,e:5}",
			"Changed"
		);
		var filterer = this.createFilterer(source, target);
		this.assertTarget({a: 1, c: 3, e: 5}, target);
		
		this.setExpectedOutput(
			"Changed size from 3 to 0",
			"Spliced -{a:1,c:3,e:5} +{}",
			"Changed"
		);
		filterer.destroy();
		this.assertTarget({}, target);
		
		this.setExpectedOutput();
		target.destroy();
		source.destroy();
	},
	
	testMultiSource: function() {
		var source1 = new JW.Map({"a": 1, "b": 2});
		var source2 = new JW.Map({"c": 4, "d": 5});
		var target = this.createTarget();
		
		this.setExpectedOutput(
			"Changed size from 0 to 1",
			"Spliced -{} +{e:7}",
			"Changed"
		);
		target.set(7, "e");
		this.assertTarget({"e": 7}, target);
		
		this.setExpectedOutput(
			"Changed size from 1 to 2",
			"Spliced -{} +{a:1}",
			"Changed"
		);
		var filterer1 = this.createFilterer(source1, target);
		this.assertTarget({e: 7, a: 1}, target);
		
		this.setExpectedOutput(
			"Changed size from 2 to 3",
			"Spliced -{} +{d:5}",
			"Changed"
		);
		var filterer2 = this.createFilterer(source2, target);
		this.assertTarget({e: 7, a: 1, d: 5}, target);
		
		this.setExpectedOutput(
			"Changed size from 3 to 2",
			"Spliced -{a:1} +{}",
			"Changed"
		);
		filterer1.destroy();
		this.assertTarget({e: 7, d: 5}, target);
		
		this.setExpectedOutput(
			"Changed size from 2 to 1",
			"Spliced -{d:5} +{}",
			"Changed"
		);
		filterer2.destroy();
		this.assertTarget({e: 7}, target);
		
		this.setExpectedOutput();
		target.destroy();
		
		source1.destroy();
		source2.destroy();
	},
	
	// tests that empty source doesn't cause target to trigger "change" on synchronizer initialization
	testEmptyChange: function() {
		var source = new JW.Map();
		var target = this.createTarget();
		var filterer = this.createFilterer(source, target);
		filterer.destroy();
		target.destroy();
		source.destroy();
	},
	
	testAutoTarget: function() {
		var source = new JW.Map({a: 1, b: 2, c: 3});
		var filterer = this.createFilterer(source);
		this.assertTrue(filterer.target instanceof JW.Map);
		this.assertTarget({a: 1, c: 3}, filterer.target);
		filterer.destroy();
		source.destroy();
	},
	
	createTarget: function() {
		var target = new JW.ObservableMap();
		JW.Tests.Collection.subscribeToMap(this, target);
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
	
	assertTarget: function(expected, map) {
		JW.Tests.Collection.assertMap(this, expected, map);
	}
});
