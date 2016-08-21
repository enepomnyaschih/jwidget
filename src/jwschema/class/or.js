/*
	JW Schema "or" validation class.
	
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
