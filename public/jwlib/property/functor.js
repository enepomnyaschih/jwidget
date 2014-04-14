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
 * Also, functor lets you destroy the previously created value. To do this,
 * construct a functor with next notation:
 *
 *     var document = new JW.Property();
 *     var documentView = new JW.Property();
 *     new JW.Functor([ document ], {
 *         target: documentView,
 *         createValue: function(document) {
 *             return new DocumentView(document);
 *         },
 *         destroyValue: function(documentView, document) {
 *             documentView.destroy();
 *         },
 *         scope: this
 *     });
 *
 * On source property change, next flow will have a place:
 * 1. New value is created
 * 1. Target property is set to new value
 * 1. Old value is destroyed
 *
 * In contrast, JW.Switcher's flow is opposite:
 * 1. {@link JW.Switcher#done done} method is called
 * 1. {@link JW.Switcher#init init} method is called
 *
 * Another difference is that functor accepts null source value when switcher ignores it.
 *
 * In #destroyValue is defined, then target property is reset to null on functor destruction.
 *
 * @extends JW.Class
 *
 * @constructor
 * @param {Array} source `<JW.Property>` Source properties.
 *
 * @param {Function} [createValue]
 *
 * `createValue(... sourceValues): T`
 *
 * Calculates target property value based on source property values.
 *
 * @param {Object} [scope] Function call scope.
 * @param {Object} [config] Configuration (see Config options).
 */
JW.Functor = function(sources, createValue, scope, config) {
	JW.Functor._super.call(this);
	if (typeof createValue === "function") {
		config = JW.apply({}, config, {
			createValue: createValue,
			scope: scope
		});
	} else {
		config = createValue || {};
	}
	this.sources = sources;
	this.createValue = config.createValue;
	this.destroyValue = config.destroyValue;
	this.scope = config.scope || this;
	this.target = config.target || this.own(new JW.Property());
	this._values = null;
	this.update();
	JW.Array.every(sources, this.watch, this);
};

JW.extend(JW.Functor, JW.Class, {
	/**
	 * @cfg {JW.Property} target
	 * `<T>` Target property. By default, created automatically.
	 */
	/**
	 * @cfg {Function} createValue
	 *
	 * `createValue(... sourceValues): T`
	 *
	 * Calculates target property value based on source property values.
	 */
	/**
	 * @cfg {Function} [destroyValue]
	 *
	 * `destroyValue(targetValue: T, ... sourceValues)`
	 *
	 * Destroys target property value.
	 */
	/**
	 * @cfg {Object} scope
	 * Call scope of #createValue and #destroyValue.
	 */
	/**
	 * @property {Array} sources `<JW.Property>` Source properties.
	 */
	/**
	 * @property {JW.Property} target `<T>` Target property.
	 */
	
	// override
	destroy: function() {
		if (this.destroyValue && this._values) {
			var oldValue = this.target.get();
			this.target.set(null);
			this.destroyValue.apply(this.scope, [oldValue].concat(this._values));
		}
		this._values = null;
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
		var oldValue = this.target.get();
		var newValue = this.createValue.apply(this.scope, values);
		if (oldValue !== newValue) {
			this.target.set(newValue);
			if (this.destroyValue && this._values) {
				this.destroyValue.apply(this.scope, [oldValue].concat(this._values));
			}
			this._values = values;
		}
	}
});
