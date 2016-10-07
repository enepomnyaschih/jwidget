export interface Dictionary<T> {
	[index: string]: T;
}

export function array<T>();
export function array<T>(length: number);
export function array<T>(v?: any) {
	return new Array<T>(v);
}

export var isIndexOf = Array.prototype.indexOf !== undefined;

export function everyInArray<T>(arr: T[], callback: (item: T, index: number) => boolean, scope?: any): boolean {
	for (var i = 0, l = arr.length; i < l; ++i) {
		if (callback.call(scope || arr, arr[i], i) === false) {
			return false;
		}
	}
	return true;
}

export function filterArray<T>(arr: T[], callback: (item: T, index: number) => boolean, scope?: any): T[]{
	var result: T[] = [];
	everyInArray(arr, function (item: T, index: number): boolean {
		if (callback.call(this, item, index) !== false) {
			result.push(item);
		}
		return true;
	}, scope);
	return result;
}
