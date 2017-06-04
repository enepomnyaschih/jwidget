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

export const sum: Reducer<any, number> = {
	initial: 0,
	callback(accumulator: number, item: any) {
		return accumulator + Number(item);
	}
};

export const production: Reducer<any, number> = {
	initial: 1,
	callback(accumulator: number, item: any) {
		return accumulator * Number(item);
	}
};

export const numericAnd: Reducer<any, number> = {
	initial: 0x001FFFFFFFFFFFFF,
	callback(accumulator: number, item: any) {
		return accumulator & Number(item);
	}
};

export const numericOr: Reducer<any, number> = {
	initial: 0,
	callback(accumulator: number, item: any) {
		return accumulator | Number(item);
	}
};

export const numericXor: Reducer<any, number> = {
	initial: 0,
	callback(accumulator: number, item: any) {
		return accumulator ^ Number(item);
	}
};

export const max: Reducer<any, number> = {
	initial: Number.NEGATIVE_INFINITY,
	callback(accumulator: number, item: any) {
		return Math.max(accumulator, Number(item));
	}
};

export const min: Reducer<any, number> = {
	initial: Number.POSITIVE_INFINITY,
	callback(accumulator: number, item: any) {
		return Math.min(accumulator, Number(item));
	}
};

export const concat: Reducer<any, string> = {
	initial: "",
	callback(accumulator: string, item: any) {
		return accumulator + String(item);
	}
};

export const and: Reducer<any, boolean> = {
	initial: true,
	callback(accumulator: boolean, item: any) {
		return accumulator && Boolean(item);
	}
};

export const or: Reducer<any, boolean> = {
	initial: false,
	callback(accumulator: boolean, item: any) {
		return accumulator || Boolean(item);
	}
};

export const xor: Reducer<any, boolean> = {
	initial: false,
	callback(accumulator: boolean, item: any) {
		return accumulator !== Boolean(item);
	}
};
