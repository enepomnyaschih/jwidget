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
 * `<T> extends JW.AbstractArray.Merger<T>`
 *
 * See JW.AbstractArray.Merger for details.
 *
 * @extends JW.AbstractArray.Merger
 *
 * @constructor
 * Creates synchronizer. JW.AbstractArray#createMerger method is preferrable instead.
 * @param {JW.ObservableArray} source `<T>` Source collection.
 * @param {Object} [config] Configuration (see Config options).
 */
JW.ObservableArray.Merger = function(source, config) {
	JW.ObservableArray.Merger._super.call(this, source, config);
	this.own(source.spliceEvent.bind(this._onSplice, this));
	this.own(source.replaceEvent.bind(this._onReplace, this));
	this.own(source.moveEvent.bind(this._onMove, this));
	this.own(source.clearEvent.bind(this._onClear, this));
	this.own(source.reorderEvent.bind(this._onReorder, this));
};

JW.extend(JW.ObservableArray.Merger, JW.AbstractArray.Merger, {
	_getIndexes: function(bunches) {
		var currentIndex = 0;
		var indexes = JW.Array.map(bunches, function(bunch) {
			var index = currentIndex;
			currentIndex += bunch.getLength();
			return index;
		}, this);
		indexes.push(currentIndex);
		return indexes;
	},
	
	// 0 x,x
	// 2 x,x,x delete
	// 5 x,x,x,x
	// 9 x,x
	
	// 0 x,x
	// 2 x,x,x,x
	// 6 x,x
	
	_onSplice: function(params) {
		var spliceResult = params.spliceResult;
		var indexes = this._getIndexes(spliceResult.oldItems);
		var removeParamsList = JW.Array.map(spliceResult.removedItemsList, function(indexItems) {
			return new JW.AbstractArray.IndexCount(indexes[indexItems.index], this._count(indexItems.items));
		}, this);
		JW.Array.backEvery(spliceResult.removedItemsList, function(indexItems) {
			indexes.splice(indexItems.index, indexItems.items.length);
			var count = this._count(indexItems.items);
			for (var i = indexItems.index; i < indexes.length; ++i) {
				indexes[i] -= count;
			}
		}, this);
		var addParamsList = JW.Array.map(spliceResult.addedItemsList, function(indexItems) {
			return new JW.AbstractArray.IndexItems(indexes[indexItems.index], this._merge(indexItems.items));
		}, this);
		this.target.trySplice(removeParamsList, addParamsList);
	},
	
	_onReplace: function(params) {
		var index = this._count(this.source.getItems(), 0, params.index);
		this.target.trySplice(
			[new JW.AbstractArray.IndexCount(index, params.oldItem.getLength())],
			[new JW.AbstractArray.IndexItems(index, params.newItem.getItems())]);
	},
	
	_onMove: function(params) {
		var count = params.item.getLength();
		var indexes = new Array(this.target.getLength());
		var currentIndex = 0;
		
		function shiftBunch(bunchLength, shift) {
			for (var j = 0; j < bunchLength; ++j) {
				indexes[currentIndex] = currentIndex + shift;
				++currentIndex;
			}
		}
		
		for (var i = 0, l = Math.min(params.fromIndex, params.toIndex); i < l; ++i) {
			shiftBunch(this.source.get(i).getLength(), 0);
		}
		if (params.fromIndex <= params.toIndex) {
			// [1], [2], [3], [4], [5]        [2] move to 3
			// [1], [3], [4], [2], [5]
			shiftBunch(count, this._count(this.source.getItems(), params.fromIndex, params.toIndex - params.fromIndex));
			for (var i = params.fromIndex; i < params.toIndex; ++i) {
				shiftBunch(this.source.get(i).getLength(), -count);
			}
		} else {
			// [1], [2], [3], [4], [5]        [4] move to 1
			// [1], [4], [2], [3], [5]
			for (var i = params.toIndex + 1; i <= params.fromIndex; ++i) {
				shiftBunch(this.source.get(i).getLength(), count);
			}
			shiftBunch(count, -this._count(this.source.getItems(), params.toIndex + 1, params.fromIndex - params.toIndex));
		}
		for (var i = Math.max(params.fromIndex, params.toIndex) + 1, l = this.source.getLength(); i < l; ++i) {
			shiftBunch(this.source.get(i).getLength(), 0);
		}
		
		this.target.tryReorder(indexes);
	},
	
	_onClear: function(params) {
		this.target.tryClear();
	},
	
	_onReorder: function(params) {
		var oldIndexes = this._getIndexes(params.items);
		var newIndexes = this._getIndexes(this.source.getItems());
		var indexes = new Array(this.target.getLength());
		for (var i = 0, l = params.items.length; i < l; ++i) {
			var bunch = params.items[i];
			var oldIndex = oldIndexes[i];
			var newIndex = newIndexes[params.indexArray[i]];
			for (var j = 0, m = bunch.getLength(); j < m; ++j) {
				indexes[oldIndex + j] = newIndex + j;
			}
		}
		this.target.tryReorder(indexes);
	}
});
