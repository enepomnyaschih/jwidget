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
 * `<T> extends JW.AbstractSet<T>`
 *
 * Оповещающее множество. Структурированный список методов смотрите в JW.AbstractSet.
 *
 * @extends JW.AbstractSet
 *
 * @constructor
 * @param {Array} [items] `<T>` Изначальное содержимое множества. По умолчанию, создается пустое множество.
 * @param {boolean} [adapter] Создать множество как адаптер над items (тогда это должен быть Object, а не Array).
 * По умолчанию, равен false.
 */
JW.ObservableSet = function(json, adapter) {
	JW.ObservableSet._super.call(this, json, adapter);
	this.spliceEvent = new JW.Event();
	this.clearEvent = new JW.Event();
	this.changeEvent = new JW.Event();
	this.lengthChangeEvent = new JW.Event();
	this._lastLength = this.getLength();
};

JW.extend(JW.ObservableSet, JW.AbstractSet, {
	/**
	 * @event spliceEvent
	 * Элементы удалены/добавлены в множество. Возникает в результате запуска
	 * метода #add, #tryAdd, #addAll, #$addAll, #tryAddAll, #remove, #tryRemove, #removeItem, #removeAll, #$removeAll,
	 * {@link #tryRemoveAll}, #removeItems, #splice, #trySplice, #performSplice.
	 * @param {JW.ObservableSet.SpliceEventParams} params `<T>` Параметры.
	 */
	/**
	 * @event clearEvent
	 * Множество очищено. Возникает в результате запуска
	 * метода #clear, #$clear, #tryClear.
	 * @param {JW.ObservableSet.ItemsEventParams} params
	 * `<T>` Параметры. JW.ObservableSet.ItemsEventParams#items обозначает бывшее содержимое коллекции.
	 */
	/**
	 * @event changeEvent
	 * Множество изменено. Возникает после одного из
	 * событий #spliceEvent, #clearEvent.
	 * @param {JW.ObservableSet.EventParams} params `<T>` Параметры.
	 */
	/**
	 * @event lengthChangeEvent
	 * Изменен размер множества. Возникает после события #changeEvent в случае изменения размера.
	 * @param {JW.ObservableSet.LengthChangeEventParams} params `<T>` Параметры.
	 */
	
	// override
	destroy: function() {
		this.lengthChangeEvent.destroy();
		this.changeEvent.destroy();
		this.clearEvent.destroy();
		this.spliceEvent.destroy();
		this._super();
	},
	
	// override
	tryClear: function() {
		var items = this._super();
		if (items === undefined) {
			return;
		}
		this.clearEvent.trigger(new JW.ObservableSet.ItemsEventParams(this, items));
		this._triggerChange();
		return items;
	},
	
	// override
	trySplice: function(removedItems, addedItems) {
		var spliceResult = this._super(removedItems, addedItems);
		if (spliceResult === undefined) {
			return;
		}
		this.spliceEvent.trigger(new JW.ObservableSet.SpliceEventParams(this, spliceResult));
		this._triggerChange();
		return spliceResult;
	},
	
	/**
	 * `<U>` Конструирует пустую коллекцию того же типа.
	 * @returns {JW.ObservableSet} `<U>` Коллекция.
	 */
	createEmpty: function() {
		return new JW.ObservableSet();
	},
	
	/**
	 * `<U>` Конструирует пустой массив того же типа (простой или оповещающий).
	 * @returns {JW.ObservableArray} `<U>` Массив.
	 */
	createEmptyArray: function() {
		return new JW.ObservableArray();
	},
	
	/**
	 * `<U>` Конструирует пустой словарь того же типа (простой или оповещающий).
	 * @returns {JW.ObservableMap} `<U>` Словарь.
	 */
	createEmptyMap: function() {
		return new JW.ObservableMap();
	},
	
	/**
	 * `<U>` Конструирует пустое множество того же типа (простое или оповещающее).
	 * @returns {JW.ObservableSet} `<U>` Множество.
	 */
	createEmptySet: function() {
		return new JW.ObservableSet();
	},
	
	/**
	 * `<U>` Конструирует конвертер элементов коллекции.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.ObservableSet.Mapper}
	 * `<T, U>` Синхронизатор.
	 */
	createMapper: function(config) {
		return new JW.ObservableSet.Mapper(this, config);
	},
	
	/**
	 * Конструирует фильтровщик коллекции.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.ObservableSet.Filterer}
	 * `<T>` Синхронизатор.
	 */
	createFilterer: function(config) {
		return new JW.ObservableSet.Filterer(this, config);
	},
	
	/**
	 * Конструирует наблюдатель коллекции.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.ObservableSet.Observer}
	 * `<T>` Синхронизатор.
	 */
	createObserver: function(config) {
		return new JW.ObservableSet.Observer(this, config);
	},
	
	/**
	 * Конструирует конвертер коллекции в массив (упорядочитель).
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.ObservableSet.Orderer}
	 * `<T>` Синхронизатор.
	 */
	createOrderer: function(config) {
		return new JW.ObservableSet.Orderer(this, config);
	},
	
	/**
	 * Конструирует конвертер коллекции в массив (сортировщик по компаратору).
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.ObservableSet.SorterComparing}
	 * `<T>` Синхронизатор.
	 */
	createSorterComparing: function(config) {
		return new JW.ObservableSet.SorterComparing(this, config);
	},
	
	/**
	 * Конструирует индексатор коллекции.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.ObservableSet.Indexer}
	 * `<T>` Синхронизатор.
	 */
	createIndexer: function(config) {
		return new JW.ObservableSet.Indexer(this, config);
	},
	
	/**
	 * Конструирует конвертер коллекции в множество.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.ObservableSet.Lister}
	 * `<T>` Синхронизатор.
	 */
	createLister: function(config) {
		return new JW.ObservableSet.Lister(this, config);
	},
	
	_triggerChange: function() {
		this.changeEvent.trigger(new JW.ObservableSet.EventParams(this));
		var newLength = this.getLength();
		if (this._lastLength !== newLength) {
			this.lengthChangeEvent.trigger(new JW.ObservableSet.LengthChangeEventParams(this, this._lastLength, newLength));
			this._lastLength = newLength;
		}
	}
});

