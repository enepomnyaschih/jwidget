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

import DestroyableReadonlyBindableMap from './DestroyableReadonlyBindableMap';
import IClass from "./IClass";
import Some from './Some';

/**
 * Extension of `DestroyableReadonlyBindableMap` with modification methods.
 */
interface IBindableMap<K, V> extends IClass, DestroyableReadonlyBindableMap<K, V> {

	/**
	 * Makes this map an owner of its values, which means that the values are alive as long as they are present in
	 * this map. A value is destroyed when it leaves the map, and all values are destroyed on the map destruction.
	 */
	ownValues(): this;

	/**
	 * Adds or updates an entry with the specified key and dispatches a splice message.
	 * @param key Entry key.
	 * @param value Value to set.
	 * @returns Old value of the entry. If the function call creates a new entry, returns undefined.
	 */
	set(key: K, value: V): V;

	/**
	 * Adds or replaces multiple entries and dispatches a splice message.
	 * @param entries Entries to add or update.
	 */
	setAll(entries: ReadonlyMap<K, V>): void;

	/**
	 * Changes a key of an entry in the map and dispatches a reindexing message.
	 * If the map doesn't contain `oldKey` or contains `newKey`, and they are not equal, throws an error.
	 * @param oldKey Old key of an entry.
	 * @param newKey New key of the entry.
	 * @returns The value of the entry.
	 */
	setKey(oldKey: K, newKey: K): V;

	/**
	 * Deletes an entry with the specified key and dispatches a splice message.
	 * @param key Key of an entry to delete.
	 * @returns Value of the entry.
	 */
	delete(key: K): V;

	/**
	 * Deletes multiple entries from the map and dispatches a splice message.
	 * @param keys Keys of entries to delete.
	 */
	deleteAll(keys: Iterable<K>): void;

	/**
	 * Deletes all map entries and dispatches a cleanup message.
	 * @returns Old contents of the map. Never returns null of undefined.
	 */
	clear(): Map<K, V>;

	/**
	 * Deletes and/or adds multiple entries in the map granularly and dispatches a splice message.
	 * @param keysToDelete Keys of entries to delete.
	 * @param entriesToUpdate Entries to add or replace.
	 * @returns Splice result. Never returns null or undefined.
	 */
	splice(keysToDelete: Iterable<K>, entriesToUpdate: ReadonlyMap<K, V>): IBindableMap.SpliceResult<K, V>;

	/**
	 * Changes entry keys in the map granularly and dispatches a reindexing message.
	 * @param keyMapping Key mapping. Entry with key x will gain key keyMapping[x]. It is necessary to pass only truly
	 * changed keys. The unchanged or non-existent keys are ignored.
	 * @returns Mapping of truly changed keys. Never returns null or undefined.
	 */
	reindex(keyMapping: ReadonlyMap<K, K>): Map<K, K>;

	/**
	 * Adds or replaces an entry with the specified key and dispatches a splice message.
	 * @param key Entry key.
	 * @param value Value to set.
	 * @returns Wrapper over the old value of the entry. If the function call creates a new entry, returns
	 * Some(undefined). If the call doesn't modify the map, returns undefined.
	 */
	trySet(key: K, value: V): Some<V>;

	/**
	 * Adds or replaces multiple entries and dispatches a splice message.
	 * @param entries Entries to add or update.
	 * @returns Result of an internal splice method call. If the call doesn't modify the map, returns undefined.
	 */
	trySetAll(entries: ReadonlyMap<K, V>): IBindableMap.SpliceResult<K, V>;

	/**
	 * Changes a key of an entry in the map and dispatches a reindexing message.
	 * If the map doesn't contain oldKey or contains newKey, and they are not equal, throws an error.
	 * @param oldKey Old key of an entry.
	 * @param newKey New key of the entry.
	 * @returns The value of the entry. If the call doesn't modify the map, returns undefined.
	 */
	trySetKey(oldKey: K, newKey: K): V;

	/**
	 * Deletes multiple entries from the map and dispatches a splice message.
	 * @param keys Keys of entries to delete.
	 * @returns The deleted entries. If the call doesn't modify the map, returns undefined.
	 */
	tryDeleteAll(keys: Iterable<K>): Map<K, V>;

	/**
	 * Deletes all map entries and dispatches a cleanup message.
	 * @returns Old contents of the map. If the call doesn't modify the map, returns undefined.
	 */
	tryClear(): Map<K, V>;

	/**
	 * Deletes and/or adds multiple entries in the map granularly and dispatches a splice message.
	 * @param keysToDelete Keys of entries to delete.
	 * @param entriesToUpdate Entries to add or replace.
	 * @returns Splice result. If the call doesn't modify the map, returns undefined.
	 */
	trySplice(keysToDelete: Iterable<K>, entriesToUpdate: ReadonlyMap<K, V>): IBindableMap.SpliceResult<K, V>;

	/**
	 * Changes entry keys in the map granularly and dispatches a reindexing message.
	 * @param keyMapping Key mapping. Entry with key x will gain key keyMapping[x]. It is necessary to pass only truly
	 * changed keys. The unchanged or non-existent keys are ignored.
	 * @returns Mapping of truly changed keys. If the call doesn't modify the map, returns undefined.
	 */
	tryReindex(keyMapping: ReadonlyMap<K, K>): Map<K, K>;

	/**
	 * Adjusts the map contents to `newContents` using `detectSplice` and `splice` methods.
	 * @param newContents New contents of the map.
	 */
	performSplice(newContents: ReadonlyMap<K, V>): void;

	/**
	 * Adjusts the map contents to `newContents` using `detectReindex` and `reindex` methods. All values must be unique.
	 * @param newContents New contents of the map.
	 */
	performReindex(newContents: ReadonlyMap<K, V>): void;
}

export default IBindableMap;

namespace IBindableMap {
	/**
	 * `IBindableMap.splice` method arguments. Result of `detectSplice` method.
	 */
	export interface SpliceParams<K, V> {
		/**
		 * Keys to delete.
		 */
		readonly keysToDelete: Iterable<K>;

		/**
		 * Entries to add or replace.
		 */
		readonly entriesToUpdate: ReadonlyMap<K, V>;
	}

	/**
	 * `IBindableMap.splice` method result.
	 */
	export interface SpliceResult<K, V> {
		/**
		 * Deleted entries.
		 */
		readonly deletedEntries: ReadonlyMap<K, V>;

		/**
		 * Added entries.
		 */
		readonly addedEntries: ReadonlyMap<K, V>;
	}
}
