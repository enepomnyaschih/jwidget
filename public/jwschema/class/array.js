/*
	JW Schema array validation class.
	
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

JW.Schema.Class.Array = function(config) {
	JW.Schema.Class.Array._super.call(this, config);
	config = config || {};
	this.item = JW.defn(config.item, this.item);
	this.length = JW.defn(config.length, this.length);
};

JW.extend(JW.Schema.Class.Array, JW.Schema.Class, {
	/*
	dynamic item; // optional
	Integer length;
	*/
	
	item: "Any",
	length: null,
	
	_validateData: function(data, validation) {
		if (!JW.isArray(data)) {
			return validation.addError("array expected");
		}
		if (JW.isSet(this.length) && (data.length !== this.length)) {
			if (validation.addError("array length of " + this.length + " expected, " + data.length + " got")) {
				return;
			}
		}
		var schema = validation.schema;
		var item = schema.compileClass(this.item);
		this.item = item;
		for (var i = 0, l = data.length; i < l; ++i) {
			if (schema._validate(item, data[i], validation, i)) {
				return;
			}
		}
	}
});
