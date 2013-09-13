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
 * Индексатор коллекции. Преобразует исходную коллекцию в словарь, присваивая каждому элементу определенный ключ,
 * используя функцию, указанную пользователем. Используется для быстрого поиска элементов по ключу (например, по ID).
 * 
 * **Замечание:** Все элементы должны иметь разные ключи.
 *
 * Создавайте синхронизатор с помощью метода JW.AbstractCollection#createIndexer:
 *
 *     var indexer = collection.createIndexer({
 *         getKey: function(item) { return item.id; },
 *         scope: this
 *     });
 *     var map = indexer.target;
 *
 * Метод сам определит, какая реализация синхронизатора лучше подойдет (простая или observable).
 *
 * Словарь можно передать в качестве конфигурационной опции:
 *
 *     var map = new JW.Map();
 *     var indexer = collection.createIndexer({
 *         target: map,
 *         getKey: function(item) { return item.id; },
 *         scope: this
 *     });
 *
 * Правила работы синхронизатора:
 *
 * - Целевой словарь находится в поле {@link #property-target}.
 * - При конструировании синхронизатора все элементы исходной коллекции сразу добавляются в {@link #property-target}.
 * - При уничтожении синхронизатора все элементы исходной коллекции удаляются из {@link #property-target}.
 * - Словарь можно передать в качестве конфигурационной опции {@link #cfg-target}.
 * В этом случае, вся забота о его уничтожении ложится на вас.
 * - Если {@link #cfg-target} не передан, то он будет создан автоматически. Синхронизатор подберет наиболее подходящую
 * реализацию {@link #property-target} (простая или observable). В этом
 * случае, {@link #property-target} будет уничтожен автоматически при уничтожении синхронизатора.
 * - Можно индексировать несколько коллекций в один и тот же словарь, если ключи всех элементов различны.
 *
 * @extends JW.Class
 *
 * @constructor
 * Конструирует синхронизатор. Предпочтительнее использовать метод JW.AbstractCollection#createIndexer.
 * @param {JW.AbstractCollection} source `<T>` Исходная коллекция.
 * @param {Object} config Конфигурация (см. Config options).
 */
JW.AbstractCollection.Indexer = function(source, config) {
	JW.AbstractCollection.Indexer._super.call(this);
	config = config || {};
	this.source = source;
	this.getKey = config.getKey;
	this._targetCreated = config.target === undefined;
	this.target = this._targetCreated ? source.createEmptyMap() : config.target;
	this.scope = config.scope || this;
	this.target.trySetAll(this._index(source.asArray()));
};

JW.extend(JW.AbstractCollection.Indexer, JW.Class, {
	/**
	 * @cfg {JW.AbstractMap} target `<T>` Целевой словарь.
	 */
	/**
	 * @cfg {Function} getKey (required)
	 *
	 * `getKey(item: T):string`
	 *
	 * Индексирующая функция. Определяет ключ элемента в целевом словаре.
	 */
	/**
	 * @cfg {Object} scope Контекст вызова getKey.
	 */
	/**
	 * @property {C} source Исходная коллекция.
	 */
	/**
	 * @property {JW.AbstractMap} target `<T>` Целевой словарь.
	 */
	// boolean _targetCreated;
	
	// override
	destroy: function() {
		this.target.tryRemoveAll(this._keys(this.source.asArray()));
		if (this._targetCreated) {
			this.target.destroy();
		}
		this._super();
	},
	
	_index: function(items) {
		var index = {};
		for (var i = 0, l = items.length; i < l; ++i) {
			var item = items[i];
			index[this.getKey.call(this.scope, item)] = item;
		}
		return index;
	},
	
	_keys: function(items) {
		var keys = [];
		for (var i = 0, l = items.length; i < l; ++i) {
			keys.push(this.getKey.call(this.scope, items[i]));
		}
		return keys;
	}
});
