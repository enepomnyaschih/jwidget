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
 * `<T, C extends JW.AbstractCollection<T>>`
 *
 * Collection observer. Listens all collection events and reduces them to 2 granular functions:
 * item is added and item is removed. In optimization purposes, you can define a third function: collection is cleared
 * (in case if there is more effective clearing algorithm than iterative items deletion).
 * Also, you can define a function which is called on each collection modification.
 * As example, this synchronizer can be used to notify the items that they are added into collection.
 *
 *     var observer = collection.{@link JW.AbstractCollection#createObserver createObserver}({
 *         {@link #cfg-addItem addItem}: function(item) { item.setInCollection(true); },
 *         {@link #cfg-removeItem removeItem}: function(item) { item.setInCollection(false); },
 *         {@link #cfg-scope scope}: this
 *     });
 *
 * Use JW.AbstractCollection#createObserver method to create the synchronizer.
 * The method will select which synchronizer implementation fits better (simple or observable).
 *
 * Just another synchronizer use case: if you have an abstract collection on input (and you don't know whether it is
 * simple or observable), but you want to listen collection change event in case, only if it is observable,
 * then you can do it meeting OOD principles:
 *
 *     var observer = collection.{@link JW.AbstractCollection#createObserver createObserver}({
 *         {@link #cfg-change change}: function() { console.log("Collection is changed"); }
 *     });
 *
 * Synchronizer rules:
 *
 * - Function {@link #cfg-addItem} is called for all items of source collection on synchronizer initialization.
 * - Function {@link #cfg-clearItems} is called for collection, or function {@link #cfg-removeItem} is called for
 * all items of source collection on synchronizer destruction.
 * - Functions {@link #cfg-addItem}, {@link #cfg-removeItem} and {@link #cfg-clearItems} are not called on
 * source collection reordering/reindexing.
 *
 * @extends JW.Class
 *
 * @constructor
 * Creates synchronizer. JW.AbstractCollection#createObserver method is preferrable instead.
 * @param {JW.AbstractCollection} source `<T>` Source collection.
 * @param {Object} config Configuration (see Config options).
 */
JW.AbstractCollection.Observer = function(source, config) {
	JW.AbstractCollection.Observer._super.call(this);
	config = config || {};
	this.source = source;
	this.addItem = config.addItem;
	this.removeItem = config.removeItem;
	this.clearItems = config.clearItems;
	this.change = config.change;
	this.scope = config.scope || this;
	this._addItems(source.asArray());
};

JW.extend(JW.AbstractCollection.Observer, JW.Class, {
	/**
	 * @cfg {Function} addItem
	 *
	 * `addItem(item: T): void`
	 *
	 * Item is added to collection.
	 */
	/**
	 * @cfg {Function} removeItem
	 *
	 * `removeItem(item: T): void`
	 *
	 * Item is removed from collection.
	 */
	/**
	 * @cfg {Function} clearItems
	 *
	 * `clearItems(items: Array<T>): void`
	 *
	 * Collection is cleared. By default, calls {@link #removeItem} for all collection items.
	 */
	/**
	 * @cfg {Function} change
	 *
	 * `change(): void`
	 *
	 * Collection is changed arbitrarily.
	 */
	/**
	 * @cfg {Object} scope {@link #addItem}, {@link #removeItem}, {@link #clearItems}, {@link #change} call scope.
	 */
	/**
	 * @property {C} source Source collection.
	 */
	
	// override
	destroyObject: function() {
		this._clearItems(this.source.asArray());
		this.source = null;
		this.addItem = null;
		this.removeItem = null;
		this.clearItems = null;
		this.change = null;
		this.scope = null;
		this._super();
	},
	
	_addItems: function(items) {
		if (!this.addItem) {
			return;
		}
		for (var i = 0, l = items.length; i < l; ++i) {
			this.addItem.call(this.scope, items[i]);
		}
	},
	
	_removeItems: function(items) {
		if (!this.removeItem) {
			return;
		}
		for (var i = items.length - 1; i >= 0; --i) {
			this.removeItem.call(this.scope, items[i]);
		}
	},
	
	_clearItems: function(items) {
		if (items.length === 0) {
			return;
		}
		if (this.clearItems) {
			this.clearItems.call(this.scope, items);
		} else {
			this._removeItems(items);
		}
	},
	
	_onChange: function() {
		this.change.call(this.scope);
	}
});
