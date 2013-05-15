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

JW.Tests.Collection.ObservableMapTestCase = JW.Unit.TestCase.extend({
	testObservableMap: function() {
		var map = new JW.ObservableMap();
		this.subscribe(map);
		
		this.setExpectedOutput(
			"Spliced -{} +{d:D}",
			"Changed",
			"Changed size from 0 to 1"
		);
		this.assertUndefined(map.set("D", "d").value);
		this.assertMap({ "d": "D" }, map);
		
		this.setExpectedOutput(
			"Spliced -{} +{f:F}",
			"Changed",
			"Changed size from 1 to 2"
		);
		var spliceResult = map.setAll({ "f": "F" });
		JW.Tests.Collection.assertMapSpliceResult(this, {
			removedItems: {},
			addedItems: { f: "F" }
		}, spliceResult);
		this.assertMap({ "d": "D", "f": "F" }, map);
		
		this.setExpectedOutput(
			"Spliced -{} +{a:A,c:C}",
			"Changed",
			"Changed size from 2 to 4"
		);
		var spliceResult = map.setAll({ "c": "C", "a": "A" });
		JW.Tests.Collection.assertMapSpliceResult(this, {
			removedItems: {},
			addedItems: { c: "C", a: "A" }
		}, spliceResult);
		this.assertMap({ "d": "D", "f": "F", "c": "C", "a": "A" }, map);
		
		this.setExpectedOutput(
			"Spliced -{f:F} +{}",
			"Changed",
			"Changed size from 4 to 3"
		);
		this.assertStrictEqual("F", map.remove("f"));
		this.assertMap({ "d": "D", "c": "C", "a": "A" }, map);
		
		this.setExpectedOutput();
		this.assertUndefined(map.setAll({}));
		this.assertMap({ "d": "D", "c": "C", "a": "A" }, map);
		
		this.setExpectedOutput(
			"Spliced -{} +{b:B}",
			"Changed",
			"Changed size from 3 to 4"
		);
		var spliceResult = map.setAll({ "b": "B", "c": "C" });
		JW.Tests.Collection.assertMapSpliceResult(this, {
			removedItems: {},
			addedItems: { b: "B" }
		}, spliceResult);
		this.assertMap({ "d": "D", "c": "C", "a": "A", "b": "B" }, map);
		
		this.setExpectedOutput();
		this.assertUndefined(map.setAll({ "b": "B", "c": "C" }));
		this.assertMap({ "d": "D", "c": "C", "a": "A", "b": "B" }, map);
		
		this.setExpectedOutput(
			"Spliced -{b:B,c:C} +{}",
			"Changed",
			"Changed size from 4 to 2"
		);
		this.assertTrue(JW.Map.equal({ "c": "C", "b": "B" }, map.removeAll([ "c", "b" ])));
		this.assertMap({ "d": "D", "a": "A" }, map);
		
		this.setExpectedOutput();
		this.assertUndefined(map.removeAll([ "c", "b" ]));
		this.assertMap({ "d": "D", "a": "A" }, map);
		
		this.setExpectedOutput(
			"Spliced -{a:A} +{a:B}",
			"Changed"
		);
		this.assertStrictEqual("A", map.set("B", "a").value);
		this.assertMap({ "d": "D", "a": "B" }, map);
		
		this.setExpectedOutput(
			"Reindexed by {d:c}",
			"Changed"
		);
		this.assertStrictEqual("D", map.setKey("d", "c"));
		this.assertMap({ "a": "B", "c": "D" }, map);
		
		this.setExpectedOutput(
			"Spliced -{c:D} +{e:E,f:F}",
			"Changed",
			"Changed size from 2 to 3"
		);
		var spliceResult = map.splice([ "c" ], { "e": "E", "f": "F" });
		JW.Tests.Collection.assertMapSpliceResult(this, {
			removedItems: { c: "D" },
			addedItems: { e: "E", f: "F" }
		}, spliceResult);
		this.assertMap({ "a": "B", "e": "E", "f": "F" }, map);
		
		this.setExpectedOutput(
			"Spliced -{a:B,f:F} +{a:A,b:B,c:C}",
			"Changed",
			"Changed size from 3 to 4"
		);
		var spliceResult = map.splice([ "a", "f" ], { "a": "A", "b": "B", "c": "C" });
		JW.Tests.Collection.assertMapSpliceResult(this, {
			removedItems: { a: "B", f: "F" },
			addedItems: { a: "A", b: "B", c: "C" }
		}, spliceResult);
		this.assertMap({ "a": "A", "e": "E", "b": "B", "c": "C" }, map);
		
		this.setExpectedOutput();
		this.assertUndefined(map.splice([], {}));
		this.assertMap({ "a": "A", "e": "E", "b": "B", "c": "C" }, map);
		
		this.setExpectedOutput();
		this.assertUndefined(map.splice([], { e: "E", c: "C" }));
		this.assertMap({ "a": "A", "e": "E", "b": "B", "c": "C" }, map);
		
		this.setExpectedOutput(
			"Reindexed by {a:b,b:d,e:a}",
			"Changed"
		);
		this.assertTrue(JW.Map.equal({ a: "b", e: "a", b: "d" },
			map.reindex({ a: "b", e: "a", b: "d", c: "c" })));
		this.assertMap({ "c": "C", "b": "A", "a": "E", "d": "B" }, map);
		
		this.setExpectedOutput();
		this.assertUndefined(map.reindex({ a: "a", b: "b" }));
		this.assertMap({ "c": "C", "b": "A", "a": "E", "d": "B" }, map);
		
		this.setExpectedOutput(
			"Spliced -{b:A,d:B} +{b:B,f:F}",
			"Changed"
		);
		var spliceResult = map.performSplice({ "c": "C", "b": "B", "a": "E", "f": "F" });
		JW.Tests.Collection.assertMapSpliceResult(this, {
			removedItems: { b: "A", d: "B" },
			addedItems: { b: "B", f: "F" }
		}, spliceResult);
		this.assertMap({ "c": "C", "a": "E", "b": "B", "f": "F" }, map);
		
		this.setExpectedOutput();
		this.assertUndefined(map.performSplice({ "c": "C", "a": "E", "b": "B", "f": "F" }));
		this.assertMap({ "c": "C", "a": "E", "b": "B", "f": "F" }, map);
		
		this.setExpectedOutput(
			"Reindexed by {a:e,c:g}",
			"Changed"
		);
		this.assertTrue(JW.Map.equal({ c: "g", a: "e" },
			map.performReindex({ "g": "C", "b": "B", "e": "E", "f": "F" })));
		this.assertMap({ "b": "B", "e": "E", "g": "C", "f": "F" }, map);
		
		this.setExpectedOutput();
		this.assertUndefined(map.performReindex({ "b": "B", "e": "E", "g": "C", "f": "F" }));
		this.assertMap({ "b": "B", "e": "E", "g": "C", "f": "F" }, map);
		
		this.setExpectedOutput(
			"Cleared {b:B,e:E,f:F,g:C}",
			"Changed",
			"Changed size from 4 to 0"
		);
		this.assertTrue(JW.Map.equal({ "b": "B", "e": "E", "g": "C", "f": "F" }, map.clear()));
		this.assertMap({}, map);
		
		this.setExpectedOutput();
		this.assertUndefined(map.clear());
		this.assertMap({}, map);
		
		this.setExpectedOutput(
			"Spliced -{} +{a:A}",
			"Changed",
			"Changed size from 0 to 1"
		);
		this.assertUndefined(map.set("A", "a").value);
		this.assertMap({ "a": "A" }, map);
		
		this.setExpectedOutput(
			"Spliced -{} +{c:null}",
			"Changed",
			"Changed size from 1 to 2"
		);
		this.assertUndefined(map.set(null, "c").value);
		this.assertMap({ "a": "A", "c": null }, map);
		
		this.setExpectedOutput(
			"Cleared {a:A,c:null}",
			"Changed",
			"Changed size from 2 to 0"
		);
		map.destroy();
	},
	
	testEvery: function() {
		var map = new JW.ObservableMap({ "a1": "a", "a2": "A", "a3": "b" });
		
		this.assertFalse(map.every(this.isUpperCase));
		this.assertFalse(map.every(this.isA));
		this.assertTrue (map.every(this.isString));
		this.assertFalse(map.every(this.isNumber));
	},
	
	testSome: function() {
		var map = new JW.ObservableMap({ "a1": "a", "a2": "A", "a3": "b" });
		
		this.assertTrue (map.some(this.isUpperCase));
		this.assertTrue (map.some(this.isA));
		this.assertTrue (map.some(this.isString));
		this.assertFalse(map.some(this.isNumber));
	},
	
	testFilter: function() {
		var map = new JW.ObservableMap({ "a1": "a", "a2": "A", "a3": "b" });
		var filtered = map.filter(this.isA);
		this.assertTrue(filtered instanceof JW.Map);
		this.assertEqual(3, map.getSize());
		this.assertEqual(2, filtered.getSize());
		this.assertEqual(map.get("a1"), filtered.get("a1"));
		this.assertEqual(map.get("a2"), filtered.get("a2"));
	},
	
	testMap: function() {
		var map = new JW.ObservableMap({ x: "a", y: "b", z: "c" });
		var mapped = map.map(function(x, y) { return y + x; });
		this.assertTrue(mapped instanceof JW.Map);
		this.assertStrictEqual(3, mapped.getSize());
		this.assertStrictEqual("xa", mapped.get("x"));
		this.assertStrictEqual("yb", mapped.get("y"));
		this.assertStrictEqual("zc", mapped.get("z"));
	},
	
	testClone: function() {
		var map = new JW.ObservableMap({ x: "a", y: "b", z: "c" });
		var cloned = map.clone();
		this.assertTrue(cloned instanceof JW.ObservableMap);
		this.assertStrictNotEqual(map, cloned);
		this.assertStrictEqual(3, cloned.getSize());
		this.assertStrictEqual("a", cloned.get("x"));
		this.assertStrictEqual("b", cloned.get("y"));
		this.assertStrictEqual("c", cloned.get("z"));
	},
	
	testCloneUnobservable: function() {
		var map = new JW.ObservableMap({ x: "a", y: "b", z: "c" });
		var cloned = map.cloneUnobservable();
		this.assertTrue(cloned instanceof JW.Map);
		this.assertStrictEqual(3, cloned.getSize());
		this.assertStrictEqual("a", cloned.get("x"));
		this.assertStrictEqual("b", cloned.get("y"));
		this.assertStrictEqual("c", cloned.get("z"));
	},
	
	testRemoveItem: function() {
		var map = new JW.ObservableMap({ "a": 0, "b": 2, "c": 3, "d": 2, "e": 3, "f": 0 });
		this.subscribe(map);
		
		this.setExpectedOutput(
			"Spliced -{b:2} +{}",
			"Changed",
			"Changed size from 6 to 5"
		);
		this.assertStrictEqual("b", map.removeItem(2));
		this.setExpectedOutput();
		this.assertUndefined(map.removeItem(1));
		this.assertTrue(JW.Map.equal({ "a": 0, "c": 3, "d": 2, "e": 3, "f": 0 }, map.getJson()));
	},
	
	testMapFields: function() {
		var map = new JW.ObservableMap({
			p: { x: "a", y: "d" },
			q: { x: "b", y: "e" },
			r: { x: "c", y: "f" }
		});
		var mapped = map.mapFields();
		this.assertTrue(mapped.x instanceof JW.Map);
		this.assertTrue(mapped.y instanceof JW.Map);
		this.assertStrictEqual(3, mapped.x.getSize());
		this.assertStrictEqual(3, mapped.y.getSize());
		this.assertStrictEqual("a", mapped.x.get("p"));
		this.assertStrictEqual("b", mapped.x.get("q"));
		this.assertStrictEqual("c", mapped.x.get("r"));
		this.assertStrictEqual("d", mapped.y.get("p"));
		this.assertStrictEqual("e", mapped.y.get("q"));
		this.assertStrictEqual("f", mapped.y.get("r"));
	},
	
	subscribe: function(map) {
		JW.Tests.Collection.subscribeToMap(this, map);
	},
	
	assertMap: function(expected, map) {
		JW.Tests.Collection.assertMap(this, expected, map);
	},
	
	isUpperCase: function(value) {
		return value.toUpperCase() === value;
	},
	
	isA: function(value) {
		return value.toUpperCase() === "A";
	},
	
	isString: function(value) {
		return typeof value === "string";
	},
	
	isNumber: function(value) {
		return typeof value === "number";
	}
});

JW.Tests.Collection.ObservableMap = {};
