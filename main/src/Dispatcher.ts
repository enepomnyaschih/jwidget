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

import Destroyable from "./Destroyable";
import dummyDispatcher from "./dummyDispatcher";
import IDispatcher from "./IDispatcher";
import Listener from "./Listener";

/**
 * Real implementation of `IDispatcher` interface that calls handler functions on `dispatch` method call (as opposed to
 * `dummyDispatcher` which doesn't).
 * Used to dispatch messages (for example, field value change) to other objects (listeners).
 */
export default class Dispatcher<M> implements IDispatcher<M> {

	private _listeners: Set<Listener<M>> = null;

	/**
	 * Checks if this dispatcher is dummy, i.e. it never dispatches any messages.
	 * This knowledge may help you do certain code optimizations.
	 */
	get dummy() {
		return false;
	}

	/**
	 * Unregisters all listeners.
	 */
	purge() {
		this._listeners = null;
	}

	/**
	 * Registers a listener for this dispatcher.
	 *
	 * Whenever a message is dispatched with `dispatch` method, the specified handler function is called.
	 *
	 * You can unregister the listener destroying the returned object.
	 *
	 * @param handler Handler function.
	 * @param scope `handler` call scope.
	 */
	listen(handler: (message: M) => void, scope?: any): Destroyable {
		if (this._listeners === null) {
			this._listeners = new Set<Listener<M>>();
		}
		const listener = new Listener<M>(this, handler, scope);
		this._listeners.add(listener);
		return listener;
	}

	/**
	 * Dispatches a message, i.e. calls handler functions of all listeners.
	 * @param message Message to dispatch.
	 */
	dispatch(message?: M) {
		if (this._listeners === null) {
			return;
		}
		for (const listener of this._listeners) {
			listener.handler.call(listener.scope || listener, message);
		}
	}

	_unbind(listener: Listener<M>) {
		if (this._listeners !== null) {
			this._listeners.delete(listener);
		}
	}

	/**
	 * If `dummy` argument is false, returns a new instance of `Dispatcher`. Else returns `dummyDispatcher`.
	 * @param dummy Determines if dummy dispatcher should be used.
	 */
	static make<M>(dummy: boolean): IDispatcher<M> {
		return dummy ? dummyDispatcher : new Dispatcher<M>();
	}
}
