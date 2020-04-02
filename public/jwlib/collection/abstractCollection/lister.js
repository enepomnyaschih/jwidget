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
 * Converter to set.
 * If original collection is observable, starts continuous synchronization.
 * Can be used for fast item existance detection.
 *
 *     // Create two dummy collection items
 *     var x = new JW.Class();
 *     var y = new JW.Class();
 *
 *     // Initialize collection and synchronizer
 *     var array = new JW.ObservableArray([x]);
 *     var lister = array.{@link JW.AbstractCollection#createLister createLister}();
 *     var set = lister.{@link #property-target target};
 *
 *     assert(set.{@link JW.AbstractSet#contains contains}(x));
 *     assert(!set.{@link JW.AbstractSet#contains contains}(y));
 *
 *     // Target set is automatically synchronized with original observable array
 *     array.add(y);
 *     assert(set.{@link JW.AbstractSet#contains contains}(y));
 *
 *     lister.{@link JW.AbstractCollection.Lister#destroy destroy}();
 *
 * **Notice:** All items of source collection must be different (i.e. have unique _iid).
 *
 * Use JW.AbstractCollection#createLister method to create the synchronizer.
 * The method will select which synchronizer implementation fits better (simple or observable).
 *
 * You can pass target collection in config option:
 *
 *     var set = new JW.Set();
 *     var lister = collection.{@link JW.AbstractCollection#createLister createLister}({
 *         {@link #cfg-target target}: set
 *     });
 *
 * In simple cases, JW.AbstractCollection#$$toSet shorthand can be used instead. It returns the target set right away:
 *
 *     // Create two dummy collection items
 *     var x = new JW.Class();
 *     var y = new JW.Class();
 *
 *     // Initialize collections
 *     var array = new JW.ObservableArray([x]);
 *     var set = array.{@link JW.AbstractCollection#$$toSet $$toSet}();
 *
 *     assert(set.{@link JW.AbstractSet#contains contains}(x));
 *     assert(!set.{@link JW.AbstractSet#contains contains}(y));
 *
 *     // Target set is automatically synchronized with original observable array
 *     array.add(y);
 *     assert(set.{@link JW.AbstractSet#contains contains}(y));
 *
 *     set.{@link JW.AbstractSet#destroy destroy}();
 *
 * Synchronizer rules:
 *
 * - Target set is stored in {@link #property-target} property.
 * - All items of source collection are added to {@link #property-target} immediately on synchronizer initialization.
 * - All items are removed from {@link #property-target} on synchronizer destruction.
 * - You can pass target set in {@link #cfg-target} config option.
 * In this case, you are responsible for its destruction (though items will be removed
 * automatically on synchronizer destruction anyway).
 * - If {@link #cfg-target} is not passed, it will be created automatically. Synchronizer will select
 * appropriate {@link #property-target} implementation (simple or observable). In this
 * case, {@link #property-target} will be destroyed automatically on synchronizer destruction.
 * - You can convert multiple collections into one set, if all items are different.
 *
 * @extends JW.Class
 *
 * @constructor
 * Creates synchronizer. JW.AbstractCollection#createLister method is preferrable instead.
 * @param {JW.AbstractCollection} source `<T>` Source collection.
 * @param {Object} [config] Configuration (see Config options).
 */
JW.AbstractCollection.Lister = function(source, config) {
	JW.AbstractCollection.Lister._super.call(this);
	config = config || {};
	this.source = source;
	this._targetCreated = config.target == null;
	this.target = this._targetCreated ? source.createEmptySet() : config.target;
	this.target.tryAddAll(source.asArray());
};

JW.extend(JW.AbstractCollection.Lister, JW.Class, {
	/**
	 * @cfg {JW.AbstractSet} target `<T>` Target set.
	 */
	/**
	 * @property {C} source Source collection.
	 */
	/**
	 * @property {JW.AbstractSet} target `<T>` Target set.
	 */
	
	// override
	destroyObject: function() {
		this.target.tryRemoveAll(this.source.asArray());
		if (this._targetCreated) {
			this.target.destroy();
		}
		this.source = null;
		this.target = null;
		this._super();
	}
});
