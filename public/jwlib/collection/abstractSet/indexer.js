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

// TODO: Introduce addAll, setAll, removeAll to fix "change" event hacks

JW.AbstractSet.Indexer = function(source, config) {
	JW.AbstractSet.Indexer._super.call(this);
	config = config || {};
	this.source = source;
	this.getKey = config.getKey;
	this._targetCreated = !config.target;
	this.target = config.target || source.createEmptyMap();
	this.scope = config.scope;
	if (!this.source.isEmpty()) {
		this.source.every(this._add, this);
		this._change();
	}
};

JW.extend(JW.AbstractSet.Indexer/*<T extends JW.Class>*/, JW.Class, {
	/*
	Required
	JW.AbstractSet<T> source;
	String getKey(T item);
	
	Optional
	JW.AbstractMap<T> target;
	Object scope;
	
	Fields
	Boolean _targetCreated;
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
	
	_add: function(item) {
		this.target._set(item, this.getKey.call(this.scope || this, item));
	},
	
	_remove: function(item) {
		this.target._remove(this.getKey.call(this.scope || this, item));
	},
	
	_change: function() {}
});
