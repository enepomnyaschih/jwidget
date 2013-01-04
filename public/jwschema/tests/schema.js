/*
	JW Schema validation engine tests.
	
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

JW.ns("JW.Tests.Schema");

JW.Tests.Schema.SchemaTestCase = JW.Schema.TestCase.extend({
	testSchemaSource: function()
	{
		this.assertValid(JW.Schema.schemaSource, "Schema", false, JW.Schema.schema);
	},
	
	testSchema: function()
	{
		this.assertValidUrl("/schema/schema.json", "Schema", false, JW.Schema.schema);
	},
	
	testSchema2: function()
	{
		this.assertValidUrl("/schema/schema2.json", "Schema", false, JW.Schema.schema);
	}
});
