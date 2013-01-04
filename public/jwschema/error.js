﻿/*
	JW Schema validation error
	
	Copyright (C) 2011 Egor Nepomnyaschih
	
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

JW.Schema.Error = JW.Class.extend({
	data    : null,     // [readonly] *
	path    : null,     // [readonly] Array of (String or Number)
	msg     : null,     // [readonly] Array of String
	
	init: function(data, path)
	{
		this.data = data;
		this.path = path;
		this.msg  = [];
	},
	
	addMessage: function(msg)
	{
		this.msg.push(msg);
	},
	
	toString: function()
	{
		return this.path.join(".") + ": " + this.msg.join(", ");
	}
});
