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

JW.Schema.Class.Array = JW.Schema.Class.extend({
	type    : "Array",
	
	item    : "Any",    // [optional] String
	
	onRegister: function(schema)
	{
		this.item = schema._parseClass(this.item);
	},
	
	_validateData: function(data, validation)
	{
		if (!JW.isArray(data))
			return validation.addError("array expected");
		
		for (var i = 0; i < data.length; ++i)
		{
			if (this.schema._validate(this.item, data[i], validation, i))
				return;
		}
	}
});
