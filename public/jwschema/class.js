﻿/*
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
