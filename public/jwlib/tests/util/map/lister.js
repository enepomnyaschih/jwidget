/*
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

JW.Tests.Util.Map.ListerTestCase = JW.Unit.TestCase.extend({
	testMapper: function() {
		var testCase = this;
		var d = JW("d");
		var source = new JW.Map({ "d": d });
		var target = this.createTarget();
		
		this.setExpectedOutput(
			"Added d",
			"Changed",
			"Changed size from 0 to 1"
		);
		var lister = this.createLister(source, target);
		this.assertTarget([ d ], target);
		
		var f = JW("f");
		this.setExpectedOutput(
			"Added f",
			"Changed",
			"Changed size from 1 to 2"
		);
		source.setAll({ "f": f });
		this.assertTarget([ d, f ], target);
		
		var c = JW("c");
		this.setExpectedOutput(
			"Added c",
			"Changed",
			"Changed size from 2 to 3"
		);
		source.set(c, "c");
		this.assertTarget([ d, f, c ], target);
		
		var b = JW("b");
		var m = JW("m");
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
		
		var h = JW("h");
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
		target.destroy();
		source.destroy();
	},
	
	testEmptyChange: function() {
		var source = new JW.Map();
		var target = this.createTarget();
		var lister = this.createLister(source, target);
		lister.destroy();
		target.destroy();
		source.destroy();
	},
	
	testAutoTarget: function() {
		var d = JW("d");
		var source = new JW.Map({ "d": d });
		var lister = this.createLister(source);
		this.assertTarget([ d ], lister.target);
		lister.destroy();
		source.destroy();
	},
	
	createTarget: function() {
		var target = new JW.Set();
		
		target.addEvent.bind(function(params) {
			this.output("Added " + params.item.base);
		}, this);
		
		target.removeEvent.bind(function(params) {
			this.output("Removed " + params.item.base);
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
		return new JW.Map.Lister({
			source : source,
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
