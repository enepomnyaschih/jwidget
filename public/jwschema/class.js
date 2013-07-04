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

JW.Schema.Class = function(config) {
	JW.Schema.Class._super.call(this);
	config = config || {};
	this.type = config.type || this.type;
	this.validators = JW.makeArray(config.validators);
	this.optional = JW.defn(config.optional, this.optional);
	this.allowNull = JW.defn(config.allowNull, this.allowNull);
	this.allowUndefined = JW.defn(config.allowUndefined, this.allowUndefined);
	this.schema = null;
};

JW.extend(JW.Schema.Class, JW.Class, {
	/*
	String type; // optional
	Array<Boolean(Any, JW.Schema.Validation)> validators; // optional
	Boolean optional; // optional
	Boolean allowNull; // optional
	Boolean allowUndefined; // optional
	JW.Schema schema;
	*/
	
	type           : "Any",
	optional       : false,
	allowNull      : false,
	allowUndefined : false,
	
	onRegister: function(schema) {},
	
	// TODO: return list of pathes (full log like for validation)
	find: function(type, data) {
		return (this.type === type) ? [ data ] : [];
	},
	
	validate: function(data, full) {
		var validation = new JW.Schema.Validation(data, full);
		this._validate(data, validation);
		return validation;
	},
	
	_validateData: function(data, validation) {},
	
	_validate: function(data, validation, key) {
		if (this._skip(data, this)) {
			return false;
		}
		validation.push(data, key);
		this._runValidate(validation);
		validation.pop();
		return validation.isStopped();
	},
	
	_runValidate: function(validation) {
		return this._callValidate(validation, this._validateData) ||
		       //this.base.some(this.schema._runValidate.as(this.schema, '\0', validation)) ||
		       JW.Array.some(this.validators, function(validator) { return this._callValidate(validation, validator); }, this);
	},
	
	_callValidate: function(validation, callback, scope) {
		callback.call(scope || this, validation.getCurrentData(), validation);
		return validation.isStopped();
	},
	
	_skip: function(data, config) {
		return (config.optional && !JW.isSet(data)) ||
		       (config.allowNull && data === null) ||
		       (config.allowUndefined && !JW.isDefined(data));
	}
});
