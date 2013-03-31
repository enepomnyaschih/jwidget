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
	
	----
	
	This is an adapter of array that triggers events about modifications.
	Events are taken from ActionScript's CollectionEventKind (with small
	reasonable changes).
*/

JW.Map = function(json) {
	JW.Map._super.call(this);
	this.json = {};
	this.size = 0;
	if (json) {
		this.setAll(json);
	}
};

JW.extend(JW.Map/*<T extends Any>*/, JW.Class, {
	/*
	Fields
	Map<T> json;
	Integer size;
	*/
	
	getJson: function() {
		return this.json;
	},
	
	getSize: function() {
		return this.size;
	},
	
	isEmpty: function() {
		return this.size === 0;
	},
	
	contains: function(key) {
		return this.json.hasOwnProperty(key);
	},
	
	get: function(key) {
		return this.json[key];
	},
	
	set: function(item, key) {
		if (item === undefined) {
			return false;
		}
		var oldItem = this.json[key];
		if (oldItem === item) {
			return false;
		}
		if (oldItem === undefined) {
			++this.size;
		}
		this.json[key] = item;
		return true;
	},
	
	setAll: function(json) {
		var changed = false;
		for (var key in json) {
			changed = this.set(json[key], key) || changed;
		}
		return changed;
	},
	
	remove: function(key) {
		var item = this.json[key];
		if (item === undefined) {
			return undefined;
		}
		delete this.json[key];
		--this.size;
		return item;
	},
	
	removeAll: function(keys) {
		var changed = false;
		for (var i = 0, l = keys.length; i < l; ++i) {
			changed = this.remove(keys[i]) || changed;
		}
		return changed;
	},
	
	clear: function() {
		if (this.size === 0) {
			return false;
		}
		this.json = {};
		this.size = 0;
		return true;
	},
	
	every: function(callback, scope) {
		return JW.Map.every(this.json, callback, scope);
	},
	
	createEmpty: function() {
		return new JW.Map();
	},
	
	createEmptyArray: function() {
		return new JW.Array();
	},
	
	createEmptyMap: function() {
		return new JW.Map();
	},
	
	createEmptySet: function() {
		return new JW.Set();
	},
	
	createLister: function(config) {
		return new JW.AbstractMap.Lister(this, config);
	},
	
	createMapper: function(config) {
		return new JW.AbstractMap.Mapper(this, config);
	},
	
	equal: function(map) {
		if (this === map) {
			return true;
		}
		if (this.getSize() !== map.getSize()) {
			return false;
		}
		var json = this.json;
		for (var key in json) {
			if (map.get(key) !== json[key]) {
				return false;
			}
		}
		return true;
	},
	
	_triggerChange: function() {}
});

JW.Map.prototype.getLength = JW.Map.prototype.getSize;
JW.Map.prototype.pushItem = JW.Map.prototype.set;
JW.Map.prototype._set = JW.Map.prototype.set;
JW.Map.prototype._remove = JW.Map.prototype.remove;
JW.Map.prototype._setAll = JW.Map.prototype.setAll;
JW.Map.prototype._removeAll = JW.Map.prototype.removeAll;

JW.applyIf(JW.Map.prototype, JW.Alg.BuildMethods);

JW.apply(JW.Map, {
	get: function(target, key) {
		return target[key];
	},
	
	set: function(target, item, key) {
		if ((item === undefined) || (target[key] === item)) {
			return false;
		}
		target[key] = item;
		return true;
	},
	
	setAll: function(target, map) {
		var changed = false;
		for (var key in map) {
			changed = JW.Map.set(target, map[key], key) || changed;
		}
		return changed;
	},
	
	remove: function(target, key) {
		var item = target[key];
		delete target[key];
		return item;
	},
	
	removeAll: function(target, keys) {
		var changed = false;
		for (var i = 0, l = keys.length; i < l; ++i) {
			changed = JW.Map.remove(target, keys[i]) || changed;
		}
		return changed;
	},
	
	clear: function(target) {
		var keys = [];
		for (var key in target) {
			keys.push(key);
		}
		return JW.Map.removeAll(keys);
	},
	
	every: function(target, callback, scope) {
		for (var key in target) {
			if (callback.call(scope || target, target[key], key, target) === false) {
				return false;
			}
		}
		return true;
	},
	
	equal: function(x, y) {
		if (x === y) {
			return true;
		}
		var size = JW.Map.getSize(y);
		for (var key in x) {
			if ((--size < 0) || (x[key] !== y[key])) {
				return false;
			}
		}
		return size === 0;
	},
	
	clone: function(target) {
		return JW.apply({}, target);
	}
});

JW.applyIf(
	JW.Map,
	JW.Alg.createBuildFunctions(
		JW.Map.every,
		function() { return {}; },
		function(target, item, key) { target[key] = item; }
	)
);
