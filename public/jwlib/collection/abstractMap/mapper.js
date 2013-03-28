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
	this._destructionQueue = [];
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
	Array<Array> _destructionQueue;
	*/
	
	destroy: function() {
		if (!this.source.isEmpty()) {
			this.source.every(this._remove, this);
			this._change();
		}
		if (this._targetCreated) {
			this.target.destroy();
		}
		this._super();
	},
	
	_remove: function(data, key) {
		this._destructionQueue.push([ this.target._remove(key), data, key ]);
	},
	
	_change: function() {
		for (var i = 0; i < this._destructionQueue.length; ++i) {
			var params = this._destructionQueue[i];
			this.destroyItem.call(this.scope || this, params[0], params[1], params[2]);
		}
		this._destructionQueue = [];
	}
});
