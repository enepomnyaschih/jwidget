﻿/*
	JW jQuery element prototype extension.
	
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
 * @class jQuery
 *
 * Элемент jQuery. Расширен дополнительным набором методов.
 */
JW.apply(jQuery.fn, {
	/**
	 * Вставить элемент в качестве дочернего элемента текущего элемента в указанное место.
	 * @param {jQuery} el Элемент.
	 * @param {number} index Индекс дочернего элемента, перед которым вставить el.
	 * @returns {jQuery} this.
	 */
	insert: function(item, index) {
		if (!JW.isSet(index)) {
			this.append(item);
		} else if (index == 0) {
			this.prepend(item);
		} else {
			jQuery(this.children()[index - 1]).after(item);
		}
		return this;
	},
	
	/**
	 * Заменить элемент другим элементом в DOM. В отличие от стандартного replaceWith, не убивает
	 * обработчики событий, а только убирает элемент из DOM.
	 * @param {jQuery} el Элемент.
	 * @param {boolean} [attrs=false] Присвоить аттрибут id (если определен) и добавить все классы текущего элемента
	 * в el.
	 * @returns {jQuery} this.
	 */
	replaceBy: function(el, attrs) {
		var id = attrs ? this.attr("id") : null,
			cls = attrs ? this.attr("class") : null;
		
		el = jQuery(el);
		this.after(el);
		this.detach();
		
		if (id) {
			el.attr("id", id);
		}
		if (cls) {
			el.addClass(cls);
		}
		return this;
	}
});