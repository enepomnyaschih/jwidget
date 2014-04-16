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
 * Watches source boolean {@link JW.Property property} modification and updates
 * visibility of the DOM element. To make element invisible, sets "display: none" inline style. To make
 * element visible, removes "display" inline style. Make sure that element is visible by your CSS rules.
 * Applied on initialization as well.
 *
 *     var visible = new JW.Property(true);
 *     // Next command makes element visible
 *     var updater = new JW.UI.VisibleUpdater($("#myelem"), visible);
 *     // Next command makes element invisible
 *     visible.{@link JW.Property#set set}(false);
 *
 * @extends JW.Class
 *
 * @constructor
 * @param {jQuery} el DOM element.
 * @param {JW.Property} property `<Boolean>` Source property.
 */
JW.UI.VisibleUpdater = function(el, property) {
	JW.UI.VisibleUpdater._super.call(this);
	this.el = jQuery(el);
	this.property = property;
	this._update();
	this.own(property.changeEvent.bind(this._update, this));
};

JW.extend(JW.UI.VisibleUpdater, JW.Class, {
	/**
	 * @property {jQuery} el DOM element.
	 */
	/**
	 * @property {JW.Property} property `<String>` Source property.
	 */
	
	_update: function() {
		this.el.css("display", this.property.get() ? "" : "none");
	}
});
