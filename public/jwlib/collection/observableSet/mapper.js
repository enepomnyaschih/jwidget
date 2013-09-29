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
 * `<T extends JW.Class, U extends JW.Class> extends JW.AbstractSet.Mapper<T, U>`
 *
 * Конвертер элементов оповещающего множества. Подробнее читайте JW.AbstractCollection.Mapper.
 *
 * @extends JW.AbstractSet.Mapper
 *
 * @constructor
 * Конструирует синхронизатор. Предпочтительнее использовать метод JW.AbstractCollection#createMapper.
 * @param {JW.ObservableSet} source `<T>` Исходная коллекция.
 * @param {Object} config Конфигурация (см. Config options).
 */
JW.ObservableSet.Mapper = function(source, config) {
	JW.ObservableSet.Mapper._super.call(this, source, config);
	this._spliceEventAttachment = source.spliceEvent.bind(this._onSplice, this);
	this._clearEventAttachment = source.clearEvent.bind(this._onClear, this);
};

JW.extend(JW.ObservableSet.Mapper, JW.AbstractSet.Mapper, {
	/*
	EventAttachment _spliceEventAttachment;
	EventAttachment _clearEventAttachment;
	*/
	
	// override
	destroy: function() {
		this._clearEventAttachment.destroy();
		this._spliceEventAttachment.destroy();
		this._super();
	},
	
	_onSplice: function(params) {
		var spliceResult = params.spliceResult;
		var removedDatas = spliceResult.removedItems;
		var addedDatas = spliceResult.addedItems;
		this.target.trySplice(this._getItems(removedDatas), this._createItems(addedDatas));
		this._destroyItems(removedDatas);
	},
	
	_onClear: function(params) {
		var datas = params.items;
		this.target.tryRemoveAll(this._getItems(datas));
		this._destroyItems(datas);
	}
});