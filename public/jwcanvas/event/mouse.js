/*
	JW.Canvas mouse event model.
	
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

JW.Canvas.Event.Mouse = JW.Canvas.Event.extend({
	local  : null, // [readonly] Array[2]
	global : null, // [readonly] Array[2]
	
	init: function(originalEvent, target, global, type)
	{
		this._super(originalEvent, target);
		this.global = global;
		this.type = type || this.type;
	},
	
	_setCurrentTarget: function(target)
	{
		this._super(target);
		
		if (target)
			this.local = target.globalToLocal(this.global);
	}
});
