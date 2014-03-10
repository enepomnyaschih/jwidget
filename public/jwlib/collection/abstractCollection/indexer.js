﻿/*
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
 * Collection indexer.
 * Builds new map by rule: key is the result of indexer function call, value is the corresponding item.
 * Can be used for fast item search by key (for example, by ID).
 *
 *     var indexer = collection.{@link JW.AbstractCollection#createIndexer createIndexer}({
 *         {@link #cfg-getKey getKey}: function(item) { return item.id; },
 *         {@link #cfg-scope scope}: this
 *     });
 *     var map = indexer.{@link #property-target target};
 *     
 *     // Get an item with ID = 9
 *     var item = map.{@link JW.AbstractMap#get get}(9);
 *
 * **Notice:** All items of source collection must have different keys.
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
	this.target = config.target || this.own(source.createEmptyMap());
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
	destroy: function() {
		this.target.tryRemoveAll(this._keys(this.source.asArray()));
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
