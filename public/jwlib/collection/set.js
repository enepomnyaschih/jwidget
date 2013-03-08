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

JW.Set = function(json) {
	JW.Set._super.call(this);
	this.json = {};
	this.size = 0;
	if (json) {
		this._addAll(json);
	}
};

JW.extend(JW.Set/*<T extends JW.Class>*/, JW.Class, {
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
	
	contains: function(item) {
		return this.json.hasOwnProperty(item._iid);
	},
	
	add: function(item) {
		if (!this.json.hasOwnProperty(item._iid)) {
			this.json[item._iid] = item;
			++this.size;
		}
	},
	
	addAll: function(items) {
		for (var i = 0, l = items.length; i < l; ++i) {
			this.add(items[i]);
		}
	},
	
	remove: function(item) {
		if (this.json.hasOwnProperty(item._iid)) {
			delete this.json[item._iid];
			--this.size;
		}
	},
	
	removeAll: function(items) {
		for (var i = 0, l = items.length; i < l; ++i) {
			this.remove(items[i]);
		}
	},
	
	clear: function() {
		this.json = {};
		this.size = 0;
	},
	
	every: function(callback, scope) {
		return JW.Set.every(this.json, callback, scope);
	},
	
	createEmpty: function() {
		return new JW.Set();
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
	
	createIndexer: function(config) {
		return new JW.AbstractSet.Indexer(this, config);
	},
	
	createMapper: function(config) {
		return new JW.AbstractSet.Mapper(this, config);
	}
});

JW.Set.prototype.getLength = JW.Set.prototype.getSize;
JW.Set.prototype.pushItem = JW.Set.prototype.add;
JW.Set.prototype._add = JW.Set.prototype.add;
JW.Set.prototype._remove = JW.Set.prototype.remove;

JW.applyIf(JW.Set.prototype, JW.Alg.BuildMethods);

JW.apply(JW.Set, {
	contains: function(target, item) {
		return target.hasOwnProperty(item._iid);
	},
	
	add: function(target, item) {
		target[item._iid] = item;
	},
	
	addAll: function(target, items) {
		for (var i = 0, l = items.length; i < l; ++i) {
			var item = items[i];
			target[item._iid] = item;
		}
	},
	
	remove: function(target, item) {
		delete target[item._iid];
	},
	
	removeAll: function(target, items) {
		for (var i = 0, l = items.length; i < l; ++i) {
			delete target[items[i]._iid];
		}
	},
	
	clear: JW.Map.clear,
	
	every: function(target, callback, scope) {
		for (var key in target) {
			if (callback.call(scope || target, target[key], undefined, target) === false) {
				return false;
			}
		}
		return true;
	},
	
	clone: JW.Map.clone
});

JW.applyIf(
	JW.Set,
	JW.Alg.createBuildFunctions(
		JW.Set.every,
		function() { return {}; },
		function(target, item) { target[item._iid] = item; }
	)
);
