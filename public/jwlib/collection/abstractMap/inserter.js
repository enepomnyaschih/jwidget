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
 * View synchronizer with map. Listens all map events and reduces them to 2 granular functions:
 * item is added with specific key and item is removed with specific key. In optimization purposes,
 * you can define a third function: map is cleared
 * (in case if there is more effective clearing algorithm than iterative items deletion).
 * Unlike JW.AbstractCollection.Observer, tracks items keys.
 * Can be used mainly for DOM-element synchronization with map of child elements.
 *
 * Use JW.AbstractMap#createInserter method to create the synchronizer.
 *
 *     var inserter = map.{@link JW.AbstractMap#createInserter createInserter}({
 *         {@link #cfg-addItem addItem}: function(el, key) { this.el.find("[elkey=" + key + "]").append(el); },
 *         {@link #cfg-removeItem removeItem}: function(el, key) { el.detach(); },
 *         {@link #cfg-scope scope}: this
 *     });
 *
 * The method will select which synchronizer implementation fits better (simple or observable).
 *
 * Synchronizer rules:
 *
 * - Function {@link #cfg-addItem} is called for all items of source map on synchronizer initialization.
 * - Function {@link #cfg-clearItems} is called for map, or function {@link #cfg-removeItem} is called for
 * all items of source map on synchronizer destruction.
 * - On source map reindexing, items keys are synchorinized by callback functions calls.
 *
 * @extends JW.Class
 *
 * @constructor
 * Creates synchronizer. JW.AbstractMap#createInserter method is preferrable instead.
 * @param {JW.AbstractMap} source `<T>` Source map.
 * @param {Object} config Configuration (see Config options).
 */
JW.AbstractMap.Inserter = function(source, config) {
	JW.AbstractMap.Inserter._super.call(this);
	config = config || {};
	this.source = source;
	this.addItem = config.addItem;
	this.removeItem = config.removeItem;
	this.clearItems = config.clearItems;
	this.scope = config.scope || this;
	this._addItems(this.source.getJson());
};

JW.extend(JW.AbstractMap.Inserter, JW.Class, {
	/**
	 * @cfg {Function} addItem
	 *
	 * `addItem(item: T, key: string): void`
	 *
	 * Item is added to map with specific key.
	 */
	/**
	 * @cfg {Function} removeItem
	 *
	 * `removeItem(item: T, key: string): void`
	 *
	 * Item is removed from map with specific key.
	 */
	/**
	 * @cfg {Function} clearItems
	 *
	 * `clearItems(items: Object): void`
	 *
	 * Map is cleared. By default, calls {@link #removeItem} for all map items.
	 */
	/**
	 * @cfg {Object} scope {@link #addItem}, {@link #removeItem}, {@link #clearItems} call scope.
	 */
	/**
	 * @property {JW.AbstractMap} source `<T>` Source map.
	 */
	
	destroyObject: function() {
		this._clearItems(this.source.getJson());
		this.source = null;
		this.addItem = null;
		this.removeItem = null;
		this.clearItems = null;
		this.scope = null;
		this._super();
	},
	
	_addItems: function(items) {
		if (!this.addItem) {
			return;
		}
		for (var key in items) {
			this.addItem.call(this.scope, items[key], key);
		}
	},
	
	_removeItems: function(items) {
		if (!this.removeItem) {
			return;
		}
		for (var key in items) {
			this.removeItem.call(this.scope, key, items[key]);
		}
	},
	
	_clearItems: function(items) {
		if (JW.Map.isEmpty(items)) {
			return;
		}
		if (this.clearItems) {
			this.clearItems.call(this.scope || this, items);
		} else {
			this._removeItems(items);
		}
	}
});
