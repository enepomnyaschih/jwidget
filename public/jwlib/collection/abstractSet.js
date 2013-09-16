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
 * `<T extends JW.Class> extends JW.AbstractCollection<T>`
 *
 * Абстрактное множество.
 *
 * Множество - это неупорядоченная коллекция, оптимизированная под добавление/удаление/поиск элемента. В отличие от
 * массива и словаря, множество может содержать только экземпляры JW.Class. Внутреннее представление множества - это
 * словарь из {@link JW.Class#_iid iid} элемента в сам элемент.
 *
 * # Методы множества
 *
 * **Жирным шрифтом выделены изменения по сравнению с JW.AbstractCollection.**
 *
 * Получение содержимого:
 *
 * - {@link #getLength} - Возвращает количество элементов в коллекции.
 * - {@link #isEmpty} - Проверяет коллекцию на пустоту.
 * - {@link #getFirst} - Возвращает первый элемент коллекции.
 * - {@link #containsItem} - Содержит ли коллекция элемент.
 * - **{@link #getJson} - Возвращает внутреннее представление множества.**
 *
 * Алгоритмы перебора:
 *
 * - {@link #every} - Проверяет все элементы по критерию.
 * Возвращает true тогда и только тогда, когда все элементы удовлетворяют критерию.
 * - {@link #some} - Проверяет каждый элемент по критерию.
 * Возвращает true тогда и только тогда, когда хотя бы один элемент удовлетворяет критерию.
 * - {@link #each} - Перебирает элементы.
 * - {@link #search} - Ищет элемент по критерию.
 * Возвращает первый элемент, удовлетворяющий критерию.
 * - {@link #filter}, #$filter - Фильтрует коллекцию по критерию.
 * Строит новую коллекцию того же типа, включающую только элементы, удовлетворяющие критерию.
 * - {@link #map}, #$map - Отображает элементы коллекции.
 * Строит новую коллекцию того же типа, состояющую из результатов запуска отображающей функции на каждом элементе
 * коллекции.
 * - {@link #toSorted}, #$toSorted, #toSortedComparing, #$toSortedComparing -
 * Строит массив из элементов коллекции, отсортированный по индексу
 * или компаратору.
 * - {@link #index}, #$index - Индексирует коллекцию.
 * Строит словарь, в ключах которого находятся индексы элементов, а в значениях - соответствующие элементы.
 * - {@link #toArray}, #$toArray - Строит новый массив из элементов коллекции.
 * - {@link #toSet}, #$toSet - Строит новое множество из элементов коллекции.
 * - {@link #asArray}, #$asArray - Представляет коллекцию в виде массива.
 * - {@link #asSet}, #$asSet - Представляет коллекцию в виде множества.
 *
 * Изменение коллекции:
 *
 * - **{@link #add}, #tryAdd - Добавляет элемент в множество.**
 * - **{@link #addAll}, #$addAll, #tryAddAll - Добавляет набор элементов в множество.**
 * - **{@link #remove}, #tryRemove - Удаляет элемент из множества.**
 * - **{@link #removeAll}, #$removeAll, #tryRemoveAll - Удаляет набор элементов из множества.**
 * - {@link #removeItem} - Удаляет первое вхождение элемента из коллекции.
 * - {@link #removeItems} - Удаляет все вхождения элементов из коллекции.
 * - {@link #clear}, #$clear, #tryClear - Очищает коллекцию.
 * - **{@link #splice}, #trySplice - Удаляет/вставляет элементы.**
 * - **{@link #performSplice} - Приводит содержимое методом #splice.**
 *
 * Создание синхронизаторов:
 *
 * - {@link #createMapper} - Создает конвертер элементов.
 * - {@link #createLister} - Создает конвертер в множество.
 * - {@link #createIndexer} - Создает индексатор.
 * - {@link #createOrderer} - Создает конвертер в массив (упорядочитель).
 * - {@link #createSorterComparing} - Создает конвертер в массив (сортировщик по компаратору).
 * - {@link #createObserver} - Создает наблюдатель.
 *
 * Создание родственных коллекций (для разработки алгоритмов и синхронизаторов):
 *
 * - {@link #createEmpty} - Создает пустую коллекцию того же типа.
 * - {@link #createEmptyArray} - Создает пустой массив того же типа.
 * - {@link #createEmptyMap} - Создает пустой словарь того же типа.
 * - {@link #createEmptySet} - Создает пустое множество того же типа.
 *
 * Другие методы:
 *
 * - **{@link #detectSplice} - Определяет параметры метода #splice для приведения содержимого.**
 * - **{@link #equal} - Сравнивает с массивом.**
 *
 * Все те же самые методы доступны и для нативного JavaScript Object как множества, смотрите статические методы JW.Set.
 *
 * @extends JW.AbstractCollection
 * @abstract
 */
JW.AbstractSet = function(items, adapter) {
	JW.AbstractSet._super.call(this);
	this.json = adapter ? items : items ? JW.Array.index(items, JW.byField("_iid")) : {};
	this.length = JW.Set.getLength(this.json);
};

JW.extend(JW.AbstractSet, JW.AbstractCollection, {
	/**
	 * Возвращает внутреннее представление множества.
	 *
	 * **Метод не копирует коллекцию, будьте осторожны.**
	 *
	 * @returns {Object} Внутреннее представление множества.
	 */
	getJson: function() {
		return this.json;
	},
	
	getLength: function() {
		return this.length;
	},
	
	isEmpty: function() {
		return this.length === 0;
	},
	
	containsItem: function(item) {
		return this.json.hasOwnProperty(item._iid);
	},
	
	/**
	 * Проверяет наличие элемента в коллекции. Сокращение #containsItem.
	 * @param {T} item Элемент.
	 * @returns {boolean} Коллекция содержит указанный элемент.
	 */
	contains: function(item) {
		return this.json.hasOwnProperty(item._iid);
	},
	
	every: function(callback, scope) {
		return JW.Set.every(this.json, callback, scope);
	},
	
	/**
	 * Фильтрует коллекцию по критерию.
	 *
	 * Строит новую коллекцию того же типа, включающую только те элементы, функция f на которых вернула !== false.
	 *
	 * @param {Function} f
	 *
	 * `f(T item): boolean`
	 *
	 * Фильтрующая функция.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {Object} Отфильтрованная коллекция.
	 */
	filter: function(callback, scope) {
		return JW.Set.filter(this.json, callback, scope);
	},
	
	/**
	 * Фильтрует коллекцию по критерию.
	 *
	 * Строит новую коллекцию того же типа, включающую только те элементы, функция f на которых вернула !== false.
	 *
	 * @param {Function} f
	 *
	 * `f(T item): boolean`
	 *
	 * Фильтрующая функция.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {JW.Set} `<T>` Отфильтрованная коллекция.
	 */
	$filter: JW.AbstractCollection._create$Set("filter"),
	
	/**
	 * `<U>` Отображает элементы коллекции.
	 * 
	 * Строит новую коллекцию того же типа, состояющую из результатов запуска функции f на каждом элементе коллекции.
	 *
	 * @param {Function} f
	 *
	 * `f(T item): U`
	 *
	 * Отображающая функция.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {Object} Отображенная коллекция.
	 */
	map: function(callback, scope) {
		return JW.Set.map(this.json, callback, scope);
	},
	
	/**
	 * `<U>` Отображает элементы коллекции.
	 * 
	 * Строит новую коллекцию того же типа, состояющую из результатов запуска функции f на каждом элементе коллекции.
	 *
	 * @param {Function} f
	 *
	 * `f(T item): U`
	 *
	 * Отображающая функция.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {JW.Set} `<U>` Отображенная коллекция.
	 */
	$map: JW.AbstractCollection._create$Set("map"),
	
	asSet: function() {
		return this.json;
	},
	
	$asSet: function() {
		return this;
	},
	
	/**
	 * Добавляет элемент в множество, если его еще нет.
	 * @param {T} item Элемент.
	 * @returns {boolean} Элемент добавлен.
	 */
	add: function(item) {
		return this.tryAdd(item) !== undefined;
	},
	
	/**
	 * Добавляет элемент в множество, если его еще нет.
	 * @param {T} item Элемент.
	 * @returns {boolean} Элемент добавлен. Если нет изменений - undefined.
	 */
	tryAdd: function(item) {
		if (this.trySplice([], [item]) !== undefined) {
			return true;
		}
	},
	
	/**
	 * Добавляет набор элементов в множество, если их еще нет.
	 * @param {Array} items `<T>` Элементы.
	 * @returns {Array} `<T>` Добавленные элементы.
	 */
	addAll: function(items) {
		var result = this.tryAddAll(items);
		return (result !== undefined) ? result : [];
	},
	
	/**
	 * Добавляет набор элементов в множество, если их еще нет.
	 * @param {Array} items `<T>` Элементы.
	 * @returns {JW.Array} `<T>` Добавленные элементы.
	 */
	$addAll: JW.AbstractCollection._create$Array("addAll"),
	
	/**
	 * Добавляет набор элементов в множество, если их еще нет.
	 * @param {Array} items `<T>` Элементы.
	 * @returns {Array} `<T>` Добавленные элементы. Если нет изменений - undefined.
	 */
	tryAddAll: function(items) {
		var spliceResult = this.trySplice([], items);
		if (spliceResult !== undefined) {
			return spliceResult.addedItems;
		}
	},
	
	/**
	 * Удаляет элемент из множества, если он там есть.
	 * @param {T} item Элемент.
	 * @returns {boolean} Элемент удален.
	 */
	remove: function(item) {
		return this.tryRemove(item) !== undefined;
	},
	
	/**
	 * Удаляет элемент из множества, если он там есть.
	 * @param {T} item Элемент.
	 * @returns {boolean} Элемент удален. Если нет изменений - undefined.
	 */
	tryRemove: function(item) {
		if (this.trySplice([item], []) !== undefined) {
			return true;
		}
	},
	
	removeItem: function(item) {
		this.tryRemove(item);
	},
	
	/**
	 * Удаляет набор элементов из множества, если они там есть.
	 * @param {Array} items `<T>` Элементы.
	 * @returns {Array} `<T>` Удаленные элементы.
	 */
	removeAll: function(items) {
		var result = this.tryRemoveAll(items);
		return (result !== undefined) ? result : [];
	},
	
	/**
	 * Удаляет набор элементов из множества, если они там есть.
	 * @param {Array} items `<T>` Элементы.
	 * @returns {JW.Array} `<T>` Удаленные элементы.
	 */
	$removeAll: JW.AbstractCollection._create$Array("removeAll"),
	
	/**
	 * Удаляет набор элементов из множества, если они там есть.
	 * @param {Array} items `<T>` Элементы.
	 * @returns {Array} `<T>` Удаленные элементы. Если нет изменений - undefined.
	 */
	tryRemoveAll: function(items) {
		var spliceResult = this.trySplice(items, []);
		if (spliceResult !== undefined) {
			return spliceResult.removedItems;
		}
	},
	
	removeItems: function(items) {
		this.tryRemoveAll(items);
	},
	
	/**
	 * Очищает коллекцию.
	 * @returns {Array} `<T>` Бывшее содержимое коллекции.
	 */
	clear: function() {
		var items = this.tryClear();
		return (items !== undefined) ? items : [];
	},
	
	/**
	 * Очищает коллекцию.
	 * @returns {JW.Array} `<T>` Бывшее содержимое коллекции.
	 */
	$clear: JW.AbstractCollection._create$Array("clear"),
	
	/**
	 * Очищает коллекцию.
	 * @returns {Array} `<T>`. Бывшее содержимое коллекции. Если нет изменений - undefined.
	 */
	tryClear: function() {
		this.length = 0;
		return JW.Set.tryClear(this.json);
	},
	
	/**
	 * Добавляет и удаляет элементы коллекции. Универсальная оптимизированная атомарная операция удаления/вставки.
	 * @param {Array} removedItems `<T>` Список элементов для удаления.
	 * @param {Array} addedItems `<T>` Список элементов для добавления.
	 * @returns {JW.AbstractSet.SpliceResult} `<T>` Результат.
	 */
	splice: function(removedItems, addedItems) {
		var spliceResult = this.trySplice(removedItems, addedItems);
		return (spliceResult !== undefined) ? spliceResult : new JW.AbstractSet.SpliceResult([], []);
	},
	
	/**
	 * Добавляет и удаляет элементы коллекции. Универсальная оптимизированная атомарная операция удаления/вставки.
	 * @param {Array} removedItems `<T>` Список элементов для удаления.
	 * @param {Array} addedItems `<T>` Список элементов для добавления.
	 * @returns {JW.AbstractSet.SpliceResult} `<T>` Результат. Если нет изменений - undefined.
	 */
	trySplice: function(removedItems, addedItems) {
		var spliceResult = JW.Set.trySplice(this.json, removedItems, addedItems);
		if (spliceResult) {
			this.length += spliceResult.addedItems.length - spliceResult.removedItems.length;
			return spliceResult;
		}
	},
	
	/**
	 * Определяет параметры метода #splice, с которыми содержимое множества станет равно newItems.
	 * Т.е. определяет, какие элементы нужно удалить, какие добавить.
	 * @param {Array} newItems `<T>` Новое содержимое множества.
	 * @returns {JW.AbstractSet.SpliceParams} `<T>` Параметры метода #splice.
	 */
	detectSplice: function(newItems) {
		return JW.Set.detectSplice(this.json, newItems);
	},
	
	/**
	 * Преобразует содержимое множества к newItems комбинацией методов #detectSplice и #splice.
	 * @param {Array} newItems `<T>` Новое содержимое множества.
	 * @returns {void}
	 */
	performSplice: function(newItems) {
		var spliceParams = this.detectSplice(newItems);
		if (spliceParams !== undefined) {
			this.trySplice(spliceParams.removedItems, spliceParams.addedItems);
		}
	},
	
	/**
	 * `<U>` Конструирует конвертер элементов коллекции.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.AbstractSet.Mapper}
	 * `<T, U>` Синхронизатор.
	 */
	createMapper: function(config) {
		return new JW.AbstractSet.Mapper(this, config);
	},
	
	/**
	 * Конструирует наблюдатель коллекции.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.AbstractSet.Observer}
	 * `<T>` Синхронизатор.
	 */
	createObserver: function(config) {
		return new JW.AbstractSet.Observer(this, config);
	},
	
	/**
	 * Конструирует конвертер коллекции в массив (упорядочитель).
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.AbstractSet.Orderer}
	 * `<T>` Синхронизатор.
	 */
	createOrderer: function(config) {
		return new JW.AbstractSet.Orderer(this, config);
	},
	
	/**
	 * Конструирует конвертер коллекции в массив (сортировщик по компаратору).
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.AbstractSet.SorterComparing}
	 * `<T>` Синхронизатор.
	 */
	createSorterComparing: function(config) {
		return new JW.AbstractSet.SorterComparing(this, config);
	},
	
	/**
	 * Конструирует индексатор коллекции.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.AbstractSet.Indexer}
	 * `<T>` Синхронизатор.
	 */
	createIndexer: function(config) {
		return new JW.AbstractSet.Indexer(this, config);
	},
	
	/**
	 * Конструирует конвертер коллекции в множество.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.AbstractSet.Lister}
	 * `<T>` Синхронизатор.
	 */
	createLister: function(config) {
		return new JW.AbstractSet.Lister(this, config);
	},
	
	/**
	 * Поэлементно сравнивает с массивом.
	 * @param {Array} array `<T>` Массив.
	 * @returns {boolean} Множество равно массиву.
	 */
	equal: function(array) {
		return JW.Set.equal(this.json, array);
	},
	
	_callStatic: function(algorithm, args) {
		return JW.Set[algorithm].apply(JW.Set, [this.json].concat(JW.args(args || [])));
	}
	
	/**
	 * @method createEmpty
	 * `<U>` Конструирует пустую коллекцию того же типа.
	 * @returns {JW.AbstractSet} `<U>` Коллекция.
	 */
});

/**
 * @class
 * `<T>` Параметры метода JW.AbstractSet#splice.
 * @extends JW.Class
 *
 * @constructor
 * @param {Array} removedItems `<T>` Элементы для удаления.
 * @param {Array} addedItems `<T>` Элементы для добавления.
 */
JW.AbstractSet.SpliceParams = function(removedItems, addedItems) {
	JW.AbstractSet.SpliceParams._super.call(this);
	this.removedItems = removedItems;
	this.addedItems = addedItems;
};

JW.extend(JW.AbstractSet.SpliceParams, JW.Class, {
	/**
	 * @property {Array} removedItems `<T>` Элементы для удаления.
	 */
	/**
	 * @property {Array} addedItems `<T>` Элементы для добавления.
	 */
});

/**
 * @class
 * `<T>` Результат метода JW.AbstractSet#splice.
 * @extends JW.Class
 *
 * @constructor
 * @param {Array} removedItems `<T>` Удаленные элементы.
 * @param {Array} addedItems `<T>` Добавленные элементы.
 */
JW.AbstractSet.SpliceResult = function(removedItems, addedItems) {
	JW.AbstractSet.SpliceResult._super.call(this);
	this.removedItems = removedItems;
	this.addedItems = addedItems;
};

JW.extend(JW.AbstractSet.SpliceResult, JW.Class, {
	/**
	 * @property {Array} removedItems `<T>` Удаленные элементы.
	 */
	/**
	 * @property {Array} addedItems `<T>` Добавленные элементы.
	 */
});
