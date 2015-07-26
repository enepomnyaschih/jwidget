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
