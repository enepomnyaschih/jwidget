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
 * `<T extends JW.Class> extends JW.AbstractCollection.Orderer<T, JW.AbstractSet<T>>`
 *
 * Конвертер множества в массив (упорядочитель). Подробнее читайте JW.AbstractCollection.Orderer.
 *
 * @extends JW.AbstractCollection.Orderer
 *
 * @constructor
 * Конструирует конвертер. Предпочтительнее использовать метод JW.AbstractCollection#createOrderer.
 * @param {JW.AbstractSet} source `<T>` Исходная коллекция.
 * @param {Object} config Конфигурация (см. Config options).
 */
JW.AbstractSet.Orderer = function(source, config) {
	JW.AbstractSet.Orderer._super.call(this, source, config);
};

JW.extend(JW.AbstractSet.Orderer, JW.AbstractCollection.Orderer, {
	/**
	 * @property {JW.AbstractSet} source `<T>` Исходная коллекция.
	 */
});
