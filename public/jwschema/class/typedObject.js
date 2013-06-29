/*
	JW Schema typed object validation class.
	
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

JW.Schema.Class.TypedObject = function(config) {
	JW.Schema.Class.TypedObject._super.call(this, config);
	config = config || {};
	this.options = JW.apply({}, config.options);
	this.key = JW.defn(config.key, this.key);
};

JW.extend(JW.Schema.Class.TypedObject, JW.Schema.Class, {
	/*
	Map options; // optional
	String key; // optional
	*/
	
	key: "type",
	
	_validateData: function(data, validation) {
		if (!JW.isObject(data)) {
			return validation.addError("object expected");
		}
		var type = data[this.key];
		if (typeof type !== "string") {
			return validation.addError("object has non-string type");
		}
		var schema = validation.schema;
		var option = schema.compileClass(this.options[type]);
		this.options[type] = option;
		if (!option) {
			return validation.addError("object has invalid type '" + type + "'");
		}
		return schema._validate(option, data, validation);
	}
});
