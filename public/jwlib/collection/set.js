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
	
	----
	
	This is an adapter of array that triggers events about modifications.
	Events are taken from ActionScript's CollectionEventKind (with small
	reasonable changes).
*/

/**
 * @class
 *
 * `<T> extends JW.AbstractSet<T>`
 *
 * Простое множество.
 *
 * @extends JW.AbstractSet
 *
 * @constructor
 * @param {Array} [items] `<T>` Изначальное содержимое множества. По умолчанию, создается пустое множество.
 * @param {boolean} [adapter] Создать множество как адаптер над items (тогда это должен быть Object, а не Array).
 * По умолчанию, равен false.
 */
JW.Set = function(json, adapter) {
	JW.Set._super.call(this, json, adapter);
};

JW.extend(JW.Set, JW.AbstractSet, {
	/**
	 * `<U>` Конструирует пустую коллекцию того же типа.
	 * @returns {JW.Set} `<U>` Коллекция.
	 */
	createEmpty: function() {
		return new JW.Set();
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
	 * @param {Object} set `<T>` Множество.
	 * @returns {number} Количество элементов в коллекции.
	 */
	/**
	 * @method isEmpty
	 * `<T>` Проверяет коллекцию на пустоту.
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @returns {boolean} Коллекция не содержит ни одного элемента.
	 */
	/**
	 * @method getFirst
	 * `<T>` Возвращает первый элемент коллекции. Если коллекция пуста, вернет undefined.
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @returns {T} Элемент.
	 */
	/**
	 * @method containsItem
	 * `<T>` Проверяет наличие элемента в коллекции.
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @param {T} item Элемент.
	 * @returns {boolean} Коллекция содержит указанный элемент.
	 */
	/**
	 * @method contains
	 * `<T>` Проверяет наличие элемента в коллекции. Сокращение {@link #static-method-containsItem}.
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @param {T} item Элемент.
	 * @returns {boolean} Коллекция содержит указанный элемент.
	 */
	/**
	 * @method removeItem
	 * `<T>` Удаляет первое вхождение указанного элемента из коллекции.
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @param {T} item Элемент.
	 * @returns {void}
	 */
	/**
	 * @method removeItems
	 * `<T>` Удаляет все вхождения указанных элементов из коллекции.
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @param {Array} items `<T>` Элементы.
	 * @returns {void}
	 */
	/**
	 * @method tryClear
	 * `<T>` Очищает коллекцию.
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @returns {Array} `<T>` Бывшее содержимое коллекции. Если нет изменений - undefined.
	 */
	/**
	 * @method clear
	 * `<T>` Очищает коллекцию.
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @returns {Array} `<T>` Бывшее содержимое коллекции.
	 */
	/**
	 * @method $clear
	 * `<T>` Очищает коллекцию.
	 * @static
	 * @param {Object} set `<T>` Множество.
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
	 * @param {Object} set `<T>` Множество.
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
	 * @method everyBy
	 *
	 * `<T>` Проверяет все элементы по критерию.
	 * 
	 * Возвращает true тогда и только тогда, когда поле field всех элементов коллекции строго равно (===) значению
	 * value. Поле элемента извлекается с помощью функции JW.get.
	 * 
	 * Алгоритм последовательно перебирает все элементы, и останавливается после первого элемента, не удовлетворяющего
	 * критерию.
	 *
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @param {string/Array} field Поле элемента.
	 * @param {Mixed} value Значение.
	 * @returns {boolean} Результат проверки.
	 */
	/**
	 * @method everyByMethod
	 *
	 * `<T>` Проверяет все элементы по критерию.
	 * 
	 * Возвращает true тогда и только тогда, когда метод method с аргументами args возвращает !== false для всех
	 * элементов коллекции.
	 * 
	 * Алгоритм последовательно перебирает все элементы, и останавливается после первого элемента, не удовлетворяющего
	 * критерию.
	 *
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @param {string} method Имя метода элемента.
	 * @param {Array} [args] Аргументы.
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
	 * @param {Object} set `<T>` Множество.
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
	 * @method someBy
	 *
	 * `<T>` Проверяет каждый элемент по критерию.
	 * 
	 * Возвращает true тогда и только тогда, когда поле field хотя бы одного элемента коллекции строго равно (===)
	 * значению value. Поле элемента извлекается с помощью функции JW.get.
	 * 
	 * Алгоритм последовательно перебирает все элементы, и останавливается после первого элемента, удовлетворяющего
	 * критерию.
	 *
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @param {string/Array} field Поле элемента.
	 * @param {Mixed} value Значение.
	 * @returns {boolean} Результат проверки.
	 */
	/**
	 * @method someByMethod
	 *
	 * `<T>` Проверяет каждый элемент по критерию.
	 * 
	 * Возвращает true тогда и только тогда, когда метод method с аргументами args возвращает !== false хотя бы у
	 * одного элемента коллекции.
	 * 
	 * Алгоритм последовательно перебирает все элементы, и останавливается после первого элемента, удовлетворяющего
	 * критерию.
	 *
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @param {string} method Имя метода элемента.
	 * @param {Array} [args] Аргументы.
	 * @returns {boolean} Результат проверки.
	 */
	/**
	 * @method each
	 * `<T>` Перебирает элементы коллекции. Запускает указанную функцию на всех элементах.
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @param {Function} f
	 *
	 * `f(item: T): void`
	 *
	 * Функция.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {void}
	 */
	/**
	 * @method eachByMethod
	 * `<T>` Перебирает элементы коллекции. Запускает указанный метод у всех элементов.
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @param {string} method Имя метода элемента.
	 * @param {Array} [args] Аргументы.
	 * @returns {void}
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
	 * @param {Object} set `<T>` Множество.
	 * @param {Function} f
	 *
	 * `f(item: T): boolean`
	 *
	 * Критерий проверки элементов.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {T} Найденный элемент или undefined.
	 */
	/**
	 * @method searchBy
	 *
	 * `<T>` Ищет элемент по критерию.
	 * 
	 * Возвращает первый элемент, поле field которого строго равно (===) значению value.
	 * Поле элемента извлекается с помощью функции JW.get.
	 * 
	 * Алгоритм последовательно перебирает все элементы, и останавливается после первого элемента, удовлетворяющего
	 * критерию.
	 *
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @param {string/Array} field Поле элемента.
	 * @param {Mixed} value Значение.
	 * @returns {T} Найденный элемент или undefined.
	 */
	/**
	 * @method searchByMethod
	 *
	 * `<T>` Ищет элемент по критерию.
	 * 
	 * Возвращает первый элемент, указанный метод которого с аргументами args возвращает !== false.
	 * 
	 * Алгоритм последовательно перебирает все элементы, и останавливается после первого элемента, удовлетворяющего
	 * критерию.
	 *
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @param {string} method Имя метода элемента.
	 * @param {Array} [args] Аргументы.
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
	 * @param {Object} set `<T>` Множество.
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
	/**
	 * @method $toSorted
	 *
	 * `<T>` Преобразует коллекцию в отсортированный массив.
	 *
	 * Строит массив из элементов коллекции, отсортированный по результату запуска функции f на каждом элементе.
	 *
	 * @static
	 * @param {Object} set `<T>` Множество.
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
	/**
	 * @method toSortedBy
	 *
	 * `<T>` Преобразует коллекцию в отсортированный массив.
	 *
	 * Строит массив из элементов коллекции, отсортированный по указанному полю каждого элемента.
	 * Поле элемента извлекается с помощью функции JW.get.
	 *
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @param {string/Array} field Поле элемента.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {Array} `<T>` Отсортированный массив.
	 */
	/**
	 * @method $toSortedBy
	 *
	 * `<T>` Преобразует коллекцию в отсортированный массив.
	 *
	 * Строит массив из элементов коллекции, отсортированный по указанному полю каждого элемента.
	 * Поле элемента извлекается с помощью функции JW.get.
	 *
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @param {string/Array} field Поле элемента.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {JW.Array} `<T>` Отсортированный массив.
	 */
	/**
	 * @method toSortedByMethod
	 *
	 * `<T>` Преобразует коллекцию в отсортированный массив.
	 *
	 * Строит массив из элементов коллекции, отсортированный по результату запуска указанного метода у каждого
	 * элемента.
	 *
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @param {string} method Имя метода элемента.
	 * @param {Array} [args] Аргументы.
	 * @returns {Array} `<T>` Отсортированный массив.
	 */
	/**
	 * @method $toSortedByMethod
	 *
	 * `<T>` Преобразует коллекцию в отсортированный массив.
	 *
	 * Строит массив из элементов коллекции, отсортированный по результату запуска указанного метода у каждого
	 * элемента.
	 *
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @param {string} method Имя метода элемента.
	 * @param {Array} [args] Аргументы.
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
	 * @param {Object} set `<T>` Множество.
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
	/**
	 * @method $toSortedComparing
	 *
	 * `<T>` Преобразует коллекцию в отсортированный массив.
	 *
	 * Строит массив из элементов коллекции, отсортированный по компаратору.
	 *
	 * @static
	 * @param {Object} set `<T>` Множество.
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
	/**
	 * @method index
	 *
	 * `<T>` Индексирует коллекцию.
	 *
	 * Строит словарь, в ключах которого находятся результаты запуска функции f на всех элементах,
	 * а в значениях - соответствующие элементы.
	 *
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @param {Function} f
	 *
	 * `f(item: T): string`
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
	 * @param {Object} set `<T>` Множество.
	 * @param {Function} f
	 *
	 * `f(item: T): string`
	 *
	 * Функция-индексатор для элемента.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {JW.Map} `<T>` Индекс коллекции.
	 */
	/**
	 * @method indexBy
	 *
	 * `<T>` Индексирует коллекцию.
	 *
	 * Строит словарь, в ключах которого находятся значения указанного поля элементов,
	 * а в значениях - соответствующие элементы. Поле элемента извлекается с помощью функции JW.get.
	 *
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @param {string/Array} field Поле элемента.
	 * @returns {Object} Индекс коллекции.
	 */
	/**
	 * @method $indexBy
	 *
	 * `<T>` Индексирует коллекцию.
	 *
	 * Строит словарь, в ключах которого находятся значения указанного поля элементов,
	 * а в значениях - соответствующие элементы. Поле элемента извлекается с помощью функции JW.get.
	 *
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @param {string/Array} field Поле элемента.
	 * @returns {JW.Map} `<T>` Индекс коллекции.
	 */
	/**
	 * @method indexByMethod
	 *
	 * `<T>` Индексирует коллекцию.
	 *
	 * Строит словарь, в ключах которого находятся результаты запуска указанного метода у элементов,
	 * а в значениях - соответствующие элементы.
	 *
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @param {string} method Имя метода элемента.
	 * @param {Array} [args] Аргументы.
	 * @returns {Object} Индекс коллекции.
	 */
	/**
	 * @method $indexByMethod
	 *
	 * `<T>` Индексирует коллекцию.
	 *
	 * Строит словарь, в ключах которого находятся результаты запуска указанного метода у элементов,
	 * а в значениях - соответствующие элементы.
	 *
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @param {string} method Имя метода элемента.
	 * @param {Array} [args] Аргументы.
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
	 * @param {Object} set `<T>` Множество.
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
	 * @param {Object} set `<T>` Множество.
	 * @returns {JW.Array} `<T>` Массив элементов.
	 */
	/**
	 * @method toSet
	 *
	 * `<T>` Преобразует коллекцию в множество.
	 *
	 * Строит новое множество, включающее все элементы коллекции.
	 *
	 * @static
	 * @param {Object} set `<T>` Множество.
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
	 * @param {Object} set `<T>` Множество.
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
	 * @param {Object} set `<T>` Множество.
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
	 * @param {Object} set `<T>` Множество.
	 * @returns {JW.Array} `<T>` Массив элементов.
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
	 * @param {Object} set `<T>` Множество.
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
	 * @param {Object} set `<T>` Множество.
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
	 * @param {Object} set `<T>` Множество.
	 * @param {Function} f
	 *
	 * `f(item: T): boolean`
	 *
	 * Фильтрующая функция.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {Object} Отфильтрованная коллекция.
	 */
	/**
	 * @method $filter
	 *
	 * `<T>` Фильтрует коллекцию по критерию.
	 *
	 * Строит новую коллекцию того же типа, включающую только те элементы, функция f на которых вернула !== false.
	 *
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @param {Function} f
	 *
	 * `f(item: T): boolean`
	 *
	 * Фильтрующая функция.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {JW.Set} `<T>` Отфильтрованная коллекция.
	 */
	/**
	 * @method filterBy
	 *
	 * `<T>` Фильтрует коллекцию по критерию.
	 * 
	 * Строит новую коллекцию того же типа, включающую только те элементы, поле field которых строго равно (===)
	 * значению value. Поле элемента извлекается с помощью функции JW.get.
	 * 
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @param {string/Array} field Поле элемента.
	 * @param {Mixed} value Значение.
	 * @returns {Object} Отфильтрованная коллекция.
	 */
	/**
	 * @method $filterBy
	 *
	 * `<T>` Фильтрует коллекцию по критерию.
	 * 
	 * Строит новую коллекцию того же типа, включающую только те элементы, поле field которых строго равно (===)
	 * значению value. Поле элемента извлекается с помощью функции JW.get.
	 * 
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @param {string/Array} field Поле элемента.
	 * @param {Mixed} value Значение.
	 * @returns {JW.Set} `<T>` Отфильтрованная коллекция.
	 */
	/**
	 * @method filterByMethod
	 *
	 * `<T>` Фильтрует коллекцию по критерию.
	 * 
	 * Строит новую коллекцию того же типа, включающую только те элементы, метод method которых с аргументами args
	 * возвращает !== false для всех элементов коллекции.
	 * 
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @param {string} method Имя метода элемента.
	 * @param {Array} [args] Аргументы.
	 * @returns {Object} Отфильтрованная коллекция.
	 */
	/**
	 * @method $filterByMethod
	 *
	 * `<T>` Фильтрует коллекцию по критерию.
	 * 
	 * Строит новую коллекцию того же типа, включающую только те элементы, метод method которых с аргументами args
	 * возвращает !== false для всех элементов коллекции.
	 * 
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @param {string} method Имя метода элемента.
	 * @param {Array} [args] Аргументы.
	 * @returns {JW.Set} `<T>` Отфильтрованная коллекция.
	 */
	/**
	 * @method map
	 *
	 * `<T, U>` Отображает элементы коллекции.
	 * 
	 * Строит новую коллекцию того же типа, состояющую из результатов запуска функции f на каждом элементе коллекции.
	 *
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @param {Function} f
	 *
	 * `f(item: T): U`
	 *
	 * Отображающая функция.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {Object} Отображенная коллекция.
	 */
	/**
	 * @method $map
	 *
	 * `<T, U>` Отображает элементы коллекции.
	 * 
	 * Строит новую коллекцию того же типа, состояющую из результатов запуска функции f на каждом элементе коллекции.
	 *
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @param {Function} f
	 *
	 * `f(item: T): U`
	 *
	 * Отображающая функция.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {JW.Set} `<U>` Отображенная коллекция.
	 */
	/**
	 * @method mapBy
	 *
	 * `<T, U>` Отображает элементы коллекции.
	 * 
	 * Строит новую коллекцию того же типа, состояющую из значений поля field всех элементов коллекции. Поле элемента
	 * извлекается с помощью функции JW.get.
	 * 
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @param {string/Array} field Поле элемента.
	 * @param {Mixed} value Значение.
	 * @returns {Object} Отображенная коллекция.
	 */
	/**
	 * @method $mapBy
	 *
	 * `<T, U>` Отображает элементы коллекции.
	 * 
	 * Строит новую коллекцию того же типа, состояющую из значений поля field всех элементов коллекции. Поле элемента
	 * извлекается с помощью функции JW.get.
	 * 
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @param {string/Array} field Поле элемента.
	 * @param {Mixed} value Значение.
	 * @returns {JW.Set} `<U>` Отображенная коллекция.
	 */
	/**
	 * @method mapByMethod
	 *
	 * `<T, U>` Отображает элементы коллекции.
	 * 
	 * Строит новую коллекцию того же типа, состояющую из результатов запуска метода method с аргументами args
	 * у всех элементов коллекции.
	 * 
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @param {string} method Имя метода элемента.
	 * @param {Array} [args] Аргументы.
	 * @returns {Object} Отображенная коллекция.
	 */
	/**
	 * @method $mapByMethod
	 *
	 * `<T, U>` Отображает элементы коллекции.
	 * 
	 * Строит новую коллекцию того же типа, состояющую из результатов запуска метода method с аргументами args
	 * у всех элементов коллекции.
	 * 
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @param {string} method Имя метода элемента.
	 * @param {Array} [args] Аргументы.
	 * @returns {JW.Set} `<U>` Отображенная коллекция.
	 */
	/**
	 * @method add
	 * `<T>` Добавляет элемент в множество, если его еще нет.
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @param {T} item Элемент.
	 * @returns {boolean} Элемент добавлен.
	 */
	/**
	 * @method tryAdd
	 * `<T>` Добавляет элемент в множество, если его еще нет.
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @param {T} item Элемент.
	 * @returns {boolean} Элемент добавлен. Если нет изменений - undefined.
	 */
	/**
	 * @method addAll
	 * `<T>` Добавляет набор элементов в множество, если их еще нет.
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @param {Array} items `<T>` Элементы.
	 * @returns {Array} `<T>` Добавленные элементы.
	 */
	/**
	 * @method $addAll
	 * `<T>` Добавляет набор элементов в множество, если их еще нет.
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @param {Array} items `<T>` Элементы.
	 * @returns {JW.Array} `<T>` Добавленные элементы.
	 */
	/**
	 * @method tryAddAll
	 * `<T>` Добавляет набор элементов в множество, если их еще нет.
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @param {Array} items `<T>` Элементы.
	 * @returns {Array} `<T>` Добавленные элементы. Если нет изменений - undefined.
	 */
	/**
	 * @method remove
	 * `<T>` Удаляет элемент из множества, если он там есть.
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @param {T} item Элемент.
	 * @returns {boolean} Элемент удален.
	 */
	/**
	 * @method tryRemove
	 * `<T>` Удаляет элемент из множества, если он там есть.
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @param {T} item Элемент.
	 * @returns {boolean} Элемент удален. Если нет изменений - undefined.
	 */
	/**
	 * @method removeAll
	 * `<T>` Удаляет набор элементов из множества, если они там есть.
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @param {Array} items `<T>` Элементы.
	 * @returns {Array} `<T>` Удаленные элементы.
	 */
	/**
	 * @method $removeAll
	 * `<T>` Удаляет набор элементов из множества, если они там есть.
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @param {Array} items `<T>` Элементы.
	 * @returns {JW.Array} `<T>` Удаленные элементы.
	 */
	/**
	 * @method tryRemoveAll
	 * `<T>` Удаляет набор элементов из множества, если они там есть.
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @param {Array} items `<T>` Элементы.
	 * @returns {Array} `<T>` Удаленные элементы. Если нет изменений - undefined.
	 */
	/**
	 * @method splice
	 * `<T>` Добавляет и удаляет элементы коллекции. Универсальная оптимизированная атомарная операция удаления/вставки.
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @param {Array} removedItems `<T>` Список элементов для удаления.
	 * @param {Array} addedItems `<T>` Список элементов для добавления.
	 * @returns {JW.AbstractSet.SpliceResult} `<T>` Результат.
	 */
	/**
	 * @method trySplice
	 * `<T>` Добавляет и удаляет элементы коллекции. Универсальная оптимизированная атомарная операция удаления/вставки.
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @param {Array} removedItems `<T>` Список элементов для удаления.
	 * @param {Array} addedItems `<T>` Список элементов для добавления.
	 * @returns {JW.AbstractSet.SpliceResult} `<T>` Результат. Если нет изменений - undefined.
	 */
	/**
	 * @method detectSplice
	 * `<T>` Определяет параметры метода {@link #static-method-splice}, с которыми содержимое множества станет равно newItems.
	 * Т.е. определяет, какие элементы нужно удалить, какие добавить.
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @param {Array} newItems `<T>` Новое содержимое множества.
	 * @returns {JW.AbstractSet.SpliceParams} `<T>` Параметры метода {@link #static-method-splice}.
	 */
	/**
	 * @method performSplice
	 * `<T>` Преобразует содержимое множества к newItems комбинацией методов {@link #static-method-detectSplice} и {@link #static-method-splice}.
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @param {Array} newItems `<T>` Новое содержимое множества.
	 * @returns {void}
	 */
	/**
	 * @method createMapper
	 * `<T, U>` Конструирует конвертер элементов коллекции.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.AbstractSet.Mapper}
	 * `<T, U>` Синхронизатор.
	 */
	/**
	 * @method createObserver
	 * `<T>` Конструирует наблюдатель коллекции.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.AbstractSet.Observer}
	 * `<T>` Синхронизатор.
	 */
	/**
	 * @method createOrderer
	 * `<T>` Конструирует конвертер коллекции в массив (упорядочитель).
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.AbstractSet.Orderer}
	 * `<T>` Синхронизатор.
	 */
	/**
	 * @method createSorterComparing
	 * `<T>` Конструирует конвертер коллекции в массив (сортировщик по компаратору).
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.AbstractSet.SorterComparing}
	 * `<T>` Синхронизатор.
	 */
	/**
	 * @method createIndexer
	 * `<T>` Конструирует индексатор коллекции.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.AbstractSet.Indexer}
	 * `<T>` Синхронизатор.
	 */
	/**
	 * @method createLister
	 * `<T>` Конструирует конвертер коллекции в множество.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.AbstractSet.Lister}
	 * `<T>` Синхронизатор.
	 */
	/**
	 * @method equal
	 * `<T>` Поэлементно сравнивает множество с массивом.
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @param {Array} array `<T>` Массив.
	 * @returns {boolean} Множество равно массиву.
	 */
});
