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
 * `<T>`
 *
 * Обратитель массива. Создает массив, содержащий все элементы исходного массива в обратном порядке.
 *
 *     var source = new JW.ObservableArray([1, 2, 3]);
 *     var reverser = source.{@link JW.AbstractArray#createReverser createReverser}();
 *     assert(reverser.{@link #property-target target}.{@link JW.AbstractArray#equal equal}([3, 2, 1]));
 *     
 *     source.{@link JW.AbstractArray#add add}(4);
 *     assert(reverser.{@link #property-target target}.{@link JW.AbstractArray#equal equal}([4, 3, 2, 1]));
 *     
 *     source.{@link JW.AbstractArray#remove remove}(2);
 *     assert(reverser.{@link #property-target target}.{@link JW.AbstractArray#equal equal}([4, 2, 1]));
 * 
 * Создавайте синхронизатор с помощью метода JW.AbstractArray#createReverser.
 * Метод сам определит, какая реализация синхронизатора лучше подойдет (простая или observable).
 *
 * Целевой массив можно передать в качестве конфигурационной опции:
 *
 *     var source = new JW.Array();
 *     var target = new JW.Array();
 *     var reverser = source.{@link JW.AbstractArray#createReverser createReverser}({
 *         {@link #cfg-target target}: target
 *     });
 *
 * Правила работы синхронизатора:
 *
 * - Целевой массив находится в поле {@link #property-target}.
 * - Перед конструированием синхронизатора целевой массив должен быть пуст, в целевой массив нельзя добавлять элементы
 * вручную, нельзя создавать другие синхронизаторы с тем же целевым массивом.
 * - При конструировании синхронизатора все элементы исходной коллекции сразу добавляются в {@link #property-target}.
 * - При уничтожении синхронизатора все элементы исходной коллекции удаляются из {@link #property-target}.
 * - Целевой массив можно передать в качестве конфигурационной опции {@link #cfg-target}.
 * В этом случае, вся забота о его уничтожении ложится на вас.
 * - Если {@link #cfg-target} не передан, то он будет создан автоматически. Синхронизатор подберет наиболее подходящую
 * реализацию {@link #property-target} (простая или observable). В этом
 * случае, {@link #property-target} будет уничтожен автоматически при уничтожении синхронизатора.
 *
 * @extends JW.Class
 *
 * @constructor
 * Конструирует синхронизатор. Предпочтительнее использовать метод JW.AbstractArray#createReverser.
 * @param {JW.AbstractArray} source `<T>` Исходная коллекция.
 * @param {Object} config Конфигурация (см. Config options).
 */
JW.AbstractArray.Reverser = function(source, config) {
	JW.AbstractArray.Reverser._super.call(this);
	config = config || {};
	this.source = source;
	this._targetCreated = !config.target;
	this.target = this._targetCreated ? source.createEmpty() : config.target;
	this.target.addAll(this._reverse(source.getItems()));
};

JW.extend(JW.AbstractArray.Reverser, JW.Class, {
	/**
	 * @cfg {JW.AbstractArray} target `<T>` Целевая коллекция.
	 */
	/**
	 * @property {JW.AbstractArray} source `<T>` Исходная коллекция.
	 */
	/**
	 * @property {JW.AbstractArray} target `<T>` Целевая коллекция.
	 */
	// boolean _targetCreated;
	
	// override
	destroy: function() {
		this.target.tryClear();
		if (this._targetCreated) {
			this.target.destroy();
		}
		this._super();
	},
	
	_reverse: function(items) {
		items = items.concat();
		items.reverse();
		return items;
	}
});
