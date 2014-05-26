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
 * Watches source string {@link JW.Property property} modification and selects a corresponding radio.
 * Applied on initialization as well.
 *
 *     var value = new JW.Property("apple");
 *     // Next command selects a radio with value "apple" in a group
 *     var updater = new JW.UI.RadioUpdater($("#myform"), "myradio", value);
 *     // Next command selects a radio with value "banana" in a group
 *     value.{@link JW.Property#set set}("banana");
 *
 * All radios must have the same "name" attribute value.
 *
 * For backward binding, use JW.UI.RadioListener.
 *
 * @extends JW.Class
 *
 * @constructor
 * @param {jQuery} el Container DOM element.
 * @param {String} name Radios "name" attribute.
 * @param {JW.Property} property `<String>` Source property.
 */
JW.UI.RadioUpdater = function(el, name, property) {
	JW.UI.RadioUpdater._super.call(this);
	this.el = jQuery(el);
	this.name = name;
	this.property = property;
	this._selector = "input[type=radio][name='" + name + "']";
	this._update();
	this.own(property.changeEvent.bind(this._update, this));
};

JW.extend(JW.UI.RadioUpdater, JW.Class, {
	/**
	 * @property {jQuery} el Container DOM element.
	 */
	/**
	 * @property {String} name Radios "name" attribute.
	 */
	/**
	 * @property {JW.Property} property `<String>` Source property.
	 */
	
	_update: function() {
		var value = this.property.get();
		if (JW.isSet(value)) {
			var els = this.el.find(this._selector + "[value='" + value + "']");
			if (els.length !== 0) {
				els.prop("checked", true).change();
				return;
			}
		}
		this.el.find(this._selector + ":checked").prop("checked", false).change();
	}
});
