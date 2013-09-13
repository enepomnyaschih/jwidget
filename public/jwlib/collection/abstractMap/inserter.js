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
 * `<T>`
 *
 * Синхронизатор представления словаря. Прослушивает все события словаря и сводит их к 2 элементарным функциям:
 * элемент добавлен с указанным ключом и элемент удален с указанным ключом. В целях оптимизации, можно определить
 * третью функцию: коллекция очищена (в случае, если есть более эффективный алгоритм очистки, чем удаление всех
 * элементов простым перебором). В отличие от JW.AbstractCollection.Observer, следит за ключами элементов.
 * Синхронизатор используется, прежде всего, для синхронизации DOM-элемента со словарем дочерних элементов.
 *
 * Создавайте синхронизатор с помощью метода JW.AbstractMap#createInserter:
 *
 *     var inserter = map.createInserter({
 *         addItem: function(el, key) { this.el.find("[elkey=" + key + "]").append(el); },
 *         removeItem: function(el, key) { el.detach(); },
 *         scope: this
 *     });
 *
 * Метод сам определит, какая реализация синхронизатора лучше подойдет (простая или observable).
 *
 * Правила работы синхронизатора:
 *
 * - При конструировании синхронизатора для всех элементов исходной коллекции вызывается функция
 * {@link #cfg-addItem}.
 * - При уничтожении синхронизатора вызывается функция {@link #cfg-clearItems}, либо для всех элементов
 * вызывается функция {@link #cfg-removeItem}.
 * - При изменении ключей/переиндексации элементов вызовами функций синхронизируется порядок элементов.
 *
 * @extends JW.Class
 *
 * @constructor
 * Конструирует синхронизатор. Предпочтительнее использовать метод JW.AbstractMap#createInserter.
 * @param {JW.AbstractMap} source `<T>` Исходный словарь.
 * @param {Object} config Конфигурация (см. Config options).
 */
JW.AbstractMap.Inserter = function(source, config) {
	JW.AbstractMap.Inserter._super.call(this);
	config = config || {};
	this.source = source;
	this.addItem = config.addItem;
	this.removeItem = config.removeItem;
	this.scope = config.scope || this;
	this.clearItems = config.clearItems;
	this._addItems(this.source.getJson());
};

JW.extend(JW.AbstractMap.Inserter, JW.Class, {
	/**
	 * @cfg {Function} addItem
	 *
	 * `addItem(item: T, key: string): void`
	 *
	 * Элемент добавлен в словарь с указанным ключом.
	 */
	/**
	 * @cfg {Function} removeItem
	 *
	 * `removeItem(item: T, key: string): void`
	 *
	 * Элемент удален из словаря с указанным ключом.
	 */
	/**
	 * @cfg {Function} clearItems
	 *
	 * `clearItems(items: Object): void`
	 *
	 * Словарь очищен. По умолчанию, вызывает removeItem для всех элементов словаря.
	 */
	/**
	 * @cfg {Object} scope Контекст вызова addItem, removeItem, clearItems.
	 */
	/**
	 * @property {JW.AbstractMap} source `<T>` Исходный словарь.
	 */
	
	destroy: function() {
		this._clearItems(this.source.getJson());
		this._super();
	},
	
	_addItems: function(items) {
		if (!this.addItem) {
			return;
		}
		for (var key in items) {
			this.addItem.call(this.scope, items[key], key);
		}
	},
	
	_removeItems: function(items) {
		if (!this.removeItem) {
			return;
		}
		for (var key in items) {
			this.removeItem.call(this.scope, key, items[key]);
		}
	},
	
	_clearItems: function(items) {
		if (JW.Map.isEmpty(items)) {
			return;
		}
		if (this.clearItems) {
			this.clearItems.call(this.scope || this, items);
		} else {
			this._removeItems(items);
		}
	}
});
