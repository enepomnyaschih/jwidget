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

JW.AbstractArray.Mapper = function(source, config) {
	JW.AbstractArray.Mapper._super.call(this);
	config = config || {};
	this.source = source;
	this.createItem = config.createItem;
	this.destroyItem = config.destroyItem;
	this._targetCreated = !config.target;
	this.target = config.target || this.source.createEmpty();
	this.scope = config.scope || this;
	this.target.addAll(JW.Array.map(this.source.getItems(), this.createItem, this.scope));
};

JW.extend(JW.AbstractArray.Mapper/*<S, T>*/, JW.Class, {
	/*
	Required
	JW.AbstractArray<S> source;
	T createItem(S data);
	void destroyItem(T item, S data);
	
	Optional
	JW.AbstractArray<T> target;
	Object scope; // defaults to this
	
	Fields
	Boolean _targetCreated;
	*/
	
	destroy: function() {
		this._clearItems(this.source.getItems());
		if (this._targetCreated) {
			this.target.destroy();
		}
		this._super();
	},
	
	_clearItems: function(datas) {
		var items = this.target.clearItems();
		for (var i = items.length - 1; i >= 0; --i) {
			this.destroyItem.call(this.scope, items[i], datas[i]);
		}
	}
});
