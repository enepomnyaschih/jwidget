﻿/*
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
 * `<T> extends JW.AbstractArray.Reverser<T>`
 *
 * See JW.AbstractArray.Reverser for details.
 *
 * @extends JW.AbstractArray.Reverser
 *
 * @constructor
 * Creates synchronizer. JW.AbstractArray#createReverser method is preferrable instead.
 * @param {JW.ObservableArray} source `<T>` Source collection.
 * @param {Object} [config] Configuration (see Config options).
 */
JW.ObservableArray.Reverser = function(source, config) {
	JW.ObservableArray.Reverser._super.call(this, source, config);
	this.own(source.spliceEvent.bind(this._onSplice, this));
	this.own(source.replaceEvent.bind(this._onReplace, this));
	this.own(source.moveEvent.bind(this._onMove, this));
	this.own(source.clearEvent.bind(this._onClear, this));
	this.own(source.reorderEvent.bind(this._onReorder, this));
};

JW.extend(JW.ObservableArray.Reverser, JW.AbstractArray.Reverser, {
	_onSplice: function(params) {
		var spliceResult = params.spliceResult;
		var oldLength = this.target.getLength();
		var newLength = oldLength;
		
		var removeParamsList = JW.Array.map(spliceResult.removedItemsList, function(indexItems) {
			var length = indexItems.items.length;
			var index = oldLength - indexItems.index - length;
			newLength -= length;
			return new JW.AbstractArray.IndexCount(index, length);
		}, this);
		removeParamsList.reverse();
		
		var addedItemsList = spliceResult.addedItemsList.concat();
		addedItemsList.reverse();
		
		JW.Array.each(addedItemsList, function(indexItems) {
			newLength += indexItems.items.length;
		}, this);
		
		var addParamsList = JW.Array.map(addedItemsList, function(indexItems) {
			var items = indexItems.items;
			var length = items.length;
			var index = newLength - indexItems.index - length;
			return new JW.AbstractArray.IndexItems(index, this._reverse(items));
		}, this);
		
		this.target.trySplice(removeParamsList, addParamsList);
	},
	
	_onReplace: function(params) {
		this.target.trySet(params.newItem, this.target.getLength() - params.index - 1);
	},
	
	_onMove: function(params) {
		this.target.tryMove(
			this.target.getLength() - params.fromIndex - 1,
			this.target.getLength() - params.toIndex - 1);
	},
	
	_onClear: function(params) {
		this.target.tryClear();
	},
	
	_onReorder: function(params) {
		var indexArray = params.indexArray;
		var length = indexArray.length;
		var indexes = new Array(indexArray.length);
		for (var i = 0; i < length; ++i) {
			indexes[length - i - 1] = length - indexArray[i] - 1;
		}
		this.target.tryReorder(indexes);
	}
});
