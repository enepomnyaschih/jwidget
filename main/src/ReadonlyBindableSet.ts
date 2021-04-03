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

import Bindable from "./Bindable";
import IBindableSet from './IBindableSet';
import Listenable from './Listenable';

/**
 * Bindable readonly wrapper over a native set.
 */
interface ReadonlyBindableSet<T> extends Iterable<T> {
	/**
	 * Iterates over values in the set.
	 */
	[Symbol.iterator](): IterableIterator<T>;

	/**
	 * The set never dispatches any messages. This knowledge may help you do certain code optimizations.
	 */
	readonly silent: boolean;

	/**
	 * Property containing number of values in the set.
	 */
	readonly size: Bindable<number>;

	/**
	 * Internal representation of the set.
	 */
	readonly native: ReadonlySet<T>;

	/**
	 * Values are removed from the set and/or values are added to the set.
	 */
	readonly onSplice: Listenable<IBindableSet.SpliceResult<T>>;

	/**
	 * The set is cleared. Passes old contents as a message.
	 */
	readonly onClear: Listenable<ReadonlySet<T>>;

	/**
	 * The set is changed. Dispatched right after any another message.
	 */
	readonly onChange: Listenable<void>;

	/**
	 * Checks if an value is present in the set.
	 */
	has(value: T): boolean;

	/**
	 * Iterates through the set values. Calls the specified function for all values.
	 * @param callback Callback function.
	 */
	forEach(callback: (value: T) => void): void;

	/**
	 * Detects `splice` method arguments to adjust the set contents to `newContents`.
	 * Determines value bunches to be removed and added.
	 * @param newContents New set contents.
	 * @returns `splice` method arguments. If no method call required, returns undefined.
	 */
	detectSplice(newContents: Iterable<T>): IBindableSet.SpliceParams<T>;
}

export default ReadonlyBindableSet;
