/*
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
	constructor(private el: JQuery, private events: string, private arg1: any, private arg2?: any) {
		el.on(events, arg1, arg2);
	}

	destroy() {
		this.el.off(this.events, this.arg1, this.arg2);
	}
}

/**
 * Attaches handler to an event. jWidget extension for jQuery "on" method returning the destroyable event attachment.
 *
 * @param events One or more space-separated event types and optional namespaces, such as "click" or "keydown.myPlugin".
 * @param handler A function to execute when the event is triggered. The value `false` is also allowed as a shorthand for a function that simply does `return false`.
 */
export default function on(el: JQuery, events: string, handler: (eventObject: JQueryEventObject) => any): Destroyable;

/**
 * @param events One or more space-separated event types and optional namespaces, such as "click" or "keydown.myPlugin".
 * @param selector A selector string to filter the descendants of the selected elements that trigger the event. If the selector is null or omitted, the event is always triggered when it reaches the selected element.
 * @param handler A function to execute when the event is triggered. The value `false` is also allowed as a shorthand for a function that simply does `return false`.
 */
export default function on(el: JQuery, events: string, selector: string, handler: (eventObject: JQueryEventObject) => any): Destroyable;
export default function on(el: JQuery, events: string, arg1: any, arg2?: any): Destroyable {
	return new JQEventAttachment(el, events, arg1, arg2);
}
