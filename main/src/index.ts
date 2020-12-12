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

import {cmpPrimitives} from './internal';

export {identity} from './internal';

/**
 * Universal and sophisticated comparer for array sorting. Broadly speaking, it:
 *
 * - Returns 1, if x > y
 * - Returns -1, if x < y
 * - Returns 0, if x == y
 *
 * See online documentation for details.
 */
export function cmp(x: any, y: any): number {
	return smartCmp(x, y);
}

/**
 * Universal and sophisticated comparer for array sorting. Broadly speaking, it:
 *
 * - Returns 1, if x > y
 * - Returns -1, if x < y
 * - Returns 0, if x == y
 *
 * See online documentation for details.
 */
export function smartCmp(x: any, y: any, config?: CmpConfig): number {
	const xRank = getTypeRank(x);
	const yRank = getTypeRank(y);
	if (xRank !== yRank) {
		return cmpPrimitives(xRank, yRank);
	}
	switch (xRank) {
		case "array":
			return cmpArrays(x, y, config);
		case "boolean":
			return cmpBooleans(x, y);
		case "string":
			return cmpStrings(x, y, config);
		default:
			return cmpPrimitives(x, y);
	}
}

/**
 * `cmp` function configuration object.
 */
export interface CmpConfig {
	/**
	 * Ignore case when comparing strings.
	 */
	readonly caseInsensitive?: boolean;

	/**
	 * Compare digit sequences as numbers when comparing strings.
	 */
	readonly compareNumbersInStrings?: boolean;
}

function getTypeRank(x: any): string {
	return (x === undefined) ? "0" : (x === null) ? "1" : Array.isArray(x) ? "array" : typeof x;
}

function cmpArrays(x: any[], y: any[], config?: CmpConfig): number {
	const n = Math.min(x.length, y.length);
	for (let i = 0; i < n; ++i) {
		let result = smartCmp(x[i], y[i], config);
		if (result) {
			return result;
		}
	}
	return cmpPrimitives(x.length, y.length);
}

function cmpBooleans(x: boolean, y: boolean): number {
	return x ? (y ? 0 : 1) : (y ? -1 : 0);
}

function cmpStrings(x: string, y: string, config?: CmpConfig): number {
	x = x || "";
	y = y || "";
	if (config && config.caseInsensitive) {
		x = x.toLowerCase();
		y = y.toLowerCase();
	}
	if (!config || !config.compareNumbersInStrings) {
		return cmpPrimitives(x, y);
	}
	let xIndex = 0;
	let yIndex = 0;
	while (true) {
		let xLength = x.substr(xIndex).search(/\d+/);
		if (xLength === -1) {
			xLength = x.length - xIndex;
		}
		let yLength = y.substr(yIndex).search(/\d+/);
		if (yLength === -1) {
			yLength = y.length - yIndex;
		}
		const result1 = cmpPrimitives(x.substr(xIndex, xLength), y.substr(yIndex, yLength));
		if (result1) {
			return result1;
		}
		xIndex += xLength;
		yIndex += yLength;
		const xMatches = /^\d+/.exec(x.substr(xIndex));
		const yMatches = /^\d+/.exec(y.substr(yIndex));
		if (xMatches == null || yMatches == null) {
			return cmpBooleans(xMatches != null, yMatches != null);
		}
		const xNumber = +xMatches[0];
		const yNumber = +yMatches[0];
		const result2 = cmpPrimitives(xNumber, yNumber);
		if (result2) {
			return result2;
		}
		xIndex += xMatches[0].length;
		yIndex += yMatches[0].length;
	}
}

/**
 * Calls object method `destroy` if available. Can be used in mapper configuration.
 */
export function destroy(obj: any): any {
	if (obj && typeof obj.destroy === "function") {
		obj.destroy();
	}
}

/**
 * Shorthand for Binding.UPDATE.
 */
export const UPDATE = 1;

/**
 * Shorthand for Binding.WATCH.
 */
export const WATCH = 2;

/**
 * Shorthand for Binding.TWOWAY.
 */
export const TWOWAY = 3;

/**
 * jWidget binding modes. All options have shorthands.
 */
export enum Binding {
	/**
	 * Bind invoker to argument. Always used as default binding.
	 */
	UPDATE = 1,

	/**
	 * Bind argument to invoker. Always supplied with a no-argument method, which creates the property automatically.
	 */
	WATCH = 2,

	/**
	 * Bind invoker and argument to each other. UPDATE-binding is applied first.
	 */
	TWOWAY = 3
}
