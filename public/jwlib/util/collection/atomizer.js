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

// TODO: Filter from end to begin

JW.Collection.Atomizer/*<T extends JW.Class>*/ = JW.Class.extend({
	/*
	Required
	JW.Collection<T> collection;
	
	Optional
	Object scope; // defaults to this
	
	Abstract methods
	void addItem(T item, Integer index);
	void removeItem(Integer index, T item);
	void clearItems(); // optional
	
	Fields
	EventAttachment addEventAttachment;
	EventAttachment removeEventAttachment;
	EventAttachment replaceEventAttachment;
	EventAttachment moveEventAttachment;
	EventAttachment clearEventAttachment;
	EventAttachment reorderEventAttachment;
	EventAttachment filterEventAttachment;
	EventAttachment resetEventAttachment;
	Array<T> snapshot;
	*/
	
	init: function(config) {
		this._super();
		JW.apply(this, config);
		this.addEventAttachment = this.collection.addEvent.bind(this._onAdd, this);
		this.removeEventAttachment = this.collection.removeEvent.bind(this._onRemove, this);
		this.replaceEventAttachment = this.collection.replaceEvent.bind(this._onReplace, this);
		this.moveEventAttachment = this.collection.moveEvent.bind(this._onMove, this);
		this.clearEventAttachment = this.collection.clearEvent.bind(this._onClear, this);
		this.reorderEventAttachment = this.collection.reorderEvent.bind(this._onReorder, this);
		this.filterEventAttachment = this.collection.filterEvent.bind(this._onFilter, this);
		this.resetEventAttachment = this.collection.resetEvent.bind(this._onReset, this);
		this.snapshot = [];
		this._fill();
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
		this._clear();
		this._super();
	},
	
	_addItem: function(item, index) {
		this.snapshot.splice(index, 0, item);
		this.addItem.call(this.scope || this, item, index);
	},
	
	_addItems: function(items, index) {
		for (var i = 0; i < items.length; ++i) {
			this._addItem(items[i], i + index);
		}
	},
	
	_removeItem: function(index) {
		var item = this.snapshot.splice(index, 1)[0];
		this.removeItem.call(this.scope || this, index, item);
	},
	
	_removeItems: function(index, count) {
		for (var i = count - 1; i >= 0; --i) {
			this._removeItem(i + index);
		}
	},
	
	_fill: function() {
		this._addItems(this.collection.base.concat(), 0);
	},
	
	_clear: function() {
		if (this.clearItems) {
			JW.Array.clear(this.snapshot);
			this.clearItems.call(this.scope || this);
		} else {
			this._removeItems(0, this.snapshot.length);
		}
	},
	
	_onAdd: function(params) {
		this._addItems(params.items, params.index);
	},
	
	_onRemove: function(params) {
		this._removeItems(params.index, params.items.length);
	},
	
	_onReplace: function(params) {
		this._removeItem(params.index);
		this._addItem(params.newItem, params.index);
	},
	
	_onMove: function(params) {
		this._removeItem(params.fromIndex);
		this._addItem(params.item, params.toIndex);
	},
	
	_onClear: function() {
		this._clear();
	},
	
	_onReorder: function() {
		this._clear();
		this._fill();
	},
	
	_onFilter: function() {
		// if there is an effective clearing function, just reset the controller
		if (this.clearItems && (3 * this.collection.base.length < this.snapshot.length)) {
			this._clear();
			this._fill();
			return;
		}
		
		// else, remove specific elements
		var index = 0;
		while (index < this.snapshot.length) {
			if (this.snapshot[index] === this.collection.base[index]) {
				++index;
			} else {
				this._removeItem(index);
			}
		}
	},
	
	_onReset: function() {
		this._clear();
		this._fill();
	}
});
