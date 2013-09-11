/*
	JW simple inheritance.
	
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

JW.ClassUtil = {
	_iid: 0,
	
	_fnTest: /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/,
	
	extend: function(subc, supc, body) {
		body = body || {};
		
		var F = function() {};
		F.prototype = supc.prototype;
		subc.prototype = new F();
		subc.prototype.constructor = subc;
		subc.superclass = supc.prototype;
		subc._super = supc;
		for (var i in body) {
			subc.prototype[i] = JW.ClassUtil.extendMethod(body[i], supc.prototype[i]);
		}
		subc.extend = function(body) {
			var f = function() {
				subc.apply(this, arguments);
			};
			JW.extend(f, subc, body);
			return f;
		};
		return subc;
	},
	
	extendMethod: function(sub, sup) {
		if ((typeof sup !== "function") ||
			(typeof sub !== "function") ||
			sub.superclass ||
			!JW.ClassUtil._fnTest.test(sub)) {
			return sub;
		}
		return function() {
			var tmp = this._super;
			this._super = sup;
			var result = sub.apply(this, arguments);
			this._super = tmp;
			return result;
		}
	}
};

JW.extend = JW.ClassUtil.extend;

/**
 * @class
 * 
 * Самый базовый класс всех классов. От JW.Class и всех его потомков можно наследовать новые классы.
 * 
 * Пример наследования класса:
 * 
 *     // Конструктор
 *     var Shape = function(name) {
 *         // Вызываем конструктор базового класса
 *         Shape._super.call(this);
 *         // Объявляем поля
 *         this.name = name;
 *     };
 *     
 *     // Наследуем Shape от JW.Class
 *     JW.extend(Shape, JW.Class, {
 *         // Для удобства рекомендуется дать спецификацию класса в комментарии
 *         // String name;
 *         // abstract Number getArea();
 *     });
 *     
 *     // --------
 *     
 *     var Rectangle = function(name, width, height) {
 *         Rectangle._super.call(this, name);
 *         this.width = width;
 *         this.height = height;
 *         // Для оптимизации рекомендуется объявлять даже те поля,
 *         // которые не имеют значения по умолчанию
 *         this.el = null;
 *     };
 *     
 *     JW.extend(Rectangle, Shape, {
 *         // Number width;
 *         // Number height;
 *         // Element el;
 *         
 *         // Деструктор
 *         destroy: function() {
 *             // Освобождаем ресурсы
 *             if (this.el) {
 *                 this.el.remove();
 *             }
 *             // Вызываем деструктор базового класса
 *             this._super();
 *         },
 *         
 *         // override
 *         getArea: function() {
 *             return this.width * this.height;
 *         },
 *         
 *         getElement: function() {
 *             if (!this.el) {
 *                 this.el = jQuery('&lt;div /&gt;');
 *                 this.el.width(width);
 *                 this.el.height(height);
 *             }
 *             return this.el;
 *         }
 *     });
 */
JW.Class = function() {
	this._iid = ++JW.ClassUtil._iid;
	this._super = null;
};

/**
 * @property {Function} constructor
 *
 * Конструктор как класс. Если в вашем распоряжении есть некоторый объект, то вы с легкостью можете узнать его класс
 * воспользовавшись полем #constructor.
 */
/**
 * @property {number} _iid
 *
 * Instance ID.
 *
 * Автоинкрементный уникальный идентификатор объекта. Каждый экземпляр JW.Class получает такой идентификатор.
 * Используется в множестве JW.AbstractSet в качестве ключа словаря для быстрого поиска.
 */
/**
 * @method destroy
 *
 * Деструктор класса. Сюда рекомендуется помещать всю логику уничтожения экземпляра класса. Этот метод нужно явно
 * вызывать снаружи, поскольку JavaScript не поддерживает автоматические деструкторы классов. Этот метод можно
 * перегружать, не забывая вызывать деструктор базового класса:
 * 
 *     destroy: function() {
 *         // Освобождаем ресурсы
 *         ...
 *         // Вызываем деструктор базового класса
 *         this._super();
 *     }
 *
 * @returns {void}
 */
/**
 * @method _super
 *
 * Этот метод доступен только внутри методов класса, переданных в функцию JW.extend при создании данного класса. Метод
 * {@link #method-_super} - это простой способ вызова того же метода базового класса:
 * 
 *     ...
 *     // Метод класса
 *     myMethod: function(a, b, c) {
 *         return this._super(a, b) + c;
 *     }
 *     ...
 * 
 * Эквивалентный вариант:
 *
 *     ...
 *     // Метод класса
 *     myMethod: function(a, b, c) {
 *         return MyClass.superclass.myMethod.call(this, a, b) + c;
 *     }
 *     ...
 *
 * @returns {Mixed}
 */
/**
 * @property {Function} _super
 *
 * Базовый класс. Благодаря этому полю, можно вызывать конструктор базового класса:
 * 
 *     var MyClass = function() {
 *         MyClass._super.call(this);
 *     };
 *     
 *     JW.extend(MyClass, JW.Class);
 * 
 * Это статическое поле есть у JW.Class и всех классов, унаследованных от него.
 *
 * @static
 */
/**
 * @property {Object} prototype
 *
 * Прототип класса.
 *
 * @static
 */
/**
 * @property {Object} superclass
 *
 * Прототип базового класса. Благодаря этому полю, можно подниматься вверх по иерархии классов:
 * 
 *     this.constructor.superclass.constructor.superclass....
 * 
 * Это статическое поле есть у JW.Class и всех классов, унаследованных от него.
 *
 * @static
 */
/**
 * @method extend
 *
 * Создает новый класс и наследует его от текущего класса. Тело класса передается в аргументе body - все поля и методы
 * body станут полями и методами нового класса. Содержимое body в несколько преобразованном виде переходит в прототип
 * нового класса.
 * 
 * Конструктор остается таким же, как и у базового класса.
 * 
 * В случае, если конструктор нужно изменить, следует воспользоваться методом JW.extend.
 * 
 * Пример наследования класса:
 * 
 *     var MyClass = JW.Class.extend({
 *         // Метод
 *         myMethod: function(x) {
 *             return this._super(x + 10);
 *         }
 *     });
 * 
 * Этот статический метод есть у JW.Class и всех классов, унаследованных от него.
 *
 * @static
 *
 * @param {Object} body
 * Тело класса. По умолчанию - пустой объект (создает новый класс и наследует от текущего класса, без добавления полей
 * и методов).
 *
 * @returns {Function}
 * Новый унаследованный класс
 */

JW.extend(JW.Class, Object, {
	destroy: function() {}
});
