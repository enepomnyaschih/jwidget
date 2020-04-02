/*
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

/**
 * @class
 *
 * `<T> extends JW.AbstractArray.Inserter<T>`
 *
 * See JW.AbstractArray.Inserter for details.
 *
 * @extends JW.AbstractArray.Inserter
 *
 * @constructor
 * Creates synchronizer. JW.AbstractArray#createInserter method is preferrable instead.
 * @param {JW.ObservableArray} source `<T>` Source collection.
 * @param {Object} config Configuration (see Config options).
 */
JW.ObservableArray.Inserter = function(source, config) {
	JW.ObservableArray.Inserter._super.call(this, source, config);
	this.own(source.spliceEvent.bind(this._onSplice, this));
	this.own(source.replaceEvent.bind(this._onReplace, this));
	this.own(source.moveEvent.bind(this._onMove, this));
	this.own(source.clearEvent.bind(this._onClear, this));
	this.own(source.reorderEvent.bind(this._onReorder, this));
};

JW.extend(JW.ObservableArray.Inserter, JW.AbstractArray.Inserter, {
	_onSplice: function(params) {
		var spliceResult = params.spliceResult;
		var oldItems = spliceResult.oldItems;
		var removedItems = spliceResult.getRemovedItems();
		
		// if there is an effective clearing function, just reset the controller
		if (this.clearItems && (3 * removedItems.length > 2 * oldItems.length)) {
			this.clearItems.call(this.scope, oldItems);
			this._addItems(this.source.getItems(), 0);
			return;
		}
		
		// else, splice the elements
		var removedItemsList = spliceResult.removedItemsList;
		var addedItemsList = spliceResult.addedItemsList;
		for (var i = removedItemsList.length - 1; i >= 0; --i) {
			var removeRarams = removedItemsList[i];
			this._removeItems(removeRarams.items, removeRarams.index);
		}
		for (var i = 0, l = addedItemsList.length; i < l; ++i) {
			var addParams = addedItemsList[i];
			this._addItems(addParams.items, addParams.index);
		}
	},
	
	_onReplace: function(params) {
		if (this.removeItem) {
			this.removeItem.call(this.scope, params.oldItem, params.index);
		}
		if (this.addItem) {
			this.addItem.call(this.scope, params.newItem, params.index);
		}
	},
	
	_onMove: function(params) {
		if (this.removeItem) {
			this.removeItem.call(this.scope, params.item, params.fromIndex);
		}
		if (this.addItem) {
			this.addItem.call(this.scope, params.item, params.toIndex);
		}
	},
	
	_onClear: function(params) {
		this._clearItems(params.items);
	},
	
	_onReorder: function(params) {
		this._clearItems(params.items);
		this._addItems(this.source.getItems(), 0);
	}
});
