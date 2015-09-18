/*
	jWidget Lib source file.
	
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
 * `<T>` Watches source {@link JW.Property properties} modification and updates
 * a target property based on their values.
 *
 *     var value = new JW.Property(1000);
 *     var unit = new JW.Property("MW");
 *     var target = new JW.Property();
 *     var functor = new JW.Functor([ value, unit ], function(value, unit) {
 *         return value + " " + unit;
 *     }, this, { {@link #cfg-target target}: target });
 *     assert("1000 MW", target.{@link JW.Property#get get}());
 *     value.{@link JW.Property#set set}(1500);
 *     assert("1500 MW", target.{@link JW.Property#get get}());
 *     unit.{@link JW.Property#set set}("МВт"); // change localization to Russian
 *     assert("1500 МВт", target.{@link JW.Property#get get}());
 *
 * If target is omitted in constructor, it is created automatically. Notice
 * that functor owns it in this case.
 *
 *     var value = new JW.Property(1000);
 *     var unit = new JW.Property("MW");
 *     var functor = new JW.Functor([ value, unit ], function(value, unit) {
 *         return value + " " + unit;
 *     }, this);
 *     var target = functor.{@link #property-target target};
 *     assert("1000 MW", target.{@link JW.Property#get get}());
 *
 * Functor doesn't let you destroy a previously assigned value. Functor doesn't reset the value of target property
 * on destruction. Use JW.Mapper if you need these features.
 *
 * @extends JW.Class
 *
 * @constructor
 * @param {Array} source `<JW.Property>` Source properties.
 *
 * @param {Function} func
 *
 * `func(... sourceValues): T`
 *
 * Calculates target property value based on source property values.
 *
 * @param {Object} scope Function call scope.
 * @param {Object} [config] Configuration (see Config options).
 */
JW.Functor = function(sources, func, scope, config) {
	JW.Functor._super.call(this);
	config = config || {};
	this.sources = sources;
	this.func = func;
	this.scope = scope || this;
	this._targetCreated = config.target == null;
	this.target = this._targetCreated ? new JW.Property() : config.target;
	this.update();
	JW.Array.every(sources, this.watch, this);
};

JW.extend(JW.Functor, JW.Class, {
	/**
	 * @cfg {JW.Property} [target]
	 * `<T>` Optional. Target property. By default, created automatically.
	 */
	/**
	 * @property {Array} sources `<JW.Property>` Source properties.
	 */
	/**
	 * @property {JW.Property} target `<T>` Target property.
	 */

	destroyObject: function() {
		if (this._targetCreated) {
			this.target.destroy();
		}
		this.sources = null;
		this.target = null;
		this.func = null;
		this.scope = null;
		this._super();
	},
	
	/**
	 * Watches specified event and triggers target value recalculation on
	 * the event triggering.
	 * @param {JW.Event} event Event.
	 * @returns {JW.Functor} this
	 */
	bind: function(event) {
		this.own(event.bind(this.update, this));
		return this;
	},
	
	/**
	 * Watches specified property and triggers target value recalculation on
	 * the property change.
	 * @param {JW.Property} property Property.
	 * @returns {JW.Functor} this
	 */
	watch: function(property) {
		this.bind(property.changeEvent);
		return this;
	},
	
	/**
	 * Updates target property focibly.
	 */
	update: function() {
		var values = JW.Array.map(this.sources, JW.byMethod("get"));
		this.target.set(this.func.apply(this.scope, values));
	}
});
