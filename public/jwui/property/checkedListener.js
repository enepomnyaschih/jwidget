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
 * Watches checkbox state modification and updates the value of the target boolean
 * {@link JW.Property property}.
 * Applied on initialization as well.
 *
 *     var listener = new JW.UI.CheckedListener($("#mycheckbox"));
 *     var checked = listener.{@link JW.UI.CheckedListener#property-target target};
 *     // Assume that the checkbox is unchecked initially
 *     assertEquals(false, value.{@link JW.Property#get get}());
 *     // Later on, user checked the checkbox
 *     assertEquals(true, value.{@link JW.Property#get get}());
 *
 * For backward binding, use JW.UI.PropUpdater, passing "checked" as a prop argument value.
 *
 * @extends JW.Class
 *
 * @constructor
 * @param {jQuery} el DOM element.
 * @param {Object} [config] Configuration (see Config options). For backward compatibility, target property is allowed
 * here, but this is a deprecated feature.
 */
JW.UI.CheckedListener = function(el, config) {
	this._update = JW.inScope(this._update, this);
	JW.UI.CheckedListener._super.call(this);
	config = (config instanceof JW.Property) ? {target: config} : (config || {});
	this.el = jQuery(el);
	this.target = config.target || this.own(new JW.Property());
	this.property = this.target;
	this._update();
	this.el.bind("change", this._update);
};

JW.extend(JW.UI.CheckedListener, JW.Class, {
	/**
	 * @cfg {JW.Property} target `<Boolean>` Target property. By default, created automatically.
	 */
	/**
	 * @property {jQuery} el DOM element.
	 */
	/**
	 * @property {JW.Property} target `<Boolean>` Target property.
	 */
	/**
	 * @property {JW.Property} property `<Boolean>` Deprecated, use {@link #property-target target} instead.
	 * @deprecated
	 */

	destroy: function() {
		this.el.unbind("change", this._update);
		this._super();
	},

	_update: function() {
		this.target.set(this.el.prop("checked"));
	}
});
