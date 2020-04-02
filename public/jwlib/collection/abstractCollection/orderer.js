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
 * `<T extends JW.Class, C extends JW.AbstractCollection<T>>`
 *
 * Converter to array (orderer). Converts source collection to array.
 * Adds new items to the end of array.
 * If original collection is observable, starts continuous synchronization.
 *
 *     var map = new JW.ObservableMap({a: "A", b: "B"});
 *     var orderer = map.{@link JW.ObservableMap#createOrderer createOrderer}();
 *     var array = orderer.{@link JW.AbstractCollection.Orderer#property-target target};
 *
 *     assert(array.{@link JW.AbstractArray#get get}(0) === "A");
 *     assert(array.{@link JW.AbstractArray#get get}(1) === "B");
 *
 *     // Target array is automatically synchronized with original observable collection
 *     map.{@link JW.AbstractMap#set set}("C", "c");
 *     assert(array.{@link JW.AbstractArray#get get}(2) === "C");
 *
 *     orderer.{@link JW.AbstractCollection.Orderer#destroy destroy}();
 *
 * **Notice:** All items of source collection must be different.
 *
 * Use JW.AbstractCollection#createOrderer method to create the synchronizer.
 * The method will select which synchronizer implementation fits better (simple or observable).
 *
 * You can pass target array in config option:
 *
 *     var array = new JW.Array();
 *     var orderer = collection.{@link JW.AbstractCollection#createOrderer createOrderer}({
 *         {@link JW.AbstractCollection.Orderer#cfg-target target}: array
 *     });
 *
 * In simple cases, JW.AbstractCollection#$$toArray shorthand can be used instead. It returns the target array right away:
 *
 *     var map = new JW.ObservableMap({a: "A", b: "B"});
 *     var array = map.{@link JW.ObservableMap#$$toArray $$toArray}();
 *
 *     assert(array.{@link JW.AbstractArray#get get}(0) === "A");
 *     assert(array.{@link JW.AbstractArray#get get}(1) === "B");
 *
 *     // Target array is automatically synchronized with original observable collection
 *     map.{@link JW.AbstractMap#set set}("C", "c");
 *     assert(array.{@link JW.AbstractArray#get get}(2) === "C");
 *
 *     array.{@link JW.AbstractArray#destroy destroy}();
 *
 * Synchronizer rules:
 *
 * - Target array is stored in {@link #property-target} property.
 * - All items of source collection are added to {@link #property-target}
 * immediately on synchronizer initialization.
 * - All items are removed from {@link #property-target} on synchronizer destruction.
 * - You can pass target array in {@link #cfg-target} config option.
 * In this case, you are responsible for its destruction (though items will be removed
 * automatically on synchronizer destruction anyway).
 * - If {@link #cfg-target} is not passed, it will be created automatically. Synchronizer will select
 * appropriate {@link #property-target} implementation (simple or observable). In this
 * case, {@link #property-target} will be destroyed automatically on synchronizer destruction.
 * - You can convert multiple collections into one array, if all items are different.
 *
 * @extends JW.Class
 *
 * @constructor
 * Creates synchronizer. JW.AbstractCollection#createOrderer method is preferrable instead.
 * @param {JW.AbstractCollection} source `<T>` Source collection.
 * @param {Object} [config] Configuration (see Config options).
 */
JW.AbstractCollection.Orderer = function(source, config) {
	JW.AbstractCollection.Orderer._super.call(this);
	config = config || {};
	this.source = source;
	this._targetCreated = config.target == null;
	this.target = this._targetCreated ? source.createEmptyArray() : config.target;
	this.target.tryAddAll(source.asArray());
};

JW.extend(JW.AbstractCollection.Orderer, JW.Class, {
	/**
	 * @cfg {JW.AbstractArray} target `<T>` Target array.
	 */
	/**
	 * @property {C} source Source collection.
	 */
	/**
	 * @property {JW.AbstractArray} target `<T>` Target array.
	 */
	
	// override
	destroyObject: function() {
		this.target.removeItems(this.source.asArray());
		if (this._targetCreated) {
			this.target.destroy();
		}
		this.source = null;
		this.target = null;
		this._super();
	},
	
	_splice: function(removedItemsSet, addedItemsSet) {
		var filteredItems = this.target.filter(function(item) {
			return !JW.Set.contains(removedItemsSet, item) || JW.Set.contains(addedItemsSet, item);
		}, this);
		var addedItems = JW.Set.$toArray(addedItemsSet).filter(function(item) {
			return !JW.Set.contains(removedItemsSet, item);
		}, this);
		this.target.trySplice(
			this.target.detectFilter(filteredItems) || [],
			[new JW.AbstractArray.IndexItems(filteredItems.length, addedItems)]
		);
	}
});
