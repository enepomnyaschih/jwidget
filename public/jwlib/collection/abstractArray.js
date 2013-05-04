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

JW.AbstractArray = {};

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
	
	getIndexCount: function() {
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
};

JW.extend(JW.AbstractArray.SpliceResult/*<T>*/, JW.Class, {
	/*
	Fields
	Array<T> oldItems;
	Array<JW.AbstractArray.IndexItems<T>> removedItemsList;
	Array<JW.AbstractArray.IndexItems<T>> addedItemsList;
	Array<T> removedItems;
	Array<T> addedItems;
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
		return JW.Array.mapByMethod(this.removedItems, "getIndexCount");
	}
});
