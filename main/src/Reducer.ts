/*
	jWidget 2
	Copyright (C) 2017  Egor Nepomnyaschih
	enepomnyaschih@gmail.com
	https://github.com/enepomnyaschih/jwidget

	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU Lesser General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU Lesser General Public License for more details.

	You should have received a copy of the GNU Lesser General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.
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
