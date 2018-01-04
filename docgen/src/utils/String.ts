export function repeat(value: string, count: number): string[];
export function repeat(value: string, count: number, separator: string): string;
export function repeat(value: string, count: number, separator?: string): any {
	const arr = new Array<string>(count);
	while (count > 0) {
		arr[--count] = value;
	}
	return (separator == null) ? arr : arr.join(separator);
}
