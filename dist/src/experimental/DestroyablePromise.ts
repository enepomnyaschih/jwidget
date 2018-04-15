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

import Destroyable from "../Destroyable";

/**
 * Extension of native `Promise` with `destroy` method. If some method returns
 * `DestroyablePromise`, probably it establishes some kind of cancellable
 * asynchronous operation and wants you to take control over its life time.
 * Destroying the `DestroyablePromise` instance cancels the operation, so that
 * neither `onFulfilled` nor `onRejected` callback gets called.
 */
interface DestroyablePromise<T> extends Destroyable {
	/**
	 * Native Promise instance this `DestroyablePromise` is wrapped around.
	 */
	readonly native: Promise<T>;

	/**
	 * Works the same way as native Promise's `then` method with two differences:
	 *
	 * * Supports `DestroyablePromise` as callback result for chaining.
	 * * Returns `DestroyablePromise` instance which destroys the whole chain.
	 */
	then<U>(onFulfilled?: (value: T) => U | Thenable<U>, onRejected?: (error: any) => U | Thenable<U>): DestroyablePromise<U>;

	then<U>(onFulfilled?: (value: T) => U | Thenable<U>, onRejected?: (error: any) => void): DestroyablePromise<U>;

	/**
	 * Works the same way as native Promise's `catch` method with two differences:
	 *
	 * * Supports `DestroyablePromise` as callback result for chaining.
	 * * Returns `DestroyablePromise` instance which destroys the whole chain.
	 */
	catch<U>(onRejected?: (error: any) => U | Thenable<U>): DestroyablePromise<U>;
}

export default DestroyablePromise;

export function isDestroyablePromise(value: any) {
	return value &&
		typeof value.then === "function" &&
		typeof value.destroy === "function" &&
		value.native instanceof Promise;
}
