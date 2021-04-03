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

/**
 * Builds a new map of results of callback function call for each map entry with the same keys.
 * @param map Map.
 * @param callback Mapping function.
 * @returns Mapped map.
 */
export function map<K, T, U>(map: Iterable<readonly [K, T]>, callback: (value: T, key: K) => U): Map<K, U> {
	const result = new Map<K, U>();
	for (let [key, value] of map) {
		result.set(key, callback(value, key));
	}
	return result;
}

/**
 * Builds a new map of map entries the callback function returns a truthy value for.
 * @param map Iterable.
 * @param callback Criteria callback.
 * @returns Filtered map.
 */
export function filter<K, V>(map: Iterable<readonly [K, V]>, callback: (value: V, key: K) => boolean): Map<K, V> {
	const result = new Map<K, V>();
	for (let [key, value] of map) {
		if (callback(value, key)) {
			result.set(key, value);
		}
	}
	return result;
}

// Some functions mitigating a serious design flaw of modern JS API. Native methods return Iterator instead of Iterable.

export function getIterableKeys<K, V>(map: Iterable<readonly [K, V]>): Iterable<K> {
	return {
		[Symbol.iterator]: function* () {
			for (const [key, _] of map) {
				yield key;
			}
		}
	};
}

export function getIterableValues<K, V>(map: Iterable<readonly [K, V]>): Iterable<V> {
	return {
		[Symbol.iterator]: function* () {
			for (const [_, value] of map) {
				yield value;
			}
		}
	};
}
