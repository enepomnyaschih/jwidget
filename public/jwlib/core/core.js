/*!
	jWidget Lib 0.5.1
	
	https://github.com/enepomnyaschih/jwidget/wiki
	
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
 * @class T Обозначение переменного типа данных для generic-классов и методов.
 * @abstract
 */
/**
 * @class P Обозначение переменного типа данных для generic-классов и методов.
 * @abstract
 */
/**
 * @class V Обозначение переменного типа данных для generic-классов и методов.
 * @abstract
 */
/**
 * @class K Обозначение переменного типа данных для generic-классов и методов.
 * @abstract
 */
if (typeof JW !== "undefined") {
	throw new Error("Can't initialize jWidget Lib: JW namespace already defined");
}

(typeof window === "undefined" ? global : window).JW = {};

/**
 * @class JW
 *
 * Основное пространство имен библиотеки jWidget.
 */

/**
 * @property {Object}
 *
 * Корневое пространство имен. Введено для обеспечения совместимости между JavaScript и NodeJS. Равно window в
 * браузерной среде и global в среде NodeJS.
 *
 * @static
 */
JW.global = (typeof window === "undefined" ? global : window);

/**
 * По очереди перебирает объекты, переданные после первого аргумента, и копирует все их элементы (поля/методы) в объект
 * target, после чего возвращает объект target. Элементы объектов-источников, значения которых равны undefined, будут
 * проигнорированы. Пустые объекты-источники (undefined, null) будут проигнорированы.
 *
 * Функция меняет объект target!
 * 
 * Пример 1:
 * 
 *     var x = {         var y = {         // Результат = {
 *         a: 10,                          //     a: 10,
 *         b: 20,            b: 30,        //     b: 30,
 *         c: null,          c: 40,        //     c: 40,
 *         d: undefined,     d: 50,        //     d: 50,
 *         e: null                         //     e: null,
 *                           f: 60,        //     f: 60
 *                           g: undefined  // 
 *     };                };                // };
 *     
 *     JW.applyIf(x, y);
 * 
 * Пример 2 (построение данных формы):
 * 
 *     My.Form = JW.Class.extend({
 *         // Object data;
 *         
 *         composeData: function(extraData) {
 *             return JW.apply({}, this.getDefaultData(), this.data, extraData);
 *         },
 *         
 *         // virtual
 *         getDefaultData: function() {
 *             return null;
 *         }
 *     });
 *
 * @static
 *
 * @param {Object} target
 * Целевой объект.
 *
 * @param {Object} [sources]
 * Объекты-источники.
 *
 * @returns {Object}
 * Возвращает target.
 */
JW.apply = function(target /*, sources */) {
	for (var i = 1; i < arguments.length; ++i) {
		var source = arguments[i];
		if (!source) {
			continue;
		}
		for (var key in source) {
			if (typeof source[key] !== "undefined") {
				target[key] = source[key];
			}
		}
	}
	return target;
};

