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

JW.AbstractArray = function(items, adapter) {
	JW.AbstractArray._super.call(this);
	this.items = adapter ? items : !items ? [] : (typeof items === "number") ? new Array(items) : items.concat();
	this.getKey = null;
};

JW.extend(JW.AbstractArray/*<V>*/, JW.IndexedCollection/*<Integer, V>*/, {
	/*
	Array<V> items;
	String getKey(T item);
	*/
	
	getItems: function() {
		return this.items;
	},
	
	getFirst: function() {
		return this.items[0];
	},
	
	getLast: function() {
		return this.items[this.items.length - 1];
	},
	
	getLength: function() {
		return this.items.length;
	},
	
	isEmpty: function() {
		return this.items.length === 0;
	},
	
	get: function(index) {
		return this.items[index];
	},
	
	getKeys: function() {
		var items = this.items;
		var result = new Array(items.length);
		for (var i = 0, l = items.length; i < l; ++i) {
			result[i] = i;
		}
		return result;
	},
	
	every: function(callback, scope) {
		return JW.Array.every(this.items, callback, scope || this);
	},
	
	filter: function(callback, scope) {
		return JW.Array.filter(this.items, callback, scope || this);
	},
	
	$filter: JW.AbstractCollection._create$Array("filter"),
	
	map: function(callback, scope) {
		return JW.Array.map(this.items, callback, scope || this);
	},
	
	$map: JW.AbstractCollection._create$Array("map"),
	
	toList: function() {
		return this.items.concat();
	},
	
	toSet: function() {
		return new JW.Set(this.items);
	},
	
	asList: function() {
		return this.items;
	},
	
	$asList: function() {
		return this;
	},
	
	add: function(item, index) {
		this.tryAdd(item, index);
	},
	
	tryAdd: function(item, index) {
		return this.tryAddAll([item], index);
	},
	
	addAll: function(items, index) {
		this.tryAddAll(items, index);
	},
	
	tryAddAll: function(items, index) {
		if (index === undefined) {
			index = items.length;
		}
		if (this.trySplice([], [new JW.AbstractArray.IndexItems(index, items)])) {
			return true;
		}
	},
	
	trySet: function(item, index) {
		return JW.Array.trySet(this.items, item, index);
	},
	
	tryRemove: function(index) {
		var result = this.tryRemoveAll(index, 1);
		if (result !== undefined) {
			return result[0];
		}
	},
	
	removeAll: function(index, count) {
		var result = this.tryRemoveAll(index, count);
		return result || [];
	},
	
	$removeAll: JW.AbstractCollection._create$Array("removeAll"),
	
	tryRemoveAll: function(index, count) {
		var result = this.trySplice([new JW.AbstractArray.IndexCount(index, count)], []);
		if (result !== undefined) {
			return result.removedItemsList[0].items;
		}
	},
	
	removeItems: function(items) {
		var itemSet = new JW.Set(items);
		var newItems = this.filter(function(v) { return !itemSet.contains(item); });
		this.performSplice(newItems);
	},
	
	move: function(fromIndex, toIndex) {
		this.tryMove(fromIndex, toIndex);
		return this.get(toIndex);
	},
	
	tryMove: function(fromIndex, toIndex) {
		return JW.Array.tryMove(this.items, fromIndex, toIndex);
	},
	
	clear: function() {
		var result = this.tryClear();
		return (result !== undefined) ? result : [];
	},
	
	$clear: JW.AbstractCollection._create$Array("clear"),
	
	tryClear: function() {
		return JW.Array.tryClear(this.items);
	},
	
	splice: function(removeParamsList, addParamsList) {
		var result = this.trySplice(removeParamsList, addParamsList);
		return (result !== undefined) ? result : new JW.AbstractArray.SpliceResult(this.items.concat(), [], []);
	},
	
	trySplice: function(removeParamsList, addParamsList) {
		return JW.Array.trySplice(this.items, removeParamsList, addParamsList);
	},
	
	reorder: function(indexList) {
		this.tryReorder(indexList);
	},
	
	tryReorder: function(indexList) {
		return JW.Array.tryReorder(this.items, indexList);
	},
	
	detectSplice: function(newItems, getKey, scope) {
		return JW.Array.detectSplice(this.items, newItems, getKey || this.getKey, scope || this);
	},
	
	detectReorder: function(newItems, getKey, scope) {
		return JW.Array.detectReorder(this.items, newItems, getKey || this.getKey, scope || this);
	},
	
	performSplice: function(newItems, getKey, scope) {
		var params = this.detectSplice(newItems, getKey || this.getKey, scope || this);
		if (params !== undefined) {
			this.trySplice(params.removeParamsList, params.addParamsList);
		}
	},
	
	performReorder: function(newItems, getKey, scope) {
		var indexArray = this.detectReorder(newItems, getKey || this.getKey, scope || this);
		if (indexArray !== undefined) {
			this.tryReorder(indexArray);
		}
	},
	
	sort: function(callback, scope, order) {
		this.performReorder(this.toSorted(callback, scope, order));
	},
	
	sortBy: function(field, order) {
		this.performReorder(this.toSortedBy(field, order));
	},
	
	sortByMethod: function(method, args, order) {
		this.performReorder(this.toSortedByMethod(method, args, order));
	},
	
	sortComparing: function(compare, scope, order) {
		this.performReorder(this.toSortedComparing(compare, scope, order));
	},
	
	createMapper: function(config) {
		return new JW.AbstractArray.Mapper(this, config);
	},
	
	createObserver: function(config) {
		return new JW.AbstractArray.Observer(this, config);
	},
	
	createOrderer: function(config) {
		return new JW.AbstractArray.Orderer(this, config);
	},
	
	createSorter: function(config) {
		return new JW.AbstractArray.Sorter(this, config);
	},
	
	createIndexer: function(config) {
		return new JW.AbstractArray.Indexer(this, config);
	},
	
	createLister: function(config) {
		return new JW.AbstractArray.Lister(this, config);
	},
	
	createInserter: function(config) {
		return new JW.AbstractArray.Inserter(this, config);
	},
	
	createSplitter: function(config) {
		return new JW.AbstractArray.Splitter(this, config);
	},
	
	equal: function(arr) {
		return JW.Array.equal(this.items, arr);
	},
	
	collapse: function(depth) {
		return JW.Array.collapse(this.items, depth);
	},
	
	indexOf: function(item) {
		return JW.Array.indexOf(this.items, item);
	},
	
	backEvery: function(callback, scope) {
		return JW.Array.backEvery(this.item, callback, scope);
	}
});

