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
 * `<T extends JW.Class, C extends JW.AbstractCollection<T>>`
 *
 * Конвертер в массив (упорядочитель). Преобразует исходную коллекцию в массив. Новые элементы добавляются в конец
 * массива.
 * 
 * **Замечание:** Элементы исходной коллекции не должны повторяться.
 * 
 * Создавайте конвертер с помощью метода JW.AbstractCollection#createOrderer:
 *
 *     var orderer = collection.createOrderer();
 *     var array = orderer.target;
 *
 * Метод сам определит, какая реализация конвертера лучше подойдет (простая или observable).
 *
 * Массив можно передать в качестве конфигурационной опции:
 *
 *     var array = new JW.Array();
 *     var orderer = collection.createOrderer({
 *         target: array
 *     });
 *
 * Правила работы конвертера:
 *
 * - Целевой массив находится в поле {@link #property-target}.
 * - При конструировании конвертера все элементы исходной коллекции сразу добавляются в {@link #property-target}.
 * - При уничтожении конвертера все элементы исходной коллекции удаляются из {@link #property-target}.
 * - Массив можно передать в качестве конфигурационной опции {@link #cfg-target}.
 * В этом случае, вся забота о его уничтожении ложится на вас.
 * - Если {@link #cfg-target} не передан, то он будет создан автоматически. Конвертер подберет наиболее подходящую
 * реализацию {@link #property-target} (простая или observable). В этом
 * случае, {@link #property-target} будет уничтожен автоматически при уничтожении конвертера.
 * - Можно конвертировать несколько коллекций в один и тот же массив, если все элементы различны.
 *
 * @extends JW.Class
 *
 * @constructor
 * Конструирует конвертер. Предпочтительнее использовать метод JW.AbstractCollection#createOrderer.
 * @param {JW.AbstractCollection} source `<T>` Исходная коллекция.
 * @param {Object} config Конфигурация (см. Config options).
 */
JW.AbstractCollection.Orderer = function(source, config) {
	JW.AbstractCollection.Orderer._super.call(this);
	config = config || {};
	this.source = source;
	this._targetCreated = !config.target;
	this.target = this._targetCreated ? source.createEmptyArray() : config.target;
	this.target.tryAddAll(source.asArray());
};

JW.extend(JW.AbstractCollection.Orderer, JW.Class, {
	/**
	 * @property {C} source Исходная коллекция.
	 */
	/**
	 * @cfg {JW.AbstractArray} target `<T>` Целевой массив.
	 */
	/**
	 * @property {JW.AbstractArray} target `<T>` Целевой массив.
	 */
	// boolean _targetCreated;
	
	// override
	destroy: function() {
		this.target.removeItems(this.source.asArray());
		if (this._targetCreated) {
			this.target.destroy();
		}
		this._super();
	},
	
	_splice: function(removedItemsSet, addedItemsSet) {
		var filteredItems = this.target.filter(function(item) {
			return !JW.Set.contains(removedItemsSet, item) || JW.Set.contains(addedItemsSet, item);
		}, this);
		var addedItems = JW.Set.$toArray(addedItemsSet).filter(function(item) {
			return !JW.Set.contains(removedItemsSet, item);
		}, this);
		this.target.trySplice(
			this.target.detectFilter(filteredItems) || [],
			[new JW.AbstractArray.IndexItems(filteredItems.length, addedItems)]
		);
	}
});
