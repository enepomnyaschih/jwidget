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
 * @class
 * Watches source {@link JW.Property property} modification and updates the
 * specified attribute of the DOM element.
 * Applied on initialization as well.
 *
 *     var title = new JW.Property("This is a tooltip");
 *     // Next command sets "title" attribute value to "This is a tooltip"
 *     var updater = new JW.UI.AttrUpdater($("#myelem"), "title", title);
 *     // Next command changes "title" attribute value to "Это подсказка"
 *     title.set("Это подсказка");
 *
 * @extends JW.Class
 *
 * @constructor
 * @param {jQuery} el DOM element.
 * @param {String} attr Element's attribute name.
 * @param {JW.Property} property `<String>` Source property.
 */
JW.UI.AttrUpdater = function(el, attr, property) {
	JW.UI.AttrUpdater._super.call(this);
	this.el = $(el);
	this.attr = attr;
	this.property = property;
	this._update();
	this.own(property.changeEvent.bind(this._update, this));
};

JW.extend(JW.UI.AttrUpdater, JW.Class, {
	/**
	 * @property {jQuery} el DOM element.
	 */
	/**
	 * @property {String} attr Element's attribute name.
	 */
	/**
	 * @property {JW.Property} property `<String>` Source property.
	 */
	
	_update: function() {
		this.el.attr(this.attr, this.property.get());
	}
});
