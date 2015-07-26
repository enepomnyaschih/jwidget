/*
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

JW.UI.Component.ChildInserter = function() {
	JW.UI.Component.ChildInserter._super.call(this);
};

JW.extend(JW.UI.Component.ChildInserter, JW.AbstractMap, {
	// override
	trySet: function(item, key) {
		var result = this._super(item, key);
		if (result === undefined) {
			return;
		}
		var removedItem = result.get();
		if (removedItem) {
			removedItem.detach();
		}
		item.attach(key);
		return result;
	},

	// override
	setAll: function(items) {
		this.trySetAll(items);
	},

	// override
	trySetKey: function(oldKey, newKey) {
		var item = this._super(oldKey, newKey);
		if (item === undefined) {
			return;
		}
		item.detach();
		item.attach(newKey);
		return item;
	},

	// override
	tryRemove: function(key) {
		var item = this._super(key);
		if (item === undefined) {
			return;
		}
		item.detach();
		return item;
	},

	// override
	removeAll: function(keys) {
		this.tryRemoveAll(keys);
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
