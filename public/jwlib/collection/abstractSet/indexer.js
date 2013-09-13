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
 * `<T extends JW.Class> extends JW.AbstractCollection.Indexer<T, JW.AbstractSet<T>>`
 *
 * Индексатор множества. Подробнее читайте JW.AbstractCollection.Indexer.
 *
 * @extends JW.AbstractCollection.Indexer
 *
 * @constructor
 * Конструирует синхронизатор. Предпочтительнее использовать метод JW.AbstractCollection#createIndexer.
 * @param {JW.AbstractSet} source `<T>` Коллекция-источник.
 * @param {Object} config Конфигурация (см. Config options).
 */
JW.AbstractSet.Indexer = function(source, config) {
	JW.AbstractSet.Indexer._super.call(this, source, config);
};

JW.extend(JW.AbstractSet.Indexer, JW.AbstractCollection.Indexer, {
	/**
	 * @property {JW.AbstractSet} source `<T>` Коллекция-источник.
	 */
});
