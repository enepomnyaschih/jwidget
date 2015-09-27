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
 * specified property of the DOM element.
 * Applied on initialization as well.
 *
 *     var checked = new JW.Property(true);
 *     // Next command checks the checkbox
 *     var updater = new JW.UI.PropUpdater($("#myelem"), "checked", checked);
 *     // Next command unchecks the checkbox
 *     checked.{@link JW.Property#set set}(false);
 *     // If helper is not needed anymore, destroy it to stop synchronization
 *     updater.{@link JW.UI.PropUpdater#destroy destroy}();
 *
 * Method {@link jQuery#jwprop jwprop} is a shorthand for synchronizer creation.
 *
 *     var checked = new JW.Property(true);
 *     var updater = $("#myelem").{@link jQuery#jwprop jwprop}("checked", checked);
 *     checked.{@link JW.Property#set set}(false);
 *     updater.{@link JW.UI.PropUpdater#destroy destroy}();
 *
 * For backward binding, use JW.UI.CheckedListener for checkboxes and JW.UI.RadioListener for radios.
 *
 * @extends JW.Class
 *
 * @constructor
 * @param {jQuery} el DOM element.
 * @param {String} prop Element's property name.
 * @param {JW.Property} property `<Boolean>` Source property.
 */
JW.UI.PropUpdater = function(el, prop, property) {
	JW.UI.PropUpdater._super.call(this);
	this.el = jQuery(el);
	this.prop = prop;
	this.property = property;
	this._update();
	this.own(property.changeEvent.bind(this._update, this));
};

JW.extend(JW.UI.PropUpdater, JW.Class, {
	/**
	 * @property {jQuery} el DOM element.
	 */
	/**
	 * @property {String} prop Element's property name.
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
		this.el.prop(this.prop, this.property.get());
		if (this.prop === "checked") {
			this.el.change();
		}
	}
});
