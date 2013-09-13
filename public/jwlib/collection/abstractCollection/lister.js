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
 * Конвертер в множество. Преобразует исходную коллекцию в множество.
 * 
 * **Замечание:** Элементы исходной коллекции не должны повторяться.
 *
 * Создавайте конвертер с помощью метода JW.AbstractCollection#createLister:
 *
 *     var lister = collection.createLister();
 *     var set = lister.target;
 *
 * Метод сам определит, какая реализация конвертера лучше подойдет (простая или observable).
 *
 * Множество можно передать в качестве конфигурационной опции:
 *
 *     var set = new JW.Set();
 *     var lister = collection.createLister({
 *         target: set
 *     });
 *
 * Правила работы конвертера:
 *
 * - Целевое множество находится в поле {@link #property-target}.
 * - При конструировании конвертера все элементы исходной коллекции сразу добавляются в {@link #property-target}.
 * - При уничтожении конвертера все элементы исходной коллекции удаляются из {@link #property-target}.
 * - Множество можно передать в качестве конфигурационной опции {@link #cfg-target}.
 * В этом случае, вся забота о его уничтожении ложится на вас.
 * - Если {@link #cfg-target} не передан, то он будет создан автоматически. Конвертер подберет наиболее подходящую
 * реализацию {@link #property-target} (простая или observable). В этом
 * случае, {@link #property-target} будет уничтожен автоматически при уничтожении конвертера.
 * - Можно конвертировать несколько коллекций в одно и то же множество, если все элементы различны.
 *
 * @extends JW.Class
 *
 * @constructor
 * Конструирует конвертер. Предпочтительнее использовать метод JW.AbstractCollection#createLister.
 * @param {JW.AbstractCollection} source `<T>` Коллекция-источник.
 * @param {Object} config Конфигурация (см. Config options).
 */
JW.AbstractCollection.Lister = function(source, config) {
	JW.AbstractCollection.Lister._super.call(this);
	config = config || {};
	this.source = source;
	this._targetCreated = config.target === undefined;
	this.target = this._targetCreated ? source.createEmptySet() : config.target;
	this.target.tryAddAll(source.asArray());
};

JW.extend(JW.AbstractCollection.Lister, JW.Class, {
	/**
	 * @property {JW.AbstractCollection} source `<T>` Коллекция-источник.
	 */
	/**
	 * @cfg {JW.AbstractSet} target `<T>` Целевое множество.
	 */
	/**
	 * @property {JW.AbstractSet} target `<T>` Целевое множество.
	 */
	// boolean _targetCreated;
	
	// override
	destroy: function() {
		this.target.tryRemoveAll(this.source.asArray());
		if (this._targetCreated) {
			this.target.destroy();
		}
		this._super();
	}
});
