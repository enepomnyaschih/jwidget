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
import dummyDestroyable from "./dummyDestroyable";
import Event from "./Event";

/**
 * Cancelation token is an object that provides a signal on destruction for the bound asyncronous operations to
 * stop working. Examples of asyncronous operations that support cancelation are `defer` and `request`. In comparison
 * to "destroyable promise" approach, cancelation tokens are compatible to async/await syntax.
 */
export default class CancelToken implements Destroyable {

	private _event = new Event<any>();

	/**
	 * Indicates if the token is already canceled, i.e. destroyed.
	 */
	get cancelled() {
		return this._event == null;
	}

	/**
	 * Adds a handler function to call on taken cancelation. If the token is already canceled, calls the
	 * function immediately and returns %dummyDestroyable. Else registers the callback for a one-time call on
	 * token destruction and returns the attachment. Destroying the returned attachment results in handler
	 * function removal.
	 * @param handler Token cancelation callback.
	 * @param scope Handler call scope.
	 * @returns Handler attachment.
	 */
	addHandler(handler: () => any, scope?: any): Destroyable {
		if (this._event) {
			return this._event.listen(handler, scope);
		} else {
			handler.call(scope);
			return dummyDestroyable;
		}
	}

	/**
	 * Cancels the token. Calls all registered handler functions. An attempt to add more handler functions
	 * after the token destruction results in their immediate calling.
	 */
	destroy() {
		this._event.trigger();
		this._event.purge();
		this._event = null;
	}
}

/**
 * Helper function that wraps an abstract asyncronous operation with a promise supporting cancelation tokens.
 * @param run Asyncronous operation initiation callback.
 * @param cancel Asyncronous operation cancelation callback.
 * @param cancelToken Optional cancelation token.
 * @returns Promise representing the operation with cancelation token support.
 */
export function runAsync<T>(run: (resolve: (value?: T | Thenable<T>) => void, reject: (error?: any) => void) => void,
							cancel: () => void,
							cancelToken?: CancelToken): Promise<T> {

	if (!cancelToken) {
		return new Promise(run);
	}
	if (cancelToken.cancelled) {
		return new Promise<T>(() => null);
	}
	const attachment = cancelToken.addHandler(cancel);
	return new Promise<T>((resolve, reject) => {
		run((value?: T | Thenable<T>) => {
			attachment.destroy();
			resolve(value);
		}, (error?: any) => {
			attachment.destroy();
			reject(error);
		})
	});
}
