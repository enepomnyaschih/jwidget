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
 * Array reverser. Builds array containing all items of source array in reversed order.
 * If original collection is observable, starts continuous synchronization.
 *
 *     var source = new JW.ObservableArray([1, 2, 3]);
 *     var reverser = source.{@link JW.AbstractArray#createReverser createReverser}();
 *     var target = reverser.{@link #property-target target};
 *     assert(target.{@link JW.AbstractArray#equal equal}([3, 2, 1]));
 *
 *     source.{@link JW.AbstractArray#add add}(4);
 *     assert(target.{@link JW.AbstractArray#equal equal}([4, 3, 2, 1]));
 *
 *     source.{@link JW.AbstractArray#remove remove}(2);
 *     assert(target.{@link JW.AbstractArray#equal equal}([4, 2, 1]));
 *
 *     reverser.{@link JW.AbstractArray.Reverser#destroy destroy}();
 * 
 * Use JW.AbstractArray#createReverser method to create the synchronizer.
 * The method will select which synchronizer implementation fits better (simple or observable).
 *
 * You can pass target array in config option:
 *
 *     var source = new JW.Array();
 *     var target = new JW.Array();
 *     var reverser = source.{@link JW.AbstractArray#createReverser createReverser}({
 *         {@link #cfg-target target}: target
 *     });
 *
 * In simple cases, JW.AbstractArray#$$toReversed shorthand can be used instead. It returns the target array right away:
 *
 *     var source = new JW.ObservableArray([1, 2, 3]);
 *     var target = source.{@link JW.AbstractArray#$$toReversed $$toReversed}();
 *     assert(target.{@link JW.AbstractArray#equal equal}([3, 2, 1]));
 *
 *     source.{@link JW.AbstractArray#add add}(4);
 *     assert(target.{@link JW.AbstractArray#equal equal}([4, 3, 2, 1]));
 *
 *     source.{@link JW.AbstractArray#remove remove}(2);
 *     assert(target.{@link JW.AbstractArray#equal equal}([4, 2, 1]));
 *
 *     target.{@link JW.AbstractArray#destroy destroy}();
 *
 * Synchronizer rules:
 *
 * - Target array is stored in {@link #property-target} property.
 * - Target array must be empty before initialization.
 * - You can't modify target array manually and/or create other synchronizers with the same target array.
 * - All items of source array are added to {@link #property-target}
 * immediately on synchronizer initialization.
 * - All items are removed from {@link #property-target} on synchronizer destruction.
 * - You can pass target array in {@link #cfg-target} config option.
 * In this case, you are responsible for its destruction (though items will be removed
 * automatically on synchronizer destruction anyway).
 * - If {@link #cfg-target} is not passed, it will be created automatically. Synchronizer will select
 * appropriate {@link #property-target} implementation (simple or observable). In this
 * case, {@link #property-target} will be destroyed automatically on synchronizer destruction.
 *
 * @extends JW.Class
 *
 * @constructor
 * Creates synchronizer. JW.AbstractArray#createReverser method is preferrable instead.
 * @param {JW.AbstractArray} source `<T>` Source array.
 * @param {Object} [config] Configuration (see Config options).
 */
JW.AbstractArray.Reverser = function(source, config) {
	JW.AbstractArray.Reverser._super.call(this);
	config = config || {};
	this.source = source;
	this._targetCreated = config.target == null;
	this.target = this._targetCreated ? source.createEmpty() : config.target;
	this.target.tryAddAll(this._reverse(source.getItems()));
};

JW.extend(JW.AbstractArray.Reverser, JW.Class, {
	/**
	 * @cfg {JW.AbstractArray} target `<T>` Target array.
	 */
	/**
	 * @property {JW.AbstractArray} source `<T>` Source array.
	 */
	/**
	 * @property {JW.AbstractArray} target `<T>` Target array.
	 */
	
	// override
	destroyObject: function() {
		this.target.tryClear();
		if (this._targetCreated) {
			this.target.destroy();
		}
		this.source = null;
		this.target = null;
		this._super();
	},
	
	_reverse: function(items) {
		items = items.concat();
		items.reverse();
		return items;
	}
});
