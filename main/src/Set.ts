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

import * as ArrayUtils from './ArrayUtils';
import Bindable from './Bindable';
import Class from './Class';
import Dictionary from './Dictionary';
import Dispatcher from './Dispatcher';
import IDispatcher from './IDispatcher';
import IList from './IList';
import IMap from './IMap';
import {ADAPTER, destroy, SILENT} from './index';
import {vid, VidSet} from './internal';
import IProperty from './IProperty';
import ISet from './ISet';
import List from './List';
import Listenable from './Listenable';
import Map from './Map';
import Property from './Property';
import Reducer from './Reducer';

/**
 * Unordered collection optimized for items adding, removal and search.
 * @param T Item type.
 */
class Set<T> extends Class implements ISet<T> {

	private _ownsItems: Boolean = false;
	private _length: IProperty<number>;
	private _items: VidSet<T>;

	private _spliceEvent: IDispatcher<ISet.SpliceEventParams<T>>;
	private _clearEvent: IDispatcher<ISet.ItemsEventParams<T>>;
	private _changeEvent: IDispatcher<ISet.EventParams<T>>;

	/**
	 * @inheritDoc
	 */
	readonly getKey: (item: T) => any;

	/**
	 * @param silent Create a silent collection which means that it never triggers modification events.
	 */
	constructor(silent?: boolean);

	/**
	 * @param getKey Function that identifies an item in this collection for optimization of some algorithms.
	 * @param silent Create a silent collection which means that it never triggers modification events.
	 */
	constructor(getKey: (item: T) => any, silent?: boolean);

	/**
	 * @param items Initial map contents.
	 * @param silent Create a silent collection which means that it never triggers modification events.
	 */
	constructor(items: T[], silent?: boolean);

	/**
	 * @param items Initial map contents.
	 * @param getKey Function that identifies an item in this collection for optimization of some algorithms.
	 * @param silent Create a silent collection which means that it never triggers modification events.
	 */
	constructor(items: T[], getKey: (item: T) => any, silent?: boolean);
	constructor(a?: any, b?: any, c?: boolean) {
		super();
		if (typeof a === "boolean") {
			c = a;
			a = null;
		} else if (typeof a === "function" || (a == null && typeof b === "boolean")) {
			c = b;
			b = a;
			a = null;
		} else if (typeof b === "boolean") {
			c = b;
			b = null;
		}
		const items: T[] = a || [];
		const silent: boolean = c || false;

		this.getKey = b || vid;

		this._items = VidSet.fromArray<T>(items, this.getKey);
		this._length = this.own(new Property(items.length, silent));

		this._spliceEvent = Dispatcher.make<ISet.SpliceEventParams<T>>(silent);
		this._clearEvent = Dispatcher.make<ISet.ItemsEventParams<T>>(silent);
		this._changeEvent = Dispatcher.make<ISet.EventParams<T>>(silent);
	}

	protected destroyObject(): void {
		this.clear();
		super.destroyObject();
	}

	/**
	 * @inheritDoc
	 */
	get silent() {
		return this.changeEvent.dummy;
	}

	/**
	 * @inheritDoc
	 */
	get length(): Bindable<number> {
		return this._length;
	}

	/**
	 * @inheritDoc
	 */
	get empty() {
		return this.length.get() === 0;
	}

	/**
	 * @inheritDoc
	 */
	get items(): T[] {
		return this._items.values;
	}

	/**
	 * @inheritDoc
	 */
	get first(): T {
		let result: T;
		this._items.every((item) => {
			result = item;
			return false;
		});
		return result;
	}

	/**
	 * @inheritDoc
	 */
	get spliceEvent(): Listenable<ISet.SpliceEventParams<T>> {
		return this._spliceEvent;
	}

	/**
	 * @inheritDoc
	 */
	get clearEvent(): Listenable<ISet.ItemsEventParams<T>> {
		return this._clearEvent;
	}

	/**
	 * @inheritDoc
	 */
	get changeEvent(): Listenable<ISet.EventParams<T>> {
		return this._changeEvent;
	}

	/**
	 * @inheritDoc
	 */
	ownItems(): this {
		this._ownsItems = true;
		return this;
	}

	/**
	 * @inheritDoc
	 */
	clone(): ISet<T> {
		return new Set<T>(this.items, this.getKey, this.silent);
	}

	/**
	 * @inheritDoc
	 */
	contains(item: T): boolean {
		return this._items.contains(item);
	}

	/**
	 * @inheritDoc
	 */
	every(callback: (item: T) => any, scope?: any): boolean {
		return this._items.every(callback, scope);
	}

	/**
	 * @inheritDoc
	 */
	some(callback: (item: T) => any, scope?: any): boolean {
		return !this._items.every((item) => {
			return !callback.call(scope || this, item);
		});
	}

	/**
	 * @inheritDoc
	 */
	forEach(callback: (item: T) => any, scope?: any) {
		this._items.every((item) => {
			callback.call(scope || this, item);
			return true;
		});
	}

