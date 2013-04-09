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

JW.AbstractArray.Observer = function(source, config) {
	JW.AbstractArray.Observer._super.call(this);
	config = config || {};
	this.source = source;
	this.addItem = config.addItem;
	this.removeItem = config.removeItem;
	this.clearItems = config.clearItems;
	this.scope = config.scope || this;
	this._fill();
};

JW.extend(JW.AbstractArray.Observer/*<T>*/, JW.Class, {
	/*
	Required
	JW.AbstractArray<T> source;
	void addItem(T item);
	void removeItem(T item);
	
	Optional
	void clearItems(Array<T> items);
	Object scope;
	*/
	
	// override
	destroy: function() {
		this._clear(this.source.getItems());
		this._super();
	},
	
	_addItem: function(item) {
		if (this.addItem) {
			this.addItem.call(this.scope || this, item);
		}
	},
	
	_removeItem: function(item) {
		if (this.removeItem) {
			this.removeItem.call(this.scope || this, item);
		}
	},
	
	_fill: function() {
		this.source.every(this._addItem, this);
	},
	
	_clear: function(items) {
		if (items.length === 0) {
			return;
		}
		if (this.clearItems) {
			this.clearItems.call(this.scope || this, items);
		} else {
			JW.Array.backEvery(items, this._removeItem, this);
		}
	}
});
