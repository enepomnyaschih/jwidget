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
 * `<T, U> extends JW.AbstractCollection.Mapper<T, U, JW.AbstractArray<T>, JW.AbstractArray<U>>`
 *
 * Конвертер элементов массива. Подробнее читайте JW.AbstractCollection.Mapper.
 *
 * @extends JW.AbstractCollection.Mapper
 *
 * @constructor
 * Конструирует синхронизатор. Предпочтительнее использовать метод JW.AbstractCollection#createMapper.
 * @param {JW.AbstractArray} source `<T>` Исходная коллекция.
 * @param {Object} config Конфигурация (см. Config options).
 */
JW.AbstractArray.Mapper = function(source, config) {
	JW.AbstractArray.Mapper._super.call(this, source, config);
	this.target.tryAddAll(this._createItems(this.source.getItems()));
};

JW.extend(JW.AbstractArray.Mapper, JW.AbstractCollection.Mapper, {
	/**
	 * @cfg {JW.AbstractArray} target `<U>` Целевая коллекция.
	 */
	/**
	 * @property {JW.AbstractArray} source `<T>` Исходная коллекция.
	 */
	/**
	 * @property {JW.AbstractArray} target `<U>` Целевая коллекция.
	 */
	
	// override
	destroy: function() {
		this._destroyItems(this.target.clear(), this.source.getItems());
		this._super();
	},
	
	_createItems: function(datas) {
		var items = [];
		for (var i = 0, l = datas.length; i < l; ++i) {
			items.push(this.createItem.call(this.scope, datas[i]));
		}
		return items;
	},
	
	_destroyItems: function(items, datas) {
		if (this.destroyItem === undefined) {
			return;
		}
		for (var i = items.length - 1; i >= 0; --i) {
			this.destroyItem.call(this.scope, items[i], datas[i]);
		}
	}
});
