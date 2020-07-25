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

/**
 * Container for handler functions. Provides basic message dispatching functionality.
 */
interface Listenable<M> {
	/**
	 * Checks if this dispatcher is dummy, i.e. it never dispatches any messages.
	 * This knowledge may help you do certain code optimizations.
	 */
	readonly dummy: boolean;

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
	listen(handler: (params: M) => any, scope?: any): Destroyable;
}

export default Listenable;
