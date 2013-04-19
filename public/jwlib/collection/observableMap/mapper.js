﻿/*
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

JW.ObservableMap.Mapper = function(source, config) {
	JW.ObservableMap.Mapper._super.call(this, source, config);
	this._spliceEventAttachment = this.source.spliceEvent.bind(this._onSplice, this);
	this._reindexEventAttachment = this.source.reindexEvent.bind(this._onReindex, this);
	this._clearEventAttachment = this.source.clearEvent.bind(this._onClear, this);
};

JW.extend(JW.ObservableMap.Mapper/*<S extends Any, T extends Any>*/, JW.AbstractMap.Mapper/*<S, T>*/, {
	/*
	Fields
	JW.EventAttachment _spliceEventAttachment;
	JW.EventAttachment _reindexEventAttachment;
	JW.EventAttachment _clearEventAttachment;
	*/
	
	// override
	destroy: function() {
		this._clearEventAttachment.destroy();
		this._reindexEventAttachment.destroy();
		this._spliceEventAttachment.destroy();
		this._super();
	},
	
	_onSplice: function(params) {
		var removedDatas = params.removedItems;
		var addedDatas = params.addedItems;
		var spliceResult = this.target.splice(
			JW.AbstractMap.getRemovedKeys(removedDatas, addedDatas),
			JW.Map.map(addedDatas, this.createItem, this.scope || this));
		if (spliceResult) {
			this._destroyItems(spliceResult.removedItems, removedDatas);
		}
	},
	
	_onReindex: function(params) {
		this.target.reindex(params.keyMap);
	},
	
	_onClear: function(params) {
		var datas = params.items;
		var items = this.target.removeAll(JW.Map.getKeysArray(datas));
		if (items) {
			this._destroyItems(items, datas);
		}
	}
});
