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
 * - Конвертер в массив (сортировщик): JW.AbstractCollection.Sorter
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
 * Алгоритмы коллекций:
 *
 * - {@link #every}, #everyBy, #everyByMethod - Проверяет все элементы по критерию.
 * Возвращает true тогда и только тогда, когда все элементы удовлетворяют критерию.
 * - {@link #some}, #someBy, #someByMethod - Проверяет каждый элемент по критерию.
 * Возвращает true тогда и только тогда, когда хотя бы один элемент удовлетворяет критерию.
 * - {@link #each}, #eachByMethod - Перебирает элементы.
 * - {@link #search}, #searchBy, #searchByMethod - Ищет элемент по критерию.
 * Возвращает первый элемент, удовлетворяющий критерию.
 * - {@link #filter}, #$filter, #filterBy, #$filterBy, #filterByMethod, #$filterByMethod - Фильтрует коллекцию по критерию.
 * Строит новую коллекцию того же типа, включающую только элементы, удовлетворяющие критерию.
 * - {@link #map}, #$map, #mapBy, #$mapBy, #mapByMethod, #$mapByMethod - Отображает элементы коллекции.
 * Строит новую коллекцию того же типа, состояющую из результатов запуска отображающей функции на каждом элементе
 * коллекции.
 * - {@link #toSorted}, #$toSorted, #toSortedBy, #$toSortedBy, #toSortedByMethod, #$toSortedByMethod,
 * {@link #toSortedComparing}, #$toSortedComparing - Строит массив из элементов коллекции, отсортированный по индексу
 * или компаратору.
 * - {@link #index}, #$index, #indexBy, #$indexBy, #indexByMethod, #$indexByMethod - Индексирует коллекцию.
 * Строит словарь, в ключах которого находятся индексы элементов, а в значениях - соответствующие элементы.
 * - {@link #toArray}, #$toArray - Строит новый массив из элементов коллекции.
 * - {@link #toSet}, #$toSet - Строит новое множество из элементов коллекции.
 * - {@link #asArray}, #$asArray - Представляет коллекцию в виде массива.
 * - {@link #asSet}, #$asSet - Представляет коллекцию в виде множества.
 *
 * @extends JW.Class
 * @abstract
 */
JW.AbstractCollection = function() {
	JW.AbstractCollection._super.call(this);
};

JW.AbstractCollection._createBy = function(algorithm) {
	return function(field, value) {
		return this[algorithm](function(item) {
			return JW.get(item, field) === value;
		});
	};
};

JW.AbstractCollection._createByField = function(algorithm) {
	return function(field) {
		return this[algorithm](function(item) {
			return JW.get(item, field);
		});
	};
};

JW.AbstractCollection._createByMethod = function(algorithm) {
	return function(method, args) {
		args = args || [];
		return this[algorithm](function(item) {
			return item[method].apply(item, args);
		});
	};
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
	 * Проверяет все элементы по критерию.
	 * 
	 * Возвращает true тогда и только тогда, когда поле field всех элементов коллекции строго равно (===) значению
	 * value. Поле элемента извлекается с помощью функции JW.get.
	 * 
	 * Алгоритм последовательно перебирает все элементы, и останавливается после первого элемента, не удовлетворяющего
	 * критерию.
	 *
	 * @param {string/Array} field Поле элемента.
	 * @param {Mixed} value Значение.
	 * @returns {boolean} Результат проверки.
	 */
	everyBy: JW.AbstractCollection._createBy("every"),
	
	/**
	 * Проверяет все элементы по критерию.
	 * 
	 * Возвращает true тогда и только тогда, когда метод method с аргументами args возвращает !== false для всех
	 * элементов коллекции.
	 * 
	 * Алгоритм последовательно перебирает все элементы, и останавливается после первого элемента, не удовлетворяющего
	 * критерию.
	 *
	 * @param {string} method Имя метода элемента.
	 * @param {Array} [args] Аргументы.
	 * @returns {boolean} Результат проверки.
	 */
	everyByMethod: JW.AbstractCollection._createByMethod("every"),
	
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
	 * Проверяет каждый элемент по критерию.
	 * 
	 * Возвращает true тогда и только тогда, когда поле field хотя бы одного элемента коллекции строго равно (===)
	 * значению value. Поле элемента извлекается с помощью функции JW.get.
	 * 
	 * Алгоритм последовательно перебирает все элементы, и останавливается после первого элемента, удовлетворяющего
	 * критерию.
	 *
	 * @param {string/Array} field Поле элемента.
	 * @param {Mixed} value Значение.
	 * @returns {boolean} Результат проверки.
	 */
	someBy: JW.AbstractCollection._createBy("some"),
	
	/**
	 * Проверяет каждый элемент по критерию.
	 * 
	 * Возвращает true тогда и только тогда, когда метод method с аргументами args возвращает !== false хотя бы у
	 * одного элемента коллекции.
	 * 
	 * Алгоритм последовательно перебирает все элементы, и останавливается после первого элемента, удовлетворяющего
	 * критерию.
	 *
	 * @param {string} method Имя метода элемента.
	 * @param {Array} [args] Аргументы.
	 * @returns {boolean} Результат проверки.
	 */
	someByMethod: JW.AbstractCollection._createByMethod("some"),
	
	/**
	 * Перебирает элементы коллекции. Запускает указанную функцию на всех элементах.
	 *
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
	 * Перебирает элементы коллекции. Запускает указанный метод у всех элементов.
	 * @param {string} method Имя метода элемента.
	 * @param {Array} [args] Аргументы.
	 * @returns {void}
	 */
	eachByMethod: JW.AbstractCollection._createByMethod("each"),
	
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
	 * Ищет элемент по критерию.
	 * 
	 * Возвращает первый элемент, поле field которого строго равно (===) значению value.
	 * Поле элемента извлекается с помощью функции JW.get.
	 * 
	 * Алгоритм последовательно перебирает все элементы, и останавливается после первого элемента, удовлетворяющего
	 * критерию.
	 *
	 * @param {string/Array} field Поле элемента.
	 * @param {Mixed} value Значение.
	 * @returns {T} Найденный элемент или undefined.
	 */
	searchBy: JW.AbstractCollection._createBy("search"),
	
	/**
	 * Ищет элемент по критерию.
	 * 
	 * Возвращает первый элемент, указанный метод которого с аргументами args возвращает !== false.
	 * 
	 * Алгоритм последовательно перебирает все элементы, и останавливается после первого элемента, удовлетворяющего
	 * критерию.
	 *
	 * @param {string} method Имя метода элемента.
	 * @param {Array} [args] Аргументы.
	 * @returns {T} Найденный элемент или undefined.
	 */
	searchByMethod: JW.AbstractCollection._createByMethod("search"),
	
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
	 * @returns {Array} Отсортированный массив.
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
	 * Строит массив из элементов коллекции, отсортированный по указанному полю каждого элемента.
	 * Поле элемента извлекается с помощью функции JW.get.
	 *
	 * @param {string/Array} field Поле элемента.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {Array} Отсортированный массив.
	 */
	toSortedBy: JW.AbstractCollection._createByField("toSorted"),
	
	/**
	 * Преобразует коллекцию в отсортированный массив.
	 *
	 * Строит массив из элементов коллекции, отсортированный по указанному полю каждого элемента.
	 * Поле элемента извлекается с помощью функции JW.get.
	 *
	 * @param {string/Array} field Поле элемента.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {JW.Array} `<T>` Отсортированный массив.
	 */
	$toSortedBy: JW.AbstractCollection._create$Array("toSortedBy"),
	
	/**
	 * Преобразует коллекцию в отсортированный массив.
	 *
	 * Строит массив из элементов коллекции, отсортированный по результату запуска указанного метода у каждого
	 * элемента.
	 *
	 * @param {string} method Имя метода элемента.
	 * @param {Array} [args] Аргументы.
	 * @returns {Array} Отсортированный массив.
	 */
	toSortedByMethod: JW.AbstractCollection._createByMethod("toSorted"),
	
	/**
	 * Преобразует коллекцию в отсортированный массив.
	 *
	 * Строит массив из элементов коллекции, отсортированный по результату запуска указанного метода у каждого
	 * элемента.
	 *
	 * @param {string} method Имя метода элемента.
	 * @param {Array} [args] Аргументы.
	 * @returns {JW.Array} `<T>` Отсортированный массив.
	 */
	$toSortedByMethod: JW.AbstractCollection._create$Array("toSortedByMethod"),
	
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
	 * @returns {Array} Отсортированный массив.
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
	 * Индексирует коллекцию.
	 *
	 * Строит словарь, в ключах которого находятся значения указанного поля элементов,
	 * а в значениях - соответствующие элементы. Поле элемента извлекается с помощью функции JW.get.
	 *
	 * @param {string/Array} field Поле элемента.
	 * @returns {Object} Индекс коллекции.
	 */
	indexBy: JW.AbstractCollection._createByField("index"),
	
	/**
	 * Индексирует коллекцию.
	 *
	 * Строит словарь, в ключах которого находятся значения указанного поля элементов,
	 * а в значениях - соответствующие элементы. Поле элемента извлекается с помощью функции JW.get.
	 *
	 * @param {string/Array} field Поле элемента.
	 * @returns {JW.Map} `<T>` Индекс коллекции.
	 */
	$indexBy: JW.AbstractCollection._create$Map("indexBy"),
	
	/**
	 * Индексирует коллекцию.
	 *
	 * Строит словарь, в ключах которого находятся результаты запуска указанного метода у элементов,
	 * а в значениях - соответствующие элементы.
	 *
	 * @param {string} method Имя метода элемента.
	 * @param {Array} [args] Аргументы.
	 * @returns {Object} Индекс коллекции.
	 */
	indexByMethod: JW.AbstractCollection._createByMethod("index"),
	
	/**
	 * Индексирует коллекцию.
	 *
	 * Строит словарь, в ключах которого находятся результаты запуска указанного метода у элементов,
	 * а в значениях - соответствующие элементы.
	 *
	 * @param {string} method Имя метода элемента.
	 * @param {Array} [args] Аргументы.
	 * @returns {JW.Map} `<T>` Индекс коллекции.
	 */
	$indexByMethod: JW.AbstractCollection._create$Map("indexByMethod"),
	
	/**
	 * Преобразует коллекцию в массив.
	 *
	 * Строит новый массив, включающий все элементы коллекции.
	 *
	 * @returns {Array} Массив элементов.
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
	 * @returns {Array} Массив элементов.
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
	$asSet: JW.AbstractCollection._create$Set("asSet"),
	
	/**
	 * @method filter
	 *
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
	 * `f(T item): boolean`
	 *
	 * Фильтрующая функция.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {JW.AbstractCollection} `<T>` Отфильтрованная коллекция.
	 */
	/**
	 * Фильтрует коллекцию по критерию.
	 * 
	 * Строит новую коллекцию того же типа, включающую только те элементы, поле field которых строго равно (===)
	 * значению value. Поле элемента извлекается с помощью функции JW.get.
	 * 
	 * @param {string/Array} field Поле элемента.
	 * @param {Mixed} value Значение.
	 * @returns {Array/Object} Отфильтрованная коллекция.
	 */
	filterBy: JW.AbstractCollection._createBy("filter"),
	
	/**
	 * Фильтрует коллекцию по критерию.
	 * 
	 * Строит новую коллекцию того же типа, включающую только те элементы, поле field которых строго равно (===)
	 * значению value. Поле элемента извлекается с помощью функции JW.get.
	 * 
	 * @param {string/Array} field Поле элемента.
	 * @param {Mixed} value Значение.
	 * @returns {JW.AbstractCollection} `<T>` Отфильтрованная коллекция.
	 */
	$filterBy: JW.AbstractCollection._createBy("$filter"),
	
	/**
	 * Фильтрует коллекцию по критерию.
	 * 
	 * Строит новую коллекцию того же типа, включающую только те элементы, метод method которых с аргументами args
	 * возвращает !== false для всех элементов коллекции.
	 * 
	 * @param {string} method Имя метода элемента.
	 * @param {Array} [args] Аргументы.
	 * @returns {Array/Object} Отфильтрованная коллекция.
	 */
	filterByMethod: JW.AbstractCollection._createByMethod("filter"),
	
	/**
	 * Фильтрует коллекцию по критерию.
	 * 
	 * Строит новую коллекцию того же типа, включающую только те элементы, метод method которых с аргументами args
	 * возвращает !== false для всех элементов коллекции.
	 * 
	 * @param {string} method Имя метода элемента.
	 * @param {Array} [args] Аргументы.
	 * @returns {JW.AbstractCollection} `<T>` Отфильтрованная коллекция.
	 */
	$filterByMethod: JW.AbstractCollection._createByMethod("$filter"),
	
	/**
	 * @method map
	 *
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
	 * `f(T item): U`
	 *
	 * Отображающая функция.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {JW.AbstractCollection} `<U>` Отображенная коллекция.
	 */
	/**
	 * `<U>` Отображает элементы коллекции.
	 * 
	 * Строит новую коллекцию того же типа, состояющую из значений поля field всех элементов коллекции. Поле элемента
	 * извлекается с помощью функции JW.get.
	 * 
	 * @param {string/Array} field Поле элемента.
	 * @param {Mixed} value Значение.
	 * @returns {Array/Object} Отображенная коллекция.
	 */
	mapBy: JW.AbstractCollection._createByField("map"),
	
	/**
	 * `<U>` Отображает элементы коллекции.
	 * 
	 * Строит новую коллекцию того же типа, состояющую из значений поля field всех элементов коллекции. Поле элемента
	 * извлекается с помощью функции JW.get.
	 * 
	 * @param {string/Array} field Поле элемента.
	 * @param {Mixed} value Значение.
	 * @returns {JW.AbstractCollection} `<U>` Отображенная коллекция.
	 */
	$mapBy: JW.AbstractCollection._createByField("$map"),
	
	/**
	 * `<U>` Отображает элементы коллекции.
	 * 
	 * Строит новую коллекцию того же типа, состояющую из результатов запуска метода method с аргументами args
	 * у всех элементов коллекции.
	 * 
	 * @param {string} method Имя метода элемента.
	 * @param {Array} [args] Аргументы.
	 * @returns {Array/Object} Отображенная коллекция.
	 */
	mapByMethod: JW.AbstractCollection._createByMethod("map"),
	
	/**
	 * `<U>` Отображает элементы коллекции.
	 * 
	 * Строит новую коллекцию того же типа, состояющую из результатов запуска метода method с аргументами args
	 * у всех элементов коллекции.
	 * 
	 * @param {string} method Имя метода элемента.
	 * @param {Array} [args] Аргументы.
	 * @returns {JW.AbstractCollection} `<U>` Отображенная коллекция.
	 */
	$mapByMethod: JW.AbstractCollection._createByMethod("$map")
});
