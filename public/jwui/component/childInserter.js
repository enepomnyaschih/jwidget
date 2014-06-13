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

JW.UI.Component.ChildInserter = function() {
	JW.UI.Component.ChildInserter._super.call(this);
};

JW.extend(JW.UI.Component.ChildInserter, JW.AbstractMap, {
	// override
	destroy: function() {
		JW.Map.each(this.getJson(), this._detach, this);
		this._super();
	},
	
	// override
	trySplice: function(removedKeys, updatedItems) {
		var spliceResult = this._super(removedKeys, updatedItems);
		if (spliceResult === undefined) {
			return;
		}
		JW.Map.each(spliceResult.removedItems, this._detach, this);
		JW.Map.each(spliceResult.addedItems, this._attach, this);
		return spliceResult;
	},
	
	// override
	tryClear: function() {
		var items = this._super();
		if (items === undefined) {
			return;
		}
		JW.Map.each(items, this._detach, this);
		return items;
	},
	
	// override
	tryReindex: function(keyMap) {
		var result = this._super(keyMap);
		if (result === undefined) {
			return;
		}
		for (var oldKey in keyMap) {
			var newKey = keyMap[oldKey];
			var item = this.get(newKey);
			item.detach();
			item.attach(newKey);
		}
		return result;
	},
	
	_attach: function(item, key) {
		item.attach(key);
	},
	
	_detach: function(item) {
		item.detach();
	}
});
