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
import dummyDestroyable from "./dummyDestroyable";
import Dispatcher from "./Dispatcher";

/**
 * Cancelation token is an object that provides a signal on destruction for the bound asyncronous operations to
 * stop working. Examples of asyncronous operations that support cancelation are `defer` and `request`. In comparison
 * to "destroyable promise" approach, cancelation tokens are compatible to async/await syntax.
 */
export default class CancelToken implements Destroyable {

	private _dispatcher = new Dispatcher<any>();

	/**
	 * Indicates if the token is already canceled, i.e. destroyed.
	 */
	get cancelled() {
		return this._dispatcher == null;
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
		if (this._dispatcher) {
			return this._dispatcher.listen(handler, scope);
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
		this._dispatcher.dispatch();
		this._dispatcher.purge();
		this._dispatcher = null;
	}
}

/**
 * Helper function that wraps an abstract asyncronous operation with a promise supporting cancelation tokens.
 * @param run Asyncronous operation initiation callback.
 * @param cancel Asyncronous operation cancelation callback.
 * @param cancelToken Optional cancelation token.
 * @returns Promise representing the operation with cancelation token support.
 */
export function runAsync<T>(run: (resolve: (value?: T | Promise<T>) => void, reject: (error?: any) => void) => void,
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
		run((value?: T | Promise<T>) => {
			attachment.destroy();
			resolve(value);
		}, (error?: any) => {
			attachment.destroy();
			reject(error);
		})
	});
}
