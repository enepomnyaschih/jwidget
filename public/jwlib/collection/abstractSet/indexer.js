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

JW.AbstractSet.Indexer = function(source, config) {
	JW.AbstractSet.Indexer._super.call(this);
	config = config || {};
	this.source = source;
	this.getKey = config.getKey;
	this._targetCreated = !config.target;
	this.target = config.target || source.createEmptyMap();
	this.scope = config.scope || this;
	this.target.setAll(this._index(source.getValuesArray()));
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
	
	// override
	destroy: function() {
		this.target.removeAll(this._keys(this.source.getValuesArray()));
		if (this._targetCreated) {
			this.target.destroy();
		}
		this._super();
	},
	
	_index: function(items) {
		var index = {};
		for (var i = 0, l = items.length; i < l; ++i) {
			var item = items[i];
			index[this.getKey.call(this.scope, item)] = item;
		}
		return index;
	},
	
	_keys: function(items) {
		var keys = [];
		for (var i = 0, l = items.length; i < l; ++i) {
			keys.push(this.getKey.call(this.scope, item));
		}
		return keys;
	}
});
