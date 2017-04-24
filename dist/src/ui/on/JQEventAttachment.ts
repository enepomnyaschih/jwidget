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

import Destroyable from '../../Destroyable';

/**
 * Result of [[JQuery.jwon|jwon]] method call. Destroy it to unbind event handler.
 */
class JQEventAttachment implements Destroyable {
	private selector: string;
	private handler: (eventObject: JQueryEventObject) => any;

	/**
	 * Creates the attachment, subscribes to the event. Shorthand: [[JQuery.jwon|jwon]]
	 * @param el jQuery element collection.
	 * @param events One or more space-separated event types and optional namespaces, such as "click" or "keydown.myPlugin".
	 * @param handler A function to execute when the event is triggered. The value `false` is also allowed as a shorthand for a function that simply does `return false`.
	 * @param scope Function call scope.
	 */
	constructor(el: JQuery, events: string, handler: (eventObject: JQueryEventObject) => any, scope?: any)

	/**
	 * Creates the attachment, subscribes to the event. Shorthand: [[JQuery.jwon|jwon]]
	 * @param el jQuery element collection.
	 * @param events One or more space-separated event types and optional namespaces, such as "click" or "keydown.myPlugin".
	 * @param selector A selector string to filter the descendants of the selected elements that trigger the event. If the selector is null or omitted, the event is always triggered when it reaches the selected element.
	 * @param handler A function to execute when the event is triggered. The value `false` is also allowed as a shorthand for a function that simply does `return false`.
	 * @param scope Function call scope.
	 */
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

	/**
	 * @inheritdoc
	 */
	destroy() {
		this.el.off(this.events, this.selector, this.handler);
	}
}

export default JQEventAttachment;