	/**
	 * @inheritDoc
	 */
	find(callback: (item: T) => any, scope?: any): T {
		let result: T = undefined;
		this._items.every((item) => {
			if (callback.call(scope || this, item)) {
				result = item;
				return false;
			}
			return true;
		});
		return result;
	}

	/**
	 * @inheritDoc
	 */
	toSorted(callback?: (item: T) => any, scope?: any, order?: number): IList<T> {
		return new List<T>(ArrayUtils.toSorted(this._items.values, callback, scope || this, order), this.getKey, SILENT | ADAPTER);
	}

	/**
	 * @inheritDoc
	 */
	toSortedComparing(compare?: (t1: T, t2: T) => number, scope?: any, order?: number): IList<T> {
		return new List<T>(ArrayUtils.toSortedComparing(this._items.values, compare, scope || this, order), this.getKey, SILENT | ADAPTER);
	}

	/**
	 * @inheritDoc
	 */
	index(callback: (item: T) => any, scope?: any): IMap<T> {
		const result: Dictionary<T> = {};
		this._items.every((item) => {
			const key: string = callback.call(scope || this, item);
			if (key != null) {
				result[key] = item;
			}
			return true;
		});
		return new Map<T>(result, this.getKey, SILENT | ADAPTER);
	}

	/**
	 * @inheritDoc
	 */
	filter(callback: (item: T) => any, scope?: any): ISet<T> {
		return new Set<T>(this._items.values.filter(callback, scope), this.getKey, true);
	}

	/**
	 * @inheritDoc
	 */
	count(callback: (item: T) => any, scope?: any): number {
		return ArrayUtils.count(this._items.values, callback, scope);
	}

	/**
	 * @inheritDoc
	 */
	map<U>(callback: (item: T) => U, scope?: any, getKey?: (item: U) => any): ISet<U> {
		return new Set<U>(this._items.values.map(callback, scope), getKey, true);
	}

	/**
	 * @inheritDoc
	 */
	reduce<U>(reducer: Reducer<T, U>): U;

	/**
	 * @inheritDoc
	 */
	reduce<U>(callback: (accumulator: U, item: T) => U, initial: U): U;
	reduce<U>(reducer: Reducer<T, U> | ((accumulator: U, item: T) => U), initial?: U): U {
		return (typeof reducer === "function") ?
			this._items.values.reduce<U>(reducer, initial) :
			ArrayUtils.reduce<T, U>(this._items.values, reducer);
	}

	/**
	 * @inheritDoc
	 */
	max(callback?: (item: T) => any, scope?: any, order?: number): T {
		return ArrayUtils.max(this._items.values, callback, scope, order);
	}

	/**
	 * @inheritDoc
	 */
	maxComparing(compare?: (t1: T, t2: T) => number, scope?: any, order?: number): T {
		return ArrayUtils.maxComparing(this._items.values, compare, scope, order);
	}

	/**
	 * @inheritDoc
	 */
	min(callback?: (item: T) => any, scope?: any, order?: number): T {
		return ArrayUtils.min(this._items.values, callback, scope, order);
	}

	/**
	 * @inheritDoc
	 */
	minComparing(compare?: (t1: T, t2: T) => number, scope?: any, order?: number): T {
		return ArrayUtils.minComparing(this._items.values, compare, scope, order);
	}

	/**
	 * @inheritDoc
	 */
	toArray(): T[] {
		return this._items.values.concat();
	}

	/**
	 * @inheritDoc
	 */
	toList(): IList<T> {
		return new List<T>(this.toArray(), this.getKey, SILENT | ADAPTER);
	}

	/**
	 * @inheritDoc
	 */
	toSet(): ISet<T> {
		return new Set<T>(this._items.values, this.getKey, true);
	}

	/**
	 * @inheritDoc
	 */
	asArray(): T[] {
		return this.toArray();
	}

	/**
	 * @inheritDoc
	 */
	asList(): IList<T> {
		return this.toList();
	}

	/**
	 * @inheritDoc
	 */
	asSet(): ISet<T> {
		return this;
	}

	/**
	 * @inheritDoc
	 */
	add(item: T): boolean {
		return this.trySplice([], [item]) !== undefined;
	}

	/**
	 * @inheritDoc
	 */
	addAll(items: T[]): T[] {
		var result = this.tryAddAll(items);
		return (result !== undefined) ? result : [];
	}

	/**
	 * @inheritDoc
	 */
	tryAddAll(items: T[]): T[] {
		var spliceResult = this.trySplice([], items);
		if (spliceResult !== undefined) {
			return spliceResult.addedItems;
		}
		return undefined;
	}

	/**
	 * @inheritDoc
	 */
	remove(item: T): boolean {
		return this.trySplice([item], []) !== undefined;
	}

	/**
	 * @inheritDoc
	 */
	removeItem(item: T) {
		this.remove(item);
	}

