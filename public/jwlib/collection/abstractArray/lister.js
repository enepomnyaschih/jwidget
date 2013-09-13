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
 * `<T extends JW.Class> extends JW.AbstractCollection.Lister<T, JW.AbstractArray<T>>`
 *
 * Конвертер массива в множество. Подробнее читайте JW.AbstractCollection.Lister.
 *
 * @extends JW.AbstractCollection.Lister
 *
 * @constructor
 * Конструирует конвертер. Предпочтительнее использовать метод JW.AbstractCollection#createLister.
 * @param {JW.AbstractArray} source `<T>` Коллекция-источник.
 * @param {Object} config Конфигурация (см. Config options).
 */
JW.AbstractArray.Lister = function(source, config) {
	JW.AbstractArray.Lister._super.call(this, source, config);
};

JW.extend(JW.AbstractArray.Lister, JW.AbstractCollection.Lister, {
	/**
	 * @property {JW.AbstractArray} source `<T>` Коллекция-источник.
	 */
});
