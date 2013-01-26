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
		
		function assert(values) {
			testCase.assertStrictEqual(values.length, target.getSize());
			for (var i = 0; i < values.length; ++i) {
				testCase.assertTrue(target.contains(values[i]));
			}
		}
		
		this.setExpectedOutput(
			"Added d",
			"Changed",
			"Changed size from 0 to 1"
		);
		var lister = new JW.Map.Lister({
			source : source,
			target : target
		});
		assert([ d ]);
		
		var f = JW("f");
		this.setExpectedOutput(
			"Added f",
			"Changed",
			"Changed size from 1 to 2"
		);
		source.setAll({ "f": f });
		assert([ d, f ]);
		
		var c = JW("c");
		this.setExpectedOutput(
			"Added c",
			"Changed",
			"Changed size from 2 to 3"
		);
		source.set(c, "c");
		assert([ d, f, c ]);
		
		var b = JW("b");
		var m = JW("m");
		this.setExpectedOutput(
			"Added b",
			"Added m",
			"Changed",
			"Changed size from 3 to 5"
		);
		source.setAll({ "b": b, "m": m });
		assert([ d, f, c, b, m ]);
		
		this.setExpectedOutput();
		source.setAll({});
		assert([ d, f, c, b, m ]);
		
		this.setExpectedOutput(
			"Removed m",
			"Changed",
			"Changed size from 5 to 4"
		);
		source.remove("m");
		assert([ d, f, c, b ]);
		
		this.setExpectedOutput();
		source.remove("m");
		assert([ d, f, c, b ]);
		
		this.setExpectedOutput(
			"Removed d",
			"Removed f",
			"Removed c",
			"Removed b",
			"Changed",
			"Changed size from 4 to 0"
		);
		source.clear();
		assert([]);
		
		var h = JW("h");
		this.setExpectedOutput(
			"Added h",
			"Changed",
			"Changed size from 0 to 1"
		);
		source.set(h, "h");
		assert([ h ]);
		
		this.setExpectedOutput(
			"Removed h",
			"Changed",
			"Changed size from 1 to 0"
		);
		lister.destroy();
		target.destroy();
		source.destroy();
	}
});
