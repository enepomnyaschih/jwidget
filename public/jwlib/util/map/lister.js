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

JW.Map.Lister = function(config) {
	JW.Map.Lister._super.call(this);
	this.source = config.source;
	this._targetCreated = !config.target;
	this.target = config.target || new JW.Set();
	this._addEventAttachment = this.source.addEvent.bind(this._onAdd, this);
	this._removeEventAttachment = this.source.removeEvent.bind(this._onRemove, this);
	this._changeEventAttachment = this.source.changeEvent.bind(this._onChange, this);
	this.source.every(this._add, this);
	this.target._triggerChange();
};

JW.extend(JW.Map.Lister/*<T extends JW.Class>*/, JW.Class, {
	/*
	Required
	JW.Map<T> source;
	
	Optional
	JW.Set<T> target;
	
	Fields
	Boolean _targetCreated;
	EventAttachment _addEventAttachment;
	EventAttachment _removeEventAttachment;
	EventAttachment _changeEventAttachment;
	*/
	
	destroy: function() {
		this.source.every(this._remove, this);
		this.target._triggerChange();
		this._changeEventAttachment.destroy();
		this._removeEventAttachment.destroy();
		this._addEventAttachment.destroy();
		if (this._targetCreated) {
			this.target.destroy();
		}
		this._super();
	},
	
	_add: function(item) {
		this.target._add(item);
		return true;
	},
	
	_remove: function(item) {
		this.target._remove(item);
		return true;
	},
	
	_onAdd: function(params) {
		this._add(params.item);
	},
	
	_onRemove: function(params) {
		this._remove(params.item);
	},
	
	_onChange: function() {
		this.target._triggerChange();
	}
});
