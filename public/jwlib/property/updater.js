/*
	jWidget Lib source file.
	
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
 * Watches source {@link JW.Property properties} modification and calls
 * the specified function passing property values as arguments. Also, the
 * function is called on updater initialization.
 *
 *     var frequency = new JW.Property(106.2);
 *     var wave = new JW.Property("FM");
 *     var updater = new JW.Updater([ frequency, wave ], function(frequency, wave) {
 *         console.log("Running radio player on wave " + frequency + " " + wave);
 *     }, this);
 *
 * @extends JW.Class
 *
 * @constructor
 * @param {Array} source `<JW.Property>` Source properties.
 *
 * @param {Function} func
 *
 * `func(... sourceValues)`
 *
 * Callback function.
 *
 * @param {Object} scope Function call scope.
 */
JW.Updater = function(sources, func, scope) {
	JW.Updater._super.call(this);
	config = config || {};
	this.sources = sources;
	this.func = func;
	this.scope = scope || this;
	this.update();
	JW.Array.every(sources, this.watch, this);
};

JW.extend(JW.Updater, JW.Class, {
	/**
	 * @property {Array} sources `<JW.Property>` Source properties.
	 */
	
	/**
	 * Watches specified event and triggers updater's function call on
	 * the event triggering.
	 * @param {JW.Event} event Event.
	 * @returns this
	 */
	bind: function(event) {
		this.own(event.bind(this.update, this));
		return this;
	},
	
	/**
	 * Watches specified property and triggers updater's function call on
	 * the property change.
	 * @param {JW.Property} property Property.
	 * @returns this
	 */
	watch: function(property) {
		return this.bind(property.changeEvent);
	},
	
	/**
	 * Calls updater's function focibly.
	 */
	update: function() {
		var values = JW.Array.map(this.sources, JW.byMethod("get"));
		this.func.apply(this.scope, values);
	}
});
