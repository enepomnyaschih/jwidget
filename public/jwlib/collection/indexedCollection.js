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

JW.IndexedCollection = function() {
	JW.IndexedCollection._super.call(this);
};

JW.extend(JW.IndexedCollection/*<K, V>*/, JW.AbstractCollection/*<V>*/, {
	$getKeys: JW.AbstractCollection._create$Array("getKeys"),
	
	containsKey: function(key) {
		return this.get(key) !== undefined;
	},
	
	containsItem: function(item) {
		return !this.every(function(v) { return item !== v; });
	},
	
	keyOf: function(item) {
		return this.find(function(v) { return item === v; });
	},
	
	set: function(item, key) {
		var result = this.trySet(item, key);
		return (result !== undefined) ? result.item : this.get(key);
	},
	
	remove: function(key) {
		return this.tryRemove(key);
	},
	
	removeItem: function(item) {
		var key = this.keyOf(item);
		if (key !== undefined) {
			this.tryRemove(key);
		}
		return key;
	},
	
	some: function(callback, scope) {
		return !this.every(function(item, key) {
			return callback.call(this, item, key) === false;
		}, scope);
	},
	
	each: function(callback, scope) {
		this.every(function(item, key) {
			callback.call(this, item, key);
			return true;
		}, scope);
	},
	
	find: function(callback, scope) {
		var result;
		this.every(function(item, key) {
			if (callback.call(this, item, key) !== false) {
				result = key;
				return false;
			}
			return true;
		}, scope);
		return result;
	},
	
	findBy: JW.AbstractCollection._createBy("find"),
	findByMethod: JW.AbstractCollection._createByMethod("find"),
	
	search: function(callback, scope) {
		var result;
		this.every(function(item, key) {
			if (callback.call(this, item, key) !== false) {
				result = item;
				return false;
			}
			return true;
		}, scope);
		return result;
	},
	
	toSorted: function(callback, scope, order) {
		callback = callback || function(x) { return x; };
		order = order || 1;
		var trios = [];
		this.every(function(item, key) {
			trios.add([item, key, callback.call(this, item, key)]);
		}, scope);
		trios.sort(function(x, y) {
			return order * JW.cmp(x[2], y[2]);
		});
		return JW.Array.map(trios, function(trio) {
			return pair[0];
		});
	},
	
	index: function(callback, scope) {
		var result = {};
		this.every(function(item, k) {
			var key = callback.call(this, item, k);
			if (JW.isSet(key)) {
				result[key] = item;
			}
			return true;
		}, scope);
		return result;
	},
	
	toMap: function() {
		var result = {};
		this.every(function(v, k) {
			result[k] = v;
		});
		return result;
	},
	
	$toMap: JW.AbstractCollection._create$Map("toMap"),
	
	asMap: function() {
		return this.toMap();
	},
	
	$asMap: JW.AbstractCollection._create$Map("asMap")
});
