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

JW.Set.Mapper = function(config) {
	this.source = null;
	JW.Set.Mapper.superclass.call(this, config);
	this._targetCreated = !this.target;
	if (this._targetCreated) {
		this.target = new JW.Set();
	}
	this._items = {};
	this._addEventAttachment = this.source.addEvent.bind(this._onAdd, this);
	this._removeEventAttachment = this.source.removeEvent.bind(this._onRemove, this);
	this.source.every(this._add, this);
};

JW.extend(JW.Set.Mapper/*<S extends JW.Class, T extends JW.Class>*/, JW.Config, {
	/*
	Required
	JW.Set<S> source;
	
	Optional
	JW.Set<T> target;
	Object scope; // defaults to this
	
	Abstract methods
	T createItem(S data);
	void destroyItem(T item, S data);
	
	Fields
	Boolean _targetCreated;
	Map<T> _items;
	EventAttachment _addEventAttachment;
	EventAttachment _removeEventAttachment;
	*/
	
	destroy: function() {
		this.source.every(this._remove, this);
		this._removeEventAttachment.destroy();
		this._addEventAttachment.destroy();
		if (this._targetCreated) {
			this.target.destroy();
		}
		this._super();
	},
	
	_add: function(data) {
		var item = this.createItem.call(this.scope || this, data);
		this.target.add(item);
		this._items[data._iid] = item;
		return true;
	},
	
	_remove: function(data) {
		var item = this._items[data._iid];
		delete this._items[data._iid];
		this.target.remove(item);
		this.destroyItem.call(this.scope || this, item, data);
		return true;
	},
	
	_onAdd: function(params) {
		this._add(params.item);
	},
	
	_onRemove: function(params) {
		this._remove(params.item);
	}
});
