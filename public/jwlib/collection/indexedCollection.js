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
 * `<K, T> extends JW.AbstractCollection<T>`
 *
 * Абстрактная коллекция элементов типа T с ключами типа K (индексированная коллекция).
 *
 * Существует 2 типа индексированных коллекций:
 *
 * - JW.AbstractArray (массив, ключ - number)
 * - JW.AbstractMap (словарь, ключ - string)
 *
 * При работе с индексированными коллекциями следует помнить одно простое правило: во всех методах и коллбеках,
 * принимающих на вход элемент и его ключ, элемент всегда идет первым параметром, а ключ - вторым.
 *
 * # Методы индексированной коллекции
 *
 * **Жирным шрифтом выделены изменения по сравнению с JW.AbstractCollection.**
 *
 * Получение содержимого:
 *
 * - {@link #getLength} - Возвращает количество элементов в коллекции.
 * - {@link #isEmpty} - Проверяет коллекцию на пустоту.
 * - **{@link #get} - Возвращает элемент коллекции по ключу.**
 * - {@link #getFirst} - Возвращает первый элемент коллекции.
 * - **{@link #getFirstKey} - Возвращает ключ первого элемента коллекции.**
 * - **{@link #getKeys}, #$getKeys - Возвращает массив ключей всех элементов.**
 * - {@link #containsItem} - Содержит ли коллекция элемент.
 * - **{@link #containsKey} - Содержит ли коллекция ключ.**
 * - **{@link #keyOf} - Возвращает ключ элемента.**
 *
 * Алгоритмы перебора (**функции-коллбеки алгоритмов переопределены и принимают дополнительные параметры -
 * ключи элементов**):
 *
 * - {@link #every} - Проверяет все элементы по критерию.
 * Возвращает true тогда и только тогда, когда все элементы удовлетворяют критерию.
 * - {@link #some} - Проверяет каждый элемент по критерию.
 * Возвращает true тогда и только тогда, когда хотя бы один элемент удовлетворяет критерию.
 * - {@link #each} - Перебирает элементы.
 * - {@link #search} - Ищет элемент по критерию.
 * Возвращает первый элемент, удовлетворяющий критерию.
 * - **{@link #find} - Ищет элемент по критерию.
 * Возвращает ключ первого элемента, удовлетворяющего критерию.**
 * - {@link #filter}, #$filter - Фильтрует коллекцию по критерию.
 * Строит новую коллекцию того же типа, включающую только элементы, удовлетворяющие критерию.
 * - {@link #map}, #$map - Отображает элементы коллекции.
 * Строит новую коллекцию того же типа, состояющую из результатов запуска отображающей функции на каждом элементе
 * коллекции.
 * - {@link #toSorted}, #$toSorted, #toSortedComparing, #$toSortedComparing -
 * Строит массив из элементов коллекции, отсортированный по индексу
 * или компаратору.
 * - **{@link #getSortingKeys}, #$getSortingKeys, #getSortingKeysComparing, #$getSortingKeysComparing -
 * Возвращает ключи элементов, отсортированных по индексу или компаратору.**
 * - {@link #index}, #$index - Индексирует коллекцию.
 * Строит словарь, в ключах которого находятся индексы элементов, а в значениях - соответствующие элементы.
 * - {@link #toArray}, #$toArray - Строит новый массив из элементов коллекции.
 * - **{@link #toMap}, #$toMap - Строит новый словарь из элементов коллекции.**
 * - {@link #toSet}, #$toSet - Строит новое множество из элементов коллекции.
 * - {@link #asArray}, #$asArray - Представляет коллекцию в виде массива.
 * - **{@link #asMap}, #$asMap - Представляет коллекцию в виде словаря.**
 * - {@link #asSet}, #$asSet - Представляет коллекцию в виде множества.
 *
 * Изменение коллекции:
 *
 * - **{@link #set}, #trySet - Заменяет элемент по ключу.**
 * - **{@link #remove}, #tryRemove - Удаляет элемент по ключу.**
 * - {@link #removeItem} - Удаляет первое вхождение элемента из коллекции.
 * - {@link #removeItems} - Удаляет все вхождения элементов из коллекции.
 * - {@link #clear}, #$clear, #tryClear - Очищает коллекцию.
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
 * Все те же самые алгоритмы доступны и для нативных коллекций JavaScript:
 *
 * - Array, смотрите статические методы JW.Array
 * - Object как словарь, смотрите статические методы JW.Map
 *
 * @extends JW.AbstractCollection
 * @abstract
 */
JW.IndexedCollection = function() {
	JW.IndexedCollection._super.call(this);
};

JW.extend(JW.IndexedCollection, JW.AbstractCollection, {
	/**
	 * @method get
	 * Возвращает элемент по ключу. В случае, если элемента с таким ключом нет, вернет undefined.
	 * @param {K} key Ключ.
	 * @returns {T} Элемент.
	 */
	/**
	 * @method $clear
	 * Очищает коллекцию.
	 * @returns {JW.IndexedCollection} `<K, T>` Бывшее содержимое коллекции.
	 */
	
	/**
	 * Возвращает ключ первого элемента коллекции. Если коллекция пуста, вернет undefined.
	 * @returns {K} Ключ.
	 */
	getFirstKey: function() {
		return this._callStatic("getFirstKey");
	},
	
	/**
	 * @method getKeys
	 * Возвращает массив ключей всех элементов коллекции.
	 * @returns {Array} `<K>` Массив ключей.
	 */
	/**
	 * Возвращает массив ключей всех элементов коллекции.
	 * @returns {JW.Array} `<K>` Массив ключей.
	 */
	$getKeys: JW.AbstractCollection._create$Array("getKeys"),
	
	/**
	 * Проверяет наличие элемента с заданным ключом в коллекции.
	 * @param {K} key Ключ.
	 * @returns {boolean} Коллекция содержит элемент с указанным ключом.
	 */
	containsKey: function(key) {
		return this.get(key) !== undefined;
	},
	
	containsItem: function(item) {
		return !this.every(function(v) { return item !== v; });
	},
	
	/**
	 * Определяет ключ элемента в данной коллекции. Если такого элемента в коллекции нет, вернет undefined.
	 * @param {T} item Элемент.
	 * @returns {K} Ключ элемента.
	 */
	keyOf: function(item) {
		return this.find(function(v) { return item === v; });
	},
	
	/**
	 * @method trySet
	 *
	 * Заменяет элемент по ключу. В случае если элемента с таким ключом нет:
	 *
	 * - Массив сломается
	 * - Словарь добавит новый элемент
	 *
	 * @param {T} item Элемент.
	 * @param {K} key Ключ.
	 * @returns {JW.Proxy} `<T>` Обертка над бывшим элементом коллекции. Если нет изменений - undefined.
	 */
	/**
	 * Заменяет элемент по ключу. В случае если элемента с таким ключом нет:
	 *
	 * - Массив сломается
	 * - Словарь добавит новый элемент
	 *
	 * @param {T} item Элемент.
	 * @param {K} key Ключ.
	 * @returns {T} Бывший элемент коллекции.
	 */
	set: function(item, key) {
		var result = this.trySet(item, key);
		return (result !== undefined) ? result.value : this.get(key);
	},
	
	/**
	 * @method tryRemove
	 *
	 * Удаляет элемент по ключу. В случае если элемента с таким ключом нет:
	 *
	 * - Массив сломается
	 * - Словарь вернет undefined
	 *
	 * @param {K} key Ключ.
	 * @returns {T} Бывший элемент коллекции. Если нет изменений - undefined.
	 */
	/**
	 * Удаляет элемент по ключу. В случае если элемента с таким ключом нет:
	 *
	 * - Массив сломается
	 * - Словарь вернет undefined
	 *
	 * @param {K} key Ключ.
	 * @returns {T} Бывший элемент коллекции.
	 */
	remove: function(key) {
		return this.tryRemove(key);
	},
	
	removeItem: function(item) {
		var key = this.keyOf(item);
		if (key !== undefined) {
			this.tryRemove(key);
		}
		return key;
	},
	
	/**
	 * @method every
	 *
	 * Проверяет все элементы по критерию.
	 * 
	 * Возвращает true тогда и только тогда, когда функция f возвращает !== false на всех элементах коллекции.
	 * 
	 * Алгоритм последовательно перебирает все элементы, и останавливается после первого элемента, не удовлетворяющего
	 * критерию.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, key: K): boolean`
	 *
	 * Критерий проверки элементов.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {boolean} Результат проверки.
	 */
	/**
	 * Проверяет каждый элемент по критерию.
	 * 
	 * Возвращает true тогда и только тогда, когда функция f возвращает !== false хотя бы на одном элементе коллекции.
	 * 
	 * Алгоритм последовательно перебирает все элементы, и останавливается после первого элемента, удовлетворяющего
	 * критерию.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, key: K): boolean`
	 *
	 * Критерий проверки элементов.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {boolean} Результат проверки.
	 */
	some: function(callback, scope) {
		return !this.every(function(item, key) {
			return callback.call(this, item, key) === false;
		}, scope);
	},
	
	/**
	 * Перебирает элементы коллекции. Запускает указанную функцию на всех элементах.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, key: K): void`
	 *
	 * Функция.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {void}
	 */
	each: function(callback, scope) {
		this.every(function(item, key) {
			callback.call(this, item, key);
			return true;
		}, scope);
	},
	
	/**
	 * Ищет элемент по критерию.
	 * 
	 * Возвращает ключ первого элемента, функция f на котором возвращает !== false.
	 * 
	 * Алгоритм последовательно перебирает все элементы, и останавливается после первого элемента, удовлетворяющего
	 * критерию.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, key: K): boolean`
	 *
	 * Критерий проверки элементов.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {K} Ключ найденного элемента или undefined.
	 */
	find: function(callback, scope) {
		var result;
		this.every(function(item, key) {
			if (callback.call(this, item, key) !== false) {
				result = key;
				return false;
			}
			return true;
		}, scope);
		return result;
	},
	
	/**
	 * Ищет элемент по критерию.
	 * 
	 * Возвращает первый элемент, функция f на котором возвращает !== false.
	 * 
	 * Алгоритм последовательно перебирает все элементы, и останавливается после первого элемента, удовлетворяющего
	 * критерию.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, key: K): boolean`
	 *
	 * Критерий проверки элементов.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {T} Найденный элемент или undefined.
	 */
	search: function(callback, scope) {
		var result;
		this.every(function(item, key) {
			if (callback.call(this, item, key) !== false) {
				result = item;
				return false;
			}
			return true;
		}, scope);
		return result;
	},
	
	/**
	 * @method toSorted
	 *
	 * Преобразует коллекцию в отсортированный массив.
	 *
	 * Строит массив из элементов коллекции, отсортированный по результату запуска функции f на каждом элементе.
	 *
	 * @param {Function} [f]
	 *
	 * `f(item: T, key: K): number/string`
	 *
	 * Функция-сортировщик для элемента. По умолчанию возвращает item.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {Array} Отсортированный массив.
	 */
	/**
	 * @method $toSorted
	 *
	 * Преобразует коллекцию в отсортированный массив.
	 *
	 * Строит массив из элементов коллекции, отсортированный по результату запуска функции f на каждом элементе.
	 *
	 * @param {Function} [f]
	 *
	 * `f(item: T, key: K): number/string`
	 *
	 * Функция-сортировщик для элемента. По умолчанию возвращает item.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {JW.Array} `<T>` Отсортированный массив.
	 */
	/**
	 * @method toSortedComparing
	 *
	 * Преобразует коллекцию в отсортированный массив.
	 *
	 * Строит массив из элементов коллекции, отсортированный по компаратору.
	 *
	 * @param {Function} [compare]
	 *
	 * `f(t1: T, t2: T, k1: K, k2: K): Number`
	 *
	 * Функция-компаратор. Возвращает положительное значение, если t1 > t2; отрицательное значение, если t1 < t2;
	 * 0, если t1 == t2. По умолчанию возвращает JW.cmp(t1, t2).
	 *
	 * @param {Object} [scope] Контекст вызова compare. По умолчанию compare вызывается в контексте коллекции.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {Array} Отсортированный массив.
	 */
	/**
	 * @method $toSortedComparing
	 *
	 * Преобразует коллекцию в отсортированный массив.
	 *
	 * Строит массив из элементов коллекции, отсортированный по компаратору.
	 *
	 * @param {Function} [compare]
	 *
	 * `f(t1: T, t2: T, k1: K, k2: K): Number`
	 *
	 * Функция-компаратор. Возвращает положительное значение, если t1 > t2; отрицательное значение, если t1 < t2;
	 * 0, если t1 == t2. По умолчанию возвращает JW.cmp(t1, t2).
	 *
	 * @param {Object} [scope] Контекст вызова compare. По умолчанию compare вызывается в контексте коллекции.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {JW.Array} `<T>` Отсортированный массив.
	 */
	 
	/**
	 * Возвращает массив ключей отсортированных элементов.
	 *
	 * Строит массив из ключей элементов коллекции, отсортированный по результату запуска функции f на каждом элементе.
	 *
	 * @param {Function} [f]
	 *
	 * `f(item: T, key: K): number/string`
	 *
	 * Функция-сортировщик для элемента. По умолчанию возвращает item.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {Array} `<K>` Массив ключей отсортированных элементов.
	 */
	getSortingKeys: function(callback, scope, order) {
		return this._callStatic("getSortingKeys", [callback, scope || this, order]);
	},
	
	/**
	 * Возвращает массив ключей отсортированных элементов.
	 *
	 * Строит массив из ключей элементов коллекции, отсортированный по результату запуска функции f на каждом элементе.
	 *
	 * @param {Function} [f]
	 *
	 * `f(item: T, key: K): number/string`
	 *
	 * Функция-сортировщик для элемента. По умолчанию возвращает item.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {JW.Array} `<K>` Массив ключей отсортированных элементов.
	 */
	$getSortingKeys: JW.AbstractCollection._create$Array("getSortingKeys"),
	
	/**
	 * Возвращает массив ключей отсортированных элементов.
	 *
	 * Строит массив из ключей элементов коллекции, отсортированный по компаратору.
	 *
	 * @param {Function} [compare]
	 *
	 * `f(t1: T, t2: T, k1: K, k2: K): Number`
	 *
	 * Функция-компаратор. Возвращает положительное значение, если t1 > t2; отрицательное значение, если t1 < t2;
	 * 0, если t1 == t2. По умолчанию возвращает JW.cmp(t1, t2).
	 *
	 * @param {Object} [scope] Контекст вызова compare. По умолчанию compare вызывается в контексте коллекции.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {Array} `<K>` Массив ключей отсортированных элементов.
	 */
	getSortingKeysComparing: function(compare, scope, order) {
		return this._callStatic("getSortingKeysComparing", [compare, scope || this, order]);
	},
	
	/**
	 * Возвращает массив ключей отсортированных элементов.
	 *
	 * Строит массив из ключей элементов коллекции, отсортированный по компаратору.
	 *
	 * @param {Function} [compare]
	 *
	 * `f(t1: T, t2: T, k1: K, k2: K): Number`
	 *
	 * Функция-компаратор. Возвращает положительное значение, если t1 > t2; отрицательное значение, если t1 < t2;
	 * 0, если t1 == t2. По умолчанию возвращает JW.cmp(t1, t2).
	 *
	 * @param {Object} [scope] Контекст вызова compare. По умолчанию compare вызывается в контексте коллекции.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {JW.Array} `<K>` Массив ключей отсортированных элементов.
	 */
	$getSortingKeysComparing: JW.AbstractCollection._create$Array("getSortingKeysComparing"),
	
	/**
	 * @method $index
	 *
	 * Индексирует коллекцию.
	 *
	 * Строит словарь, в ключах которого находятся результаты запуска функции f на всех элементах,
	 * а в значениях - соответствующие элементы.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, key: K): string`
	 *
	 * Функция-индексатор для элемента.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {JW.Map} `<T>` Индекс коллекции.
	 */
	/**
	 * Индексирует коллекцию.
	 *
	 * Строит словарь, в ключах которого находятся результаты запуска функции f на всех элементах,
	 * а в значениях - соответствующие элементы.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, key: K): string`
	 *
	 * Функция-индексатор для элемента.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {Object} Индекс коллекции.
	 */
	index: function(callback, scope) {
		var result = {};
		this.every(function(item, k) {
			var key = callback.call(this, item, k);
			if (JW.isSet(key)) {
				result[key] = item;
			}
			return true;
		}, scope);
		return result;
	},
	
	/**
	 * Преобразует коллекцию в словарь.
	 *
	 * Строит новый словарь, включающий все элементы коллекции с их ключами в данной коллекции.
	 *
	 * @returns {Object} Словарь элементов.
	 */
	toMap: function() {
		var result = {};
		this.every(function(v, k) {
			result[k] = v;
		});
		return result;
	},
	
	/**
	 * Преобразует коллекцию в словарь.
	 *
	 * Строит новый словарь, включающий все элементы коллекции с их ключами в данной коллекции.
	 *
	 * @returns {JW.Map} `<T>` Словарь элементов.
	 */
	$toMap: JW.AbstractCollection._create$Map("toMap"),
	
	/**
	 * Представляет коллекцию в виде словаря.
	 *
	 * Если данная коллекция - словарь, сразу возвращает его. В противном случае запускает метод #toMap.
	 * Данная функция работает как правило быстрее #toMap, но сначала убедитесь, что возвращенный массив
	 * никто не меняет, иначе могут возникнуть странные непредвиденные баги.
	 *
	 * @returns {Object} Словарь элементов.
	 */
	asMap: function() {
		return this.toMap();
	},
	
	/**
	 * Представляет коллекцию в виде словаря.
	 *
	 * Если данная коллекция - словарь, сразу возвращает его. В противном случае запускает метод #toMap.
	 * Данная функция работает как правило быстрее #toMap, но сначала убедитесь, что возвращенный массив
	 * никто не меняет, иначе могут возникнуть странные непредвиденные баги.
	 *
	 * @returns {JW.Map} `<K, T>` Словарь элементов.
	 */
	$asMap: JW.AbstractCollection._create$Map("asMap")
	
	/**
	 * @method filter
	 *
	 * Фильтрует коллекцию по критерию.
	 *
	 * Строит новую коллекцию того же типа, включающую только те элементы, функция f на которых вернула !== false.
	 *
	 * @param {Function} f
	 *
	 * `f(T item, key: K): boolean`
	 *
	 * Фильтрующая функция.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {Array/Object} Отфильтрованная коллекция.
	 */
	/**
	 * @method $filter
	 *
	 * Фильтрует коллекцию по критерию.
	 *
	 * Строит новую коллекцию того же типа, включающую только те элементы, функция f на которых вернула !== false.
	 *
	 * @param {Function} f
	 *
	 * `f(T item, key: K): boolean`
	 *
	 * Фильтрующая функция.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {JW.IndexedCollection} `<K, T>` Отфильтрованная коллекция.
	 */
	/**
	 * @method map
	 *
	 * `<U>` Отображает элементы коллекции.
	 * 
	 * Строит новую коллекцию того же типа, состояющую из результатов запуска функции f на каждом элементе коллекции.
	 *
	 * @param {Function} f
	 *
	 * `f(T item, key: K): U`
	 *
	 * Отображающая функция.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {Array/Object} Отображенная коллекция.
	 */
	/**
	 * @method $map
	 *
	 * `<U>` Отображает элементы коллекции.
	 * 
	 * Строит новую коллекцию того же типа, состояющую из результатов запуска функции f на каждом элементе коллекции.
	 *
	 * @param {Function} f
	 *
	 * `f(T item, key: K): U`
	 *
	 * Отображающая функция.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {JW.IndexedCollection} `<K, U>` Отображенная коллекция.
	 */
	
	/**
	 * @method createEmpty
	 * `<U>` Конструирует пустую коллекцию того же типа.
	 * @returns {JW.IndexedCollection} `<K, U>` Коллекция.
	 */
});