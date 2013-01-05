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

JW.Collection.Mapper/*<S extends JW.Class, T extends JW.Class>*/ = JW.Class.extend({
	/*
	Required
	JW.Collection<S> source;
	JW.Collection<T> target;
	
	Optional
	Object scope; // defaults to this
	
	Abstract methods
	T createItem(S data);
	void destroyItem(T item, S data);
	
	Fields
	Array<S> snapshot;
	EventAttachment addEventAttachment;
	EventAttachment removeEventAttachment;
	EventAttachment replaceEventAttachment;
	EventAttachment moveEventAttachment;
	EventAttachment clearEventAttachment;
	EventAttachment reorderEventAttachment;
	EventAttachment filterEventAttachment;
	EventAttachment resetEventAttachment;
	*/
	
	init: function(config) {
		this._super();
		JW.apply(this, config);
		this.snapshot = [];
		this.addEventAttachment = this.source.addEvent.bind(this._onAdd, this);
		this.removeEventAttachment = this.source.removeEvent.bind(this._onRemove, this);
		this.replaceEventAttachment = this.source.replaceEvent.bind(this._onReplace, this);
		this.moveEventAttachment = this.source.moveEvent.bind(this._onMove, this);
		this.clearEventAttachment = this.source.clearEvent.bind(this._onClear, this);
		this.reorderEventAttachment = this.source.reorderEvent.bind(this._onReorder, this);
		this.filterEventAttachment = this.source.filterEvent.bind(this._onFilter, this);
		this.resetEventAttachment = this.source.resetEvent.bind(this._onReset, this);
		this.target.addAll(this._fill());
	},
	
	destroy: function() {
		this.addEventAttachment.destroy();
		this.removeEventAttachment.destroy();
		this.replaceEventAttachment.destroy();
		this.moveEventAttachment.destroy();
		this.clearEventAttachment.destroy();
		this.reorderEventAttachment.destroy();
		this.filterEventAttachment.destroy();
		this.resetEventAttachment.destroy();
		this._clear(this.target.clear());
		this._super();
	},
	
	getKey: function(data) {
		return data._iid;
	},
	
	_clear: function(items) {
		for (var i = 0; i < items.length; ++i) {
			this.destroyItem.call(this.scope || this, items[i], this.snapshot[i]);
		}
		this.snapshot.splice(0, this.snapshot.length);
	},
	
	_fill: function() {
		var items = new Array(this.source.base.length);
		for (var i = 0; i < this.source.base.length; ++i) {
			items[i] = this.createItem.call(this.scope || this, this.source.base[i]);
		}
		JW.Array.addAll(this.snapshot, this.source.base);
		return items;
	},
	
	_onAdd: function(params) {
		var items = new Array(params.items.length);
		for (var i = 0; i < items.length; ++i) {
			items[i] = this.createItem.call(this.scope || this, params.items[i]);
		}
		this.target.addAll(items, params.index);
		JW.Array.addAll(this.snapshot, params.items, params.index);
	},
	
	_onRemove: function(params) {
		var items = this.target.remove(params.index, params.items.length);
		for (var i = 0; i < items.length; ++i) {
			this.destroyItem.call(this.scope || this, items[i], params.items[i]);
		}
		this.snapshot.splice(index, params.items.length);
	},
	
	_onReplace: function(params) {
		var oldItem = this.target.remove(params.index)[0];
		this.destroyItem.call(this.scope || this, oldItem, params.oldItem);
		
		var newItem = this.createItem.call(this.scope || this, params.newItem);
		this.target.add(newItem, params.index);
		
		this.snapshot[params.index] = params.newItem;
	},
	
	_onMove: function(params) {
		this.target.move(params.fromIndex, params.toIndex);
		this.snapshot.splice(params.fromIndex, 1);
		this.snapshot.splice(params.toIndex, 0, params.item);
	},
	
	_onClear: function() {
		this._clear(this.target.clear());
	},
	
	_onReorder: function() {
		var itemMap = {};
		for (var i = 0; i < this.snapshot.length; ++i) {
			var data = this.snapshot[i];
			var item = this.target.base[i];
			var key = this.getKey.call(this.scope || this, data);
			itemMap[key] = itemMap[key] || [];
			itemMap[key].push([ data, item ]);
		}
		
		JW.each(this.source.base, function(data, index) {
			var arr = itemMap[this.getKey.call(this.scope || this, data)];
			var pair = JW.searchBy(arr, 0, data);
			var item = pair[1];
			this.target.base.splice(index, 0, item);
			this.snapshot[index] = data;
			this.items[index] = item;
		}, this);
		
		this.target.triggerReorder();
	},
	
	_onFilter: function() {
		var snapshot = JW.Array.clear(this.snapshot);
		var items = JW.Array.clear(this.target.base);
		
		var sourceIndex = 0;
		JW.each(snapshot, function(snapshotData, snapshotIndex) {
			var item = items[snapshotIndex];
			var sourceData = this.source.getItemAt(sourceIndex);
			if (snapshotData !== sourceData) {
				this.destroyItem(item, snapshotData);
				return;
			}
			this.target.base.push(item);
			this.snapshot.push(snapshotData);
			++sourceIndex;
		}, this);
		
		this.target.triggerFilter();
	},
	
	_onReset: function() {
		this._clear(JW.Array.clear(this.target.base));
		JW.Array.addAll(this.target.base, this._fill());
		this.target.triggerReset();
	}
});
