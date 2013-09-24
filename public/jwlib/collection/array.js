/*
	JW array extension.
	
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
 * Простой массив. Структурированный список методов смотрите в JW.AbstractArray.
 * Статические методы повторяют интерфейс JW.AbstractArray, только принимают нативный Array в качестве
 * первого аргумента.
 *
 * @extends JW.AbstractArray
 *
 * @constructor
 * @param {Array} [items] `<T>` Изначальное содержимое массива. По умолчанию, создается пустой массив.
 * @param {boolean} [adapter] Создать массив как адаптер над items. По умолчанию, равен false, т.е. создается
 * копия массива items.
 */
JW.Array = function(items, adapter) {
	JW.Array._super.call(this, items, adapter);
};

JW.extend(JW.Array, JW.AbstractArray, {
	/**
	 * `<U>` Конструирует пустую коллекцию того же типа.
	 * @returns {JW.Array} `<U>` Коллекция.
	 */
	createEmpty: function() {
		return new JW.Array();
	},
	
	/**
	 * `<U>` Конструирует пустой массив того же типа (простой или оповещающий).
	 * @returns {JW.Array} `<U>` Массив.
	 */
	createEmptyArray: function() {
		return new JW.Array();
	},
	
	/**
	 * `<U>` Конструирует пустой словарь того же типа (простой или оповещающий).
	 * @returns {JW.Map} `<U>` Словарь.
	 */
	createEmptyMap: function() {
		return new JW.Map();
	},
	
	/**
	 * `<U>` Конструирует пустое множество того же типа (простое или оповещающее).
	 * @returns {JW.Set} `<U>` Множество.
	 */
	createEmptySet: function() {
		return new JW.Set();
	}
	
	/**
	 * @method getLength
	 * `<T>` Возвращает количество элементов в коллекции.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @returns {number} Количество элементов в коллекции.
	 */
	/**
	 * @method isEmpty
	 * `<T>` Проверяет коллекцию на пустоту.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @returns {boolean} Коллекция не содержит ни одного элемента.
	 */
	/**
	 * @method getFirst
	 * `<T>` Возвращает первый элемент коллекции. Если коллекция пуста, вернет undefined.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @returns {T} Элемент.
	 */
	/**
	 * @method getFirstKey
	 * `<T>` Возвращает индекс первого элемента коллекции. Если коллекция пуста, вернет undefined.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @returns {number} Индекс.
	 */
	/**
	 * @method getLast
	 * `<T>` Возвращает последний элемент коллекции. Если коллекция пуста, вернет undefined.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @returns {T} Элемент.
	 */
	/**
	 * @method getLastKey
	 * `<T>` Возвращает индекс последнего элемента коллекции. Если коллекция пуста, вернет undefined.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @returns {number} Индекс.
	 */
	/**
	 * @method get
	 * `<T>` Возвращает элемент по индексу. В случае, если элемента с таким индексом нет, вернет undefined.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {number} index Индекс.
	 * @returns {T} Элемент.
	 */
	/**
	 * @method containsKey
	 * `<T>` Проверяет наличие элемента с заданным индексом в коллекции.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {number} index Индекс.
	 * @returns {boolean} Коллекция содержит элемент с указанным индексом.
	 */
	/**
	 * @method containsItem
	 * `<T>` Проверяет наличие элемента в коллекции.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {T} item Элемент.
	 * @returns {boolean} Коллекция содержит указанный элемент.
	 */
	/**
	 * @method keyOf
	 * `<T>` Определяет индекс элемента в данной коллекции. Если такого элемента в коллекции нет, вернет undefined.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {T} item Элемент.
	 * @returns {number} Индекс элемента.
	 */
	/**
	 * @method getKeys
	 * `<T>` Возвращает массив индексов всех элементов коллекции, т.е. массив `[0, 1, ... , length - 1]`.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @returns {Array} Массив индексов.
	 */
	/**
	 * @method $getKeys
	 * `<T>` Возвращает массив индексов всех элементов коллекции, т.е. массив `[0, 1, ... , length - 1]`.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @returns {JW.Array} `<number>` Массив ключей.
	 */
	/**
	 * @method removeItem
	 * `<T>` Удаляет первое вхождение указанного элемента из коллекции.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {T} item Элемент.
	 * @returns {void}
	 */
	/**
	 * @method removeItems
	 * `<T extends JW.Class>` Удаляет все вхождения указанных элементов из коллекции.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {Array} items `<T>` Элементы.
	 * @returns {void}
	 */
	/**
	 * @method tryClear
	 * `<T>` Очищает коллекцию.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @returns {Array} Бывшее содержимое коллекции. Если нет изменений - undefined.
	 */
	/**
	 * @method clear
	 * `<T>` Очищает коллекцию.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @returns {Array} Бывшее содержимое коллекции.
	 */
	/**
	 * @method $clear
	 * `<T>` Очищает коллекцию.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @returns {JW.Array} `<T>` Бывшее содержимое коллекции.
	 */
	/**
	 * @method every
	 *
	 * `<T>` Проверяет все элементы по критерию.
	 * 
	 * Возвращает true тогда и только тогда, когда функция f возвращает !== false на всех элементах коллекции.
	 * 
	 * Алгоритм последовательно перебирает все элементы, и останавливается после первого элемента, не удовлетворяющего
	 * критерию.
	 *
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {Function} f
	 *
	 * `f(item: T, index: number): boolean`
	 *
	 * Критерий проверки элементов.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {boolean} Результат проверки.
	 */
	/**
	 * @method some
	 *
	 * `<T>` Проверяет каждый элемент по критерию.
	 * 
	 * Возвращает true тогда и только тогда, когда функция f возвращает !== false хотя бы на одном элементе коллекции.
	 * 
	 * Алгоритм последовательно перебирает все элементы, и останавливается после первого элемента, удовлетворяющего
	 * критерию.
	 *
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {Function} f
	 *
	 * `f(item: T, index: number): boolean`
	 *
	 * Критерий проверки элементов.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {boolean} Результат проверки.
	 */
	/**
	 * @method each
	 * `<T>` Перебирает элементы коллекции. Запускает указанную функцию на всех элементах.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, index: number): void`
	 *
	 * Функция.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {void}
	 */
	/**
	 * @method find
	 *
	 * `<T>` Ищет элемент по критерию.
	 * 
	 * Возвращает индекс первого элемента, функция f на котором возвращает !== false.
	 * 
	 * Алгоритм последовательно перебирает все элементы, и останавливается после первого элемента, удовлетворяющего
	 * критерию.
	 *
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {Function} f
	 *
	 * `f(item: T, index: number): boolean`
	 *
	 * Критерий проверки элементов.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {number} Индекс найденного элемента или undefined.
	 */
	/**
	 * @method search
	 *
	 * `<T>` Ищет элемент по критерию.
	 * 
	 * Возвращает первый элемент, функция f на котором возвращает !== false.
	 * 
	 * Алгоритм последовательно перебирает все элементы, и останавливается после первого элемента, удовлетворяющего
	 * критерию.
	 *
	 * @static
	 * @param {Array} array `<T>` Массив.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, index: number): boolean`
	 *
	 * Критерий проверки элементов.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {T} Найденный элемент или undefined.
	 */
	/**
	 * @method toSorted
	 *
	 * `<T>` Преобразует коллекцию в отсортированный массив.
	 *
	 * Строит массив из элементов коллекции, отсортированный по результату запуска функции f на каждом элементе.
	 *
	 * @static
	 * @param {Array} array `<T>` Массив.
	 *
	 * @param {Function} [f]
	 *
	 * `f(item: T, index: number): number/string`
	 *
	 * Функция-сортировщик для элемента. По умолчанию возвращает item.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {Array} `<T>` Отсортированный массив.
	 */
	/**
	 * @method $toSorted
	 *
	 * `<T>` Преобразует коллекцию в отсортированный массив.
	 *
	 * Строит массив из элементов коллекции, отсортированный по результату запуска функции f на каждом элементе.
	 *
	 * @static
	 * @param {Array} array `<T>` Массив.
	 *
	 * @param {Function} [f]
	 *
	 * `f(item: T, index: number): number/string`
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
	 * `<T>` Преобразует коллекцию в отсортированный массив.
	 *
	 * Строит массив из элементов коллекции, отсортированный по компаратору.
	 *
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {Function} [compare]
	 *
	 * `f(t1: T, t2: T, i1: number, i2: number): Number`
	 *
	 * Функция-компаратор. Возвращает положительное значение, если t1 > t2; отрицательное значение, если t1 < t2;
	 * 0, если t1 == t2. По умолчанию возвращает JW.cmp(t1, t2).
	 *
	 * @param {Object} [scope] Контекст вызова compare. По умолчанию compare вызывается в контексте коллекции.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {Array} `<T>` Отсортированный массив.
	 */
	/**
	 * @method $toSortedComparing
	 *
	 * `<T>` Преобразует коллекцию в отсортированный массив.
	 *
	 * Строит массив из элементов коллекции, отсортированный по компаратору.
	 *
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {Function} [compare]
	 *
	 * `f(t1: T, t2: T, i1: number, i2: number): Number`
	 *
	 * Функция-компаратор. Возвращает положительное значение, если t1 > t2; отрицательное значение, если t1 < t2;
	 * 0, если t1 == t2. По умолчанию возвращает JW.cmp(t1, t2).
	 *
	 * @param {Object} [scope] Контекст вызова compare. По умолчанию compare вызывается в контексте коллекции.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {JW.Array} `<T>` Отсортированный массив.
	 */
	/**
	 * @method getSortingKeys
	 *
	 * `<T>` Возвращает массив индексов отсортированных элементов.
	 *
	 * Строит массив из индексов элементов коллекции, отсортированный по результату запуска функции f на каждом
	 * элементе.
	 *
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {Function} [f]
	 *
	 * `f(item: T, index: number): number/string`
	 *
	 * Функция-сортировщик для элемента. По умолчанию возвращает item.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {Array} `<number>` Массив индексов отсортированных элементов.
	 */
	/**
	 * @method $getSortingKeys
	 *
	 * `<T>` Возвращает массив индексов отсортированных элементов.
	 *
	 * Строит массив из индексов элементов коллекции, отсортированный по результату запуска функции f на каждом
	 * элементе.
	 *
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {Function} [f]
	 *
	 * `f(item: T, index: number): number/string`
	 *
	 * Функция-сортировщик для элемента. По умолчанию возвращает item.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {JW.Array} `<number>` Массив индексов отсортированных элементов.
	 */
	/**
	 * @method getSortingKeysComparing
	 *
	 * `<T>` Возвращает массив индексов отсортированных элементов.
	 *
	 * Строит массив из индексов элементов коллекции, отсортированный по компаратору.
	 *
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {Function} [compare]
	 *
	 * `f(t1: T, t2: T, i1: number, i2: number): Number`
	 *
	 * Функция-компаратор. Возвращает положительное значение, если t1 > t2; отрицательное значение, если t1 < t2;
	 * 0, если t1 == t2. По умолчанию возвращает JW.cmp(t1, t2).
	 *
	 * @param {Object} [scope] Контекст вызова compare. По умолчанию compare вызывается в контексте коллекции.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {Array} `<number>` Массив индексов отсортированных элементов.
	 */
	/**
	 * @method $getSortingKeysComparing
	 *
	 * `<T>` Возвращает массив индексов отсортированных элементов.
	 *
	 * Строит массив из индексов элементов коллекции, отсортированный по компаратору.
	 *
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {Function} [compare]
	 *
	 * `f(t1: T, t2: T, i1: number, i2: number): Number`
	 *
	 * Функция-компаратор. Возвращает положительное значение, если t1 > t2; отрицательное значение, если t1 < t2;
	 * 0, если t1 == t2. По умолчанию возвращает JW.cmp(t1, t2).
	 *
	 * @param {Object} [scope] Контекст вызова compare. По умолчанию compare вызывается в контексте коллекции.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {JW.Array} `<number>` Массив индексов отсортированных элементов.
	 */
	/**
	 * @method index
	 *
	 * `<T>` Индексирует коллекцию.
	 *
	 * Строит словарь, в ключах которого находятся результаты запуска функции f на всех элементах,
	 * а в значениях - соответствующие элементы.
	 *
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {Function} f
	 *
	 * `f(item: T, index: number): string`
	 *
	 * Функция-индексатор для элемента.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {Object} Индекс коллекции.
	 */
	/**
	 * @method $index
	 *
	 * `<T>` Индексирует коллекцию.
	 *
	 * Строит словарь, в ключах которого находятся результаты запуска функции f на всех элементах,
	 * а в значениях - соответствующие элементы.
	 *
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {Function} f
	 *
	 * `f(item: T, index: number): string`
	 *
	 * Функция-индексатор для элемента.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {JW.Map} `<T>` Индекс коллекции.
	 */
	/**
	 * @method toArray
	 *
	 * `<T>` Преобразует коллекцию в массив.
	 *
	 * Строит новый массив, включающий все элементы коллекции.
	 *
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @returns {Array} `<T>` Массив элементов.
	 */
	/**
	 * @method $toArray
	 *
	 * `<T>` Преобразует коллекцию в массив.
	 *
	 * Строит новый массив, включающий все элементы коллекции.
	 *
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @returns {JW.Array} `<T>` Массив элементов.
	 */
	/**
	 * @method toMap
	 *
	 * Преобразует коллекцию в словарь.
	 *
	 * Строит новый словарь, включающий все элементы коллекции с их ключами в данной коллекции.
	 *
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @returns {Object} Словарь элементов.
	 */
	/**
	 * @method $toMap
	 *
	 * Преобразует коллекцию в словарь.
	 *
	 * Строит новый словарь, включающий все элементы коллекции с их ключами в данной коллекции.
	 *
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @returns {JW.Map} `<T>` Словарь элементов.
	 */
	/**
	 * @method toSet
	 *
	 * `<T>` Преобразует коллекцию в множество.
	 *
	 * Строит новое множество, включающее все элементы коллекции.
	 *
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @returns {Object} Множество элементов.
	 */
	/**
	 * @method $toSet
	 *
	 * `<T>` Преобразует коллекцию в множество.
	 *
	 * Строит новое множество, включающее все элементы коллекции.
	 *
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @returns {JW.Set} `<T>` Множество элементов.
	 */
	/**
	 * @method asArray
	 *
	 * `<T>` Представляет коллекцию в виде массива.
	 *
	 * Если данная коллекция - массив, сразу возвращает его. В противном случае запускает метод {@link #static-method-toArray}.
	 * Данная функция работает как правило быстрее {@link #static-method-toArray}, но сначала убедитесь, что возвращенный массив
	 * никто не меняет, иначе могут возникнуть странные непредвиденные баги.
	 *
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @returns {Array} `<T>` Массив элементов.
	 */
	/**
	 * @method $asArray
	 *
	 * `<T>` Представляет коллекцию в виде массива.
	 *
	 * Если данная коллекция - массив, сразу возвращает его. В противном случае запускает метод {@link #static-method-toArray}.
	 * Данная функция работает как правило быстрее {@link #static-method-toArray}, но сначала убедитесь, что возвращенный массив
	 * никто не меняет, иначе могут возникнуть странные непредвиденные баги.
	 *
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @returns {JW.Array} `<T>` Массив элементов.
	 */
	/**
	 * @method asMap
	 *
	 * Представляет коллекцию в виде словаря.
	 *
	 * Если данная коллекция - словарь, сразу возвращает его. В противном случае запускает метод {@link #static-method-toMap}.
	 * Данная функция работает как правило быстрее {@link #static-method-toMap}, но сначала убедитесь, что возвращенный массив
	 * никто не меняет, иначе могут возникнуть странные непредвиденные баги.
	 *
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @returns {Object} Словарь элементов.
	 */
	/**
	 * @method $asMap
	 *
	 * Представляет коллекцию в виде словаря.
	 *
	 * Если данная коллекция - словарь, сразу возвращает его. В противном случае запускает метод {@link #static-method-toMap}.
	 * Данная функция работает как правило быстрее {@link #static-method-toMap}, но сначала убедитесь, что возвращенный массив
	 * никто не меняет, иначе могут возникнуть странные непредвиденные баги.
	 *
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @returns {JW.Map} `<T>` Словарь элементов.
	 */
	/**
	 * @method asSet
	 *
	 * `<T>` Представляет коллекцию в виде множества.
	 *
	 * Если данная коллекция - множество, сразу возвращает его. В противном случае запускает метод {@link #static-method-toSet}.
	 * Данная функция работает как правило быстрее {@link #static-method-toSet}, но сначала убедитесь, что возвращенное множество
	 * никто не меняет, иначе могут возникнуть странные непредвиденные баги.
	 *
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @returns {Object} Множество элементов.
	 */
	/**
	 * @method $asSet
	 *
	 * `<T>` Представляет коллекцию в виде множества.
	 *
	 * Если данная коллекция - множество, сразу возвращает его. В противном случае запускает метод {@link #static-method-toSet}.
	 * Данная функция работает как правило быстрее {@link #static-method-toSet}, но сначала убедитесь, что возвращенное множество
	 * никто не меняет, иначе могут возникнуть странные непредвиденные баги.
	 *
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @returns {JW.Set} `<T>` Множество элементов.
	 */
	/**
	 * @method filter
	 *
	 * `<T>` Фильтрует коллекцию по критерию.
	 *
	 * Строит новую коллекцию того же типа, включающую только те элементы, функция f на которых вернула !== false.
	 *
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {Function} f
	 *
	 * `f(T item, index: number): boolean`
	 *
	 * Фильтрующая функция.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {Array} `<T>` Отфильтрованная коллекция.
	 */
	/**
	 * @method $filter
	 *
	 * `<T>` Фильтрует коллекцию по критерию.
	 *
	 * Строит новую коллекцию того же типа, включающую только те элементы, функция f на которых вернула !== false.
	 *
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {Function} f
	 *
	 * `f(T item, index: number): boolean`
	 *
	 * Фильтрующая функция.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {JW.Array} `<T>` Отфильтрованная коллекция.
	 */
	/**
	 * @method map
	 *
	 * `<T, U>` Отображает элементы коллекции.
	 * 
	 * Строит новую коллекцию того же типа, состояющую из результатов запуска функции f на каждом элементе коллекции.
	 *
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {Function} f
	 *
	 * `f(T item, index: number): U`
	 *
	 * Отображающая функция.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {Array} `<U>` Отображенная коллекция.
	 */
	/**
	 * @method $map
	 *
	 * `<T, U>` Отображает элементы коллекции.
	 * 
	 * Строит новую коллекцию того же типа, состояющую из результатов запуска функции f на каждом элементе коллекции.
	 *
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {Function} f
	 *
	 * `f(T item, index: number): U`
	 *
	 * Отображающая функция.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {JW.Array} `<U>` Отображенная коллекция.
	 */
	/**
	 * @method add
	 * `<T>` Добавляет элемент в массив.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {T} item Элемент.
	 * @param {number} [index] Индекс элемента, перед которым вставить новый элемент. По умолчанию, добавляет элемент
	 * в конец массива.
	 * @returns {void}
	 */
	/**
	 * @method tryAdd
	 * `<T>` Добавляет элемент в массив.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {T} item Элемент.
	 * @param {number} [index] Индекс элемента, перед которым вставить новый элемент. По умолчанию, добавляет элемент
	 * в конец массива.
	 * @returns {boolean} true.
	 */
	/**
	 * @method addAll
	 * `<T>` Добавляет набор элементов в массив.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {Array} items `<T>` Элементы.
	 * @param {number} [index] Индекс элемента, перед которым вставить новые элементы. По умолчанию, добавляет элементы
	 * в конец массива.
	 * @returns {void}
	 */
	/**
	 * @method tryAddAll
	 * `<T>` Добавляет набор элементов в массив.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {Array} items `<T>` Элементы.
	 * @param {number} [index] Индекс элемента, перед которым вставить новые элементы. По умолчанию, добавляет элементы
	 * в конец массива.
	 * @returns {boolean} true. Если нет изменений - undefined.
	 */
	/**
	 * @method set
	 * `<T>` Заменяет элемент с указанным индексом. В случае если элемента с таким индексом нет, массив сломается
	 * (не надо так).
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {T} item Элемент.
	 * @param {number} index Индекс.
	 * @returns {T} Бывший элемент коллекции.
	 */
	/**
	 * @method trySet
	 * `<T>` Заменяет элемент с указанным индексом. В случае если элемента с таким индексом нет, массив сломается
	 * (не надо так).
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {T} item Элемент.
	 * @param {number} index Индекс.
	 * @returns {JW.Proxy} `<T>` Обертка над бывшим элементом коллекции. Если нет изменений - undefined.
	 */
	/**
	 * @method remove
	 * `<T>` Удаляет элемент с указанным индексом. В случае если элемента с таким индексом нет, массив сломается
	 * (не надо так).
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {number} index Индекс.
	 * @returns {T} Бывший элемент коллекции.
	 */
	/**
	 * @method tryRemove
	 * `<T>` Удаляет элемент с указанным индексом. В случае если элемента с таким индексом нет, массив сломается
	 * (не надо так).
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {number} index Индекс.
	 * @returns {T} Бывший элемент коллекции. Если нет изменений - undefined.
	 */
	/**
	 * @method removeAll
	 * `<T>` Удаляет набор элементов из массива.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {number} index Индекс элемента, начиная с которого удалять.
	 * @param {number} count Количество удаленных элементов.
	 * @returns {Array} `<T>` Удаленные элементы.
	 */
	/**
	 * @method $removeAll
	 * `<T>` Удаляет набор элементов из массива.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {number} index Индекс элемента, начиная с которого удалять.
	 * @param {number} count Количество удаленных элементов.
	 * @returns {JW.Array} `<T>` Удаленные элементы.
	 */
	/**
	 * @method tryRemoveAll
	 * `<T>` Удаляет набор элементов из массива.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {number} index Индекс элемента, начиная с которого удалять.
	 * @param {number} count Количество удаленных элементов.
	 * @returns {Array} `<T>` Удаленные элементы. Если нет изменений - undefined.
	 */
	/**
	 * @method move
	 * `<T>` Перемещает элемент в массиве.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {number} fromIndex Индекс элемента, который переместить.
	 * @param {number} toIndex Куда переместить.
	 * @returns {T} Перемещенный элемент.
	 */
	/**
	 * @method tryMove
	 * `<T>` Перемещает элемент в массиве.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {number} fromIndex Индекс элемента, который переместить.
	 * @param {number} toIndex Куда переместить.
	 * @returns {T} Перемещенный элемент. Если нет изменений - undefined.
	 */
	/**
	 * @method splice
	 * `<T>` Добавляет и удаляет элементы коллекции. Универсальная оптимизированная атомарная операция удаления/вставки.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {Array} removeParamsList `<JW.AbstractArray.IndexCount>` Список отрезков для удаления по возрастанию
	 * индекса. Отрезки удаляются от конца к началу массива.
	 * @param {Array} addParamsList `<JW.AbstractArray.IndexItems<T>>` Список наборов для вставки по возрастанию
	 * индекса. Наборы вставляются от начала к концу массива.
	 * @returns {JW.AbstractArray.SpliceResult} `<T>` Результат.
	 */
	/**
	 * @method trySplice
	 * `<T>` Добавляет и удаляет элементы коллекции. Универсальная оптимизированная атомарная операция удаления/вставки.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {Array} removeParamsList `<JW.AbstractArray.IndexCount>` Список отрезков для удаления по возрастанию
	 * индекса. Отрезки удаляются от конца к началу массива.
	 * @param {Array} addParamsList `<JW.AbstractArray.IndexItems<T>>` Список наборов для вставки по возрастанию
	 * индекса. Наборы вставляются от начала к концу массива.
	 * @returns {JW.AbstractArray.SpliceResult} `<T>` Результат. Если нет изменений - undefined.
	 */
	/**
	 * @method reorder
	 * `<T>` Переупорядочивает элементы массива.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {Array} indexArray `<number>` Массив индексов. Элемент с индексом i будет перемещен в
	 * индекс indexArray[i]. Должен содержать все индексы от 0 до (length - 1).
	 * @returns {void}
	 */
	/**
	 * @method tryReorder
	 * `<T>` Переупорядочивает элементы массива.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {Array} indexArray `<number>` Массив индексов. Элемент с индексом i будет перемещен в
	 * индекс indexArray[i]. Должен содержать все индексы от 0 до (length - 1).
	 * @returns {Array} `<T>` Бывшее содержимое массива. Если нет изменений - undefined.
	 */
	/**
	 * @method detectSplice
	 * `<T>` Определяет параметры метода {@link #static-method-splice}, с которыми содержимое массива станет равно newItems.
	 * Т.е. определяет, какие элементы нужно удалить, какие вставить, и в какое место. Все элементы должны быть
	 * уникальны относительно функции getKey. Если элементы не уникальны, попробуйте метод
	 * {@link #static-method-detectFilter}.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {Array} newItems `<T>` Новое содержимое массива.
	 * @param {Function} [getKey] Функция, возвращающая уникальный ключ элемента в коллекции. По умолчанию
	 * равна JW.iid. Если коллекция содержит экземпляры JW.Class, то все тип-топ.
	 * @param {Object} [scope] Контекст вызова getKey. По умолчанию, функция вызывается в контексте коллекции.
	 * @returns {JW.AbstractArray.SpliceParams}
	 * `<T>` Параметры метода {@link #static-method-splice}.
	 * Если вызова метода не требуется - undefined.
	 */
	/**
	 * @method detectFilter
	 * Определяет параметр removeParamsList метода {@link #static-method-splice}, с которыми содержимое массива станет равно newItems.
	 * Определяет, какие элементы нужно удалить. Не предусматривает вставку новых элементов. В отличие от
	 * метода {@link #static-method-detectSplice}, не требует уникальности элементов массива.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {Array} newItems `<T>` Новое содержимое массива.
	 * @returns {Array}
	 * `<JW.AbstractArray.IndexCount>` Параметр removeParamsList метода {@link #static-method-splice}.
	 * Если вызова метода не требуется - undefined.
	 */
	/**
	 * @method detectReorder
	 * `<T>` Определяет параметр метода {@link #static-method-reorder}, с которым содержимое массива станет равно newItems.
	 * Т.е. определяет, какие элементы куда нужно переместить.
	 * Если содержимое newItems отличается от содержимого массива, массив сломается.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {Array} newItems `<T>` Новое содержимое массива.
	 * @param {Function} [getKey] Функция, возвращающая уникальный ключ элемента в коллекции. По умолчанию
	 * равна JW.iid. Если коллекция содержит экземпляры JW.Class, то все тип-топ.
	 * @param {Object} [scope] Контекст вызова getKey. По умолчанию, функция вызывается в контексте коллекции.
	 * @returns {Array}
	 * `<number>` Параметр indexArray метода {@link #static-method-reorder}.
	 * Если вызова метода не требуется - undefined.
	 */
	/**
	 * @method detectSort
	 * `<T>` Определяет параметр метода {@link #static-method-reorder}, с которым содержимое массива отсортируется по результату вызова
	 * функции f на всех элементах.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {Function} [f]
	 *
	 * `f(item: T, index: number): number/string`
	 *
	 * Функция-сортировщик для элемента. По умолчанию возвращает item.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {Array}
	 * `<number>` Параметр indexArray метода {@link #static-method-reorder}.
	 * Если вызова метода не требуется - undefined.
	 */
	/**
	 * @method detectSortComparing
	 * `<T>` Определяет параметр метода {@link #static-method-reorder}, с которым содержимое массива отсортируется по компаратору.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {Function} [compare]
	 *
	 * `f(t1: T, t2: T, i1: number, i2: number): Number`
	 *
	 * Функция-компаратор. Возвращает положительное значение, если t1 > t2; отрицательное значение, если t1 < t2;
	 * 0, если t1 == t2. По умолчанию возвращает JW.cmp(t1, t2).
	 *
	 * @param {Object} [scope] Контекст вызова compare. По умолчанию compare вызывается в контексте коллекции.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {Array}
	 * `<number>` Параметр indexArray метода {@link #static-method-reorder}.
	 * Если вызова метода не требуется - undefined.
	 */
	/**
	 * @method performSplice
	 * `<T>` Преобразует содержимое массива к newItems комбинацией методов {@link #static-method-detectSplice} и {@link #static-method-splice}.
	 * Все элементы должны быть
	 * уникальны относительно функции getKey. Если элементы не уникальны, попробуйте метод {@link #static-method-performFilter}.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {Array} newItems `<T>` Новое содержимое массива.
	 * @param {Function} [getKey] Функция, возвращающая уникальный ключ элемента в коллекции. По умолчанию
	 * равна JW.iid. Если коллекция содержит экземпляры JW.Class, то все тип-топ.
	 * @param {Object} [scope] Контекст вызова getKey. По умолчанию, функция вызывается в контексте коллекции.
	 * @returns {void}
	 */
	/**
	 * @method performFilter
	 * `<T>` Преобразует содержимое массива к newItems комбинацией методов {@link #static-method-detectFilter} и {@link #static-method-splice}.
	 * Только удаляет элементы. Не предусматривает вставку новых элементов. В отличие от
	 * метода {@link #static-method-performSplice}, не требует уникальности элементов массива.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {Array} newItems `<T>` Новое содержимое массива.
	 * @returns {void}
	 */
	/**
	 * @method performReorder
	 * `<T>` Преобразует содержимое массива к newItems комбинацией методов {@link #static-method-detectReorder} и {@link #static-method-reorder}.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {Array} newItems `<T>` Новое содержимое массива.
	 * @param {Function} [getKey] Функция, возвращающая уникальный ключ элемента в коллекции. По умолчанию
	 * равна JW.iid. Если коллекция содержит экземпляры JW.Class, то все тип-топ.
	 * @param {Object} [scope] Контекст вызова getKey. По умолчанию, функция вызывается в контексте коллекции.
	 * @returns {void}
	 */
	/**
	 * @method sort
	 * `<T>` Сортирует массив по результату запуска функции f на элементах.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {Function} [f]
	 *
	 * `f(item: T, index: number): number/string`
	 *
	 * Функция-сортировщик для элемента. По умолчанию возвращает item.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {void}
	 */
	/**
	 * @method sortComparing
	 * `<T>` Сортирует массив по компаратору.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {Function} [compare]
	 *
	 * `f(t1: T, t2: T, i1: number, i2: number): Number`
	 *
	 * Функция-компаратор. Возвращает положительное значение, если t1 > t2; отрицательное значение, если t1 < t2;
	 * 0, если t1 == t2. По умолчанию возвращает JW.cmp(t1, t2).
	 *
	 * @param {Object} [scope] Контекст вызова compare. По умолчанию compare вызывается в контексте коллекции.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {void}
	 */
	/**
	 * @method createMapper
	 * `<T, U>` Конструирует конвертер элементов коллекции.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.AbstractArray.Mapper}
	 * `<T, U>` Синхронизатор.
	 */
	/**
	 * @method createObserver
	 * `<T>` Конструирует наблюдатель коллекции.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.AbstractArray.Observer}
	 * `<T>` Синхронизатор.
	 */
	/**
	 * @method createOrderer
	 * `<T>` Конструирует конвертер коллекции в массив (упорядочитель).
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.AbstractArray.Orderer}
	 * `<T>` Синхронизатор.
	 */
	/**
	 * @method createSorterComparing
	 * `<T>` Конструирует конвертер коллекции в массив (сортировщик по компаратору).
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.AbstractArray.SorterComparing}
	 * `<T>` Синхронизатор.
	 */
	/**
	 * @method createIndexer
	 * `<T>` Конструирует индексатор коллекции.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.AbstractArray.Indexer}
	 * `<T>` Синхронизатор.
	 */
	/**
	 * @method createLister
	 * `<T>` Конструирует конвертер коллекции в множество.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.AbstractArray.Lister}
	 * `<T>` Синхронизатор.
	 */
	/**
	 * @method createInserter
	 * `<T>` Конструирует синхронизатор представления с массивом.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.AbstractArray.Inserter}
	 * `<T>` Синхронизатор.
	 */
	/**
	 * @method equal
	 * `<T>` Поэлементно сравнивает два массива.
	 * @static
	 * @param {Array} array1 `<T>` Массив.
	 * @param {Array} array2 `<T>` Другой массив.
	 * @returns {boolean} Массивы поэлементно равны.
	 */
	/**
	 * @method collapse
	 * `<T>` Сплющивает массив массивов массивов... в один массив.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {number} depth Глубина сплющивания.
	 * @returns {Array} Сплющенный массив.
	 */
	/**
	 * @method indexOf
	 * `<T>` Определяет индекс элемента в данной коллекции. Если такого элемента в коллекции нет, вернет -1.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {T} item Элемент.
	 * @returns {number} Индекс элемента.
	 */
	/**
	 * @method backEvery
	 *
	 * `<T>` Проверяет все элементы по критерию в обратном порядке.
	 * 
	 * Возвращает true тогда и только тогда, когда функция f возвращает !== false на всех элементах коллекции.
	 * 
	 * Алгоритм перебирает все элементы с конца в начало, и останавливается после первого элемента, не удовлетворяющего
	 * критерию.
	 *
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {Function} f
	 *
	 * `f(item: T, index: number): boolean`
	 *
	 * Критерий проверки элементов.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {boolean} Результат проверки.
	 */
	/**
	 * @method pop
	 * `<T>` Удаляет последний элемент массива. Ничего не делает, если массив пуст.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @returns {T} Удаленный элемент или undefined.
	 */
	/**
	 * @method binarySearch
	 * Ищет индекс первого элемента, который больше указанного значения относительно функции compare,
	 * используя бинарный поиск. Массив должен быть отсортирован по функции compare.
	 * @param {T} value Значение.
	 * @param {Function} [compare]
	 *
	 * `f(t1: T, t2: T): number`
	 *
	 * Функция-компаратор. Возвращает положительное значение, если t1 > t2; отрицательное значение, если t1 < t2;
	 * 0, если t1 == t2. По умолчанию возвращает JW.cmp(t1, t2).
	 *
	 * @param {Object} scope
	 * Контекст вызова compare. По умолчанию, вызывается в контексте массива.
	 * @returns {number} Индекс элемента.
	 */
});
