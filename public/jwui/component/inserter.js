﻿/*
	jWidget UI source file.
	
	Copyright (C) 2015 Egor Nepomnyaschih
	
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

JW.UI.Component.Inserter = function(source, el) {
	JW.UI.Component.Inserter._super.call(this, source, el);
};

JW.extend(JW.UI.Component.Inserter, JW.UI.Inserter, {
	_getElement: function(item) {
		return item.el[0];
	},
	
	_addItem: function(item, index) {
		this._super(item, index);
		item._afterAppend();
	}
});
