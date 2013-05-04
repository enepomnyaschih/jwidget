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
	this._spliceEventAttachment = this.source.spliceEvent.bind(this._onSplice, this);
	this._replaceEventAttachment = this.source.replaceEvent.bind(this._onReplace, this);
	this._clearEventAttachment = this.source.clearEvent.bind(this._onClear, this);
};

JW.extend(JW.ObservableArray.Indexer/*<T>*/, JW.AbstractArray.Indexer/*<T>*/, {
	/*
	Fields
	JW.ObservableArray<T> source;
	JW.EventAttachment _spliceEventAttachment;
	JW.EventAttachment _replaceEventAttachment;
	JW.EventAttachment _clearEventAttachment;
	*/
	
	// override
	destroy: function() {
		this._clearEventAttachment.destroy();
		this._replaceEventAttachment.destroy();
		this._spliceEventAttachment.destroy();
		this._super();
	},
	
	_onSplice: function(params) {
		this.target.splice(
			JW.Array.map(params.spliceResult.getRemovedItems(), this.getKey, this.scope),
			JW.Array.index(params.spliceResult.getAddedItems(), this.getKey, this.scope));
	},
	
	_onReplace: function(params) {
		this.target.splice(
			[ this.getKey.call(this.scope, params.oldItem) ],
			JW.Map.single(params.newItem, this.getKey.call(this.scope, params.newItem)));
	},
	
	_onClear: function(params) {
		this.target.removeAll(JW.Array.index(params.items, this.getKey, this.scope));
	}
});
