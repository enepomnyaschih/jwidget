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
		this._clear(this.source.base);
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
	
	_clear: function(datas) {
		var items = this.target.clear();
		for (var i = items.length - 1; i >= 0; --i) {
			this.destroyItem.call(this.scope || this, items[i], datas[i]);
		}
	},
	
	_fill: function() {
		return JW.map(this.source.base, this.createItem, this.scope || this);
	},
	
	_onAdd: function(params) {
		var items = new Array(params.items.length);
		for (var i = 0; i < items.length; ++i) {
			items[i] = this.createItem.call(this.scope || this, params.items[i]);
		}
		this.target.addAll(items, params.index);
	},
	
	_onRemove: function(params) {
		var items = this.target.remove(params.index, params.items.length);
		for (var i = 0; i < items.length; ++i) {
			this.destroyItem.call(this.scope || this, items[i], params.items[i]);
		}
	},
	
	_onReplace: function(params) {
		var newItem = this.createItem.call(this.scope || this, params.newItem);
		var oldItem = this.target.set(newItem, params.index);
		this.destroyItem.call(this.scope || this, oldItem, params.oldItem);
	},
	
	_onMove: function(params) {
		this.target.move(params.fromIndex, params.toIndex);
	},
	
	_onClear: function(params) {
		this._clear(params.items);
	},
	
	_onReorder: function(params) {
		this.target.performReorder(function(items) {
			var datas = params.items;
			var itemMap = {};
			for (var i = 0, l = datas.length; i < l; ++i) {
				var data = datas[i];
				var item = items[i];
				var key = this.getKey.call(this.scope || this, data);
				itemMap[key] = itemMap[key] || [];
				itemMap[key].push([ data, item ]);
			}
			
			JW.Array.clear(items);
			JW.each(this.source.base, function(data, index) {
				var arr = itemMap[this.getKey.call(this.scope || this, data)];
				var pair = JW.searchBy(arr, "0", data);
				var item = pair[1];
				items.push(item);
			}, this);
		}, this);
	},
	
	_onFilter: function(params) {
		var deletedItems = [];
		
		this.target.performFilter(function(items) {
			var datas = params.items;
			var snapshot = JW.Array.clear(items);
			
			var collectionIndex = 0;
			JW.each(datas, function(snapshotData, snapshotIndex) {
				var item = snapshot[snapshotIndex];
				var collectionData = this.source.get(collectionIndex);
				if (snapshotData !== collectionData) {
					deletedItems.push([ item, snapshotData ]);
					return;
				}
				items.push(item);
				++collectionIndex;
			}, this);
		}, this);
		
		for (var i = 0; i < deletedItems.length; ++i) {
			var pair = deletedItems[i];
			this.destroyItem.call(this.scope || this, pair[0], pair[1]);
		}
	},
	
	_onReset: function(params) {
		var datas = params.items;
		var snapshot;
		
		this.target.performReset(function(items) {
			snapshot = JW.Array.clear(items);
			JW.Array.addAll(items, this._fill());
		}, this);
		
		for (var i = 0; i < snapshot.length; ++i) {
			this.destroyItem.call(this.scope || this, snapshot[i], datas[i]);
		}
	}
});
