﻿/*
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

JW.AbstractArray.Splitter = function(source, config) {
	JW.AbstractArray.Splitter._super.call(this);
	config = config || {};
	this.source = source;
	this.rows = config.rows || this.own(this.source.createEmpty());
	this.capacity = config.capacity || 1;
	this._length = 0;

	this.own(this.source.createInserter({
		addItem    : this._addItem,
		removeItem : this._removeItem,
		clearItems : this._clearItems,
		scope      : this
	}));
};

JW.extend(JW.AbstractArray.Splitter/*<T extends Any, R extends JW.AbstractArray<T>>*/, JW.Class, {
	/*
	Required
	JW.AbstractArray<T> source;

	Optional
	JW.AbstractArray<R> rows;
	number capacity;

	Fields
	number _length;
	*/

	createRow: function() {
		return this.source.createEmpty();
	},

	destroyRow: function(row) {
		row.destroy();
	},

	_addItem: function(item, index) {
		if (this._length % this.capacity === 0) {
			this.rows.tryAdd(this.createRow.call(this.scope || this));
		}
		var firstRow = Math.floor(index / this.capacity);
		for (var i = this.rows.getLength() - 1; i > firstRow; --i) {
			var broughtItem = this.rows.get(i - 1).tryRemove(this.capacity - 1);
			this.rows.get(i).tryAdd(broughtItem, 0);
		}
		this.rows.get(firstRow).tryAdd(item, index % this.capacity);
		++this._length;
	},

	_removeItem: function(item, index) {
		var firstRow = Math.floor(index / this.capacity);
		this.rows.get(firstRow).tryRemove(index % this.capacity);
		for (var i = firstRow + 1; i < this.rows.getLength(); ++i) {
			var broughtItem = this.rows.get(i).tryRemove(0);
			this.rows.get(i - 1).tryAdd(broughtItem, this.capacity - 1);
		}
		--this._length;
		if (this._length % this.capacity === 0) {
			this.destroyRow.call(this.scope || this, this.rows.tryRemove(this.rows.getLength() - 1));
		}
	},

	_clearItems: function() {
		var rows = this.rows.tryClear();
		this._length = 0;
		JW.Array.each(rows, this.destroyRow, this.scope || this);
	}
});
