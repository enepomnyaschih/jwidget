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

JW.Tests.Collection.ObservableMap.FiltererTestCase = JW.Unit.TestCase.extend({
	testShorthand: function() {
		var source = new JW.ObservableMap({a: 1, b: 2, c: 3, d: 4, e: 5});
		var target = source.$$filter(this.filterFunc, this);
		var subscription = JW.Tests.Collection.subscribeToMap(this, target);

		this.assertTarget({a: 1, c: 3, e: 5}, target);

		this.setExpectedOutput(
			"Changed size from 3 to 5",
			"Spliced -{a:1} +{a:7,b:9,i:11}",
			"Changed"
		);
		source.splice(["d"], {f: 6, a: 7, g: 8, b: 9, h: 10, i: 11}); // {a: 7, b: 9, c: 3, e: 5, f: 6, g: 8, h: 10, i: 11}
		this.assertTarget({a: 7, c: 3, e: 5, b: 9, i: 11}, target);

		subscription.destroy();
		target.destroy();
		source.destroy();
	},

	testUnobservableTarget: function() {
		var source = new JW.ObservableMap({a: 1, b: 2, c: 3, d: 4, e: 5});
		var target = new JW.Map();
		
		var filterer = this.createFilterer(source, target);
		this.assertTarget({a: 1, c: 3, e: 5}, target);
		
		source.splice(["d"], {f: 6, a: 7, g: 8, b: 9, h: 10, i: 11}); // {a: 7, b: 9, c: 3, e: 5, f: 6, g: 8, h: 10, i: 11}
		this.assertTarget({a: 7, c: 3, e: 5, b: 9, i: 11}, target);
		
		source.reindex({a: "c", b: "a", c: "k", e: "l", f: "b", g: "e", h: "m", i: "n"}); // {a: 9, b: 6, c: 7, e: 8, k: 3, l: 5, m: 10, n: 11}
		this.assertTarget({a: 9, c: 7, k: 3, l: 5, n: 11}, target);
		
		source.clear();
		this.assertTarget({}, target);
		
		source.setAll({q: 1, w: 2, e: 3});
		this.assertTarget({e: 3, q: 1}, target);
		
		filterer.destroy();
		this.assertTarget({}, target);
		
		target.destroy();
		source.destroy();
	},
	
	testObservableTarget: function() {
		var source = new JW.ObservableMap({a: 1, b: 2, c: 3, d: 4, e: 5});
		var target = this.createTarget();
		
		this.setExpectedOutput(
			"Changed size from 0 to 3",
			"Spliced -{} +{a:1,c:3,e:5}",
			"Changed"
		);
		var filterer = this.createFilterer(source, target);
		this.assertTarget({a: 1, c: 3, e: 5}, target);
		
		this.setExpectedOutput(
			"Changed size from 3 to 5",
			"Spliced -{a:1} +{a:7,b:9,i:11}",
			"Changed"
		);
		source.splice(["d"], {f: 6, a: 7, g: 8, b: 9, h: 10, i: 11}); // {a: 7, b: 9, c: 3, e: 5, f: 6, g: 8, h: 10, i: 11}
		this.assertTarget({a: 7, c: 3, e: 5, b: 9, i: 11}, target);
		
		this.setExpectedOutput(
			"Reindexed by {a:c,b:a,c:k,e:l,i:n}",
			"Changed"
		);
		source.reindex({a: "c", b: "a", c: "k", e: "l", f: "b", g: "e", h: "m", i: "n"}); // {a: 9, b: 6, c: 7, e: 8, k: 3, l: 5, m: 10, n: 11}
		this.assertTarget({a: 9, c: 7, k: 3, l: 5, n: 11}, target);
		
		this.setExpectedOutput(
			"Changed size from 5 to 0",
			"Spliced -{a:9,c:7,k:3,l:5,n:11} +{}",
			"Changed"
		);
		source.clear();
		this.assertTarget({}, target);
		
		this.setExpectedOutput(
			"Changed size from 0 to 2",
			"Spliced -{} +{e:3,q:1}",
			"Changed"
		);
		source.setAll({q: 1, w: 2, e: 3});
		this.assertTarget({e: 3, q: 1}, target);
		
		this.setExpectedOutput(
			"Changed size from 2 to 0",
			"Spliced -{e:3,q:1} +{}",
			"Changed"
		);
		filterer.destroy();
		this.assertTarget({}, target);
		
		this.setExpectedOutput();
		target.destroy();
		source.destroy();
	},
	
	testMultiSource: function() {
		var source1 = new JW.ObservableMap({"a": 1, "b": 2});
		var source2 = new JW.ObservableMap({"c": 4, "d": 5});
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
		source1.set(4, "a");
		this.assertTarget({e: 7, d: 5}, target);
		
		this.setExpectedOutput(
			"Changed size from 2 to 3",
			"Spliced -{} +{f:5}",
			"Changed"
		);
		source1.set(5, "f");
		this.assertTarget({e: 7, d: 5, f: 5}, target);
		
		this.setExpectedOutput(
			"Spliced -{d:5} +{d:1}",
			"Changed"
		);
		source2.set(1, "d");
		this.assertTarget({e: 7, d: 1, f: 5}, target);
		
		this.setExpectedOutput(
			"Changed size from 3 to 2",
			"Spliced -{f:5} +{}",
			"Changed"
		);
		source1.clear();
		this.assertTarget({e: 7, d: 1}, target);
		
		this.setExpectedOutput(
			"Changed size from 2 to 1",
			"Spliced -{d:1} +{}",
			"Changed"
		);
		filterer2.destroy();
		this.assertTarget({e: 7}, target);
		
		this.setExpectedOutput();
		filterer1.destroy();
		this.assertTarget({e: 7}, target);
		
		this.setExpectedOutput();
		target.destroy();
		
		source1.destroy();
		source2.destroy();
	},
	
	// tests that empty source doesn't cause target to trigger "change" on synchronizer initialization
	testEmptyChange: function() {
		var source = new JW.ObservableMap();
		var target = this.createTarget();
		var filterer = this.createFilterer(source, target);
		filterer.destroy();
		target.destroy();
		source.destroy();
	},
	
	testAutoTarget: function() {
		var source = new JW.ObservableMap({a: 1, b: 2, c: 3});
		var filterer = this.createFilterer(source);
		this.assertTrue(filterer.target instanceof JW.ObservableMap);
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
