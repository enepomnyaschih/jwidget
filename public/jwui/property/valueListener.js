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
 * Watches DOM element value modification and updates the value of the target
 * {@link JW.Property property}.
 * Applied on initialization as well.
 *
 *     var value = new JW.Property();
 *     var listener = new JW.UI.ValueListener($("#myelem"), value);
 *     // Assume that the element is a blank field initially
 *     assertEquals("", value.{@link JW.Property#get get}());
 *     // Later on, user entered "foo" in the field
 *     assertEquals("foo", value.{@link JW.Property#get get}());
 *
 * @extends JW.Class
 *
 * @constructor
 * @param {jQuery} el DOM element.
 * @param {JW.Property} property `<String>` Target property.
 */
JW.UI.ValueListener = function(el, property) {
	this._update = JW.inScope(this._update, this);
	JW.UI.ValueListener._super.call(this);
	this.el = $(el);
	this.property = property;
	this._update();
	this.el.bind("change", this._update);
};

JW.extend(JW.UI.ValueListener, JW.Class, {
	/**
	 * @property {jQuery} el DOM element.
	 */
	/**
	 * @property {JW.Property} property `<String>` Target property.
	 */
	
	destroy: function() {
		this.el.unbind("change", this._update);
		this._super();
	},
	
	_update: function() {
		this.property.set(this.el.val());
	}
});
