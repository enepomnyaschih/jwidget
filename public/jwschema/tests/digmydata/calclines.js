/*
	JW Schema validation test (one of many).
	
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

JW.ns("JW.Tests.Schema.DigMyData");

JW.Tests.Schema.DigMyData.CalcLinesTestCase = JW.Schema.TestCase.extend({
	schemaUrl: "/tests/schema/digmydata/calclines",
	
	testValid: function()
	{
		this.assertValidName("valid");
	},
	
	testInvalid: function()
	{
		this.assertInvalidName("invalid", null, true, [
			"Data is invalid. Full errors list:",
			"calclines.0.id: integer expected",
			"calclines.0.title: string expected",
			"calclines.0.format: value is not an element of enumeration",
			"calclines.0.definition: string expected",
			"calclines.0.valid: boolean expected",
			"calclines.1.id: must be more than 0",
			"calclines.1.title: string expected",
			"calclines.1.definition: string expected",
			"calclines.1.valid: boolean expected",
			"calclines.1: garbage found: valud"
		].join("\n"));
	}
});
