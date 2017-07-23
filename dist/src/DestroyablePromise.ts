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

import Destroyable from "./Destroyable";

interface DestroyablePromise<T> extends Destroyable {
	readonly native: Promise<T>;

	then<U>(onFulfilled?: (value: T) => U | Thenable<U>, onRejected?: (error: any) => U | Thenable<U>): DestroyablePromise<U>;
	then<U>(onFulfilled?: (value: T) => U | Thenable<U>, onRejected?: (error: any) => void): DestroyablePromise<U>;

	catch<U>(onRejected?: (error: any) => U | Thenable<U>): DestroyablePromise<U>;
}

export default DestroyablePromise;

export function isDestroyablePromise(value: any) {
	return value &&
		typeof value.then === "function" &&
		typeof value.destroy === "function" &&
		value.native instanceof Promise;
}

// class MyPromise<T> {
// 	private done: Function[];
// 	private fail: Function[];
// 	private isResolved = false;
// 	private isRejected = false;
// 	private isDestroyed = false;

// 	constructor(callback: (resolve: (value?: T | MyPromise<T>) => void, reject: (error?: any) => void) => void) {
// 		callback((value) => this.resolve(value), (error) => this.reject(error));
// 	}

// 	private resolve(value?: T | MyPromise<T>) {
// 		if (this.isResolved || this.isRejected || this.isDestroyed) {
// 			console.error("Can not resolve promise: promise is complete already.");
// 			return;
// 		}
// 		this.isResolved = true;
// 		if (this.done) {
// 			this.done.forEach((callback) => {
// 				const result = callback(value);
// 			});
// 		}
// 	}

// 	private reject(error?: any) {

// 	}

// 	destroy() {}

// 	/**
// 	 * onFulfilled is called when/if "promise" resolves. onRejected is called when/if "promise" rejects.
// 	 * Both are optional, if either/both are omitted the next onFulfilled/onRejected in the chain is called.
// 	 * Both callbacks have a single parameter , the fulfillment value or rejection reason.
// 	 * "then" returns a new promise equivalent to the value you return from onFulfilled/onRejected after being passed through Promise.resolve.
// 	 * If an error is thrown in the callback, the returned promise rejects with that error.
// 	 *
// 	 * @param onFulfilled called when/if "promise" resolves
// 	 * @param onRejected called when/if "promise" rejects
//   */
//     then<U>(onFulfilled?: (value: T) => U | MyPromise<U>, onRejected?: (error: any) => U | MyPromise<U>): Promise<U>;
//     then<U>(onFulfilled?: (value: T) => U | MyPromise<U>, onRejected?: (error: any) => void): Promise<U>;

// 	/**
// 	 * Sugar for promise.then(undefined, onRejected)
// 	 *
// 	 * @param onRejected called when/if "promise" rejects
// 	 */
// 	catch<U>(onRejected?: (error: any) => U | MyPromise<U>): Promise<U>;
// }
