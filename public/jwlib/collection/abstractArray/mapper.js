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
 * `<T, U> extends JW.AbstractCollection.Mapper<T, U, JW.AbstractArray<T>, JW.AbstractArray<U>>`
 *
 * See JW.AbstractCollection.Mapper for details.
 *
 * @extends JW.AbstractCollection.Mapper
 *
 * @constructor
 * Creates synchronizer. JW.AbstractCollection#createMapper method is preferrable instead.
 * @param {JW.AbstractArray} source `<T>` Source collection.
 * @param {Object} config Configuration (see Config options).
 */
JW.AbstractArray.Mapper = function(source, config) {
	JW.AbstractArray.Mapper._super.call(this, source, config);
	this.target.tryAddAll(this._createItems(this.source.getItems()));
};

JW.extend(JW.AbstractArray.Mapper, JW.AbstractCollection.Mapper, {
	/**
	 * @cfg {JW.AbstractArray} target `<U>` Target array.
	 */
	/**
	 * @property {JW.AbstractArray} source `<T>` Source array.
	 */
	/**
	 * @property {JW.AbstractArray} target `<U>` Target array.
	 */
	
	// override
	destroyObject: function() {
		this._destroyItems(this.target.clear(), this.source.getItems());
		this._super();
	},
	
	_createItems: function(datas) {
		var items = [];
		for (var i = 0, l = datas.length; i < l; ++i) {
			items.push(this.createItem.call(this.scope, datas[i]));
		}
		return items;
	},
	
	_destroyItems: function(items, datas) {
		if (this.destroyItem === undefined) {
			return;
		}
		for (var i = items.length - 1; i >= 0; --i) {
			this.destroyItem.call(this.scope, items[i], datas[i]);
		}
	}
});
