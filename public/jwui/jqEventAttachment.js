/*
	jWidget UI source file.
	
	Copyright (C) 2015 Egor Nepomnyaschih
	
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
