﻿/*
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
 * Collection filterer.
 * Builds new collection of the same type, consisting of items for which callback
 * function returns !== `false`.
 * If original collection is observable, starts continuous synchronization.
 * Keeps item order in array.
 *
 *     var source = new JW.ObservableArray([1, 2, 3]);
 *     var filterer = source.{@link JW.AbstractCollection#createFilterer createFilterer}({
 *         {@link #cfg-filterItem filterItem}: function(x) { return x % 2 === 1; }
 *     });
 *     var target = filterer.{@link JW.AbstractCollection.Filterer#property-target target};
 *     assert(target.{@link JW.AbstractArray#equal equal}([1, 3]));
 *
 *     source.{@link JW.AbstractArray#addAll addAll}([4, 7, 1, 6]);
 *     assert(target.{@link JW.AbstractArray#equal equal}([1, 3, 7, 1]));
 *
 *     source.{@link JW.AbstractArray#move move}(2, 6); // move "3" item to the end
 *     assert(target.{@link JW.AbstractArray#equal equal}([1, 7, 1, 3]));
 *
 *     filterer.{@link JW.AbstractCollection.Filterer#destroy destroy}();
 *
 * Use JW.AbstractCollection#createFilterer method to create the synchronizer.
 * The method will select which synchronizer implementation fits better (simple or observable).
 *
 * You can pass target collection in config option:
 *
 *     var source = new JW.ObservableSet();
 *     var target = new JW.Set();
 *     var filterer = source.{@link JW.AbstractCollection#createFilterer createFilterer}({
 *         {@link #cfg-target target}: target,
 *         {@link #cfg-filterItem filterItem}: this._filterItem,
 *         {@link #cfg-scope scope}: this
 *     });
 *
 * In simple cases, JW.AbstractCollection#$$filter shorthand can be used instead. It returns the target collection right away:
 *
 *     var source = new JW.ObservableArray([1, 2, 3]);
 *     var target = source.{@link JW.AbstractCollection#$$filter $$filter}(function(x) { return x % 2 === 1; });
 *     assert(target.{@link JW.AbstractArray#equal equal}([1, 3]));
 *
 *     source.{@link JW.AbstractArray#addAll addAll}([4, 7, 1, 6]);
 *     assert(target.{@link JW.AbstractArray#equal equal}([1, 3, 7, 1]));
 *
 *     source.{@link JW.AbstractArray#move move}(2, 6); // move "3" item to the end
 *     assert(target.{@link JW.AbstractArray#equal equal}([1, 7, 1, 3]));
 *
 *     target.{@link JW.AbstractArray#destroy destroy}();
 *
 * Synchronizer rules:
 *
 * - Target collection is stored in {@link #property-target} property.
 * - Filtered items are added to {@link #property-target} immediately on synchronizer initialization.
 * - All items are removed from {@link #property-target} on synchronizer destruction.
 * - You can pass target collection in {@link #cfg-target} config option.
 * In this case, you are responsible for its destruction (though items will be removed
 * automatically on synchronizer destruction anyway).
 * - If {@link #cfg-target} is not passed, it will be created automatically. Synchronizer will select
 * appropriate {@link #property-target} implementation (simple or observable). In this
 * case, {@link #property-target} will be destroyed automatically on synchronizer destruction.
 *
 * **Additional rules for different collection types**
 *
 * JW.AbstractArray:
 *
 * - Target collection must be empty before initialization.
 * - A target collection can be synchronized with one source collection only.
 *
 * JW.AbstractMap:
 *
 * - A target collection can be synchronized with multiple source collections, if keys of all items are different.
 * - You can add items to target collection manually, if their keys differ from source collection keys.
 *
 * JW.AbstractSet:
 *
 * - A target collection can be synchronized with multiple source collections, if all items are different.
 * - You can add items to target collection manually, if they differ from source collection items.
 *
 * @extends JW.Class
 *
 * @constructor
 * Creates synchronizer. JW.AbstractCollection#createFilterer method is preferrable instead.
 * @param {JW.AbstractCollection} source `<T>` Source collection.
 * @param {Object} config Configuration (see Config options).
 */
JW.AbstractCollection.Filterer = function(source, config) {
	JW.AbstractCollection.Filterer._super.call(this);
	config = config || {};
	this.source = source;
	this.filterItem = config.filterItem;
	this._targetCreated = config.target == null;
	this.target = this._targetCreated ? this.source.createEmpty() : config.target;
	this.scope = config.scope || this;
};

JW.extend(JW.AbstractCollection.Filterer, JW.Class, {
	/**
	 * @cfg {C} target Target collection.
	 */
	/**
	 * @cfg {Function} filterItem (required)
	 *
	 * `filterItem(item: T): boolean`
	 *
	 * Filtering function. Target collection will contain an item if filtering function
	 * returns !== `false` for this item.
	 */
	/**
	 * @cfg {Object} scope {@link #cfg-filterItem} call scope.
	 */
	/**
	 * @property {C} source Source collection.
	 */
	/**
	 * @property {C} target Target collection.
	 */

	destroyObject: function() {
		if (this._targetCreated) {
			this.target.destroy();
		}
		this.source = null;
		this.filterItem = null;
		this.target = null;
		this.scope = null;
		this._super();
	}
});
