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
 * `<T> extends JW.IndexedCollection<string, T>`
 *
 * Абстрактный словарь.
 *
 * Словарь - это неупорядоченная коллекция, в которой каждый элемент имеет свой строковый ключ.
 *
 * @extends JW.IndexedCollection
 * @abstract
 */
JW.AbstractMap = function(json, adapter) {
	JW.AbstractMap._super.call(this);
	this.json = adapter ? json : json ? JW.apply({}, json) : {};
	this.length = JW.Map.getLength(this.json);
	this.getKey = null;
};

JW.extend(JW.AbstractMap, JW.IndexedCollection, {
	/**
	 * @property {Function} getKey
	 *
	 * `getKey(item: T): number/string`
	 *
	 * Функция, возвращающая уникальный ключ элемента в данной коллекции. Функция используется
	 * алгоритмами #detectReindex, #performReindex. По умолчанию равна JW.iid.
	 * Если коллекция содержит экземпляры JW.Class, то все тип-топ.
	 */
	/**
	 * @method getFirstKey
	 * Возвращает ключ первого элемента коллекции. Если коллекция пуста, вернет undefined.
	 * @returns {string} Ключ.
	 */
	/**
	 * @method containsKey
	 * Проверяет наличие элемента с заданным ключом в коллекции.
	 * @param {string} key Ключ.
	 * @returns {boolean} Коллекция содержит элемент с указанным ключом.
	 */
	/**
	 * @method keyOf
	 * Определяет ключ элемента в данной коллекции. Если такого элемента в коллекции нет, вернет undefined.
	 * @param {T} item Элемент.
	 * @returns {string} Ключ элемента.
	 */
	
	/**
	 * Возвращает словарь элементов - внутреннее представление коллекции.
	 *
	 * **Метод не копирует коллекцию, будьте осторожны.**
	 *
	 * @returns {Object} Словарь элементов.
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
	
	/**
	 * @method get
	 * Возвращает элемент по ключу. В случае, если элемента с таким ключом нет, вернет undefined.
	 * @param {string} key Ключ.
	 * @returns {T} Элемент.
	 */
	get: function(key) {
		return this.json[key];
	},
	
	/**
	 * @method $getKeys
	 * Возвращает массив ключей всех элементов коллекции.
	 * @returns {JW.Array} `<string>` Массив ключей.
	 */
	/**
	 * Возвращает массив ключей всех элементов коллекции.
	 * @returns {Array} `<string>` Массив ключей.
	 */
	getKeys: function() {
		return JW.Map.getKeys(this.json);
	},
	
	/**
	 * Проверяет все элементы по критерию.
	 * 
	 * Возвращает true тогда и только тогда, когда функция f возвращает !== false на всех элементах коллекции.
	 * 
	 * Алгоритм последовательно перебирает все элементы, и останавливается после первого элемента, не удовлетворяющего
	 * критерию.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, key: string): boolean`
	 *
	 * Критерий проверки элементов.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {boolean} Результат проверки.
	 */
	every: function(callback, scope) {
		return JW.Map.every(this.json, callback, scope);
	},
	
	/**
	 * @method some
	 *
	 * Проверяет каждый элемент по критерию.
	 * 
	 * Возвращает true тогда и только тогда, когда функция f возвращает !== false хотя бы на одном элементе коллекции.
	 * 
	 * Алгоритм последовательно перебирает все элементы, и останавливается после первого элемента, удовлетворяющего
	 * критерию.
	 *
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
	 * Перебирает элементы коллекции. Запускает указанную функцию на всех элементах.
	 *
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
	 * Ищет элемент по критерию.
	 * 
	 * Возвращает ключ первого элемента, функция f на котором возвращает !== false.
	 * 
	 * Алгоритм последовательно перебирает все элементы, и останавливается после первого элемента, удовлетворяющего
	 * критерию.
	 *
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
	 * @method findBy
	 *
	 * Ищет элемент по критерию.
	 * 
	 * Возвращает ключ первого элемента, поле field которого строго равно (===) значению value.
	 * Поле элемента извлекается с помощью функции JW.get.
	 * 
	 * Алгоритм последовательно перебирает все элементы, и останавливается после первого элемента, удовлетворяющего
	 * критерию.
	 *
	 * @param {string/Array} field Поле элемента.
	 * @param {Mixed} value Значение.
	 * @returns {string} Ключ найденного элемента или undefined.
	 */
	/**
	 * @method findByMethod
	 *
	 * Ищет элемент по критерию.
	 * 
	 * Возвращает ключ первого элемента, указанный метод которого с аргументами args возвращает !== false.
	 * 
	 * Алгоритм последовательно перебирает все элементы, и останавливается после первого элемента, удовлетворяющего
	 * критерию.
	 *
	 * @param {string} method Имя метода элемента.
	 * @param {Array} [args] Аргументы.
	 * @returns {string} Ключ найденного элемента или undefined.
	 */
	/**
	 * @method search
	 *
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
	/**
	 * @method toSorted
	 *
	 * Преобразует коллекцию в отсортированный массив.
	 *
	 * Строит массив из элементов коллекции, отсортированный по результату запуска функции f на каждом элементе.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, key: string): number/string`
	 *
	 * Функция-сортировщик для элемента.
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
	 * @param {Function} f
	 *
	 * `f(item: T, key: string): number/string`
	 *
	 * Функция-сортировщик для элемента.
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
	 * @param {Function} compare
	 *
	 * `f(t1: T, t2: T, k1: string, k2: string): Number`
	 *
	 * Функция-компаратор. Возвращает положительное значение, если t1 > t2; отрицательное значение, если t1 < t2;
	 * 0, если t1 == t2.
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
	 * @param {Function} compare
	 *
	 * `f(t1: T, t2: T, k1: string, k2: string): Number`
	 *
	 * Функция-компаратор. Возвращает положительное значение, если t1 > t2; отрицательное значение, если t1 < t2;
	 * 0, если t1 == t2.
	 *
	 * @param {Object} [scope] Контекст вызова compare. По умолчанию compare вызывается в контексте коллекции.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {JW.Array} `<T>` Отсортированный массив.
	 */
	/**
	 * @method getSortingKeys
	 *
	 * Возвращает массив ключей отсортированных элементов.
	 *
	 * Строит массив из ключей элементов коллекции, отсортированный по результату запуска функции f на каждом элементе.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, key: string): number/string`
	 *
	 * Функция-сортировщик для элемента.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {Array} `<string>` Массив ключей отсортированных элементов.
	 */
	/**
	 * @method $getSortingKeys
	 *
	 * Возвращает массив ключей отсортированных элементов.
	 *
	 * Строит массив из ключей элементов коллекции, отсортированный по результату запуска функции f на каждом элементе.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, key: string): number/string`
	 *
	 * Функция-сортировщик для элемента.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {JW.Array} `<string>` Массив ключей отсортированных элементов.
	 */
	/**
	 * @method getSortingKeysBy
	 *
	 * Возвращает массив ключей отсортированных элементов.
	 *
	 * Строит массив из ключей элементов коллекции, отсортированный по указанному полю каждого элемента.
	 * Поле элемента извлекается с помощью функции JW.get.
	 *
	 * @param {string/Array} field Поле элемента.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {Array} `<string>` Массив ключей отсортированных элементов.
	 */
	/**
	 * @method $getSortingKeysBy
	 *
	 * Возвращает массив ключей отсортированных элементов.
	 *
	 * Строит массив из ключей элементов коллекции, отсортированный по указанному полю каждого элемента.
	 * Поле элемента извлекается с помощью функции JW.get.
	 *
	 * @param {string/Array} field Поле элемента.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {JW.Array} `<string>` Массив ключей отсортированных элементов.
	 */
	/**
	 * @method getSortingKeysByMethod
	 *
	 * Возвращает массив ключей отсортированных элементов.
	 *
	 * Строит массив из ключей элементов коллекции, отсортированный по результату запуска указанного метода у каждого
	 * элемента.
	 *
	 * @param {string} method Имя метода элемента.
	 * @param {Array} [args] Аргументы.
	 * @returns {Array} `<string>` Массив ключей отсортированных элементов.
	 */
	/**
	 * @method $getSortingKeysByMethod
	 *
	 * Возвращает массив ключей отсортированных элементов.
	 *
	 * Строит массив из ключей элементов коллекции, отсортированный по результату запуска указанного метода у каждого
	 * элемента.
	 *
	 * @param {string} method Имя метода элемента.
	 * @param {Array} [args] Аргументы.
	 * @returns {JW.Array} `<string>` Массив ключей отсортированных элементов.
	 */
	/**
	 * @method getSortingKeysComparing
	 *
	 * Возвращает массив ключей отсортированных элементов.
	 *
	 * Строит массив из ключей элементов коллекции, отсортированный по компаратору.
	 *
	 * @param {Function} compare
	 *
	 * `f(t1: T, t2: T, k1: string, k2: string): Number`
	 *
	 * Функция-компаратор. Возвращает положительное значение, если t1 > t2; отрицательное значение, если t1 < t2;
	 * 0, если t1 == t2.
	 *
	 * @param {Object} [scope] Контекст вызова compare. По умолчанию compare вызывается в контексте коллекции.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {Array} `<string>` Массив ключей отсортированных элементов.
	 */
	/**
	 * @method $getSortingKeysComparing
	 *
	 * Возвращает массив ключей отсортированных элементов.
	 *
	 * Строит массив из ключей элементов коллекции, отсортированный по компаратору.
	 *
	 * @param {Function} compare
	 *
	 * `f(t1: T, t2: T, k1: string, k2: string): Number`
	 *
	 * Функция-компаратор. Возвращает положительное значение, если t1 > t2; отрицательное значение, если t1 < t2;
	 * 0, если t1 == t2.
	 *
	 * @param {Object} [scope] Контекст вызова compare. По умолчанию compare вызывается в контексте коллекции.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {JW.Array} `<string>` Массив ключей отсортированных элементов.
	 */
	
	/**
	 * @method index
	 *
	 * Индексирует коллекцию.
	 *
	 * Строит словарь, в ключах которого находятся результаты запуска функции f на всех элементах,
	 * а в значениях - соответствующие элементы.
	 *
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
	 * Индексирует коллекцию.
	 *
	 * Строит словарь, в ключах которого находятся результаты запуска функции f на всех элементах,
	 * а в значениях - соответствующие элементы.
	 *
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
	 * Фильтрует коллекцию по критерию.
	 *
	 * Строит новую коллекцию того же типа, включающую только те элементы, функция f на которых вернула !== false.
	 *
	 * @param {Function} f
	 *
	 * `f(T item, key: string): boolean`
	 *
	 * Фильтрующая функция.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {Object} Отфильтрованная коллекция.
	 */
	filter: function(callback, scope) {
		return JW.Map.filter(this.json, callback, scope);
	},
	
	/**
	 * Фильтрует коллекцию по критерию.
	 *
	 * Строит новую коллекцию того же типа, включающую только те элементы, функция f на которых вернула !== false.
	 *
	 * @param {Function} f
	 *
	 * `f(T item, key: string): boolean`
	 *
	 * Фильтрующая функция.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {JW.Map} `<T>` Отфильтрованная коллекция.
	 */
	$filter: JW.AbstractCollection._create$Map("filter"),
	
	/**
	 * @method filterBy
	 *
	 * Фильтрует коллекцию по критерию.
	 * 
	 * Строит новую коллекцию того же типа, включающую только те элементы, поле field которых строго равно (===)
	 * значению value. Поле элемента извлекается с помощью функции JW.get.
	 * 
	 * @param {string/Array} field Поле элемента.
	 * @param {Mixed} value Значение.
	 * @returns {Object} Отфильтрованная коллекция.
	 */
	/**
	 * @method $filterBy
	 *
	 * Фильтрует коллекцию по критерию.
	 * 
	 * Строит новую коллекцию того же типа, включающую только те элементы, поле field которых строго равно (===)
	 * значению value. Поле элемента извлекается с помощью функции JW.get.
	 * 
	 * @param {string/Array} field Поле элемента.
	 * @param {Mixed} value Значение.
	 * @returns {JW.Map} `<T>` Отфильтрованная коллекция.
	 */
	/**
	 * @method filterByMethod
	 *
	 * Фильтрует коллекцию по критерию.
	 * 
	 * Строит новую коллекцию того же типа, включающую только те элементы, метод method которых с аргументами args
	 * возвращает !== false для всех элементов коллекции.
	 * 
	 * @param {string} method Имя метода элемента.
	 * @param {Array} [args] Аргументы.
	 * @returns {Object} Отфильтрованная коллекция.
	 */
	/**
	 * @method $filterByMethod
	 *
	 * Фильтрует коллекцию по критерию.
	 * 
	 * Строит новую коллекцию того же типа, включающую только те элементы, метод method которых с аргументами args
	 * возвращает !== false для всех элементов коллекции.
	 * 
	 * @param {string} method Имя метода элемента.
	 * @param {Array} [args] Аргументы.
	 * @returns {JW.Map} `<T>` Отфильтрованная коллекция.
	 */
	
	/**
	 * `<U>` Отображает элементы коллекции.
	 * 
	 * Строит новую коллекцию того же типа, состояющую из результатов запуска функции f на каждом элементе коллекции.
	 *
	 * @param {Function} f
	 *
	 * `f(T item, key: string): U`
	 *
	 * Отображающая функция.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {Object} Отображенная коллекция.
	 */
	map: function(callback, scope) {
		return JW.Map.map(this.json, callback, scope);
	},
	
	/**
	 * `<U>` Отображает элементы коллекции.
	 * 
	 * Строит новую коллекцию того же типа, состояющую из результатов запуска функции f на каждом элементе коллекции.
	 *
	 * @param {Function} f
	 *
	 * `f(T item, key: string): U`
	 *
	 * Отображающая функция.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {JW.Map} `<T>` Отображенная коллекция.
	 */
	$map: JW.AbstractCollection._create$Map("map"),
	
	/**
	 * @method mapBy
	 *
	 * `<U>` Отображает элементы коллекции.
	 * 
	 * Строит новую коллекцию того же типа, состояющую из значений поля field всех элементов коллекции. Поле элемента
	 * извлекается с помощью функции JW.get.
	 * 
	 * @param {string/Array} field Поле элемента.
	 * @param {Mixed} value Значение.
	 * @returns {Object} Отображенная коллекция.
	 */
	/**
	 * @method $mapBy
	 *
	 * `<U>` Отображает элементы коллекции.
	 * 
	 * Строит новую коллекцию того же типа, состояющую из значений поля field всех элементов коллекции. Поле элемента
	 * извлекается с помощью функции JW.get.
	 * 
	 * @param {string/Array} field Поле элемента.
	 * @param {Mixed} value Значение.
	 * @returns {JW.Map} `<U>` Отображенная коллекция.
	 */
	/**
	 * @method mapByMethod
	 *
	 * `<U>` Отображает элементы коллекции.
	 * 
	 * Строит новую коллекцию того же типа, состояющую из результатов запуска метода method с аргументами args
	 * у всех элементов коллекции.
	 * 
	 * @param {string} method Имя метода элемента.
	 * @param {Array} [args] Аргументы.
	 * @returns {Object} Отображенная коллекция.
	 */
	/**
	 * @method $mapByMethod
	 *
	 * `<U>` Отображает элементы коллекции.
	 * 
	 * Строит новую коллекцию того же типа, состояющую из результатов запуска метода method с аргументами args
	 * у всех элементов коллекции.
	 * 
	 * @param {string} method Имя метода элемента.
	 * @param {Array} [args] Аргументы.
	 * @returns {JW.Map} `<U>` Отображенная коллекция.
	 */
	
	asMap: function() {
		return this.json;
	},
	
	$asMap: function() {
		return this;
	},
	
	/**
	 * @method set
	 * Заменяет элемент по ключу. В случае если элемента с таким ключом нет, он будет добавлен.
	 * @param {T} item Элемент.
	 * @param {string} key Ключ.
	 * @returns {T} Бывший элемент коллекции.
	 */
	/**
	 * Заменяет элемент по ключу. В случае если элемента с таким ключом нет, он будет добавлен.
	 * @param {T} item Элемент.
	 * @param {string} key Ключ.
	 * @returns {JW.Proxy} `<T>` Обертка над бывшим элементом коллекции. Если нет изменений - undefined.
	 */
	trySet: function(item, key) {
		var spliceResult = this.trySplice([], JW.Map.single(key, item));
		if (spliceResult !== undefined) {
			return new JW.Proxy(spliceResult.removedItems[key]);
		}
	},
	
	/**
	 * Заменяет/добавляет набор элементов в словаре.
	 * @param {Object} items Элементы.
	 * @returns {JW.AbstractMap.SpliceResult} `<T>` Результат метода #splice.
	 */
	setAll: function(items) {
		var spliceResult = this.trySetAll(items);
		return (spliceResult !== undefined) ? spliceResult : new JW.AbstractMap.SpliceResult({}, {});
	},
	
	/**
	 * Заменяет/добавляет набор элементов в словаре.
	 * @param {Object} items Элементы.
	 * @returns {JW.AbstractMap.SpliceResult} `<T>` Результат метода #splice. Если нет изменений - undefined.
	 */
	trySetAll: function(items) {
		return this.trySplice([], items);
	},
	
	/**
	 * Меняет ключ элемента в словаре. Если элемента с таким ключом нет, метод сломается.
	 * @param {string} oldKey Старый ключ элемента.
	 * @param {string} newKey Новый ключ элемента.
	 * @returns {T} Элемент.
	 */
	setKey: function(oldKey, newKey) {
		this.trySetKey(oldKey, newKey);
		return this.json[newKey];
	},
	
	/**
	 * Меняет ключ элемента в словаре.
	 * @param {string} oldKey Старый ключ элемента.
	 * @param {string} newKey Новый ключ элемента.
	 * @returns {T} Элемент. Если нет изменений - undefined.
	 */
	trySetKey: function(oldKey, newKey) {
		var keyMap = this.tryReindex(JW.Map.single(oldKey, newKey));
		if (keyMap !== undefined) {
			return this.json[newKey];
		}
	},
	
	/**
	 * @method remove
	 * Удаляет элемент по ключу, если он существует в коллекции.
	 * @param {K} key Ключ.
	 * @returns {T} Бывший элемент коллекции или undefined.
	 */
	/**
	 * Удаляет элемент по ключу, если он существует в коллекции.
	 * @param {K} key Ключ.
	 * @returns {T} Бывший элемент коллекции. Если нет изменений - undefined.
	 */
	tryRemove: function(key) {
		var spliceResult = this.trySplice([key], {});
		if (spliceResult !== undefined) {
			return spliceResult.removedItems[key];
		}
	},
	
	/**
	 * Удаляет набор элементов из словаря.
	 * @param {Array} keys `<string>` Ключи элементов.
	 * @returns {Object} Удаленные элементы.
	 */
	removeAll: function(keys) {
		var items = this.tryRemoveAll(keys);
		return (items !== undefined) ? items : {};
	},
	
	/**
	 * Удаляет набор элементов из словаря.
	 * @param {Array} keys `<string>` Ключи элементов.
	 * @returns {JW.Map} `<T>` Удаленные элементы.
	 */
	$removeAll: JW.AbstractCollection._create$Map("removeAll"),
	
	/**
	 * Удаляет набор элементов из словаря.
	 * @param {Array} keys `<string>` Ключи элементов.
	 * @returns {Object} Удаленные элементы. Если нет изменений - undefined.
	 */
	tryRemoveAll: function(keys) {
		var spliceResult = this.trySplice(keys, {});
		if (spliceResult !== undefined) {
			return spliceResult.removedItems;
		}
	},
	
	removeItems: function(items) {
		var itemSet = new JW.Set(items);
		var newItems = this.filter(function(item) {
			return !itemSet.contains(item);
		});
		this.performSplice(newItems);
	},
	
	/**
	 * Очищает коллекцию.
	 * @returns {Object} Бывшее содержимое коллекции.
	 */
	clear: function() {
		var result = this.tryClear();
		return (result !== undefined) ? result : {};
	},
	
	/**
	 * Очищает коллекцию.
	 * @returns {JW.Map} `<T>` Бывшее содержимое коллекции.
	 */
	$clear: JW.AbstractCollection._create$Map("clear"),
	
	/**
	 * Очищает коллекцию.
	 * @returns {Object} Бывшее содержимое коллекции. Если нет изменений - undefined.
	 */
	tryClear: function() {
		this.length = 0;
		return JW.Map.tryClear(this.json);
	},
	
	/**
	 * Добавляет и удаляет элементы коллекции. Универсальная оптимизированная атомарная операция удаления/вставки.
	 * @param {Array} removedKeys `<string>` Ключи элементов для удаления.
	 * @param {Object} updatedItems Элементы для добавления/замены.
	 * @returns {JW.AbstractMap.SpliceResult} `<T>` Результат.
	 */
	splice: function(removedKeys, updatedItems) {
		var spliceResult = this.trySplice(removedKeys, updatedItems);
		return (spliceResult !== undefined) ? spliceResult : new JW.AbstractMap.SpliceResult({}, {});
	},
	
	/**
	 * Добавляет и удаляет элементы коллекции. Универсальная оптимизированная атомарная операция удаления/вставки.
	 * @param {Array} removedKeys `<string>` Ключи элементов для удаления.
	 * @param {Object} updatedItems Элементы для добавления/замены.
	 * @returns {JW.AbstractMap.SpliceResult} `<T>` Результат. Если нет изменений - undefined.
	 */
	trySplice: function(removedKeys, updatedItems) {
		var spliceResult = JW.Map.trySplice(this.json, removedKeys, updatedItems);
		if (spliceResult) {
			this.length += JW.Map.getLength(spliceResult.addedItems) - JW.Map.getLength(spliceResult.removedItems);
			return spliceResult;
		}
	},
	
	/**
	 * Меняет ключи элементов словаря.
	 * @param {Object} keyMap `<string>` Словарь ключей. Элемент с ключем k будет перемещен в ключ keyMap[k].
	 * Обязательно указывать только изменившиеся ключи.
	 * @returns {Object} Словарь изменившихся ключей.
	 */
	reindex: function(keyMap) {
		var result = this.tryReindex(keyMap);
		return (result !== undefined) ? result : {};
	},
	
	/**
	 * Меняет ключи элементов словаря.
	 * @param {Object} keyMap `<string>` Словарь ключей. Элемент с ключем k будет перемещен в ключ keyMap[k].
	 * Обязательно указывать только изменившиеся ключи.
	 * @returns {Object} Словарь изменившихся ключей. Если нет изменений - undefined.
	 */
	tryReindex: function(keyMap) {
		return JW.Map.tryReindex(this.json, keyMap);
	},
	
	/**
	 * Определяет параметры метода #splice, с которыми содержимое словаря станет равно newItems.
	 * Т.е. определяет, какие элементы нужно удалить, какие добавить, и с каким ключом.
	 * @param {Object} newItems Новое содержимое словаря.
	 * @returns {JW.AbstractMap.SpliceParams} `<T>` Параметры метода #splice.
	 */
	detectSplice: function(newItems) {
		return JW.Map.detectSplice(this.json, newItems);
	},
	
	/**
	 * Определяет параметр метода #reindex, с которым содержимое словаря станет равно newItems.
	 * Т.е. определяет, какие элементы куда нужно переместить.
	 * Если содержимое newItems отличается от содержимого словаря, словарь сломается.
	 * @param {Object} newItems Новое содержимое словаря.
	 * @param {Function} [getKey] Функция, возвращающая уникальный ключ элемента в коллекции. По умолчанию
	 * равна #getKey. Если коллекция содержит экземпляры JW.Class, то все тип-топ.
	 * @param {Object} [scope] Контекст вызова getKey. По умолчанию, функция вызывается в контексте коллекции.
	 * @returns {Object} Параметр keyMap метода #reindex.
	 */
	detectReindex: function(newItems, getKey, scope) {
		return JW.Map.detectReindex(this.json, newItems, getKey || this.getKey, scope || this);
	},
	
	/**
	 * Преобразует содержимое словаря к newItems комбинацией методов #detectSplice и #splice.
	 * @param {Object} newItems Новое содержимое словаря.
	 * @returns {void}
	 */
	performSplice: function(newItems) {
		var params = this.detectSplice(newItems);
		if (params !== undefined) {
			this.trySplice(params.removedKeys, params.updatedItems);
		}
	},
	
	/**
	 * Преобразует содержимое словаря к newItems комбинацией методов #detectReindex и #reindex.
	 * @param {Object} newItems Новое содержимое словаря.
	 * @param {Function} [getKey] Функция, возвращающая уникальный ключ элемента в коллекции. По умолчанию
	 * равна #getKey. Если коллекция содержит экземпляры JW.Class, то все тип-топ.
	 * @param {Object} [scope] Контекст вызова getKey. По умолчанию, функция вызывается в контексте коллекции.
	 * @returns {void}
	 */
	performReindex: function(newItems, getKey, scope) {
		var keyMap = this.detectReindex(newItems, getKey, scope);
		if (keyMap !== undefined) {
			this.tryReindex(keyMap);
		}
	},
	
	/**
	 * `<U>` Конструирует конвертер элементов коллекции.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.AbstractMap.Mapper}
	 * `<T, U>` Синхронизатор.
	 */
	createMapper: function(config) {
		return new JW.AbstractMap.Mapper(this, config);
	},
	
	/**
	 * Конструирует наблюдатель коллекции.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.AbstractMap.Observer}
	 * `<T>` Синхронизатор.
	 */
	createObserver: function(config) {
		return new JW.AbstractMap.Observer(this, config);
	},
	
	/**
	 * Конструирует конвертер коллекции в массив (упорядочитель).
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.AbstractMap.Orderer}
	 * `<T>` Синхронизатор.
	 */
	createOrderer: function(config) {
		return new JW.AbstractMap.Orderer(this, config);
	},
	
	/**
	 * Конструирует конвертер коллекции в массив (сортировщик по компаратору).
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.AbstractMap.SorterComparing}
	 * `<T>` Синхронизатор.
	 */
	createSorterComparing: function(config) {
		return new JW.AbstractMap.SorterComparing(this, config);
	},
	
	/**
	 * Конструирует индексатор коллекции.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.AbstractMap.Indexer}
	 * `<T>` Синхронизатор.
	 */
	createIndexer: function(config) {
		return new JW.AbstractMap.Indexer(this, config);
	},
	
	/**
	 * Конструирует конвертер коллекции в множество.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.AbstractMap.Lister}
	 * `<T>` Синхронизатор.
	 */
	createLister: function(config) {
		return new JW.AbstractMap.Lister(this, config);
	},
	
	/**
	 * Конструирует синхронизатор представления с массивом.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.AbstractMap.Inserter}
	 * `<T>` Синхронизатор.
	 */
	createInserter: function(config) {
		return new JW.AbstractMap.Inserter(this, config);
	},
	
	/**
	 * Поэлементно сравнивает с другим словарем.
	 * @param {Object} map Другой словарь.
	 * @returns {boolean} Словари поэлементно равны.
	 */
	equal: function(map) {
		return JW.Map.equal(this.json, map);
	},
	
	_callStatic: function(algorithm, args) {
		return JW.Map[algorithm].apply(JW.Map, [this.json].concat(JW.args(args || [])));
	}
	
	/**
	 * @method createEmpty
	 * `<U>` Конструирует пустую коллекцию того же типа.
	 * @returns {JW.AbstractMap} `<U>` Коллекция.
	 */
});

