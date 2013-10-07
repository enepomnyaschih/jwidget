/*
	JW Schema dictionary validation class.
	
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

JW.Schema.Class.Dictionary = function(config) {
	JW.Schema.Class.Dictionary._super.call(this, config);
	config = config || {};
	this.item = JW.defn(config.item, this.item);
};

JW.extend(JW.Schema.Class.Dictionary, JW.Schema.Class, {
	/*
	dynamic item;
	*/
	
	item: "Any",
	key: "Any",
	
	_validateData: function(data, validation) {
		if (!JW.isObject(data)) {
			return validation.addError("object expected");
		}
		var schema = validation.schema;
		var keyCls = schema.compileClass(this.key);
		this.key = keyCls;
		var itemCls = schema.compileClass(this.item);
		this.item = itemCls;
		for (var key in data) {
			if (schema._validate(keyCls, key, validation) || schema._validate(itemCls, data[key], validation, key)) {
				return;
			}
		}
	}
});
