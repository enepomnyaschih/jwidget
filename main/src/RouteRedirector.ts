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

import CancelToken from "./CancelToken";
import Component from './Component';
import defer from "./defer";
import hash from './hash';
import Router from "./Router";

/**
 * Recommended way to perform an asyncronous redirection in Router `handler` function.
 */
export class RouteRedirector extends Component {
	/**
	 * Creates a new redirector.
	 * @param path Path relative to router.
	 * @param router Redirect relative to this router.
	 * @param replaceState Replace the current browser historical state rather than pushing a new state to the
	 * stack. Defaults to true.
	 */
	constructor(private path: string, private router?: Router<any>, private replaceState = true) {
		super();
		defer(0, this.own(new CancelToken())).then(() => {
			redirectRoute(this.path, this.router, this.replaceState);
		});
	}
}

/**
 * Immediately performs the redirection, i.e. sets `hash` to `getFullPath(path, router)`.
 * @param path Path relative to `router`.
 * @param router Redirect relative to this router.
 * @param replaceState Replace the current browser historical state rather than pushing a new state to the stack.
 */
export function redirectRoute(path: string, router?: Router<any>, replaceState?: boolean) {
	try {
		path = Router.getFullPath(path, router);
		if (hash.updating) {
			throw new Error("Update cycle is already active. " +
				"Suggest using Router.Redirector or moving URL redirection to an asyncronous callback.");
		}
	} catch (e) {
		throw new Error("Can not perform URL redirection to " + path + ": " + e.message);
	}
	hash.set(path, replaceState);
}
