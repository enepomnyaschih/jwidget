/*!
	jWidget 2
	Copyright (C) 2017  Egor Nepomnyaschih
	enepomnyaschih@gmail.com
	https://github.com/enepomnyaschih/jwidget

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

/// <reference types="jquery" />

import Destroyable from '../Destroyable';

class JQEventAttachment implements Destroyable {
	private selector: string;
	private handler: (eventObject: JQueryEventObject) => any;

	constructor(el: JQuery, events: string, handler: (eventObject: JQueryEventObject) => any, scope?: any)
	constructor(el: JQuery, events: string, selector: string, handler: (eventObject: JQueryEventObject) => any, scope?: any)
	constructor(private el: JQuery, private events: string, selector: any, handler?: any, scope?: any) {
		if (typeof selector === "function" || typeof selector === "boolean") {
			scope = handler;
			handler = selector;
			selector = null;
		}
		this.selector = selector;
		if (scope && typeof handler === "function") {
			this.handler = (eventObject) => handler.call(scope || this, eventObject, this);
		} else {
			this.handler = handler;
		}
		el.on(events, this.selector, this.handler);
	}

	destroy() {
		this.el.off(this.events, this.selector, this.handler);
	}
}

/**
 * Attaches handler to an event. jWidget extension for <a href="http://api.jquery.com/on/" target="_blank">on</a>
 * method which has the next features.
 *
 * ### 1. Aggregation
 *
 * The method returns event attachment object. Its destruction results in event unbinding which allows you to use
 * jQuery events in conjunction with [[JW.Class.own|own]] method.
 *
 *     // Bind a handler to "mousemove" event and aggregate the attachment
 *     this.own($(window).jwon("mousemove", function(event) {
 *         $(".output").text(event.pageX + ":" + event.pageY);
 *     }, this));
 *
 * ### 2. Call context argument
 *
 * The method accepts callback context as an argument which allows you to avoid JW.inScope
 * and <a href="http://api.jquery.com/jQuery.proxy/" target="_blank">jQuery.proxy</a> usage.
 *
 *     // On button click, destroy this component
 *     el.jwon("click", this.destroy, this);
 *
 * Event target which jQuery usually assigns the call context to is passed as a second callback argument.
 *
 *     el.jwon("click", function(event, target) { ... }, this);
 *
 * The method doesn't support "data" argument - please use closures instead.
 *
 * <iframe style="border: 1px solid green; padding: 10px;" width="730" height="200" src="http://enepomnyaschih.github.io/mt/1.4/jwui-jwon.html"></iframe>
 *
 * @param events One or more space-separated event types and optional namespaces, such as "click" or "keydown.myPlugin".
 * @param handler A function to execute when the event is triggered. The value `false` is also allowed as a shorthand for a function that simply does `return false`.
 * @param scope Function call scope.
 */
export default function on(el: JQuery, events: string, handler: (eventObject: JQueryEventObject) => any, scope?: any): Destroyable;

/**
 * @param events One or more space-separated event types and optional namespaces, such as "click" or "keydown.myPlugin".
 * @param selector A selector string to filter the descendants of the selected elements that trigger the event. If the selector is null or omitted, the event is always triggered when it reaches the selected element.
 * @param handler A function to execute when the event is triggered. The value `false` is also allowed as a shorthand for a function that simply does `return false`.
 * @param scope Function call scope.
 */
export default function on(el: JQuery, events: string, selector: string, handler: (eventObject: JQueryEventObject) => any, scope?: any): Destroyable;
export default function on(el: JQuery, events: string, selector: any, handler: any, scope?: any): Destroyable {
	return new JQEventAttachment(el, events, selector, handler, scope);
}
