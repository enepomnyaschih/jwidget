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
