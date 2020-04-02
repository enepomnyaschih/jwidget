/*
	jWidget UI source file.
	
MIT License

Copyright (c) 2020 Egor Nepomnyaschih

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
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
