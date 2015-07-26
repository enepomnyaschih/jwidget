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
 * jQuery event attachment adapter.
 *
 * - Allows you to use jQuery events in conjunction with jWidget object aggregation feature.
 * Attachment destruction results in event unbinding.
 * - Allows you to pass callback context.
 * - However, it doesn't support "data" argument - use closures instead.
 *
 * Method {@link jQuery#jwon jwon} is a shorthand for adapter creation.
 *
 * **Example**
 *
 * Assume you have the next class:
 *
 *     var MyForm = function(el) {
 *         this._onSubmit = JW.inScope(this._onSubmit, this);
 *         this._onTextChange = JW.inScope(this._onTextChange, this);
 *         MyForm.{@link JW.Class#static-property-_super _super}.call(this);
 *         el.on("submit", this._onSubmit);
 *         el.on("change", "input[type=text]", this._onTextChange);
 *     };
 *
 *     JW.extend(MyForm, JW.Class, {
 *         _onSubmit: function(event) {...},
 *         _onTextChange: function(event) {...},
 *
 *         {@link #destroy}: function() {
 *             el.off("submit", this._onSubmit);
 *             el.off("change", "input[type=text]", this._onTextChange);
 *             this.{@link #_super}();
 *         }
 *     });
 *
 * Thanks to the adapter, we can remove the overhead of locking the method call context and
 * explicit event unsubscribing in the #destroy method:
 *
 *     var MyForm = function(el) {
 *         MyForm.{@link JW.Class#static-property-_super _super}.call(this);
 *         this.own(el.{@link jQuery#jwon jwon}("submit", this._onSubmit, this));
 *         this.own(el.{@link jQuery#jwon jwon}("change", "input[type=text]", this._onTextChange, this));
 *     };
 *
 *     JW.extend(MyForm, JW.Class, {
 *         _onSubmit: function(event, target) {...},
 *         _onTextChange: function(event, target) {...}
 *     });
 *
 * Notice that event target which jQuery usually assigns the call context to is passed as a second callback argument.
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
	if (typeof selector === "function") {
		scope = handler;
		handler = selector;
		selector = null;
	}
	this.selector = selector;
	if (scope) {
		this.handler = function(event) {
			handler.call(scope || this, event, this);
		};
	} else {
		this.handler = handler;
	}
	el.on(events, this.selector, this.handler);
};

JW.extend(JW.UI.JQEventAttachment, JW.Class, {
	destroy: function() {
		this.el.off(this.events, this.selector, this.handler);
		this._super();
	}
});
