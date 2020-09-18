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
