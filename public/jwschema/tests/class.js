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
		this.schema.parseClass({
			"provider": "And",
			"items": [
				"Positive",
				"Int"
			]
		}, "MyAnd");
		
		this.assertStrictEqual("Data is valid", this.schema.validate("MyAnd", 1).toString());
		this.assertStrictEqual(
			"Data is invalid. First error:\n" +
			"(root): must be more than 0",
			this.schema.validate("MyAnd", 0).toString());
		this.assertStrictEqual(
			"Data is invalid. First error:\n" +
			"(root): integer expected",
			this.schema.validate("MyAnd", .5).toString());
		this.assertStrictEqual(
			"Data is invalid. Full errors list:\n" +
			"(root): must be more than 0\n" +
			"(root): integer expected",
			this.schema.validate("MyAnd", -.5, true).toString());
	}
});
