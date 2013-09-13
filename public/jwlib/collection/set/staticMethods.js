/*
	JW set extension.
	
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

JW.IndexedCollection.createStaticMethods(JW.Set);

JW.apply(JW.Set, {
	getLength: function(target) {
		var length = 0;
		for (var key in target) {
			++length;
		}
		return length;
	},
	
	isEmpty: function(target) {
		for (var key in target) {
			return false;
		}
		return true;
	},
	
	getFirst: function(target) {
		for (var key in target) {
			return target[key];
		}
		return undefined;
	},
	
	containsItem: function(target, item) {
		return target.hasOwnProperty(item._iid);
	},
	
	contains: function(target, item) {
		return target.hasOwnProperty(item._iid);
	},
	
	every: function(target, callback, scope) {
		scope = scope || target;
		for (var iid in target) {
			if (callback.call(scope, target[iid]) === false) {
				return false;
			}
		}
		return true;
	},
	
	filter: function(target, callback, scope) {
		var result = {};
		JW.Set.every(target, function(item) {
			if (callback.call(this, item) !== false) {
				result[item._iid] = item;
			}
		}, scope);
		return result;
	},
	
	$filter: JW.AbstractCollection._createStatic$Set(JW.Set, "filter"),
	
	map: function(target, callback, scope) {
		var result = {};
		JW.Set.every(target, function(item) {
			JW.Set.tryAdd(result, callback.call(this, item));
		}, scope);
		return result;
	},
	
	$map: JW.AbstractCollection._createStatic$Set(JW.Set, "map"),
	
	asSet: function(target) {
		return target;
	},
	
	add: function(target, item) {
		return JW.Set.tryAdd(target, item) !== undefined;
	},
	
	tryAdd: function(target, item) {
		var iid = item._iid;
		if (target.hasOwnProperty(iid)) {
			return;
		}
		target[iid] = item;
		return true;
	},
	
	addAll: function(target, items) {
		var result = JW.Set.tryAddAll(target, items);
		return (result !== undefined) ? result : [];
	},
	
	$addAll: JW.AbstractCollection._createStatic$Array(JW.Set, "addAll"),
	
	tryAddAll: function(target, items) {
		var addedItems = [];
		for (var i = 0, l = items.length; i < l; ++i) {
			var item = items[i];
			if (JW.Set.tryAdd(target, item)) {
				addedItems.push(item);
			}
		}
		if (addedItems.length !== 0) {
			return addedItems;
		}
	},
	
	remove: function(target, item) {
		return JW.Set.tryRemove(target, item) !== undefined;
	},
	
	tryRemove: function(target, item) {
		var iid = item._iid;
		if (!target.hasOwnProperty(iid)) {
			return;
		}
		delete target[iid];
		return true;
	},
	
	removeItem: function(target, item) {
		JW.Set.tryRemove(target, item);
	},
	
	removeAll: function(target, items) {
		var result = JW.Set.tryRemoveAll(target, items);
		return (result !== undefined) ? result : [];
	},
	
	$removeAll: JW.AbstractCollection._createStatic$Array(JW.Set, "removeAll"),
	
	tryRemoveAll: function(target, items) {
		var removedItems = [];
		for (var i = 0, l = items.length; i < l; ++i) {
			var item = items[i];
			if (JW.Set.tryRemove(target, item)) {
				removedItems.push(item);
			}
		}
		if (removedItems.length !== 0) {
			return removedItems;
		}
	},
	
	removeItems: function(target, items) {
		JW.Set.tryRemoveAll(target, items);
	},
	
	clear: function(target) {
		var items = JW.Set.tryClear(target);
		return (result !== undefined) ? result : [];
	},
	
	$clear: JW.AbstractCollection._createStatic$Array(JW.Set, "clear"),
	
	tryClear: function(target) {
		var items = JW.Set.toArray(target);
		if (!items.length) {
			return;
		}
		JW.Set.tryRemoveAll(target, items);
		return items;
	},
	
	splice: function(target, removedItems, addedItems) {
		var spliceResult = JW.Set.trySplice(target, removedItems, addedItems);
		return (spliceResult !== undefined) ? spliceResult : new JW.AbstractSet.SpliceResult([], []);
	},
	
	trySplice: function(target, removedItems, addedItems) {
		removedItems = JW.Set.tryRemoveAll(target, removedItems);
		addedItems = JW.Set.tryAddAll(target, addedItems);
		if ((removedItems !== undefined) || (addedItems !== undefined)) {
			return new JW.AbstractSet.SpliceResult(removedItems || [], addedItems || []);
		}
	},
	
	detectSplice: function(oldItems, newItemArray) {
		var removedItems = [];
		var addedItems = [];
		var newItems = JW.Array.indexBy(newItemArray, "_iid");
		for (var key in oldItems) {
			if (!newItems.hasOwnProperty(key)) {
				removedItems.push(oldItems[key]);
			}
		}
		for (var key in newItems) {
			if (!oldItems.hasOwnProperty(key)) {
				addedItems.push(newItems[key]);
			}
		}
		if ((removedItems.length !== 0) || (addedItems.length !== 0)) {
			return new JW.AbstractSet.SpliceParams(removedItems, addedItems);
		}
	},
	
	performSplice: function(target, newItems) {
		var spliceParams = JW.Set.detectSplice(target, newItems);
		if (spliceParams !== undefined) {
			JW.Set.trySplice(target, spliceParams.removedItems, spliceParams.addedItems);
		}
	},
	
	createMapper: function(source, config) {
		return new JW.AbstractSet.Mapper(new JW.Set(source, true), config);
	},
	
	createObserver: function(source, config) {
		return new JW.AbstractSet.Observer(new JW.Set(source, true), config);
	},
	
	createOrderer: function(source, config) {
		return new JW.AbstractSet.Orderer(new JW.Set(source, true), config);
	},
	
	createSorterComparing: function(source, config) {
		return new JW.AbstractSet.SorterComparing(new JW.Set(source, true), config);
	},
	
	createIndexer: function(source, config) {
		return new JW.AbstractSet.Indexer(new JW.Set(source, true), config);
	},
	
	createLister: function(source, config) {
		return new JW.AbstractSet.Lister(new JW.Set(source, true), config);
	},
	
	equal: function(x, y) {
		if (JW.Set.getLength(x) !== y.length) {
			return false;
		}
		for (var i = 0, l = y.length; i < l; ++i) {
			if (!x.hasOwnProperty(y[i]._iid)) {
				return false;
			}
		}
		return true;
	},
	
	single: function(item) {
		var result = {};
		result[item._iid] = item;
		return result;
	}
});
