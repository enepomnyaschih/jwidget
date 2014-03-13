/*
	jWidget Lib source file.
	
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

/**
 * @class
 *
 * `<T> extends JW.AbstractCollection.Filterer<T, JW.AbstractArray<T>>`
 *
 * See JW.AbstractCollection.Filterer for details.
 *
 * @extends JW.AbstractCollection.Filterer
 *
 * @constructor
 * Creates synchronizer. JW.AbstractCollection#createFilterer method is preferrable instead.
 * @param {JW.AbstractArray} source `<T>` Source collection.
 * @param {Object} config Configuration (see Config options).
 */
JW.AbstractArray.Filterer = function(source, config) {
	JW.AbstractArray.Filterer._super.call(this, source, config);
	this._filtered = [];
	this._splice([], [new JW.AbstractArray.IndexItems(0, this.source.getItems())]);
};

JW.extend(JW.AbstractArray.Filterer, JW.AbstractCollection.Filterer, {
	/**
	 * @cfg {JW.AbstractArray} target `<T>` Target array.
	 */
	/**
	 * @property {JW.AbstractArray} source `<T>` Source collection.
	 */
	/**
	 * @property {JW.AbstractArray} target `<T>` Target array.
	 */
	// Array<number> _filtered; // 0 - false, 1 - true
	
	// override
	destroy: function() {
		this.target.tryClear();
		this._super();
	},
	
	_countFiltered: function(index, count) {
		var result = 0;
		for (var i = 0; i < count; ++i) {
			result += this._filtered[index + i];
		}
		return result;
	},
	
	_splice: function(removedItemsList, addedItemsList) {
		var sourceIndex = 0;
		var targetIndex = 0;
		var removeParamsList = JW.Array.map(removedItemsList, function(indexItems) {
			targetIndex += this._countFiltered(sourceIndex, indexItems.index - sourceIndex);
			var count = this._countFiltered(indexItems.index, indexItems.items.length);
			var params = new JW.AbstractArray.IndexCount(targetIndex, count);
			sourceIndex = indexItems.index + indexItems.length;
			targetIndex += count;
			return params;
		}, this);
		JW.Array.trySplice(this._filtered, JW.Array.map(removedItemsList, JW.byMethod("toIndexCount")), []);
		
		var sourceIndex = 0;
		var targetIndex = 0;
		var addParamsList = JW.Array.map(addedItemsList, function(indexItems) {
			targetIndex += this._countFiltered(sourceIndex, indexItems.index - sourceIndex);
			var items = [];
			var filtered = JW.Array.map(indexItems.items, function(item) {
				if (this.filterItem.call(this.scope, item) === false) {
					return 0;
				}
				items.push(item);
				return 1;
			}, this);
			var params = new JW.AbstractArray.IndexItems(targetIndex, items);
			JW.Array.tryAddAll(this._filtered, filtered, indexItems.index);
			sourceIndex = indexItems.index + filtered.length;
			targetIndex += items.length;
			return params;
		}, this);
		
		this.target.trySplice(removeParamsList, addParamsList);
	}
});
