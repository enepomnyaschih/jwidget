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

JW.Collection.Lister = function(config) {
	JW.Collection.Lister._super.call(this);
	this.source = config.source;
	this._targetCreated = !config.target;
	this.target = config.target || new JW.Set();
	this._addEventAttachment = this.source.addEvent.bind(this._onAdd, this);
	this._removeEventAttachment = this.source.removeEvent.bind(this._onRemove, this);
	this._replaceEventAttachment = this.source.replaceEvent.bind(this._onReplace, this);
	this._clearEventAttachment = this.source.clearEvent.bind(this._onClear, this);
	this._filterEventAttachment = this.source.filterEvent.bind(this._onFilter, this);
	this._resetEventAttachment = this.source.resetEvent.bind(this._onReset, this);
	this.target.addAll(this.source.base);
};

JW.extend(JW.Collection.Lister/*<T extends JW.Class>*/, JW.Class, {
	/*
	Required
	JW.Collection<T> source;
	JW.Set<T> target;
	
	Fields
	Boolean _targetCreated;
	EventAttachment _addEventAttachment;
	EventAttachment _removeEventAttachment;
	EventAttachment _replaceEventAttachment;
	EventAttachment _clearEventAttachment;
	EventAttachment _filterEventAttachment;
	EventAttachment _resetEventAttachment;
	*/
	
	destroy: function() {
		this.target.clear();
		this._resetEventAttachment.destroy();
		this._filterEventAttachment.destroy();
		this._clearEventAttachment.destroy();
		this._replaceEventAttachment.destroy();
		this._removeEventAttachment.destroy();
		this._addEventAttachment.destroy();
		if (this._targetCreated) {
			this.target.destroy();
		}
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
		var map = JW.indexBy(this.source.base, "_iid");
		var items = [];
		var base = this.target.base;
		for (var iid in base) {
			if (!map.hasOwnProperty(iid)) {
				items.push(base[iid]);
			}
		}
		this.target.removeAll(items);
	},
	
	_onReset: function() {
		this.target._clear();
		this.target._fill(this.source.base);
		this.target._triggerChange();
	}
});
