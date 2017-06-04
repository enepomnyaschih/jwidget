/*!
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

interface Reducer<T, U> {
	initial: U | (() => U);
	callback(accumulator: U, item: T): U;
};

export default Reducer;

export const sum: Reducer<number, number> = {
	initial: 0,
	callback(accumulator: number, item: number) {
		return accumulator + item;
	}
};

export const production: Reducer<number, number> = {
	initial: 1,
	callback(accumulator: number, item: number) {
		return accumulator * item;
	}
};

export const numericAnd: Reducer<number, number> = {
	initial: 0x001FFFFFFFFFFFFF,
	callback(accumulator: number, item: number) {
		return accumulator & item;
	}
};

export const numericOr: Reducer<number, number> = {
	initial: 0,
	callback(accumulator: number, item: number) {
		return accumulator | item;
	}
};

export const numericXor: Reducer<number, number> = {
	initial: 0,
	callback(accumulator: number, item: number) {
		return accumulator ^ item;
	}
};

export const max: Reducer<number, number> = {
	initial: Number.NEGATIVE_INFINITY,
	callback(accumulator: number, item: number) {
		return Math.max(accumulator, item);
	}
};

export const min: Reducer<number, number> = {
	initial: Number.POSITIVE_INFINITY,
	callback(accumulator: number, item: number) {
		return Math.min(accumulator, item);
	}
};

export const concat: Reducer<string, string> = {
	initial: "",
	callback(accumulator: string, item: string) {
		return accumulator + item;
	}
};

export const and: Reducer<boolean, boolean> = {
	initial: true,
	callback(accumulator: boolean, item: boolean) {
		return accumulator && item;
	}
};

export const or: Reducer<boolean, boolean> = {
	initial: false,
	callback(accumulator: boolean, item: boolean) {
		return accumulator || item;
	}
};

export const xor: Reducer<boolean, boolean> = {
	initial: false,
	callback(accumulator: boolean, item: boolean) {
		return accumulator !== item;
	}
};

export interface ReduceState<T, U> {
	value: U;
	callback(accumulator: U, item: T): U;
}

export function initReduceState<T, U>(reducer: Reducer<T, U>): ReduceState<T, U> {
	return {
		value: (typeof reducer.initial === "function") ? reducer.initial() : reducer.initial,
		callback: reducer.callback
	};
}
