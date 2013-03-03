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
	this.source = source;
	this.createItem = config.createItem;
	this.destroyItem = config.destroyItem;
	this._targetCreated = !config.target;
	this.target = config.target || this.source.createEmpty();
	this.scope = config.scope;
	this.target.addAll(this._fill());
};

JW.extend(JW.AbstractArray.Mapper/*<S extends Any, T extends Any>*/, JW.Class, {
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
		this._clear(this.source.getItems());
		if (this._targetCreated) {
			this.target.destroy();
		}
		this._super();
	},
	
	_clear: function(datas) {
		var items = this.target.clear();
		for (var i = items.length - 1; i >= 0; --i) {
			this.destroyItem.call(this.scope || this, items[i], datas[i]);
		}
	},
	
	_fill: function() {
		return JW.Array.map(this.source.getItems(), this.createItem, this.scope || this);
	}
});
