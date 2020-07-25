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

import ISet from './ISet';
import Listenable from './Listenable';
import ReadonlyCollection from './ReadonlyCollection';

/**
 * Unordered collection optimized for items adding, removal and search.
 * @param T Item type.
 */
interface ReadonlySet<T> extends ReadonlyCollection<T> {
	/**
	 * Array of all set items. This getter makes a copy of the collection (in fact, internal representation of Set is
	 * not an array).
	 */
	readonly items: T[];

	/**
	 * Items are removed from the set and/or items are added to the set.
	 */
	readonly onSplice: Listenable<ISet.SpliceMessage<T>>;

	/**
	 * The set is cleared.
	 */
	readonly onClear: Listenable<ISet.MessageWithItems<T>>;

	/**
	 * The set is changed. Dispatched right after any another message.
	 */
	readonly onChange: Listenable<ISet.Message<T>>;

	/**
	 * @inheritDoc
	 */
	clone(): ISet<T>;

	/**
	 * @inheritDoc
	 */
	filter(callback: (item: T) => any, scope?: any): ISet<T>;

	/**
	 * @inheritDoc
	 */
	map<U>(callback: (item: T) => U, scope?: any, getKey?: (item: U) => any): ISet<U>;

	/**
	 * Detects `splice` method arguments to adjust the set contents to `newItems`.
	 * Determines item bunches to be removed and added.
	 * @param newItems New set contents.
	 * @returns `splice` method arguments. If no method call required, returns undefined.
	 */
	detectSplice(newItems: T[]): ISet.SpliceParams<T>;

	/**
	 * Checks this set for equality (===) to an array, item by item.
	 * @param array Array.
	 * @returns This set is equal to the array.
	 */
	equal(array: T[]): boolean;
}

export default ReadonlySet;
