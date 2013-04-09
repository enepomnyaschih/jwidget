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

JW.ObservableArray.Observer = function(source, config) {
	JW.ObservableArray.Observer._super.call(this, source, config);
	this._addEventAttachment = this.source.addEvent.bind(this._onAdd, this);
	this._removeEventAttachment = this.source.removeEvent.bind(this._onRemove, this);
	this._replaceEventAttachment = this.source.replaceEvent.bind(this._onReplace, this);
	this._clearEventAttachment = this.source.clearEvent.bind(this._onClear, this);
	this._filterEventAttachment = this.source.filterEvent.bind(this._onFilter, this);
	this._resetEventAttachment = this.source.resetEvent.bind(this._onReset, this);
};

JW.extend(JW.ObservableArray.Observer/*<T>*/, JW.AbstractArray.Observer/*<T>*/, {
	/*
	Required
	JW.ObservableArray<T> source;
	
	Fields
	JW.EventAttachment _addEventAttachment;
	JW.EventAttachment _removeEventAttachment;
	JW.EventAttachment _replaceEventAttachment;
	JW.EventAttachment _clearEventAttachment;
	JW.EventAttachment _filterEventAttachment;
	JW.EventAttachment _resetEventAttachment;
	*/
	
	// override
	destroy: function() {
		this._resetEventAttachment.destroy();
		this._filterEventAttachment.destroy();
		this._clearEventAttachment.destroy();
		this._replaceEventAttachment.destroy();
		this._removeEventAttachment.destroy();
		this._addEventAttachment.destroy();
		this._super();
	},
	
	_onAdd: function(params) {
		JW.Array.every(params.items, this._addItem, this);
	},
	
	_onRemove: function(params) {
		JW.Array.every(params.items, this._removeItem, this);
	},
	
	_onReplace: function(params) {
		this._removeItem(params.oldItem);
		this._addItem(params.newItem);
	},
	
	_onClear: function(params) {
		this._clear(params.items);
	},
	
	_onFilter: function(params) {
		var array = this.source.array;
		var items = params.items;
		
		// if there is an effective clearing function, just reset the observer
		if (this.clearItems && (3 * array.length < items.length)) {
			this._clear(items);
			this._fill();
			return;
		}
		
		// else, remove specific elements
		var arrayIndex = 0;
		for (var itemsIndex = 0, l = items.length; itemsIndex < l; ++itemsIndex) {
			var item = items[itemsIndex];
			if (item === array[arrayIndex]) {
				++arrayIndex;
			} else {
				this._removeItem(item);
			}
		}
	},
	
	_onReset: function(params) {
		this._clear(params.items);
		this._fill();
	}
});
