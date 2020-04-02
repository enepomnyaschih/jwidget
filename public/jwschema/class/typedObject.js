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

JW.Schema.Class.TypedObject = JW.Schema.Class.extend({
	type    : "TypedObject",
	
	options : null,     // [required] Map from (String or Number) to String
	key     : "type",   // [optional] String
	
	init: function(config)
	{
		this._super(config);
		this.options = JW.apply({}, this.options);
	},
	
	onRegister: function(schema)
	{
		for (var key in this.options)
			this.options[key] = schema._parseClass(this.options[key]);
	},
	
	_validateData: function(data, validation)
	{
		if (!JW.isObject(data))
			return validation.addError("object expected");
		
		var type = data[this.key];
		if (typeof type !== "string")
			return validation.addError("object has non-string type");
		
		var option = this.options[type];
		if (!option)
			return validation.addError("object has invalid type '" + type + "'");
		
		return this.schema._validate(option, data, validation);
	}
});
