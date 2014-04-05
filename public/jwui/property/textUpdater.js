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
 * inner text of the DOM element.
 * Applied on initialization as well.
 *
 *     var text = new JW.Property("I like cats");
 *     // Next command sets element text to "I like cats"
 *     var updater = new JW.UI.TextUpdater($("#myelem"), text);
 *     // Next command changes element text to "Everyone likes cats"
 *     text.{@link JW.Property#set set}("Everyone likes cats");
 *
 * @extends JW.Class
 *
 * @constructor
 * @param {jQuery} el DOM element.
 * @param {JW.Property} property `<String>` Source property.
 */
JW.UI.TextUpdater = function(el, property) {
	JW.UI.TextUpdater._super.call(this);
	this.el = $(el);
	this.property = property;
	this._update();
	this.own(property.changeEvent.bind(this._update, this));
};

JW.extend(JW.UI.TextUpdater, JW.Class, {
	/**
	 * @property {jQuery} el DOM element.
	 */
	/**
	 * @property {JW.Property} property `<String>` Source property.
	 */
	
	_update: function() {
		this.el.text(this.property.get());
	}
});
