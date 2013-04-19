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

JW.ObservableSet.Mapper = function(source, config) {
	JW.ObservableSet.Mapper._super.call(this, source, config);
	this._spliceEventAttachment = this.source.spliceEvent.bind(this._onSplice, this);
	this._clearEventAttachment = this.source.clearEvent.bind(this._onClear, this);
};

JW.extend(JW.ObservableSet.Mapper/*<S extends JW.Class, T extends JW.Class>*/, JW.AbstractSet.Mapper/*<S, T>*/, {
	/*
	Fields
	EventAttachment _spliceEventAttachment;
	EventAttachment _clearEventAttachment;
	*/
	
	destroy: function() {
		this._clearEventAttachment.destroy();
		this._spliceEventAttachment.destroy();
		this._super();
	},
	
	_onSplice: function(params) {
		var removedDatas = params.removedItems;
		var addedDatas = params.addedItems;
		this.target.splice(
			this._getItems(removedDatas),
			JW.Array.map(addedDatas, this._createItem, this));
		JW.Array.every(removedDatas, this._destroyItem, this);
	},
	
	_onClear: function(params) {
		var datas = params.items;
		this.target.removeAll(this._getItems(datas));
		JW.Array.every(datas, this._destroyItem, this);
	}
});