/**
 * @class
 * `<T>` Параметры метода JW.AbstractMap#splice.
 * @extends JW.Class
 *
 * @constructor
 * @param {Array} removedKeys `<string>` Ключи для удаления.
 * @param {Object} updatedItems Элементы для добавления/замены.
 */
JW.AbstractMap.SpliceParams = function(removedKeys, updatedItems) {
	JW.AbstractMap.SpliceParams._super.call(this);
	this.removedKeys = removedKeys;
	this.updatedItems = updatedItems;
};

JW.extend(JW.AbstractMap.SpliceParams, JW.Class, {
	/**
	 * @property {Array} removedKeys `<string>` Ключи для удаления.
	 */
	/**
	 * @property {Object} updatedItems Элементы для добавления/замены.
	 */
});

/**
 * @class
 * `<T>` Результат вызова метода JW.AbstractMap#splice.
 * @extends JW.Class
 *
 * @constructor
 * @param {Object} removedItems Удаленные элементы.
 * @param {Object} updatedItems Добавленные элементы.
 */
JW.AbstractMap.SpliceResult = function(removedItems, addedItems) {
	JW.AbstractMap.SpliceResult._super.call(this);
	this.removedItems = removedItems;
	this.addedItems = addedItems;
};

JW.extend(JW.AbstractMap.SpliceResult, JW.Class, {
	/**
	 * @property {Object} removedItems Удаленные элементы.
	 */
	/**
	 * @property {Object} updatedItems Добавленные элементы.
	 */
});
