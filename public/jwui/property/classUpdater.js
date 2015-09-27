/*
	jWidget UI source file.
	
	Copyright (C) 2015 Egor Nepomnyaschih
	
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
 * Watches source boolean {@link JW.Property property} modification and updates the
 * specified CSS class presence in the DOM element.
 * Applied on initialization as well.
 *
 *     var selected = new JW.Property(true);
 *     // Next command adds "selected" CSS class to element
 *     var updater = new JW.UI.ClassUpdater($("#myelem"), "selected", selected);
 *     // Next command removes "selected" CSS class from element
 *     selected.{@link JW.Property#set set}(false);
 *     // If helper is not needed anymore, destroy it to stop synchronization
 *     updater.{@link JW.UI.ClassUpdater#destroy destroy}();
 *
 * Method {@link jQuery#jwclass jwclass} is a shorthand for synchronizer creation.
 *
 *     var selected = new JW.Property(true);
 *     var updater = $("#myelem").{@link jQuery#jwclass jwclass}("selected", selected);
 *     selected.{@link JW.Property#set set}(false);
 *     updater.{@link JW.UI.ClassUpdater#destroy destroy}();
 *
 * @extends JW.Class
 *
 * @constructor
 * @param {jQuery} el DOM element.
 * @param {String} cls CSS class name.
 * @param {JW.Property} property `<Boolean>` Source property.
 */
JW.UI.ClassUpdater = function(el, cls, property) {
	JW.UI.ClassUpdater._super.call(this);
	this.el = jQuery(el);
	this.cls = cls;
	this.property = property;
	this._update();
	this.own(property.changeEvent.bind(this._update, this));
};

JW.extend(JW.UI.ClassUpdater, JW.Class, {
	/**
	 * @property {jQuery} el DOM element.
	 */
	/**
	 * @property {String} cls CSS class name.
	 */
	/**
	 * @property {JW.Property} property `<Boolean>` Source property.
	 */
	
	destroyObject: function() {
		this.el = null;
		this.property = null;
		this._super();
	},

	_update: function() {
		this.el.toggleClass(this.cls, !!this.property.get());
	}
});
