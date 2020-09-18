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

import Reducer from './Reducer';

export function identity<T>(x: T): T {
	return x;
}

export function cmpPrimitives(x: any, y : any): number {
	return (x > y) ? 1 : (x < y) ? -1 : 0;
}

export interface ReduceState<T, U> {
	value: U;
	callback(accumulator: U, item: T): U;
}

export function initReduceState<T, U>(reducer: Reducer<T, U>): ReduceState<T, U> {
	return {
		value: (typeof reducer.initial === "function") ? (<any>reducer).initial() : reducer.initial,
		callback: reducer.callback
	};
}
