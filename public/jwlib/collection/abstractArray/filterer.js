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
	destroyObject: function() {
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
			sourceIndex = indexItems.index + indexItems.items.length;
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
	},
	
	/**
	 * Changes filterer configuration and refilters target collection. Accepts next
	 * options: #filterItem, #scope.
	 * @param {Object} config Configuration.
	 */
	reconfigure: function(config) {
		this.filterItem = JW.def(config.filterItem, this.filterItem);
		this.scope = JW.def(config.scope, this.scope);
		this.refilter();
	},
	
	/**
	 * Refilters target collection item at specified position in source collection.
	 * Call this method when collection item properties change the way that it must be refiltered.
	 * @param {number} index Index of source collection item to refilter.
	 */
	refilterAt: function(sourceIndex) {
		var item = this.source.get(sourceIndex);
		var good = this.filterItem.call(this.scope, item) !== false;
		var targetIndex = this._countFiltered(0, sourceIndex);
		if (this._filtered[sourceIndex] === 0) {
			if (good) {
				this._filtered[sourceIndex] = 1;
				this.target.add(item, targetIndex);
			}
		} else {
			if (!good) {
				this._filtered[sourceIndex] = 0;
				this.target.remove(targetIndex);
			}
		}
	},
	
	/**
	 * Refilters target collection item. Call this method when collection item properties change the way that
	 * it must be refiltered.
	 * @param {T} item Item to refilter.
	 */
	refilterItem: function(item) {
		var index = this.source.indexOf(item);
		if (index !== -1) {
			this.refilterAt(index);
		}
	},
	
	/**
	 * Refilters target collection. Call this method when collection items properties change the way that
	 * they must be refiltered.
	 */
	refilter: function() {
		var newFiltered = this.source.map(function(item) {
			return (this.filterItem.call(this.scope, item) !== false) ? 1 : 0;
		}, this);
		
		var removeParams = null;
		var removeParamsList = [];
		
		function flushRemove() {
			if (removeParams !== null) {
				removeParamsList.push(removeParams);
				removeParams = null;
			}
		}
		
		var targetIndex = 0;
		this.source.every(function(item, index) {
			if (this._filtered[index] === 0) {
				return;
			}
			if (newFiltered[index] === 0) {
				if (removeParams === null) {
					removeParams = new JW.AbstractArray.IndexCount(targetIndex, 0);
				}
				++removeParams.count;
				this._filtered[index] = 0;
			} else {
				flushRemove();
			}
			++targetIndex;
		}, this);
		
		flushRemove();
		
		var addParams = null;
		var addParamsList = [];
		
		function flushAdd() {
			if (addParams !== null) {
				addParamsList.push(addParams);
				addParams = null;
			}
		}
		
		var targetIndex = 0;
		this.source.every(function(item, index) {
			if (this._filtered[index] === 1) {
				flushAdd();
				++targetIndex;
				return;
			}
			if (newFiltered[index] === 1) {
				if (addParams === null) {
					addParams = new JW.AbstractArray.IndexItems(targetIndex, []);
				}
				addParams.items.push(item);
				this._filtered[index] = 1;
				++targetIndex;
			} else {
				flushAdd();
			}
		}, this);
		
		flushAdd();
		
		this._filtered = newFiltered;
		this.target.trySplice(removeParamsList, addParamsList);
	}
});
