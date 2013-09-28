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

JW.Tests.Collection.ObservableSet.SorterComparingTestCase = JW.Unit.TestCase.extend({
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
		this.j = new JW.Proxy(9);
		this.k = new JW.Proxy(10);
		this.l = new JW.Proxy(11);
		this.m = new JW.Proxy(12);
	},
	
	testObservableTarget: function() {
		var source = new JW.ObservableSet([this.a, this.b, this.c, this.d]);
		var target = this.createTarget();
		
		this.setExpectedOutput(
			"Spliced -[] +[0:[0,2,3,1]] to []",
			"Changed",
			"Changed length from 0 to 4"
		);
		var sorterComparing = this.createSorterComparing(source, target, this.compare);
		this.assertTarget([0, 2, 3, 1], target);
		
		this.setExpectedOutput(
			"Spliced -[1:[2],3:[1]] +[1:[4,8,7]] to [0,2,3,1]",
			"Changed",
			"Changed length from 4 to 5"
		);
		source.splice([this.b, this.c], [this.e, this.h, this.i]);
		this.assertTarget([0, 4, 8, 7, 3], target);
		
		this.setExpectedOutput(
			"Spliced -[0:[0,4,8,7,3]] +[] to [0,4,8,7,3]",
			"Changed",
			"Changed length from 5 to 0"
		);
		source.clear();
		this.assertTarget([], target);
		
		this.setExpectedOutput(
			"Spliced -[] +[0:[2]] to []",
			"Changed",
			"Changed length from 0 to 1"
		);
		source.add(this.c);
		this.assertTarget([2], target);
		
		this.setExpectedOutput(
			"Spliced -[0:[2]] +[] to [2]",
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
		var source = new JW.ObservableSet([this.a, this.b, this.c, this.d]);
		var target = new JW.Array();
		
		var sorterComparing = this.createSorterComparing(source, target, this.compare);
		this.assertTarget([0, 2, 3, 1], target);
		
		source.splice([this.b, this.c], [this.e, this.h, this.i]);
		this.assertTarget([0, 4, 8, 7, 3], target);
		
		source.clear();
		this.assertTarget([], target);
		
		source.add(this.c);
		this.assertTarget([2], target);
		
		sorterComparing.destroy();
		this.assertTarget([], target);
		
		target.destroy();
		source.destroy();
	},
	
	testMultiSource: function() {
		var source1 = new JW.ObservableSet([this.a, this.b, this.c, this.d]);
		var source2 = new JW.ObservableSet([this.e, this.f, this.g, this.h]);
		var target = this.createTarget();
		
		this.setExpectedOutput(
			"Spliced -[] +[0:[8]] to []",
			"Changed",
			"Changed length from 0 to 1"
		);
		target.add(this.i);
		this.assertTarget([8], target);
		
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
		source1.splice([this.b, this.c], [this.m, this.k]);
		this.assertTarget([0, 4, 6, 8, 10, 12, 7, 5, 3], target);
		
		this.setExpectedOutput(
			"Spliced -[1:[4]] +[1:[2],6:[9],10:[1]] to [0,4,6,8,10,12,7,5,3]",
			"Changed",
			"Changed length from 9 to 11"
		);
		source2.splice([this.e], [this.b, this.c, this.j]);
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
		var source = new JW.ObservableSet();
		var target = this.createTarget();
		var sorterComparing = this.createSorterComparing(source, target, this.compare);
		sorterComparing.destroy();
		target.destroy();
		source.destroy();
	},
	
	testAutoTarget: function() {
		var source = new JW.ObservableSet([this.a, this.b, this.c, this.d]);
		var sorterComparing = this.createSorterComparing(source, null, this.compare);
		this.assertTrue(sorterComparing.target instanceof JW.ObservableArray);
		this.assertTarget([0, 2, 3, 1], sorterComparing.target);
		sorterComparing.destroy();
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
			compare: compare
		});
	},
	
	assertTarget: function(values, target) {
		this.assertTrue(target.$map(JW.byField("value")).equal(values));
	},
	
	compare: function(x, y) {
		x = x.value;
		y = y.value;
		return JW.cmp(x % 2, y % 2) || ((x % 2) ? -JW.cmp(x, y) : JW.cmp(x, y));
	}
});