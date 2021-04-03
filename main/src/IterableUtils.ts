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
 * Maps iterable items. Returns an array containing results of a callback call for each iterable item.
 * @param iterable Iterable.
 * @param callback Mapping function.
 * @returns Mapped array.
 */
export function map<T, U>(iterable: Iterable<T>, callback: (item: T) => U): U[] {
	const result: U[] = [];
	for (let item of iterable) {
		result.push(callback(item));
	}
	return result;
}

/**
 * Filters an iterable by criteria. Builds an array consisting of items a callback returns true for.
 * @param iterable Iterable.
 * @param callback Criteria callback.
 * @returns Filtered array.
 */
export function filter<T>(iterable: Iterable<T>, callback: (item: T) => boolean): T[] {
	const result: T[] = [];
	for (let item of iterable) {
		if (callback(item)) {
			result.push(item);
		}
	}
	return result;
}

/**
 * Counts items matching a criteria. Returns number of items which `callback` returns true for.
 * @param iterable Iterable.
 * @param callback Criteria callback.
 * @returns Number of items.
 */
export function count<T>(iterable: Iterable<T>, callback: (item: T) => boolean) {
	let result = 0;
	for (let item of iterable) {
		if (callback(item)) {
			++result;
		}
	}
	return result;
}

/**
 * Indexes an iterable. Builds and returns a new map by rule: key is the result of the indexer function call,
 * value is the corresponding item.
 * @param iterable Iterable.
 * @param callback Indexer function.
 * @returns Index.
 */
export function index<V, K>(iterable: Iterable<V>, callback: (item: V) => K): Map<K, V> {
	const result = new Map<K, V>();
	for (let item of iterable) {
		result.set(callback(item), item);
	}
	return result;
}
