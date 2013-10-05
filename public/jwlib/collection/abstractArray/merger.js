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
 * Объединитель массивов. Создает массив, содержащий все элементы исходных массивов в том же порядке.
 *
 *     var source = new JW.ObservableArray([
 *         new JW.Array([1, 2, 3]),
 *         new JW.ObservableArray(),
 *         new JW.Array([4])
 *     ]);
 *     var merger = source.{@link JW.AbstractArray#createMerger createMerger}();
 *     assert(merger.{@link #property-target target}.{@link JW.AbstractArray#equal equal}([1, 2, 3, 4]));
 *     
 *     source.{@link JW.AbstractArray#add add}(new JW.Array([5, 6]));
 *     assert(merger.{@link #property-target target}.{@link JW.AbstractArray#equal equal}([1, 2, 3, 4, 5, 6]));
 *     
 *     source.{@link JW.AbstractArray#get get}(1).{@link JW.AbstractArray#addAll addAll}([7, 8, 9]);
 *     assert(merger.{@link #property-target target}.{@link JW.AbstractArray#equal equal}([1, 2, 3, 7, 8, 9, 4, 5, 6]));
 * 
 * Создавайте конвертер с помощью метода JW.AbstractArray#createMerger:
 *
 *     var merger = array.{@link JW.AbstractArray#createMerger createMerger}();
 *     var array = merger.{@link #property-target target};
 *
 * Метод сам определит, какая реализация синхронизатора лучше подойдет (простая или observable).
 *
 * Целевой массив можно передать в качестве конфигурационной опции:
 *
 *     var source = new JW.Array();
 *     var target = new JW.Array();
 *     var merger = source.{@link JW.AbstractArray#createMerger createMerger}({
 *         {@link #cfg-target target}: target
 *     });
 *
 * Правила работы синхронизатора:
 *
 * - Целевой массив находится в поле {@link #property-target}.
 * - Перед конструированием синхронизатора целевой массив должен быть пуст, в целевой массив нельзя добавлять элементы
 * вручную, нельзя создавать другие синхронизаторы с тем же целевым массивом.
 * - При конструировании синхронизатора все элементы исходных коллекций сразу добавляются в {@link #property-target}.
 * - При уничтожении синхронизатора все элементы исходных коллекций удаляются из {@link #property-target}.
 * - Целевой массив можно передать в качестве конфигурационной опции {@link #cfg-target}.
 * В этом случае, вся забота о его уничтожении ложится на вас.
 * - Если {@link #cfg-target} не передан, то он будет создан автоматически. Синхронизатор подберет наиболее подходящую
 * реализацию {@link #property-target} (простая или observable). В этом
 * случае, {@link #property-target} будет уничтожен автоматически при уничтожении синхронизатора.
 *
 * @extends JW.Class
 *
 * @constructor
 * Конструирует синхронизатор. Предпочтительнее использовать метод JW.AbstractArray#createMerger.
 * @param {JW.AbstractArray} source `<T>` Исходная коллекция.
 * @param {Object} config Конфигурация (см. Config options).
 */
JW.AbstractArray.Merger = function(source, config) {
	JW.AbstractArray.Merger._super.call(this);
	config = config || {};
	this.source = source;
	this._targetCreated = !config.target;
	this.target = this._targetCreated ? this._createTarget() : config.target;
	this._mapper = source.createMapper({
		createItem: function(bunch) {
			return bunch.createMergerBunch(this);
		},
		destroyItem: JW.destroy,
		scope: this
	});
	this.target.addAll(this._getAllItems());
};

JW.extend(JW.AbstractArray.Merger, JW.Class, {
	/**
	 * @cfg {JW.AbstractArray} target `<T>` Целевая коллекция.
	 */
	/**
	 * @property {JW.AbstractArray} source `<? extends JW.AbstractArray<T>>` Исходная коллекция.
	 */
	/**
	 * @property {JW.AbstractArray} target `<T>` Целевая коллекция.
	 */
	// boolean _targetCreated;
	// JW.AbstractArray.Mapper<JW.AbstractArray<? extends JW.AbstractArray<T>>, JW.AbstractArray.Merger.Bunch<T>> _mapper;
	
	// override
	destroy: function() {
		this.target.tryClear();
		this._mapper.destroy();
		if (this._targetCreated) {
			this.target.destroy();
		}
		this._super();
	},
	
	// virtual
	_createTarget: function() {
		return this.source.some(function(bunch) { return bunch instanceof JW.ObservableArray; }, this) ?
			new JW.ObservableArray() : new JW.Array();
	},
	
	_getAllItems: function() {
		return this._merge(this.source.getItems());
	},
	
	_merge: function(bunches) {
		var items = new Array(this._count(bunches));
		var iItems = 0;
		for (var i = 0, l = bunches.length; i < l; ++i) {
			var bunch = bunches[i].getItems();
			for (var j = 0, m = bunch.length; j < m; ++j) {
				items[iItems++] = bunch[j];
			}
		}
		return items;
	},
	
	_count: function(bunches, index, length) {
		if (index === undefined) {
			index = 0;
		}
		if (length === undefined) {
			length = bunches.length - index;
		}
		var count = 0;
		for (var i = 0; i < length; ++i) {
			count += bunches[index + i].getLength();
		}
		return count;
	}
});
