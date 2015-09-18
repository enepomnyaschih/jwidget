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
 * `<T extends JW.Class, U extends JW.Class> extends JW.AbstractCollection.Mapper<T, U, JW.AbstractSet<T>, JW.AbstractSet<U>>`
 *
 * See JW.AbstractCollection.Mapper for details.
 *
 * @extends JW.AbstractCollection.Mapper
 *
 * @constructor
 * Creates synchronizer. JW.AbstractCollection#createMapper method is preferrable instead.
 * @param {JW.AbstractSet} source `<T>` Source collection.
 * @param {Object} config Configuration (see Config options).
 */
JW.AbstractSet.Mapper = function(source, config) {
	JW.AbstractSet.Mapper._super.call(this, source, config);
	this._items = {};
	this.target.tryAddAll(this._createItems(source.toArray()));
};

JW.extend(JW.AbstractSet.Mapper, JW.AbstractCollection.Mapper, {
	/**
	 * @cfg {JW.AbstractSet} target `<U>` Target collection.
	 */
	/**
	 * @property {JW.AbstractSet} source `<T>` Source collection.
	 */
	/**
	 * @property {JW.AbstractSet} target `<U>` Target collection.
	 */
	/*
	Map<T> _items;
	*/
	
	// override
	destroyObject: function() {
		var datas = this.source.toArray();
		this.target.tryRemoveAll(this._getItems(datas));
		this._destroyItems(datas);
		this._super();
	},
	
	_getItems: function(datas) {
		return JW.Array.map(datas, function(data) {
			return this._items[data._iid];
		}, this);
	},
	
	_createItems: function(datas) {
		var items = [];
		for (var i = 0, l = datas.length; i < l; ++i) {
			var data = datas[i];
			var item = this.createItem.call(this.scope || this, data);
			items.push(item);
			this._items[data._iid] = item;
		}
		return items;
	},
	
	_destroyItems: function(datas) {
		if (this.destroyItem === undefined) {
			return
		}
		for (var i = datas.length - 1; i >= 0; --i) {
			var data = datas[i];
			var iid = data._iid;
			var item = this._items[iid];
			delete this._items[iid];
			this.destroyItem.call(this.scope || this, item, data);
		}
	}
});
