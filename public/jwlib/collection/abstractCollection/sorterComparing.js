/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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
 * `<T, C extends JW.AbstractCollection<T>>`
 *
 * Converter to array (sorter by comparer).
 * Converts source collection to array. Adds new items into such locations that target array is always kept in sorted
 * state. Sorting is performed by comparing function defined by user.
 *
 *     var sorter = collection.{@link JW.AbstractCollection#createSorterComparing createSorterComparing}({
 *         {@link #cfg-compare compare}: function(x, y) {
 *             return JW.cmp(x.title, y.title, true) || JW.cmp(x.id, y.id);
 *         },
 *         {@link #cfg-scope scope}: this
 *     });
 *     var array = sorter.{@link #property-target target};
 *
 * Use JW.AbstractCollection#createOrderer method to create the synchronizer.
 * The method will select which synchronizer implementation fits better (simple or observable).
 *
 * You can pass target array in config option:
 *
 *     var array = new JW.Array();
 *     var sorter = collection.{@link JW.AbstractCollection#createSorterComparing createSorterComparing}({
 *         {@link #cfg-target target}: array,
 *         {@link #cfg-compare compare}: function(x, y) {
 *             return JW.cmp(x.title, y.title, true) || JW.cmp(x.id, y.id);
 *         },
 *         {@link #cfg-scope scope}: this
 *     });
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
 * - You can sort multiple collections into one array.
 *
 * @extends JW.Class
 *
 * @constructor
 * Creates synchronizer. JW.AbstractCollection#createSorterComparing method is preferrable instead.
 * @param {JW.AbstractCollection} source `<T>` Source collection.
 * @param {Object} config Configuration (see Config options).
 */
JW.AbstractCollection.SorterComparing = function(source, config) {
	JW.AbstractCollection.SorterComparing._super.call(this);
	config = config || {};
	this.source = source;
	this.compare = config.compare || JW.cmp;
	this.scope = config.scope || this;
	var scope = this.scope;
	var compare = this.compare;
	this._targetCreated = !config.target;
	this.target = this._targetCreated ? source.createEmptyArray() : config.target;
	this._splice([], source.asArray());
};

JW.extend(JW.AbstractCollection.SorterComparing, JW.Class, {
	/**
	 * @cfg {JW.AbstractArray} target `<T>` Target array.
	 */
	/**
	 * @cfg {Function} compare
	 *
	 * `compare(t1: T, t2: T): number`
	 *
	 * Comparing function. Defaults to JW.cmp.
	 */
	/**
	 * @cfg {Object} scope {@link #compare} call scope.
	 */
	/**
	 * @property {C} source Source collection.
	 */
	/**
	 * @property {JW.AbstractArray} target `<T>` Target array.
	 */
	// boolean _targetCreated;
	
	// override
	destroy: function() {
		this._splice(this.source.asArray(), []);
		if (this._targetCreated) {
			this.target.destroy();
		}
		this._super();
	},
	
	/**
	 * Resorts target array. Call this method after sorting factors modification.
	 * @returns {void}
	 */
	resort: function() {
		this.target.sortComparing(this.compare, this.scope);
	},
	
	_splice: function(removedItems, addedItems) {
		var removedItemsSorted = JW.Array.toSortedComparing(removedItems, this.compare, this.scope);
		var addedItemsSorted = JW.Array.toSortedComparing(addedItems, this.compare, this.scope);
		removedItems = new Array(removedItems.length);
		addedItems = new Array(addedItems.length);
		var iRemoved = 0;
		var iAdded = 0;
		var jRemoved = 0;
		var jAdded = 0;
		// ignore out the items which are removed and added at the same time
		while ((iRemoved < removedItemsSorted.length) || (iAdded < addedItemsSorted.length)) {
			var removedItem = removedItemsSorted[iRemoved];
			var addedItem = addedItemsSorted[iAdded];
			var c = JW.cmp(removedItem === undefined, addedItem === undefined) ||
				this.compare.call(this.scope, removedItem, addedItem);
			if (c < 0) {
				removedItems[jRemoved++] = removedItem;
				++iRemoved;
			} else if (c > 0) {
				addedItems[jAdded++] = addedItem;
				++iAdded;
			} else {
				++iRemoved;
				++iAdded;
			}
		}
		removedItems.splice(jRemoved, removedItems.length - jRemoved);
		addedItems.splice(jAdded, addedItems.length - jAdded);
		
		var iAdds = 0;
		var addShift = 0;
		var removeParamsList = [];
		var addParamsList = [];
		var removeParams = null;
		for (iTarget = 0, lTarget = this.target.getLength(); iTarget < lTarget; ++iTarget) {
			var value = this.target.get(iTarget);
			if (removedItems[JW.Array.binarySearch(removedItems, value, this.compare, this.scope) - 1] === value) {
				if (!removeParams) {
					removeParams = new JW.AbstractArray.IndexCount(iTarget, 0);
					removeParamsList.push(removeParams);
				}
				++removeParams.count;
				--addShift;
			} else {
				removeParams = null;
				var addParams = new JW.AbstractArray.IndexItems(iTarget + addShift, []);
				while ((iAdds < addedItems.length) && (this.compare.call(this.scope, addedItems[iAdds], value) < 0)) {
					addParams.items.push(addedItems[iAdds++]);
					++addShift;
				}
				if (addParams.items.length !== 0) {
					addParamsList.push(addParams);
				}
			}
		}
		if (iAdds < addedItems.length) {
			addParamsList.push(new JW.AbstractArray.IndexItems(iTarget + addShift, addedItems.slice(iAdds)));
		}
		this.target.splice(removeParamsList, addParamsList);
	}
});
