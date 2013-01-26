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

JW.Tests.Util.Collection.ListerTestCase = JW.Unit.TestCase.extend({
	testLister: function() {
		var d = JW("d");
		var source = new JW.Collection([ d ]);
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
		
		var testCase = this;
		
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
		var lister = new JW.Collection.Lister({
			source : source,
			target : target,
			scope  : this
		});
		assert([ d ]);
		
		// d
		var f = JW("f");
		this.setExpectedOutput(
			"Added f",
			"Changed",
			"Changed size from 1 to 2"
		);
		source.addAll([ f ]);
		assert([ d, f ]);
		
		// d f
		var c = JW("c");
		this.setExpectedOutput(
			"Added c",
			"Changed",
			"Changed size from 2 to 3"
		);
		source.add(c, 1);
		assert([ d, f, c ]);
		
		// d c f
		var b = JW("b");
		var m = JW("m");
		this.setExpectedOutput(
			"Added b",
			"Added m",
			"Changed",
			"Changed size from 3 to 5"
		);
		source.addAll([ b, m ], 0);
		assert([ d, f, c, b, m ]);
		
		// b m d c f
		this.setExpectedOutput();
		source.addAll([], 1);
		assert([ d, f, c, b, m ]);
		
		var a = JW("a");
		this.setExpectedOutput(
			"Added a",
			"Changed",
			"Changed size from 5 to 6"
		);
		source.add(a, 5);
		assert([ d, f, c, b, m, a ]);
		
		// b m d c f a
		this.setExpectedOutput(
			"Removed m",
			"Changed",
			"Changed size from 6 to 5"
		);
		source.remove(1);
		assert([ d, f, c, b, a ]);
		
		// b d c f a
		this.setExpectedOutput(
			"Removed b",
			"Changed",
			"Changed size from 5 to 4"
		);
		source.remove(0);
		assert([ d, f, c, a ]);
		
		// d c f a
		var k = JW("k");
		this.setExpectedOutput(
			"Added k",
			"Changed",
			"Changed size from 4 to 5"
		);
		source.add(k);
		assert([ d, f, c, a, k ]);
		
		// d c f a k
		var g = JW("g");
		this.setExpectedOutput(
			"Removed f",
			"Added g",
			"Changed"
		);
		source.set(g, 2);
		assert([ d, c, a, k, g ]);
		
		// d c g a k
		this.setExpectedOutput();
		source.set(a, 3);
		assert([ d, c, a, k, g ]);
		
		this.setExpectedOutput();
		source.move(2, 1);
		assert([ d, c, a, k, g ]);
		
		// d g c a k
		this.setExpectedOutput();
		source.move(0, 4);
		assert([ d, c, a, k, g ]);
		
		// g c a k d
		this.setExpectedOutput();
		source.move(1, 1);
		assert([ d, c, a, k, g ]);
		
		this.setExpectedOutput();
		JW.Array.sortBy(source.base, "base");
		source.triggerReorder();
		assert([ d, c, a, k, g ]);
		
		// a c d g k
		this.setExpectedOutput(
			"Removed c",
			"Changed",
			"Changed size from 5 to 4"
		);
		source.base.splice(1, 1);
		source.triggerFilter();
		assert([ d, a, k, g ]);
		
		// a d g k
		this.setExpectedOutput(
			"Removed d",
			"Removed a",
			"Removed g",
			"Changed",
			"Changed size from 4 to 1"
		);
		source.base.splice(0, 3);
		source.triggerFilter();
		assert([ k ]);
		
		// k
		var u = JW("u");
		var t = JW("t");
		var c = JW("c");
		this.setExpectedOutput(
			"Removed k",
			"Added u",
			"Added t",
			"Added c",
			"Changed",
			"Changed size from 1 to 3"
		);
		source.base = [ u, t, c ];
		source.triggerReset();
		assert([ u, t, c ]);
		
		// u t c
		this.setExpectedOutput(
			"Removed u",
			"Removed t",
			"Removed c",
			"Changed",
			"Changed size from 3 to 0"
		);
		source.clear();
		assert([]);
		
		// (empty)
		var h = JW("h");
		this.setExpectedOutput(
			"Added h",
			"Changed",
			"Changed size from 0 to 1"
		);
		source.add(h);
		assert([ h ]);
		
		// h
		this.setExpectedOutput(
			"Removed h",
			"Changed",
			"Changed size from 1 to 0"
		);
		lister.destroy();
		source.destroy();
	}
});
