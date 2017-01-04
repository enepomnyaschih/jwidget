/*
	JW.Canvas component graphics model base property item.
	
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

JW.Canvas.Graphics.Item.Property = JW.Canvas.Graphics.Item.extend({
	property : null,
	value    : null,
	
	init: function(property, value)
	{
		this.property = property;
		this.value    = value;
	},
	
	draw: function(context)
	{
		context[this.property] = this.value;
	}
});
