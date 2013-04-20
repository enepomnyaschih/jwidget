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

JW.ObservableArray.Inserter = function(source, config) {
	JW.ObservableArray.Inserter._super.call(this, source, config);
	this._spliceEventAttachment = this.source.spliceEvent.bind(this._onSplice, this);
	this._clearEventAttachment = this.source.clearEvent.bind(this._onClear, this);
	this._reorderEventAttachment = this.source.reorderEvent.bind(this._onReorder, this);
};

JW.extend(JW.ObservableArray.Inserter/*<T>*/, JW.AbstractArray.Inserter/*<T>*/, {
	/*
	Required
	JW.ObservableArray<T> source;
	
	Fields
	JW.EventAttachment _spliceEventAttachment;
	JW.EventAttachment _clearEventAttachment;
	JW.EventAttachment _reorderEventAttachment;
	*/
	
	destroy: function() {
		this._reorderEventAttachment.destroy();
		this._clearEventAttachment.destroy();
		this._spliceEventAttachment.destroy();
		this._super();
	},
	
	_onSplice: function(params) {
		var removeParamsList = params.removeParamsList;
		var addParamsList = params.addParamsList;
		
		// if there is an effective clearing function, just reset the controller
		if (this.clearItems) {
			var removedCount = 0;
			for (var i = 0, l = removeParamsList.length; i < l; ++i) {
				removedCount += removeParamsList[i].items.length;
			}
			if (3 * removedCount > 2 * this.target.getLength()) {
				this._clearItems(params.oldItems);
				this._addItems(this.source.getItems(), 0);
				return;
			}
		}
		
		// else, splice the elements
		for (var i = removeParamsList.length - 1; i >= 0; --i) {
			var params = removeParamsList[i];
			this._removeItems(params.items, params.index);
		}
		for (var i = 0, l = addParamsList.length; i < l; ++i) {
			var params = addParamsList[i];
			this._addItems(params.items, params.index);
		}
	},
	
	_onClear: function(params) {
		this._clearItems(params.items);
	},
	
	_onReorder: function(params) {
		this._clearItems(params.oldItems);
		this._addItems(this.source.getItems(), 0);
	}
});
