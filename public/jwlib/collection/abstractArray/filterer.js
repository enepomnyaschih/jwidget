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
