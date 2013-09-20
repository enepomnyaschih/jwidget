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
 * Простой словарь. Структурированный список методов смотрите в JW.AbstractMap.
 * Статические методы повторяют интерфейс JW.AbstractMap, только принимают нативный Object в качестве
 * первого аргумента.
 *
 * @extends JW.AbstractMap
 *
 * @constructor
 * @param {Object} [items] Изначальное содержимое словаря. По умолчанию, создается пустой словарь.
 * @param {boolean} [adapter] Создать словарь как адаптер над items. По умолчанию, равен false, т.е. создается
 * копия словаря items.
 */
JW.Map = function(json, adapter) {
	JW.Map._super.call(this, json, adapter);
};

JW.extend(JW.Map, JW.AbstractMap, {
	/**
	 * `<U>` Конструирует пустую коллекцию того же типа.
	 * @returns {JW.Map} `<U>` Коллекция.
	 */
	createEmpty: function() {
		return new JW.Map();
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
	 * @param {Object} map `<T>` Словарь.
	 * @returns {number} Количество элементов в коллекции.
	 */
	/**
	 * @method isEmpty
	 * `<T>` Проверяет коллекцию на пустоту.
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @returns {boolean} Коллекция не содержит ни одного элемента.
	 */
	/**
	 * @method getFirst
	 * `<T>` Возвращает первый элемент коллекции. Если коллекция пуста, вернет undefined.
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @returns {T} Элемент.
	 */
	/**
	 * @method getFirstKey
	 * `<T>` Возвращает ключ первого элемента коллекции. Если коллекция пуста, вернет undefined.
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @returns {string} Ключ.
	 */
	/**
	 * @method get
	 * `<T>` Возвращает элемент по ключу. В случае, если элемента с таким ключом нет, вернет undefined.
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @param {string} key Ключ.
	 * @returns {T} Элемент.
	 */
	/**
	 * @method getKeys
	 * `<T>` Возвращает массив ключей всех элементов коллекции.
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @returns {Array} `<string>` Массив ключей.
	 */
	/**
	 * @method $getKeys
	 * `<T>` Возвращает массив ключей всех элементов коллекции.
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @returns {JW.Array} `<string>` Массив ключей.
	 */
	/**
	 * @method containsKey
	 * `<T>` Проверяет наличие элемента с заданным ключом в коллекции.
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @param {string} key Ключ.
	 * @returns {boolean} Коллекция содержит элемент с указанным ключом.
	 */
	/**
	 * @method containsItem
	 * `<T>` Проверяет наличие элемента в коллекции.
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @param {T} item Элемент.
	 * @returns {boolean} Коллекция содержит указанный элемент.
	 */
	/**
	 * @method keyOf
	 * `<T>` Определяет ключ элемента в данной коллекции. Если такого элемента в коллекции нет, вернет undefined.
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @param {T} item Элемент.
	 * @returns {string} Ключ элемента.
	 */
	/**
	 * @method removeItem
	 * `<T>` Удаляет первое вхождение указанного элемента из коллекции.
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @param {T} item Элемент.
	 * @returns {void}
	 */
	/**
	 * @method removeItems
	 * `<T extends JW.Class>` Удаляет все вхождения указанных элементов из коллекции.
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @param {Array} items `<T>` Элементы.
	 * @returns {void}
	 */
	/**
	 * @method tryClear
	 * `<T>` Очищает коллекцию.
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @returns {Object} Бывшее содержимое коллекции. Если нет изменений - undefined.
	 */
	/**
	 * @method clear
	 * `<T>` Очищает коллекцию.
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @returns {Object} Бывшее содержимое коллекции.
	 */
	/**
	 * @method $clear
	 * `<T>` Очищает коллекцию.
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @returns {JW.Map} `<T>` Бывшее содержимое коллекции.
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
	 * @param {Object} map `<T>` Словарь.
	 * @param {Function} f
	 *
	 * `f(item: T, key: string): boolean`
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
	 * @param {Object} map `<T>` Словарь.
	 * @param {Function} f
	 *
	 * `f(item: T, key: string): boolean`
	 *
	 * Критерий проверки элементов.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {boolean} Результат проверки.
	 */
	/**
	 * @method each
	 *
	 * `<T>` Перебирает элементы коллекции. Запускает указанную функцию на всех элементах.
	 *
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @param {Function} f
	 *
	 * `f(item: T, key: string): void`
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
	 * Возвращает ключ первого элемента, функция f на котором возвращает !== false.
	 * 
	 * Алгоритм последовательно перебирает все элементы, и останавливается после первого элемента, удовлетворяющего
	 * критерию.
	 *
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @param {Function} f
	 *
	 * `f(item: T, key: string): boolean`
	 *
	 * Критерий проверки элементов.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {string} Ключ найденного элемента или undefined.
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
	 * @param {Object} map `<T>` Словарь.
	 * @param {Function} f
	 *
	 * `f(item: T, key: string): boolean`
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
	 * @param {Object} map `<T>` Словарь.
	 * @param {Function} [f]
	 *
	 * `f(item: T, key: string): number/string`
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
	 * @param {Object} map `<T>` Словарь.
	 * @param {Function} [f]
	 *
	 * `f(item: T, key: string): number/string`
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
	 * @param {Object} map `<T>` Словарь.
	 * @param {Function} [compare]
	 *
	 * `f(t1: T, t2: T, k1: string, k2: string): Number`
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
	 * @param {Object} map `<T>` Словарь.
	 * @param {Function} [compare]
	 *
	 * `f(t1: T, t2: T, k1: string, k2: string): Number`
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
	 * `<T>` Возвращает массив ключей отсортированных элементов.
	 *
	 * Строит массив из ключей элементов коллекции, отсортированный по результату запуска функции f на каждом элементе.
	 *
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @param {Function} [f]
	 *
	 * `f(item: T, key: string): number/string`
	 *
	 * Функция-сортировщик для элемента. По умолчанию возвращает item.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {Array} `<string>` Массив ключей отсортированных элементов.
	 */
	/**
	 * @method $getSortingKeys
	 *
	 * `<T>` Возвращает массив ключей отсортированных элементов.
	 *
	 * Строит массив из ключей элементов коллекции, отсортированный по результату запуска функции f на каждом элементе.
	 *
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @param {Function} [f]
	 *
	 * `f(item: T, key: string): number/string`
	 *
	 * Функция-сортировщик для элемента. По умолчанию возвращает item.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {JW.Array} `<string>` Массив ключей отсортированных элементов.
	 */
	/**
	 * @method getSortingKeysComparing
	 *
	 * `<T>` Возвращает массив ключей отсортированных элементов.
	 *
	 * Строит массив из ключей элементов коллекции, отсортированный по компаратору.
	 *
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @param {Function} [compare]
	 *
	 * `f(t1: T, t2: T, k1: string, k2: string): Number`
	 *
	 * Функция-компаратор. Возвращает положительное значение, если t1 > t2; отрицательное значение, если t1 < t2;
	 * 0, если t1 == t2. По умолчанию возвращает JW.cmp(t1, t2).
	 *
	 * @param {Object} [scope] Контекст вызова compare. По умолчанию compare вызывается в контексте коллекции.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {Array} `<string>` Массив ключей отсортированных элементов.
	 */
	/**
	 * @method $getSortingKeysComparing
	 *
	 * `<T>` Возвращает массив ключей отсортированных элементов.
	 *
	 * Строит массив из ключей элементов коллекции, отсортированный по компаратору.
	 *
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @param {Function} [compare]
	 *
	 * `f(t1: T, t2: T, k1: string, k2: string): Number`
	 *
	 * Функция-компаратор. Возвращает положительное значение, если t1 > t2; отрицательное значение, если t1 < t2;
	 * 0, если t1 == t2. По умолчанию возвращает JW.cmp(t1, t2).
	 *
	 * @param {Object} [scope] Контекст вызова compare. По умолчанию compare вызывается в контексте коллекции.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {JW.Array} `<string>` Массив ключей отсортированных элементов.
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
	 * @param {Object} map `<T>` Словарь.
	 * @param {Function} f
	 *
	 * `f(item: T, key: string): string`
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
	 * @param {Object} map `<T>` Словарь.
	 * @param {Function} f
	 *
	 * `f(item: T, key: string): string`
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
	 * @param {Object} map `<T>` Словарь.
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
	 * @param {Object} map `<T>` Словарь.
	 * @returns {JW.Array} `<T>` Массив элементов.
	 */
	/**
	 * @method toMap
	 *
	 * `<T>` Преобразует коллекцию в словарь.
	 *
	 * Строит новый словарь, включающий все элементы коллекции с их ключами в данной коллекции.
	 *
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @returns {Object} Словарь элементов.
	 */
	/**
	 * @method $toMap
	 *
	 * `<T>` Преобразует коллекцию в словарь.
	 *
	 * Строит новый словарь, включающий все элементы коллекции с их ключами в данной коллекции.
	 *
	 * @static
	 * @param {Object} map `<T>` Словарь.
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
	 * @param {Object} map `<T>` Словарь.
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
	 * @param {Object} map `<T>` Словарь.
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
	 * @param {Object} map `<T>` Словарь.
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
	 * @param {Object} map `<T>` Словарь.
	 * @returns {JW.Array} `<T>` Массив элементов.
	 */
	/**
	 * @method asMap
	 *
	 * `<T>` Представляет коллекцию в виде словаря.
	 *
	 * Если данная коллекция - словарь, сразу возвращает его. В противном случае запускает метод {@link #static-method-toMap}.
	 * Данная функция работает как правило быстрее {@link #static-method-toMap}, но сначала убедитесь, что возвращенный массив
	 * никто не меняет, иначе могут возникнуть странные непредвиденные баги.
	 *
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @returns {Object} Словарь элементов.
	 */
	/**
	 * @method $asMap
	 *
	 * `<T>` Представляет коллекцию в виде словаря.
	 *
	 * Если данная коллекция - словарь, сразу возвращает его. В противном случае запускает метод {@link #static-method-toMap}.
	 * Данная функция работает как правило быстрее {@link #static-method-toMap}, но сначала убедитесь, что возвращенный массив
	 * никто не меняет, иначе могут возникнуть странные непредвиденные баги.
	 *
	 * @static
	 * @param {Object} map `<T>` Словарь.
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
	 * @param {Object} map `<T>` Словарь.
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
	 * @param {Object} map `<T>` Словарь.
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
	 * @param {Object} map `<T>` Словарь.
	 * @param {Function} f
	 *
	 * `f(item: T, key: string): boolean`
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
	 * @param {Object} map `<T>` Словарь.
	 * @param {Function} f
	 *
	 * `f(item: T, key: string): boolean`
	 *
	 * Фильтрующая функция.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {JW.Map} `<T>` Отфильтрованная коллекция.
	 */
	/**
	 * @method map
	 *
	 * `<T, U>` Отображает элементы коллекции.
	 * 
	 * Строит новую коллекцию того же типа, состояющую из результатов запуска функции f на каждом элементе коллекции.
	 *
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @param {Function} f
	 *
	 * `f(item: T, key: string): U`
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
	 * @param {Object} map `<T>` Словарь.
	 * @param {Function} f
	 *
	 * `f(item: T, key: string): U`
	 *
	 * Отображающая функция.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {JW.Map} `<U>` Отображенная коллекция.
	 */
	/**
	 * @method set
	 * `<T>` Заменяет элемент по ключу. В случае если элемента с таким ключом нет, он будет добавлен.
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @param {T} item Элемент.
	 * @param {string} key Ключ.
	 * @returns {T} Бывший элемент коллекции.
	 */
	/**
	 * @method trySet
	 * `<T>` Заменяет элемент по ключу. В случае если элемента с таким ключом нет, он будет добавлен.
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @param {T} item Элемент.
	 * @param {string} key Ключ.
	 * @returns {JW.Proxy} `<T>` Обертка над бывшим элементом коллекции. Если нет изменений - undefined.
	 */
	/**
	 * @method setAll
	 * `<T>` Заменяет/добавляет набор элементов в словаре.
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @param {Object} items Элементы.
	 * @returns {JW.AbstractMap.SpliceResult} `<T>` Результат метода {@link #static-method-splice}.
	 */
	/**
	 * @method trySetAll
	 * `<T>` Заменяет/добавляет набор элементов в словаре.
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @param {Object} items Элементы.
	 * @returns {JW.AbstractMap.SpliceResult} `<T>` Результат метода {@link #static-method-splice}. Если нет изменений - undefined.
	 */
	/**
	 * @method setKey
	 * `<T>` Меняет ключ элемента в словаре. Если элемента с таким ключом нет, метод сломается.
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @param {string} oldKey Старый ключ элемента.
	 * @param {string} newKey Новый ключ элемента.
	 * @returns {T} Элемент.
	 */
	/**
	 * @method trySetKey
	 * `<T>` Меняет ключ элемента в словаре.
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @param {string} oldKey Старый ключ элемента.
	 * @param {string} newKey Новый ключ элемента.
	 * @returns {T} Элемент. Если нет изменений - undefined.
	 */
	/**
	 * @method remove
	 * `<T>` Удаляет элемент по ключу, если он существует в коллекции.
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @param {K} key Ключ.
	 * @returns {T} Бывший элемент коллекции или undefined.
	 */
	/**
	 * @method tryRemove
	 * `<T>` Удаляет элемент по ключу, если он существует в коллекции.
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @param {K} key Ключ.
	 * @returns {T} Бывший элемент коллекции. Если нет изменений - undefined.
	 */
	/**
	 * @method removeAll
	 * `<T>` Удаляет набор элементов из словаря.
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @param {Array} keys `<string>` Ключи элементов.
	 * @returns {Object} Удаленные элементы.
	 */
	/**
	 * @method $removeAll
	 * `<T>` Удаляет набор элементов из словаря.
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @param {Array} keys `<string>` Ключи элементов.
	 * @returns {JW.Map} `<T>` Удаленные элементы.
	 */
	/**
	 * @method tryRemoveAll
	 * `<T>` Удаляет набор элементов из словаря.
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @param {Array} keys `<string>` Ключи элементов.
	 * @returns {Object} Удаленные элементы. Если нет изменений - undefined.
	 */
	/**
	 * @method splice
	 * `<T>` Добавляет и удаляет элементы коллекции. Универсальная оптимизированная атомарная операция удаления/вставки.
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @param {Array} removedKeys `<string>` Ключи элементов для удаления.
	 * @param {Object} updatedItems Элементы для добавления/замены.
	 * @returns {JW.AbstractMap.SpliceResult} `<T>` Результат.
	 */
	/**
	 * @method trySplice
	 * `<T>` Добавляет и удаляет элементы коллекции. Универсальная оптимизированная атомарная операция удаления/вставки.
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @param {Array} removedKeys `<string>` Ключи элементов для удаления.
	 * @param {Object} updatedItems Элементы для добавления/замены.
	 * @returns {JW.AbstractMap.SpliceResult} `<T>` Результат. Если нет изменений - undefined.
	 */
	/**
	 * @method reindex
	 * `<T>` Меняет ключи элементов словаря.
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @param {Object} keyMap `<string>` Словарь ключей. Элемент с ключем k будет перемещен в ключ keyMap[k].
	 * Обязательно указывать только изменившиеся ключи.
	 * @returns {Object} Словарь изменившихся ключей.
	 */
	/**
	 * @method tryReindex
	 * `<T>` Меняет ключи элементов словаря.
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @param {Object} keyMap `<string>` Словарь ключей. Элемент с ключем k будет перемещен в ключ keyMap[k].
	 * Обязательно указывать только изменившиеся ключи.
	 * @returns {Object} Словарь изменившихся ключей. Если нет изменений - undefined.
	 */
	/**
	 * @method detectSplice
	 * `<T>` Определяет параметры метода {@link #static-method-splice}, с которыми содержимое словаря станет равно newItems.
	 * Т.е. определяет, какие элементы нужно удалить, какие добавить, и с каким ключом.
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @param {Object} newItems Новое содержимое словаря.
	 * @returns {JW.AbstractMap.SpliceParams}
	 * `<T>` Параметры метода {@link #static-method-splice}.
	 * Если вызова метода не требуется - undefined.
	 */
	/**
	 * @method detectReindex
	 * `<T>` Определяет параметр метода {@link #static-method-reindex}, с которым содержимое словаря станет равно newItems.
	 * Т.е. определяет, какие элементы куда нужно переместить.
	 * Если содержимое newItems отличается от содержимого словаря, словарь сломается.
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @param {Object} newItems Новое содержимое словаря.
	 * @param {Function} [getKey] Функция, возвращающая уникальный ключ элемента в коллекции. По умолчанию
	 * равна JW.iid. Если коллекция содержит экземпляры JW.Class, то все тип-топ.
	 * @param {Object} [scope] Контекст вызова getKey. По умолчанию, функция вызывается в контексте коллекции.
	 * @returns {Object}
	 * Параметр keyMap метода {@link #static-method-reindex}.
	 * Если вызова метода не требуется - undefined.
	 */
	/**
	 * @method performSplice
	 * `<T>` Преобразует содержимое словаря к newItems комбинацией методов {@link #static-method-detectSplice} и {@link #static-method-splice}.
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @param {Object} newItems Новое содержимое словаря.
	 * @returns {void}
	 */
	/**
	 * @method performReindex
	 * `<T>` Преобразует содержимое словаря к newItems комбинацией методов {@link #static-method-detectReindex} и {@link #static-method-reindex}.
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @param {Object} newItems Новое содержимое словаря.
	 * @param {Function} [getKey] Функция, возвращающая уникальный ключ элемента в коллекции. По умолчанию
	 * равна JW.iid. Если коллекция содержит экземпляры JW.Class, то все тип-топ.
	 * @param {Object} [scope] Контекст вызова getKey. По умолчанию, функция вызывается в контексте коллекции.
	 * @returns {void}
	 */
	/**
	 * @method createMapper
	 * `<T, U>` Конструирует конвертер элементов коллекции.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.AbstractMap.Mapper}
	 * `<T, U>` Синхронизатор.
	 */
	/**
	 * @method createObserver
	 * `<T>` Конструирует наблюдатель коллекции.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.AbstractMap.Observer}
	 * `<T>` Синхронизатор.
	 */
	/**
	 * @method createOrderer
	 * `<T>` Конструирует конвертер коллекции в массив (упорядочитель).
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.AbstractMap.Orderer}
	 * `<T>` Синхронизатор.
	 */
	/**
	 * @method createSorterComparing
	 * `<T>` Конструирует конвертер коллекции в массив (сортировщик по компаратору).
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.AbstractMap.SorterComparing}
	 * `<T>` Синхронизатор.
	 */
	/**
	 * @method createIndexer
	 * `<T>` Конструирует индексатор коллекции.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.AbstractMap.Indexer}
	 * `<T>` Синхронизатор.
	 */
	/**
	 * @method createLister
	 * `<T>` Конструирует конвертер коллекции в множество.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.AbstractMap.Lister}
	 * `<T>` Синхронизатор.
	 */
	/**
	 * @method createInserter
	 * `<T>` Конструирует синхронизатор представления с массивом.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.AbstractMap.Inserter}
	 * `<T>` Синхронизатор.
	 */
	/**
	 * @method equal
	 * `<T>` Поэлементно сравнивает два словаря.
	 * @static
	 * @param {Object} map1 `<T>` Словарь.
	 * @param {Object} map2 `<T>` Другой словарь.
	 * @returns {boolean} Словари поэлементно равны.
	 */
});
