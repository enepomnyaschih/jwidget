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
 * `<T> extends JW.AbstractArray.Indexer<T>`
 *
 * See JW.AbstractCollection.Indexer for details.
 *
 * @extends JW.AbstractArray.Indexer
 *
 * @constructor
 * Creates synchronizer. JW.AbstractCollection#createIndexer method is preferrable instead.
 * @param {JW.ObservableArray} source `<T>` Source collection.
 * @param {Object} config Configuration (see Config options).
 */
JW.ObservableArray.Indexer = function(source, config) {
	JW.ObservableArray.Indexer._super.call(this, source, config);
	this.own(source.spliceEvent.bind(this._onSplice, this));
	this.own(source.replaceEvent.bind(this._onReplace, this));
	this.own(source.clearEvent.bind(this._onClear, this));
};

JW.extend(JW.ObservableArray.Indexer, JW.AbstractArray.Indexer, {
	_onSplice: function(params) {
		var spliceResult = params.spliceResult;
		this.target.trySplice(
			this._keys(spliceResult.getRemovedItems()),
			this._index(spliceResult.getAddedItems()));
	},
	
	_onReplace: function(params) {
		this.target.trySplice(
			this._keys([params.oldItem]),
			this._index([params.newItem]));
	},
	
	_onClear: function(params) {
		this.target.tryRemoveAll(
			this._keys(params.items));
	}
});
