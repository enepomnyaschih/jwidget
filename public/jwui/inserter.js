﻿/*
	jWidget UI source file.
	
	Copyright (C) 2014 Egor Nepomnyaschih
	
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

JW.UI.Inserter = function(source, el) {
	JW.UI.Inserter._super.call(this);
	this.el = el;
	this.own(source.createInserter({
		addItem    : this._addItem,
		removeItem : this._removeItem,
		scope      : this
	}));
};

JW.extend(JW.UI.Inserter, JW.Class, {
	// Element el;
	
	_addItem: function(item, index) {
		this.el.insert(item.el, index);
		item._afterAppend();
	},
	
	_removeItem: function(item) {
		item.el.detach();
	}
});
