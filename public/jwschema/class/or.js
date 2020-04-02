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

JW.Schema.Class.Or = JW.Schema.Class.extend({
	type    : "Or",
	
	items   : null,     // [required] Array of String
	
	init: function(config)
	{
		this._super(config);
		this.items = JW.makeArray(this.items).concat();
	},
	
	onRegister: function(schema)
	{
		for (var i = 0; i < this.items.length; ++i)
			this.items[i] = schema._parseClass(this.items[i]);
	},
	
	_validateData: function(data, validation)
	{
		var errors = [];
		if (this.items.every(this._validateItem.as(this, '\0', errors, data, validation)))
		{
			validation.addError("data doesn't fit any item (see errors below)");
			for (var i = 0; i < this.items.length; ++i)
			{
				var itemType = this.schema.getClass(this.items[i]).type || ("Option #" + i);
				
				var beginError = new JW.Schema.Error(data, validation.items.top().path.concat());
				beginError.addMessage("--- " + itemType + " error dump BEGIN ---");
				
				var endError = new JW.Schema.Error(data, validation.items.top().path.concat());
				endError.addMessage("--- " + itemType + " error dump END ---");
				
				validation.errors.push(beginError);
				validation.errors.pushAll(errors[i]);
				validation.errors.push(endError);
			}
		}
	},
	
	_validateItem: function(item, errors, data, validation)
	{
		validation.saveErrors();
		this.schema._validate(item, data, validation);
		var newErrors = validation.resetErrors();
		errors.push(newErrors);
		return newErrors.length;
	}
});
