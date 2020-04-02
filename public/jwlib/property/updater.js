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
 * Watches source {@link JW.Property properties} modification and calls
 * the specified function passing property values as arguments. Also, the
 * function is called on updater initialization.
 *
 *     var frequency = new JW.Property(106.2);
 *     var wave = new JW.Property("FM");
 *     var updater = new JW.Updater([ frequency, wave ], function(frequency, wave) {
 *         console.log("Running radio on wave " + frequency + " " + wave);
 *     }, this); // output: Running radio on wave 106.2 FM
 *     frequency.{@link JW.Property#set set}(105); // output: Running radio on wave 105 FM
 *     wave.{@link JW.Property#set set}("USW"); // output: Running radio on wave 105 USW
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
	 * @returns {JW.Updater} this
	 */
	bind: function(event) {
		this.own(event.bind(this.update, this));
		return this;
	},
	
	/**
	 * Watches specified property and triggers updater's function call on
	 * the property change.
	 * @param {JW.Property} property Property.
	 * @returns {JW.Updater} this
	 */
	watch: function(property) {
		this.bind(property.changeEvent);
		return this;
	},
	
	/**
	 * Calls updater's function focibly.
	 */
	update: function() {
		var values = JW.Array.map(this.sources, JW.byMethod("get"));
		this.func.apply(this.scope, values);
	}
});
