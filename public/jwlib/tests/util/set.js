﻿/*
	JW ordered collection tests.
	
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

JW.Tests.Util.SetTestCase = JW.Unit.TestCase.extend({
	testSet: function() {
		var set = new JW.Set();
		this.subscribe(set);
		
		var d = JW("d");
		var e = JW("e");
		var c = JW("c");
		var a = JW("a");
		var b = JW("b");
		
		this.setExpectedOutput(
			"Added d",
			"Changed",
			"Changed size from 0 to 1"
		);
		this.assertTrue(set.add(d));
		this.assertSet([ d ], [ a, b, c, e ], set);
		
		this.setExpectedOutput(
			"Added e",
			"Changed",
			"Changed size from 1 to 2"
		);
		this.assertTrue(set.addAll([ e ]));
		this.assertSet([ d, e ], [ a, b, c ], set);
		
		this.setExpectedOutput(
			"Added c",
			"Added a",
			"Changed",
			"Changed size from 2 to 4"
		);
		this.assertTrue(set.addAll([ c, a ]));
		this.assertSet([ d, e, c, a ], [ b ], set);
		
		this.setExpectedOutput(
			"Removed e",
			"Changed",
			"Changed size from 4 to 3"
		);
		this.assertTrue(set.remove(e));
		this.assertSet([ d, c, a ], [ b, e ], set);
		
		this.setExpectedOutput();
		this.assertFalse(set.addAll([]));
		this.assertSet([ d, c, a ], [ b, e ], set);
		
		this.setExpectedOutput(
			"Added b",
			"Changed",
			"Changed size from 3 to 4"
		);
		this.assertTrue(set.addAll([ b, c ]));
		this.assertSet([ d, c, a, b ], [ e ], set);
		
		this.setExpectedOutput();
		this.assertFalse(set.addAll([ b, c ]));
		this.assertSet([ d, c, a, b ], [ e ], set);
		
		// The clearing order differs in Chrome and Firefox:
		// Chrome optimizes integer-based maps and sorts the items, Firefox doesn't.
		// That's why we created items in straight order to make sure that
		// their _iid's will be sorted.
		this.setExpectedOutput(
			"Removed d",
			"Removed c",
			"Removed a",
			"Removed b",
			"Changed",
			"Changed size from 4 to 0"
		);
		this.assertTrue(set.clear());
		this.assertSet([], [ a, b, c, d, e ], set);
		
		this.setExpectedOutput();
		this.assertFalse(set.clear());
		this.assertSet([], [ a, b, c, d, e ], set);
		
		this.setExpectedOutput(
			"Added a",
			"Changed",
			"Changed size from 0 to 1"
		);
		set.add(a);
		this.assertSet([ a ], [ b, c, d, e ], set);
		
		this.setExpectedOutput(
			"Removed a",
			"Changed",
			"Changed size from 1 to 0"
		);
		set.destroy();
	},
	
	testEvery: function() {
		var set = new JW.Set([ JW("a"), JW("A"), JW("b") ]);
		
		this.assertFalse(set.every(this.isUpperCase));
		this.assertFalse(set.every(this.isA));
		this.assertTrue (set.every(this.isString));
		this.assertFalse(set.every(this.isNumber));
	},
	
	testSome: function() {
		var set = new JW.Set([ JW("a"), JW("A"), JW("b") ]);
		
		this.assertTrue (set.some(this.isUpperCase));
		this.assertTrue (set.some(this.isA));
		this.assertTrue (set.some(this.isString));
		this.assertFalse(set.some(this.isNumber));
	},
	
	testFilter: function() {
		var a = JW("a");
		var A = JW("A");
		var b = JW("b");
		var set = new JW.Set([ a, A, b ]);
		var filtered = set.filter(this.isA);
		this.assertEqual(3, set.getLength());
		this.assertEqual(2, filtered.getLength());
		this.assertTrue(filtered.contains(a));
		this.assertTrue(filtered.contains(A));
		this.assertFalse(filtered.contains(b));
	},
	
	subscribe: function(set) {
		set.addEvent.bind(this.onAdd, this);
		set.removeEvent.bind(this.onRemove, this);
		set.changeEvent.bind(this.onChange, this);
		set.sizeChangeEvent.bind(this.onSizeChange, this);
	},
	
	assertSet: function(expected, unexpected, set) {
		this.assertStrictEqual(expected.length, set.getSize());
		for (var i = 0; i < expected.length; ++i) {
			this.assertTrue(set.contains(expected[i]));
		}
		for (var i = 0; i < unexpected.length; ++i) {
			this.assertFalse(set.contains(unexpected[i]));
		}
	},
	
	onAdd: function(params) {
		this.output("Added " + params.item.base);
	},
	
	onRemove: function(params) {
		this.output("Removed " + params.item.base);
	},
	
	onChange: function(params) {
		this.output("Changed");
	},
	
	onSizeChange: function(params) {
		this.output("Changed size from " + params.oldSize + " to " + params.newSize);
	},
	
	isUpperCase: function(value) {
		return value.base.toUpperCase() === value.base;
	},
	
	isA: function(value) {
		return value.base.toUpperCase() === "A";
	},
	
	isString: function(value) {
		return typeof value.base === "string";
	},
	
	isNumber: function(value) {
		return typeof value.base === "number";
	}
});

JW.Tests.Util.Set = {};
