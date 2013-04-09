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

JW.Tests.Collection.ObservableMap.ListerTestCase = JW.Unit.TestCase.extend({
	testUnobservableTarget: function() {
		var testCase = this;
		var d = new JW.Proxy("d");
		var source = new JW.ObservableMap({ "d": d });
		var target = new JW.Set();
		
		var lister = this.createLister(source, target);
		this.assertTarget([ d ], target);
		
		var f = new JW.Proxy("f");
		source.setAll({ "f": f });
		this.assertTarget([ d, f ], target);
		
		var c = new JW.Proxy("c");
		source.set(c, "c");
		this.assertTarget([ d, f, c ], target);
		
		var b = new JW.Proxy("b");
		var m = new JW.Proxy("m");
		source.setAll({ "b": b, "m": m });
		this.assertTarget([ d, f, c, b, m ], target);
		
		this.setExpectedOutput();
		source.setAll({});
		this.assertTarget([ d, f, c, b, m ], target);
		
		source.remove("m");
		this.assertTarget([ d, f, c, b ], target);
		
		this.setExpectedOutput();
		source.remove("m");
		this.assertTarget([ d, f, c, b ], target);
		
		source.clear();
		this.assertTarget([], target);
		
		var h = new JW.Proxy("h");
		source.set(h, "h");
		this.assertTarget([ h ], target);
		
		lister.destroy();
		this.assertTarget([], target);
		
		this.setExpectedOutput();
		target.destroy();
		source.destroy();
	},
	
	testObservableTarget: function() {
		var testCase = this;
		var d = new JW.Proxy("d");
		var source = new JW.ObservableMap({ "d": d });
		var target = this.createTarget();
		
		this.setExpectedOutput(
			"Added d",
			"Changed",
			"Changed size from 0 to 1"
		);
		var lister = this.createLister(source, target);
		this.assertTarget([ d ], target);
		
		var f = new JW.Proxy("f");
		this.setExpectedOutput(
			"Added f",
			"Changed",
			"Changed size from 1 to 2"
		);
		source.setAll({ "f": f });
		this.assertTarget([ d, f ], target);
		
		var c = new JW.Proxy("c");
		this.setExpectedOutput(
			"Added c",
			"Changed",
			"Changed size from 2 to 3"
		);
		source.set(c, "c");
		this.assertTarget([ d, f, c ], target);
		
		var b = new JW.Proxy("b");
		var m = new JW.Proxy("m");
		this.setExpectedOutput(
			"Added b",
			"Added m",
			"Changed",
			"Changed size from 3 to 5"
		);
		source.setAll({ "b": b, "m": m });
		this.assertTarget([ d, f, c, b, m ], target);
		
		this.setExpectedOutput();
		source.setAll({});
		this.assertTarget([ d, f, c, b, m ], target);
		
		this.setExpectedOutput(
			"Removed m",
			"Changed",
			"Changed size from 5 to 4"
		);
		source.remove("m");
		this.assertTarget([ d, f, c, b ], target);
		
		this.setExpectedOutput();
		source.remove("m");
		this.assertTarget([ d, f, c, b ], target);
		
		this.setExpectedOutput(
			"Removed d",
			"Removed f",
			"Removed c",
			"Removed b",
			"Changed",
			"Changed size from 4 to 0"
		);
		source.clear();
		this.assertTarget([], target);
		
		var h = new JW.Proxy("h");
		this.setExpectedOutput(
			"Added h",
			"Changed",
			"Changed size from 0 to 1"
		);
		source.set(h, "h");
		this.assertTarget([ h ], target);
		
		this.setExpectedOutput(
			"Removed h",
			"Changed",
			"Changed size from 1 to 0"
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
		
		var source1 = new JW.ObservableMap({ "a": a, "b": b });
		var source2 = new JW.ObservableMap({ "c": c, "d": d });
		var target = this.createTarget();
		
		this.setExpectedOutput(
			"Added x",
			"Changed",
			"Changed size from 0 to 1"
		);
		target.add(x);
		this.assertTarget([ x ], target);
		
		this.setExpectedOutput(
			"Added a",
			"Added b",
			"Changed",
			"Changed size from 1 to 3"
		);
		var lister1 = this.createLister(source1, target);
		this.assertTarget([ a, b, x ], target);
		
		this.setExpectedOutput(
			"Added c",
			"Added d",
			"Changed",
			"Changed size from 3 to 5"
		);
		var lister2 = this.createLister(source2, target);
		this.assertTarget([ a, b, c, d, x ], target);
		
		var e = new JW.Proxy("e");
		this.setExpectedOutput(
			"Added e",
			"Changed",
			"Changed size from 5 to 6"
		);
		source1.set(e, "e");
		this.assertTarget([ a, b, c, d, e, x ], target);
		
		var f = new JW.Proxy("f");
		this.setExpectedOutput(
			"Removed d",
			"Added f",
			"Changed"
		);
		source2.set(f, "d");
		this.assertTarget([ a, b, c, e, f, x ], target);
		
		this.setExpectedOutput(
			"Removed a",
			"Removed b",
			"Removed e",
			"Changed",
			"Changed size from 6 to 3"
		);
		source1.clear();
		this.assertTarget([ c, f, x ], target);
		
		this.setExpectedOutput();
		lister1.destroy();
		this.assertTarget([ c, f, x ], target);
		
		this.setExpectedOutput(
			"Removed c",
			"Removed f",
			"Changed",
			"Changed size from 3 to 1"
		);
		lister2.destroy();
		this.assertTarget([ x ], target);
		
		this.setExpectedOutput(
			"Removed x",
			"Changed",
			"Changed size from 1 to 0"
		);
		target.destroy();
		
		this.setExpectedOutput();
		source1.destroy();
		source2.destroy();
	},
	
	// tests that empty source doesn't caused target to trigger "change" on synchronizer initialization
	testEmptyChange: function() {
		var source = new JW.ObservableMap();
		var target = this.createTarget();
		var lister = this.createLister(source, target);
		lister.destroy();
		target.destroy();
		source.destroy();
	},
	
	testAutoTarget: function() {
		var d = new JW.Proxy("d");
		var source = new JW.ObservableMap({ "d": d });
		var lister = this.createLister(source);
		this.assertTrue(lister.target instanceof JW.ObservableSet);
		this.assertTarget([ d ], lister.target);
		lister.destroy();
		source.destroy();
	},
	
	createTarget: function() {
		var target = new JW.ObservableSet();
		
		target.addEvent.bind(function(params) {
			this.output("Added " + params.item.value);
		}, this);
		
		target.removeEvent.bind(function(params) {
			this.output("Removed " + params.item.value);
		}, this);
		
		target.changeEvent.bind(function(params) {
			this.output("Changed");
		}, this);
		
		target.sizeChangeEvent.bind(function(params) {
			this.output("Changed size from " + params.oldSize + " to " + params.newSize);
		}, this);
		
		return target;
	},
	
	createLister: function(source, target) {
		return source.createLister({
			target : target
		});
	},
	
	assertTarget: function(values, target) {
		this.assertStrictEqual(values.length, target.getSize());
		for (var i = 0; i < values.length; ++i) {
			this.assertTrue(target.contains(values[i]));
		}
	}
});