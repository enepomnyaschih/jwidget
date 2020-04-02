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
 * Collection indexer.
 * Builds new map by rule: key is the result of indexer function call, value is the corresponding item.
 * If original collection is observable, starts continuous synchronization.
 * Can be used for fast item search by key (for example, by ID).
 *
 *     var array = new JW.ObservableArray([{id: 9, label: "The item"}]);
 *     var indexer = array.{@link JW.ObservableArray#createIndexer createIndexer}({
 *         {@link #cfg-getKey getKey}: function(item) { return item.id; },
 *         {@link #cfg-scope scope}: this
 *     });
 *     var map = indexer.{@link #property-target target};
 *
 *     // Get an item with ID = 9
 *     assert(map.{@link JW.AbstractMap#get get}(9).label === "The item");
 *     assert(map.{@link JW.AbstractMap#get get}(5) == null);
 *
 *     // Target map is automatically synchronized with original observable array
 *     array.add({id: 5, label: "New item"});
 *     assert(map.{@link JW.AbstractMap#get get}(5).label === "New item");
 *
 *     indexer.{@link JW.AbstractCollection.Indexer#destroy destroy}();
 *
 * **Notice:** All items of source collection must have different (unique) string keys.
 *
 * Use JW.AbstractCollection#createIndexer method to create the synchronizer.
 * The method will select which synchronizer implementation fits better (simple or observable).
 *
 * You can pass target collection in config option:
 *
 *     var map = new JW.Map();
 *     var indexer = collection.{@link JW.AbstractCollection#createIndexer createIndexer}({
 *         {@link #cfg-target target}: map,
 *         {@link #cfg-getKey getKey}: function(item) { return item.id; },
 *         {@link #cfg-scope scope}: this
 *     });
 *
 * In simple cases, JW.AbstractCollection#$$index shorthand can be used instead. It returns the target map right away:
 *
 *     var array = new JW.ObservableArray([{id: 9, label: "The item"}]);
 *     var map = array.{@link JW.AbstractCollection#$$index $$index}(function(item) { return item.id; });
 *
 *     // Get an item with ID = 9
 *     assert(map.{@link JW.AbstractMap#get get}(9).label === "The item");
 *     assert(map.{@link JW.AbstractMap#get get}(5) == null);
 *
 *     // Target map is automatically synchronized with original observable array
 *     array.add({id: 5, label: "New item"});
 *     assert(map.{@link JW.AbstractMap#get get}(5).label === "New item");
 *
 *     map.{@link JW.AbstractMap#destroy destroy}();
 *
 * Synchronizer rules:
 *
 * - Target map is stored in {@link #property-target} property.
 * - All items of source collection are added to {@link #property-target} immediately on synchronizer initialization.
 * - All items are removed from {@link #property-target} on synchronizer destruction.
 * - You can pass target map in {@link #cfg-target} config option.
 * In this case, you are responsible for its destruction (though items will be removed
 * automatically on synchronizer destruction anyway).
 * - If {@link #cfg-target} is not passed, it will be created automatically. Synchronizer will select
 * appropriate {@link #property-target} implementation (simple or observable). In this
 * case, {@link #property-target} will be destroyed automatically on synchronizer destruction.
 * - You can index multiple collections into one map, if keys of all items are different.
 *
 * @extends JW.Class
 *
 * @constructor
 * Creates synchronizer. JW.AbstractCollection#createIndexer method is preferrable instead.
 * @param {JW.AbstractCollection} source `<T>` Source collection.
 * @param {Object} config Configuration (see Config options).
 */
JW.AbstractCollection.Indexer = function(source, config) {
	JW.AbstractCollection.Indexer._super.call(this);
	config = config || {};
	this.source = source;
	this.getKey = config.getKey;
	this._targetCreated = config.target == null;
	this.target = this._targetCreated ? source.createEmptyMap() : config.target;
	this.scope = config.scope || this;
	this.target.trySetAll(this._index(source.asArray()));
};

JW.extend(JW.AbstractCollection.Indexer, JW.Class, {
	/**
	 * @cfg {JW.AbstractMap} target `<T>` Target map.
	 */
	/**
	 * @cfg {Function} getKey (required)
	 *
	 * `getKey(item: T): string`
	 *
	 * Indexing function. Determines item key in map.
	 */
	/**
	 * @cfg {Object} scope {@link #cfg-getKey} call scope.
	 */
	/**
	 * @property {C} source Source collection.
	 */
	/**
	 * @property {JW.AbstractMap} target `<T>` Target map.
	 */
	
	// override
	destroyObject: function() {
		this.target.tryRemoveAll(this._keys(this.source.asArray()));
		if (this._targetCreated) {
			this.target.destroy();
		}
		this.source = null;
		this.getKey = null;
		this.target = null;
		this.scope = null;
		this._super();
	},
	
	_index: function(items) {
		var index = {};
		for (var i = 0, l = items.length; i < l; ++i) {
			var item = items[i];
			index[this.getKey.call(this.scope, item)] = item;
		}
		return index;
	},
	
	_keys: function(items) {
		var keys = [];
		for (var i = 0, l = items.length; i < l; ++i) {
			keys.push(this.getKey.call(this.scope, items[i]));
		}
		return keys;
	}
});
