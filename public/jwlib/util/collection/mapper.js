/*
	JW ordered collection mapper.
	
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

// TODO: Synchronize changeEvent and lengthChangeEvent in bulk operations
// TODO: Filter from end to begin

JW.Collection.Mapper = function(config) {
	JW.Collection.Mapper._super.call(this);
	this.source = config.source;
	this.createItem = config.createItem;
	this.destroyItem = config.destroyItem;
	this._targetCreated = !config.target;
	this.target = config.target || new JW.Collection();
	this.scope = config.scope;
	this._snapshot = [];
	this._addEventAttachment = this.source.addEvent.bind(this._onAdd, this);
	this._removeEventAttachment = this.source.removeEvent.bind(this._onRemove, this);
	this._replaceEventAttachment = this.source.replaceEvent.bind(this._onReplace, this);
	this._moveEventAttachment = this.source.moveEvent.bind(this._onMove, this);
	this._clearEventAttachment = this.source.clearEvent.bind(this._onClear, this);
	this._reorderEventAttachment = this.source.reorderEvent.bind(this._onReorder, this);
	this._filterEventAttachment = this.source.filterEvent.bind(this._onFilter, this);
	this._resetEventAttachment = this.source.resetEvent.bind(this._onReset, this);
	this.target.addAll(this._fill());
};

JW.extend(JW.Collection.Mapper/*<S extends JW.Class, T extends JW.Class>*/, JW.Class, {
	/*
	Required
	JW.Collection<S> source;
	T createItem(S data);
	void destroyItem(T item, S data);
	
	Optional
	JW.Collection<T> target;
	Object scope; // defaults to this
	
	Fields
	Boolean _targetCreated;
	Array<S> _snapshot;
	EventAttachment _addEventAttachment;
	EventAttachment _removeEventAttachment;
	EventAttachment _replaceEventAttachment;
	EventAttachment _moveEventAttachment;
	EventAttachment _clearEventAttachment;
	EventAttachment _reorderEventAttachment;
	EventAttachment _filterEventAttachment;
	EventAttachment _resetEventAttachment;
	*/
	
	destroy: function() {
		this._clear();
		this._addEventAttachment.destroy();
		this._removeEventAttachment.destroy();
		this._replaceEventAttachment.destroy();
		this._moveEventAttachment.destroy();
		this._clearEventAttachment.destroy();
		this._reorderEventAttachment.destroy();
		this._filterEventAttachment.destroy();
		this._resetEventAttachment.destroy();
		if (this._targetCreated) {
			this.target.destroy();
		}
		this._super();
	},
	
	getKey: function(data) {
		return data._iid;
	},
	
	_clear: function() {
		var items = this.target.clear();
		for (var i = items.length - 1; i >= 0; --i) {
			this.destroyItem.call(this.scope || this, items[i], this._snapshot[i]);
		}
		this._snapshot.splice(0, this._snapshot.length);
	},
	
	_fill: function() {
		var items = new Array(this.source.base.length);
		for (var i = 0; i < this.source.base.length; ++i) {
			items[i] = this.createItem.call(this.scope || this, this.source.base[i]);
		}
		JW.Array.addAll(this._snapshot, this.source.base);
		return items;
	},
	
	_onAdd: function(params) {
		var items = new Array(params.items.length);
		for (var i = 0; i < items.length; ++i) {
			items[i] = this.createItem.call(this.scope || this, params.items[i]);
		}
		this.target.addAll(items, params.index);
		JW.Array.addAll(this._snapshot, params.items, params.index);
	},
	
	_onRemove: function(params) {
		var items = this.target.remove(params.index, params.items.length);
		for (var i = 0; i < items.length; ++i) {
			this.destroyItem.call(this.scope || this, items[i], params.items[i]);
		}
		this._snapshot.splice(params.index, params.items.length);
	},
	
	_onReplace: function(params) {
		var newItem = this.createItem.call(this.scope || this, params.newItem);
		var oldItem = this.target.set(newItem, params.index);
		this.destroyItem.call(this.scope || this, oldItem, params.oldItem);
		this._snapshot[params.index] = params.newItem;
	},
	
	_onMove: function(params) {
		this.target.move(params.fromIndex, params.toIndex);
		this._snapshot.splice(params.fromIndex, 1);
		this._snapshot.splice(params.toIndex, 0, params.item);
	},
	
	_onClear: function() {
		this._clear();
	},
	
	_onReorder: function() {
		var itemMap = {};
		for (var i = 0; i < this._snapshot.length; ++i) {
			var data = this._snapshot[i];
			var item = this.target.base[i];
			var key = this.getKey.call(this.scope || this, data);
			itemMap[key] = itemMap[key] || [];
			itemMap[key].push([ data, item ]);
		}
		
		JW.Array.clear(this.target.base);
		
		JW.each(this.source.base, function(data, index) {
			var arr = itemMap[this.getKey.call(this.scope || this, data)];
			var pair = JW.searchBy(arr, "0", data);
			var item = pair[1];
			this.target.base.splice(index, 0, item);
			this._snapshot[index] = data;
		}, this);
		
		this.target.triggerReorder();
	},
	
	_onFilter: function() {
		var _snapshot = JW.Array.clear(this._snapshot);
		var items = JW.Array.clear(this.target.base);
		var deletedItems = [];
		
		var collectionIndex = 0;
		JW.each(_snapshot, function(snapshotData, snapshotIndex) {
			var item = items[snapshotIndex];
			var collectionData = this.source.get(collectionIndex);
			if (snapshotData !== collectionData) {
				deletedItems.push([ item, snapshotData ]);
				return;
			}
			this.target.base.push(item);
			this._snapshot.push(snapshotData);
			++collectionIndex;
		}, this);
		
		this.target.triggerFilter();
		
		for (var i = 0; i < deletedItems.length; ++i) {
			var pair = deletedItems[i];
			this.destroyItem.call(this.scope || this, pair[0], pair[1]);
		}
	},
	
	_onReset: function() {
		var items = JW.Array.clear(this.target.base);
		var snapshot = this._snapshot.splice(0, this._snapshot.length);
		JW.Array.addAll(this.target.base, this._fill());
		this.target.triggerReset();
		for (var i = 0; i < items.length; ++i) {
			this.destroyItem.call(this.scope || this, items[i], snapshot[i]);
		}
	}
});
