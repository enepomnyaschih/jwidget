/*
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

JW.Array.Splitter = function(source, config) {
	JW.Array.Splitter._super.call(this);
	this.source = source;
	this._rowsCreated = !config.rows;
	this.rows = config.rows || this.source.createEmpty();
	this.capacity = config.capacity || 1;
	this._length = 0;
	
	this._inserter = this.source.createInserter({
		addItem    : this._addItem,
		removeItem : this._removeItem,
		clearItems : this._clearItems,
		scope      : this
	});
};

JW.extend(JW.Array.Splitter/*<T extends Any, R extends JW.Array<T>>*/, JW.Class, {
	/*
	Required
	JW.Array<T> source;
	
	Optional
	JW.Array<R> rows;
	Integer capacity;
	
	Fields
	Boolean _rowsCreated;
	Integer _length;
	JW.Array.Inserter<T> _inserter;
	*/
	
	destroy: function() {
		this._inserter.destroy();
		if (this._rowsCreated) {
			this.rows.destroy();
		}
		this._super();
	},
	
	createRow: function() {
		return this.source.createEmpty();
	},
	
	destroyRow: function(row) {
		row.destroy();
	},
	
	_addItem: function(item, index) {
		if (this._length % this.capacity === 0) {
			this.rows.add(this.createRow.call(this.scope || this));
		}
		var firstRow = Math.floor(index / this.capacity);
		for (var i = this.rows.getLength() - 1; i > firstRow; --i) {
			var broughtItem = this.rows.get(i - 1).remove(this.capacity - 1);
			this.rows.get(i).add(broughtItem, 0);
		}
		this.rows.get(firstRow).add(item, index % this.capacity);
		++this._length;
	},
	
	_removeItem: function(index) {
		var firstRow = Math.floor(index / this.capacity);
		this.rows.get(firstRow).remove(index % this.capacity);
		for (var i = firstRow + 1; i < this.rows.getLength(); ++i) {
			var broughtItem = this.rows.get(i).remove(0);
			this.rows.get(i - 1).add(broughtItem, this.capacity - 1);
		}
		--this._length;
		if (this._length % this.capacity === 0) {
			this.destroyRow.call(this.scope || this, this.rows.remove(this.rows.getLength() - 1));
		}
	},
	
	_clearItems: function() {
		var rows = this.rows.clear();
		this._length = 0;
		JW.Array.each(rows, this.destroyRow, this.scope || this);
	}
});
