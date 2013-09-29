/*!
	jWidget UI 0.7
	
	http://enepomnyaschih.github.io/jwidget/#!/guide/home
	
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
 * @class JW.UI
 *
 * Пространство имен для View-части библиотеки jWidget.
 */
JW.UI = {
	/**
	 * Задает HTML-шаблоны для подкласса JW.UI.Component.
	 * 
	 * Для каждого подкласса JW.UI.Component можно задать ряд шаблонов. Каждый шаблон имеет свое имя.
	 * Получить шаблон компонента можно через словарь JW.UI.Component.templates.
	 * 
	 * При наследовании компонентов их шаблоны тоже наследуются.
	 * 
	 * Для любого подкласса JW.UI.Component определен по крайней мере один шаблон, который именуется `main`.
	 * Это главный шаблон, по которому рендерятся все компоненты данного класса. По умолчанию, `main` равен `<div />`.
	 * Как правило, шаблона `main` достаточно для большинства компонентов. Этот шаблон применяется автоматически,
	 * тогда как остальные шаблоны нужно использовать вручную.
	 * 
	 * Функция JW.UI.template вызывается автоматически при подключении `jw.html`-файлов через
	 * [jWidget SDK](https://github.com/enepomnyaschih/jwsdk/wiki/ru). Для подробностей, смотрите
	 * [Учебник. Часть 6. Инфраструктура проекта](#!/guide/sample6).
	 *
	 * @static
	 * @param {Function} cls Класс, унаследованный от JW.UI.Component.
	 * @param {Object} tpls Шаблоны для добавления/переопределения.
	 */
	template: function(cls, tpls) {
		if (cls.prototype.Templates && cls.prototype.Templates.componentCls == cls) {
			JW.apply(cls.prototype.Templates.prototype, tpls);
		} else {
			cls.prototype.Templates = (cls.superclass.Templates || JW.Class).extend(tpls);
			cls.prototype.Templates.componentCls = cls;
			cls.prototype.templates = new cls.prototype.Templates();
		}
	},
	
	/**
	 * Проверяет, является ли переменная [элементом jQuery](http://api.jquery.com/).
	 * @static
	 * @param {Mixed} x Переменная.
	 * @returns {boolean} Переменная является элементом jQuery.
	 */
	isElement: function(v) {
		return v instanceof jQuery.fn.init;
	},
	
	/**
	 * Запускает метод `preventDefault` для [события jQuery](http://api.jquery.com/category/events/event-object/).
	 *
	 * Используется для отмены поведения по умолчанию некоторого события:
	 *
	 *     el.click(JW.UI.preventDefault);
	 *
	 * @static
	 * @param {Object} event Событие jQuery.
	 */
	preventDefault: function(event) {
		event.preventDefault();
	}
};

jQuery(function() {
	JW.UI.windowEl = jQuery(window);
	JW.UI.bodyEl   = jQuery(document.body);
});
