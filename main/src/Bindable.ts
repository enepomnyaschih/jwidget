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

import DestroyableBindable from "./DestroyableBindable";
import Listenable from "./Listenable";
import Mapper from "./Mapper";

/**
 * Read-only container for a value.
 * Provides basic data binding functionality.
 */
interface Bindable<V> {
	/**
	 * Checks if this property never dispatches messages. This knowledge may help you do certain code optimizations.
	 */
	readonly silent: boolean;

	/**
	 * Property value is changed. Triggered in result of `set` method call if the value has been changed.
	 */
	readonly changeEvent: Listenable<Bindable.ChangeEventParams<V>>;

	/**
	 * Returns property value.
	 */
	get(): V;

	/**
	 * Builds a new property containing the result of the callback function called
	 * on this property value. To stop synchronization, destroy the resulting property.
	 * To map multiple properties, use `Mapper`.
	 *
	 * @param create Mapping function.
	 * @param config Configuration options.
	 */
	map<U>(create: (value: V) => U, config?: Mapper.Config<U>): DestroyableBindable<U>;
}

export default Bindable;

namespace Bindable {
	/**
	 * `Bindable.changeEvent` params.
	 */
	export interface ChangeEventParams<V> {
		/**
		 * Sender property.
		 */
		readonly sender: Bindable<V>;

		/**
		 * New value.
		 */
		readonly value: V;

		/**
		 * Old value.
		 */
		readonly oldValue: V;
	}
}
