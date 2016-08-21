/*
	JW Schema base test case.
	
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

JW.Schema.TestCase = JW.Unit.TestCase.extend({
	schemaUrl   : null,     // [required] String, URL of folder containing JW.Schema and data JSON-files
	schema      : null,     // [readonly] JW.Schema
	
	setupAll: function()
	{
		if (JW.Schema.schema)
			this._loadThisSchema();
		else
			this._loadMainSchema();
	},
	
	assertValid: function(data, type, full, schema)
	{
		type = type || "Root";
		schema = schema || this.schema;
		
		var result = schema.validate(type, data, full);
		if (!result.isValid())
			this.fail(result.toString());
	},
	
	assertInvalid: function(data, type, full, errors, schema)
	{
		type = type || "Root";
		schema = schema || this.schema;
		
		var result = schema.validate(type, data, full);
		if (result.isValid())
			this.fail(result.toString());
		
		if (errors)
			this.assertEqual(errors, result.toString());
	},
	
	assertValidUrl: function(url, type, full, schema)
	{
		this.load(url, "json", this.assertValid.as(this, '\0', type, full, schema), this);
	},
	
	assertInvalidUrl: function(url, type, full, errors, schema)
	{
		this.load(url, "json", this.assertInvalid.as(this, '\0', type, full, errors, schema), this);
	},
	
	assertValidName: function(name, type, full, schema)
	{
		this.assertValidUrl(this.schemaUrl + "/" + name + ".json", type, full, schema);
	},
	
	assertInvalidName: function(name, type, full, errors, schema)
	{
		this.assertInvalidUrl(this.schemaUrl + "/" + name + ".json", type, full, errors, schema);
	},
	
	_loadMainSchema: function()
	{
		this.load("/schema/schema.json", "json", this._onMainSchemaLoaded, this);
	},
	
	_loadThisSchema: function()
	{
		if (!this.schemaUrl)
			return;
		
		this.load(this.schemaUrl + "/schema.json", "json", this._onThisSchemaLoaded, this);
	},
	
	_onMainSchemaLoaded: function(response)
	{
		JW.Schema.schemaSource = response;
		JW.Schema.schema = new JW.Schema(response);
		this._loadThisSchema();
	},
	
	_onThisSchemaLoaded: function(response)
	{
		var result = JW.Schema.schema.validate("Schema", response);
		if (!result.isValid())
		{
			var message = this.schemaUrl + "/schema.json is not JW.Schema";
			console.log(message);
			console.log(result.toString());
			this.fail(message);
		}
		
		this.schema = new JW.Schema(response);
	}
});
