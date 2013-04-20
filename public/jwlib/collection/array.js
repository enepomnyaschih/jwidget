/*
	JW array extension.
	
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

JW.Array = function(items) {
	JW.Array._super.call(this);
	this.items = items ? items.concat() : [];
	this.getKey = null;
};

JW.extend(JW.Array/*<T>*/, JW.Class, {
	/*
	Fields
	Array<T> items;
	String getKey(T item);
	*/
	
	get: function(index) {
		// JW.assertInt(index, 0, this.items.length);
		return this.items[index];
	},
	
	set: function(item, index) {
		return JW.Array.set(this.items, item, index);
	},
	
	add: function(item, index) {
		return JW.Array.add(this.items, item, index);
	},
	
	addAll: function(items, index) {
		return JW.Array.addAll(this.items, items, index);
	},
	
	remove: function(index, count) {
		return JW.Array.remove(this.items, index, count);
	},
	
	move: function(fromIndex, toIndex) {
		return JW.Array.move(this.items, fromIndex, toIndex);
	},
	
	clear: function() {
		return JW.Array.clear(this.items);
	},
	
	splice: function(removeParamsList, addParamsList) {
		return JW.Array.splice(removeParamsList, addParamsList);
	},
	
	every: function(callback, scope) {
		return JW.Array.every(this.items, callback, scope);
	},
	
	backEvery: function(callback, scope) {
		return JW.Array.backEvery(this.items, callback, scope);
	},
	
	createEmpty: function() {
		return new JW.Array();
	},
	
	createEmptyUnobservable: function() {
		return new JW.Array();
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
	
	removeItem: function(item) {
		return JW.Array.removeItem(this.items, item);
	},
	
	equal: function(arr) {
		return JW.Array.equal(this.items, arr);
	},
	
	sortBy: function(field, order) {
		return JW.Array.sortBy(this.items, field, order);
	},
	
	top: function() {
		return JW.Array.top(this.items);
	},
	
	pop: function() {
		return this.items.pop();
	},
	
	collapse: function(depth) {
		return JW.Array.collapse(this.items, depth);
	},
	
	indexOf: function(item) {
		return JW.Array.indexOf(this.items, item);
	},
	
	getSize: function() {
		return this.items.length;
	},
	
	isEmpty: function() {
		return this.items.length === 0;
	},
	
	clone: function() {
		return new JW.Array(this.items.concat());
	},
	
	getItems: function() {
		return this.items;
	},
	
	createIndexer: function(config) {
		return new JW.AbstractArray.Indexer(this, config);
	},
	
	createObserver: function(config) {
		return new JW.AbstractArray.Observer(this, config);
	},
	
	createInserter: function(config) {
		return new JW.AbstractArray.Inserter(this, config);
	},
	
	createLister: function(config) {
		return new JW.AbstractArray.Lister(this, config);
	},
	
	createMapper: function(config) {
		return new JW.AbstractArray.Mapper(this, config);
	},
	
	createSplitter: function(config) {
		return new JW.AbstractArray.Splitter(this, config);
	},
	
	_perform: function(callback, scope) {
		var items = callback.call(scope || this, this.items);
		if (items && (items !== this.items)) {
			JW.Array.clear(this.items);
			JW.Array.addAll(this.items, items);
		}
	}
});

JW.Array.prototype.getLength = JW.Array.prototype.getSize;
JW.Array.prototype.pushItem = JW.Array.prototype.add;
JW.Array.prototype.performReorder = JW.Array.prototype._perform;
JW.Array.prototype.performFilter = JW.Array.prototype._perform;
JW.Array.prototype.performReset = JW.Array.prototype._perform;

JW.applyIf(JW.Array.prototype, JW.Alg.BuildMethods);

