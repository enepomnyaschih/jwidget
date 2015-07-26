/*
	jWidget Lib source file.
	
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
