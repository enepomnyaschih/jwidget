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
 * @deprecated 1.4 Use {@link jQuery#jwprop jwprop} instead.
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
	this._targetCreated = config.target == null;
	this.target = this._targetCreated ? new JW.Property() : config.target;
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

	destroyObject: function() {
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
		this.target.set(this.el.prop("checked"));
	}
});