/**
 * @class
 * `<T>` Параметры события JW.ObservableSet.
 * @extends JW.EventParams
 *
 * @constructor
 * @param {JW.ObservableSet} sender `<T>` Отправитель события.
 */
JW.ObservableSet.EventParams = function(sender) {
	JW.ObservableSet.EventParams._super.call(this, sender);
};

JW.extend(JW.ObservableSet.EventParams, JW.EventParams, {
	/**
	 * @property {JW.ObservableSet} sender `<T>` Отправитель события.
	 */
});

/**
 * @class
 *
 * `<T> extends JW.ObservableSet.EventParams<T>`
 *
 * Параметры события JW.ObservableSet#spliceEvent.
 *
 * @extends JW.ObservableSet.EventParams
 *
 * @constructor
 * @param {JW.ObservableSet} sender `<T>` Отправитель события.
 * @param {JW.AbstractSet.SpliceResult} spliceResult `<T>` Результат метода JW.AbstractSet#splice.
 */
JW.ObservableSet.SpliceEventParams = function(sender, spliceResult) {
	JW.ObservableSet.SpliceEventParams._super.call(this, sender);
	this.spliceResult = spliceResult;
};

JW.extend(JW.ObservableSet.SpliceEventParams, JW.ObservableSet.EventParams, {
	/**
	 * @property {JW.AbstractSet.SpliceResult} spliceResult `<T>` Результат метода JW.AbstractSet#splice.
	 */
});

/**
 * @class
 *
 * `<T> extends JW.ObservableSet.EventParams<T>`
 *
 * Параметры события JW.ObservableSet с элементами.
 *
 * @extends JW.ObservableSet.EventParams
 *
 * @constructor
 * @param {JW.ObservableSet} sender `<T>` Отправитель события.
 * @param {Array} items `<T>` Набор элементов.
 */
JW.ObservableSet.ItemsEventParams = function(sender, items) {
	JW.ObservableSet.ItemsEventParams._super.call(this, sender);
	this.items = items;
};

JW.extend(JW.ObservableSet.ItemsEventParams, JW.ObservableSet.EventParams, {
	/**
	 * @property {Array} items `<T>` Набор элементов.
	 */
});

/**
 * @class
 *
 * `<T> extends JW.ObservableSet.EventParams<T>`
 *
 * Параметры события JW.ObservableSet#lengthChangeEvent.
 *
 * @extends JW.ObservableSet.EventParams
 *
 * @constructor
 * @param {JW.ObservableSet} sender `<T>` Отправитель события.
 * @param {number} oldLength Старый размер коллекции.
 * @param {number} newLength Новый размер коллекции.
 */
JW.ObservableSet.LengthChangeEventParams = function(sender, oldLength, newLength) {
	JW.ObservableSet.LengthChangeEventParams._super.call(this, sender);
	this.oldLength = oldLength;
	this.newLength = newLength;
};

JW.extend(JW.ObservableSet.LengthChangeEventParams, JW.ObservableSet.EventParams, {
	/**
	 * @property {number} oldLength Старый размер коллекции.
	 */
	/**
	 * @property {number} newLength Новый размер коллекции.
	 */
});
