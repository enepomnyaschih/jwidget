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

import Dictionary from './Dictionary';
import Reducer from './Reducer';

export function identity<T>(x: T): T {
	return x;
}

export function cmpPrimitives(x: any, y : any): number {
	return (x > y) ? 1 : (x < y) ? -1 : 0;
}

export function countMerged(arrays: any[][]): number {
	var result = 0;
	for (var i = 0, l = arrays.length; i < l; ++i) {
		result += arrays[i].length;
	}
	return result;
}

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

let vidWarning = true;

/**
 * Returns value unique ID. Can recognize all primitive types and `Identifiable` instances.
 * For other objects, returns null.
 */
export function vid(value: any): string {
	if (value === undefined) {
		return "u";
	}
	if (value === null) {
		return "n";
	}
	if (value === true) {
		return "t";
	}
	if (value === false) {
		return "f";
	}
	const type = typeof value;
	if (type === "number") {
		return "n" + value;
	}
	if (type === "string") {
		return "s" + value;
	}
	const iid = value.iid;
	if (iid) {
		return "i" + iid;
	}
	if (vidWarning) {
		vidWarning = false;
		console.error(
			"Inefficient code detected: value ", value, " doesn't have a unique identifier. " +
			"Consider inheriting it from jwidget/Class, jwidget/Identifiable or " +
			"assigning a proper getKey callback to a specific collection/algorithm.");
	}
	return undefined;
}

export interface Pair<K, V> {
	k: K;
	v: V;
}

export class VidMap<K, V> {
	private _dict: Dictionary<Pair<K, V>> = {};
	private _array: Pair<K, V>[] = [];
	private _cache: V[];

	constructor(private _getKey: (key: K) => any = vid) {
	}

	get values(): V[] {
		if (this._cache !== undefined) {
			return this._cache;
		}
		const result = this._array.map((pair) => pair.v);
		const dict = this._dict;
		for (let id in dict) {
			result.push(dict[id].v);
		}
		this._cache = result;
		return result;
	}

	put(key: K, value: V): V {
		if (key === undefined || value === undefined) {
			throw new TypeError("Invalid argument: undefined keys or values are not supported in collections.")
		}
		const id = this._getKey(key);
		const oldPair = id ? this._dict[id] : this._pair(key);
		if (oldPair !== undefined) {
			const oldValue = oldPair.v;
			if (oldValue === value) {
				return value;
			}
			oldPair.v = value;
			this._cache = undefined;
			return oldValue;
		}
		const newPair = {k: key, v: value};
		if (id !== undefined) {
			this._dict[id] = newPair;
		} else {
			this._array.push(newPair);
		}
		this._cache = undefined;
		return undefined;
	}

	get(key: K): V {
		const id = this._getKey(key);
		const pair = (id !== undefined) ? this._dict[id] : this._pair(key);
		return (pair !== undefined) ? pair.v : undefined;
	}

	remove(key: K): V {
		const id = this._getKey(key);
		if (id !== undefined) {
			if (!this._dict.hasOwnProperty(id)) {
				return undefined;
			}
			const result = this._dict[id].v;
			delete this._dict[id];
			this._cache = undefined;
			return result;
		}
		const index = this._index(key);
		if (index === undefined) {
			return undefined;
		}
		const result = this._array[index].v;
		this._array.splice(index, 1);
		this._cache = undefined;
		return result;
	}

	clear() {
		this._dict = {};
		this._array = [];
		this._cache = undefined;
	}

	every(test: (value: V, key: K) => any, scope?: any): boolean {
		scope = scope || this;
		if (!this._array.every((pair) => test.call(scope, pair.v, pair.k))) {
			return false;
		}
		const dict = this._dict;
		for (let key in dict) {
			const pair = dict[key];
			if (!test.call(scope, pair.v, pair.k)) {
				return false;
			}
		}
		return true;
	}

	private _index(key: K): number {
		const arr = this._array;
		for (let i = 0, l = arr.length; i < l; ++i) {
			const pair = arr[i];
			if (pair.k === key) {
				return i;
			}
		}
		return undefined;
	}

	private _pair(key: K): Pair<K, V> {
		const index = this._index(key);
		return (index !== undefined) ? this._array[index] : undefined;
	}
}

export class VidSet<T> {
	private _dict: Dictionary<T> = {};
	private _array: T[] = [];
	private _cache: T[];

	constructor(private _getKey: (item: T) => any = vid) {
	}

	get values(): T[] {
		if (this._cache !== undefined) {
			return this._cache;
		}
		const result = this._array.concat();
		const dict = this._dict;
		for (let id in dict) {
			result.push(dict[id]);
		}
		this._cache = result;
		return result;
	}

	add(item: T): boolean {
		if (item === undefined) {
			throw new TypeError("Invalid argument: undefined values are not supported in collections.")
		}
		const id = this._getKey(item);
		if (id !== undefined) {
			const dict = this._dict;
			if (dict.hasOwnProperty(id)) {
				return false;
			}
			dict[id] = item;
			this._cache = undefined;
			return true;
		}
		const index = this._index(item);
		if (index !== undefined) {
			return false;
		}
		this._array.push(item);
		this._cache = undefined;
		return undefined;
	}

	contains(item: T): boolean {
		const id = this._getKey(item);
		return (id !== undefined) ? this._dict.hasOwnProperty(id) : (this._index(item) !== undefined);
	}

	remove(item: T): boolean {
		const id = this._getKey(item);
		if (id !== undefined) {
			if (!this._dict.hasOwnProperty(id)) {
				return false;
			}
			delete this._dict[id];
			this._cache = undefined;
			return true;
		}
		const index = this._index(item);
		if (index === undefined) {
			return false;
		}
		this._array.splice(index, 1);
		this._cache = undefined;
		return true;
	}

	clear() {
		this._dict = {};
		this._array = [];
		this._cache = undefined;
	}

	every(test: (item: T) => any, scope?: any): boolean {
		if (!this._array.every(test, scope)) {
			return false;
		}
		const dict = this._dict;
		for (let key in dict) {
			const item = dict[key];
			if (!test.call(this, item)) {
				return false;
			}
		}
		return true;
	}

	private _index(item: T): number {
		const arr = this._array;
		for (let i = 0, l = arr.length; i < l; ++i) {
			if (arr[i] === item) {
				return i;
			}
		}
		return undefined;
	}

	static fromArray<T>(items: T[], getKey?: (item: T) => any) {
		const set = new VidSet<T>(getKey);
		items.forEach(set.add, set);
		return set;
	}

	static fromDictionary<T>(items: Dictionary<T>, getKey?: (item: T) => any) {
		const set = new VidSet<T>(getKey);
		for (let key in items) {
			set.add(items[key]);
		}
		return set;
	}
}
