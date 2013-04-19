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

JW.AbstractMap = {
	getRemovedKeys: function(removedItems, addedItems) {
		var removedKeys = [];
		for (var key in removedItems) {
			if (!addedItems.hasOwnProperty(key)) {
				removedItems.push(key);
			}
		}
		return removedKeys;
	}
};
/*
//--------

JW.AbstractMap.ItemResult = function(item) {
	JW.AbstractMap.ItemResult._super.call(this);
	this.item = item;
};

JW.extend(JW.AbstractMap.ItemResult/*<T>*/, JW.Class, {
	/*
	Fields
	T item;
	*/
});

//--------

JW.AbstractMap.KeyResult = function(key) {
	JW.AbstractMap.KeyResult._super.call(this);
	this.key = key;
};

JW.extend(JW.AbstractMap.KeyResult, JW.Class, {
	/*
	Fields
	String key;
	*/
});

//--------

JW.AbstractMap.ItemsResult = function(items) {
	JW.AbstractMap.ItemsResult._super.call(this);
	this.items = items;
};

JW.extend(JW.AbstractMap.ItemsResult/*<T>*/, JW.Class, {
	/*
	Fields
	Map<T> items;
	*/
});
*/
//--------

JW.AbstractMap.SpliceResult = function(removedItems, addedItems) {
	JW.AbstractMap.SpliceResult._super.call(this);
	this.removedItems = removedItems;
	this.addedItems = addedItems;
};

JW.extend(JW.AbstractMap.SpliceResult/*<T>*/, JW.Class, {
	/*
	Fields
	Map<T> removedItems;
	Map<T> addedItems;
	*/
});
/*
//--------

JW.AbstractMap.ReindexResult = function(keyMap) {
	JW.AbstractMap.ReindexResult._super.call(this);
	this.keyMap = keyMap;
};

JW.extend(JW.AbstractMap.ReindexResult, JW.Class, {
	/*
	Fields
	Map<String> keyMap;
	*/
});
*/
//--------

JW.AbstractMap.SpliceParams = function(removedKeys, updatedItems) {
	JW.AbstractMap.SpliceParams._super.call(this);
	this.removedKeys = removedKeys;
	this.updatedItems = updatedItems;
};

JW.extend(JW.AbstractMap.SpliceParams/*<T>*/, JW.Class, {
	/*
	Fields
	Array<String> removedKeys;
	Map<T> updatedItems;
	*/
});
