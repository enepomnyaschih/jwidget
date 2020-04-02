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
 * jWidget wrapper over setTimeout function.
 * JW.Timeout destruction causes clearTimeout invocation.
 * Convenient to use in combination with {@link JW.Class#own} method:
 *
 *     this.{@link JW.Class#own own}(new JW.Timeout(this._update, this, 1000));
 *
 * @extends JW.Class
 *
 * @constructor
 * @param {Function} handler Timeout handler function.
 * @param {Object} [scope] Call scope of handler.
 * @param {Number} [delay] Timeout delay.
 */
JW.Timeout = function(handler, scope, delay) {
	JW.Timeout._super.call(this);
	if (JW.isSet(scope) && (typeof scope === "object")) {
		handler = JW.inScope(handler, scope);
	} else if (typeof scope === "number") {
		delay = scope;
	}
	this.timeout = setTimeout(handler, delay);
};

JW.extend(JW.Timeout, JW.Class, {
	destroyObject: function() {
		clearTimeout(this.timeout);
		this._super();
	}
});
