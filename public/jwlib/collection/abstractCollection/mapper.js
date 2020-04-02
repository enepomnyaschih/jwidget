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
 * `<T, U, TC extends JW.AbstractCollection<T>, UC extends JW.AbstractCollection<U>>`
 *
 * Collection item converter.
 * Builds new collection of the same type, consisting of results of callback function
 * call for each collection item.
 * If original collection is observable, starts continuous synchronization.
 *
 *     var source = new JW.ObservableArray([1, 2]);
 *     var mapper = source.{@link JW.ObservableArray#createMapper createMapper}({
 *         {@link #cfg-createItem createItem}: function(x) { return 2 * x }
 *     });
 *     var target = source.{@link #property-target target};
 *
 *     assert(target.{@link JW.ObservableArray#get get}(0) === 2);
 *     assert(target.{@link JW.ObservableArray#get get}(1) === 4);
 *
 *     // Target collection is automatically synchronized with original observable collection
 *     source.add(3);
 *     assert(target.{@link JW.ObservableArray#get get}(2) === 6);
 *
 *     mapper.{@link JW.AbstractCollection.Mapper#destroy destroy}();
 *
 * Can be used for data convertion into view.
 *
 *     var mapper = dataCollection.{@link JW.AbstractCollection#createMapper createMapper}({
 *         {@link #cfg-createItem createItem}: function(data) { return new View(this, data); },
 *         {@link #cfg-destroyItem destroyItem}: JW.destroy,
 *         {@link #cfg-scope scope}: this
 *     });
 *     var viewCollection = mapper.{@link #property-target target};
 *
 * Use JW.AbstractCollection#createMapper method to create the synchronizer.
 * The method will select which synchronizer implementation fits better (simple or observable).
 *
 * You can pass target collection in config option:
 *
 *     var viewCollection = new JW.Array();
 *     var mapper = dataCollection.{@link JW.AbstractCollection#createMapper createMapper}({
 *         {@link #cfg-target target}: viewCollection,
 *         {@link #cfg-createItem createItem}: function(data) { return new View(this, data); },
 *         {@link #cfg-destroyItem destroyItem}: JW.destroy,
 *         {@link #cfg-scope scope}: this
 *     });
 *
 * In simple cases, JW.AbstractCollection#$$mapValues and JW.AbstractCollection#$$mapObjects shorthand methods
 * can be used instead. They return the target collection right away:
 *
 *     var viewCollection = dataCollection.{@link JW.AbstractCollection#$$mapObjects $$mapObjects}(function(data) {
 *         return new View(this, data);
 *     }, this);
 *
 *     // Once not needed anymore, destroy
 *     viewCollection.{@link JW.AbstractCollection#destroy destroy}();
 *
 * Synchronizer rules:
 *
 * - Target collection is stored in {@link #property-target} property.
 * - All items of source collection are converted and added to {@link #property-target}
 * immediately on synchronizer initialization.
 * - All items are removed from {@link #property-target} and destroyed on synchronizer destruction.
 * - You can pass target map in {@link #cfg-target} config option.
 * In this case, you are responsible for its destruction (though items will be removed and destroyed
 * automatically on synchronizer destruction anyway).
 * - If {@link #cfg-target} is not passed, it will be created automatically. Synchronizer will select
 * appropriate {@link #property-target} implementation (simple or observable). In this
 * case, {@link #property-target} will be destroyed automatically on synchronizer destruction.
 * - The items are not recreated in target collection on source items reordering/reindexing,
 * but they are reordered/reindexed according to source collection modification.
 *
 * **Additional rules for different collection types**
 *
 * JW.AbstractArray:
 *
 * - Target collection must be empty before initialization.
 * - You can't modify target collection manually and/or create other synchronizers with the same target collection.
 *
 * JW.AbstractMap:
 *
 * - A target collection can be synchronized with multiple source collections, if keys of all items are different.
 * - You can add items to target collection manually, if their keys differ from other collection keys.
 *
 * JW.AbstractSet:
 *
 * - A target collection can be synchronized with multiple source collections, if all items are different.
 * - You can add items to target collection manually, if they differ from other collection items.
 *
 * @extends JW.Class
 *
 * @constructor
 * Creates synchronizer. JW.AbstractCollection#createMapper method is preferrable instead.
 * @param {JW.AbstractCollection} source `<T>` Source collection.
 * @param {Object} config Configuration (see Config options).
 */
JW.AbstractCollection.Mapper = function(source, config) {
	JW.AbstractCollection.Mapper._super.call(this);
	config = config || {};
	this.source = source;
	this.createItem = config.createItem;
	this.destroyItem = config.destroyItem;
	this._targetCreated = config.target == null;
	this.target = this._targetCreated ? this.source.createEmpty() : config.target;
	this.scope = config.scope || this;
};

JW.extend(JW.AbstractCollection.Mapper, JW.Class, {
	/**
	 * @cfg {UC} target Target collection.
	 */
	/**
	 * @cfg {Function} createItem (required)
	 *
	 * `createItem(data: T): U`
	 *
	 * Mapping function. Creates an item of target collection by item of source collection.
	 */
	/**
	 * @cfg {Function} destroyItem
	 *
	 * `destroyItem(item: U, data: T): void`
	 *
	 * Item destructor. Destroys an item of target collection.
	 */
	/**
	 * @cfg {Object} scope {@link #cfg-createItem} and {@link #cfg-destroyItem} call scope.
	 */
	/**
	 * @property {TC} source Source collection.
	 */
	/**
	 * @property {UC} target Target collection.
	 */

	destroyObject: function() {
		if (this._targetCreated) {
			this.target.destroy();
		}
		this.source = null;
		this.createItem = null;
		this.destroyItem = null;
		this.target = null;
		this.scope = null;
		this._super();
	}
});
