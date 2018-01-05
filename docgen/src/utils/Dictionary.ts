import Dictionary from "../Dictionary";

export function isEmpty(dict: any) {
	if (!dict) {
		return true;
	}
	for (let id in dict) {
		if (dict.hasOwnProperty(id)) {
			return false;
		}
	}
	return true;
}

export function every<T>(dict: Dictionary<T>, callback: (item: T, key: string) => boolean, scope?: any): boolean {
	if (!dict) {
		return true;
	}
	scope = scope || dict;
	for (let key in dict) {
		if (!callback.call(scope, dict[key], key)) {
			return false;
		}
	}
	return true;
}

export function map<T, U>(dict: Dictionary<T>, callback: (item: T, key: string) => U, scope?: any): Dictionary<U> {
	if (!dict) {
		return null;
	}
	const result: Dictionary<U> = {};
	every(dict, function (item: T, key: string): boolean {
		result[key] = callback.call(scope, item, key);
		return true;
	});
	return result;
}

export function toArray<T>(dict: Dictionary<T>): T[] {
	if (!dict) {
		return null;
	}
	const result: T[] = [];
	every(dict, function (item) {
		result.push(item);
		return true;
	});
	return result;
}

export function join(dict: Dictionary<string>, separator?: string): string {
	return toArray(dict).join(separator);
}
