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

import DestroyableReadonlyBindableSet from './DestroyableReadonlyBindableSet';
import IClass from "./IClass";

/**
 * Extension of DestroyableReadonlySet with modification methods.
 */
interface IBindableSet<T> extends IClass, DestroyableReadonlyBindableSet<T> {

	/**
	 * Makes this set an owner of its values, which means that its values are alive as long as they are present in
	 * this set. A value is destroyed when it leaves the set, and all values are destroyed on the set destruction.
	 */
	ownValues(): this;

	/**
	 * Adds a value to the set if one is absent and dispatches a splice message.
	 * @param value Value to add.
	 * @returns Value is added successfully. False if value is already present.
	 */
	add(value: T): boolean;

	/**
	 * Adds multiple values to the set, ones that are absent, and dispatches a splice message.
	 * @param values Values to add.
	 * @returns The added values. Never returns null or undefined.
	 */
	addAll(values: Iterable<T>): ReadonlySet<T>;

	/**
	 * Removes a value from the set if one is present and dispatches a splice message.
	 * @param value Value to remove.
	 * @returns Value is removed successfully. Returns false if value is already absent.
	 */
	delete(value: T): boolean;

	/**
	 * Removes multiple values from the set, ones that are present, and dispatches a splice message.
	 * @param values Values to remove.
	 * @returns The removed values. Never returns null or undefined.
	 */
	deleteAll(values: Iterable<T>): ReadonlySet<T>;

	/**
	 * Removes all set values and dispatches a cleanup message.
	 */
	clear(): ReadonlySet<T>;

	/**
	 * Removes and/or adds multiple values in the set granularly and dispatches a splice message.
	 * @param valuesToRemove Values to remove.
	 * @param valuesToAdd Values to add.
	 * @returns Splice result. Never returns null or undefined.
	 */
	splice(valuesToRemove: Iterable<T>, valuesToAdd: Iterable<T>): IBindableSet.SpliceResult<T>;

	/**
	 * Adds multiple values to the set, ones that are absent, and dispatches a splice message.
	 * @param values Values to add.
	 * @returns The added values. If the set is not modified, returns undefined.
	 */
	tryAddAll(values: Iterable<T>): ReadonlySet<T>;

	/**
	 * Removes multiple values from the set, ones that are present, and dispatches a splice message.
	 * @param values Values to remove.
	 * @returns The removed values. If the set is not modified, returns undefined.
	 */
	tryDeleteAll(values: Iterable<T>): ReadonlySet<T>;

	/**
	 * Removes all set values and dispatches a cleanup message.
	 */
	tryClear(): ReadonlySet<T>;

	/**
	 * Removes and/or adds multiple values in the set granularly and dispatches a splice message.
	 * @param valuesToRemove Values to remove.
	 * @param valuesToAdd Values to add.
	 * @returns Splice result. If the set is not modified, returns undefined.
	 */
	trySplice(valuesToRemove: Iterable<T>, valuesToAdd: Iterable<T>): IBindableSet.SpliceResult<T>;

	/**
	 * Adjusts set contents to `newValues` using `detectSplice` and `splice` methods.
	 * @param newContents New set contents.
	 */
	performSplice(newContents: Iterable<T>): void;
}

export default IBindableSet;

namespace IBindableSet {
	/**
	 * Set splice method arguments. Result of `detectSplice` method.
	 */
	export interface SpliceParams<T> {
		/**
		 * Values to remove.
		 */
		readonly valuesToRemove: Iterable<T>;

		/**
		 * Values to add.
		 */
		readonly valuesToAdd: Iterable<T>;
	}

	/**
	 * Set splice method result.
	 */
	export interface SpliceResult<T> {
		/**
		 * Removed values.
		 */
		readonly removedValues: ReadonlySet<T>;

		/**
		 * Added values.
		 */
		readonly addedValues: ReadonlySet<T>;
	}
}
