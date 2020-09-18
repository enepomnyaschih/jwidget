export interface SetLike<T> {
	has(value: T): boolean;
}

/**
 * Returns an array of all items that are present in a subtractor, but not in a subtrahend.
 * @param subtractor Subtractor.
 * @param subtrahend Subtrahend.
 * @returns Difference.
 */
export function getDifference<T>(subtractor: Iterable<T>, subtrahend: SetLike<T>): T[] {
	const result: T[] = [];
	for (let item of subtractor) {
		if (!subtrahend.has(item)) {
			result.push(item);
		}
	}
	return result;
}
