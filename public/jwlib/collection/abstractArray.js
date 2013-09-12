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
 * `<T> extends JW.IndexedCollection<number, T>`
 *
 * Абстрактный массив.
 *
 * Массив - это упорядоченная коллекция, в которой каждый элемент имеет свой индекс. Индекс первого элемента равен 0,
 * индекс каждого следующего элемента на единицу больше.
 *
 * @extends JW.IndexedCollection
 * @abstract
 */
JW.AbstractArray = function(items, adapter) {
	JW.AbstractArray._super.call(this);
	this.items = adapter ? items : !items ? [] : (typeof items === "number") ? new Array(items) : items.concat();
	this.getKey = null;
};

JW.extend(JW.AbstractArray, JW.IndexedCollection, {
	/**
	 * @property {Function} getKey
	 *
	 * `getKey(item: T): number/string`
	 *
	 * Функция, возвращающая уникальный ключ элемента в данной коллекции. Функция используется
	 * алгоритмами #detectSplice, #performSplice, #detectReorder, #performReorder. По умолчанию равна JW.iid.
	 * Если коллекция содержит экземпляры JW.Class, то все тип-топ.
	 */
	/**
	 * @method getFirstKey
	 * Возвращает индекс первого элемента коллекции. Если коллекция пуста, вернет undefined.
	 * @returns {number} Индекс.
	 */
	/**
	 * @method containsKey
	 * Проверяет наличие элемента с заданным индексом в коллекции.
	 * @param {number} index Индекс.
	 * @returns {boolean} Коллекция содержит элемент с указанным индексом.
	 */
	/**
	 * @method keyOf
	 * Определяет индекс элемента в данной коллекции. Если такого элемента в коллекции нет, вернет undefined.
	 * @param {T} item Элемент.
	 * @returns {number} Индекс элемента.
	 */
	
	/**
	 * Возвращает массив элементов - внутреннее представление коллекции.
	 *
	 * **Метод не копирует коллекцию, будьте осторожны.**
	 *
	 * @returns {Array} Массив элементов.
	 */
	getItems: function() {
		return this.items;
	},
	
	/**
	 * Возвращает последний элемент коллекции. Если коллекция пуста, вернет undefined.
	 * @returns {T} Элемент.
	 */
	getLast: function() {
		return this.items[this.items.length - 1];
	},
	
	getLength: function() {
		return this.items.length;
	},
	
	isEmpty: function() {
		return this.items.length === 0;
	},
	
	/**
	 * @method get
	 * Возвращает элемент по индексу. В случае, если элемента с таким индексом нет, вернет undefined.
	 * @param {number} index Индекс.
	 * @returns {T} Элемент.
	 */
	get: function(index) {
		return this.items[index];
	},
	
	/**
	 * @method $getKeys
	 * Возвращает массив индексов всех элементов коллекции, т.е. массив `[0, 1, ... , length - 1]`.
	 * @returns {JW.Array} `<number>` Массив ключей.
	 */
	/**
	 * Возвращает массив индексов всех элементов коллекции, т.е. массив `[0, 1, ... , length - 1]`.
	 * @returns {Array} Массив индексов.
	 */
	getKeys: function() {
		var items = this.items;
		var result = new Array(items.length);
		for (var i = 0, l = items.length; i < l; ++i) {
			result[i] = i;
		}
		return result;
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
	 * `f(item: T, index: number): boolean`
	 *
	 * Критерий проверки элементов.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {boolean} Результат проверки.
	 */
	every: function(callback, scope) {
		return JW.Array.every(this.items, callback, scope || this);
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
	 * `f(item: T, index: number): boolean`
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
	 * Ищет элемент по критерию.
	 * 
	 * Возвращает индекс первого элемента, функция f на котором возвращает !== false.
	 * 
	 * Алгоритм последовательно перебирает все элементы, и останавливается после первого элемента, удовлетворяющего
	 * критерию.
	 *
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
	 * @method findBy
	 *
	 * Ищет элемент по критерию.
	 * 
	 * Возвращает индекс первого элемента, поле field которого строго равно (===) значению value.
	 * Поле элемента извлекается с помощью функции JW.get.
	 * 
	 * Алгоритм последовательно перебирает все элементы, и останавливается после первого элемента, удовлетворяющего
	 * критерию.
	 *
	 * @param {string/Array} field Поле элемента.
	 * @param {Mixed} value Значение.
	 * @returns {number} Индекс найденного элемента или undefined.
	 */
	/**
	 * @method findByMethod
	 *
	 * Ищет элемент по критерию.
	 * 
	 * Возвращает индекс первого элемента, указанный метод которого с аргументами args возвращает !== false.
	 * 
	 * Алгоритм последовательно перебирает все элементы, и останавливается после первого элемента, удовлетворяющего
	 * критерию.
	 *
	 * @param {string} method Имя метода элемента.
	 * @param {Array} [args] Аргументы.
	 * @returns {number} Индекс найденного элемента или undefined.
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
	 * Преобразует коллекцию в отсортированный массив.
	 *
	 * Строит массив из элементов коллекции, отсортированный по результату запуска функции f на каждом элементе.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, index: number): number/string`
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
	 * `f(item: T, index: number): number/string`
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
	 * `f(t1: T, t2: T, i1: number, i2: number): Number`
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
	 * `f(t1: T, t2: T, i1: number, i2: number): Number`
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
	 * Возвращает массив индексов отсортированных элементов.
	 *
	 * Строит массив из индексов элементов коллекции, отсортированный по результату запуска функции f на каждом
	 * элементе.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, index: number): number/string`
	 *
	 * Функция-сортировщик для элемента.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {Array} `<number>` Массив индексов отсортированных элементов.
	 */
	/**
	 * @method $getSortingKeys
	 *
	 * Возвращает массив индексов отсортированных элементов.
	 *
	 * Строит массив из индексов элементов коллекции, отсортированный по результату запуска функции f на каждом
	 * элементе.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, index: number): number/string`
	 *
	 * Функция-сортировщик для элемента.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {JW.Array} `<number>` Массив индексов отсортированных элементов.
	 */
	/**
	 * @method getSortingKeysBy
	 *
	 * Возвращает массив индексов отсортированных элементов.
	 *
	 * Строит массив из индексов элементов коллекции, отсортированный по указанному полю каждого элемента.
	 * Поле элемента извлекается с помощью функции JW.get.
	 *
	 * @param {string/Array} field Поле элемента.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {Array} `<number>` Массив индексов отсортированных элементов.
	 */
	/**
	 * @method $getSortingKeysBy
	 *
	 * Возвращает массив индексов отсортированных элементов.
	 *
	 * Строит массив из индексов элементов коллекции, отсортированный по указанному полю каждого элемента.
	 * Поле элемента извлекается с помощью функции JW.get.
	 *
	 * @param {string/Array} field Поле элемента.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {JW.Array} `<number>` Массив индексов отсортированных элементов.
	 */
	/**
	 * @method getSortingKeysByMethod
	 *
	 * Возвращает массив индексов отсортированных элементов.
	 *
	 * Строит массив из индексов элементов коллекции, отсортированный по результату запуска указанного метода у каждого
	 * элемента.
	 *
	 * @param {string} method Имя метода элемента.
	 * @param {Array} [args] Аргументы.
	 * @returns {Array} `<number>` Массив индексов отсортированных элементов.
	 */
	/**
	 * @method $getSortingKeysByMethod
	 *
	 * Возвращает массив индексов отсортированных элементов.
	 *
	 * Строит массив из индексов элементов коллекции, отсортированный по результату запуска указанного метода у каждого
	 * элемента.
	 *
	 * @param {string} method Имя метода элемента.
	 * @param {Array} [args] Аргументы.
	 * @returns {JW.Array} `<number>` Массив индексов отсортированных элементов.
	 */
	/**
	 * @method getSortingKeysComparing
	 *
	 * Возвращает массив индексов отсортированных элементов.
	 *
	 * Строит массив из индексов элементов коллекции, отсортированный по компаратору.
	 *
	 * @param {Function} compare
	 *
	 * `f(t1: T, t2: T, i1: number, i2: number): Number`
	 *
	 * Функция-компаратор. Возвращает положительное значение, если t1 > t2; отрицательное значение, если t1 < t2;
	 * 0, если t1 == t2.
	 *
	 * @param {Object} [scope] Контекст вызова compare. По умолчанию compare вызывается в контексте коллекции.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {Array} `<number>` Массив индексов отсортированных элементов.
	 */
	/**
	 * @method $getSortingKeysComparing
	 *
	 * Возвращает массив индексов отсортированных элементов.
	 *
	 * Строит массив из индексов элементов коллекции, отсортированный по компаратору.
	 *
	 * @param {Function} compare
	 *
	 * `f(t1: T, t2: T, i1: number, i2: number): Number`
	 *
	 * Функция-компаратор. Возвращает положительное значение, если t1 > t2; отрицательное значение, если t1 < t2;
	 * 0, если t1 == t2.
	 *
	 * @param {Object} [scope] Контекст вызова compare. По умолчанию compare вызывается в контексте коллекции.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {JW.Array} `<number>` Массив индексов отсортированных элементов.
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
	 * Индексирует коллекцию.
	 *
	 * Строит словарь, в ключах которого находятся результаты запуска функции f на всех элементах,
	 * а в значениях - соответствующие элементы.
	 *
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
	 * Фильтрует коллекцию по критерию.
	 *
	 * Строит новую коллекцию того же типа, включающую только те элементы, функция f на которых вернула !== false.
	 *
	 * @param {Function} f
	 *
	 * `f(T item, index: number): boolean`
	 *
	 * Фильтрующая функция.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {Array} Отфильтрованная коллекция.
	 */
	filter: function(callback, scope) {
		return JW.Array.filter(this.items, callback, scope || this);
	},
	
	/**
	 * Фильтрует коллекцию по критерию.
	 *
	 * Строит новую коллекцию того же типа, включающую только те элементы, функция f на которых вернула !== false.
	 *
	 * @param {Function} f
	 *
	 * `f(T item, index: number): boolean`
	 *
	 * Фильтрующая функция.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {JW.Array} `<T>` Отфильтрованная коллекция.
	 */
	$filter: JW.AbstractCollection._create$Array("filter"),
	
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
	 * @returns {JW.Array} `<T>` Отфильтрованная коллекция.
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
	 * @returns {JW.Array} `<T>` Отфильтрованная коллекция.
	 */
	
	/**
	 * `<U>` Отображает элементы коллекции.
	 * 
	 * Строит новую коллекцию того же типа, состояющую из результатов запуска функции f на каждом элементе коллекции.
	 *
	 * @param {Function} f
	 *
	 * `f(T item, index: number): U`
	 *
	 * Отображающая функция.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {Array} Отображенная коллекция.
	 */
	map: function(callback, scope) {
		return JW.Array.map(this.items, callback, scope || this);
	},
	
	/**
	 * `<U>` Отображает элементы коллекции.
	 * 
	 * Строит новую коллекцию того же типа, состояющую из результатов запуска функции f на каждом элементе коллекции.
	 *
	 * @param {Function} f
	 *
	 * `f(T item, index: number): U`
	 *
	 * Отображающая функция.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {JW.Array} `<U>` Отображенная коллекция.
	 */
	$map: JW.AbstractCollection._create$Array("map"),
	
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
	 * @returns {JW.Array} `<U>` Отображенная коллекция.
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
	 * @returns {JW.Array} `<U>` Отображенная коллекция.
	 */
	
	toArray: function() {
		return this.items.concat();
	},
	
	toSet: function() {
		return new JW.Set(this.items);
	},
	
	asArray: function() {
		return this.items;
	},
	
	$asArray: function() {
		return this;
	},
	
	/**
	 * Добавляет элемент в массив.
	 * @param {T} item Элемент.
	 * @param {number} [index] Индекс элемента, перед которым вставить новый элемент. По умолчанию, добавляет элемент
	 * в конец массива.
	 * @returns {void}
	 */
	add: function(item, index) {
		this.tryAdd(item, index);
	},
	
	/**
	 * Добавляет элемент в массив.
	 * @param {T} item Элемент.
	 * @param {number} [index] Индекс элемента, перед которым вставить новый элемент. По умолчанию, добавляет элемент
	 * в конец массива.
	 * @returns {boolean} true.
	 */
	tryAdd: function(item, index) {
		return this.tryAddAll([item], index);
	},
	
	/**
	 * Добавляет набор элементов в массив.
	 * @param {Array} items `<T>` Элементы.
	 * @param {number} [index] Индекс элемента, перед которым вставить новые элементы. По умолчанию, добавляет элементы
	 * в конец массива.
	 * @returns {void}
	 */
	addAll: function(items, index) {
		this.tryAddAll(items, index);
	},
	
	/**
	 * Добавляет набор элементов в массив.
	 * @param {Array} items `<T>` Элементы.
	 * @param {number} [index] Индекс элемента, перед которым вставить новые элементы. По умолчанию, добавляет элементы
	 * в конец массива.
	 * @returns {boolean} true. Если нет изменений - undefined.
	 */
	tryAddAll: function(items, index) {
		if (index === undefined) {
			index = this.items.length;
		}
		if (this.trySplice([], [new JW.AbstractArray.IndexItems(index, items)])) {
			return true;
		}
	},
	
	/**
	 * @method set
	 * Заменяет элемент с указанным индексом. В случае если элемента с таким индексом нет, массив сломается
	 * (не надо так).
	 * @param {T} item Элемент.
	 * @param {number} index Индекс.
	 * @returns {T} Бывший элемент коллекции.
	 */
	/**
	 * Заменяет элемент с указанным индексом. В случае если элемента с таким индексом нет, массив сломается
	 * (не надо так).
	 * @param {T} item Элемент.
	 * @param {number} index Индекс.
	 * @returns {JW.Proxy} `<T>` Обертка над бывшим элементом коллекции. Если нет изменений - undefined.
	 */
	trySet: function(item, index) {
		return JW.Array.trySet(this.items, item, index);
	},
	
	/**
	 * @method remove
	 * Удаляет элемент с указанным индексом. В случае если элемента с таким индексом нет, массив сломается
	 * (не надо так).
	 * @param {number} index Индекс.
	 * @returns {T} Бывший элемент коллекции.
	 */
	/**
	 * Удаляет элемент с указанным индексом. В случае если элемента с таким индексом нет, массив сломается
	 * (не надо так).
	 * @param {number} index Индекс.
	 * @returns {T} Бывший элемент коллекции. Если нет изменений - undefined.
	 */
	tryRemove: function(index) {
		var result = this.tryRemoveAll(index, 1);
		if (result !== undefined) {
			return result[0];
		}
	},
	
	/**
	 * Удаляет набор элементов из массива.
	 * @param {number} index Индекс элемента, начиная с которого удалять.
	 * @param {number} count Количество удаленных элементов.
	 * @returns {Array} `<T>` Удаленные элементы.
	 */
	removeAll: function(index, count) {
		var result = this.tryRemoveAll(index, count);
		return result || [];
	},
	
	/**
	 * Удаляет набор элементов из массива.
	 * @param {number} index Индекс элемента, начиная с которого удалять.
	 * @param {number} count Количество удаленных элементов.
	 * @returns {JW.Array} `<T>` Удаленные элементы.
	 */
	$removeAll: JW.AbstractCollection._create$Array("removeAll"),
	
	/**
	 * Удаляет набор элементов из массива.
	 * @param {number} index Индекс элемента, начиная с которого удалять.
	 * @param {number} count Количество удаленных элементов.
	 * @returns {Array} `<T>` Удаленные элементы. Если нет изменений - undefined.
	 */
	tryRemoveAll: function(index, count) {
		var result = this.trySplice([new JW.AbstractArray.IndexCount(index, count)], []);
		if (result !== undefined) {
			return result.removedItemsList[0].items;
		}
	},
	
	removeItems: function(items) {
		var itemSet = new JW.Set(items);
		var newItems = this.filter(function(v) { return !itemSet.contains(item); });
		this.performSplice(newItems);
	},
	
	/**
	 * Перемещает элемент в массиве.
	 * @param {number} fromIndex Индекс элемента, который переместить.
	 * @param {number} toIndex Куда переместить.
	 * @returns {T} Перемещенный элемент.
	 */
	move: function(fromIndex, toIndex) {
		this.tryMove(fromIndex, toIndex);
		return this.get(toIndex);
	},
	
	/**
	 * Перемещает элемент в массиве.
	 * @param {number} fromIndex Индекс элемента, который переместить.
	 * @param {number} toIndex Куда переместить.
	 * @returns {T} Перемещенный элемент. Если нет изменений - undefined.
	 */
	tryMove: function(fromIndex, toIndex) {
		return JW.Array.tryMove(this.items, fromIndex, toIndex);
	},
	
	/**
	 * Очищает коллекцию.
	 * @returns {Array} Бывшее содержимое коллекции.
	 */
	clear: function() {
		var result = this.tryClear();
		return (result !== undefined) ? result : [];
	},
	
	/**
	 * Очищает коллекцию.
	 * @returns {JW.Array} `<T>` Бывшее содержимое коллекции.
	 */
	$clear: JW.AbstractCollection._create$Array("clear"),
	
	/**
	 * Очищает коллекцию.
	 * @returns {Array} Бывшее содержимое коллекции. Если нет изменений - undefined.
	 */
	tryClear: function() {
		return JW.Array.tryClear(this.items);
	},
	
	/**
	 * Добавляет и удаляет элементы коллекции. Универсальная оптимизированная атомарная операция удаления/вставки.
	 * @param {Array} removeParamsList `<JW.AbstractArray.IndexCount>` Список отрезков для удаления по возрастанию
	 * индекса. Отрезки удаляются от конца к началу массива.
	 * @param {Array} addParamsList `<JW.AbstractArray.IndexItems<T>>` Список наборов для вставки по возрастанию
	 * индекса. Наборы вставляются от начала к концу массива.
	 * @returns {JW.AbstractArray.SpliceResult} `<T>` Результат.
	 */
	splice: function(removeParamsList, addParamsList) {
		var result = this.trySplice(removeParamsList, addParamsList);
		return (result !== undefined) ? result : new JW.AbstractArray.SpliceResult(this.items.concat(), [], []);
	},
	
	/**
	 * Добавляет и удаляет элементы коллекции. Универсальная оптимизированная атомарная операция удаления/вставки.
	 * @param {Array} removeParamsList `<JW.AbstractArray.IndexCount>` Список отрезков для удаления по возрастанию
	 * индекса. Отрезки удаляются от конца к началу массива.
	 * @param {Array} addParamsList `<JW.AbstractArray.IndexItems<T>>` Список наборов для вставки по возрастанию
	 * индекса. Наборы вставляются от начала к концу массива.
	 * @returns {JW.AbstractArray.SpliceResult} `<T>` Результат. Если нет изменений - undefined.
	 */
	trySplice: function(removeParamsList, addParamsList) {
		return JW.Array.trySplice(this.items, removeParamsList, addParamsList);
	},
	
	/**
	 * Переупорядочивает элементы массива.
	 * @param {Array} indexArray `<number>` Массив индексов. Элемент с индексом i будет перемещен в
	 * индекс indexArray[i]. Должен содержать все индексы от 0 до (length - 1).
	 * @returns {void}
	 */
	reorder: function(indexArray) {
		this.tryReorder(indexArray);
	},
	
	/**
	 * Переупорядочивает элементы массива.
	 * @param {Array} indexArray `<number>` Массив индексов. Элемент с индексом i будет перемещен в
	 * индекс indexArray[i]. Должен содержать все индексы от 0 до (length - 1).
	 * @returns {Array} `<T>` Бывшее содержимое массива.
	 */
	tryReorder: function(indexArray) {
		return JW.Array.tryReorder(this.items, indexArray);
	},
	
	/**
	 * Определяет параметры метода #splice, с которыми содержимое массива станет равно newItems.
	 * Т.е. определяет, какие элементы нужно удалить, какие вставить, и в какое место.
	 * @param {Array} newItems `<T>` Новое содержимое массива.
	 * @param {Function} [getKey] Функция, возвращающая уникальный ключ элемента в коллекции. По умолчанию
	 * равна #getKey. Если коллекция содержит экземпляры JW.Class, то все тип-топ.
	 * @param {Object} [scope] Контекст вызова getKey. По умолчанию, функция вызывается в контексте коллекции.
	 * @returns {JW.AbstractArray.SpliceParams} `<T>` Параметры метода #splice.
	 */
	detectSplice: function(newItems, getKey, scope) {
		return JW.Array.detectSplice(this.items, newItems, getKey || this.getKey, scope || this);
	},
	
	/**
	 * Определяет параметр метода #reorder, с которым содержимое массива станет равно newItems.
	 * Т.е. определяет, какие элементы куда нужно переместить.
	 * Если содержимое newItems отличается от содержимого массива, массив сломается.
	 * @param {Array} newItems `<T>` Новое содержимое массива.
	 * @param {Function} [getKey] Функция, возвращающая уникальный ключ элемента в коллекции. По умолчанию
	 * равна #getKey. Если коллекция содержит экземпляры JW.Class, то все тип-топ.
	 * @param {Object} [scope] Контекст вызова getKey. По умолчанию, функция вызывается в контексте коллекции.
	 * @returns {Array} `<number>` Параметр indexArray метода #reorder.
	 */
	detectReorder: function(newItems, getKey, scope) {
		return JW.Array.detectReorder(this.items, newItems, getKey || this.getKey, scope || this);
	},
	
	/**
	 * Определяет параметр метода #reorder, с которым содержимое массива отсортируется по результату вызова
	 * функции f на всех элементах.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, index: number): number/string`
	 *
	 * Функция-сортировщик для элемента.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {Array} `<number>` Параметр indexArray метода #reorder.
	 */
	detectSort: function(callback, scope, order) {
		return JW.Array.detectSort(this.items, callback, scope || this, order);
	},
	
	/**
	 * Определяет параметр метода #reorder, с которым содержимое массива отсортируется по компаратору.
	 *
	 * @param {Function} compare
	 *
	 * `f(t1: T, t2: T, i1: number, i2: number): Number`
	 *
	 * Функция-компаратор. Возвращает положительное значение, если t1 > t2; отрицательное значение, если t1 < t2;
	 * 0, если t1 == t2.
	 *
	 * @param {Object} [scope] Контекст вызова compare. По умолчанию compare вызывается в контексте коллекции.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {Array} `<number>` Параметр indexArray метода #reorder.
	 */
	detectSortComparing: function(compare, scope, order) {
		return JW.Array.detectSortComparing(this.items, compare, scope || this, order);
	},
	
	/**
	 * Преобразует содержимое массива к newItems комбинацией методов #detectSplice и #splice.
	 * @param {Array} newItems `<T>` Новое содержимое массива.
	 * @param {Function} [getKey] Функция, возвращающая уникальный ключ элемента в коллекции. По умолчанию
	 * равна #getKey. Если коллекция содержит экземпляры JW.Class, то все тип-топ.
	 * @param {Object} [scope] Контекст вызова getKey. По умолчанию, функция вызывается в контексте коллекции.
	 * @returns {void}
	 */
	performSplice: function(newItems, getKey, scope) {
		var params = this.detectSplice(newItems, getKey || this.getKey, scope || this);
		if (params !== undefined) {
			this.trySplice(params.removeParamsList, params.addParamsList);
		}
	},
	
	/**
	 * Преобразует содержимое массива к newItems комбинацией методов #detectReorder и #reorder.
	 * @param {Array} newItems `<T>` Новое содержимое массива.
	 * @param {Function} [getKey] Функция, возвращающая уникальный ключ элемента в коллекции. По умолчанию
	 * равна #getKey. Если коллекция содержит экземпляры JW.Class, то все тип-топ.
	 * @param {Object} [scope] Контекст вызова getKey. По умолчанию, функция вызывается в контексте коллекции.
	 * @returns {void}
	 */
	performReorder: function(newItems, getKey, scope) {
		var indexArray = this.detectReorder(newItems, getKey || this.getKey, scope || this);
		if (indexArray !== undefined) {
			this.tryReorder(indexArray);
		}
	},
	
	/**
	 * Сортирует массив по результату запуска функции f на элементах.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, index: number): number/string`
	 *
	 * Функция-сортировщик для элемента.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {void}
	 */
	sort: function(callback, scope, order) {
		this.tryReorder(this.detectSort(callback, scope, order));
	},
	
	/**
	 * Сортирует массив по значению указанного поля элемента. Поле элемента извлекается с помощью функции JW.get.
	 * @param {string/Array} field Поле элемента.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {void}
	 */
	sortBy: function(field, order) {
		this.sort(function(item) {
			return JW.get(item, field);
		}, this, order);
	},
	
	/**
	 * Сортирует массив по результату запуска указанного метода элемента.
	 * @param {string} method Имя метода элемента.
	 * @param {Array} [args] Аргументы.
	 * @returns {void}
	 */
	sortByMethod: function(method, args, order) {
		args = args || [];
		this.sort(function(item) {
			return item[method].apply(item, args);
		}, this, order);
	},
	
	/**
	 * Сортирует массив по компаратору.
	 *
	 * @param {Function} compare
	 *
	 * `f(t1: T, t2: T, i1: number, i2: number): Number`
	 *
	 * Функция-компаратор. Возвращает положительное значение, если t1 > t2; отрицательное значение, если t1 < t2;
	 * 0, если t1 == t2.
	 *
	 * @param {Object} [scope] Контекст вызова compare. По умолчанию compare вызывается в контексте коллекции.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {void}
	 */
	sortComparing: function(compare, scope, order) {
		this.tryReorder(this.detectSortComparing(compare, scope, order));
	},
	
	createMapper: function(config) {
		return new JW.AbstractArray.Mapper(this, config);
	},
	
	createObserver: function(config) {
		return new JW.AbstractArray.Observer(this, config);
	},
	
	createOrderer: function(config) {
		return new JW.AbstractArray.Orderer(this, config);
	},
	
	createSorter: function(config) {
		return new JW.AbstractArray.Sorter(this, config);
	},
	
	createIndexer: function(config) {
		return new JW.AbstractArray.Indexer(this, config);
	},
	
	createLister: function(config) {
		return new JW.AbstractArray.Lister(this, config);
	},
	
	createInserter: function(config) {
		return new JW.AbstractArray.Inserter(this, config);
	},
	
	createSplitter: function(config) {
		return new JW.AbstractArray.Splitter(this, config);
	},
	
	/**
	 * Поэлементно сравнивает с другим массивом.
	 * @param {Array} arr Другой массив.
	 * @returns {boolean} Массивы поэлементно равны.
	 */
	equal: function(arr) {
		return JW.Array.equal(this.items, arr);
	},
	
	/**
	 * Сплющивает массив массивов массивов... в один массив.
	 * @param {number} depth Глубина сплющивания.
	 * @returns {Array} Сплющенный массив.
	 */
	collapse: function(depth) {
		return JW.Array.collapse(this.items, depth);
	},
	
	/**
	 * Определяет индекс элемента в данной коллекции. Если такого элемента в коллекции нет, вернет -1.
	 * @param {T} item Элемент.
	 * @returns {number} Индекс элемента.
	 */
	indexOf: function(item) {
		return JW.Array.indexOf(this.items, item);
	},
	
	/**
	 * Проверяет все элементы по критерию в обратном порядке.
	 * 
	 * Возвращает true тогда и только тогда, когда функция f возвращает !== false на всех элементах коллекции.
	 * 
	 * Алгоритм перебирает все элементы с конца в начало, и останавливается после первого элемента, не удовлетворяющего
	 * критерию.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, index: number): boolean`
	 *
	 * Критерий проверки элементов.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {boolean} Результат проверки.
	 */
	backEvery: function(callback, scope) {
		return JW.Array.backEvery(this.items, callback, scope);
	},
	
	// deprecated
	top: function() {
		return JW.Array.top(this.items);
	},
	
	/**
	 * Удаляет последний элемент массива. Ничего не делает, если массив пуст.
	 * @returns {T} Удаленный элемент или undefined.
	 */
	pop: function() {
		if (this.items.length !== 0) {
			return this.tryRemove(this.items.length - 1);
		}
	},
	
	_callStatic: function(algorithm, args) {
		return JW.Array[algorithm].apply(JW.Array, [this.items].concat(args || []));
	}
});

/**
 * @class
 * Пара "индекс-количество". Используется в параметрах метода JW.AbstractArray#splice чтобы указать, какие
 * элементы нужно удалить из массива.
 * @extends JW.Class
 *
 * @constructor
 * @param {number} index Индекс.
 * @param {number} count Количество.
 */
JW.AbstractArray.IndexCount = function(index, count) {
	JW.AbstractArray.IndexCount._super.call(this);
	this.index = index;
	this.count = count;
};

JW.extend(JW.AbstractArray.IndexCount, JW.Class, {
	/**
	 * @property {number} index Индекс.
	 */
	/**
	 * @property {number} count Количество.
	 */
});

/**
 * @class
 * `<T>` Пара "индекс-элементы". Используется в параметрах метода JW.AbstractArray#splice чтобы указать, какие
 * элементы нужно вставить в массив.
 * @extends JW.Class
 *
 * @constructor
 * @param {number} index Индекс.
 * @param {Array} items `<T>` Элементы.
 */
JW.AbstractArray.IndexItems = function(index, items) {
	JW.AbstractArray.IndexItems._super.call(this);
	this.index = index;
	this.items = items;
};

JW.extend(JW.AbstractArray.IndexItems, JW.Class, {
	/**
	 * @property {number} index Индекс.
	 */
	/**
	 * @property {Array} items `<T>` Элементы.
	 */
	
	/**
	 * Преобразует в пару "индекс-количество".
	 * @returns {JW.AbstractArray.IndexCount} Пара "индекс-количество".
	 */
	toIndexCount: function() {
		return new JW.AbstractArray.IndexCount(this.index, this.items.length);
	}
});

/**
 * @class
 * `<T>` Параметры метода JW.AbstractArray#splice.
 * @extends JW.Class
 *
 * @constructor
 * @param {Array} removeParamsList `<JW.AbstractArray.IndexCount>` Сегменты для удаления.
 * @param {Array} addParamsList `<JW.AbstractArray.IndexItems<T>>` Наборы для вставки.
 */
JW.AbstractArray.SpliceParams = function(removeParamsList, addParamsList) {
	JW.AbstractArray.SpliceParams._super.call(this);
	this.removeParamsList = removeParamsList;
	this.addParamsList = addParamsList;
};

JW.extend(JW.AbstractArray.SpliceParams/*<T>*/, JW.Class, {
	/**
	 * @property {Array} removeParamsList `<JW.AbstractArray.IndexCount>` Сегменты для удаления.
	 */
	/**
	 * @property {Array} addParamsList `<JW.AbstractArray.IndexItems<T>>` Наборы для вставки.
	 */
});

/**
 * @class
 * `<T>` Результат метода JW.AbstractArray#splice.
 * @extends JW.Class
 *
 * @constructor
 * @param {Array} oldItems `<T>` Бывшее содержимое массива.
 * @param {Array} removedItemsList `<JW.AbstractArray.IndexItems<T>>` Наборы удаленных элементов.
 * @param {Array} addedItemsList `<JW.AbstractArray.IndexItems<T>>` Наборы вставленных элементов.
 */
JW.AbstractArray.SpliceResult = function(oldItems, removedItemsList, addedItemsList) {
	JW.AbstractArray.SpliceResult._super.call(this);
	this.oldItems = oldItems;
	this.removedItemsList = removedItemsList;
	this.addedItemsList = addedItemsList;
	this.removedItems = null;
	this.addedItems = null;
	this.removeParamsList = null;
};

JW.extend(JW.AbstractArray.SpliceResult/*<T>*/, JW.Class, {
	/**
	 * @property {Array} oldItems `<T>` Бывшее содержимое массива.
	 */
	/**
	 * @property {Array} removedItemsList `<JW.AbstractArray.IndexItems<T>>` Наборы удаленных элементов.
	 */
	/**
	 * @property {Array} addedItemsList `<JW.AbstractArray.IndexItems<T>>` Наборы вставленных элементов.
	 */
	/*
	Array<T> removedItems;
	Array<T> addedItems;
	Array<JW.AbstractArray.IndexCount<T>> removeParamsList;
	*/
	
	/**
	 * Возвращает общий массив удаленных элементов.
	 * @returns {Array} `<T>` Массив удаленных элементов.
	 */
	getRemovedItems: function() {
		if (!this.removedItems) {
			this.removedItems = JW.Array.merge(JW.Array.mapBy(this.removedItemsList, "items"));
		}
		return this.removedItems;
	},
	
	/**
	 * Возвращает общий массив добавленных элементов.
	 * @returns {Array} `<T>` Массив добавленных элементов.
	 */
	getAddedItems: function() {
		if (!this.addedItems) {
			this.addedItems = JW.Array.merge(JW.Array.mapBy(this.addedItemsList, "items"));
		}
		return this.addedItems;
	},
	
	/**
	 * Преобразует наборы удаленных элементов в сегменты для удаления.
	 * @returns {Array} `<JW.AbstractArray.IndexCount<T>>` Сегменты для удаления.
	 */
	getRemoveParamsList: function() {
		if (!this.removeParamsList) {
			this.removeParamsList = JW.Array.mapByMethod(this.removedItemsList, "toIndexCount");
		}
		return this.removeParamsList;
	},
	
	/**
	 * Проверяет, что массив не изменился в результате вызова JW.AbstractArray#splice.
	 * @returns {boolean} Массив не изменился.
	 */
	isEmpty: function() {
		return (this.removedItemsList.length === 0) && (this.addedItemsList.length === 0);
	}
});
