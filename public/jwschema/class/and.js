/*
	JW Schema "and" validation class.
	
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

JW.Schema.Class.And = function(config) {
	JW.Schema.Class.And._super.call(this, config);
	config = config || {};
	this.items = JW.makeArray(config.items).concat();
};

JW.extend(JW.Schema.Class.And, JW.Schema.Class, {
	/*
	Array items; // optional
	*/
	
	_validateData: function(data, validation) {
		var items = this.items;
		var schema = validation.schema;
		for (var i = 0, l = items.length; i < l; ++i) {
			var item = schema.compileClass(items[i]);
			items[i] = item;
			if (schema._validate(item, data, validation)) {
				return;
			}
		}
	}
});
