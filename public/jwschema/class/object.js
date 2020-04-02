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

JW.Schema.Class.Object = JW.Schema.Class.extend({
	type    : "Object",
	
	fields  : null,     // [optional] Map from String to JW.Schema.Class
	base    : null,     // [optional] Array of String
	garbage : false,    // [optional] Boolean, unexpected fields are allowed
	
	_fields : null,     // [readonly] Map from String to JW.Schema.Class
	
	init: function(config)
	{
		this._super(config);
		
		this.fields = JW.apply({}, this.fields);
		this.base = JW.makeArray(this.base).concat();
	},
	
	onRegister: function(schema)
	{
		for (var i = 0; i < this.base.length; ++i)
			this.base[i] = schema._parseClass(this.base[i]);
		
		for (var key in this.fields)
			this.fields[key] = schema._parseClass(this.fields[key]);
	},
	
	_validateData: function(data, validation)
	{
		if (!JW.isObject(data))
			return validation.addError("object expected");
		
		this._prepareFields();
		
		for (var key in this._fields)
		{
			var item  = this._fields[key];
			var child = data[key];
			
			if (this._skip(child, item))
				continue;
			
			if (this.schema._validate(item, child, validation, key))
				return;
		}
		
		if (this.garbage)
			return;
		
		for (var key in data)
		{
			if (!this._fields[key] && validation.addError("garbage found: " + key))
				return;
		}
	},
	
	_prepareFields: function()
	{
		if (this._fields)
			return;
		
		this._fields = {};
		for (var i = 0; i < this.base.length; ++i)
		{
			var base = this.schema.getClass(this.base[i]);
			base._prepareFields();
			JW.apply(this._fields, base._fields);
		}
		
		JW.apply(this._fields, this.fields);
	}
});
