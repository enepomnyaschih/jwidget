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

JW.AbstractCollection = function() {
	JW.AbstractCollection._super.call(this);
};

JW.AbstractCollection._createBy = function(algorithm) {
	return function(field, value) {
		return this[algorithm](function(item) {
			return JW.get(item, field) === value;
		});
	};
};

JW.AbstractCollection._createByField = function(algorithm) {
	return function(field) {
		return this[algorithm](function(item) {
			return JW.get(item, field);
		});
	};
};

JW.AbstractCollection._createByMethod = function(algorithm) {
	return function(method, args) {
		args = args || [];
		return this[algorithm](function(item) {
			return item[method].apply(item, args);
		});
	};
};

JW.AbstractCollection._create$Array = function(algorithm) {
	return function() {
		return new JW.Array(this[algorithm].apply(this, arguments), true);
	};
};

JW.AbstractCollection._create$Map = function(algorithm) {
	return function() {
		return new JW.Map(this[algorithm].apply(this, arguments), true);
	};
};

JW.AbstractCollection._create$Set = function(algorithm) {
	return function() {
		return new JW.Set(this[algorithm].apply(this, arguments), true);
	};
};

JW.extend(JW.AbstractCollection/*<V>*/, JW.Class, {
	destroy: function() {
		this.tryClear();
		this._super();
	},
	
	everyBy: JW.AbstractCollection._createBy("every"),
	everyByMethod: JW.AbstractCollection._createByMethod("every"),
	
	some: function(callback, scope) {
		return !this.every(function(item) {
			return callback.call(this, item) === false;
		}, scope);
	},
	
	someBy: JW.AbstractCollection._createBy("some"),
	someByMethod: JW.AbstractCollection._createByMethod("some"),
	
	each: function(callback, scope) {
		this.every(function(item) {
			callback.call(this, item);
			return true;
		}, scope);
	},
	
	eachByMethod: JW.AbstractCollection._createByMethod("each"),
	
	search: function(callback, scope) {
		var result;
		this.every(function(item) {
			if (callback.call(this, item) !== false) {
				result = item;
				return false;
			}
			return true;
		}, scope);
		return result;
	},
	
	searchBy: JW.AbstractCollection._createBy("search"),
	searchByMethod: JW.AbstractCollection._createByMethod("search"),
	
	toSorted: function(callback, scope, order) {
		callback = callback || function(x) { return x; };
		order = order || 1;
		var pairs = [];
		this.every(function(item) {
			pairs.add([item, callback.call(this, item)]);
		}, scope);
		pairs.sort(function(x, y) {
			return order * JW.cmp(x[1], y[1]);
		});
		return JW.Array.map(pairs, function(pair) {
			return pair[0];
		});
	},
	
	$toSorted: JW.AbstractCollection._create$Array("toSorted"),
	
	toSortedBy: function(field, order) {
		return this.toSorted(function(item) {
			return JW.get(item, field);
		}, this, order);
	},
	
	$toSortedBy: JW.AbstractCollection._create$Array("toSortedBy"),
	
	toSortedByMethod: function(method, args, order) {
		args = args || [];
		return this.toSorted(function(item) {
			return item[method].apply(item, args);
		}, this, order);
	},
	
	$toSortedByMethod: JW.AbstractCollection._create$Array("toSortedByMethod"),
	
	toSortedComparing: function(compare, scope, order) {
		compare = compare || JW.cmp;
		scope = scope || this;
		order = order || 1;
		var items = this.toList();
		items.sort(function(x, y) {
			return order * compare.call(scope, x, y);
		});
		return items;
	},
	
	index: function(callback, scope) {
		var result = {};
		this.every(function(item) {
			var key = callback.call(this, item);
			if (JW.isSet(key)) {
				result[key] = item;
			}
			return true;
		}, scope);
		return result;
	},
	
	$index: JW.AbstractCollection._create$Map("index"),
	indexBy: JW.AbstractCollection._createByField("index"),
	$indexBy: JW.AbstractCollection._create$Map("indexBy"),
	indexByMethod: JW.AbstractCollection._createByMethod("index"),
	$indexByMethod: JW.AbstractCollection._create$Map("indexByMethod"),
	
	toArray: function() {
		var result = new Array(this.getLength());
		var index = 0;
		this.every(function(item) {
			result[index++] = item;
		});
		return result;
	},
	
	$toArray: JW.AbstractCollection._create$Array("toArray"),
	
	toSet: function() {
		var result = {};
		this.every(function(item) {
			JW.Set.add(result, item);
		});
		return result;
	},
	
	$toSet: JW.AbstractCollection._create$Set("toSet"),
	
	asArray: function() {
		return this.toArray();
	},
	
	$asArray: JW.AbstractCollection._create$Array("asArray"),
	
	asSet: function() {
		return this.toSet();
	},
	
	$asSet: JW.AbstractCollection._create$Set("asSet"),
	
	filterBy: JW.AbstractCollection._createBy("filter"),
	$filterBy: JW.AbstractCollection._createBy("$filter"),
	filterByMethod: JW.AbstractCollection._createByMethod("filter"),
	$filterByMethod: JW.AbstractCollection._createByMethod("$filter"),
	
	mapBy: JW.AbstractCollection._createByField("map"),
	$mapBy: JW.AbstractCollection._createByField("$map"),
	mapByMethod: JW.AbstractCollection._createByMethod("map"),
	$mapByMethod: JW.AbstractCollection._createByMethod("$map")
});
