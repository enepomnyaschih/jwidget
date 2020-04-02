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
 * the specified functions.
 *
 * {@link #init} function is called on switcher initialization and on property change. The new values of the properties
 * are passed as arguments.
 *
 * {@link #done} function is called on property change and on switcher destruction. The old values of the properties
 * are passed as arguments.
 *
 *     var property = new JW.Property(1);
 *     var switcher = new JW.Switcher([property], {
 *         {@link #init}: function(value) {
 *             console.log("Init " + value);
 *             return value + 1;
 *         },
 *         {@link #done}: function(value) {
 *             console.log("Done " + value);
 *         },
 *         {@link #scope}: this
 *     }); // output: Init 1
 *     property.{@link JW.Property#set set}(2); // output: Done 1, Init 2
 *     property.{@link JW.Property#set set}(null); // output: Done 2
 *     property.{@link JW.Property#set set}(3); // output: Init 3
 *     switcher.{@link #destroy}(); // output: Done 3
 *
 * By default, switcher doesn't calls the callbacks if at least one of the source values is null. You can change it
 * via {@link JW.Switcher#acceptNull acceptNull} option.
 *
 * Realistic use case for switcher is represented in next example:
 *
 *     this.selectedDocument = this.{@link JW.Class#own own}(new JW.Property());
 *     this.{@link JW.Class#own own}(new JW.Switcher([this.selectedDocument], {
 *         {@link #init}: function(document) {
 *             document.selected.{@link JW.Property#set set}(true);
 *         },
 *         {@link #done}: function(document) {
 *             document.selected.{@link JW.Property#set set}(false);
 *         },
 *         {@link #scope}: this
 *     }));
 *
 * @extends JW.Class
 *
 * @constructor
 * @param {Array} sources `<JW.Property>` Source properties.
 * @param {Object} config Configuration (see Config options).
 */
JW.Switcher = function(sources, config) {
	JW.Switcher._super.call(this);
	config = config || {};
	this.sources = sources;
	this.init = config.init;
	this.done = config.done;
	this.scope = config.scope || this;
	this.acceptNull = config.acceptNull || false;
	this._values = null;
	this._init();
	JW.Array.every(sources, this.watch, this);
};

JW.extend(JW.Switcher, JW.Class, {
	/**
	 * @property {Array} sources `<JW.Property>` Source properties.
	 */
	/**
	 * @cfg {Function} [init]
	 *
	 * `init(... sourceValues)`
	 *
	 * Optional. Value initialization function.
	 */
	/**
	 * @cfg {Function} [done]
	 *
	 * `done(... sourceValues)`
	 *
	 * Optional. Value releasing function.
	 */
	/**
	 * @cfg {Object} [scope]
	 * Optional. {@link #init} and {@link #done} call scope.
	 */
	/**
	 * @cfg {Boolean} [acceptNull=false]
	 * Optional. If false, functions won't be called if at least one of the source values is null.
	 */
	
	destroyObject: function() {
		this._done();
		this.sources = null;
		this.init = null;
		this.done = null;
		this.scope = null;
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
	 * Updates switcher forcibly.
	 */
	update: function() {
		this._done();
		this._init();
	},
	
	_init: function() {
		var values = JW.Array.map(this.sources, JW.byMethod("get"));
		this._values = (this.acceptNull || JW.Array.every(values, JW.isSet)) ? values : null;
		if (this._values && this.init) {
			this.init.apply(this.scope, this._values);
		}
	},
	
	_done: function() {
		if (this._values && this.done) {
			this.done.apply(this.scope, this._values);
		}
		this._values = null;
	}
});
