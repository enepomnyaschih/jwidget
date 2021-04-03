/*
MIT License

Copyright (c) 2021 Egor Nepomnyaschih

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

import Destroyable from './Destroyable';

class JQEventAttachment implements Destroyable {
	constructor(private el: JQuery<any>, private events: string, private arg1: any, private arg2?: any) {
		el.on(events, arg1, arg2);
	}

	destroy() {
		this.el.off(this.events, this.arg1, this.arg2);
	}
}

/**
 * Attaches handler to an event. jWidget extension for jQuery "on" method returning the destroyable event attachment.
 *
 * @param el DOM element.
 * @param events One or more space-separated event types and optional namespaces, such as "click" or "keydown.myPlugin".
 * @param handler A function to execute when the event is triggered. The value `false` is also allowed as a shorthand for a function that simply does `return false`.
 */
export default function listen(el: JQuery<any>, events: string, handler: (eventObject: JQuery.Event) => any): Destroyable;

/**
 * @param el DOM element.
 * @param events One or more space-separated event types and optional namespaces, such as "click" or "keydown.myPlugin".
 * @param selector A selector string to filter the descendants of the selected elements that trigger the event. If the selector is null or omitted, the event is always triggered when it reaches the selected element.
 * @param handler A function to execute when the event is triggered. The value `false` is also allowed as a shorthand for a function that simply does `return false`.
 */
export default function listen(el: JQuery<any>, events: string, selector: string, handler: (eventObject: JQuery.Event) => any): Destroyable;
export default function listen(el: JQuery<any>, events: string, arg1: any, arg2?: any): Destroyable {
	return new JQEventAttachment(el, events, arg1, arg2);
}
