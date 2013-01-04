/*
	JW ordered collection syncher.
	
	Copyright (C) 2012 Egor Nepomnyaschih
	
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

JW.Syncher = JW.Config.extend({
	collection  : null,     // [required] JW.Collection
	
	creator     : null,     // [optional] Function(data:Submodel):Subcontroller, defaults to data
	inserter    : null,     // [optional] Function(item:Subcontroller, index:Number, data:Submodel)
	remover     : null,     // [optional] Function(index:Number, data:Submodel, item:Subcontroller)
	destroyer   : null,     // [optional] Function(item:Subcontroller, data:Submodel) or String (method name, takes data as argument)
	clearer     : null,     // [optional] Function()
	indexer     : null,     // [optional] Function(data:Submodel):String or String (getter name), for reordering optimization.
							// Not used if creator is null. Index value must be unique!
	
	scope       : null,     // [optional] Object
	
	snapshot    : null,     // [readonly] Array of Submodel, last collection snapshot
	items       : null,     // [readonly] Array of Subcontroller
	itemMap     : null,     // [readonly] Map from String to Subcontroller
	
	init: function(config)
	{
		this._super(config);
		
		this.snapshot = [];
		this.items = [];
		this.itemMap = {};
		
		this.collection = JW.Collection.create(this.collection);
		
		this.collection.bind("add",     this._onAdd,     this);
		this.collection.bind("remove",  this._onRemove,  this);
		this.collection.bind("replace", this._onReplace, this);
		this.collection.bind("move",    this._onMove,    this);
		this.collection.bind("clear",   this._onClear,   this);
		this.collection.bind("reorder", this._onReorder, this);
		this.collection.bind("filter",  this._onFilter,  this);
		this.collection.bind("reset",   this._onReset,   this);
		
		this._fill();
	},
	
	destroy: function()
	{
		this.collection.purge(this);
		
		this._clear();
	},
	
	_creator: function(data)
	{
		return (typeof this.creator === "function") ? this.creator.call(this.scope || this, data) : data;
	},
	
	_inserter: function(item, index, data)
	{
		if (typeof this.inserter === "function")
			this.inserter.call(this.scope || this, item, index, data);
	},
	
	_remover: function(index, data, item)
	{
		if (typeof this.remover === "function")
			this.remover.call(this.scope || this, index, data, item);
	},
	
	_destroyer: function(item, data)
	{
		var t = typeof this.destroyer;
		if (t === "string")
			item[this.destroyer](data);
		else if (t === "function")
			this.destroyer.call(this.scope || this, item, data);
	},
	
	_clearer: function()
	{
		if (typeof this.clearer === "function")
			this.clearer.call(this.scope || this);
	},
	
	_indexer: function(data)
	{
		var t = typeof this.indexer;
		if (t === "string")
			return JW.getField(data, this.indexer);
		if (t === "function")
			return this.indexer.call(this.scope || this, data);
	},
	
	_onAdd: function(event, index, data)
	{
		var item = this._creator(data);
		this._inserter(item, index, data);
		
		this.snapshot.splice(index, 0, data);
		this.items.splice(index, 0, item);
		
		if (JW.isSet(this.indexer))
			this.itemMap[this._indexer(data)] = item;
	},
	
	_onRemove: function(event, index, data)
	{
		var item = this.items[index];
		this._remover(index, data, item);
		this._destroyer(item, data);
		
		this.snapshot.splice(index, 1);
		this.items.splice(index, 1);
		
		if (JW.isSet(this.indexer))
			delete this.itemMap[this._indexer(data)];
	},
	
	_onReplace: function(event, index, oldData, newData)
	{
		var oldItem = this.items[index];
		this._remover(index, oldData, oldItem)
		this._destroyer(oldItem, oldData);
		
		var newItem = this._creator(newData);
		this._inserter(newItem, index, newData);
		
		this.snapshot[index] = newData;
		this.items[index] = newItem;
		
		if (JW.isSet(this.indexer))
		{
			delete this.itemMap[this._indexer(oldData)];
			this.itemMap[this._indexer(newData)] = newItem;
		}
	},
	
	_onMove: function(event, fromIndex, toIndex, data)
	{
		var item = this.items[fromIndex];
		this._remover(fromIndex, data, item);
		this._inserter(item, toIndex, data);
		
		this.snapshot.splice(fromIndex, 1);
		this.items.splice(fromIndex, 1);
		
		this.snapshot.splice(toIndex, 0, data);
		this.items.splice(toIndex, 0, item);
	},
	
	_onClear: function()
	{
		this._clear();
	},
	
	_onReorder: function()
	{
		var snapshot = this.snapshot;
		var items = this.items;
		
		this.snapshot = [];
		this.items = [];
		
		this._clearer();
		
		JW.each(this.collection.base, function(data, index) {
			var item;
			if (!this.creator)
			{
				item = data;
			}
			else if (JW.isSet(this.indexer))
			{
				item = this.itemMap[this._indexer(data)];
			}
			else
			{
				var snapshotIndex = JW.Array.indexOf(snapshot, data);
				item = items[snapshotIndex];
				
				// prevent double-insertion of the same item if there are 2 equal data values
				snapshot[snapshotIndex] = {};
			}
			
			this._inserter(item, index, data);
			
			this.snapshot.push(data);
			this.items.push(item);
		}, this);
	},
	
	_onFilter: function()
	{
		var snapshot = this.snapshot;
		var items = this.items;
		
		this.snapshot = [];
		this.items = [];
		
		this._clearer();
		
		var collectionIndex = 0;
		JW.each(snapshot, function(snapshotData, snapshotIndex) {
			var item = items[snapshotIndex];
			
			var collectionData = this.collection.getItemAt(collectionIndex);
			if (snapshotData !== collectionData)
			{
				this._destroyer(item, snapshotData);
				return;
			}
			
			this._inserter(item, collectionIndex, snapshotData);
			
			this.snapshot.push(snapshotData);
			this.items.push(item);
			
			++collectionIndex;
		}, this);
	},
	
	_onReset: function()
	{
		this._clear();
		this._fill();
	},
	
	_clear: function()
	{
		this._clearer();
		
		for (var i = 0, l = this.items.length; i < l; ++i)
			this._destroyer(this.items[i], this.snapshot[i]);
		
		this.snapshot = [];
		this.items = [];
		this.itemMap = {};
	},
	
	_fill: function()
	{
		JW.each(this.collection.base, JW.Function.as(this._onAdd, this, null, "\1", "\0"));
	}
});
