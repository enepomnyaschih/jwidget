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

JW.Tests.Collection.ObservableArray.SorterComparingTestCase = JW.Unit.TestCase.extend({
	testObservableTarget: function() {
		var source = new JW.ObservableArray(["c", "b", "a", "d"]);
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
		source.splice([
			new JW.AbstractArray.IndexCount(0, 1),
			new JW.AbstractArray.IndexCount(2, 2)
		], [
			new JW.AbstractArray.IndexItems(0, ["f", "e"]),
			new JW.AbstractArray.IndexItems(3, ["a"])
		]); // f,e,b,a
		this.assertTarget(["a", "b", "e", "f"], target);
		
		this.setExpectedOutput(
			"Spliced -[3:[f]] +[2:[c]] to [a,b,e,f]",
			"Changed"
		);
		source.set("c", 0); // c,e,b,a
		this.assertTarget(["a", "b", "c", "e"], target);
		
		this.setExpectedOutput();
		source.move(0, 2); // e,b,c,a
		this.assertTarget(["a", "b", "c", "e"], target);
		
		this.setExpectedOutput();
		source.reorder([2, 0, 1, 3]); // b,c,e,a
		this.assertTarget(["a", "b", "c", "e"], target);
		
		this.setExpectedOutput(
			"Spliced -[0:[a,b,c,e]] +[] to [a,b,c,e]",
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
		source.add("c");
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
	/*
	testUnobservableTarget: function() {
		var d = new JW.Proxy("d");
		var source = new JW.ObservableArray([ d ]);
		var target = new JW.Set();
		
		var orderer = this.createOrderer(source, target);
		this.assertTarget([ d ], target);
		
		// d
		var f = new JW.Proxy("f");
		source.addAll([ f ]);
		this.assertTarget([ d, f ], target);
		
		// d f
		var c = new JW.Proxy("c");
		source.add(c, 1);
		this.assertTarget([ d, f, c ], target);
		
		// d c f
		var b = new JW.Proxy("b");
		var m = new JW.Proxy("m");
		source.addAll([ b, m ], 0);
		this.assertTarget([ d, f, c, b, m ], target);
		
		// b m d c f
		this.setExpectedOutput();
		source.addAll([], 1);
		this.assertTarget([ d, f, c, b, m ], target);
		
		var a = new JW.Proxy("a");
		source.add(a, 5);
		this.assertTarget([ d, f, c, b, m, a ], target);
		
		// b m d c f a
		source.remove(1);
		this.assertTarget([ d, f, c, b, a ], target);
		
		// b d c f a
		source.remove(0);
		this.assertTarget([ d, f, c, a ], target);
		
		// d c f a
		var k = new JW.Proxy("k");
		source.add(k);
		this.assertTarget([ d, f, c, a, k ], target);
		
		// d c f a k
		var g = new JW.Proxy("g");
		source.set(g, 2);
		this.assertTarget([ d, c, a, k, g ], target);
		
		// d c g a k
		this.setExpectedOutput();
		source.set(a, 3);
		this.assertTarget([ d, c, a, k, g ], target);
		
		this.setExpectedOutput();
		source.move(2, 1);
		this.assertTarget([ d, c, a, k, g ], target);
		
		// d g c a k
		this.setExpectedOutput();
		source.move(0, 4);
		this.assertTarget([ d, c, a, k, g ], target);
		
		// g c a k d
		this.setExpectedOutput();
		source.move(1, 1);
		this.assertTarget([ d, c, a, k, g ], target);
		
		this.setExpectedOutput();
		var items = source.getItems().concat();
		JW.Array.sort(items, JW.byField("value"));
		source.performReorder(items);
		this.assertTarget([ d, c, a, k, g ], target);
		
		// a c d g k
		source.performSplice([ a, d, g, k ]);
		this.assertTarget([ d, a, k, g ], target);
		
		// a d g k
		source.performSplice([ k ]);
		this.assertTarget([ k ], target);
		
		// k
		var u = new JW.Proxy("u");
		var t = new JW.Proxy("t");
		var c = new JW.Proxy("c");
		source.performSplice([ u, t, c ]);
		this.assertTarget([ u, t, c ], target);
		
		// u t c
		source.clear();
		this.assertTarget([], target);
		
		// (empty)
		var h = new JW.Proxy("h");
		source.add(h);
		this.assertTarget([ h ], target);
		
		// h
		orderer.destroy();
		this.assertTarget([], target);
		
		this.setExpectedOutput();
		target.destroy();
		source.destroy();
	},
	
	testMultiSource: function() {
		var a = new JW.Proxy("a");
		var source1 = new JW.ObservableArray([ a ]);
		var b = new JW.Proxy("b");
		var c = new JW.Proxy("c");
		var source2 = new JW.ObservableArray([ b, c ]);
		var x = new JW.Proxy("x");
		var target = this.createTarget();
		this.setExpectedOutput(
			"Spliced -[] +[x]",
			"Changed",
			"Changed size from 0 to 1"
		);
		target.add(x);
		this.assertTarget([ x ], target);
		
		this.setExpectedOutput(
			"Spliced -[] +[a]",
			"Changed",
			"Changed size from 1 to 2"
		);
		var orderer1 = this.createOrderer(source1, target);
		this.assertTarget([ x, a ], target);
		
		this.setExpectedOutput(
			"Spliced -[] +[b,c]",
			"Changed",
			"Changed size from 2 to 4"
		);
		var orderer2 = this.createOrderer(source2, target);
		this.assertTarget([ x, a, b, c ], target);
		
		var d = new JW.Proxy("d");
		this.setExpectedOutput(
			"Spliced -[] +[d]",
			"Changed",
			"Changed size from 4 to 5"
		);
		source1.add(d);
		this.assertTarget([ x, a, b, c, d ], target);
		
		var e = new JW.Proxy("e");
		this.setExpectedOutput(
			"Spliced -[b] +[e]",
			"Changed"
		);
		source2.set(e, 0);
		this.assertTarget([ x, a, c, d, e ], target);
		
		this.setExpectedOutput(
			"Spliced -[a,d] +[]",
			"Changed",
			"Changed size from 5 to 3"
		);
		source1.clear();
		this.assertTarget([ x, c, e ], target);
		
		this.setExpectedOutput(
			"Spliced -[] +[d]",
			"Changed",
			"Changed size from 3 to 4"
		);
		source1.performSplice([ d ]);
		this.assertTarget([ x, c, e, d ], target);
		
		this.setExpectedOutput(
			"Spliced -[c,e] +[]",
			"Changed",
			"Changed size from 4 to 2"
		);
		orderer2.destroy();
		this.assertTarget([ x, d ], target);
		
		this.setExpectedOutput(
			"Spliced -[d] +[]",
			"Changed",
			"Changed size from 2 to 1"
		);
		orderer1.destroy();
		this.assertTarget([ x ], target);
		
		this.setExpectedOutput();
		target.destroy();
		this.assertTarget([], target);
		
		this.setExpectedOutput();
		source1.destroy();
		source2.destroy();
	},
	
	// tests that empty array doesn't trigger "change" on initialization
	testEmptyChange: function() {
		var source = new JW.ObservableArray();
		var target = this.createTarget();
		var orderer = this.createOrderer(source, target);
		orderer.destroy();
		target.destroy();
		source.destroy();
	},
	
	testAutoTarget: function() {
		var d = new JW.Proxy("d");
		var source = new JW.ObservableArray([ d ]);
		var orderer = this.createOrderer(source);
		this.assertTrue(orderer.target instanceof JW.ObservableSet);
		this.assertTarget([ d ], orderer.target);
		orderer.destroy();
		source.destroy();
	},
	*/
	createTarget: function() {
		var target = new JW.ObservableArray();
		JW.Tests.Collection.subscribeToArray(this, target);
		return target;
	},
	
	createSorterComparing: function(source, target) {
		return source.createSorterComparing({
			target : target
		});
	},
	
	assertTarget: function(values, target) {
		this.assertTrue(target.equal(values));
	}
});
