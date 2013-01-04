/*
	JW Schema validation class.
	
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
	
	----
	
	Every validation function has next interface:
	
	function(data:*, validation:JW.Schema.Validation)
	
	If error is found, then you must call validation.addError.
	
	It is guaranteed that if validation.full is false and result is already
	containing a error, the validation function won't be called.
	
	You can call schema._validate method for children. You should do
	return immediately if this method returned true (equivalient: check
	validation.isStopped()).
*/

JW.Schema.Class = JW.Class.extend({
	type            : "Any",    // [optional] String
	
	validators      : null,     // [optional] Array of Function(data, validation), custom validation functions (AND-joined)
	optional        : false,    // [optional] Boolean, null or undefined is allowed
	allowNull       : false,    // [optional] Boolean, null is allowed
	allowUndefined  : false,    // [optional] Boolean, undefined is allowed
	
	schema          : null,     // [readonly] JW.Schema, set by JW.Schema instance on class registration
	
	init: function(config)
	{
		JW.apply(this, config);
		
		this.validators = JW.makeArray(this.validators);
	},
	
	// virtual
	onRegister: function(schema)
	{
	},
	
	// TODO: return list of pathes (full log like for validation)
	find: function(type, data)
	{
		return (this.type === type) ? [ data ] : [];
	},
	
	validate: function(data, full)
	{
		var validation = new JW.Schema.Validation(data, full);
		this._validate(data, validation);
		return validation;
	},
	
	// virtual
	_validateData: function(data, validation)
	{
	},
	
	_validate: function(data, validation, key)
	{
		if (this._skip(data, this))
			return false;
		
		validation.push(data, key);
		this._runValidate(validation);
		validation.pop();
		
		return validation.isStopped();
	},
	
	_runValidate: function(validation)
	{
		return  this._callValidate(validation, this._validateData) ||
				//this.base.some(this.schema._runValidate.as(this.schema, '\0', validation)) ||
				this.validators.some(this._callValidate.as(this, validation, '\0'));
	},
	
	_callValidate: function(validation, callback, scope)
	{
		callback.call(scope || this, validation.getCurrentData(), validation);
		return validation.isStopped();
	},
	
	_skip: function(data, config)
	{
		return  (config.optional && !JW.isSet(data)) ||
				(config.allowNull && data === null) ||
				(config.allowUndefined && !JW.isDefined(data));
	}
});
