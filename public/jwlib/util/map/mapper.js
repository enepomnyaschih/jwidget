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

JW.Map.Mapper = function(config) {
	this.source = null;
	JW.Map.Mapper.superclass.call(this, config);
	this._targetCreated = !this.target;
	if (this._targetCreated) {
		this.target = new JW.Map();
	}
	this._addEventAttachment = this.source.addEvent.bind(this._onAdd, this);
	this._removeEventAttachment = this.source.removeEvent.bind(this._onRemove, this);
	this.source.every(this._add, this);
};

JW.extend(JW.Map.Mapper/*<S extends JW.Class, T extends JW.Class>*/, JW.Config, {
	/*
	Required
	JW.Map<S> source;
	
	Optional
	JW.Map<T> target;
	Object scope; // defaults to this
	
	Abstract methods
	T createItem(S data, String key);
	void destroyItem(T item, S data, String key);
	
	Fields
	Boolean _targetCreated;
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
	
	_add: function(data, key) {
		var item = this.createItem.call(this.scope || this, data, key);
		this.target.set(item, key);
		return true;
	},
	
	_remove: function(data, key) {
		var item = this.target.get(key);
		this.target.remove(item);
		this.destroyItem.call(this.scope || this, item, data, key);
		return true;
	},
	
	_onAdd: function(params) {
		this._add(params.item, params.key);
	},
	
	_onRemove: function(params) {
		this._remove(params.item, params.key);
	}
});
