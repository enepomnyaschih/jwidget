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
 *
 * Result of {@link jQuery#jwon jwon} method call. Destroy it to unbind event handler.
 *
 * @extends JW.Class
 *
 * @constructor
 * Creates the attachment, subscribes to the event. Shorthand: {@link jQuery#jwon jwon}
 * @param {jQuery} el jQuery element collection.
 * @param {string} events One or more space-separated event types and optional namespaces, such as "click" or "keydown.myPlugin".
 * @param {string} selector A selector string to filter the descendants of the selected elements that trigger the event. If the selector is null or omitted, the event is always triggered when it reaches the selected element.
 * @param {Function} handler
 *
 * `handler(event: Event, target: DOMElement)`
 *
 * A function to execute when the event is triggered. The value `false` is also allowed as a shorthand for a function that simply does `return false`.
 *
 * @param {Object} [scope] Function call scope.
 */
JW.UI.JQEventAttachment = function(el, events, selector, handler, scope) {
	JW.UI.JQEventAttachment._super.call(this);
	this.el = el;
	this.events = events;
	if (typeof selector === "function" || typeof selector === "boolean") {
		scope = handler;
		handler = selector;
		selector = null;
	}
	this.selector = selector;
	if (scope && typeof handler === "function") {
		this.handler = function(event) {
			return handler.call(scope || this, event, this);
		};
	} else {
		this.handler = handler;
	}
	el.on(events, this.selector, this.handler);
};

JW.extend(JW.UI.JQEventAttachment, JW.Class, {
	destroyObject: function() {
		this.el.off(this.events, this.selector, this.handler);
		this._super();
	}
});