	/**
	 * @inheritDoc
	 */
	removeAll(items: T[]): T[] {
		var result = this.tryRemoveAll(items);
		return (result !== undefined) ? result : [];
	}

	/**
	 * @inheritDoc
	 */
	tryRemoveAll(items: T[]): T[] {
		var spliceResult = this.trySplice(items, []);
		if (spliceResult !== undefined) {
			return spliceResult.removedItems;
		}
		return undefined;
	}

	/**
	 * @inheritDoc
	 */
	removeItems(items: T[]) {
		this.tryRemoveAll(items);
	}

	/**
	 * @inheritDoc
	 */
	clear(): T[] {
		if (this._length.get() === 0) {
			return undefined;
		}
		const items: T[] = this._items.values.concat();
		this._items.clear();
		this._length.set(0);
		this._clearEvent.dispatch({sender: this, items: items});
		this._changeEvent.dispatch({sender: this});
		if (this._ownsItems) {
			ArrayUtils.backEvery(items, destroy);
		}
		return items;
	}

	/**
	 * @inheritDoc
	 */
	splice(removedItems: T[], addedItems: T[]): ISet.SpliceResult<T> {
		var spliceResult = this.trySplice(removedItems, addedItems);
		return (spliceResult !== undefined) ? spliceResult : {addedItems: [], removedItems: []};
	}

	/**
	 * @inheritDoc
	 */
	trySplice(removedItems: T[], addedItems: T[]): ISet.SpliceResult<T> {
		const spliceResult = this._trySplice(removedItems, addedItems);
		if (spliceResult === undefined) {
			return undefined;
		}
		this._spliceEvent.dispatch({sender: this, spliceResult: spliceResult});
		this._changeEvent.dispatch({sender: this});
		if (this._ownsItems) {
			ArrayUtils.backEvery(spliceResult.removedItems, destroy);
		}
		return spliceResult;
	}

	private _trySplice(removedItems: T[], addedItems: T[]): ISet.SpliceResult<T> {
		const addedItemSet = VidSet.fromArray<T>(addedItems, this.getKey);
		removedItems = removedItems.filter(function (item) {
			return !addedItemSet.contains(item);
		});
		removedItems = this._tryRemoveAll(removedItems);
		addedItems = this._tryAddAll(addedItems);
		if ((removedItems === undefined) && (addedItems === undefined)) {
			return undefined;
		}
		const spliceResult = {removedItems: removedItems || [], addedItems: addedItems || []};
		this._length.set(this._length.get() + spliceResult.addedItems.length - spliceResult.removedItems.length);
		return spliceResult;
	}

	private _tryRemoveAll(items: T[]): T[] {
		const removedItems: T[] = [];
		for (let i = 0, l = items.length; i < l; ++i) {
			const item = items[i];
			if (this._tryRemove(item)) {
				removedItems.push(item);
			}
		}
		if (removedItems.length !== 0) {
			return removedItems;
		}
		return undefined;
	}

	private _tryRemove(item: T): boolean {
		return this._items.remove(item) || undefined;
	}

	private _tryAddAll(items: T[]): T[] {
		const addedItems: T[] = [];
		for (let i = 0, l = items.length; i < l; ++i) {
			const item = items[i];
			if (this._tryAdd(item)) {
				addedItems.push(item);
			}
		}
		if (addedItems.length !== 0) {
			return addedItems;
		}
		return undefined;
	}

	private _tryAdd(item: T): boolean {
		return this._items.add(item) || undefined;
	}

	/**
	 * @inheritDoc
	 */
	detectSplice(newItemArray: T[]): ISet.SpliceParams<T> {
		const removedItems: T[] = [];
		const addedItems: T[] = [];
		const oldItems = this._items;
		const newItems = VidSet.fromArray<T>(newItemArray);
		const oldItemArray = this._items.values;
		for (let i = 0, l = oldItemArray.length; i < l; ++i) {
			const item = oldItemArray[i];
			if (!newItems.contains(item)) {
				removedItems.push(item);
			}
		}
		for (let i = 0, l = newItemArray.length; i < l; ++i) {
			const item = newItemArray[i];
			if (!oldItems.contains(item)) {
				addedItems.push(item);
			}
		}
		if ((removedItems.length !== 0) || (addedItems.length !== 0)) {
			return {removedItems: removedItems, addedItems: addedItems};
		}
		return undefined;
	}

	/**
	 * @inheritDoc
	 */
	performSplice(newItems: T[]) {
		var spliceParams = this.detectSplice(newItems);
		if (spliceParams !== undefined) {
			this.trySplice(spliceParams.removedItems, spliceParams.addedItems);
		}
	}

	/**
	 * @inheritDoc
	 */
	equal(array: T[]): boolean {
		if (this.length.get() !== array.length) {
			return false;
		}
		for (let i = 0, l = array.length; i < l; ++i) {
			if (!this._items.contains(array[i])) {
				return false;
			}
		}
		return true;
	}
}

export default Set;
