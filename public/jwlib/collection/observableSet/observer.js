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

JW.ObservableSet.Observer = function(source, config) {
	JW.ObservableSet.Observer._super.call(this, source, config);
	this._addEventAttachment = this.source.addEvent.bind(this._onAdd, this);
	this._removeEventAttachment = this.source.removeEvent.bind(this._onRemove, this);
};

JW.extend(JW.ObservableSet.Observer/*<S extends Any, T extends Any>*/, JW.AbstractSet.Observer/*<S, T>*/, {
	/*
	Fields
	EventAttachment _addEventAttachment;
	EventAttachment _removeEventAttachment;
	*/
	
	// override
	destroy: function() {
		this._removeEventAttachment.destroy();
		this._addEventAttachment.destroy();
		this._super();
	},
	
	_onAdd: function(params) {
		this._addItem(params.item);
	},
	
	_onRemove: function(params) {
		this._removeItem(params.item);
	}
});