JW.apply(JW.Array, {
	set: function(target, item, index) {
		// JW.assertArray(target);
		// JW.assertDefined(item);
		// JW.assertInt(index, 0, target.length + 1);
		var oldItem = target[index];
		if (item === oldItem) {
			return;
		}
		target[index] = item;
		return new JW.Proxy(oldItem);
	},
	
	add: function(target, item, index) {
		// JW.assertArray(target);
		// JW.assertDefined(item);
		// JW.assertInt(index, 0, target.length + 1);
		target.splice(JW.def(index, target.length), 0, item);
		return true;
	},
	
	addAll: function(target, items, index) {
		// JW.assertArray(target);
		// JW.assertArray(items, JW.assertDefined);
		// JW.assertInt(index, 0, target.length + 1);
		if (items.length === 0) {
			return;
		}
		if (index === undefined) {
			target.push.apply(target, items);
		} else {
			target.splice.apply(target, [ index, 0 ].concat(items));
		}
		return true;
	},
	
	remove: function(target, index, count) {
		// JW.assertArray(target);
		// JW.assertInt(index, 0, target.length);
		if (count === undefined) {
			return target.splice(index, 1)[0];
		}
		// JW.assertInt(count, 0);
		if (count === 0) {
			return;
		}
		return target.splice(index, count);
	},
	
	move: function(target, fromIndex, toIndex) {
		// JW.assertArray(target);
		// JW.assertInt(fromIndex, 0, target.length);
		// JW.assertInt(toIndex, 0, target.length);
		if (fromIndex === toIndex) {
			return;
		}
		var item = target[fromIndex];
		target.splice(fromIndex, 1);
		target.splice(toIndex, 0, item);
		return item;
	},
	
	clear: function(target) {
		// JW.assertArray(target);
		if (target.length !== 0) {
			return target.splice(0, target.length);
		}
	},
	
	splice: function(target, removeParamsList, addParamsList) {
		// JW.assertArray(target);
		// JW.assertArray(removeParamsList, function(params) { return params instanceof JW.AbstractArray.IndexCount; }, this);
		// JW.assertArray(addParamsList, function(params) { return params instanceof JW.AbstractArray.IndexItems; }, this);
		// TODO: assert whether there aren't insertions with equal indexes
		// TODO: assert whether there aren't insertions inside removals
		var paramsList = removeParamsList.concat(addParamsList);
		JW.Array.sortBy(paramsList, "index");
		var offset = 0;
		var oldItems = target.concat();
		var removedItemsList = [];
		for (var i = 0, l = paramsList.length; i < l; ++i) {
			var params = paramsList[i];
			if (params instanceof JW.AbstractArray.IndexItems) {
				JW.Array.addAll(target, params.items, offset + params.index);
				offset += params.items.length;
			} else {
				removedItemsList.push(JW.Array.remove(target, offset + params.index, params.count) || []);
				offset -= params.count;
			}
		}
		if ((removedItemsList.length !== 0) || (offset !== 0)) {
			return new JW.AbstractArray.SpliceResult(oldItems, removedItemsList);
		}
	},
	
	reorder: function(target, indexArray) {
		// JW.assertArray(target);
		// JW.assertArray(indexArray);
		// JW.assert(target.length === indexArray.length, '"target" and "indexArray" must have equal length');
		// var indexArraySorted = indexArray.concat();
		// indexArraySorted.sort();
		// JW.assert(JW.Array.isIdentity(indexArraySorted), '"indexArray" must contain all indexes from 0 to target.length - 1');
		var length = target.length;
		if ((length === 0) || JW.Array.isIdentity(indexArray)) {
			return;
		}
		var oldItems = target.concat();
		for (var i = 0; i < length; ++i) {
			target[indexArray[i]] = oldItems[i];
		}
		return oldItems;
	},
	
	every: function(target, callback, scope) {
		// JW.assertArray(target);
		// JW.assertFunction(target);
		for (var i = 0, l = target.length; i < l; ++i) {
			if (callback.call(scope || target, target[i], i) === false) {
				return false;
			}
		}
		return true;
	},
	
	backEvery: function(target, callback, scope) {
		for (var i = target.length - 1; i >= 0; --i) {
			if (callback.call(scope || target, target[i], i) === false) {
				return false;
			}
		}
		return true;
	},
	
	removeItem: function(target, item) {
		var index = JW.Array.indexOf(target, item);
		if (index !== undefined) {
			target.splice(index, 1);
		}
		return index;
	},
	
	equal: function(target, arr) {
		if (target === arr) {
			return true;
		}
		if (target.length !== arr.length) {
			return false;
		}
		for (var i = 0, l = target.length; i < l; ++i) {
			if (target[i] !== arr[i]) {
				return false;
			}
		}
		return true;
	},
	
	sortBy: function(target, field, order) {
		order = order || 1;
		target.sort(function(x, y) {
			return JW.cmp(JW.get(x, field), JW.get(y, field)) * order;
		});
		return target;
	},
	
	top: function(target) {
		return target[target.length - 1];
	},
	
	pop: function(target) {
		return target.pop();
	},
	
	collapse: function(target, depth) {
		var result = [];
		for (var i = 0, l = target.length; i < l; ++i) {
			if (!JW.isArray(target[i])) {
				result.push(target[i]);
				continue;
			}
			if (!JW.isSet(depth)) {
				JW.Array.addAll(result, JW.Array.collapse(target[i]));
				continue;
			}
			if (depth) {
				JW.Array.addAll(result, JW.Array.collapse(target[i], depth - 1));
				continue;
			}
			result.push(target[i]);
		}
		return result;
	},
	
	indexOf: Array.prototype.indexOf ? function(target, item) {
		var index = target.indexOf(item);
		return (index === -1) ? undefined : index;
	} : function(target, item) {
		for (var i = 0, l = target.length; i < l; ++i) {
			if (target[i] === item) {
				return i;
			}
		}
		return undefined;
	},
	
	getSize: function(target) {
		return target ? target.length : 0;
	},
	
	isEmpty: function(target) {
		return target ? (target.length === 0) : true;
	},
	
	clone: function(target) {
		return target.concat();
	},
	
	cmp: function(x, y, caseInsensitive) {
		var n = Math.min(x.length, y.length);
		for (var i = 0; i < n; ++i) {
			var result = JW.cmp(x[i], y[i], caseInsensitive);
			if (result) {
				return result;
			}
		}
		return JW.cmp(x.length, y.length);
	},
	
	shuffle: function(n) {
		var result = new Array(n);
		for (var i = 0; i < n; ++i) {
			result[i] = i;
		}
		for (var i = 0; i < n; ++i) {
			var j = i + Math.floor(Math.random() * (n - i));
			var t = result[i];
			result[i] = result[j];
			result[j] = t;
		}
		return result;
	},
	
	isIdentity: function(array) {
		for (var i = 0, l = array.length; i < l; ++i) {
			if (array[i] !== i) {
				return false;
			}
		}
		return true;
	}
});

JW.Array.getLength = JW.Array.getSize; // alias

JW.applyIf(
	JW.Array,
	JW.Alg.createBuildFunctions(
		JW.Array.every,
		function() { return []; },
		function() { return []; },
		function(target, item) { target.push(item); }
	)
);
