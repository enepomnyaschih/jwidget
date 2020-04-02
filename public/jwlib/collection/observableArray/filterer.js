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
 * `<T> extends JW.AbstractArray.Filterer<T>`
 *
 * See JW.AbstractCollection.Filterer for details.
 *
 * @extends JW.AbstractArray.Filterer
 *
 * @constructor
 * Creates synchronizer. JW.AbstractCollection#createFilterer method is preferrable instead.
 * @param {JW.ObservableArray} source `<T>` Source collection.
 * @param {Object} config Configuration (see Config options).
 */
JW.ObservableArray.Filterer = function(source, config) {
	JW.ObservableArray.Filterer._super.call(this, source, config);
	this.own(source.spliceEvent.bind(this._onSplice, this));
	this.own(source.replaceEvent.bind(this._onReplace, this));
	this.own(source.moveEvent.bind(this._onMove, this));
	this.own(source.clearEvent.bind(this._onClear, this));
	this.own(source.reorderEvent.bind(this._onReorder, this));
};

JW.extend(JW.ObservableArray.Filterer, JW.AbstractArray.Filterer, {
	_onSplice: function(params) {
		var spliceResult = params.spliceResult;
		this._splice(spliceResult.removedItemsList, spliceResult.addedItemsList);
	},
	
	_onReplace: function(params) {
		var oldFiltered = this._filtered[params.index] !== 0;
		var newFiltered = this.filterItem.call(this.scope, params.newItem) !== false;
		if (!oldFiltered && !newFiltered) {
			return;
		}
		var index = this._countFiltered(0, params.index);
		this._filtered[params.index] = newFiltered ? 1 : 0;
		if (!newFiltered) {
			this.target.tryRemove(index);
		} else if (!oldFiltered) {
			this.target.tryAdd(params.newItem, index);
		} else {
			this.target.trySet(params.newItem, index);
		}
	},
	
	_onMove: function(params) {
		if (this._filtered[params.fromIndex] !== 0) {
			var fromIndex, toIndex;
			if (params.fromIndex < params.toIndex) {
				fromIndex = this._countFiltered(0, params.fromIndex);
				toIndex = fromIndex + this._countFiltered(params.fromIndex + 1, params.toIndex - params.fromIndex);
			} else {
				toIndex = this._countFiltered(0, params.toIndex);
				fromIndex = toIndex + this._countFiltered(params.toIndex, params.fromIndex - params.toIndex);
			}
			this.target.tryMove(fromIndex, toIndex);
		}
		JW.Array.tryMove(this._filtered, params.fromIndex, params.toIndex);
	},
	
	_onClear: function(params) {
		this.target.tryClear();
	},
	
	_onReorder: function(params) {
		var targetIndex = 0;
		var targetIndexWhichMovesToI = {}
		for (var sourceIndex = 0, l = this._filtered.length; sourceIndex < l; ++sourceIndex) {
			if (this._filtered[sourceIndex] !== 0) {
				targetIndexWhichMovesToI[params.indexArray[sourceIndex]] = targetIndex++;
			}
		}
		JW.Array.tryReorder(this._filtered, params.indexArray);
		
		var targetIndex = 0;
		var indexes = new Array(this.target.getLength());
		for (var sourceIndex = 0, l = this._filtered.length; sourceIndex < l; ++sourceIndex) {
			if (this._filtered[sourceIndex] !== 0) {
				indexes[targetIndexWhichMovesToI[sourceIndex]] = targetIndex++;
			}
		}
		
		this.target.tryReorder(indexes);
	}
});
