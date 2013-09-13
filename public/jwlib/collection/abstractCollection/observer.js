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
 * Наблюдатель коллекции. Прослушивает все события коллекции и сводит их к 2 элементарным функциям:
 * элемент добавлен и элемент удален. В целях оптимизации, можно определить третью функцию: коллекция очищена
 * (в случае, если есть более эффективный алгоритм очистки, чем удаление всех элементов простым перебором).
 * Также, можно определить функцию, которая вызывается при любом изменении коллекции.
 * Синхронизатор можно использовать, например, для оповещения элементов о том, что их добавили в коллекцию.
 *
 * Создавайте синхронизатор с помощью метода JW.AbstractCollection#createObserver:
 *
 *     var observer = collection.createObserver({
 *         addItem: function(item) { item.setInCollection(true); },
 *         removeItem: function(item) { item.setInCollection(false); },
 *         scope: this
 *     });
 *
 * Метод сам определит, какая реализация синхронизатора лучше подойдет (простая или observable).
 *
 * Другой вариант использования синхронизатора: если у вас на входе есть абстрактная коллекция (не известно,
 * простая или оповещающая), но вы хотите прослушивать событие изменения коллекции в случае, если она все же
 * оповещающая, то вы можете это сделать без нарушения принципов ООП:
 *
 *     var observer = collection.createObserver({
 *         change: function() { console.log("Коллекция изменилась"); }
 *     });
 *
 * Правила работы синхронизатора:
 *
 * - При конструировании синхронизатора для всех элементов исходной коллекции вызывается функция
 * {@link #cfg-addItem}.
 * - При уничтожении синхронизатора вызывается функция {@link #cfg-clearItems}, либо для всех элементов
 * вызывается функция {@link #cfg-removeItem}.
 * - При перемещении/переупорядочении элементов исходной коллекции функции {@link #cfg-addItem},
 * {@link #cfg-removeItem} и {@link #cfg-clearItems} не вызываются.
 *
 * @extends JW.Class
 *
 * @constructor
 * Конструирует синхронизатор. Предпочтительнее использовать метод JW.AbstractCollection#createObserver.
 * @param {JW.AbstractCollection} source `<T>` Исходная коллекция.
 * @param {Object} config Конфигурация (см. Config options).
 */
JW.AbstractCollection.Observer = function(source, config) {
	JW.AbstractCollection.Observer._super.call(this);
	config = config || {};
	this.source = source;
	this.addItem = config.addItem;
	this.removeItem = config.removeItem;
	this.clearItems = config.clearItems;
	this.change = config.change;
	this.scope = config.scope || this;
	this._addItems(source.asArray());
};

JW.extend(JW.AbstractCollection.Observer, JW.Class, {
	/**
	 * @cfg {Function} addItem
	 *
	 * `addItem(item: T): void`
	 *
	 * Элемент добавлен в коллекцию.
	 */
	/**
	 * @cfg {Function} removeItem
	 *
	 * `removeItem(item: T): void`
	 *
	 * Элемент удален из коллекции.
	 */
	/**
	 * @cfg {Function} clearItems
	 *
	 * `clearItems(items: Array<T>): void`
	 *
	 * Коллекция очищена.
	 */
	/**
	 * @cfg {Function} change
	 *
	 * `change(): void`
	 *
	 * Коллекция произвольно изменилась.
	 */
	/**
	 * @cfg {Object} scope Контекст вызова addItem, removeItem, clearItems, change.
	 */
	/**
	 * @property {C} source Исходная коллекция.
	 */
	
	// override
	destroy: function() {
		this._clearItems(this.source.asArray());
		this._super();
	},
	
	_addItems: function(items) {
		if (!this.addItem) {
			return;
		}
		for (var i = 0, l = items.length; i < l; ++i) {
			this.addItem.call(this.scope, items[i]);
		}
	},
	
	_removeItems: function(items) {
		if (!this.removeItem) {
			return;
		}
		for (var i = items.length - 1; i >= 0; --i) {
			this.removeItem.call(this.scope, items[i]);
		}
	},
	
	_clearItems: function(items) {
		if (items.length === 0) {
			return;
		}
		if (this.clearItems) {
			this.clearItems.call(this.scope, items);
		} else {
			this._removeItems(items);
		}
	},
	
	_onChange: function() {
		this.change.call(this.scope);
	}
});
