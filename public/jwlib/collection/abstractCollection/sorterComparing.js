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
 * `<T, C extends JW.AbstractCollection<T>>`
 *
 * Конвертер в массив (сортировщик по компаратору). Преобразует исходную коллекцию в массив. Новые элементы
 * добавляются в такое место массива, что массив всегда остается в отсортированном состоянии.
 * Сортировка осуществляется по функции-компаратору, указанной пользователем.
 * 
 * **Замечание:** Элементы исходной коллекции не должны повторяться.
 * 
 * Создавайте конвертер с помощью метода JW.AbstractCollection#createSorterComparing:
 *
 *     var sorter = collection.createSorterComparing({
 *         compare: function(x, y) {
 *             return JW.cmp(x.title, y.title, true) || JW.cmp(x.id, y.id);
 *         },
 *         scope: this
 *     });
 *     var array = sorter.target;
 *
 * Метод сам определит, какая реализация конвертера лучше подойдет (простая или observable).
 *
 * Массив можно передать в качестве конфигурационной опции:
 *
 *     var array = new JW.Array();
 *     var sorter = collection.createSorterComparing({
 *         target: array,
 *         compare: function(x, y) {
 *             return JW.cmp(x.title, y.title, true) || JW.cmp(x.id, y.id);
 *         },
 *         scope: this
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
 * Конструирует конвертер. Предпочтительнее использовать метод JW.AbstractCollection#createSorterComparing.
 * @param {JW.AbstractCollection} source `<T>` Исходная коллекция.
 * @param {Object} config Конфигурация (см. Config options).
 */
JW.AbstractCollection.SorterComparing = function(source, config) {
	JW.AbstractCollection.SorterComparing._super.call(this);
	config = config || {};
	this.source = source;
	this.compare = config.compare || JW.cmp;
	this.scope = config.scope || this;
	var scope = this.scope;
	var compare = this.compare;
	this._targetCreated = !config.target;
	this.target = this._targetCreated ? source.createEmptyArray() : config.target;
	this._splice([], source.asArray());
};

JW.extend(JW.AbstractCollection.SorterComparing, JW.Class, {
	/**
	 * @cfg {JW.AbstractArray} target `<T>` Целевой массив.
	 */
	/**
	 * @cfg {Function} compare
	 *
	 * `compare(t1: T, t2: T): number`
	 *
	 * Функция-компаратор. По умолчанию равна JW.cmp.
	 */
	/**
	 * @cfg {Object} scope Контекст вызова compare.
	 */
	/**
	 * @property {C} source Исходная коллекция.
	 */
	/**
	 * @property {JW.AbstractArray} target `<T>` Целевой массив.
	 */
	// boolean _targetCreated;
	
	// override
	destroy: function() {
		this._splice(this.source.asArray(), []);
		if (this._targetCreated) {
			this.target.destroy();
		}
		this._super();
	},
	
	/**
	 * Пересортирует целевой массив. Этот метод следует вызывать после смены факторов, влияющих на порядок элементов.
	 * @returns {void}
	 */
	resort: function() {
		this.target.sortComparing(this.compare, this.scope);
	},
	
	_splice: function(removedItems, addedItems) {
		var removedItemsSorted = JW.Array.toSortedComparing(removedItems, this.compare, this.scope);
		var addedItemsSorted = JW.Array.toSortedComparing(addedItems, this.compare, this.scope);
		removedItems = new Array(removedItems.length);
		addedItems = new Array(addedItems.length);
		var iRemoved = 0;
		var iAdded = 0;
		var jRemoved = 0;
		var jAdded = 0;
		// ignore out the items which are removed and added at the same time
		while ((iRemoved < removedItemsSorted.length) || (iAdded < addedItemsSorted.length)) {
			var removedItem = removedItemsSorted[iRemoved];
			var addedItem = addedItemsSorted[iAdded];
			var c = JW.cmp(removedItem === undefined, addedItem === undefined) ||
				this.compare.call(this.scope, removedItem, addedItem);
			if (c < 0) {
				removedItems[jRemoved++] = removedItem;
				++iRemoved;
			} else if (c > 0) {
				addedItems[jAdded++] = addedItem;
				++iAdded;
			} else {
				++iRemoved;
				++iAdded;
			}
		}
		removedItems.splice(jRemoved, removedItems.length - jRemoved);
		addedItems.splice(jAdded, addedItems.length - jAdded);
		
		var iAdds = 0;
		var addShift = 0;
		var removeParamsList = [];
		var addParamsList = [];
		var removeParams = null;
		for (iTarget = 0, lTarget = this.target.getLength(); iTarget < lTarget; ++iTarget) {
			var value = this.target.get(iTarget);
			if (removedItems[JW.Array.binarySearch(removedItems, value, this.compare, this.scope) - 1] === value) {
				if (!removeParams) {
					removeParams = new JW.AbstractArray.IndexCount(iTarget, 0);
					removeParamsList.push(removeParams);
				}
				++removeParams.count;
				--addShift;
			} else {
				removeParams = null;
				var addParams = new JW.AbstractArray.IndexItems(iTarget + addShift, []);
				while ((iAdds < addedItems.length) && (this.compare.call(this.scope, addedItems[iAdds], value) < 0)) {
					addParams.items.push(addedItems[iAdds++]);
					++addShift;
				}
				if (addParams.items.length !== 0) {
					addParamsList.push(addParams);
				}
			}
		}
		if (iAdds < addedItems.length) {
			addParamsList.push(new JW.AbstractArray.IndexItems(iTarget + addShift, addedItems.slice(iAdds)));
		}
		this.target.splice(removeParamsList, addParamsList);
	}
});
