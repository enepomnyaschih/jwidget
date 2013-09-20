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
 * `<T, U> extends JW.AbstractMap.Mapper<T, U>`
 *
 * Конвертер элементов оповещающего словаря. Подробнее читайте JW.AbstractCollection.Mapper.
 *
 * @extends JW.AbstractMap.Mapper
 *
 * @constructor
 * Конструирует синхронизатор. Предпочтительнее использовать метод JW.AbstractCollection#createMapper.
 * @param {JW.ObservableMap} source `<T>` Исходная коллекция.
 * @param {Object} config Конфигурация (см. Config options).
 */
JW.ObservableMap.Mapper = function(source, config) {
	JW.ObservableMap.Mapper._super.call(this, source, config);
	this._spliceEventAttachment = source.spliceEvent.bind(this._onSplice, this);
	this._reindexEventAttachment = source.reindexEvent.bind(this._onReindex, this);
	this._clearEventAttachment = source.clearEvent.bind(this._onClear, this);
};

JW.extend(JW.ObservableMap.Mapper, JW.AbstractMap.Mapper, {
	/*
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
		var sourceResult = params.spliceResult;
		var removedDatas = sourceResult.removedItems;
		var addedDatas = sourceResult.addedItems;
		var targetResult = this.target.trySplice(
			JW.Map.getRemovedKeys(removedDatas, addedDatas),
			this._createItems(addedDatas));
		if (targetResult !== undefined) {
			this._destroyItems(targetResult.removedItems, removedDatas);
		}
	},
	
	_onReindex: function(params) {
		this.target.tryReindex(params.keyMap);
	},
	
	_onClear: function(params) {
		var datas = params.items;
		this._destroyItems(this.target.tryRemoveAll(JW.Map.getKeys(datas)), datas);
	}
});