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

import DestroyableReadonlyBindableMap from './DestroyableReadonlyBindableMap';
import IClass from "./IClass";
import Some from './Some';

/**
 * Extension of DestroyableReadonlyMap with modification methods.
 */
interface IBindableMap<K, V> extends IClass, DestroyableReadonlyBindableMap<K, V> {

	/**
	 * Makes this map an owner of its values, which means that the values are alive as long as they are present in
	 * this map. A value is destroyed when it leaves the map, and all values are destroyed on the map destruction.
	 */
	ownValues(): this;

	/**
	 * Puts or replaces a value with the specified key and dispatches a splice message.
	 * @param key Entry key.
	 * @param value Entry value.
	 * @returns The replaced value.
	 */
	set(key: K, value: V): V;

	/**
	 * Puts or replaces multiple entries and dispatches a splice message.
	 * @param entries Entries to put.
	 */
	setAll(entries: ReadonlyMap<K, V>): void;

	/**
	 * Changes entry key in the map and dispatches a reindexing message.
	 * If the map doesn't contain oldKey or contains newKey, and they are not equal, throws an error.
	 * @param oldKey Old entry key.
	 * @param newKey New entry key.
	 * @returns The entry value.
	 */
	setKey(oldKey: K, newKey: K): V;

	/**
	 * Removes an entry with the specified key and dispatches a splice message.
	 * @param key Entry key.
	 * @returns The removed value.
	 */
	remove(key: K): V;

	/**
	 * Removes multiple entries from the map and dispatches a splice message.
	 * @param keys Entry keys.
	 */
	removeAll(keys: Iterable<K>): void;

	/**
	 * Removes all map entries and dispatches a cleanup message.
	 */
	clear(): Map<K, V>;

	/**
	 * Removes and/or adds multiple entries in the map granularly and dispatches a splice message.
	 * @param keysToRemove Keys of entries to remove.
	 * @param entriesToUpdate Entries to put/replace.
	 * @returns Splice result. Never returns null or undefined.
	 */
	splice(keysToRemove: Iterable<K>, entriesToUpdate: ReadonlyMap<K, V>): IBindableMap.SpliceResult<K, V>;

	/**
	 * Changes entry keys in the map and dispatches a reindexing message.
	 * @param keyMapping Key mapping. Entry with key x will gain key keyMapping[x].
	 * It is necessary to pass only changed keys, but unchanged keys or nonexistent keys are acceptable as well.
	 * @returns Mapping of truly changed keys. Never returns null or undefined.
	 */
	reindex(keyMapping: ReadonlyMap<K, K>): Map<K, K>;

	/**
	 * Puts or replaces an entry with the specified key and dispatches a splice message.
	 * @param key Entry key.
	 * @param value Entry value.
	 * @returns The replaced value. If the map is not modified, returns undefined.
	 */
	trySet(key: K, value: V): Some<V>;

	/**
	 * Puts or replaces multiple entries and dispatches a splice message.
	 * @param entries Entries to put.
	 * @returns Result of an internal splice method call. If the map is not modified, returns undefined.
	 */
	trySetAll(entries: ReadonlyMap<K, V>): IBindableMap.SpliceResult<K, V>;

	/**
	 * Changes entry key in map and dispatches a reindexing message.
	 * If the map doesn't contain oldKey or contains newKey, and they are not equal, throws an error.
	 * @param oldKey Old entry key.
	 * @param newKey New entry key.
	 * @returns The entry value. If the map is not modified, returns undefined.
	 */
	trySetKey(oldKey: K, newKey: K): V;

	/**
	 * Removes multiple entries from the map and dispatches a splice message.
	 * @param keys Entry keys.
	 * @returns The removed entries. If the map is not modified, returns undefined.
	 */
	tryRemoveAll(keys: Iterable<K>): Map<K, V>;

	/**
	 * Removes and adds multiple entries in the map granularly and dispatches a splice message.
	 * @param keysToRemove Keys of entries to remove.
	 * @param entriesToUpdate Entries to put/replace.
	 * @returns Splice result. If the map is not modified, returns undefined.
	 */
	trySplice(keysToRemove: Iterable<K>, entriesToUpdate: ReadonlyMap<K, V>): IBindableMap.SpliceResult<K, V>;

	/**
	 * Changes entry keys in the map and dispatches a reindexing message.
	 * @param keyMapping Key mapping. Entry with key x will gain key keyMap[x].
	 * It is necessary to pass only changed keys, but unchanged keys or nonexistent keys are acceptable as well.
	 * @returns Mapping of truly changed keys. If the map is not modified, returns undefined.
	 */
	tryReindex(keyMapping: ReadonlyMap<K, K>): Map<K, K>;

	/**
	 * Adjusts map contents to `newContents` using `detectSplice` and `splice` methods.
	 * @param newContents New map contents.
	 */
	performSplice(newContents: ReadonlyMap<K, V>): void;

	/**
	 * Adjusts map contents to `newContents` using `detectReindex` and `reindex` methods. All values must be unique.
	 * @param newContents New map contents.
	 */
	performReindex(newContents: ReadonlyMap<K, V>): void;
}

export default IBindableMap;

namespace IBindableMap {
	/**
	 * Map splice method arguments. Result of `detectSplice` method.
	 */
	export interface SpliceParams<K, V> {
		/**
		 * Keys to remove.
		 */
		readonly keysToRemove: Iterable<K>;

		/**
		 * Entries to put/replace.
		 */
		readonly entriesToUpdate: ReadonlyMap<K, V>;
	}

	/**
	 * IBindableMap.splice method result.
	 */
	export interface SpliceResult<K, V> {
		/**
		 * Removed entries.
		 */
		readonly removedEntries: ReadonlyMap<K, V>;

		/**
		 * Added entries.
		 */
		readonly addedEntries: ReadonlyMap<K, V>;
	}
}
