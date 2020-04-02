/*
MIT License

Copyright (c) 2020 Egor Nepomnyaschih

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
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
