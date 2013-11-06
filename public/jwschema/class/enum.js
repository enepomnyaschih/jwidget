﻿/*
	JW Schema enumeration validation class.
	
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

JW.Schema.Class.Enum = function(config) {
	JW.Schema.Class.Enum._super.call(this, config);
	config = config || {};
	this.values = JW.makeArray(config.values);
};

JW.extend(JW.Schema.Class.Enum, JW.Schema.Class, {
	/*
	Array values;
	*/
	
	// override
	_validateData: function(data, validation) {
		(JW.Array.indexOf(this.values, data) === -1) && validation.addError("value is not an element of enumeration");
	},
	
	// override
	_update: function(updates, schema) {
		JW.Array.addAll(this.values, JW.makeArray(updates["+values"]));
	}
});
