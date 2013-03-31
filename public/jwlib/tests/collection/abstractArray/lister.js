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

JW.Tests.Collection.AbstractArray.ListerTestCase = JW.Unit.TestCase.extend({
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
			"Added a",
			"Added b",
			"Changed",
			"Changed size from 0 to 2"
		);
		var lister = this.createLister(source, target);
		this.assertTarget([ a, b ], target);
		
		this.setExpectedOutput(
			"Removed a",
			"Removed b",
			"Changed",
			"Changed size from 2 to 0"
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
		
		this.setExpectedOutput(
			"Removed a",
			"Removed b",
			"Changed",
			"Changed size from 5 to 3"
		);
		lister1.destroy();
		this.assertTarget([ c, d, x ], target);
		
		this.setExpectedOutput(
			"Removed c",
			"Removed d",
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
