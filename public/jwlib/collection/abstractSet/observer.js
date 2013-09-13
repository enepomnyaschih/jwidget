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
 * `<T> extends JW.AbstractCollection.Observer<T, JW.AbstractSet<T>>`
 *
 * Наблюдатель множества. Подробнее читайте JW.AbstractCollection.Observer.
 *
 * @extends JW.AbstractCollection.Observer
 *
 * @constructor
 * Конструирует синхронизатор. Предпочтительнее использовать метод JW.AbstractCollection#createObserver.
 * @param {JW.AbstractSet} source `<T>` Исходная коллекция.
 * @param {Object} config Конфигурация (см. Config options).
 */
JW.AbstractSet.Observer = function(source, config) {
	JW.AbstractSet.Observer._super.call(this, source, config);
};

JW.extend(JW.AbstractSet.Observer, JW.AbstractCollection.Observer, {
	/**
	 * @property {JW.AbstractSet} source `<T>` Исходная коллекция.
	 */
});
