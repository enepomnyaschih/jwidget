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

import Destroyable from "./Destroyable";
import Dictionary from "./Dictionary";
import dummyEvent from "./dummyEvent";
import EventAttachment from "./EventAttachment";
import IEvent from "./IEvent";

/**
 * Real implementation of `Listenable` interface.
 * Used to notify some objects (clients) about certain events (for example, field value change).
 */
export default class Event<P> implements IEvent<P> {
	private _attachments: Dictionary<EventAttachment<P>> = null;

	/**
	 * Checks if this event is dummy. This knowledge may help you do certain code optimizations.
	 */
	get dummy() {
		return false;
	}

	/**
	 * Unbinds all event handlers.
	 */
	purge() {
		this._attachments = null;
	}

	/**
	 * Starts listening to the event.
	 *
	 * Whenever the event is triggered with `trigger` method, specified handler function
	 * is called in specified scope.
	 *
	 * You can stop listening the event by destroying the returned EventAttachment instance.
	 *
	 * @param handler Event handler function.
	 * @param scope `handler` call scope.
	 */
	listen(handler: (params: P) => any, scope?: any): Destroyable {
		if (this._attachments === null) {
			this._attachments = {};
		}
		const attachment = new EventAttachment<P>(this, handler, scope);
		this._attachments[attachment.iid] = attachment;
		return attachment;
	}

	/**
	 * Triggers event, i.e. calls all bound handlers.
	 *
	 * @param params Event params.
	 */
	trigger(params?: P) {
		if (this._attachments === null) {
			return;
		}
		for (var iid in this._attachments) {
			var attachment = this._attachments[iid];
			attachment.handler.call(attachment.scope || attachment, params);
		}
	}

	/**
	 * @hidden
	 */
	_unbind(attachment: EventAttachment<P>) {
		if (this._attachments !== null) {
			delete this._attachments[attachment.iid];
		}
	}

	/**
	 * If `dummy` argument is false, returns a new instance of `Event`. Else returns `dummyEvent`.
	 * @param dummy Determines if dummy event should be used.
	 */
	static make<P>(dummy: boolean): IEvent<P> {
		return dummy ? dummyEvent : new Event<P>();
	}
}
