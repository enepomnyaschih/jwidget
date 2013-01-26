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
	JW.Map.Mapper._super.call(this);
	this.source = config.source;
	this.createItem = config.createItem;
	this.destroyItem = config.destroyItem;
	this._targetCreated = !config.target;
	this.target = config.target || new JW.Map();
	this.scope = config.scope;
	this._addEventAttachment = this.source.addEvent.bind(this._onAdd, this);
	this._removeEventAttachment = this.source.removeEvent.bind(this._onRemove, this);
	this._changeEventAttachment = this.source.changeEvent.bind(this._onChange, this);
	this._destructionQueue = [];
	this.source.every(this._add, this);
	this._change();
};

JW.extend(JW.Map.Mapper/*<S extends Any, T extends Any>*/, JW.Class, {
	/*
	Required
	JW.Map<S> source;
	T createItem(S data, String key);
	void destroyItem(T item, S data, String key);
	
	Optional
	JW.Map<T> target;
	Object scope; // defaults to this
	
	Fields
	Boolean _targetCreated;
	EventAttachment _addEventAttachment;
	EventAttachment _removeEventAttachment;
	EventAttachment _changeEventAttachment;
	Array<Array> _destructionQueue;
	*/
	
	destroy: function() {
		this.source.every(this._remove, this);
		this._change();
		this._changeEventAttachment.destroy();
		this._removeEventAttachment.destroy();
		this._addEventAttachment.destroy();
		if (this._targetCreated) {
			this.target.destroy();
		}
		this._super();
	},
	
	_add: function(data, key) {
		var item = this.createItem.call(this.scope || this, data, key);
		this.target._set(item, key);
		return true;
	},
	
	_remove: function(data, key) {
		var item = this.target._remove(key);
		this._destructionQueue.push([ item, data, key ]);
		return true;
	},
	
	_change: function() {
		this.target._triggerChange();
		for (var i = 0; i < this._destructionQueue.length; ++i) {
			var params = this._destructionQueue[i];
			this.destroyItem.call(this.scope || this, params[0], params[1], params[2]);
		}
		this._destructionQueue = [];
	},
	
	_onAdd: function(params) {
		this._add(params.item, params.key);
	},
	
	_onRemove: function(params) {
		this._remove(params.item, params.key);
	},
	
	_onChange: function(params) {
		this._change();
	}
});
