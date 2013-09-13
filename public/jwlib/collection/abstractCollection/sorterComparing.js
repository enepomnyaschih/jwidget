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
	this.compare = config.compare;
	this.scope = config.scope || this;
	var scope = this.scope;
	var compare = this.compare;
	this._compare = function(x, y) { return compare.call(scope, x, y); };
	this._targetCreated = config.target === undefined;
	this.target = this._targetCreated ? source.createEmptyArray() : config.target;
	this._splice([], source.asArray());
};

JW.extend(JW.AbstractCollection.SorterComparing, JW.Class, {
	/**
	 * @cfg {JW.AbstractArray} target `<T>` Целевой массив.
	 */
	/**
	 * @cfg {Function} compare (required)
	 *
	 * `compare(t1: T, t2: T): number`
	 *
	 * Функция-компаратор.
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
	// number _compare(T x, T y);
	
	// override
	destroy: function() {
		this._splice(this.source.asArray());
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
		this.target.sortComparing(this._compare);
	},
	
	_splice: function(removedItems, addedItems) {
		var removes = JW.Array.toSet(removedItems);
		var adds = addedItems.concat();
		adds.sort(this._compare);
		var iTarget = 0;
		var iAdds = 0;
		var i = 0;
		var result = new Array(this.target.length + addedItems.length - removedItems.length);
		while (iTarget < this.target.length) {
			var value = this.target[iTarget];
			if (JW.Set.contains(removes, value)) {
				++iTarget;
			} else {
				while ((iAdds < adds.length) && (this._compare(adds[iAdds], value) < 0)) {
					result[i++] = adds[iAdds++];
				}
				result[i++] = this.target[iTarget++];
			}
		}
		while (i < result.length) {
			result[i++] = adds[iAdds++];
		}
		this.target.performSplice(result);
	}
});
