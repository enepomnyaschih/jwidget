/*
	jWidget Lib source file.
	
	Copyright (C) 2015 Egor Nepomnyaschih
	
	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU Lesser General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.
	
	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU Lesser General Public License for more details.
	
	You should have received a copy of the GNU Lesser General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.
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
