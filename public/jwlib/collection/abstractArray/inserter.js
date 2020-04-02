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
 * `<T>`
 *
 * View synchronizer with array. Listens all array events and reduces them to 2 granular functions:
 * item is added into specific position and item is removed from specific position. In optimization purposes,
 * you can define a third function: array is cleared
 * (in case if there is more effective clearing algorithm than iterative items deletion).
 * Unlike JW.AbstractCollection.Observer, tracks items order.
 *
 * Use JW.AbstractArray#createInserter method to create the synchronizer.
 *
 *     var inserter = array.{@link JW.AbstractArray#createInserter createInserter}({
 *         {@link #cfg-addItem addItem}: function(item, index) { this.store.insert(item, index); },
 *         {@link #cfg-removeItem removeItem}: function(item, index) { this.store.remove(index); },
 *         {@link #cfg-scope scope}: this
 *     });
 *
 * The method will select which synchronizer implementation fits better (simple or observable).
 *
 * Synchronizer rules:
 *
 * - Function {@link #cfg-addItem} is called for all items of source array on synchronizer initialization.
 * - Function {@link #cfg-clearItems} is called for array, or function {@link #cfg-removeItem} is called for
 * all items of source array on synchronizer destruction.
 * - On source array reordering, items order is synchorinized by callback functions calls.
 *
 * @extends JW.Class
 *
 * @constructor
 * Creates synchronizer. JW.AbstractArray#createInserter method is preferrable instead.
 * @param {JW.AbstractArray} source `<T>` Source array.
 * @param {Object} config Configuration (see Config options).
 */
JW.AbstractArray.Inserter = function(source, config) {
	JW.AbstractArray.Inserter._super.call(this);
	config = config || {};
	this.source = source;
	this.addItem = config.addItem;
	this.removeItem = config.removeItem;
	this.clearItems = config.clearItems;
	this.scope = config.scope || this;
	this._addItems(this.source.getItems(), 0);
};

JW.extend(JW.AbstractArray.Inserter, JW.Class, {
	/**
	 * @cfg {Function} addItem
	 *
	 * `addItem(item: T, index: number): void`
	 *
	 * Item is added to specific position in array.
	 */
	/**
	 * @cfg {Function} removeItem
	 *
	 * `removeItem(item: T, index: number): void`
	 *
	 * Item is removed from specific position in array.
	 */
	/**
	 * @cfg {Function} clearItems
	 *
	 * `clearItems(items: Array<T>): void`
	 *
	 * Array is cleared. By default, calls {@link #removeItem} for all array items.
	 */
	/**
	 * @cfg {Object} scope {@link #addItem}, {@link #removeItem}, {@link #clearItems} call scope.
	 */
	/**
	 * @property {JW.AbstractArray} source `<T>` Source array.
	 */
	
	destroyObject: function() {
		this._clearItems(this.source.getItems());
		this.source = null;
		this.addItem = null;
		this.removeItem = null;
		this.clearItems = null;
		this.scope = null;
		this._super();
	},
	
	_addItems: function(items, index) {
		if (!this.addItem) {
			return;
		}
		for (var i = 0; i < items.length; ++i) {
			this.addItem.call(this.scope, items[i], i + index);
		}
	},
	
	_removeItems: function(items, index) {
		if (!this.removeItem) {
			return;
		}
		for (var i = items.length - 1; i >= 0; --i) {
			this.removeItem.call(this.scope, items[i], i + index);
		}
	},
	
	_clearItems: function(items) {
		if (items.length === 0) {
			return;
		}
		if (this.clearItems) {
			this.clearItems.call(this.scope || this, items);
		} else {
			this._removeItems(items, 0);
		}
	}
});
