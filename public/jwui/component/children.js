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

JW.UI.Component.Children = function(component) {
	JW.UI.Component.Children._super.call(this);
	this.component = component; // JW.UI.Component
	this.target = new JW.UI.Component.ChildInserter();
};

JW.extend(JW.UI.Component.Children, JW.AbstractMap, {
	unrender: function() {
		this.target.destroy();
	},

	// override
	trySet: function(item, key) {
		var result = this._super(item, key);
		if (result === undefined) {
			return;
		}
		var child = new JW.UI.Component.Child(this.component, item);
		this.target.trySet(child, key);
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
		this.target.trySetKey(oldKey, newKey);
		return item;
	},

	// override
	tryRemove: function(key) {
		var item = this._super(key);
		if (item === undefined) {
			return;
		}
		this.target.tryRemove(key);
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
		var removedItems = spliceResult.removedItems;
		var addedItems = spliceResult.addedItems;
		var children = JW.Map.map(addedItems, function(item) {
			return new JW.UI.Component.Child(this.component, item);
		}, this);
		var targetResult = this.target.trySplice(JW.Map.getRemovedKeys(removedItems, addedItems), children);
		return spliceResult;
	},
	
	// override
	tryClear: function() {
		var items = this._super();
		if (items === undefined) {
			return;
		}
		this.target.tryClear();
		return items;
	},
	
	// override
	tryReindex: function(keyMap) {
		var result = this._super(keyMap);
		if (result === undefined) {
			return;
		}
		this.target.tryReindex(keyMap);
		return result;
	}
});
