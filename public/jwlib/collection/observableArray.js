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
 * `<T> extends JW.AbstractArray<T>`
 *
 * Оповещающий массив. Структурированный список методов смотрите в JW.AbstractArray.
 *
 * @extends JW.AbstractArray
 *
 * @constructor
 * @param {Array} [items] `<T>` Изначальное содержимое массива. По умолчанию, создается пустой массив.
 * @param {boolean} [adapter] Создать массив как адаптер над items. По умолчанию, равен false, т.е. создается
 * копия массива items.
 */
JW.ObservableArray = function(items, adapter) {
	JW.ObservableArray._super.call(this, items, adapter);
	this.spliceEvent = new JW.Event();
	this.replaceEvent = new JW.Event();
	this.moveEvent = new JW.Event();
	this.clearEvent = new JW.Event();
	this.reorderEvent = new JW.Event();
	this.changeEvent = new JW.Event();
	this.lengthChangeEvent = new JW.Event();
	this._lastLength = this.items.length;
};

JW.extend(JW.ObservableArray, JW.AbstractArray, {
	/**
	 * @event spliceEvent
	 * Элементы удалены/вставлены в массив. Возникает в результате запуска
	 * метода #add, #tryAdd, #addAll, #tryAddAll, #remove, #tryRemove, #removeItem, #pop, #removeAll, #tryRemoveAll,
	 * {@link #removeItems}, #splice, #trySplice, #performSplice.
	 * @param {JW.ObservableArray.SpliceEventParams} params `<T>` Параметры.
	 */
	/**
	 * @event replaceEvent
	 * Элемент заменен в массиве. Возникает в результате запуска метода #set, #trySet.
	 * @param {JW.ObservableArray.ReplaceEventParams} params `<T>` Параметры.
	 */
	/**
	 * @event moveEvent
	 * Элемент перемещен в массиве. Возникает в результате запуска метода #move, #tryMove.
	 * @param {JW.ObservableArray.MoveEventParams} params `<T>` Параметры.
	 */
	/**
	 * @event clearEvent
	 * Массив очищен. Возникает в результате запуска метода #clear, #$clear, #tryClear.
	 * @param {JW.ObservableArray.ItemsEventParams} params
	 * `<T>` Параметры. JW.ObservableArray.ItemsEventParams#items обозначает бывшее содержимое массива.
	 */
	/**
	 * @event reorderEvent
	 * Элементы переупорядочены в массиве. Возникает в результате запуска
	 * метода #reorder, #tryReorder, #performReorder, #sort, #sortComparing.
	 * @param {JW.ObservableArray.ReorderEventParams} params
	 * `<T>` Параметры. JW.ObservableArray.ReorderEventParams#items обозначает бывшее содержимое массива.
	 */
	/**
	 * @event changeEvent
	 * Массив изменен. Возникает после одного из
	 * событий #spliceEvent, #replaceEvent, #moveEvent, #clearEvent, #reorderEvent.
	 * @param {JW.ObservableArray.EventParams} params `<T>` Параметры.
	 */
	/**
	 * @event lengthChangeEvent
	 * Изменена длина массива. Возникает после события #changeEvent в случае изменения длины.
	 * @param {JW.ObservableArray.LengthChangeEventParams} params `<T>` Параметры.
	 */
	
	// override
	destroy: function() {
		this.lengthChangeEvent.destroy();
		this.changeEvent.destroy();
		this.reorderEvent.destroy();
		this.clearEvent.destroy();
		this.moveEvent.destroy();
		this.replaceEvent.destroy();
		this.spliceEvent.destroy();
		this._super();
	},
	
	// override
	trySet: function(item, index) {
		var oldItem = this._super(item, index);
		if (oldItem === undefined) {
			return;
		}
		this.replaceEvent.trigger(new JW.ObservableArray.ReplaceEventParams(this, index, oldItem.value, item));
		this._triggerChange();
		return oldItem;
	},
	
	// override
	tryMove: function(fromIndex, toIndex) {
		var item = this._super(fromIndex, toIndex);
		if (item === undefined) {
			return;
		}
		this.moveEvent.trigger(new JW.ObservableArray.MoveEventParams(this, fromIndex, toIndex, item));
		this._triggerChange();
		return item;
	},
	
	// override
	tryClear: function() {
		var oldItems = this._super();
		if (oldItems === undefined) {
			return;
		}
		this.clearEvent.trigger(new JW.ObservableArray.ItemsEventParams(this, oldItems));
		this._triggerChange();
		return oldItems;
	},
	
	// override
	trySplice: function(removeParamsList, addParamsList) {
		var result = this._super(removeParamsList, addParamsList);
		if (result === undefined) {
			return;
		}
		this.spliceEvent.trigger(new JW.ObservableArray.SpliceEventParams(this, result));
		this._triggerChange();
		return result;
	},
	
	// override
	tryReorder: function(indexArray) {
		var items = this._super(indexArray);
		if (items === undefined) {
			return;
		}
		this.reorderEvent.trigger(new JW.ObservableArray.ReorderEventParams(this, indexArray, items));
		this._triggerChange();
		return items;
	},
	
	/**
	 * `<U>` Конструирует пустую коллекцию того же типа.
	 * @returns {JW.ObservableArray} `<U>` Коллекция.
	 */
	createEmpty: function() {
		return new JW.ObservableArray();
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
	 * @returns {JW.ObservableArray.Mapper}
	 * `<T, U>` Синхронизатор.
	 */
	createMapper: function(config) {
		return new JW.ObservableArray.Mapper(this, config);
	},
	
	/**
	 * Конструирует наблюдатель коллекции.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.ObservableArray.Observer}
	 * `<T>` Синхронизатор.
	 */
	createObserver: function(config) {
		return new JW.ObservableArray.Observer(this, config);
	},
	
	/**
	 * Конструирует конвертер коллекции в массив (упорядочитель).
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.ObservableArray.Orderer}
	 * `<T>` Синхронизатор.
	 */
	createOrderer: function(config) {
		return new JW.ObservableArray.Orderer(this, config);
	},
	
	/**
	 * Конструирует конвертер коллекции в массив (сортировщик по компаратору).
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.ObservableArray.SorterComparing}
	 * `<T>` Синхронизатор.
	 */
	createSorterComparing: function(config) {
		return new JW.ObservableArray.SorterComparing(this, config);
	},
	
	/**
	 * Конструирует индексатор коллекции.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.ObservableArray.Indexer}
	 * `<T>` Синхронизатор.
	 */
	createIndexer: function(config) {
		return new JW.ObservableArray.Indexer(this, config);
	},
	
	/**
	 * Конструирует конвертер коллекции в множество.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.ObservableArray.Lister}
	 * `<T>` Синхронизатор.
	 */
	createLister: function(config) {
		return new JW.ObservableArray.Lister(this, config);
	},
	
	/**
	 * Конструирует синхронизатор представления с массивом.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.ObservableArray.Inserter}
	 * `<T>` Синхронизатор.
	 */
	createInserter: function(config) {
		return new JW.ObservableArray.Inserter(this, config);
	},
	
	createSplitter: function(config) {
		return new JW.ObservableArray.Splitter(this, config);
	},
	
	_triggerChange: function() {
		this.changeEvent.trigger(new JW.ObservableArray.EventParams(this));
		var length = this.getLength();
		if (this._lastLength !== length) {
			this.lengthChangeEvent.trigger(new JW.ObservableArray.LengthChangeEventParams(this, this._lastLength, length));
			this._lastLength = length;
		}
	}
});

/**
 * @class
 * `<T>` Параметры события JW.ObservableArray.
 * @extends JW.EventParams
 *
 * @constructor
 * @param {JW.ObservableArray} sender `<T>` Отправитель события.
 */
JW.ObservableArray.EventParams = function(sender) {
	JW.ObservableArray.EventParams._super.call(this, sender);
};

JW.extend(JW.ObservableArray.EventParams, JW.EventParams, {
	/**
	 * @property {JW.ObservableArray} sender `<T>` Отправитель события.
	 */
});

/**
 * @class
 *
 * `<T> extends JW.ObservableArray.EventParams<T>`
 *
 * Параметры события JW.ObservableArray#spliceEvent.
 *
 * @extends JW.ObservableArray.EventParams
 *
 * @constructor
 * @param {JW.ObservableArray} sender `<T>` Отправитель события.
 * @param {JW.AbstractArray.SpliceResult} spliceResult `<T>` Результат метода JW.AbstractArray#splice.
 */
JW.ObservableArray.SpliceEventParams = function(sender, spliceResult) {
	JW.ObservableArray.SpliceEventParams._super.call(this, sender);
	this.spliceResult = spliceResult;
};

JW.extend(JW.ObservableArray.SpliceEventParams/*<T>*/, JW.ObservableArray.EventParams/*<T>*/, {
	/**
	 * @property {JW.AbstractArray.SpliceResult} spliceResult `<T>` Результат метода JW.AbstractArray#splice.
	 */
});

/**
 * @class
 *
 * `<T> extends JW.ObservableArray.EventParams<T>`
 *
 * Параметры события JW.ObservableArray#moveEvent.
 *
 * @extends JW.ObservableArray.EventParams
 *
 * @constructor
 * @param {JW.ObservableArray} sender `<T>` Отправитель события.
 * @param {number} fromIndex Откуда перенесен элемент.
 * @param {number} toIndex Куда перенесен элемент.
 * @param {T} item Элемент.
 */
JW.ObservableArray.MoveEventParams = function(sender, fromIndex, toIndex, item) {
	JW.ObservableArray.MoveEventParams._super.call(this, sender);
	this.fromIndex = fromIndex;
	this.toIndex = toIndex;
	this.item = item;
};

JW.extend(JW.ObservableArray.MoveEventParams, JW.ObservableArray.EventParams, {
	/**
	 * @property {number} fromIndex Откуда перенесен элемент.
	 */
	/**
	 * @property {number} toIndex Куда перенесен элемент.
	 */
	/**
	 * @property {T} item Элемент.
	 */
});

/**
 * @class
 *
 * `<T> extends JW.ObservableArray.EventParams<T>`
 *
 * Параметры события JW.ObservableArray#replaceEvent.
 *
 * @extends JW.ObservableArray.EventParams
 *
 * @constructor
 * @param {JW.ObservableArray} sender `<T>` Отправитель события.
 * @param {number} index Индекс элемента.
 * @param {T} oldItem Старое значение.
 * @param {T} newItem Новое значение.
 */
JW.ObservableArray.ReplaceEventParams = function(sender, index, oldItem, newItem) {
	JW.ObservableArray.ReplaceEventParams._super.call(this, sender);
	this.index = index;
	this.oldItem = oldItem;
	this.newItem = newItem;
};

JW.extend(JW.ObservableArray.ReplaceEventParams, JW.ObservableArray.EventParams, {
	/**
	 * @property {number} index Индекс элемента.
	 */
	/**
	 * @property {T} oldItem Старое значение.
	 */
	/**
	 * @property {T} newItem Новое значение.
	 */
});

/**
 * @class
 *
 * `<T> extends JW.ObservableArray.EventParams<T>`
 *
 * Параметры события JW.ObservableArray с элементами.
 *
 * @extends JW.ObservableArray.EventParams
 *
 * @constructor
 * @param {JW.ObservableArray} sender `<T>` Отправитель события.
 * @param {Array} items `<T>` Набор элементов.
 */
JW.ObservableArray.ItemsEventParams = function(sender, items) {
	JW.ObservableArray.ItemsEventParams._super.call(this, sender);
	this.items = items;
};

JW.extend(JW.ObservableArray.ItemsEventParams, JW.ObservableArray.EventParams, {
	/**
	 * @property {Array} items `<T>` Набор элементов.
	 */
});

/**
 * @class
 *
 * `<T> extends JW.ObservableArray.ItemsEventParams<T>`
 *
 * Параметры события JW.ObservableArray#reorderEvent.
 *
 * @extends JW.ObservableArray.ItemsEventParams
 *
 * @constructor
 * @param {JW.ObservableArray} sender `<T>` Отправитель события.
 * @param {Array} indexArray `<number>` Индексы элементов в переупорядоченном массиве.
 * @param {Array} items `<T>` Набор элементов.
 */
JW.ObservableArray.ReorderEventParams = function(sender, indexArray, items) {
	JW.ObservableArray.ReorderEventParams._super.call(this, sender, items);
	this.indexArray = indexArray;
};

JW.extend(JW.ObservableArray.ReorderEventParams, JW.ObservableArray.ItemsEventParams, {
	/**
	 * @property {Array} indexArray `<number>` Индексы элементов в переупорядоченном массиве.
	 */
});

/**
 * @class
 *
 * `<T> extends JW.ObservableArray.EventParams<T>`
 *
 * Параметры события JW.ObservableArray#lengthChangeEvent.
 *
 * @extends JW.ObservableArray.EventParams
 *
 * @constructor
 * @param {JW.ObservableArray} sender `<T>` Отправитель события.
 * @param {number} oldLength Старая длина массива.
 * @param {number} newLength Новая длина массива.
 */
JW.ObservableArray.LengthChangeEventParams = function(sender, oldLength, newLength) {
	JW.ObservableArray.LengthChangeEventParams._super.call(this, sender);
	this.oldLength = oldLength;
	this.newLength = newLength;
};

JW.extend(JW.ObservableArray.LengthChangeEventParams, JW.ObservableArray.EventParams, {
	/**
	 * @property {number} oldLength Старая длина массива.
	 */
	/**
	 * @property {number} newLength Новая длина массива.
	 */
});
