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

import Bindable from "./Bindable";
import IBindableMap from './IBindableMap';
import Listenable from './Listenable';

/**
 * Bindable readonly wrapper over a native map.
 */
interface ReadonlyBindableMap<K, V> extends Iterable<readonly [K, V]> {
	/**
	 * Returns an iterable of entries in the map.
	 */
	[Symbol.iterator](): IterableIterator<[K, V]>;

	/**
	 * The map never dispatches any messages. This knowledge may help you do certain code optimizations.
	 */
	readonly silent: boolean;

	/**
	 * Property containing number of entries in the map.
	 */
	readonly size: Bindable<number>;

	/**
	 * Internal representation of the map.
	 */
	readonly native: ReadonlyMap<K, V>;

	/**
	 * Entries are removed from the map and/or entries are updated in the map.
	 */
	readonly onSplice: Listenable<IBindableMap.SpliceResult<K, V>>;

	/**
	 * Keys are changed in the map. Passes mapping of changed keys (old to new) as a message.
	 */
	readonly onReindex: Listenable<ReadonlyMap<K, K>>;

	/**
	 * The map is cleared. Passes old map contents as a message.
	 */
	readonly onClear: Listenable<ReadonlyMap<K, V>>;

	/**
	 * The map is changed. Dispatched right after any another message.
	 */
	readonly onChange: Listenable<void>;

	/**
	 * Checks an entry presence by key.
	 * @param key Item key.
	 */
	has(key: K): boolean;

	/**
	 * Returns a value by key. If such key doesn't exist, returns undefined.
	 * @param key Item key.
	 */
	get(key: K): V;

	/**
	 * Returns an iterable of keys in the map.
	 */
	keys(): IterableIterator<K>;

	/**
	 * Returns an iterable of values in the map.
	 */
	values(): IterableIterator<V>;

	/**
	 * Returns an iterable of entries in the map.
	 */
	entries(): IterableIterator<readonly [K, V]>;

	/**
	 * Iterates through the map entries. Calls the specified function for all entries.
	 * @param callback Callback function.
	 */
	forEach(callback: (value: V, key: K) => void): void;

	/**
	 * Detects `splice` method arguments to adjust the map contents to `newContents`.
	 * Determines item bunches to be removed and inserted/replaced, along with their keys.
	 * @param newContents New map contents.
	 * @returns `splice` method arguments. If no method call required, returns undefined.
	 */
	detectSplice(newContents: ReadonlyMap<K, V>): IBindableMap.SpliceParams<K, V>;

	/**
	 * Detects `reindex` method arguments to adjust the map contents to `newItems`.
	 * Determines new keys to be assigned to all items.
	 * If `newItems` contents differ from the map contents, it may lead to unknown consequences.
	 * @param newContents New map contents.
	 * @returns `keyMapping` argument of `reindex` method. If no method call required, returns undefined.
	 */
	detectReindex(newContents: ReadonlyMap<K, V>): ReadonlyMap<K, K>;
}

export default ReadonlyBindableMap;
