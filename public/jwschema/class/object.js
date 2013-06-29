/*
	JW Schema object validation class.
	
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

JW.Schema.Class.Object = function(config) {
	JW.Schema.Class.Object._super.call(this, config);
	config = config || {};
	this.fields = JW.apply({}, config.fields);
	this.base = JW.makeArray(config.base);
	this.garbage = JW.defn(config.garbage, this.garbage);
};

JW.extend(JW.Schema.Class.Object, JW.Schema.Class, {
	/*
	Map<JW.Schema.Class> fields;
	Array<String> base;
	Boolean garbage;
	*/
	
	garbage: false,
	
	_validateData: function(data, validation) {
		if (!JW.isObject(data)) {
			return validation.addError("object expected");
		}
		var schema = validation.schema;
		var fields = this._prepareFields(schema);
		for (var key in fields) {
			var field = schema.compileClass(fields[key]);
			fields[key] = field;
			var child = data[key];
			if (schema._validate(field, child, validation, key)) {
				return;
			}
		}
		if (this.garbage) {
			return;
		}
		for (var key in data) {
			if (!fields[key] && validation.addError("garbage found: " + key)) {
				return;
			}
		}
	},
	
	_prepareFields: function(schema) {
		var fields = {};
		var base = this.base;
		for (var i = 0, l = base.length; i < l; ++i) {
			var cls = schema.compileClass(base[i]);
			if (!(cls instanceof JW.Schema.Class.Object)) {
				throw new Error("Base JW.Schema class '" + base[i] + "' must be an instance 'Object' provider.");
			}
			base[i] = cls;
			JW.apply(fields, cls._prepareFields(schema));
		}
		JW.apply(fields, this.fields);
		return fields;
	}
});
