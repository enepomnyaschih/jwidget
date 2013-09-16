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
 * `<T>` Абстрактная коллекция элементов типа T.
 *
 * Существует 3 типа коллекций:
 *
 * - JW.AbstractArray (массив), наследуется от JW.IndexedCollection
 * - JW.AbstractMap (словарь), наследуется от JW.IndexedCollection
 * - JW.AbstractSet (множество)
 *
 * Коллекции можно преобразовывать друг в друга с помощью алгоритмов.
 *
 * Каждая коллекция предоставляется в двух вариантах:
 *
 * - Простая коллекция: JW.Array, JW.Map, JW.Set
 * - Оповещающая коллекция: JW.ObservableArray, JW.ObservableMap, JW.ObservableSet
 *
 * Отличие оповещающей коллекции от простой состоит в том, что она выбрасывает события о своем изменении. Это позволяет
 * синхронизировать данные с представлением налету в соответствии с архитектурой Model-View. Для связи оповещающих
 * коллекций между собой существуют синхронизаторы:
 *
 * - Конвертер элементов: JW.AbstractCollection.Mapper
 * - Конвертер в множество: JW.AbstractCollection.Lister
 * - Конвертер в словарь (индексатор): JW.AbstractCollection.Indexer
 * - Конвертер в массив (упорядочитель): JW.AbstractCollection.Orderer
 * - Конвертер в массив (сортировщик по компаратору): JW.AbstractCollection.SorterComparing
 * - Наблюдатель: JW.AbstractCollection.Observer
 * - Синхронизаторы представления: JW.AbstractArray.Inserter, JW.AbstractMap.Inserter
 *
 * Простые коллекции введены прежде всего для совместимости. Они имеют общий интерфейс с оповещающими коллекциями,
 * но работают немного быстрее.
 *
 * При работе с коллекциями jWidget следует помнить несколько важных правил.
 *
 * 1) В коллекции jWidget запрещено добавлять null и undefined. При необходимости воспользуйтесь паттерном Null Object.
 *
 * 2) Большинство методов для изменения коллекции предоставлены в двух вариантах: tryMethod и method. Эти методы
 * выполняют одно и то же действие, но возвращают разный результат. Первый вариант, в основном, введен для внутреннего
 * использования и <em>всегда возвращает undefined, если коллекция не была изменена</em>. Например, #tryClear вернет
 * undefined, если вы пытаетесь очистить пустую коллекцию, в противном случае он вернет бывшее содержимое коллекции.
 * Второй вариант возвращает результат в более дружественном формате. Например, #clear всегда возвращает бывшее
 * содержимое коллекции. Так, если вы хотите очистить массив и уничтожить все элементы, следует воспользоваться
 * методом #clear:
 *
 *     JW.Array.each(array.clear(), JW.destroy);
 *
 * Так вы можете быть уверены в том, что функция JW.Array.each всегда получит на вход корректный массив, тогда как
 * метод #tryClear мог дать на выходе undefined.
 *
 * 3) Все методы, возвращающие коллекцию, предоставлены в двух вариантах: method и $method. Эти методы выполняют одно и
 * то же действие, но возвращают результат в разном формате. Первый метод вернет нативную коллекцию JavaScript: Array
 * или Object. Второй метод вернет обертку jWidget: JW.Array, JW.Map или JW.Set. Используйте тот метод, который
 * удобнее в данной конкретной ситуации. Например, $method удобен для цепочечных вызовов алгоритмов. Так, предыдущий
 * пример можно переписать следующим образом:
 *
 *     array.$clear().each(JW.destroy);
 *
 * А в следующем примере гораздо удобнее воспользоваться реализацией method:
 *
 *     set.addAll(array.clear());
 *
 * 4) Желательно, чтобы все элементы коллекции были различны. Некоторые методы, такие как
 * JW.AbstractArray#performReorder, требуют, чтобы у каждого элемента коллекции был свой уникальный ключ. Если 2
 * элемента коллекции совпадают, то совпадают и их ключи, поэтому такой метод работать не будет.
 *
 * # Методы коллекции
 *
 * Получение содержимого:
 *
 * - {@link #getLength} - Возвращает количество элементов в коллекции.
 * - {@link #isEmpty} - Проверяет коллекцию на пустоту.
 * - {@link #getFirst} - Возвращает первый элемент коллекции.
 * - {@link #containsItem} - Содержит ли коллекция элемент.
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
 * Все те же самые методы доступны и для нативных коллекций JavaScript:
 *
 * - Array, смотрите статические методы JW.Array
 * - Object как словарь, смотрите статические методы JW.Map
 * - Object как множество, смотрите статические методы JW.Set
 *
 * @extends JW.Class
 * @abstract
 */
JW.AbstractCollection = function() {
	JW.AbstractCollection._super.call(this);
};

JW.AbstractCollection._create$Array = function(algorithm) {
	return function() {
		return new JW.Array(this[algorithm].apply(this, arguments), true);
	};
};

JW.AbstractCollection._create$Map = function(algorithm) {
	return function() {
		return new JW.Map(this[algorithm].apply(this, arguments), true);
	};
};

JW.AbstractCollection._create$Set = function(algorithm) {
	return function() {
		return new JW.Set(this[algorithm].apply(this, arguments), true);
	};
};

JW.extend(JW.AbstractCollection, JW.Class, {
	/**
	 * @method getLength
	 * Возвращает количество элементов в коллекции.
	 * @returns {number} Количество элементов в коллекции.
	 */
	/**
	 * @method isEmpty
	 * Проверяет коллекцию на пустоту.
	 * @returns {boolean} Коллекция не содержит ни одного элемента.
	 */
	/**
	 * Возвращает первый элемент коллекции. Если коллекция пуста, вернет undefined.
	 * @returns {T} Элемент.
	 */
	getFirst: function() {
		return this._callStatic("getFirst");
	},
	
	/**
	 * @method containsItem
	 * Проверяет наличие элемента в коллекции.
	 * @param {T} item Элемент.
	 * @returns {boolean} Коллекция содержит указанный элемент.
	 */
	/**
	 * @method removeItem
	 * Удаляет первое вхождение указанного элемента из коллекции.
	 * @param {T} item Элемент.
	 * @returns {void}
	 */
	/**
	 * @method removeItems
	 * Удаляет все вхождения указанных элементов из коллекции.
	 * @param {Array} items `<T>` Элементы.
	 * @returns {void}
	 */
	/**
	 * @method tryClear
	 * Очищает коллекцию.
	 * @returns {Array/Object} Бывшее содержимое коллекции. Если нет изменений - undefined.
	 */
	/**
	 * @method clear
	 * Очищает коллекцию.
	 * @returns {Array/Object} Бывшее содержимое коллекции.
	 */
	/**
	 * @method $clear
	 * Очищает коллекцию.
	 * @returns {JW.AbstractCollection} `<T>` Бывшее содержимое коллекции.
	 */
	
	destroy: function() {
		this.tryClear();
		this._super();
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
	 * `f(item: T): boolean`
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
	 * `f(item: T): boolean`
	 *
	 * Критерий проверки элементов.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {boolean} Результат проверки.
	 */
	some: function(callback, scope) {
		return !this.every(function(item) {
			return callback.call(this, item) === false;
		}, scope);
	},
	
	/**
	 * Перебирает элементы коллекции. Запускает указанную функцию на всех элементах.
	 * @param {Function} f
	 *
	 * `f(item: T): void`
	 *
	 * Функция.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {void}
	 */
	each: function(callback, scope) {
		this.every(function(item) {
			callback.call(this, item);
			return true;
		}, scope);
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
	 * `f(item: T): boolean`
	 *
	 * Критерий проверки элементов.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {T} Найденный элемент или undefined.
	 */
	search: function(callback, scope) {
		var result;
		this.every(function(item) {
			if (callback.call(this, item) !== false) {
				result = item;
				return false;
			}
			return true;
		}, scope);
		return result;
	},
	
	/**
	 * Преобразует коллекцию в отсортированный массив.
	 *
	 * Строит массив из элементов коллекции, отсортированный по результату запуска функции f на каждом элементе.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T): number/string`
	 *
	 * Функция-сортировщик для элемента.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {Array} `<T>` Отсортированный массив.
	 */
	toSorted: function(callback, scope, order) {
		return this._callStatic("toSorted", [callback, scope || this, order]);
	},
	
	/**
	 * Преобразует коллекцию в отсортированный массив.
	 *
	 * Строит массив из элементов коллекции, отсортированный по результату запуска функции f на каждом элементе.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T): number/string`
	 *
	 * Функция-сортировщик для элемента.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {JW.Array} `<T>` Отсортированный массив.
	 */
	$toSorted: JW.AbstractCollection._create$Array("toSorted"),
	
	/**
	 * Преобразует коллекцию в отсортированный массив.
	 *
	 * Строит массив из элементов коллекции, отсортированный по компаратору.
	 *
	 * @param {Function} compare
	 *
	 * `f(t1: T, t2: T): Number`
	 *
	 * Функция-компаратор. Возвращает положительное значение, если t1 > t2; отрицательное значение, если t1 < t2;
	 * 0, если t1 == t2.
	 *
	 * @param {Object} [scope] Контекст вызова compare. По умолчанию compare вызывается в контексте коллекции.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {Array} `<T>` Отсортированный массив.
	 */
	toSortedComparing: function(compare, scope, order) {
		return this._callStatic("toSortedComparing", [compare, scope || this, order]);
	},
	
	/**
	 * Преобразует коллекцию в отсортированный массив.
	 *
	 * Строит массив из элементов коллекции, отсортированный по компаратору.
	 *
	 * @param {Function} compare
	 *
	 * `f(t1: T, t2: T): Number`
	 *
	 * Функция-компаратор. Возвращает положительное значение, если t1 > t2; отрицательное значение, если t1 < t2;
	 * 0, если t1 == t2.
	 *
	 * @param {Object} [scope] Контекст вызова compare. По умолчанию compare вызывается в контексте коллекции.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {JW.Array} `<T>` Отсортированный массив.
	 */
	$toSortedComparing: JW.AbstractCollection._create$Array("toSortedComparing"),
	
	/**
	 * Индексирует коллекцию.
	 *
	 * Строит словарь, в ключах которого находятся результаты запуска функции f на всех элементах,
	 * а в значениях - соответствующие элементы.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T): string`
	 *
	 * Функция-индексатор для элемента.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {Object} Индекс коллекции.
	 */
	index: function(callback, scope) {
		var result = {};
		this.every(function(item) {
			var key = callback.call(this, item);
			if (JW.isSet(key)) {
				result[key] = item;
			}
			return true;
		}, scope);
		return result;
	},
	
	/**
	 * Индексирует коллекцию.
	 *
	 * Строит словарь, в ключах которого находятся результаты запуска функции f на всех элементах,
	 * а в значениях - соответствующие элементы.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T): string`
	 *
	 * Функция-индексатор для элемента.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {JW.Map} `<T>` Индекс коллекции.
	 */
	$index: JW.AbstractCollection._create$Map("index"),
	
	/**
	 * Преобразует коллекцию в массив.
	 *
	 * Строит новый массив, включающий все элементы коллекции.
	 *
	 * @returns {Array} `<T>` Массив элементов.
	 */
	toArray: function() {
		var result = new Array(this.getLength());
		var index = 0;
		this.every(function(item) {
			result[index++] = item;
		});
		return result;
	},
	
	/**
	 * Преобразует коллекцию в массив.
	 *
	 * Строит новый массив, включающий все элементы коллекции.
	 *
	 * @returns {JW.Array} `<T>` Массив элементов.
	 */
	$toArray: JW.AbstractCollection._create$Array("toArray"),
	
	/**
	 * Преобразует коллекцию в множество.
	 *
	 * Строит новое множество, включающее все элементы коллекции.
	 *
	 * @returns {Object} Множество элементов.
	 */
	toSet: function() {
		var result = {};
		this.every(function(item) {
			JW.Set.add(result, item);
		});
		return result;
	},
	
	/**
	 * Преобразует коллекцию в множество.
	 *
	 * Строит новое множество, включающее все элементы коллекции.
	 *
	 * @returns {JW.Set} `<T>` Множество элементов.
	 */
	$toSet: JW.AbstractCollection._create$Set("toSet"),
	
	/**
	 * Представляет коллекцию в виде массива.
	 *
	 * Если данная коллекция - массив, сразу возвращает его. В противном случае запускает метод #toArray.
	 * Данная функция работает как правило быстрее #toArray, но сначала убедитесь, что возвращенный массив
	 * никто не меняет, иначе могут возникнуть странные непредвиденные баги.
	 *
	 * @returns {Array} `<T>` Массив элементов.
	 */
	asArray: function() {
		return this.toArray();
	},
	
	/**
	 * Представляет коллекцию в виде массива.
	 *
	 * Если данная коллекция - массив, сразу возвращает его. В противном случае запускает метод #toArray.
	 * Данная функция работает как правило быстрее #toArray, но сначала убедитесь, что возвращенный массив
	 * никто не меняет, иначе могут возникнуть странные непредвиденные баги.
	 *
	 * @returns {JW.Array} `<T>` Массив элементов.
	 */
	$asArray: JW.AbstractCollection._create$Array("asArray"),
	
	/**
	 * Представляет коллекцию в виде множества.
	 *
	 * Если данная коллекция - множество, сразу возвращает его. В противном случае запускает метод #toSet.
	 * Данная функция работает как правило быстрее #toSet, но сначала убедитесь, что возвращенное множество
	 * никто не меняет, иначе могут возникнуть странные непредвиденные баги.
	 *
	 * @returns {Object} Множество элементов.
	 */
	asSet: function() {
		return this.toSet();
	},
	
	/**
	 * Представляет коллекцию в виде множества.
	 *
	 * Если данная коллекция - множество, сразу возвращает его. В противном случае запускает метод #toSet.
	 * Данная функция работает как правило быстрее #toSet, но сначала убедитесь, что возвращенное множество
	 * никто не меняет, иначе могут возникнуть странные непредвиденные баги.
	 *
	 * @returns {JW.Set} `<T>` Множество элементов.
	 */
	$asSet: JW.AbstractCollection._create$Set("asSet")
	
	/**
	 * @method filter
	 *
	 * Фильтрует коллекцию по критерию.
	 *
	 * Строит новую коллекцию того же типа, включающую только те элементы, функция f на которых вернула !== false.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T): boolean`
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
	 * `f(item: T): boolean`
	 *
	 * Фильтрующая функция.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {JW.AbstractCollection} `<T>` Отфильтрованная коллекция.
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
	 * `f(item: T): U`
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
	 * `f(item: T): U`
	 *
	 * Отображающая функция.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {JW.AbstractCollection} `<U>` Отображенная коллекция.
	 */
	
	/**
	 * @method createEmpty
	 * `<U>` Конструирует пустую коллекцию того же типа.
	 * @returns {JW.AbstractCollection} `<U>` Коллекция.
	 */
	/**
	 * @method createEmptyArray
	 * `<U>` Конструирует пустой массив того же типа (простой или оповещающий).
	 * @returns {JW.AbstractArray} `<U>` Массив.
	 */
	/**
	 * @method createEmptyMap
	 * `<U>` Конструирует пустой словарь того же типа (простой или оповещающий).
	 * @returns {JW.AbstractMap} `<U>` Словарь.
	 */
	/**
	 * @method createEmptySet
	 * `<U>` Конструирует пустое множество того же типа (простое или оповещающее).
	 * @returns {JW.AbstractSet} `<U>` Множество.
	 */
	/**
	 * @method createMapper
	 * `<U>` Конструирует конвертер элементов коллекции.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.AbstractCollection.Mapper}
	 * `<T, U, JW.AbstractCollection<T>, JW.AbstractCollection<U>>` Синхронизатор.
	 */
	/**
	 * @method createObserver
	 * Конструирует наблюдатель коллекции.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.AbstractCollection.Observer}
	 * `<T, JW.AbstractCollection<T>>` Синхронизатор.
	 */
	/**
	 * @method createOrderer
	 * Конструирует конвертер коллекции в массив (упорядочитель).
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.AbstractCollection.Orderer}
	 * `<T, JW.AbstractCollection<T>>` Синхронизатор.
	 */
	/**
	 * @method createSorterComparing
	 * Конструирует конвертер коллекции в массив (сортировщик по компаратору).
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.AbstractCollection.SorterComparing}
	 * `<T, JW.AbstractCollection<T>>` Синхронизатор.
	 */
	/**
	 * @method createIndexer
	 * Конструирует индексатор коллекции.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.AbstractCollection.Indexer}
	 * `<T, JW.AbstractCollection<T>>` Синхронизатор.
	 */
	/**
	 * @method createLister
	 * Конструирует конвертер коллекции в множество.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.AbstractCollection.Lister}
	 * `<T, JW.AbstractCollection<T>>` Синхронизатор.
	 */
});
