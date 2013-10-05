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

/**
 * @class
 *
 * `<T> extends JW.AbstractArray.Reverser<T>`
 *
 * Объединитель массивов. Подробнее читайте JW.AbstractArray.Reverser.
 *
 * @extends JW.AbstractArray.Reverser
 *
 * @constructor
 * Конструирует синхронизатор. Предпочтительнее использовать метод JW.AbstractArray#createReverser.
 * @param {JW.ObservableArray} source `<T>` Исходная коллекция.
 * @param {Object} config Конфигурация (см. Config options).
 */
JW.ObservableArray.Reverser = function(source, config) {
	JW.ObservableArray.Reverser._super.call(this, source, config);
	this._spliceEventAttachment = source.spliceEvent.bind(this._onSplice, this);
	this._replaceEventAttachment = source.replaceEvent.bind(this._onReplace, this);
	this._moveEventAttachment = source.moveEvent.bind(this._onMove, this);
	this._clearEventAttachment = source.clearEvent.bind(this._onClear, this);
	this._reorderEventAttachment = source.reorderEvent.bind(this._onReorder, this);
};

JW.extend(JW.ObservableArray.Reverser, JW.AbstractArray.Reverser, {
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
		var spliceResult = param.spliceResult;
		var removeParamsList = JW.Array.map(spliceResult.removedItemsList, function(indexItems) {
			var length = indexItems.items.length;
			var index = this.target.getLength() - indexItems.index - length;
			return new JW.AbstractArray.IndexCount(index, length);
		}, this);
		removeParamsList.reverse();
		var addParamsList = JW.Array.map(spliceResult.addedItemsList, function(indexItems) {
			var items = indexItems.items;
			var index = this.target.getLength() - indexItems.index - items.length;
			return new JW.AbstractArray.IndexItems(index, items);
		}, this);
		addParamsList.reverse();
		this.target.trySplice(removeParamsList, addParamsList);
	},
	
	_onReplace: function(params) {
		this.target.trySet(params.newItem, this.target.getLength() - params.index - 1);
	},
	
	_onMove: function(params) {
		this.target.tryMove(
			this.target.getLength() - params.fromIndex - 1,
			this.target.getLength() - params.toIndex - 1);
	},
	
	_onClear: function(params) {
		this.target.tryClear();
	},
	
	_onReorder: function(params) {
		var indexArray = params.indexArray;
		var length = indexArray.length;
		var indexes = new Array(indexArray.length);
		for (var i = 0; i < length; ++i) {
			indexes[length - i - 1] = length - indexArray[i] - 1;
		}
		this.target.tryReorder(indexes);
	}
});
