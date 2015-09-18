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
 * `<T extends JW.Class> extends JW.AbstractCollection.Filterer<T, JW.AbstractSet<T>>`
 *
 * See JW.AbstractCollection.Filterer for details.
 *
 * @extends JW.AbstractCollection.Filterer
 *
 * @constructor
 * Creates synchronizer. JW.AbstractCollection#createFilterer method is preferrable instead.
 * @param {JW.AbstractSet} source `<T>` Source collection.
 * @param {Object} config Configuration (see Config options).
 */
JW.AbstractSet.Filterer = function(source, config) {
	JW.AbstractSet.Filterer._super.call(this, source, config);
	this.target.tryAddAll(source.$toArray().filter(this.filterItem, this.scope));
};

JW.extend(JW.AbstractSet.Filterer, JW.AbstractCollection.Filterer, {
	/**
	 * @cfg {JW.AbstractSet} target `<T>` Target collection.
	 */
	/**
	 * @property {JW.AbstractSet} source `<T>` Source collection.
	 */
	/**
	 * @property {JW.AbstractSet} target `<T>` Target collection.
	 */
	
	// override
	destroyObject: function() {
		this.target.tryRemoveAll(this.source.toArray());
		this._super();
	}
});
