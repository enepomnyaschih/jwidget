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

JW.Schema.Class.Or = function(config) {
	JW.Schema.Class.Or._super.call(this, config);
	config = config || {};
	this.items = JW.makeArray(config.items).concat();
};

JW.extend(JW.Schema.Class.Or, JW.Schema.Class, {
	/*
	Array<String> items;
	*/
	
	type: "Or",
	
	onRegister: function(schema)
	{
		for (var i = 0; i < this.items.length; ++i)
			this.items[i] = schema._parseClass(this.items[i]);
	},
	
	_validateData: function(data, validation)
	{
		var errors = [];
		if (JW.Array.every(this.items, function(item) { return this._validateItem(item, errors, data, validation); }, this))
		{
			validation.addError("data doesn't fit any item (see errors below)");
			for (var i = 0; i < this.items.length; ++i)
			{
				var itemType = this.schema.getClass(this.items[i]).type || ("Option #" + i);
				
				var beginError = new JW.Schema.Error(data, JW.Array.top(validation.items).path.concat());
				beginError.addMessage("--- " + itemType + " error dump BEGIN ---");
				
				var endError = new JW.Schema.Error(data, JW.Array.top(validation.items).path.concat());
				endError.addMessage("--- " + itemType + " error dump END ---");
				
				validation.errors.push(beginError);
				JW.Array.addAll(validation.errors, errors[i]);
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
		return newErrors.length !== 0;
	}
});
