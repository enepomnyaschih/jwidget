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
 * `<T, U, TC extends JW.AbstractCollection<T>, UC extends JW.AbstractCollection<U>>`
 *
 * Конвертер элементов коллекции. Создает новую коллекцию того же типа, состоящую из элементов,
 * равных результату запуска функции, указанной пользователем, на каждом элементе.
 * Используется, прежде всего, для превращения данных в представление.
 *
 * Создавайте синхронизатор с помощью метода JW.AbstractCollection#createMapper:
 *
 *     var mapper = dataCollection.createMapper({
 *         createItem: function(data) { return new View(this, data); },
 *         destroyItem: JW.destroy,
 *         scope: this
 *     });
 *     var viewCollection = mapper.target;
 *
 * Метод сам определит, какая реализация синхронизатора лучше подойдет (простая или observable).
 *
 * Целевую коллекцию можно передать в качестве конфигурационной опции:
 *
 *     var viewCollection = new JW.Array();
 *     var mapper = dataCollection.createMapper({
 *         target: viewCollection,
 *         createItem: function(data) { return new View(this, data); },
 *         destroyItem: JW.destroy,
 *         scope: this
 *     });
 *
 * Правила работы синхронизатора:
 *
 * - Целевая коллекция находится в поле {@link #property-target}.
 * - При конструировании синхронизатора все элементы исходной коллекции сразу конвертируются и добавляются в
 * {@link #property-target}.
 * - При уничтожении синхронизатора все элементы удаляются из {@link #property-target} и уничтожаются.
 * - Целевую коллекцию можно передать в качестве конфигурационной опции {@link #cfg-target}.
 * В этом случае, вся забота о ее уничтожении ложится на вас (хотя элементы будут из нее удалены автоматически
 * при уничтожении синхронизатора).
 * - Если {@link #cfg-target} не передан, то он будет создан автоматически. Синхронизатор подберет наиболее подходящую
 * реализацию {@link #property-target} (простая или observable). В этом
 * случае, {@link #property-target} будет уничтожен автоматически при уничтожении синхронизатора.
 * - При перемещении/переупорядочении элементов исходной коллекции элементы целевой коллекции не пересоздаются,
 * но перемещаются в полном соответствии с исходной коллекцией.
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
 * Конструирует синхронизатор. Предпочтительнее использовать метод JW.AbstractCollection#createMapper.
 * @param {JW.AbstractCollection} source `<T>` Исходная коллекция.
 * @param {Object} config Конфигурация (см. Config options).
 */
JW.AbstractCollection.Mapper = function(source, config) {
	JW.AbstractCollection.Mapper._super.call(this);
	config = config || {};
	this.source = source;
	this.createItem = config.createItem;
	this.destroyItem = config.destroyItem;
	this._targetCreated = config.target === undefined;
	this.target = this._targetCreated ? this.source.createEmpty() : config.target;
	this.scope = config.scope || this;
};

JW.extend(JW.AbstractCollection.Mapper, JW.Class, {
	/**
	 * @cfg {UC} target Целевая коллекция.
	 */
	/**
	 * @cfg {Function} createItem (required)
	 *
	 * `createItem(data: T): U`
	 *
	 * Отображающая функция. Создает элемент целевой коллекции по элементу исходной коллекции.
	 */
	/**
	 * @cfg {Function} destroyItem
	 *
	 * `destroyItem(item:U, data: T): void`
	 *
	 * Деструктор элемента. Уничтожает элемент целевой коллекции.
	 */
	/**
	 * @cfg {Object} scope Контекст вызова createItem и destroyItem.
	 */
	/**
	 * @property {TC} source Исходная коллекция.
	 */
	/**
	 * @property {UC} target Целевая коллекция.
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
