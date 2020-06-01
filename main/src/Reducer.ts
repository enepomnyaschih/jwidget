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

/**
 * Describes an operation that can be applied at once to all elements of a collection.
 */
interface Reducer<T, U> {
	/**
	 * Initial accumulator value or a function that creates a new initial accumulator value.
	 */
	readonly initial: U | (() => U);

	/**
	 * Reducing function. Creates a new accumulator value based on current accumulator value and the next item
	 * of a collection.
	 * @param accumulator Current accumulator value.
	 * @param item Next item of the collection
	 * @returns New accumulator value.
	 */
	callback(accumulator: U, item: T): U;
}

export default Reducer;

/**
 * Computes sum of all collection items as numbers.
 */
export const sum: Reducer<any, number> = {
	initial: 0,
	callback(accumulator: number, item: any) {
		return accumulator + Number(item);
	}
};

/**
 * Computes production of all collection items as numbers.
 */
export const production: Reducer<any, number> = {
	initial: 1,
	callback(accumulator: number, item: any) {
		return accumulator * Number(item);
	}
};

/**
 * Computes numeric (bitwise) conjunction (AND) of all collection items as numbers.
 */
export const numericAnd: Reducer<any, number> = {
	initial: 0x001FFFFFFFFFFFFF,
	callback(accumulator: number, item: any) {
		return accumulator & Number(item);
	}
};

/**
 * Computes numeric (bitwise) disjunction (OR) of all collection items as numbers.
 */
export const numericOr: Reducer<any, number> = {
	initial: 0,
	callback(accumulator: number, item: any) {
		return accumulator | Number(item);
	}
};

/**
 * Computes numeric (bitwise) excluding disjunction (XOR) of all collection items as numbers.
 */
export const numericXor: Reducer<any, number> = {
	initial: 0,
	callback(accumulator: number, item: any) {
		return accumulator ^ Number(item);
	}
};

/**
 * Computes maximum item in a collection of numbers.
 */
export const max: Reducer<any, number> = {
	initial: Number.NEGATIVE_INFINITY,
	callback(accumulator: number, item: any) {
		return Math.max(accumulator, Number(item));
	}
};

/**
 * Computes minimum item in a collection of numbers.
 */
export const min: Reducer<any, number> = {
	initial: Number.POSITIVE_INFINITY,
	callback(accumulator: number, item: any) {
		return Math.min(accumulator, Number(item));
	}
};

/**
 * Computes concatenation of all collection items as strings.
 */
export const concat: Reducer<any, string> = {
	initial: "",
	callback(accumulator: string, item: any) {
		return accumulator + String(item);
	}
};

/**
 * Computes logical conjunction (AND) of all collection items as booleans.
 */
export const and: Reducer<any, boolean> = {
	initial: true,
	callback(accumulator: boolean, item: any) {
		return accumulator && Boolean(item);
	}
};

/**
 * Computes logical disjunction (OR) of all collection items as booleans.
 */
export const or: Reducer<any, boolean> = {
	initial: false,
	callback(accumulator: boolean, item: any) {
		return accumulator || Boolean(item);
	}
};

/**
 * Computes logical excluding disjunction (XOR) of all collection items as booleans.
 */
export const xor: Reducer<any, boolean> = {
	initial: false,
	callback(accumulator: boolean, item: any) {
		return accumulator !== Boolean(item);
	}
};
