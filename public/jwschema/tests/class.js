/*
	jWidget Schema tests.
	
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

JW.Schema.Tests.ClassTestCase = function(config) {
	JW.Schema.Tests.ClassTestCase._super.call(this, config);
	this.schema = null;
};

JW.extend(JW.Schema.Tests.ClassTestCase, JW.Unit.TestCase, {
	setup: function() {
		this.schema = new JW.Schema();
	},
	
	testAnd: function() {
		this.schema.registerClass({
			"provider": "And",
			"items": [
				"Positive",
				"Int"
			]
		}, "MyAnd");
		
		this.assertStrictEqual("Data is valid", this.schema.validate(1, "MyAnd").toString());
		this.assertStrictEqual(
			"Data is invalid. First error:\n" +
			"(root): must be more than 0",
			this.schema.validate(0, "MyAnd").toString());
		this.assertStrictEqual(
			"Data is invalid. First error:\n" +
			"(root): integer expected",
			this.schema.validate(.5, "MyAnd").toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"(root): must be more than 0\n" +
			"(root): integer expected",
			this.schema.validate(-.5, "MyAnd", true).toString());
	},
	
	testArray: function() {
		this.schema.registerClass({
			"provider": "Array",
			"item": "Int"
		}, "MyArray");
		
		this.assertStrictEqual("Data is valid", this.schema.validate([], "MyArray").toString());
		this.assertStrictEqual("Data is valid", this.schema.validate([0, 1, 2], "MyArray").toString());
		this.assertStrictEqual(
			"Data is invalid. First error:\n" +
			"(root): array expected",
			this.schema.validate(0, "MyArray").toString());
		this.assertStrictEqual(
			"Data is invalid. First error:\n" +
			"(root): array expected",
			this.schema.validate(null, "MyArray").toString());
		this.assertStrictEqual(
			"Data is invalid. First error:\n" +
			"(root): array expected",
			this.schema.validate("", "MyArray").toString());
		this.assertStrictEqual(
			"Data is invalid. First error:\n" +
			"(root): array expected",
			this.schema.validate({}, "MyArray").toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"[0]: number expected\n" +
			"[2]: integer expected",
			this.schema.validate([null, 1, .5], "MyArray", true).toString());
	},
	
	testArrayLength: function() {
		this.schema.registerClass({
			"provider": "Array",
			"item": "Int",
			"length": 4
		}, "MyArray");
		
		this.assertStrictEqual("Data is valid", this.schema.validate([2, 1, 0, 3], "MyArray").toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"(root): array length of 4 expected, 5 got",
			this.schema.validate([2, 1, 0, 3, 1], "MyArray", true).toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"(root): array length of 4 expected, 3 got",
			this.schema.validate([2, 1, 0], "MyArray", true).toString());
	},
	
	testBoolean: function() {
		this.assertStrictEqual("Data is valid", this.schema.validate(true, "Boolean").toString());
		this.assertStrictEqual("Data is valid", this.schema.validate(false, "Boolean").toString());
		this.assertStrictEqual(
			"Data is invalid. First error:\n" +
			"(root): boolean expected",
			this.schema.validate(0, "Boolean").toString());
		this.assertStrictEqual(
			"Data is invalid. First error:\n" +
			"(root): boolean expected",
			this.schema.validate(null, "Boolean").toString());
		this.assertStrictEqual(
			"Data is invalid. First error:\n" +
			"(root): boolean expected",
			this.schema.validate("", "Boolean").toString());
		this.assertStrictEqual(
			"Data is invalid. First error:\n" +
			"(root): boolean expected",
			this.schema.validate({}, "Boolean").toString());
		this.assertStrictEqual(
			"Data is invalid. First error:\n" +
			"(root): boolean expected",
			this.schema.validate([], "Boolean").toString());
	},
	
	testDefined: function() {
		this.assertStrictEqual("Data is valid", this.schema.validate(0, "Defined").toString());
		this.assertStrictEqual("Data is valid", this.schema.validate(false, "Defined").toString());
		this.assertStrictEqual("Data is valid", this.schema.validate(null, "Defined").toString());
		this.assertStrictEqual("Data is valid", this.schema.validate("", "Defined").toString());
		this.assertStrictEqual("Data is valid", this.schema.validate({}, "Defined").toString());
		this.assertStrictEqual("Data is valid", this.schema.validate([], "Defined").toString());
		this.assertStrictEqual(
			"Data is invalid. First error:\n" +
			"(root): not undefined expected",
			this.schema.validate(undefined, "Defined").toString());
	},
	
	testDictionary: function() {
		this.schema.registerClass({
			"provider": "Dictionary",
			"item": "Int"
		}, "MyDict");
		
		this.assertStrictEqual("Data is valid", this.schema.validate({}, "MyDict").toString());
		this.assertStrictEqual("Data is valid", this.schema.validate({a: 0, b: 1, c: 2}, "MyDict").toString());
		this.assertStrictEqual(
			"Data is invalid. First error:\n" +
			"(root): object expected",
			this.schema.validate(0, "MyDict").toString());
		this.assertStrictEqual(
			"Data is invalid. First error:\n" +
			"(root): object expected",
			this.schema.validate(null, "MyDict").toString());
		this.assertStrictEqual(
			"Data is invalid. First error:\n" +
			"(root): object expected",
			this.schema.validate("", "MyDict").toString());
		this.assertStrictEqual(
			"Data is invalid. First error:\n" +
			"(root): object expected",
			this.schema.validate([], "MyDict").toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"a: number expected\n" +
			"c: integer expected",
			this.schema.validate({a: null, b: 1, c: .5}, "MyDict", true).toString());
	},
	
	testEnum: function() {
		this.schema.registerClass({
			"provider": "Enum",
			"values": ["a", 1]
		}, "MyEnum");
		
		this.assertStrictEqual("Data is valid", this.schema.validate("a", "MyEnum").toString());
		this.assertStrictEqual("Data is valid", this.schema.validate(1, "MyEnum").toString());
		this.assertStrictEqual(
			"Data is invalid. First error:\n" +
			"(root): value is not an element of enumeration",
			this.schema.validate(0, "MyEnum").toString());
		this.assertStrictEqual(
			"Data is invalid. First error:\n" +
			"(root): value is not an element of enumeration",
			this.schema.validate(null, "MyEnum").toString());
		this.assertStrictEqual(
			"Data is invalid. First error:\n" +
			"(root): value is not an element of enumeration",
			this.schema.validate("", "MyEnum").toString());
		this.assertStrictEqual(
			"Data is invalid. First error:\n" +
			"(root): value is not an element of enumeration",
			this.schema.validate([], "MyEnum").toString());
		this.assertStrictEqual(
			"Data is invalid. First error:\n" +
			"(root): value is not an element of enumeration",
			this.schema.validate({}, "MyEnum").toString());
		this.assertStrictEqual(
			"Data is invalid. First error:\n" +
			"(root): value is not an element of enumeration",
			this.schema.validate([1], "MyEnum").toString());
	},
	
	testFixedArray: function() {
		this.schema.registerClass({
			"provider": "FixedArray",
			"items": ["Positive", "Int"]
		}, "MyArray");
		
		this.assertStrictEqual("Data is valid", this.schema.validate([.5, -1], "MyArray").toString());
		this.assertStrictEqual(
			"Data is invalid. First error:\n" +
			"(root): array expected",
			this.schema.validate(0, "MyArray").toString());
		this.assertStrictEqual(
			"Data is invalid. First error:\n" +
			"(root): array expected",
			this.schema.validate(null, "MyArray").toString());
		this.assertStrictEqual(
			"Data is invalid. First error:\n" +
			"(root): array expected",
			this.schema.validate("", "MyArray").toString());
		this.assertStrictEqual(
			"Data is invalid. First error:\n" +
			"(root): array expected",
			this.schema.validate({}, "MyArray").toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"(root): array length of 2 expected",
			this.schema.validate([], "MyArray", true).toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"(root): array length of 2 expected",
			this.schema.validate([.5, -1, 0], "MyArray", true).toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"[0]: must be more than 0",
			this.schema.validate([-1, -1], "MyArray", true).toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"[1]: integer expected",
			this.schema.validate([.5, .5], "MyArray", true).toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"[0]: must be more than 0\n" +
			"[1]: integer expected",
			this.schema.validate([-1, .5], "MyArray", true).toString());
	},
	
	testNull: function() {
		this.assertStrictEqual("Data is valid", this.schema.validate(null, "Null").toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"(root): null expected",
			this.schema.validate(0, "Null", true).toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"(root): null expected",
			this.schema.validate(false, "Null", true).toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"(root): null expected",
			this.schema.validate("", "Null", true).toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"(root): null expected",
			this.schema.validate({}, "Null", true).toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"(root): null expected",
			this.schema.validate([], "Null", true).toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"(root): null expected",
			this.schema.validate(undefined, "Null", true).toString());
	},
	
	testNumber: function() {
		this.assertStrictEqual("Data is valid", this.schema.validate(0, "Number").toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"(root): number expected",
			this.schema.validate(false, "Number", true).toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"(root): number expected",
			this.schema.validate("", "Number", true).toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"(root): number expected",
			this.schema.validate({}, "Number", true).toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"(root): number expected",
			this.schema.validate([], "Number", true).toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"(root): number expected",
			this.schema.validate(undefined, "Number", true).toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"(root): number expected",
			this.schema.validate(null, "Number", true).toString());
	},
	
	testInt: function() {
		this.assertStrictEqual("Data is valid", this.schema.validate(0, "Int").toString());
		this.assertStrictEqual("Data is valid", this.schema.validate(1, "Int").toString());
		this.assertStrictEqual("Data is valid", this.schema.validate(-1, "Int").toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"(root): number expected",
			this.schema.validate(false, "Int", true).toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"(root): number expected",
			this.schema.validate(null, "Int", true).toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"(root): integer expected",
			this.schema.validate(.5, "Int", true).toString());
	},
	
	testPart: function() {
		this.assertStrictEqual("Data is valid", this.schema.validate(0, "Part").toString());
		this.assertStrictEqual("Data is valid", this.schema.validate(.5, "Part").toString());
		this.assertStrictEqual("Data is valid", this.schema.validate(1, "Part").toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"(root): number expected",
			this.schema.validate(false, "Part", true).toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"(root): number expected",
			this.schema.validate(null, "Part", true).toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"(root): must be minimum of 0",
			this.schema.validate(-.5, "Part", true).toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"(root): must be minimum of 0",
			this.schema.validate(-1, "Part", true).toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"(root): must be maximum of 1",
			this.schema.validate(1.5, "Part", true).toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"(root): must be maximum of 1",
			this.schema.validate(2, "Part", true).toString());
	},
	
	testPercent: function() {
		this.assertStrictEqual("Data is valid", this.schema.validate(0, "Percent").toString());
		this.assertStrictEqual("Data is valid", this.schema.validate(.5, "Percent").toString());
		this.assertStrictEqual("Data is valid", this.schema.validate(100, "Percent").toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"(root): number expected",
			this.schema.validate(false, "Percent", true).toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"(root): number expected",
			this.schema.validate(null, "Percent", true).toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"(root): must be minimum of 0",
			this.schema.validate(-1, "Percent", true).toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"(root): must be maximum of 100",
			this.schema.validate(101, "Percent", true).toString());
	},
	
	testPositive: function() {
		this.assertStrictEqual("Data is valid", this.schema.validate(.5, "Positive").toString());
		this.assertStrictEqual("Data is valid", this.schema.validate(1, "Positive").toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"(root): number expected",
			this.schema.validate(false, "Positive", true).toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"(root): number expected",
			this.schema.validate(null, "Positive", true).toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"(root): must be more than 0",
			this.schema.validate(0, "Positive", true).toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"(root): must be more than 0",
			this.schema.validate(-1, "Positive", true).toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"(root): must be more than 0",
			this.schema.validate(-.5, "Positive", true).toString());
	},
	
	testPositiveInt: function() {
		this.assertStrictEqual("Data is valid", this.schema.validate(1, "PositiveInt").toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"(root): number expected",
			this.schema.validate(false, "PositiveInt", true).toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"(root): number expected",
			this.schema.validate(null, "PositiveInt", true).toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"(root): must be more than 0",
			this.schema.validate(0, "PositiveInt", true).toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"(root): must be more than 0",
			this.schema.validate(-1, "PositiveInt", true).toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"(root): integer expected",
			this.schema.validate(.5, "PositiveInt", true).toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"(root): integer expected, must be more than 0",
			this.schema.validate(-.5, "PositiveInt", true).toString());
	},
	
	testUnsigned: function() {
		this.assertStrictEqual("Data is valid", this.schema.validate(0, "Unsigned").toString());
		this.assertStrictEqual("Data is valid", this.schema.validate(.5, "Unsigned").toString());
		this.assertStrictEqual("Data is valid", this.schema.validate(1, "Unsigned").toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"(root): number expected",
			this.schema.validate(false, "Unsigned", true).toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"(root): number expected",
			this.schema.validate(null, "Unsigned", true).toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"(root): must be minimum of 0",
			this.schema.validate(-1, "Unsigned", true).toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"(root): must be minimum of 0",
			this.schema.validate(-.5, "Unsigned", true).toString());
	},
	
	testUnsignedInt: function() {
		this.assertStrictEqual("Data is valid", this.schema.validate(0, "UnsignedInt").toString());
		this.assertStrictEqual("Data is valid", this.schema.validate(1, "UnsignedInt").toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"(root): number expected",
			this.schema.validate(false, "UnsignedInt", true).toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"(root): number expected",
			this.schema.validate(null, "UnsignedInt", true).toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"(root): must be minimum of 0",
			this.schema.validate(-1, "UnsignedInt", true).toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"(root): integer expected",
			this.schema.validate(.5, "UnsignedInt", true).toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"(root): integer expected, must be minimum of 0",
			this.schema.validate(-.5, "UnsignedInt", true).toString());
	},
	
	testObject: function() {
		this.schema.registerClass({
			"provider": "Object",
			"fields": {
				"a": "Positive",
				"b": "Int"
			}
		}, "MyObject");
		
		this.assertStrictEqual("Data is valid", this.schema.validate({a: .5, b: -1}, "MyObject").toString());
		this.assertStrictEqual(
			"Data is invalid. First error:\n" +
			"(root): object expected",
			this.schema.validate(0, "MyObject").toString());
		this.assertStrictEqual(
			"Data is invalid. First error:\n" +
			"(root): object expected",
			this.schema.validate(null, "MyObject").toString());
		this.assertStrictEqual(
			"Data is invalid. First error:\n" +
			"(root): object expected",
			this.schema.validate("", "MyObject").toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"(root): object expected",
			this.schema.validate([], "MyObject", true).toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"a: number expected\n" +
			"b: number expected",
			this.schema.validate({}, "MyObject", true).toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"a: must be more than 0",
			this.schema.validate({"a": -1, "b": -1}, "MyObject", true).toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"b: integer expected",
			this.schema.validate({"a": .5, "b": .5}, "MyObject", true).toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"a: must be more than 0\n" +
			"b: integer expected",
			this.schema.validate({"a": -1, "b": .5}, "MyObject", true).toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"(root): garbage found: c, garbage found: d",
			this.schema.validate({"a": .5, "b": -1, "c": 0, "d": 0}, "MyObject", true).toString());
	},
	
	testObjectGarbage: function() {
		this.schema.registerClass({
			"provider": "Object",
			"fields": {
				"a": "Positive",
				"b": "Int"
			},
			"garbage": true
		}, "MyObject");
		
		this.assertStrictEqual("Data is valid",
			this.schema.validate({"a": .5, "b": -1, "c": 0, "d": 0}, "MyObject").toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"a: number expected\n" +
			"b: number expected",
			this.schema.validate({}, "MyObject", true).toString());
	},
	
	testObjectInheritance: function() {
		this.schema.registerClass({
			"provider": "Object",
			"fields": {
				"a": "Positive",
				"b": "Boolean"
			},
			"garbage": true
		}, "BaseObject");
		this.schema.registerClass({
			"provider": "Object",
			"base": "BaseObject",
			"fields": {
				"b": "Int",
				"c": "Boolean"
			}
		}, "MyObject");
		
		this.assertStrictEqual("Data is valid", this.schema.validate({a: .5, b: -1, c: false}, "MyObject").toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"(root): object expected",
			this.schema.validate(0, "MyObject", true).toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"(root): object expected",
			this.schema.validate(null, "MyObject", true).toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"(root): object expected",
			this.schema.validate("", "MyObject", true).toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"(root): object expected",
			this.schema.validate([], "MyObject", true).toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"a: number expected\n" +
			"b: number expected\n" +
			"c: boolean expected",
			this.schema.validate({}, "MyObject", true).toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"a: must be more than 0",
			this.schema.validate({"a": -1, "b": -1, "c": true}, "MyObject", true).toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"b: integer expected",
			this.schema.validate({"a": .5, "b": .5, "c": true}, "MyObject", true).toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"c: boolean expected",
			this.schema.validate({"a": .5, "b": -1, "c": 0}, "MyObject", true).toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"a: must be more than 0\n" +
			"b: integer expected\n" +
			"c: boolean expected",
			this.schema.validate({"a": -1, "b": .5, "c": 0}, "MyObject", true).toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"(root): garbage found: d, garbage found: e",
			this.schema.validate({"a": .5, "b": -1, "c": true, "d": 0, "e": 0}, "MyObject", true).toString());
	},
	
	testObjectMultiInheritance: function() {
		this.schema.registerClass({
			"provider": "Object",
			"fields": {
				"a": "Positive"
			}
		}, "Base");
		this.schema.registerClass({
			"provider": "Object",
			"base": "Base",
			"fields": {
				"a": "PositiveInt",
				"b": "Number"
			}
		}, "A");
		this.schema.registerClass({
			"provider": "Object",
			"base": "Base",
			"fields": {
				"b": "String"
			}
		}, "B");
		this.schema.registerClass({
			"provider": "Object",
			"base": ["A", "B"]
		}, "C");
		
		this.assertStrictEqual("Data is valid", this.schema.validate({a: 1, b: "b"}, "C").toString());
		this.assertStrictEqual("Data is valid", this.schema.validate({a: 1.5, b: "b"}, "B").toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"a: integer expected\n" +
			"b: string expected",
			this.schema.validate({a: 1.5, b: 1}, "C", true).toString());
	},
	
	testOr: function() {
		this.schema.registerClass({
			"provider": "Or",
			"items": [
				"Positive",
				"Int"
			]
		}, "MyOr");
		
		this.assertStrictEqual("Data is valid", this.schema.validate(1, "MyOr").toString());
		this.assertStrictEqual("Data is valid", this.schema.validate(0, "MyOr").toString());
		this.assertStrictEqual("Data is valid", this.schema.validate(-1, "MyOr").toString());
		this.assertStrictEqual("Data is valid", this.schema.validate(.5, "MyOr").toString());
		this.assertStrictEqual(
			"Data is invalid. First error:\n" +
			"(root): data doesn't fit any option (see errors below)\n" +
			"(root): --- Option #1 error dump BEGIN ---\n" +
			"(root): must be more than 0\n" +
			"(root): --- Option #1 error dump END ---\n" +
			"(root): --- Option #2 error dump BEGIN ---\n" +
			"(root): integer expected\n" +
			"(root): --- Option #2 error dump END ---",
			this.schema.validate(-.5, "MyOr").toString());
	},
	
	testSet: function() {
		this.assertStrictEqual("Data is valid", this.schema.validate(0, "Set").toString());
		this.assertStrictEqual("Data is valid", this.schema.validate(false, "Set").toString());
		this.assertStrictEqual("Data is valid", this.schema.validate("", "Set").toString());
		this.assertStrictEqual("Data is valid", this.schema.validate({}, "Set").toString());
		this.assertStrictEqual("Data is valid", this.schema.validate([], "Set").toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"(root): not null/undefined expected",
			this.schema.validate(null, "Set", true).toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"(root): not null/undefined expected",
			this.schema.validate(undefined, "Set", true).toString());
	},
	
	testSimple: function() {
		this.assertStrictEqual("Data is valid", this.schema.validate(0, "Simple").toString());
		this.assertStrictEqual("Data is valid", this.schema.validate(false, "Simple").toString());
		this.assertStrictEqual("Data is valid", this.schema.validate("", "Simple").toString());
		this.assertStrictEqual("Data is valid", this.schema.validate(null, "Simple").toString());
		this.assertStrictEqual("Data is valid", this.schema.validate(undefined, "Simple").toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"(root): simple value expected",
			this.schema.validate({}, "Simple", true).toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"(root): simple value expected",
			this.schema.validate([], "Simple", true).toString());
	},
	
	testString: function() {
		this.schema.registerClass({
			"provider": "String",
			"pattern": "\\d{4}-\\d{2}-\\d{2}"
		}, "MyString");
		
		this.assertStrictEqual("Data is valid", this.schema.validate("", "String").toString());
		this.assertStrictEqual("Data is valid", this.schema.validate("blablabla", "String").toString());
		this.assertStrictEqual("Data is valid", this.schema.validate("2103-06-30", "MyString").toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"(root): string expected",
			this.schema.validate(0, "String", true).toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"(root): string expected",
			this.schema.validate(false, "String", true).toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"(root): string expected",
			this.schema.validate(null, "String", true).toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"(root): string expected",
			this.schema.validate(undefined, "String", true).toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"(root): string expected",
			this.schema.validate({}, "String", true).toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"(root): string expected",
			this.schema.validate([], "String", true).toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"(root): string doesn't match pattern",
			this.schema.validate("", "MyString", true).toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"(root): string doesn't match pattern",
			this.schema.validate("blablabla", "MyString", true).toString());
	},
	
	testTypedObject: function() {
		this.schema.parse({
			"classes": {
				"Transport": {
					"provider": "Object",
					"fields": {
						"type": "String",
						"brand": "String"
					}
				},
				"AutoMobile": {
					"provider": "Object",
					"base": "Transport",
					"fields": {
						"wheels": "PositiveInt"
					}
				},
				"HardTruck": {
					"provider": "Object",
					"base": "AutoMobile",
					"fields": {
						"cargoWeight": "Positive"
					}
				},
				"GenericTransport": {
					"provider": "TypedObject",
					"options": {
						"AUTO_MOBILE": "AutoMobile",
						"HARD_TRUCK": "HardTruck",
						"AIR_CRAFT": {
							"provider": "Object",
							"base": "Transport",
							"fields": {
								"wings": "PositiveInt"
							}
						}
					}
				}
			}
		});
		
		this.assertStrictEqual("Data is valid", this.schema.validate({
			"type": "AUTO_MOBILE",
			"brand": "Toyota",
			"wheels": 4
		}, "GenericTransport").toString());
		this.assertStrictEqual("Data is valid", this.schema.validate({
			"type": "HARD_TRUCK",
			"brand": "Daf",
			"wheels": 6,
			"cargoWeight": 18800
		}, "GenericTransport").toString());
		this.assertStrictEqual("Data is valid", this.schema.validate({
			"type": "AIR_CRAFT",
			"brand": "Airbus",
			"wings": 2
		}, "GenericTransport").toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"(root): object expected",
			this.schema.validate(0, "GenericTransport", true).toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"(root): object has non-string type",
			this.schema.validate({}, "GenericTransport", true).toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"(root): object has invalid type 'UNKNOWN'",
			this.schema.validate({ type: "UNKNOWN" }, "GenericTransport", true).toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"brand: string expected\n" +
			"wheels: number expected",
			this.schema.validate({ type: "AUTO_MOBILE" }, "GenericTransport", true).toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"brand: string expected\n" +
			"wheels: number expected\n" +
			"cargoWeight: number expected",
			this.schema.validate({ type: "HARD_TRUCK" }, "GenericTransport", true).toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"brand: string expected\n" +
			"wings: number expected",
			this.schema.validate({ type: "AIR_CRAFT" }, "GenericTransport", true).toString());
	},
	
	testUndefined: function() {
		this.assertStrictEqual("Data is valid", this.schema.validate(undefined, "Undefined").toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"(root): undefined expected",
			this.schema.validate(0, "Undefined", true).toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"(root): undefined expected",
			this.schema.validate(false, "Undefined", true).toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"(root): undefined expected",
			this.schema.validate("", "Undefined", true).toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"(root): undefined expected",
			this.schema.validate(null, "Undefined", true).toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"(root): undefined expected",
			this.schema.validate({}, "Undefined", true).toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"(root): undefined expected",
			this.schema.validate([], "Undefined", true).toString());
	},
	
	testUnset: function() {
		this.assertStrictEqual("Data is valid", this.schema.validate(null, "Unset").toString());
		this.assertStrictEqual("Data is valid", this.schema.validate(undefined, "Unset").toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"(root): null/undefined expected",
			this.schema.validate(0, "Unset", true).toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"(root): null/undefined expected",
			this.schema.validate(false, "Unset", true).toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"(root): null/undefined expected",
			this.schema.validate("", "Unset", true).toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"(root): null/undefined expected",
			this.schema.validate({}, "Unset", true).toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"(root): null/undefined expected",
			this.schema.validate([], "Unset", true).toString());
	},
	
	testValue: function() {
		this.schema.registerClass({
			"provider": "Value",
			"value": 0
		}, "MyValue");
		
		this.assertStrictEqual("Data is valid", this.schema.validate(0, "MyValue").toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"(root): illegal value",
			this.schema.validate(false, "MyValue", true).toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"(root): illegal value",
			this.schema.validate("", "MyValue", true).toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"(root): illegal value",
			this.schema.validate(null, "MyValue", true).toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"(root): illegal value",
			this.schema.validate(undefined, "MyValue", true).toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"(root): illegal value",
			this.schema.validate({}, "MyValue", true).toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"(root): illegal value",
			this.schema.validate([], "MyValue", true).toString());
	},
	
	testWrapper: function() {
		this.assertStrictEqual("Data is valid", this.schema.validate(0, "Number,allowNull").toString());
		this.assertStrictEqual("Data is valid", this.schema.validate(0, "Number,allowUndefined").toString());
		this.assertStrictEqual("Data is valid", this.schema.validate(0, "Number,optional").toString());
		this.assertStrictEqual("Data is valid", this.schema.validate(null, "Number,allowNull").toString());
		this.assertStrictEqual("Data is valid", this.schema.validate(undefined, "Number,allowUndefined").toString());
		this.assertStrictEqual("Data is valid", this.schema.validate(null, "Number,optional").toString());
		this.assertStrictEqual("Data is valid", this.schema.validate(undefined, "Number,optional").toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"(root): number expected",
			this.schema.validate(false, "Number,allowNull", true).toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"(root): number expected",
			this.schema.validate("", "Number,allowNull", true).toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"(root): number expected",
			this.schema.validate({}, "Number,allowNull", true).toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"(root): number expected",
			this.schema.validate([], "Number,allowNull", true).toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"(root): number expected",
			this.schema.validate(undefined, "Number,allowNull", true).toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"(root): number expected",
			this.schema.validate(null, "Number,allowUndefined", true).toString());
	}
});
