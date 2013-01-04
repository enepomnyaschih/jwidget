/*
	JW ordered collection.
	
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

JW.Collection = JW.Observable.extend({
	// Events:
	// add(event:JW.Event, index:Integer, item:*)
	// remove(event:JW.Event, index:Integer, item:*)
	// replace(event:JW.Event, index:Integer, oldItem:*, newItem:*)
	// move(event:JW.Event, fromIndex:Integer, toIndex:Integer, item:*)
	// clear(event:JW.Event)
	// reorder(event:JW.Event)
	// filter(event:JW.Event)
	// reset(event:JW.Event)
	
	base: null, // [readonly] Array
	
	init: function(
		base)   // [optional] Array
	{
		this._super();
		this.base = JW.map(JW.makeArray(base), this._createItem, this);
	},
	
	destroy: function()
	{
		this.each(this._destroyItem, this);
		this._super();
	},
	
	getLength: function()
	{
		return this.base.length;
	},
	
	isEmpty: function()
	{
		return this.base.length === 0;
	},
	
	getItemAt: function(index)
	{
		return this.base[index];
	},
	
	addItem: function( // *
		item)   // [required] *
	{
		return this.addItemAt(item, this.getLength());
	},
	
	addItemAt: function( // *
		item,   // [required] *
		index)  // [required] Integer
	{
		item = this._createItem(item);
		this.base.splice(index, 0, item);
		this.trigger("add", index, item);
		return item;
	},
	
	removeItem: function( // *
		item)   // [required] *
	{
		var index = JW.Array.indexOf(this.base, item);
		if (index != -1)
			return this.removeItemAt(index);
		
		return null;
	},
	
	removeItemAt: function( // *
		index)  // [required] Integer
	{
		var item = this.base[index];
		this.base.splice(index, 1);
		this.trigger("remove", index, item);
		this._destroyItem(item);
		return item;
	},
	
	setItem: function( // *
		index,  // [required] Integer
		item)   // [required] *
	{
		var oldItem = this.base[index];
		item = this._createItem(item);
		this.base[index] = item;
		this.trigger("replace", index, oldItem, item);
		this._destroyItem(oldItem);
		return item;
	},
	
	moveItem: function( // *
		fromIndex,  // [required] Integer
		toIndex)    // [required] Integer
	{
		var item = this.base[fromIndex];
		this.base.splice(fromIndex, 1);
		this.base.splice(toIndex, 0, item);
		this.trigger("move", fromIndex, toIndex, item);
		return item;
	},
	
	clear: function()
	{
		this.each(this._destroyItem, this);
		this.base.splice(0, this.base.length);
		this.trigger("clear");
	},
	
	triggerReorder: function()
	{
		this.trigger("reorder");
	},
	
	triggerFilter: function()
	{
		this.trigger("filter");
	},
	
	triggerReset: function()
	{
		this.trigger("reset");
	},
	
	every: function(
		callback,   // [required] Function(item, index, array)
		scope)      // [optional] Object
	{
		return JW.every(this.base, callback, scope);
	},
	
	createEmpty: function()
	{
		return new JW.Collection();
	},
	
	pushItem: function(value, index)
	{
		this.base.push(value);
		return this;
	},
	
	_createItem: function(data)
	{
		return data;
	},
	
	_destroyItem: function(item)
	{
	}
});

JW.applyIf(JW.Collection.prototype, JW.Alg.SimpleMethods);
JW.applyIf(JW.Collection.prototype, JW.Alg.BuildMethods);