JW.AbstractArray.IndexCount = function(index, count) {
	JW.AbstractArray.IndexCount._super.call(this);
	this.index = index;
	this.count = count;
};

JW.extend(JW.AbstractArray.IndexCount, JW.Class, {
	/*
	Fields
	Integer index;
	Integer count;
	*/
});

//--------

JW.AbstractArray.IndexItems = function(index, items) {
	JW.AbstractArray.IndexItems._super.call(this);
	this.index = index;
	this.items = items;
};

JW.extend(JW.AbstractArray.IndexItems/*<T>*/, JW.Class, {
	/*
	Fields
	Integer index;
	Array<T> items;
	*/
	
	toIndexCount: function() {
		return new JW.AbstractArray.IndexCount(this.index, this.items.length);
	}
});

//--------

JW.AbstractArray.SpliceParams = function(removeParamsList, addParamsList) {
	JW.AbstractArray.SpliceParams._super.call(this);
	this.removeParamsList = removeParamsList;
	this.addParamsList = addParamsList;
};

JW.extend(JW.AbstractArray.SpliceParams/*<T>*/, JW.Class, {
	/*
	Fields
	Array<JW.AbstractArray.IndexCount<T>> removeParamsList;
	Array<JW.AbstractArray.IndexItems<T>> addParamsList;
	*/
});

//--------

JW.AbstractArray.SpliceResult = function(oldItems, removedItemsList, addedItemsList) {
	JW.AbstractArray.SpliceResult._super.call(this);
	this.oldItems = oldItems;
	this.removedItemsList = removedItemsList;
	this.addedItemsList = addedItemsList;
	this.removedItems = null;
	this.addedItems = null;
	this.removeParamsList = null;
};

JW.extend(JW.AbstractArray.SpliceResult/*<T>*/, JW.Class, {
	/*
	Fields
	Array<T> oldItems;
	Array<JW.AbstractArray.IndexItems<T>> removedItemsList;
	Array<JW.AbstractArray.IndexItems<T>> addedItemsList;
	Array<T> removedItems;
	Array<T> addedItems;
	Array<JW.AbstractArray.IndexCount<T>> removeParamsList;
	*/
	
	getRemovedItems: function() {
		if (!this.removedItems) {
			this.removedItems = JW.Array.merge(JW.Array.mapBy(this.removedItemsList, "items"));
		}
		return this.removedItems;
	},
	
	getAddedItems: function() {
		if (!this.addedItems) {
			this.addedItems = JW.Array.merge(JW.Array.mapBy(this.addedItemsList, "items"));
		}
		return this.addedItems;
	},
	
	getRemoveParamsList: function() {
		if (!this.removeParamsList) {
			this.removeParamsList = JW.Array.mapByMethod(this.removedItemsList, "toIndexCount");
		}
		return this.removeParamsList;
	},
	
	isEmpty: function() {
		return (this.removedItemsList.length === 0) && (this.addedItemsList.length === 0);
	}
});
