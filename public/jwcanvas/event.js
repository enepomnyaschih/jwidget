/*
	JW.Canvas event model.
	
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

JW.Canvas.Event = JW.Class.extend({
	type          : null, // [readonly] String
	originalEvent : null, // [readonly] jQuery event
	target        : null, // [readonly] JW.Canvas.Component
	currentTarget : null, // [readonly] JW.Canvas.Component
	
	isBubble      : true, // [readonly] Boolean
	isDefault     : true, // [readonly] Boolean
	
	init: function(originalEvent, target)
	{
		this.type = originalEvent.type;
		this.originalEvent = originalEvent;
		this.target = target;
	},
	
	stopPropagation: function()
	{
		this.isBubble = false;
	},
	
	preventDefault: function()
	{
		this.isDefault = false;
	},
	
	_setCurrentTarget: function(target)
	{
		this.currentTarget = target;
	}
});
