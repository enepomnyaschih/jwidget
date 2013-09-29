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
 * Синхронизатор представления массива. Прослушивает все события массива и сводит их к 2 элементарным функциям:
 * элемент добавлен в указанное место и элемент удален из указанного места. В целях оптимизации, можно определить
 * третью функцию: коллекция очищена (в случае, если есть более эффективный алгоритм очистки, чем удаление всех
 * элементов простым перебором). В отличие от JW.AbstractCollection.Observer, следит за порядком элементов.
 * Синхронизатор используется, прежде всего, для синхронизации DOM-элемента с массивом дочерних элементов.
 *
 * Создавайте синхронизатор с помощью метода JW.AbstractArray#createInserter:
 *
 *     var inserter = array.createInserter({
 *         addItem: function(el, index) { this.el.insert(el, index); },
 *         removeItem: function(el, index) { el.detach(); },
 *         scope: this
 *     });
 *
 * Метод сам определит, какая реализация синхронизатора лучше подойдет (простая или observable).
 *
 * Справка: jQuery.insert
 *
 * Правила работы синхронизатора:
 *
 * - При конструировании синхронизатора для всех элементов исходной коллекции вызывается функция
 * {@link #cfg-addItem}.
 * - При уничтожении синхронизатора вызывается функция {@link #cfg-clearItems}, либо для всех элементов
 * вызывается функция {@link #cfg-removeItem}.
 * - При перемещении/переупорядочении элементов вызовами функций синхронизируется порядок элементов.
 *
 * @extends JW.Class
 *
 * @constructor
 * Конструирует синхронизатор. Предпочтительнее использовать метод JW.AbstractArray#createInserter.
 * @param {JW.AbstractArray} source `<T>` Исходный массив.
 * @param {Object} config Конфигурация (см. Config options).
 */
JW.AbstractArray.Inserter = function(source, config) {
	JW.AbstractArray.Inserter._super.call(this);
	config = config || {};
	this.source = source;
	this.addItem = config.addItem;
	this.removeItem = config.removeItem;
	this.clearItems = config.clearItems;
	this.scope = config.scope || this;
	this._addItems(this.source.getItems(), 0);
};

JW.extend(JW.AbstractArray.Inserter, JW.Class, {
	/**
	 * @cfg {Function} addItem
	 *
	 * `addItem(item: T, index: number): void`
	 *
	 * Элемент добавлен в указанное место массива.
	 */
	/**
	 * @cfg {Function} removeItem
	 *
	 * `removeItem(item: T, index: number): void`
	 *
	 * Элемент удален из указанного места массива.
	 */
	/**
	 * @cfg {Function} clearItems
	 *
	 * `clearItems(items: Array<T>): void`
	 *
	 * Массив очищен. По умолчанию, вызывает removeItem для всех элементов массива.
	 */
	/**
	 * @cfg {Object} scope Контекст вызова addItem, removeItem, clearItems.
	 */
	/**
	 * @property {JW.AbstractArray} source `<T>` Исходный массив.
	 */
	
	destroy: function() {
		this._clearItems(this.source.getItems());
		this._super();
	},
	
	_addItems: function(items, index) {
		if (!this.addItem) {
			return;
		}
		for (var i = 0; i < items.length; ++i) {
			this.addItem.call(this.scope, items[i], i + index);
		}
	},
	
	_removeItems: function(items, index) {
		if (!this.removeItem) {
			return;
		}
		for (var i = items.length - 1; i >= 0; --i) {
			this.removeItem.call(this.scope, items[i], i + index);
		}
	},
	
	_clearItems: function(items) {
		if (items.length === 0) {
			return;
		}
		if (this.clearItems) {
			this.clearItems.call(this.scope || this, items);
		} else {
			this._removeItems(items, 0);
		}
	}
});