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
	testMap: function() {
		var map = new JW.ObservableMap();
		this.subscribe(map);
		
		this.setExpectedOutput(
			"Added D at d",
			"Changed",
			"Changed size from 0 to 1"
		);
		this.assertTrue(map.set("D", "d"));
		this.assertMap({ "d": "D" }, map);
		
		this.setExpectedOutput(
			"Added F at f",
			"Changed",
			"Changed size from 1 to 2"
		);
		this.assertTrue(map.setAll({ "f": "F" }));
		this.assertMap({ "d": "D", "f": "F" }, map);
		
		this.setExpectedOutput(
			"Added C at c",
			"Added A at a",
			"Changed",
			"Changed size from 2 to 4"
		);
		this.assertTrue(map.setAll({ "c": "C", "a": "A" }));
		this.assertMap({ "d": "D", "f": "F", "c": "C", "a": "A" }, map);
		
		this.setExpectedOutput(
			"Removed F at f",
			"Changed",
			"Changed size from 4 to 3"
		);
		this.assertStrictEqual("F", map.remove("f"));
		this.assertMap({ "d": "D", "c": "C", "a": "A" }, map);
		
		this.setExpectedOutput();
		this.assertFalse(map.setAll({}));
		this.assertMap({ "d": "D", "c": "C", "a": "A" }, map);
		
		this.setExpectedOutput(
			"Added B at b",
			"Changed",
			"Changed size from 3 to 4"
		);
		this.assertTrue(map.setAll({ "b": "B", "c": "C" }));
		this.assertMap({ "d": "D", "c": "C", "a": "A", "b": "B" }, map);
		
		this.setExpectedOutput();
		this.assertFalse(map.setAll({ "b": "B", "c": "C" }));
		this.assertMap({ "d": "D", "c": "C", "a": "A", "b": "B" }, map);
		
		this.setExpectedOutput(
			"Removed C at c",
			"Removed B at b",
			"Changed",
			"Changed size from 4 to 2"
		);
		this.assertTrue(map.removeAll([ "c", "b" ]));
		this.assertMap({ "d": "D", "a": "A" }, map);
		
		this.setExpectedOutput();
		this.assertFalse(map.removeAll([ "c", "b" ]));
		this.assertMap({ "d": "D", "a": "A" }, map);
		
		this.setExpectedOutput(
			"Removed D at d",
			"Removed A at a",
			"Changed",
			"Changed size from 2 to 0"
		);
		this.assertTrue(map.clear());
		this.assertMap({}, map);
		
		this.setExpectedOutput();
		this.assertFalse(map.clear());
		this.assertMap({}, map);
		
		this.setExpectedOutput(
			"Added A at a",
			"Changed",
			"Changed size from 0 to 1"
		);
		map.set("A", "a");
		this.assertMap({ "a": "A" }, map);
		
		this.setExpectedOutput();
		map.set(undefined, "b");
		this.assertMap({ "a": "A" }, map);
		
		this.setExpectedOutput(
			"Added null at c",
			"Changed",
			"Changed size from 1 to 2"
		);
		map.set(null, "c");
		this.assertMap({ "a": "A", "c": null }, map);
		
		this.setExpectedOutput(
			"Removed A at a",
			"Removed null at c",
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
		this.assertTrue(mapped instanceof JW.ObservableArray);
		this.assertStrictNotEqual(map, cloned);
		this.assertStrictEqual(3, cloned.getSize());
		this.assertStrictEqual("a", cloned.get("x"));
		this.assertStrictEqual("b", cloned.get("y"));
		this.assertStrictEqual("c", cloned.get("z"));
	},
	
	testCloneUnobservable: function() {
		var map = new JW.ObservableMap([ "a", "b", "c" ]);
		var cloned = map.cloneUnobservable();
		this.assertTrue(mapped instanceof JW.Map);
		this.assertStrictEqual(3, cloned.getSize());
		this.assertStrictEqual("a", cloned.get("x"));
		this.assertStrictEqual("b", cloned.get("y"));
		this.assertStrictEqual("c", cloned.get("z"));
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
		map.addEvent.bind(this.onAdd, this);
		map.removeEvent.bind(this.onRemove, this);
		map.changeEvent.bind(this.onChange, this);
		map.sizeChangeEvent.bind(this.onSizeChange, this);
	},
	
	assertMap: function(expected, map) {
		this.assertStrictEqual(JW.Map.getSize(expected), map.getSize());
		for (var key in expected) {
			this.assertStrictEqual(expected[key], map.get(key));
		}
	},
	
	onAdd: function(params) {
		this.output("Added " + params.item + " at " + params.key);
	},
	
	onRemove: function(params) {
		this.output("Removed " + params.item + " at " + params.key);
	},
	
	onChange: function(params) {
		this.output("Changed");
	},
	
	onSizeChange: function(params) {
		this.output("Changed size from " + params.oldSize + " to " + params.newSize);
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
