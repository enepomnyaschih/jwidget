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
 * Converter to set.
 * Can be used for fast item existance detection.
 *
 *     var lister = collection.{@link JW.AbstractCollection#createLister createLister}();
 *     var set = lister.{@link #property-target target};
 *     
 *     // Assert that some item x exists in source collection
 *     assert(set.{@link JW.AbstractSet#contains contains}(x));
 *
 * **Notice:** All items of source collection must be different.
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
 * @param {Object} config Configuration (see Config options).
 */
JW.AbstractCollection.Lister = function(source, config) {
	JW.AbstractCollection.Lister._super.call(this);
	config = config || {};
	this.source = source;
	this.target = config.target || this.own(source.createEmptySet());
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
	destroy: function() {
		this.target.tryRemoveAll(this.source.asArray());
		this._super();
	}
});
