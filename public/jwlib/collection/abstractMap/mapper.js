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

JW.AbstractMap.Mapper = function(source, config) {
	JW.AbstractMap.Mapper._super.call(this);
	config = config || {};
	this.source = source;
	this.createItem = config.createItem;
	this.destroyItem = config.destroyItem;
	this._targetCreated = !config.target;
	this.target = config.target || source.createEmpty();
	this.scope = config.scope;
	this.target.setAll(JW.Map.map(this.source.getJson(), this.createItem, this.scope || this));
};

JW.extend(JW.AbstractMap.Mapper/*<S extends Any, T extends Any>*/, JW.Class, {
	/*
	Required
	JW.AbstractMap<S> source;
	T createItem(S data, String key);
	void destroyItem(T item, S data, String key);
	
	Optional
	JW.AbstractMap<T> target;
	Object scope; // defaults to this
	
	Fields
	Boolean _targetCreated;
	*/
	
	_destroyItems: function(items, datas) {
		JW.Map.every(items, function(item, key) {
			this.destroyItem.call(this.scope || this, item, datas[key], key);
		}, this);
	},
	
	destroy: function() {
		var items = this.target.removeAll(this.source.getKeysArray());
		if (items) {
			this._destroyItems(items, this.source.getJson());
		}
		if (this._targetCreated) {
			this.target.destroy();
		}
		this._super();
	}
});
