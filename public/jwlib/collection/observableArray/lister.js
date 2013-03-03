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

JW.ObservableArray.Lister = function(source, config) {
	JW.ObservableArray.Lister._super.call(this, source, config);
	this._addEventAttachment = this.source.addEvent.bind(this._onAdd, this);
	this._removeEventAttachment = this.source.removeEvent.bind(this._onRemove, this);
	this._replaceEventAttachment = this.source.replaceEvent.bind(this._onReplace, this);
	this._clearEventAttachment = this.source.clearEvent.bind(this._onClear, this);
	this._filterEventAttachment = this.source.filterEvent.bind(this._onFilter, this);
	this._resetEventAttachment = this.source.resetEvent.bind(this._onReset, this);
};

JW.extend(JW.ObservableArray.Lister/*<T extends JW.Class>*/, JW.AbstractArray.Lister/*<T>*/, {
	/*
	Required
	JW.ObservableArray<T> source;
	
	Optional
	JW.ObservableSet<T> target;
	
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
		this.target.addAll(params.items);
	},
	
	_onRemove: function(params) {
		this.target.removeAll(params.items);
	},
	
	_onReplace: function(params) {
		this.target._remove(params.oldItem);
		this.target._add(params.newItem);
		this.target._triggerChange();
	},
	
	_onClear: function() {
		this.target.clear();
	},
	
	_onFilter: function() {
		var map = JW.Array.indexBy(this.source.array, "_iid");
		var items = [];
		var json = this.target.set.json;
		for (var iid in json) {
			if (!map.hasOwnProperty(iid)) {
				items.push(json[iid]);
			}
		}
		this.target.removeAll(items);
	},
	
	_onReset: function() {
		this.target._clear();
		this.target._addAll(this.source.array);
		this.target._triggerChange();
	}
});
