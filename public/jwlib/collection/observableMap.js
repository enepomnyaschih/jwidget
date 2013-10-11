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
 * `<T> extends JW.AbstractMap<T>`
 *
 * Оповещающий словарь. Структурированный список методов смотрите в JW.AbstractMap.
 *
 * @extends JW.AbstractMap
 *
 * @constructor
 * @param {Object} [items] Изначальное содержимое словаря. По умолчанию, создается пустой словарь.
 * @param {boolean} [adapter] Создать словарь как адаптер над items. По умолчанию, равен false, т.е. создается
 * копия словаря items.
 */
JW.ObservableMap = function(json, adapter) {
	JW.ObservableMap._super.call(this, json, adapter);
	this.spliceEvent = new JW.Event();
	this.reindexEvent = new JW.Event();
	this.clearEvent = new JW.Event();
	this.changeEvent = new JW.Event();
	this.lengthChangeEvent = new JW.Event();
	this._lastLength = this.getLength();
};

JW.extend(JW.ObservableMap, JW.AbstractMap, {
	/**
	 * @event spliceEvent
	 * Элементы удалены/добавлены в словарь. Возникает в результате запуска
	 * метода #set, #trySet, #setAll, #trySetAll, #remove, #tryRemove, #removeItem, #removeAll, #tryRemoveAll,
	 * {@link #removeItems}, #splice, #trySplice, #performSplice.
	 * @param {JW.ObservableMap.SpliceEventParams} params `<T>` Параметры.
	 */
	/**
	 * @event reindexEvent
	 * Изменены ключи элементов в словаре. Возникает в результате запуска
	 * метода #setKey, #trySetKey, #reindex, #tryReindex, #performReindex.
	 * @param {JW.ObservableMap.ReindexEventParams} params `<T>` Параметры.
	 */
	/**
	 * @event clearEvent
	 * Словарь очищен. Возникает в результате запуска
	 * метода #clear, #$clear, #tryClear.
	 * @param {JW.ObservableMap.ItemsEventParams} params
	 * `<T>` Параметры. JW.ObservableMap.ItemsEventParams#items обозначает бывшее содержимое коллекции.
	 */
	/**
	 * @event changeEvent
	 * Словарь изменен. Возникает после одного из
	 * событий #spliceEvent, #reindexEvent, #clearEvent.
	 * @param {JW.ObservableMap.EventParams} params `<T>` Параметры.
	 */
	/**
	 * @event lengthChangeEvent
	 * Изменен размер словаря. Возникает после события #changeEvent в случае изменения размера.
	 * @param {JW.ObservableMap.LengthChangeEventParams} params `<T>` Параметры.
	 */
	
	// override
	destroy: function() {
		this.lengthChangeEvent.destroy();
		this.changeEvent.destroy();
		this.clearEvent.destroy();
		this.reindexEvent.destroy();
		this.spliceEvent.destroy();
		this._super();
	},
	
	// override
	trySplice: function(removedKeys, updatedItems) {
		var spliceResult = this._super(removedKeys, updatedItems);
		if (spliceResult === undefined) {
			return;
		}
		this.spliceEvent.trigger(new JW.ObservableMap.SpliceEventParams(this, spliceResult));
		this._triggerChange();
		return spliceResult;
	},
	
	// override
	tryClear: function() {
		var items = this._super();
		if (items === undefined) {
			return;
		}
		this.clearEvent.trigger(new JW.ObservableMap.ItemsEventParams(this, items));
		this._triggerChange();
		return items;
	},
	
	// override
	tryReindex: function(keyMap) {
		var result = this._super(keyMap);
		if (result === undefined) {
			return;
		}
		this.reindexEvent.trigger(new JW.ObservableMap.ReindexEventParams(this, result));
		this._triggerChange();
		return result;
	},
	
	/**
	 * `<U>` Конструирует пустую коллекцию того же типа.
	 * @returns {JW.ObservableMap} `<U>` Коллекция.
	 */
	createEmpty: function() {
		return new JW.ObservableMap();
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
	 * @returns {JW.ObservableMap.Mapper}
	 * `<T, U>` Синхронизатор.
	 */
	createMapper: function(config) {
		return new JW.ObservableMap.Mapper(this, config);
	},
	
	/**
	 * Конструирует фильтровщик коллекции.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.ObservableMap.Filterer}
	 * `<T>` Синхронизатор.
	 */
	createFilterer: function(config) {
		return new JW.ObservableMap.Filterer(this, config);
	},
	
	/**
	 * Конструирует наблюдатель коллекции.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.ObservableMap.Observer}
	 * `<T>` Синхронизатор.
	 */
	createObserver: function(config) {
		return new JW.ObservableMap.Observer(this, config);
	},
	
	/**
	 * Конструирует конвертер коллекции в массив (упорядочитель).
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.ObservableMap.Orderer}
	 * `<T>` Синхронизатор.
	 */
	createOrderer: function(config) {
		return new JW.ObservableMap.Orderer(this, config);
	},
	
	/**
	 * Конструирует конвертер коллекции в массив (сортировщик по компаратору).
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.ObservableMap.SorterComparing}
	 * `<T>` Синхронизатор.
	 */
	createSorterComparing: function(config) {
		return new JW.ObservableMap.SorterComparing(this, config);
	},
	
	/**
	 * Конструирует индексатор коллекции.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.ObservableMap.Indexer}
	 * `<T>` Синхронизатор.
	 */
	createIndexer: function(config) {
		return new JW.ObservableMap.Indexer(this, config);
	},
	
	/**
	 * Конструирует конвертер коллекции в множество.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.ObservableMap.Lister}
	 * `<T>` Синхронизатор.
	 */
	createLister: function(config) {
		return new JW.ObservableMap.Lister(this, config);
	},
	
	/**
	 * Конструирует синхронизатор представления с массивом.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.ObservableMap.Inserter}
	 * `<T>` Синхронизатор.
	 */
	createInserter: function(config) {
		return new JW.ObservableMap.Inserter(this, config);
	},
	
	_triggerChange: function() {
		this.changeEvent.trigger(new JW.ObservableMap.EventParams(this));
		var newLength = this.getLength();
		if (this._lastLength !== newLength) {
			this.lengthChangeEvent.trigger(new JW.ObservableMap.LengthChangeEventParams(this, this._lastLength, newLength));
			this._lastLength = newLength;
		}
	}
});

/**
 * @class
 * `<T>` Параметры события JW.ObservableMap.
 * @extends JW.EventParams
 *
 * @constructor
 * @param {JW.ObservableMap} sender `<T>` Отправитель события.
 */
JW.ObservableMap.EventParams = function(sender) {
	JW.ObservableMap.EventParams._super.call(this, sender);
};

JW.extend(JW.ObservableMap.EventParams, JW.EventParams, {
	/**
	 * @property {JW.ObservableMap} sender `<T>` Отправитель события.
	 */
});

/**
 * @class
 *
 * `<T> extends JW.ObservableMap.EventParams<T>`
 *
 * Параметры события JW.ObservableMap#spliceEvent.
 *
 * @extends JW.ObservableMap.EventParams
 *
 * @constructor
 * @param {JW.ObservableMap} sender `<T>` Отправитель события.
 * @param {JW.AbstractMap.SpliceResult} spliceResult `<T>` Результат метода JW.AbstractMap#splice.
 */
JW.ObservableMap.SpliceEventParams = function(sender, spliceResult) {
	JW.ObservableMap.SpliceEventParams._super.call(this, sender);
	this.spliceResult = spliceResult;
};

JW.extend(JW.ObservableMap.SpliceEventParams, JW.ObservableMap.EventParams, {
	/**
	 * @property {JW.AbstractMap.SpliceResult} spliceResult `<T>` Результат метода JW.AbstractMap#splice.
	 */
});

/**
 * @class
 *
 * `<T> extends JW.ObservableMap.EventParams<T>`
 *
 * Параметры события JW.ObservableMap#reindexEvent.
 *
 * @extends JW.ObservableMap.EventParams
 *
 * @constructor
 * @param {JW.ObservableMap} sender `<T>` Отправитель события.
 * @param {Object} keyMap Ключи элементов в измененном словаре.
 */
JW.ObservableMap.ReindexEventParams = function(sender, keyMap) {
	JW.ObservableMap.ReindexEventParams._super.call(this, sender);
	this.keyMap = keyMap;
};

JW.extend(JW.ObservableMap.ReindexEventParams/*<T>*/, JW.ObservableMap.EventParams/*<T>*/, {
	/**
	 * @property {Object} keyMap Ключи элементов в измененном словаре.
	 */
});

/**
 * @class
 *
 * `<T> extends JW.ObservableMap.EventParams<T>`
 *
 * Параметры события JW.ObservableMap с элементами.
 *
 * @extends JW.ObservableMap.EventParams
 *
 * @constructor
 * @param {JW.ObservableMap} sender `<T>` Отправитель события.
 * @param {Object} items Набор элементов.
 */
JW.ObservableMap.ItemsEventParams = function(sender, items) {
	JW.ObservableMap.ItemsEventParams._super.call(this, sender);
	this.items = items;
};

JW.extend(JW.ObservableMap.ItemsEventParams, JW.ObservableMap.EventParams, {
	/**
	 * @property {Object} items Набор элементов.
	 */
});

/**
 * @class
 *
 * `<T> extends JW.ObservableMap.EventParams<T>`
 *
 * Параметры события JW.ObservableMap#lengthChangeEvent.
 *
 * @extends JW.ObservableMap.EventParams
 *
 * @constructor
 * @param {JW.ObservableMap} sender `<T>` Отправитель события.
 * @param {number} oldLength Старый размер коллекции.
 * @param {number} newLength Новый размер коллекции.
 */
JW.ObservableMap.LengthChangeEventParams = function(sender, oldLength, newLength) {
	JW.ObservableMap.LengthChangeEventParams._super.call(this, sender);
	this.oldLength = oldLength;
	this.newLength = newLength;
};

JW.extend(JW.ObservableMap.LengthChangeEventParams/*<T>*/, JW.ObservableMap.EventParams/*<T>*/, {
	/**
	 * @property {number} oldLength Старый размер коллекции.
	 */
	/**
	 * @property {number} newLength Новый размер коллекции.
	 */
});
