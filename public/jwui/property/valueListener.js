/*
	jWidget UI source file.

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
 * @deprecated 1.4 Use {@link jQuery#jwval jwval} instead.
 * @extends JW.Class
 *
 * @constructor
 * @param {jQuery} el DOM element.
 * @param {Object} [config] Configuration (see Config options). For backward compatibility, target property is allowed
 * here, {@link #cfg-simple simple} option is allowed as third argument, but this is a deprecated feature.
 * @param {Boolean} [simple=false]
 * If true, listens "change" event only. Defaults to false which enables
 * reaction to any real-time field modification.
 */
JW.UI.ValueListener = function(el, config, simple) {
	this._update = JW.inScope(this._update, this);
	JW.UI.ValueListener._super.call(this);
	config = (config instanceof JW.Property) ? {target: config, simple: simple} : (config || {});
	this.el = jQuery(el);
	this._targetCreated = config.target == null;
	this.target = this._targetCreated ? new JW.Property() : config.target;
	this.property = this.target;
	this.simple = config.simple || !JW.UI.isLifeInput(el);
	this._update();
	this.el.bind("change", this._update);
	if (!this.simple) {
		this._timer = setInterval(this._update, 100);
	}
};

JW.extend(JW.UI.ValueListener, JW.Class, {
	/**
	 * @cfg {JW.Property} target `<String>` Target property. By default, created automatically.
	 */
	/**
	 * @cfg {Boolean} simple
	 * If true, listens "change" event only. Defaults to false which enables
	 * reaction to any real-time field modification.
	 */
	/**
	 * @property {jQuery} el DOM element.
	 */
	/**
	 * @property {JW.Property} target `<String>` Target property.
	 */
	/**
	 * @property {JW.Property} property `<String>` Deprecated, use {@link #property-target target} instead.
	 * @deprecated
	 */

	destroyObject: function() {
		if (!this.simple) {
			clearInterval(this._timer);
		}
		this.el.unbind("change", this._update);
		if (this._targetCreated) {
			this.target.destroy();
		}
		this.el = null;
		this.target = null;
		this.property = null;
		this._super();
	},

	_update: function() {
		this.target.set(this.el.val());
	}
});
