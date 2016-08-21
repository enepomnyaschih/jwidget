export function array<T>();
export function array<T>(length: number);
export function array<T>(v?: any) {
	return new Array<T>(v);
}

export var isIndexOf = Array.prototype.indexOf !== undefined;
