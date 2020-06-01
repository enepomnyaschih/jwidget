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

import Destroyable from './Destroyable';

/**
 * Destroyable wrapper over setInterval function. Instead of calling clearInterval, you must destroy the
 * Interval instance. Usually, it can be done by aggregating the instance in another object.
 */
export default class Interval implements Destroyable {
	private interval: number;

	/**
	 * Creates an Interval instance.
	 * @param callback Callback to call every time the specified period of time has passed.
	 * @param ms Period of time in milliseconds.
	 */
	constructor(callback: () => any, ms?: number);

	/**
	 * Creates an Interval instance.
	 * @param callback Callback to call every time the specified period of time has passed.
	 * @param scope `callback` call scope.
	 * @param ms Period of time in milliseconds.
	 */
	constructor(callback: () => any, scope: any, ms?: number);
	constructor(callback: () => any, scope?: any, ms?: number) {
		if ((scope != null) && (typeof scope === "object")) {
			callback = callback.bind(scope);
		} else if (typeof scope === "number") {
			ms = scope;
		}
		this.interval = window.setInterval(callback, ms);
	}

	destroy() {
		clearInterval(this.interval);
	}
}
