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
 * `<T, U> extends JW.AbstractMap.Mapper<T, U>`
 *
 * See JW.AbstractCollection.Mapper for details.
 *
 * @extends JW.AbstractMap.Mapper
 *
 * @constructor
 * Creates synchronizer. JW.AbstractCollection#createMapper method is preferrable instead.
 * @param {JW.ObservableMap} source `<T>` Source collection.
 * @param {Object} config Configuration (see Config options).
 */
JW.ObservableMap.Mapper = function(source, config) {
	JW.ObservableMap.Mapper._super.call(this, source, config);
	this.own(source.spliceEvent.bind(this._onSplice, this));
	this.own(source.reindexEvent.bind(this._onReindex, this));
	this.own(source.clearEvent.bind(this._onClear, this));
};

JW.extend(JW.ObservableMap.Mapper, JW.AbstractMap.Mapper, {
	_onSplice: function(params) {
		var sourceResult = params.spliceResult;
		var removedDatas = sourceResult.removedItems;
		var addedDatas = sourceResult.addedItems;
		var targetResult = this.target.trySplice(
			JW.Map.getRemovedKeys(removedDatas, addedDatas),
			this._createItems(addedDatas));
		if (targetResult !== undefined) {
			this._destroyItems(targetResult.removedItems, removedDatas);
		}
	},
	
	_onReindex: function(params) {
		this.target.tryReindex(params.keyMap);
	},
	
	_onClear: function(params) {
		var datas = params.items;
		this._destroyItems(this.target.tryRemoveAll(JW.Map.getKeys(datas)), datas);
	}
});
