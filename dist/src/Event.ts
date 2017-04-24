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

import Destroyable from "./Destroyable";
import Dictionary from "./Dictionary";
import dummyEvent from "./dummyEvent";
import EventAttachment from "./EventAttachment";
import IClass from "./IClass";
import IEvent from "./IEvent";

/**
 * Real implementation of `Bindable` interface.
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
	 * Class destructor invocation method. Unbinds all event handlers.
	 * As opposed to the majority of classes, you can call event's `destroy` method multiple times.
	 */
	destroy() {
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
	bind(handler: (params: P) => void, scope?: any): Destroyable {
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
	 * If `dummy` argument is false, returns a new instance of `Event` aggregated in the
	 * `owner` object. Else returns `dummyEvent`.
	 * @param owner An object to aggregate a new event in.
	 * @param dummy Determines if dummy event should be used instead.
	 */
	static make<P>(owner: IClass, dummy: boolean): IEvent<P> {
		return dummy ? dummyEvent : owner.own(new Event<P>());
	}
}
