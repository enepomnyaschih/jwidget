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

JW.AbstractArray.Inserter = function(source, config) {
	JW.AbstractArray.Inserter._super.call(this);
	config = config || {};
	this.source = source;
	this.addItem = config.addItem;
	this.removeItem = config.removeItem;
	this.scope = config.scope;
	this.clearItems = config.clearItems;
	this._fill();
};

JW.extend(JW.AbstractArray.Inserter/*<T extends Any>*/, JW.Class, {
	/*
	Required
	JW.AbstractArray<T> source;
	void addItem(T item, Integer index);
	void removeItem(Integer index, T item);
	
	Optional
	Object scope; // defaults to this
	void clearItems(Array<T> items);
	*/
	
	destroy: function() {
		this._clear(this.source.getItems());
		this._super();
	},
	
	_addItem: function(item, index) {
		this.addItem.call(this.scope || this, item, index);
	},
	
	_addItems: function(items, index) {
		for (var i = 0; i < items.length; ++i) {
			this._addItem(items[i], i + index);
		}
	},
	
	_removeItem: function(item, index) {
		this.removeItem.call(this.scope || this, index, item);
	},
	
	_removeItems: function(items, index) {
		for (var i = items.length - 1; i >= 0; --i) {
			this._removeItem(items[i], i + index);
		}
	},
	
	_fill: function() {
		this._addItems(this.source.getItems().concat(), 0);
	},
	
	_clear: function(items) {
		if (items.length === 0) {
			return;
		}
		if (this.clearItems) {
			this.clearItems.call(this.scope || this, items);
		} else {
			this._removeItems(items, 0);
		}
	}
});
