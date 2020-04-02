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
