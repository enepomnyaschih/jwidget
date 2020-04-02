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
 * `<V>` Watches source {@link JW.Property property} modification and copies
 * its value to target property.
 *
 *     var source = new JW.Property(1);
 *     var target = new JW.Property();
 *     var copier = new JW.Copier(source, { {@link #cfg-target target}: target });
 *     assert(1, target.{@link JW.Property#get get}());
 *     source.{@link JW.Property#set set}(2);
 *     assert(2, target.{@link JW.Property#get get}());
 *
 * If target is omitted in constructor, it is created automatically. Notice
 * that copier owns it in this case.
 *
 *     var source = new JW.Property(1);
 *     var target = new JW.Copier(this.source).{@link #property-target target};
 *     assert(1, target.{@link JW.Property#get get}());
 *
 * JW.Property has a shorthand method {@link JW.Property#bindTo bindTo}:
 *
 *     var source = new JW.Property(1);
 *     var target = new JW.Property();
 *     target.{@link JW.Property#bindTo bindTo}(source);
 *     assert(1, target.{@link JW.Property#get get}());
 *
 * @extends JW.Class
 *
 * @constructor
 * @param {JW.Property} source `<V>` Source property.
 * @param {Object} [config] Configuration (see Config options).
 */
JW.Copier = function(source, config) {
	JW.Copier._super.call(this);
	config = config || {};
	this.source = source;
	this._targetCreated = config.target == null;
	this.target = this._targetCreated ? new JW.Property() : config.target;
	this._update();
	this.own(source.changeEvent.bind(this._update, this));
};

JW.extend(JW.Copier, JW.Class, {
	/**
	 * @property {JW.Property} source `<V>` Source property.
	 */
	/**
	 * @cfg {JW.Property} target
	 * `<V>` Target property. By default, created automatically.
	 */
	/**
	 * @property {JW.Property} target `<V>` Target property.
	 */

	destroyObject: function() {
		if (this._targetCreated) {
			this.target.destroy();
		}
		this.source = null;
		this.target = null;
		this._super();
	},
	
	_update: function() {
		this.target.set(this.source.get());
	}
});