JW.apply(JW, {
	/**
	 * Проверяет, является ли переменная undefined.
	 * @static
	 * @param {Mixed} x Переменная.
	 * @returns {boolean} Переменная является undefined.
	 */
	isUndefined: function(v) {
		return v === undefined;
	},
	
	/**
	 * Проверяет, что переменная не undefined.
	 * @static
	 * @param {Mixed} x Переменная.
	 * @returns {boolean} Переменная не является undefined.
	 */
	isDefined: function(v) {
		return v !== undefined;
	},
	
	/**
	 * Проверяет, является ли переменная null.
	 * @static
	 * @param {Mixed} x Переменная.
	 * @returns {boolean} Переменная является null.
	 */
	isNull: function(v) {
		return v === null;
	},
	
	/**
	 * Проверяет, что переменная не null.
	 * @static
	 * @param {Mixed} x Переменная.
	 * @returns {boolean} Переменная не является null.
	 */
	isNotNull: function(v) {
		return v !== null;
	},
	
	/**
	 * Проверяет, что переменная не undefined и не null.
	 * @static
	 * @param {Mixed} x Переменная.
	 * @returns {boolean} Переменная не undefined и не null.
	 */
	isSet: function(v) {
		return (v !== undefined) && (v !== null);
	},
	
	/**
	 * Проверяет, что переменная undefined или null.
	 * @static
	 * @param {Mixed} x Переменная.
	 * @returns {boolean} Переменная undefined или null.
	 */
	isNotSet: function(v) {
		return (v === undefined) || (v === null);
	},
	
	/**
	 * Проверяет, что переменная пуста (`null`, `undefined`, `false`, 0 или пустая строка).
	 * @static
	 * @param {Mixed} x Переменная.
	 * @returns {boolean} Переменная пуста.
	 */
	isBlank: function(v) {
		return !v;
	},
	
	/**
	 * Проверяет, что переменная не пуста (`null`, `undefined`, `false`, 0 или пустая строка).
	 * @static
	 * @param {Mixed} x Переменная.
	 * @returns {boolean} Переменная не пуста.
	 */
	isNotBlank: function(v) {
		return Boolean(v);
	},
	
	/**
	 * Проверяет, что переменная является целым числом.
	 * @static
	 * @param {Mixed} x Переменная.
	 * @returns {boolean} Переменная является целым числом.
	 */
	isInt: function(v) {
		return (typeof v === "number") && Math.round(v) === v;
	},
	
	/**
	 * Проверяет, что переменная является числом.
	 * @static
	 * @param {Mixed} x Переменная.
	 * @returns {boolean} Переменная является числом.
	 */
	isNumber: function(v) {
		return typeof v === "number";
	},
	
	/**
	 * Проверяет, что переменная является строкой.
	 * @static
	 * @param {Mixed} x Переменная.
	 * @returns {boolean} Переменная является строкой.
	 */
	isString: function(v) {
		return typeof v === "string";
	},
	
	/**
	 * Проверяет, что переменная булевая.
	 * @static
	 * @param {Mixed} x Переменная.
	 * @returns {boolean} Переменная булевая.
	 */
	isBoolean: function(v) {
		return typeof v === "boolean";
	},
	
	/**
	 * Проверяет, что переменная является функцией.
	 * @static
	 * @param {Mixed} x Переменная.
	 * @returns {boolean} Переменная является функцией.
	 */
	isFunction: function(v) {
		return typeof v === "function";
	},
	
	/**
	 * Проверяет, что переменная является нативным массивом (Array).
	 * @static
	 * @param {Mixed} x Переменная.
	 * @returns {boolean} Переменная является нативным массивом.
	 */
	isArray: function(v) {
		return Object.prototype.toString.apply(v) === '[object Array]';
	},
	
	/**
	 * Проверяет, что переменная является объектом (Object или экземпляр пользовательского класса).
	 * @static
	 * @param {Mixed} x Переменная.
	 * @returns {boolean} Переменная является объектом.
	 */
	isObject: function(v) {
		return Object.prototype.toString.apply(v) === '[object Object]';
	},
	
	/**
	 * Проверяет, что переменная является регулярным выражением.
	 * @static
	 * @param {Mixed} x Переменная.
	 * @returns {boolean} Переменная является регулярным выражением.
	 */
	isRegExp: function(v) {
		return Object.prototype.toString.apply(v) === '[object RegExp]';
	},
	
	/**
	 * Проверяет, что переменная является датой.
	 * @static
	 * @param {Mixed} x Переменная.
	 * @returns {boolean} Переменная является датой.
	 */
	isDate: function(v) {
		return Object.prototype.toString.apply(v) === '[object Date]';
	},
	
	/**
	 * Задает значение по умолчанию. Возвращает value, если оно не undefined, в противном случае возвращает default.
	 * @static
	 * @param {Mixed} value Значение.
	 * @param {Mixed} default Значение по умолчанию.
	 * @returns {Mixed} Результат.
	 */
	def: function(v, d) {
		return JW.isDefined(v) ? v : d;
	},
	
	/**
	 * Задает значение по умолчанию. Возвращает value, если оно не undefined и не null, в противном случае возвращает
	 * default.
	 * @static
	 * @param {Mixed} value Значение.
	 * @param {Mixed} default Значение по умолчанию.
	 * @returns {Mixed} Результат.
	 */
	defn: function(v, d) {
		return JW.isSet(v) ? v : d;
	},
	
	/**
	 * То же самое, что и JW.apply, только игнорирует поля, которые уже определены в target (не undefined).
	 *
	 * Пример
	 * 
	 *     var x = {         var y = {         // Результат = {
	 *         a: 10,                          //     a: 10,
	 *         b: 20,            b: 30,        //     b: 20,
	 *         c: null,          c: 40,        //     c: null,
	 *         d: undefined      d: 50,        //     d: 50,
	 *                           e: 60,        //     e: 60
	 *                           f: undefined  // 
	 *     };                };                // };
	 *     
	 *     JW.applyIf(x, y);
	 *
	 * @static
	 *
	 * @param {Object} target
	 * Целевой объект.
	 *
	 * @param {Object} [sources]
	 * Объекты-источники.
	 *
	 * @returns {Object}
	 * Возвращает target.
	 */
	applyIf: function(target /*, sources */) {
		for (var i = 1; i < arguments.length; ++i) {
			var source = arguments[i];
			if (!source) {
				continue;
			}
			for (var key in source) {
				if (JW.isDefined(source[key]) && !JW.isDefined(target[key])) {
					target[key] = source[key];
				}
			}
		}
		return target;
	},
	
	/**
	 * То же самое, что и JW.apply, только игнорирует поля, которые уже присвоены в target (не undefined или null).
	 *
	 * **Пример**
	 * 
	 *     var x = {         var y = {         // Результат = {
	 *         a: 10,                          //     a: 10,
	 *         b: 20,            b: 30,        //     b: 20,
	 *         c: null,          c: 40,        //     c: 40,
	 *         d: undefined      d: 50,        //     d: 50,
	 *                           e: 60,        //     e: 60
	 *                           f: undefined  // 
	 *     };                };                // };
	 *     
	 *     JW.applyIf(x, y);
	 *
	 * @static
	 *
	 * @param {Object} target
	 * Целевой объект.
	 *
	 * @param {Object} [sources]
	 * Объекты-источники.
	 *
	 * @returns {Object}
	 * Возвращает target.
	 */
	applyIfn: function(target /*, sources */) {
		for (var i = 1; i < arguments.length; ++i) {
			var source = arguments[i];
			if (!source) {
				continue;
			}
			for (var key in source) {
				if (JW.isDefined(source[key]) && !JW.isSet(target[key])) {
					target[key] = source[key];
				}
			}
		}
		return target;
	},
	
	/**
	 * Очищает словарь от значений undefined. Возвращает новый словарь, в котором есть все поля словаря target, кроме
	 * тех, что равны undefined.
	 * 
	 * Функция не меняет объект target.
	 * 
	 * Если вы хотите удалить еще и все значения равные null, воспользуйтесь функцией JW.cleann.
	 * 
	 * Пример:
	 * 
	 *     var x = {          // Результат: y = {
	 *         a : 10,        //     a: 10,
	 *         b : 20,        //     b: 20,
	 *         c : null,      //     c: null
	 *         d : undefined  //
	 *     };                 // };
	 *     
	 *     var y = JW.clean(x);
	 *
	 * @static
	 *
	 * @param {Object} target
	 * Словарь.
	 *
	 * @returns {Object}
	 * Очищенный словарь.
	 */
	clean: function(source) {
		var result = {};
		for (var i in source) {
			if (JW.isDefined(source[i])) {
				result[i] = source[i];
			}
		}
		return result;
	},
	
	/**
	 * Очищает словарь от значений null и undefined. Возвращает новый словарь, в котором есть все поля словаря target,
	 * кроме тех, что равны null или undefined.
	 * 
	 * Функция не меняет объект target.
	 * 
	 * Если вы хотите удалить только undefined, воспользуйтесь функцией JW.clean.
	 * 
	 * Пример:
	 * 
	 *     var x = {          // Результат: y = {
	 *         a : 10,        //     a: 10,
	 *         b : 20,        //     b: 20
	 *         c : null,      //
	 *         d : undefined  //
	 *     };                 // };
	 *     
	 *     var y = JW.clean(x);
	 *
	 * @static
	 *
	 * @param {Object} target
	 * Словарь.
	 *
	 * @returns {Object}
	 * Очищенный словарь.
	 */
	cleann: function(source) {
		var result = {};
		for (var i in source) {
			if (JW.isSet(source[i])) {
				result[i] = source[i];
			}
		}
		return result;
	},
	
	/**
	 * @method toArray
	 *
	 * Преобразует объект в массив. Объект должен иметь свойство length и элементы, пронумерованные от 0 до
	 * (length - 1).
	 * 
	 * Примером такого объекта является список аргументов функции. Это позволяет применять произвольные методы массива
	 * к списку аргументов.
	 * 
	 * Пример
	 * 
	 *     function applyOperations(
	 *         value
	 *         // operations
	 *         ) {
	 *         var operations = JW.toArray(arguments, 1);
	 *         // ...
	 *     }
	 *
	 * @static
	 *
	 * @param {Mixed} a
	 * Исходный объект.
	 *
	 * @param {number} [index]
	 * Номер аргумента, начиная с которого выполнить преобразование. По умолчанию, преобразует все аргументы.
	 *
	 * @param {number} [count]
	 * Количество аргументов для преобразования. По умолчанию, преобразует все аргументы, начиная с index.
	 *
	 * @returns {Array}
	 * Массив.
	 */
	/**
	 * Эквивалент метода JW.toArray.
	 * @static
	 * @param {Mixed} a Исходный объект.
	 * @param {number} [index]
	 * Номер аргумента, начиная с которого выполнить преобразование. По умолчанию, преобразует все аргументы.
	 * @param {number} [count]
	 * Количество аргументов для преобразования. По умолчанию, преобразует все аргументы, начиная с index.
	 * @returns {Array} Массив.
	 */
	args: function(a, index, count) {
		index = index || 0;
		count = count || (a.length - index);
		var r = [];
		for (var i = 0; i < count; ++i) {
			r.push(a[index + i]);
		}
		return r;
	},
	
	/**
	 * Пустая функция.
	 * @static
	 * @returns {void}
	 */
	emptyFn: function() {},
	
	/**
	 * Универсальная функция сравнения значений для сортировки массива.
	 * 
	 * - Возвращает 1, если x > y
	 * - Возвращает -1, если x < y
	 * - Возвращает 0, если x == y
	 * 
	 * Функция умеет сравнивать: boolean, number, string, Array.
	 *
	 * @static
	 * @param {Mixed} x Первое значение.
	 * @param {Mixed} y Второе значение.
	 * @param {boolean} caseInsensitive Не учитывать регистр.
	 * @returns {number} Результат сравнения.
	 */
	cmp: function(x, y, caseInsensitive) {
		if (typeof x === "boolean" && typeof y === "boolean") {
			return x ? (y ? 0 : 1) : (y ? -1 : 0);
		}
		if (JW.isArray(x) && JW.isArray(y)) {
			return JW.Array.cmp(x, y, caseInsensitive);
		}
		if (caseInsensitive) {
			if (typeof x === "string") {
				x = x.toLowerCase();
			}
			if (typeof y === "string") {
				y = y.toLowerCase();
			}
		}
		if (x > y) return 1;
		if (x < y) return -1;
		return 0;
	},
	
	/**
	 * Эквивалент JW.cmp(x, y, true). Сравнивает значения без учета регистра.
	 * @static
	 * @param {Mixed} x Первое значение.
	 * @param {Mixed} y Второе значение.
	 * @returns {number} Результат сравнения.
	 */
	cmpCaseInsensitive: function(x, y) {
		return JW.cmp(x, y, true);
	},
	
	/**
	 * Возвращает элемент объекта по выражению. Выражение представляет собой несколько слов, записанных в массиве или в
	 * строке через точку. Если field равен null, undefined или пустой строке, то функция вернет obj.
	 * 
	 * Пример 1
	 * 
	 *     var obj = {
	 *         abc : [
	 *             {
	 *                 qwe : "xyz"
	 *             }
	 *         ]
	 *     };
	 *     
	 *     return JW.get(obj, "abc.0.qwe"); // "xyz"
	 *     
	 *     // эквивалентный вариант
	 *     return JW.get(obj, [ "abc", 0, "qwe" ]); // "xyz"
	 * 
	 * Функция используется такими алгоритмами коллекций, как JW.AbstractCollection.filterBy,
	 * JW.AbstractCollection.searchBy и пр.
	 * 
	 * Пример 2
	 * 
	 *     var arr = [
	 *         {
	 *             id   : 1,
	 *             name : "First item"
	 *         }, {
	 *             id   : 2,
	 *             name : "Second item"
	 *         }
	 *     ];
	 *     
	 *     return JW.Array.searchBy(arr, "id", 2).name; // "Second item"
	 * 
	 * В данном примере функция JW.get неявно вызывается внутри метода JW.Array.searchBy с аргументом field === "id".
	 *
	 * @static
	 * @param {Object} obj Объект.
	 * @param {string/Array} field Название элемента объекта. Набор слов массивом или строкой через точку.
	 * @param {Mixed} def Значение, которое вернется, если элемент не найден. По умолчанию undefined.
	 * @returns {Mixed} Элемент объекта.
	 */
	get: function(obj, field, def) {
		if (!field) {
			return JW.def(obj, def);
		}
		if (typeof field === "string") {
			field = field.split(".");
		}
		field = JW.Array.filter(field, function(token) {
			return JW.isSet(token) && (token !== "");
		});
		for (var i = 0, l = field.length; i < l; ++i) {
			if (!obj) {
				return def;
			}
			obj = obj[field[i]];
		}
		return JW.def(obj, def);
	},
	
	/**
	 * Присваивает элемент объекта по выражению. Выражение представляет собой несколько слов, записанных в массиве или
	 * в строке через точку.
	 * 
	 * Пример:
	 * 
	 *     var obj = {
	 *         abc : [
	 *             {
	 *                 qwe : "xyz"
	 *             }
	 *         ]
	 *     };
	 *     
	 *     return JW.set(obj, "def", "abc.0.qwe"); // заменит значение "xyz" на "def"
	 *     
	 *     // эквивалентный вариант
	 *     return JW.set(obj, "def", [ "abc", 0, "qwe" ]); // заменит значение "xyz" на "def"
	 *
	 * @static
	 * @param {Object} obj Объект.
	 * @param {Mixed} value Значение.
	 * @param {string/Array} field Название элемента объекта. Набор слов массивом или строкой через точку.
	 * @returns {void}
	 */
	set: function(obj, value, field) {
		if (!field) {
			return;
		}
		if (typeof field === "string") {
			field = field.split(".");
		}
		field = JW.Array.filter(field, function(token) {
			return JW.isSet(token) && (token !== "");
		});
		for (var i = 0, l = field.length - 1; i < l; ++i) {
			token = field[i];
			obj[token] = obj[token] || {};
			obj = obj[token];
		}
		obj[JW.Array.getLast(field)] = value;
	},
	
	/**
	 * Возвращает уникальный идентификатор объекта. Вернет {@link JW.Class#_iid iid} объекта, если он является
	 * экземпляром JW.Class, в противном случае вернет сам объект.
	 *
	 * Эта функция является значением о умолчанию для полей JW.AbstractArray#getKey и JW.AbstractMap#getKey, а также
	 * для параметра getKey статических методов JW.Array#static-method-detectSplice,
	 * JW.Array#static-method-performSplice, JW.Array#static-method-detectReorder,
	 * JW.Array#static-method-performReorder, JW.Map#static-method-detectReindex,
	 * JW.Map#static-method-performReindex.
	 *
	 * @static
	 * @param {Object} obj Объект.
	 * @returns {Mixed} Уникальный идентификатор объекта.
	 */
	iid: function(obj) {
		return (typeof obj === "object") ? obj._iid : obj;
	},
	
	
	/**
	 * Уничтожает объект, вызвав его метод {@link JW.Class#destroy destroy}. Удобно использовать в конфигурации конвертеров:
	 * 
	 *     var mapper = collection.createMapper({
	 *         createItem  : function(data) { return new View(data); },
	 *         destroyItem : JW.destroy, // вместо function(view) { view.destroy(); }
	 *         scope       : this
	 *     });
	 *
	 * @static
	 * @param {Object} obj Объект.
	 * @returns {void}
	 */
	destroy: function(obj) {
		obj.destroy();
	},
	
	/**
	 * Берет значение value по модулю mod. Функция работает корректно для любого вещественного value и положительного
	 * вещественного mod. Возвращает значение в полуинтервале [0, mod).
	 * @static
	 * @param {number} value Значение.
	 * @param {number} mod Модуль.
	 * @returns {number} value по модулю mod.
	 */
	mod: function(value, mod) {
		return value - mod * Math.floor(value / mod);
	},
	
	/**
	 * Берет значение value по модулю mod. Функция работает корректно для любого вещественного value и положительного
	 * вещественного mod. Возвращает значение в полуинтервале [-mod/2, mod/2).
	 * @static
	 * @param {number} value Значение.
	 * @param {number} mod Модуль.
	 * @returns {number} value по модулю mod.
	 */
	smod: function(value, mod) {
		return value - mod * Math.round(value / mod);
	},
	
	/**
	 * Возвращает знак числа `value`: 0, 1 или -1.
	 * @static
	 * @param {number} value Значение.
	 * @returns {number} Знак.
	 */
	sgn: function(value) {
		return !value ? 0 : value > 0 ? 1 : -1;
	},
	
	/**
	 * Возвращает ненулевой знак числа `value`: 1 или -1. Для нуля вернет 1.
	 * @static
	 * @param {number} value Значение.
	 * @returns {number} Знак.
	 */
	sgnnz: function(value) {
		return value >= 0 ? 1 : -1;
	},
	
	/**
	 * Закрепляет контекст вызова функции.
	 * 
	 * **Пример**
	 * 
	 *     setTimeout(JW.inScope(this.onTimeout, this), 1000);
	 * 
	 * **Эквивалентная реализация**
	 * 
	 *     var self = this;
	 *     setTimeout(function() {
	 *         self.onTimeout();
	 *     }, 1000);
	 * 
	 * Контекст методов класса удобно закреплять в конструкторе до вызова конструктора базового класса:
	 * 
	 *     var MyClass = function(el, message) {
	 *         this._onClick = JW.inScope(this._onClick, this);
	 *         MyClass._super.call(this);
	 *         this.el = el;
	 *         this.message = message;
	 *         this.el.bind("click", this._onClick);
	 *     };
	 *     
	 *     JW.extend(MyClass, JW.Class, {
	 *         // Element el;
	 *         // String message;
	 *         
	 *         // override
	 *         destroy: function() {
	 *             this.el.unbind("click", this._onClick);
	 *         },
	 *         
	 *         _onClick: function() {
	 *             alert(this.message);
	 *         }
	 *     });
	 *
	 * @static
	 * @param {Function} fn Функция.
	 * @param {Object} scope Контекст вызова функции.
	 * @returns {Function} Функция с закрепленным контекстом.
	 */
	inScope: function(func, scope) {
		return function() {
			return func.apply(scope, arguments);
		};
	}
});

JW.toArray = JW.args;
