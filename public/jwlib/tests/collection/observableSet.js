/*
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

JW.Tests.Collection.ObservableSetTestCase = function(config) {
	JW.Tests.Collection.ObservableSetTestCase._super.call(this, config);
	this.a = new JW.Proxy("a");
	this.b = new JW.Proxy("b");
	this.c = new JW.Proxy("c");
	this.d = new JW.Proxy("d");
	this.e = new JW.Proxy("e");
};

JW.extend(JW.Tests.Collection.ObservableSetTestCase, JW.Unit.TestCase, {
	testObservableSet: function() {
		var set = new JW.ObservableSet();
		this.subscribe(set);
		
		var d = new JW.Proxy("d");
		var e = new JW.Proxy("e");
		var c = new JW.Proxy("c");
		var a = new JW.Proxy("a");
		var b = new JW.Proxy("b");
		
		this.setExpectedOutput(
			"Spliced -[] +[d]",
			"Changed",
			"Changed size from 0 to 1"
		);
		this.assertTrue(set.add(d));
		this.assertSet([ d ], [ a, b, c, e ], set);
		
		this.setExpectedOutput(
			"Spliced -[] +[e]",
			"Changed",
			"Changed size from 1 to 2"
		);
		this.assertTrue(JW.Array.equal([ e ], set.addAll([ e ])));
		this.assertSet([ d, e ], [ a, b, c ], set);
		
		this.setExpectedOutput(
			"Spliced -[] +[a,c]",
			"Changed",
			"Changed size from 2 to 4"
		);
		this.assertTrue(JW.Array.equal([ c, a ], set.addAll([ c, a ])));
		this.assertSet([ d, e, c, a ], [ b ], set);
		
		this.setExpectedOutput(
			"Spliced -[e] +[]",
			"Changed",
			"Changed size from 4 to 3"
		);
		this.assertTrue(set.remove(e));
		this.assertSet([ d, c, a ], [ b, e ], set);
		
		this.setExpectedOutput();
		this.assertUndefined(set.addAll([]));
		this.assertSet([ d, c, a ], [ b, e ], set);
		
		this.setExpectedOutput(
			"Spliced -[] +[b]",
			"Changed",
			"Changed size from 3 to 4"
		);
		this.assertTrue(JW.Array.equal([ b ], set.addAll([ b, c ])));
		this.assertSet([ d, c, a, b ], [ e ], set);
		
		this.setExpectedOutput();
		this.assertUndefined(set.addAll([ b, c ]));
		this.assertSet([ d, c, a, b ], [ e ], set);
		
		this.setExpectedOutput(
			"Spliced -[a,d] +[]",
			"Changed",
			"Changed size from 4 to 2"
		);
		this.assertTrue(JW.Array.equal([ a, d ], set.removeAll([ a, d ])));
		this.assertSet([ c, b ], [ a, d, e ], set);
		
		this.setExpectedOutput();
		this.assertUndefined(set.removeAll([ a, d ]));
		this.assertSet([ c, b ], [ a, d, e ], set);
		
		this.setExpectedOutput(
			"Spliced -[c] +[a,e]",
			"Changed",
			"Changed size from 2 to 3"
		);
		var spliceResult = set.splice([ d, c ], [ b, a, e ]);
		JW.Tests.Collection.assertSetSpliceResult(this, new JW.AbstractSet.SpliceResult([ c ], [ a, e ]), spliceResult);
		this.assertSet([ b, a, e ], [ c, d ], set);
		
		this.setExpectedOutput();
		this.assertUndefined(set.splice([ d ], [ a ]));
		this.assertSet([ b, a, e ], [ c, d ], set);
		
		this.setExpectedOutput(
			"Spliced -[b] +[c]",
			"Changed"
		);
		var spliceResult = set.performSplice([ a, c, e ]);
		JW.Tests.Collection.assertSetSpliceResult(this, new JW.AbstractSet.SpliceResult([ b ], [ c ]), spliceResult);
		this.assertSet([ a, c, e ], [ b, d ], set);
		
		// The clearing order differs in Chrome and Firefox:
		// Chrome optimizes integer-based maps and sorts the items, Firefox doesn't.
		// That's why we created items in straight order to make sure that
		// their _iid's will be sorted.
		this.setExpectedOutput(
			"Cleared [a,c,e]",
			"Changed",
			"Changed size from 3 to 0"
		);
		this.assertTrue(new JW.Set(set.clear()).equal(new JW.Set([ a, c, e ])));
		this.assertSet([], [ a, b, c, d, e ], set);
		
		this.setExpectedOutput();
		this.assertUndefined(set.clear());
		this.assertSet([], [ a, b, c, d, e ], set);
		
		this.setExpectedOutput(
			"Spliced -[] +[a]",
			"Changed",
			"Changed size from 0 to 1"
		);
		this.assertTrue(set.add(a));
		this.assertSet([ a ], [ b, c, d, e ], set);
		
		this.setExpectedOutput(
			"Cleared [a]",
			"Changed",
			"Changed size from 1 to 0"
		);
		set.destroy();
	},
	
	testEvery: function() {
		var set = new JW.ObservableSet([ new JW.Proxy("a"), new JW.Proxy("A"), new JW.Proxy("b") ]);
		
		this.assertFalse(set.every(this.isUpperCase));
		this.assertFalse(set.every(this.isA));
		this.assertTrue (set.every(this.isString));
		this.assertFalse(set.every(this.isNumber));
	},
	
	testSome: function() {
		var set = new JW.ObservableSet([ new JW.Proxy("a"), new JW.Proxy("A"), new JW.Proxy("b") ]);
		
		this.assertTrue (set.some(this.isUpperCase));
		this.assertTrue (set.some(this.isA));
		this.assertTrue (set.some(this.isString));
		this.assertFalse(set.some(this.isNumber));
	},
	
	testFilter: function() {
		var a = new JW.Proxy("a");
		var A = new JW.Proxy("A");
		var b = new JW.Proxy("b");
		var set = new JW.ObservableSet([ a, A, b ]);
		var filtered = set.filter(this.isA);
		this.assertTrue(filtered instanceof JW.Set);
		this.assertEqual(3, set.getSize());
		this.assertEqual(2, filtered.getSize());
		this.assertTrue(filtered.contains(a));
		this.assertTrue(filtered.contains(A));
		this.assertFalse(filtered.contains(b));
	},
	
	testMap: function() {
		var a = new JW.Proxy("a");
		var b = new JW.Proxy("b");
		var c = new JW.Proxy("c");
		var results = {
			a: new JW.Proxy("A"),
			b: new JW.Proxy("B"),
			c: new JW.Proxy("C")
		};
		var set = new JW.ObservableSet([ a, b, c ]);
		var mapped = set.map(function(x) { return results[x.value]; });
		this.assertTrue(mapped instanceof JW.Set);
		this.assertStrictEqual(3, mapped.getSize());
		this.assertTrue(mapped.contains(results.a));
		this.assertTrue(mapped.contains(results.b));
		this.assertTrue(mapped.contains(results.c));
	},
	
	testClone: function() {
		var a = new JW.Proxy("a");
		var b = new JW.Proxy("b");
		var c = new JW.Proxy("c");
		var set = new JW.ObservableSet([ a, b, c ]);
		var cloned = set.clone();
		this.assertTrue(cloned instanceof JW.ObservableSet);
		this.assertStrictNotEqual(set, cloned);
		this.assertStrictEqual(3, cloned.getSize());
		this.assertTrue(cloned.contains(a));
		this.assertTrue(cloned.contains(b));
		this.assertTrue(cloned.contains(c));
	},
	
	testCloneUnobservable: function() {
		var a = new JW.Proxy("a");
		var b = new JW.Proxy("b");
		var c = new JW.Proxy("c");
		var set = new JW.ObservableSet([ a, b, c ]);
		var cloned = set.cloneUnobservable();
		this.assertTrue(cloned instanceof JW.Set);
		this.assertStrictEqual(3, cloned.getSize());
		this.assertTrue(cloned.contains(a));
		this.assertTrue(cloned.contains(b));
		this.assertTrue(cloned.contains(c));
	},
	
	testRemoveItem: function() {
		var set = new JW.ObservableSet([ this.a, this.b, this.c, this.d ]);
		this.subscribe(set);
		
		this.setExpectedOutput(
			"Spliced -[b] +[]",
			"Changed",
			"Changed size from 4 to 3"
		);
		this.assertStrictEqual(this.b._iid, set.removeItem(this.b));
		this.setExpectedOutput();
		this.assertUndefined(set.removeItem(this.e));
		
		var expected = {};
		JW.Set.addAll(expected, [ this.a, this.c, this.d ]);
		this.assertTrue(JW.Set.equal(expected, set.getJson()));
	},
	
	testMapFields: function() {
		var array = new JW.ObservableArray([
			{ x: "a", y: "d" },
			{ x: "b", y: "e" },
			{ x: "c", y: "f" }
		]);
		var mapped = array.mapFields();
		this.assertTrue(mapped.x instanceof JW.Array);
		this.assertTrue(mapped.y instanceof JW.Array);
		this.assertStrictEqual(3, mapped.x.getSize());
		this.assertStrictEqual(3, mapped.y.getSize());
		this.assertStrictEqual("a", mapped.x.get(0));
		this.assertStrictEqual("b", mapped.x.get(1));
		this.assertStrictEqual("c", mapped.x.get(2));
		this.assertStrictEqual("d", mapped.y.get(0));
		this.assertStrictEqual("e", mapped.y.get(1));
		this.assertStrictEqual("f", mapped.y.get(2));
	},
	
	subscribe: function(set) {
		JW.Tests.Collection.subscribeToSet(this, set);
	},
	
	assertSet: function(expected, unexpected, set) {
		JW.Tests.Collection.assertSet(this, expected, unexpected, set);
	},
	
	isUpperCase: function(value) {
		return value.value.toUpperCase() === value.value;
	},
	
	isA: function(value) {
		return value.value.toUpperCase() === "A";
	},
	
	isString: function(value) {
		return typeof value.value === "string";
	},
	
	isNumber: function(value) {
		return typeof value.value === "number";
	}
});

JW.Tests.Collection.ObservableSet = {};
