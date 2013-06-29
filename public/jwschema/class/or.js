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
	this.items = JW.makeArray(config.items);
};

JW.extend(JW.Schema.Class.Or, JW.Schema.Class, {
	/*
	Array items;
	*/
	
	_validateData: function(data, validation) {
		var errors = this._validateOptions(data, validation);
		if (errors) {
			this._flushErrors(data, validation, errors);
		}
	},
	
	_validateOptions: function(data, validation) {
		var errors = [];
		var schema = validation.schema;
		var items = this.items;
		for (var i = 0, l = items.length; i < l; ++i) {
			var item = schema.compileClass(items[i]);
			items[i] = item;
			validation.saveErrors();
			schema._validate(item, data, validation);
			var newErrors = validation.resetErrors();
			errors.push(newErrors);
			if (newErrors.length === 0) {
				return null;
			}
		}
		return errors;
	},
	
	_flushErrors: function(data, validation, errors) {
		var schema = validation.schema;
		var items = this.items;
		validation.addError("data doesn't fit any item (see errors below)");
		for (var i = 0; i < items.length; ++i) {
			var beginError = new JW.Schema.Error(data, JW.Array.top(validation.items).path.concat());
			beginError.addMessage("--- Option #" + i + " error dump BEGIN ---");
			
			var endError = new JW.Schema.Error(data, JW.Array.top(validation.items).path.concat());
			endError.addMessage("--- Option #" + i + " error dump END ---");
			
			validation.errors.push(beginError);
			JW.Array.addAll(validation.errors, errors[i]);
			validation.errors.push(endError);
		}
	}
});
