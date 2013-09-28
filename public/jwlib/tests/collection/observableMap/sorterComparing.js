﻿/*
	jWidget Lib tests.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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

JW.Tests.Collection.ObservableMap.SorterComparingTestCase = JW.Unit.TestCase.extend({
	testObservableTarget: function() {
		var source = new JW.ObservableMap({"A": "c", "B": "b", "C": "a", "D": "d"});
		var target = this.createTarget();
		
		this.setExpectedOutput(
			"Spliced -[] +[0:[a,b,c,d]] to []",
			"Changed",
			"Changed length from 0 to 4"
		);
		var sorterComparing = this.createSorterComparing(source, target);
		this.assertTarget(["a", "b", "c", "d"], target);
		
		this.setExpectedOutput(
			"Spliced -[2:[c,d]] +[2:[e,f]] to [a,b,c,d]",
			"Changed"
		);
		source.setAll({"D": "e", "A": "f"}); // A:f,B:b,C:a,D:e
		this.assertTarget(["a", "b", "e", "f"], target);
		
		this.setExpectedOutput();
		source.reindex({"A": "F", "C": "A"}); // F:f,B:b,A:a,D:e
		this.assertTarget(["a", "b", "e", "f"], target);
		
		this.setExpectedOutput(
			"Spliced -[0:[a,b,e,f]] +[] to [a,b,e,f]",
			"Changed",
			"Changed length from 4 to 0"
		);
		source.clear();
		this.assertTarget([], target);
		
		this.setExpectedOutput(
			"Spliced -[] +[0:[c]] to []",
			"Changed",
			"Changed length from 0 to 1"
		);
		source.set("c", "C");
		this.assertTarget(["c"], target);
		
		this.setExpectedOutput(
			"Spliced -[0:[c]] +[] to [c]",
			"Changed",
			"Changed length from 1 to 0"
		);
		sorterComparing.destroy();
		this.assertTarget([], target);
		
		this.setExpectedOutput();
		target.destroy();
		source.destroy();
	},
	
	testUnobservableTarget: function() {
		var source = new JW.ObservableMap({"A": "c", "B": "b", "C": "a", "D": "d"});
		var target = new JW.Array();
		
		var sorterComparing = this.createSorterComparing(source, target);
		this.assertTarget(["a", "b", "c", "d"], target);
		
		source.setAll({"D": "e", "A": "f"}); // A:f,B:b,C:a,D:e
		this.assertTarget(["a", "b", "e", "f"], target);
		
		source.reindex({"A": "F", "C": "A"}); // F:f,B:b,A:a,D:e
		this.assertTarget(["a", "b", "e", "f"], target);
		
		source.clear();
		this.assertTarget([], target);
		
		source.set("c", "C");
		this.assertTarget(["c"], target);
		
		sorterComparing.destroy();
		this.assertTarget([], target);
		
		target.destroy();
		source.destroy();
	},
	
	testMultiSource: function() {
		var source1 = new JW.ObservableMap({"A": 0, "B": 1, "C": 2, "D": 3});
		var source2 = new JW.ObservableMap({"A": 4, "B": 5, "C": 6, "D": 7});
		var target = this.createTarget();
		
		this.setExpectedOutput(
			"Spliced -[] +[0:[8]] to []",
			"Changed",
			"Changed length from 0 to 1"
		);
		target.add(8);
		this.assertTarget([ 8 ], target);
		
		this.setExpectedOutput(
			"Spliced -[] +[0:[0,2],3:[3,1]] to [8]",
			"Changed",
			"Changed length from 1 to 5"
		);
		var sorterComparing1 = this.createSorterComparing(source1, target, this.compare);
		this.assertTarget([0, 2, 8, 3, 1], target);
		
		this.setExpectedOutput(
			"Spliced -[] +[2:[4,6],5:[7,5]] to [0,2,8,3,1]",
			"Changed",
			"Changed length from 5 to 9"
		);
		var sorterComparing2 = this.createSorterComparing(source2, target, this.compare);
		this.assertTarget([0, 2, 4, 6, 8, 7, 5, 3, 1], target);
		
		this.setExpectedOutput(
			"Spliced -[1:[2],8:[1]] +[4:[10,12]] to [0,2,4,6,8,7,5,3,1]",
			"Changed"
		);
		source1.setAll({"B": 12, "C": 10});
		this.assertTarget([0, 4, 6, 8, 10, 12, 7, 5, 3], target);
		
		this.setExpectedOutput(
			"Spliced -[1:[4]] +[1:[2],6:[9],10:[1]] to [0,4,6,8,10,12,7,5,3]",
			"Changed",
			"Changed length from 9 to 11"
		);
		source2.splice(["A"], {"E": 9, "F": 2, "G": 1});
		this.assertTarget([0, 2, 6, 8, 10, 12, 9, 7, 5, 3, 1], target);
		
		this.setExpectedOutput(
			"Spliced -[0:[0],4:[10,12],9:[3]] +[] to [0,2,6,8,10,12,9,7,5,3,1]",
			"Changed",
			"Changed length from 11 to 7"
		);
		sorterComparing1.destroy();
		this.assertTarget([2, 6, 8, 9, 7, 5, 1], target);
		
		this.setExpectedOutput(
			"Spliced -[0:[2,6],3:[9,7,5,1]] +[] to [2,6,8,9,7,5,1]",
			"Changed",
			"Changed length from 7 to 1"
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
		var source = new JW.ObservableMap();
		var target = this.createTarget();
		var sorterComparing = this.createSorterComparing(source, target, this.compare);
		sorterComparing.destroy();
		target.destroy();
		source.destroy();
	},
	
	testAutoTarget: function() {
		var source = new JW.ObservableMap({"A": 0, "B": 1, "C": 2, "D": 3});
		var sorterComparing = this.createSorterComparing(source, null, this.compare);
		this.assertTrue(sorterComparing.target instanceof JW.ObservableArray);
		this.assertTarget([0, 2, 3, 1], sorterComparing.target);
		sorterComparing.destroy();
		source.destroy();
	},
	
	createTarget: function() {
		var target = new JW.ObservableArray();
		JW.Tests.Collection.subscribeToArray(this, target);
		return target;
	},
	
	createSorterComparing: function(source, target, compare) {
		return source.createSorterComparing({
			target: target,
			compare: compare
		});
	},
	
	assertTarget: function(values, target) {
		this.assertTrue(target.equal(values));
	},
	
	compare: function(x, y) {
		return JW.cmp(x % 2, y % 2) || ((x % 2) ? -JW.cmp(x, y) : JW.cmp(x, y));
	}
});