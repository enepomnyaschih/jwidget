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
 * `<T> extends JW.AbstractCollection.Filterer<T, JW.AbstractMap<T>>`
 *
 * Фильтровщик словаря. Подробнее читайте JW.AbstractCollection.Filterer.
 *
 * @extends JW.AbstractCollection.Filterer
 *
 * @constructor
 * Конструирует синхронизатор. Предпочтительнее использовать метод JW.AbstractCollection#createFilterer.
 * @param {JW.AbstractMap} source `<T>` Исходная коллекция.
 * @param {Object} config Конфигурация (см. Config options).
 */
JW.AbstractMap.Filterer = function(source, config) {
	JW.AbstractMap.Filterer._super.call(this, source, config);
	this.target.trySetAll(JW.Map.filter(source.getJson(), this.filterItem, this.scope));
};

JW.extend(JW.AbstractMap.Filterer, JW.AbstractCollection.Filterer, {
	/**
	 * @cfg {JW.AbstractMap} target `<T>` Целевая коллекция.
	 */
	/**
	 * @property {JW.AbstractMap} source `<T>` Исходная коллекция.
	 */
	/**
	 * @property {JW.AbstractMap} target `<T>` Целевая коллекция.
	 */
	
	// override
	destroy: function() {
		this.target.tryRemoveAll(this.source.getKeys());
		this._super();
	}
});
