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
 * `<T> extends JW.AbstractArray.Counter<T>`
 *
 * See JW.AbstractCollection.Counter for details.
 *
 * @extends JW.AbstractArray.Counter
 *
 * @constructor
 * Creates synchronizer. JW.AbstractCollection#createCounter method is preferrable instead.
 * @param {JW.ObservableArray} source `<T>` Source collection.
 * @param {Object} config Configuration (see Config options).
 */
JW.ObservableArray.Counter = function(source, config) {
	JW.ObservableArray.Counter._super.call(this, source, config);
	this.own(source.spliceEvent.bind(this._onSplice, this));
	this.own(source.replaceEvent.bind(this._onReplace, this));
	this.own(source.clearEvent.bind(this._onClear, this));
};

JW.extend(JW.ObservableArray.Counter, JW.AbstractArray.Counter, {
	_onSplice: function(params) {
		var spliceResult = params.spliceResult;
		var value = this.target.get();
		JW.Array.every(spliceResult.removedItemsList, function(indexItems) {
			value -= JW.Array.count(indexItems.items, this.filterItem, this.scope);
		}, this);
		JW.Array.every(spliceResult.addedItemsList, function(indexItems) {
			value += JW.Array.count(indexItems.items, this.filterItem, this.scope);
		}, this);
		this.target.set(value);
	},

	_onReplace: function(params) {
		var oldFiltered = this.filterItem.call(this.scope, params.oldItem) !== false;
		var newFiltered = this.filterItem.call(this.scope, params.newItem) !== false;
		if (oldFiltered && !newFiltered) {
			this.target.set(this.target.get() - 1);
		} else if (!oldFiltered && newFiltered) {
			this.target.set(this.target.get() + 1);
		}
	},

	_onClear: function(params) {
		this.target.set(0);
	}
});
