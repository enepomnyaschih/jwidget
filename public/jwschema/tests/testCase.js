/*
MIT License

Copyright (c) 2020 Egor Nepomnyaschih

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
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
