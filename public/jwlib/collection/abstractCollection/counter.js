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
 * Counter for collection items which match the specified filter.
 * Builds new JW.Property&lt;number&gt;, containing the number of items for which callback
 * function returns !== `false`.
 * If original collection is observable, starts continuous synchronization.
 *
 *     var source = new JW.ObservableArray([1, 2, 3]);
 *     var counter = source.{@link JW.AbstractCollection#createCounter createCounter}({
 *         {@link JW.AbstractCollection.Counter#cfg-filterItem filterItem}: function(x) { return x % 2 === 1; }
 *     });
 *     var target = counter.{@link JW.AbstractCollection.Counter#property-target target};
 *     assert(target.{@link JW.Property#get get}() === 2); // 1, 3
 *
 *     source.{@link JW.AbstractArray#addAll addAll}([4, 7, 1, 6]);
 *     assert(target.{@link JW.Property#get get}() === 4); // 1, 3, 7, 1
 *
 *     counter.{@link JW.AbstractCollection.Counter#destroy destroy}();
 *
 * Use JW.AbstractCollection#createCounter method to create the synchronizer.
 * The method will select which synchronizer implementation fits better (simple or observable).
 *
 * You can pass target property in config option:
 *
 *     var source = new JW.ObservableSet();
 *     var target = new JW.Property(0);
 *     var counter = source.{@link JW.AbstractCollection#createCounter createCounter}({
 *         {@link JW.AbstractCollection.Counter#cfg-target target}: target,
 *         {@link JW.AbstractCollection.Counter#cfg-filterItem filterItem}: this._filterItem,
 *         {@link JW.AbstractCollection.Counter#cfg-scope scope}: this
 *     });
 *
 * In simple cases, JW.AbstractCollection#$$count shorthand can be used instead. It returns the target property right away:
 *
 *     var source = new JW.ObservableArray([1, 2, 3]);
 *     var target = source.{@link JW.AbstractCollection#$$count $$count}(function(x) { return x % 2 === 1; });
 *     assert(target.{@link JW.Property#get get}() === 2); // 1, 3
 *
 *     source.{@link JW.AbstractArray#addAll addAll}([4, 7, 1, 6]);
 *     assert(target.{@link JW.Property#get get}() === 4); // 1, 3, 7, 1
 *
 *     target.{@link JW.Property#destroy destroy}();
 *
 * You may use JW.AbstractCollection.Filterer instead of counter, but counter works much
 * faster because it doesn't create a filtered collection.
 *
 *     var source = new JW.ObservableArray();
 *
 *     // via filterer
 *     var filterer = source.{@link JW.AbstractCollection#createFilterer createFilterer}({
 *         {@link JW.AbstractCollection.Filterer#cfg-filterItem filterItem}: this._filterItem,
 *         {@link JW.AbstractCollection.Filterer#cfg-scope scope}: this
 *     });
 *     var count = filterer.{@link JW.AbstractCollection.Filterer#property-target target}.{@link JW.ObservableArray#length length}; // JW.Property<number>
 *
 *     // via counter, works faster
 *     var counter = source.{@link JW.AbstractCollection#createCounter createCounter}({
 *         {@link JW.AbstractCollection.Counter#cfg-filterItem filterItem}: this._filterItem,
 *         {@link JW.AbstractCollection.Counter#cfg-scope scope}: this
 *     });
 *     var count = counter.{@link JW.AbstractCollection.Counter#property-target target}; // JW.Property<number>
 *
 * Counter works correctly for observable collections only.
 *
 * @extends JW.Class
 *
 * @constructor
 * Creates synchronizer. JW.AbstractCollection#createCounter method is preferrable instead.
 * @param {JW.AbstractCollection} source `<T>` Source collection.
 * @param {Object} config Configuration (see Config options).
 */
JW.AbstractCollection.Counter = function(source, config) {
	JW.AbstractCollection.Counter._super.call(this);
	config = config || {};
	this.source = source;
	this.filterItem = config.filterItem;
	this._targetCreated = config.target == null;
	this.target = this._targetCreated ? new JW.Property(0) : config.target;
	this.scope = config.scope || this;
	this.target.set(source.count(this.filterItem, this.scope));
};

JW.extend(JW.AbstractCollection.Counter, JW.Class, {
	/**
	 * @cfg {JW.Property} target `<number>` Target property.
	 */
	/**
	 * @cfg {Function} filterItem (required)
	 *
	 * `filterItem(item: T): boolean`
	 *
	 * Filtering function. Target property will count an item if filtering function
	 * returns !== `false` for this item.
	 */
	/**
	 * @cfg {Object} scope {@link #cfg-filterItem} call scope.
	 */
	/**
	 * @property {JW.AbstractCollection} source `<T>` Source collection.
	 */
	/**
	 * @property {JW.Property} target `<number>` Target property.
	 */

	// override
	destroyObject: function() {
		this.target.set(0);
		if (this._targetCreated) {
			this.target.destroy();
		}
		this.source = null;
		this.filterItem = null;
		this.target = null;
		this.scope = null;
		this._super();
	},

	/**
	 * Changes counter configuration and recounts matching items. Accepts next
	 * options: #filterItem, #scope.
	 * @param {Object} config Configuration.
	 */
	reconfigure: function(config) {
		this.filterItem = JW.def(config.filterItem, this.filterItem);
		this.scope = JW.def(config.scope, this.scope);
		this.recount();
	},

	/**
	 * Recounts matching items. Call this method when collection items properties change the way that
	 * they must be refiltered.
	 */
	recount: function() {
		this.target.set(this.source.count(this.filterItem, this.scope));
	}
});
