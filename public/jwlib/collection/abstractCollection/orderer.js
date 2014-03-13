﻿/*
	jWidget Lib source file.
	
	Copyright (C) 2014 Egor Nepomnyaschih
	
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
 * `<T extends JW.Class, C extends JW.AbstractCollection<T>>`
 *
 * Converter to array (orderer).
 * Converts source collection to array. Adds new items to the end of array.
 *
 *     var orderer = collection.{@link JW.AbstractCollection#createOrderer createOrderer}();
 *     var array = orderer.{@link #property-target target};
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
 *         {@link #cfg-target target}: array
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
 * - You can convert multiple collections into one array, if all items are different.
 *
 * @extends JW.Class
 *
 * @constructor
 * Creates synchronizer. JW.AbstractCollection#createOrderer method is preferrable instead.
 * @param {JW.AbstractCollection} source `<T>` Source collection.
 * @param {Object} config Configuration (see Config options).
 */
JW.AbstractCollection.Orderer = function(source, config) {
	JW.AbstractCollection.Orderer._super.call(this);
	config = config || {};
	this.source = source;
	this.target = config.target || this.own(source.createEmptyArray());
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
	destroy: function() {
		this.target.removeItems(this.source.asArray());
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
