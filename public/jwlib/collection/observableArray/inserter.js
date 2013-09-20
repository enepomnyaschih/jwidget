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

/**
 * @class
 *
 * `<T> extends JW.AbstractArray.Inserter<T>`
 *
 * Синхронизатор представления оповещающего массива. Подробнее читайте JW.AbstractArray.Inserter.
 *
 * @extends JW.AbstractArray.Inserter
 *
 * @constructor
 * Конструирует синхронизатор. Предпочтительнее использовать метод JW.AbstractArray#createInserter.
 * @param {JW.ObservableArray} source `<T>` Исходный массив.
 * @param {Object} config Конфигурация (см. Config options).
 */
JW.ObservableArray.Inserter = function(source, config) {
	JW.ObservableArray.Inserter._super.call(this, source, config);
	this._spliceEventAttachment = source.spliceEvent.bind(this._onSplice, this);
	this._replaceEventAttachment = source.replaceEvent.bind(this._onReplace, this);
	this._moveEventAttachment = source.moveEvent.bind(this._onMove, this);
	this._clearEventAttachment = source.clearEvent.bind(this._onClear, this);
	this._reorderEventAttachment = source.reorderEvent.bind(this._onReorder, this);
};

JW.extend(JW.ObservableArray.Inserter, JW.AbstractArray.Inserter, {
	/*
	JW.EventAttachment _spliceEventAttachment;
	JW.EventAttachment _replaceEventAttachment;
	JW.EventAttachment _moveEventAttachment;
	JW.EventAttachment _clearEventAttachment;
	JW.EventAttachment _reorderEventAttachment;
	*/
	
	// override
	destroy: function() {
		this._reorderEventAttachment.destroy();
		this._clearEventAttachment.destroy();
		this._moveEventAttachment.destroy();
		this._replaceEventAttachment.destroy();
		this._spliceEventAttachment.destroy();
		this._super();
	},
	
	_onSplice: function(params) {
		var spliceResult = params.spliceResult;
		var oldItems = spliceResult.oldItems;
		var removedItems = spliceResult.getRemovedItems();
		
		// if there is an effective clearing function, just reset the controller
		if (this.clearItems && (3 * removedItems.length > 2 * oldItems.length)) {
			this.clearItems.call(this.scope, oldItems);
			this._addItems(this.source.getItems(), 0);
			return;
		}
		
		// else, splice the elements
		var removedItemsList = spliceResult.removedItemsList;
		var addedItemsList = spliceResult.addedItemsList;
		for (var i = removedItemsList.length - 1; i >= 0; --i) {
			var removeRarams = removedItemsList[i];
			this._removeItems(removeRarams.items, removeRarams.index);
		}
		for (var i = 0, l = addedItemsList.length; i < l; ++i) {
			var addParams = addedItemsList[i];
			this._addItems(addParams.items, addParams.index);
		}
	},
	
	_onReplace: function(params) {
		if (this.removeItem) {
			this.removeItem.call(this.scope, params.oldItem, params.index);
		}
		if (this.addItem) {
			this.addItem.call(this.scope, params.newItem, params.index);
		}
	},
	
	_onMove: function(params) {
		if (this.removeItem) {
			this.removeItem.call(this.scope, params.item, params.fromIndex);
		}
		if (this.addItem) {
			this.addItem.call(this.scope, params.item, params.toIndex);
		}
	},
	
	_onClear: function(params) {
		this._clearItems(params.items);
	},
	
	_onReorder: function(params) {
		this._clearItems(params.items);
		this._addItems(this.source.getItems(), 0);
	}
});