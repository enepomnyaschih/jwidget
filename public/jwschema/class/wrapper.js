﻿/*
	JW Schema validation class wrapper.
	
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

JW.Schema.Class.Wrapper = function(config) {
	JW.Schema.Class.Wrapper._super.call(this, config);
	config = config || {};
	this.wrap = JW.defn(config.wrap, this.wrap);
};

JW.extend(JW.Schema.Class.Wrapper, JW.Schema.Class, {
	/*
	JW.Schema.Class wrap;
	*/
	
	wrap: "Any",
	
	_validateData: function(data, validation) {
		var schema = validation.schema;
		this.wrap = schema.compileClass(this.wrap);
		return schema._validate(this.wrap, data, validation);
	}
});
