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
 * Watches selection modification in radio group and updates the value of the target string
 * {@link JW.Property property}.
 * Applied on initialization as well.
 *
 *     var selected = new JW.Property();
 *     var listener = new JW.UI.RadioListener($("#myform"), "myradio", value);
 *     // Assume that the radio with value "apple" is selected initially
 *     assertEquals("apple", value.{@link JW.Property#get get}());
 *     // Later on, user selected "banana" radio
 *     assertEquals("banana", value.{@link JW.Property#get get}());
 *
 * Notice that the object binds an event listener to a container element and uses bubbling mechanism to detect the
 * selection modification. That's why you must avoid bubbling interruption in child elements of the container.
 * All radios must have the same "name" attribute value. If neighter radio is selected, property is set to null.
 *
 * For backward binding, use JW.UI.RadioUpdater.
 *
 * @extends JW.Class
 *
 * @constructor
 * @param {jQuery} el Container DOM element.
 * @param {String} name Radios "name" attribute.
 * @param {JW.Property} property `<String>` Target property.
 */
JW.UI.RadioListener = function(el, name, property) {
	this._update = JW.inScope(this._update, this);
	JW.UI.RadioListener._super.call(this);
	this.el = jQuery(el);
	this.name = name;
	this.property = property;
	this._selector = "input[type=radio][name='" + name + "']";
	this._update();
	this.el.on("change", this._selector, this._update);
};

JW.extend(JW.UI.RadioListener, JW.Class, {
	/**
	 * @property {jQuery} el Container DOM element.
	 */
	/**
	 * @property {String} name Radios "name" attribute.
	 */
	/**
	 * @property {JW.Property} property `<String>` Target property.
	 */
	
	destroy: function() {
		this.el.off("change", this._selector, this._update);
		this._super();
	},
	
	_update: function() {
		var radio = this.el.find(this._selector + ":checked");
		this.property.set((radio.length !== 0) ? radio.attr("value") : null);
	}
});
