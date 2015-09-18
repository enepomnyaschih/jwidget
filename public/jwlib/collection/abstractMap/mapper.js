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
 * `<T, U> extends JW.AbstractCollection.Mapper<T, U, JW.AbstractMap<T>, JW.AbstractMap<U>>`
 *
 * See JW.AbstractCollection.Mapper for details.
 *
 * @extends JW.AbstractCollection.Mapper
 *
 * @constructor
 * Creates synchronizer. JW.AbstractCollection#createMapper method is preferrable instead.
 * @param {JW.AbstractMap} source `<T>` Source collection.
 * @param {Object} config Configuration (see Config options).
 */
JW.AbstractMap.Mapper = function(source, config) {
	JW.AbstractMap.Mapper._super.call(this, source, config);
	this.target.trySetAll(this._createItems(source.getJson()));
};

JW.extend(JW.AbstractMap.Mapper, JW.AbstractCollection.Mapper, {
	/**
	 * @cfg {JW.AbstractMap} target `<U>` Target collection.
	 */
	/**
	 * @property {JW.AbstractMap} source `<T>` Source collection.
	 */
	/**
	 * @property {JW.AbstractMap} target `<U>` Target collection.
	 */
	
	// override
	destroyObject: function() {
		this._destroyItems(this.target.removeAllVerbose(this.source.getKeys()), this.source.getJson());
		this._super();
	},
	
	_createItems: function(datas) {
		var items = {};
		for (var key in datas) {
			items[key] = this.createItem.call(this.scope, datas[key]);
		}
		return items;
	},
	
	_destroyItems: function(items, datas) {
		if (this.destroyItem === undefined) {
			return;
		}
		for (var key in items) {
			this.destroyItem.call(this.scope, items[key], datas[key]);
		}
	}
});
