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

JW.ObservableArray.Indexer = function(source, config) {
	JW.ObservableArray.Indexer._super.call(this, source, config);
	this._addEventAttachment = this.source.addEvent.bind(this._onAdd, this);
	this._removeEventAttachment = this.source.removeEvent.bind(this._onRemove, this);
	this._replaceEventAttachment = this.source.replaceEvent.bind(this._onReplace, this);
	this._clearEventAttachment = this.source.clearEvent.bind(this._onClear, this);
	this._filterEventAttachment = this.source.filterEvent.bind(this._onFilter, this);
	this._resetEventAttachment = this.source.resetEvent.bind(this._onReset, this);
};

JW.extend(JW.ObservableArray.Indexer/*<T extends Any>*/, JW.Array.Indexer/*<T>*/, {
	/*
	Required
	JW.ObservableArray<T> source;
	
	Optional
	JW.ObservableMap<T> target;
	
	Fields
	EventAttachment _addEventAttachment;
	EventAttachment _removeEventAttachment;
	EventAttachment _replaceEventAttachment;
	EventAttachment _clearEventAttachment;
	EventAttachment _filterEventAttachment;
	EventAttachment _resetEventAttachment;
	*/
	
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
		this.target.setAll(this._index(params.items));
	},
	
	_onRemove: function(params) {
		this.target.removeAll(this._keys(params.items));
	},
	
	_onReplace: function(params) {
		this.target._remove(this.getKey.call(this.scope || this, params.oldItem));
		this.target._set(params.newItem, this.getKey.call(this.scope || this, params.newItem));
		this.target._triggerChange();
	},
	
	_onClear: function(params) {
		this.target.removeAll(this._keys(params.items));
	},
	
	_onFilter: function(params) {
		var map = this._index(this.source.array);
		var keys = this._keys(params.items);
		this.target.removeAll(JW.Array.filter(keys, function(key) {
			return !map.hasOwnProperty(key);
		}, this));
	},
	
	_onReset: function(params) {
		this.target._removeAll(this._keys(params.items));
		this.target._setAll(this._index(this.source.array));
		this.target._triggerChange();
	}
});
