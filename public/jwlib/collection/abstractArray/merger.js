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
 * Arrays merger. Builds array consisting of all source collections items in the same order.
 * If any of the original collections is observable, starts continuous synchronization.
 *
 *     var source = new JW.ObservableArray([
 *         new JW.Array([1, 2, 3]),
 *         new JW.ObservableArray(),
 *         new JW.Array([4])
 *     ]);
 *     var merger = source.{@link JW.AbstractArray#createMerger createMerger}();
 *     var target = merger.{@link #property-target target};
 *     assert(target.{@link JW.AbstractArray#equal equal}([1, 2, 3, 4]));
 *
 *     source.{@link JW.AbstractArray#add add}(new JW.Array([5, 6]));
 *     assert(target.{@link JW.AbstractArray#equal equal}([1, 2, 3, 4, 5, 6]));
 *
 *     source.{@link JW.AbstractArray#get get}(1).{@link JW.AbstractArray#addAll addAll}([7, 8, 9]);
 *     assert(target.{@link JW.AbstractArray#equal equal}([1, 2, 3, 7, 8, 9, 4, 5, 6]));
 *
 *     merger.{@link JW.AbstractArray.Merger#destroy destroy}();
 * 
 * Use JW.AbstractArray#createMerger method to create the synchronizer.
 * The method will select which synchronizer implementation fits better (simple or observable).
 *
 * You can pass target array in config option:
 *
 *     var source = new JW.Array();
 *     var target = new JW.Array();
 *     var merger = source.{@link JW.AbstractArray#createMerger createMerger}({
 *         {@link #cfg-target target}: target
 *     });
 *
 * In simple cases, JW.AbstractArray#$$merge shorthand can be used instead. It returns the target array right away:
 *
 *     var source = new JW.ObservableArray([
 *         new JW.Array([1, 2, 3]),
 *         new JW.ObservableArray(),
 *         new JW.Array([4])
 *     ]);
 *     var target = source.{@link JW.AbstractArray#$$merge $$merge}();
 *     assert(target.{@link JW.AbstractArray#equal equal}([1, 2, 3, 4]));
 *
 *     source.{@link JW.AbstractArray#add add}(new JW.Array([5, 6]));
 *     assert(target.{@link JW.AbstractArray#equal equal}([1, 2, 3, 4, 5, 6]));
 *
 *     source.{@link JW.AbstractArray#get get}(1).{@link JW.AbstractArray#addAll addAll}([7, 8, 9]);
 *     assert(target.{@link JW.AbstractArray#equal equal}([1, 2, 3, 7, 8, 9, 4, 5, 6]));
 *
 *     target.{@link JW.AbstractArray#destroy destroy}();
 *
 * Synchronizer rules:
 *
 * - Target array is stored in {@link #property-target} property.
 * - Target array must be empty before initialization.
 * - You can't modify target array manually and/or create other synchronizers with the same target array.
 * - All items of source arrays are added to {@link #property-target}
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
 * Creates synchronizer. JW.AbstractArray#createMerger method is preferrable instead.
 * @param {JW.AbstractArray} source `<T>` Source array.
 * @param {Object} [config] Configuration (see Config options).
 */
JW.AbstractArray.Merger = function(source, config) {
	JW.AbstractArray.Merger._super.call(this);
	config = config || {};
	this.source = source;
	this._targetCreated = config.target == null;
	this.target = this._targetCreated ? source._createMergerTarget() : config.target;
	this._bunches = source.$$mapObjects(function(bunch) {
		return bunch.createMergerBunch(this);
	}, this);
	this.target.tryAddAll(this._getAllItems());
};

JW.extend(JW.AbstractArray.Merger, JW.Class, {
	/**
	 * @cfg {JW.AbstractArray} target `<T>` Target array.
	 */
	/**
	 * @property {JW.AbstractArray} source `<? extends JW.AbstractArray<T>>` Source array.
	 */
	/**
	 * @property {JW.AbstractArray} target `<T>` Target array.
	 */
	
	// override
	destroyObject: function() {
		this.target.tryClear();
		this._bunches.destroy();
		if (this._targetCreated) {
			this.target.destroy();
		}
		this.source = null;
		this.target = null;
		this._bunches = null;
		this._super();
	},
	
	_getAllItems: function() {
		return this._merge(this.source.getItems());
	},
	
	_merge: function(bunches) {
		var items = new Array(this._count(bunches));
		var iItems = 0;
		for (var i = 0, l = bunches.length; i < l; ++i) {
			var bunch = bunches[i].getItems();
			for (var j = 0, m = bunch.length; j < m; ++j) {
				items[iItems++] = bunch[j];
			}
		}
		return items;
	},
	
	_count: function(bunches, index, length) {
		if (index === undefined) {
			index = 0;
		}
		if (length === undefined) {
			length = bunches.length - index;
		}
		var count = 0;
		for (var i = 0; i < length; ++i) {
			count += bunches[index + i].getLength();
		}
		return count;
	}
});
