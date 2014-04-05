/*
	jWidget UI source file.
	
	Copyright (C) 2014 Egor Nepomnyaschih
	
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
 * jQuery element is extended with several methods.
 */
JW.apply(jQuery.fn, {
	/**
	 * Insert element to position with specified index inside current component.
	 * @param {jQuery} el Element to insert.
	 * @param {number} [index] Index of position to insert to. By default, appends the element.
	 * @returns {jQuery} this.
	 */
	insert: function(el, index) {
		var ths = this.eq(0);
		el = jQuery(el).eq(0);
		if (!JW.isSet(index)) {
			ths.append(el);
		} else if (index == 0) {
			ths.prepend(el);
		} else {
			jQuery(ths.children()[index - 1]).after(el);
		}
		return this;
	},
	
	/**
	 * Replace element with another element in DOM. Unlike standard replaceWith, doesn't kill the event listeners.
	 * @param {jQuery} el Element.
	 * @param {boolean} [attrs=false] Assign "id" attribute (if defined) and add all classes of current element
	 * to el.
	 * @returns {jQuery} this.
	 */
	replaceBy: function(el, attrs) {
		var ths = this.eq(0);
		var id = attrs ? ths.attr("id") : null,
			cls = attrs ? ths.attr("class") : null;
		
		el = jQuery(el).eq(0);
		ths.after(el);
		ths.detach();
		
		if (id) {
			el.attr("id", id);
		}
		if (cls) {
			el.addClass(cls);
		}
		return this;
	}
});
