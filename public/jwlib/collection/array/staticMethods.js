/*
	jWidget Lib source file.

	Copyright (C) 2015 Egor Nepomnyaschih

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

JW.IndexedCollection.createStaticMethods(JW.Array);

JW.apply(JW.Array, {
	getFirstKey: function(target) {
		if (target.length !== 0) {
			return 0;
		}
	},

	getLast: function(target) {
		return target[target.length - 1];
	},

	getLastKey: function(target) {
		var l = target.length;
		if (l !== 0) {
			return l - 1;
		}
	},

	getLength: function(target) {
		return target.length;
	},

	isEmpty: function(target) {
		return target.length === 0;
	},

	get: function(target, index) {
		return target[index];
	},

	getKeys: function(target) {
		var result = new Array(target.length);
		for (var i = 0, l = target.length; i < l; ++i) {
			result[i] = i;
		}
		return result;
	},

	every: function(target, callback, scope) {
		// JW.assertArray(target);
		// JW.assertFunction(callback);
		for (var i = 0, l = target.length; i < l; ++i) {
			if (callback.call(scope || target, target[i], i) === false) {
				return false;
			}
		}
		return true;
	},

	filter: function(target, callback, scope) {
		var result = [];
		JW.Array.every(target, function(item, index) {
			if (callback.call(this, item, index) !== false) {
				result.push(item);
			}
		}, scope);
		return result;
	},

	$filter: JW.AbstractCollection._createStatic$Array(JW.Array, "filter"),

	count: function(target, callback, scope) {
		var result = 0;
		JW.Array.every(target, function(item, index) {
			if (callback.call(this, item, index) !== false) {
				++result;
			}
		}, scope);
		return result;
	},

	map: function(target, callback, scope) {
		var result = [];
		JW.Array.every(target, function(item, index) {
			result.push(callback.call(this, item, index));
		}, scope);
		return result;
	},

	$map: JW.AbstractCollection._createStatic$Array(JW.Array, "map"),

	toArray: function(target) {
		return target.concat();
	},

	toSet: function(target) {
		return JW.Array.index(target, JW.iid);
	},

	asArray: function(target) {
		return target;
	},

	add: function(target, item, index) {
		JW.Array.tryAdd(target, item, index);
	},

	tryAdd: function(target, item, index) {
		target.splice(JW.def(index, target.length), 0, item);
		return true;
	},

	addAll: function(target, items, index) {
		JW.Array.tryAddAll(target, items, index);
	},

	tryAddAll: function(target, items, index) {
		if (items.length === 0) {
			return;
		}
		if (index === undefined) {
			var l = target.length;
			target.length += items.length;
			for (var i = 0; i < items.length; ++i) {
				target[i + l] = items[i];
			}
		} else {
			var tail = target.splice(index, target.length - index);
			JW.Array.tryAddAll(target, items);
			JW.Array.tryAddAll(target, tail);
		}
		return true;
	},

	trySet: function(target, item, index) {
		// JW.assertArray(target);
		// JW.assertIsSet(item);
		// JW.assertInt(index, 0, target.length);
		var oldItem = target[index];
		if (item !== oldItem) {
			target[index] = item;
			return new JW.Proxy(oldItem);
		}
	},

	tryRemove: function(target, index) {
		return target.splice(index, 1)[0];
	},

	removeAll: function(target, index, count) {
		var result = JW.Array.tryRemoveAll(target, index, count);
		return result || [];
	},

	$removeAll: JW.AbstractCollection._createStatic$Array(JW.Array, "removeAll"),

	tryRemoveAll: function(target, index, count) {
		if (count === 0) {
			return;
		}
		return target.splice(index, count);
	},

	removeItems: function(target, items) {
		var itemSet = new JW.Set(items);
		var newItems = JW.Array.filter(target, function(item) { return !itemSet.contains(item); });
		JW.Array.performSplice(target, newItems);
	},

	move: function(target, fromIndex, toIndex) {
		JW.Array.tryMove(target, fromIndex, toIndex);
		return JW.Array.get(target, toIndex);
	},

	tryMove: function(target, fromIndex, toIndex) {
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
		var result = JW.Array.tryClear(target);
		return (result !== undefined) ? result : [];
	},

	$clear: JW.AbstractCollection._createStatic$Array(JW.Array, "clear"),

	tryClear: function(target) {
		// JW.assertArray(target);
		if (target.length !== 0) {
			return target.splice(0, target.length);
		}
	},

	splice: function(target, removeParamsList, addParamsList) {
		var result = JW.Array.trySplice(target, removeParamsList, addParamsList);
		return (result !== undefined) ? result : new JW.AbstractArray.SpliceResult(target.concat(), [], []);
	},

	trySplice: function(target, removeParamsList, addParamsList) {
		// JW.assertArray(target);
		// JW.assertArray(removeParamsList, function(params) { return params instanceof JW.AbstractArray.IndexCount; }, this);
		// JW.assertArray(addParamsList, function(params) { return params instanceof JW.AbstractArray.IndexItems; }, this);
		// TODO: assert out of bounds stuff
		var last;

		var optimizedRemoveParamsList = [];
		last = null;
		for (var i = 0, l = removeParamsList.length; i < l; ++i) {
			var params = removeParamsList[i];
			if (last && (params.index === last.index + last.count)) {
				last.count += params.count;
			} else {
				last = params.clone();
				optimizedRemoveParamsList.push(last);
			}
		}

		var optimizedAddParamsList = [];
		last = null;
		for (var i = 0, l = addParamsList.length; i < l; ++i) {
			var params = addParamsList[i];
			if (last && (params.index === last.index + last.items.length)) {
				JW.Array.tryAddAll(last.items, params.items);
			} else {
				last = params.clone();
				optimizedAddParamsList.push(last);
			}
		}

		var oldItems = target.concat();
		var removedItemsList = [];
		for (var i = optimizedRemoveParamsList.length - 1; i >= 0; --i) {
			var params = optimizedRemoveParamsList[i];
			var index = params.index;
			var items = JW.Array.tryRemoveAll(target, index, params.count);
			if (items === undefined) {
				continue;
			}
			removedItemsList.push(new JW.AbstractArray.IndexItems(index, items));
		}
		var addedItemsList = [];
		for (var i = 0, l = optimizedAddParamsList.length; i < l; ++i) {
			var params = optimizedAddParamsList[i];
			if (JW.Array.tryAddAll(target, params.items, params.index) === undefined) {
				continue;
			}
			addedItemsList.push(params);
		}
		if ((removedItemsList.length !== 0) || (addedItemsList.length !== 0)) {
			removedItemsList.reverse();
			return new JW.AbstractArray.SpliceResult(oldItems, removedItemsList, addedItemsList);
		}
	},

	reorder: function(target, indexList) {
		JW.Array.tryReorder(target, indexList);
	},

	tryReorder: function(target, indexArray) {
		// JW.assertArray(target);
		// JW.assertArray(indexArray);
		// JW.assert(target.length === indexArray.length, '"target" and "indexArray" must have equal length');
		// var indexArraySorted = indexArray.concat();
		// indexArraySorted.sort();
		// JW.assert(JW.Array.isIdentity(indexArraySorted), '"indexArray" must contain all indexes from 0 to target.length - 1');
		var length = target.length;
		if (JW.Array.isIdentity(indexArray)) {
			return;
		}
		var oldItems = target.concat();
		for (var i = 0; i < length; ++i) {
			target[indexArray[i]] = oldItems[i];
		}
		return oldItems;
	},

	detectSplice: function(oldItems, newItems, getKey, scope) {
		getKey = getKey || JW.iid;
		scope = scope || oldItems;
		var removeParamsList = [];
		var addParamsList = [];
		var oldIndexMap = {};
		for (var i = 0, l = oldItems.length; i < l; ++i) {
			oldIndexMap[getKey.call(scope, oldItems[i])] = i;
		}
		var nextOldIndex = 0;
		var offset = 0;
		var newItemBuffer = [];

		function buffer(item) {
			newItemBuffer.push(item);
		}

		function flush() {
			if (newItemBuffer.length === 0) {
				return;
			}
			addParamsList.push(new JW.AbstractArray.IndexItems(offset + nextOldIndex, newItemBuffer));
			offset += newItemBuffer.length;
			newItemBuffer = [];
		}

		function testRemove(oldIndex) {
			if (oldIndex > nextOldIndex) {
				var count = oldIndex - nextOldIndex;
				removeParamsList.push(new JW.AbstractArray.IndexCount(nextOldIndex, count));
				offset -= count;
			}
		}

		for (var newIndex = 0, l = newItems.length; newIndex < l; ++newIndex) {
			var item = newItems[newIndex];
			var key = getKey.call(scope, item);
			var oldIndex = oldIndexMap[key];
			if ((oldIndex === undefined) || (oldIndex < nextOldIndex)) {
				buffer(item);
			} else {
				flush();
				testRemove(oldIndex);
				nextOldIndex = oldIndex + 1;
			}
		}
		flush();
		testRemove(oldItems.length);
		if ((removeParamsList.length !== 0) || (addParamsList.length !== 0)) {
			return new JW.AbstractArray.SpliceParams(removeParamsList, addParamsList);
		}
	},

	detectFilter: function(oldItems, newItems) {
		var removeParamsList = [];
		var oldIndex = 0;
		var oldLength = oldItems.length;
		var newLength = newItems.length;
		for (var newIndex = 0; newIndex <= newLength; ++newIndex) {
			var newItem = newItems[newIndex];
			var count = 0;
			while ((oldIndex + count < oldLength) && (oldItems[oldIndex + count] !== newItem)) {
				++count;
			}
			if (count !== 0) {
				removeParamsList.push(new JW.AbstractArray.IndexCount(oldIndex, count));
			}
			oldIndex += count + 1;
		}
		if (removeParamsList.length !== 0) {
			return removeParamsList;
		}
	},

	detectReorder: function(oldItems, newItems, getKey, scope) {
		getKey = getKey || JW.iid;
		scope = scope || oldItems;
		var indexArray = [];
		var newIndexMap = {};
		for (var i = 0, l = newItems.length; i < l; ++i) {
			newIndexMap[getKey.call(scope, newItems[i])] = i;
		}
		for (var i = 0, l = oldItems.length; i < l; ++i) {
			indexArray.push(newIndexMap[getKey.call(scope, oldItems[i])]);
		}
		if (!JW.Array.isIdentity(indexArray)) {
			return indexArray;
		}
	},

	detectSort: function(target, callback, scope, order) {
		var keys = JW.Array.getSortingKeys(target, callback, scope, order);
		if (!JW.Array.isIdentity(keys)) {
			return JW.Array.invert(keys);
		}
	},

	detectSortComparing: function(target, compare, scope, order) {
		var keys = JW.Array.getSortingKeysComparing(target, compare, scope, order);
		if (!JW.Array.isIdentity(keys)) {
			return JW.Array.invert(keys);
		}
	},

	performSplice: function(target, newItems, getKey, scope) {
		var params = JW.Array.detectSplice(target, newItems, getKey, scope);
		if (params !== undefined) {
			JW.Array.trySplice(target, params.removeParamsList, params.addParamsList);
		}
	},

	performFilter: function(target, newItems) {
		var params = JW.Array.detectFilter(target, newItems);
		if (params !== undefined) {
			JW.Array.trySplice(target, params, []);
		}
	},

	performReorder: function(target, newItems, getKey, scope) {
		var indexArray = JW.Array.detectReorder(target, newItems, getKey, scope);
		if (indexArray !== undefined) {
			JW.Array.tryReorder(target, indexArray);
		}
	},

	sort: function(target, callback, scope, order) {
		var indexArray = JW.Array.detectSort(target, callback, scope, order);
		if (indexArray !== undefined) {
			JW.Array.tryReorder(target, indexArray);
		}
	},

	sortComparing: function(target, compare, scope, order) {
		var indexArray = JW.Array.detectSortComparing(target, compare, scope, order);
		if (indexArray !== undefined) {
			JW.Array.tryReorder(target, indexArray);
		}
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

	collapse: function(target, depth) {
		var result = [];
		for (var i = 0, l = target.length; i < l; ++i) {
			if (!JW.isArray(target[i])) {
				result.push(target[i]);
				continue;
			}
			if (!JW.isSet(depth)) {
				JW.Array.tryAddAll(result, JW.Array.collapse(target[i]));
				continue;
			}
			if (depth) {
				JW.Array.tryAddAll(result, JW.Array.collapse(target[i], depth - 1));
				continue;
			}
			result.push(target[i]);
		}
		return result;
	},

	indexOf: Array.prototype.indexOf ? function(target, item) {
		return target.indexOf(item);
	} : function(target, item) {
		var key = JW.Array.keyOf(target, item);
		return (key !== undefined) ? key : -1;
	},

	backEvery: function(target, callback, scope) {
		for (var i = target.length - 1; i >= 0; --i) {
			if (callback.call(scope || target, target[i], i) === false) {
				return false;
			}
		}
		return true;
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
	},

	invert: function(array) {
		var l = array.length;
		var result = new Array(l);
		for (var i = 0; i < l; ++i) {
			result[array[i]] = i;
		}
		return result;
	},

	merge: function(arrays) {
		var result = [];
		for (var i = 0, l = arrays.length; i < l; ++i) {
			result.push.apply(result, arrays[i]);
		}
		return result;
	},

	$merge: JW.AbstractCollection._createStatic$Array(JW.Array, "merge"),

	countMerged: function(arrays) {
		var result = 0;
		for (var i = 0, l = arrays.length; i < l; ++i) {
			result += arrays[i].length;
		}
		return result;
	},

	reverse: function(target) {
		target.reverse();
	},

	toReversed: function(target) {
		var result = target.concat();
		result.reverse();
		return result;
	},

	$toReversed: JW.AbstractCollection._createStatic$Array(JW.Array, "toReversed"),

	// deprecated
	top: function(target) {
		return JW.Array.getLast(target);
	},

	pop: function(target) {
		return target.pop();
	},

	binarySearch: function(target, value, compare, scope, order) {
		compare = compare || function(x, y) { return (x < y) ? -1 : (x > y) ? 1 : 0 };
		scope = scope || target;
		order = order || 1;
		var length = target.length;
		var len2 = length >> 1;
		var step = 1;
		while (step <= len2) {
			step <<= 1;
		}
		var index = 0;
		while (step) {
			if ((index + step <= length) && (order * compare.call(scope, value, target[index + step - 1]) >= 0)) {
				index += step;
			}
			step >>= 1;
		}
		return index;
	}
});
