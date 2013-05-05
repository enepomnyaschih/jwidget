﻿/*
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

JW.AbstractMap.Inserter = function(source, config) {
	JW.AbstractMap.Inserter._super.call(this);
	config = config || {};
	this.source = source;
	this.addItem = config.addItem;
	this.removeItem = config.removeItem;
	this.scope = config.scope || this;
	this.clearItems = config.clearItems;
	this._addItems(this.source.getJson());
};

JW.extend(JW.AbstractMap.Inserter/*<T>*/, JW.Class, {
	/*
	Required
	JW.AbstractMap<T> source;
	void addItem(T item, String key);
	void removeItem(String key, T item);
	
	Optional
	Object scope; // defaults to this
	void clearItems(Map<T> items);
	*/
	
	destroy: function() {
		this._clearItems(this.source.getJson());
		this._super();
	},
	
	_addItems: function(items) {
		for (var key in items) {
			this.addItem.call(this.scope, items[key], key);
		}
	},
	
	_removeItems: function(items) {
		for (var key in items) {
			this.removeItem.call(this.scope, key, items[key]);
		}
	},
	
	_clearItems: function(items) {
		if (JW.Map.isEmpty(items)) {
			return;
		}
		if (this.clearItems) {
			this.clearItems.call(this.scope || this, items);
		} else {
			this._removeItems(items);
		}
	}
});
