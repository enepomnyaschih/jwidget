﻿/*
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
class Event<P> implements IEvent<P> {
	private _attachments: Dictionary<EventAttachment<P>> = null;

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
		this._attachments[attachment._iid] = attachment;
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
	 * Checks if this event is real.
	 */
	isObservable() {
		return true;
	}

	/**
	 * @hidden
	 */
	_unbind(attachment: EventAttachment<P>) {
		if (this._attachments !== null) {
			delete this._attachments[attachment._iid];
		}
	}

	/**
	 * If `observable` argument is true, returns a new instance of `Event` aggregated in the
	 * `owner` object. Else returns `dummyEvent`.
	 * @param owner An object to aggregate a new event in.
	 * @param observable Determines if a real or dummy event should be used.
	 */
	static make<P>(owner: IClass, observable: boolean): IEvent<P> {
		return observable ? dummyEvent : owner.own(new Event<P>());
	}
}

export default Event;
