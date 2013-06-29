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
	}
});
