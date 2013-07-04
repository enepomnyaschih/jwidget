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
	this.base = JW.makeArray(config.base).concat();
	this.garbage = JW.defn(config.garbage, this.garbage);
	this._fields = null;
};

JW.extend(JW.Schema.Class.Object, JW.Schema.Class, {
	/*
	Map<JW.Schema.Class> fields;
	Array<String> base;
	Boolean garbage;
	Map<JW.Schema.Class> _fields;
	*/
	
	type    : "Object",
	garbage : false,
	
	onRegister: function(schema)
	{
		for (var i = 0; i < this.base.length; ++i)
			this.base[i] = schema._parseClass(this.base[i]);
		
		for (var key in this.fields)
			this.fields[key] = schema._parseClass(this.fields[key]);
	},
	
	_validateData: function(data, validation)
	{
		if (!JW.isObject(data))
			return validation.addError("object expected");
		
		this._prepareFields();
		
		for (var key in this._fields)
		{
			var item  = this._fields[key];
			var child = data[key];
			
			if (this._skip(child, item))
				continue;
			
			if (this.schema._validate(item, child, validation, key))
				return;
		}
		
		if (this.garbage)
			return;
		
		for (var key in data)
		{
			if (!this._fields[key] && validation.addError("garbage found: " + key))
				return;
		}
	},
	
	_prepareFields: function()
	{
		if (this._fields)
			return;
		
		this._fields = {};
		for (var i = 0; i < this.base.length; ++i)
		{
			var base = this.schema.getClass(this.base[i]);
			base._prepareFields();
			JW.apply(this._fields, base._fields);
		}
		
		JW.apply(this._fields, this.fields);
	}
});
