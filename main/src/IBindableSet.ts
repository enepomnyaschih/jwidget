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

import DestroyableReadonlyBindableSet from './DestroyableReadonlyBindableSet';
import IClass from "./IClass";

/**
 * Extension of `DestroyableReadonlyBindableSet` with modification methods.
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
	 * @returns The value is added successfully. Returns false if the value is already present.
	 */
	add(value: T): boolean;

	/**
	 * Adds multiple values to the set, ones that are absent, and dispatches a splice message.
	 * @param values Values to add.
	 * @returns The truly added values. Never returns null or undefined.
	 */
	addAll(values: Iterable<T>): ReadonlySet<T>;

	/**
	 * Deletes a value from the set if one is present and dispatches a splice message.
	 * @param value Value to delete.
	 * @returns The value is deleted successfully. Returns false if the value is already absent.
	 */
	delete(value: T): boolean;

	/**
	 * Deletes multiple values from the set, ones that are present, and dispatches a splice message.
	 * @param values Values to delete.
	 * @returns The truly deleted values. Never returns null or undefined.
	 */
	deleteAll(values: Iterable<T>): ReadonlySet<T>;

	/**
	 * Deletes all values from the set and dispatches a cleanup message.
	 * @returns Old contents of the set. Never returns null or undefined.
	 */
	clear(): ReadonlySet<T>;

	/**
	 * Deletes and/or adds multiple values in the set granularly and dispatches a splice message.
	 * @param valuesToDelete Values to delete.
	 * @param valuesToAdd Values to add.
	 * @returns Splice result. Never returns null or undefined.
	 */
	splice(valuesToDelete: Iterable<T>, valuesToAdd: Iterable<T>): IBindableSet.SpliceResult<T>;

	/**
	 * Adds multiple values to the set, ones that are absent, and dispatches a splice message.
	 * @param values Values to add.
	 * @returns The truly added values. If the call doesn't modify the set, returns undefined.
	 */
	tryAddAll(values: Iterable<T>): ReadonlySet<T>;

	/**
	 * Deletes multiple values from the set, ones that are present, and dispatches a splice message.
	 * @param values Values to delete.
	 * @returns The truly deleted values. If the call doesn't modify the set, returns undefined.
	 */
	tryDeleteAll(values: Iterable<T>): ReadonlySet<T>;

	/**
	 * Deletes all set values and dispatches a cleanup message.
	 * @returns Old contents of the set. If the call doesn't modify the set, returns undefined.
	 */
	tryClear(): ReadonlySet<T>;

	/**
	 * Deletes and/or adds multiple values in the set granularly and dispatches a splice message.
	 * @param valuesToDelete Values to delete.
	 * @param valuesToAdd Values to add.
	 * @returns Splice result. If the call doesn't modify the set, returns undefined.
	 */
	trySplice(valuesToDelete: Iterable<T>, valuesToAdd: Iterable<T>): IBindableSet.SpliceResult<T>;

	/**
	 * Adjusts the set contents to `newContents` using `detectSplice` and `splice` methods.
	 * @param newContents New contents of the set.
	 */
	performSplice(newContents: Iterable<T>): void;
}

export default IBindableSet;

namespace IBindableSet {
	/**
	 * `IBindableSet.splice` method arguments. Result of `detectSplice` method.
	 */
	export interface SpliceParams<T> {
		/**
		 * Values to delete.
		 */
		readonly valuesToDelete: Iterable<T>;

		/**
		 * Values to add.
		 */
		readonly valuesToAdd: Iterable<T>;
	}

	/**
	 * `IBindableSet.splice` method result.
	 */
	export interface SpliceResult<T> {
		/**
		 * Deleted values.
		 */
		readonly deletedValues: ReadonlySet<T>;

		/**
		 * Added values.
		 */
		readonly addedValues: ReadonlySet<T>;
	}
}
