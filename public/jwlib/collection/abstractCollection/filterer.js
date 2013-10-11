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
 * `<T, C extends JW.AbstractCollection<T>>`
 *
 * Фильтровщик коллекции. Создает новую коллекцию того же типа, включающую только те
 * элементы исходной коллекции, для которых указанная функция возвращает значение !== false.
 * Для массива синхронизатор сохранит порядок элементов.
 *
 *     var source = new JW.ObservableArray([1, 2, 3]);
 *     var filterer = source.{@link JW.AbstractCollection#createFilterer createFilterer}({
 *         {@link #cfg-filterItem filterItem}: function(x) { return x % 2 === 1; }
 *     });
 *     assert(filterer.{@link #property-target target}.{@link JW.AbstractArray#equal equal}([1, 3]));
 *     
 *     source.{@link JW.AbstractArray#addAll addAll}([4, 7, 1, 6]);
 *     assert(filterer.{@link #property-target target}.{@link JW.AbstractArray#equal equal}([1, 3, 7, 1]));
 *
 *     source.{@link JW.AbstractArray#move move}(2, 6); // move "3" item to the end
 *     assert(filterer.{@link #property-target target}.{@link JW.AbstractArray#equal equal}([1, 7, 1, 3]));
 *
 * Создавайте синхронизатор с помощью метода JW.AbstractCollection#createFilterer.
 * Метод сам определит, какая реализация синхронизатора лучше подойдет (простая или observable).
 *
 * Целевую коллекцию можно передать в качестве конфигурационной опции:
 *
 *     var source = new JW.Set();
 *     var target = new JW.Set();
 *     var filterer = source.{@link JW.AbstractCollection#createFilterer createFilterer}({
 *         {@link #cfg-target target}: target,
 *         {@link #cfg-filterItem filterItem}: this._filterItem,
 *         {@link #cfg-scope scope}: this
 *     });
 *
 * Правила работы синхронизатора:
 *
 * - Целевая коллекция находится в поле {@link #property-target}.
 * - При конструировании синхронизатора отфильтрованные элементы исходной коллекции сразу добавляются в
 * {@link #property-target}.
 * - При уничтожении синхронизатора все элементы удаляются из {@link #property-target}.
 * - Целевую коллекцию можно передать в качестве конфигурационной опции {@link #cfg-target}.
 * В этом случае, вся забота о ее уничтожении ложится на вас (хотя элементы будут из нее удалены автоматически
 * при уничтожении синхронизатора).
 * - Если {@link #cfg-target} не передан, то он будет создан автоматически. Синхронизатор подберет наиболее подходящую
 * реализацию {@link #property-target} (простая или observable). В этом
 * случае, {@link #property-target} будет уничтожен автоматически при уничтожении синхронизатора.
 *
 * **Дополнительные правила для различных типов коллекций**
 *
 * JW.AbstractArray:
 *
 * - При конструировании синхронизатора целевая коллекция должна быть пуста.
 * - Целевую коллекцию можно синхронизировать только с одной исходной коллекцией.
 *
 * JW.AbstractMap:
 *
 * - Целевую коллекцию можно синхронизировать с несколькими исходными коллекциями, если ключи всех элементов различны.
 * - В целевую коллекцию можно добавлять элементы вручную, если их ключи не пересекаются с ключами других элементов.
 *
 * JW.AbstractSet:
 *
 * - Целевую коллекцию можно синхронизировать с несколькими исходными коллекциями, если все элементы различны.
 * - В целевую коллекцию можно добавлять элементы вручную, если они не пересекаются с другими элементами.
 *
 * @extends JW.Class
 *
 * @constructor
 * Конструирует синхронизатор. Предпочтительнее использовать метод JW.AbstractCollection#createFilterer.
 * @param {JW.AbstractCollection} source `<T>` Исходная коллекция.
 * @param {Object} config Конфигурация (см. Config options).
 */
JW.AbstractCollection.Filterer = function(source, config) {
	JW.AbstractCollection.Filterer._super.call(this);
	config = config || {};
	this.source = source;
	this.filterItem = config.filterItem;
	this._targetCreated = !config.target;
	this.target = this._targetCreated ? this.source.createEmpty() : config.target;
	this.scope = config.scope || this;
};

JW.extend(JW.AbstractCollection.Filterer, JW.Class, {
	/**
	 * @cfg {C} target Целевая коллекция.
	 */
	/**
	 * @cfg {Function} filterItem (required)
	 *
	 * `filterItem(item: T): boolean`
	 *
	 * Фильтрующая функция. Элемент появится в целевой коллекции, если результат запуска фильтрующей функции на этом
	 * элементе !== false.
	 */
	/**
	 * @cfg {Object} scope Контекст вызова filterItem.
	 */
	/**
	 * @property {C} source Исходная коллекция.
	 */
	/**
	 * @property {C} target Целевая коллекция.
	 */
	// boolean _targetCreated;
	
	// override
	destroy: function() {
		if (this._targetCreated) {
			this.target.destroy();
		}
		this._super();
	}
});