/**
 * Maps map values. Returns a new map containing results of a callback call for each map value with the same keys.
 * @param map Map.
 * @param callback Mapping function.
 * @returns Mapped map.
 */
export function map<K, T, U>(map: ReadonlyMap<K, T>, callback: (value: T, key: K) => U): Map<K, U> {
	const result = new Map<K, U>();
	for (let [key, value] of map) {
		result.set(key, callback(value, key));
	}
	return result;
}

/**
 * Filters a map by criteria. Builds a new map consisting of entries a callback returns true for.
 * @param map Iterable.
 * @param callback Criteria callback.
 * @returns Filtered array.
 */
export function filter<K, V>(map: ReadonlyMap<K, V>, callback: (value: V, key: K) => boolean): Map<K, V> {
	const result = new Map<K, V>();
	for (let [key, value] of map) {
		if (callback(value, key)) {
			result.set(key, value);
		}
	}
	return result;
}

// Some functions mitigating stupidity of modern JS API. Native methods return Iterator instead of Iterable.

export function healthyManKeys<K, V>(map: Iterable<readonly [K, V]>): Iterable<K> {
	return {
		[Symbol.iterator]: function* () {
			for (let [key, _] of map) {
				yield key;
			}
		}
	};
}

export function healthyManValues<K, V>(map: Iterable<readonly [K, V]>): Iterable<V> {
	return {
		[Symbol.iterator]: function* () {
			for (let [_, value] of map) {
				yield value;
			}
		}
	};
}
