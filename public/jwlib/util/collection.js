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

// TODO: tests for bulk changes, "change" event and "lengthchange" event

JW.Collection/*<T>*/ = JW.Observable.extend({
	/*
	Events
	add(JW.Event event, Integer index, T item);
	remove(JW.Event event, Integer index, T item);
	replace(JW.Event event, Integer index, T oldItem, T newItem);
	move(JW.Event event, Integer fromIndex, Integer toIndex, T item);
	clear(JW.Event event);
	reorder(JW.Event event);
	filter(JW.Event event);
	reset(JW.Event event);
	change(JW.Event event);
	lengthchange(JW.Event event, Integer length);
	
	Fields
	Array<T> base;
	Integer bulkCount;
	Boolean bulkDirty;
	Integer bulkLength;
	*/
	
	bulkCount : 0,
	
	init: function(base) {
		this._super();
		this.base = JW.makeArray(base).concat();
	},
	
	destroy: function() {
		this.clear();
		this._super();
	},
	
	getLength: function() {
		return this.base.length;
	},
	
	isEmpty: function() {
		return this.base.length === 0;
	},
	
	getItemAt: function(index) {
		return this.base[index];
	},
	
	addItem: function(item) {
		this.addItemAt(item, this.getLength());
	},
	
	addItemAt: function(item, index) {
		this.base.splice(index, 0, item);
		this.trigger("add", index, item);
		this._triggerLengthChange();
	},
	
	removeItem: function(item) {
		var index = JW.Array.indexOf(this.base, item);
		if (index === -1) {
			throw new Error("Can not find item in collection");
		}
		this.removeItemAt(index);
	},
	
	removeItemAt: function(index) {
		var item = this.base[index];
		this.base.splice(index, 1);
		this.trigger("remove", index, item);
		this._triggerLengthChange();
		return item;
	},
	
	setItem: function(index, item) {
		var oldItem = this.base[index];
		this.base[index] = item;
		this.trigger("replace", index, oldItem, item);
		this._triggerChange();
		return item;
	},
	
	moveItem: function(fromIndex, toIndex) {
		var item = this.base[fromIndex];
		this.base.splice(fromIndex, 1);
		this.base.splice(toIndex, 0, item);
		this.trigger("move", fromIndex, toIndex, item);
		this._triggerChange();
		return item;
	},
	
	clear: function() {
		if (this.isEmpty()) {
			return;
		}
		this.base.splice(0, this.base.length);
		this.trigger("clear");
		this._triggerLengthChange();
	},
	
	triggerReorder: function() {
		this.trigger("reorder");
		this._triggerChange();
	},
	
	triggerFilter: function() {
		this.trigger("filter");
		this._triggerLengthChange();
	},
	
	triggerReset: function() {
		this.trigger("reset");
		this._triggerLengthChange();
	},
	
	startBulkChange: function() {
		++this.bulkCount;
		if (this.bulkCount !== 1) {
			return;
		}
		this.bulkDirty = false;
		this.bulkLength = this.getLength();
	},
	
	stopBulkChange: function() {
		if (this.bulkCount === 0) {
			return;
		}
		--this.bulkCount;
		if (this.bulkCount !== 0) {
			return;
		}
		if (this.bulkDirty) {
			this.trigger("change");
		}
		if (this.bulkLength !== this.getLength()) {
			this.trigger("lengthchange");
		}
	},
	
	every: function(callback, scope) {
		return JW.every(this.base, callback, scope);
	},
	
	createEmpty: function() {
		return new JW.Collection();
	},
	
	pushItem: function(value, index) {
		this.base.push(value);
		return this;
	},
	
	_triggerChange: function() {
		if (this.bulkCount !== 0) {
			this.bulkDirty = true;
		} else {
			this.trigger("change");
		}
	},
	
	_triggerLengthChange: function() {
		this._triggerChange();
		if (this.bulkCount === 0) {
			this.trigger("lengthchange");
		}
	}
});

JW.applyIf(JW.Collection.prototype, JW.Alg.SimpleMethods);
JW.applyIf(JW.Collection.prototype, JW.Alg.BuildMethods);
