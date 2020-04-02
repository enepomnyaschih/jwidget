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
 *
 * `<T>` jWidget object adapter. JW.Class wrapper of arbitrary value.
 *
 * Since some jWidget classes work with JW.Class instances only (for example, JW.AbstractSet),
 * the library provides a simple adapter for any objects and values conversion to JW.Class.
 *
 * If you want to track the value and react on its modification, use JW.Property instead.
 *
 * @extends JW.Class
 *
 * @constructor
 * @param {T} value Object.
 */
JW.Proxy = function(value) {
	JW.Proxy._super.call(this);
	this.value = value;
	this._ownsValue = false;
};

JW.extend(JW.Proxy, JW.Class, {
	/**
	 * @property {T} value Object.
	 * @deprecated
	 */
	// boolean _ownsValue;
	
	destroyObject: function() {
		if (this._ownsValue && JW.isSet(this.value)) {
			this.value.destroy();
		}
		this.value = null;
		this._super();
	},
	
	/**
	 * Returns object.
	 * @returns {V} Object.
	 */
	get: function() {
		return this.value;
	},
	
	/**
	 * Changes object.
	 * @param {V} value
	 */
	set: function(value) {
		var oldValue = this.value;
		if (oldValue === value) {
			return;
		}
		this.value = value;
		if (this._ownsValue && JW.isSet(oldValue)) {
			oldValue.destroy();
		}
	},
	
	/**
	 * Makes this proxy an owner of its value. It means that the value will
	 * be destroyed automatically on destruction of the proxy.
	 * @returns {JW.Property} this
	 */
	ownValue: function() {
		this._ownsValue = true;
		return this;
	}
});
