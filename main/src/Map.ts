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
import Destroyable from './Destroyable';
import Dictionary from './Dictionary';
import * as DictionaryUtils from './DictionaryUtils';
import Dispatcher from './Dispatcher';
import IDispatcher from './IDispatcher';
import IList from './IList';
import IMap from './IMap';
import {ADAPTER, apply, CollectionFlags, destroy, SILENT} from './index';
import {vid, VidSet} from './internal';
import IProperty from './IProperty';
import ISet from './ISet';
import List from './List';
import Listenable from './Listenable';
import Property from './Property';
import Reducer from './Reducer';
import Set from './Set';
import Some from './Some';

/**
 * Unordered key-value collection. Each item has its own string key.
 * @param T Item type.
 */
class Map<T> extends Class implements IMap<T> {
	private _ownsItems: Boolean = false;
	private _length: IProperty<number>;
	private _adapter: boolean;
	private _items: Dictionary<T>;

	private _spliceEvent: IDispatcher<IMap.SpliceEventParams<T>>;
	private _reindexEvent: IDispatcher<IMap.ReindexEventParams<T>>;
	private _clearEvent: IDispatcher<IMap.ItemsEventParams<T>>;
	private _changeEvent: IDispatcher<IMap.EventParams<T>>;

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
	 * @param flags Collection configuration flags.
	 */
	constructor(items: Dictionary<T>, flags?: CollectionFlags);

	/**
	 * @param items Initial map contents.
	 * @param getKey Function that identifies an item in this collection for optimization of some algorithms.
	 * @param flags Collection configuration flags.
	 */
	constructor(items: Dictionary<T>, getKey: (item: T) => any, flags?: CollectionFlags);
	constructor(a?: any, b?: any, c?: CollectionFlags) {
		super();
		if (typeof a === "boolean") {
			c = a ? SILENT : 0;
			a = null;
		} else if (typeof a === "function" || (a == null && typeof b === "boolean")) {
			c = b ? SILENT : 0;
			b = a;
			a = null;
		} else if (typeof b === "number") {
			c = b;
			b = null;
		}
		const items: Dictionary<T> = a;
		const silent = Boolean(c & SILENT);
		const adapter = (items != null) && Boolean(c & ADAPTER);

		this.getKey = b || vid;

		this._adapter = adapter;
		this._items = this._adapter ? items : apply<T>({}, items);
		this._length = this.own(new Property(DictionaryUtils.getLength(this._items), silent));

		this._spliceEvent = Dispatcher.make<IMap.SpliceEventParams<T>>(silent);
		this._reindexEvent = Dispatcher.make<IMap.ReindexEventParams<T>>(silent);
		this._clearEvent = Dispatcher.make<IMap.ItemsEventParams<T>>(silent);
		this._changeEvent = Dispatcher.make<IMap.EventParams<T>>(silent);
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
	get first(): T {
		return DictionaryUtils.getFirst(this._items);
	}

	/**
	 * @inheritDoc
	 */
	get firstKey(): string {
		return DictionaryUtils.getFirstKey(this._items);
	}

	/**
	 * @inheritDoc
	 */
	get items(): Dictionary<T> {
		return this._items;
	}

	/**
	 * @inheritDoc
	 */
	get spliceEvent(): Listenable<IMap.SpliceEventParams<T>> {
		return this._spliceEvent;
	}

	/**
	 * @inheritDoc
	 */
	get reindexEvent(): Listenable<IMap.ReindexEventParams<T>> {
		return this._reindexEvent;
	}

	/**
	 * @inheritDoc
	 */
	get clearEvent(): Listenable<IMap.ItemsEventParams<T>> {
		return this._clearEvent;
	}

	/**
	 * @inheritDoc
	 */
	get changeEvent(): Listenable<IMap.EventParams<T>> {
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
	clone(): IMap<T> {
		return new Map<T>(this.items, this.getKey, this.silent ? SILENT : 0);
	}

	/**
	 * @inheritDoc
	 */
	get(key: string): T {
		return this._items[key];
	}

	/**
	 * @inheritDoc
	 */
	getKeys(): IList<string> {
		return new List<string>(Object.keys(this._items), String, SILENT | ADAPTER);
	}

	/**
	 * @inheritDoc
	 */
	contains(item: T): boolean {
		return DictionaryUtils.contains(this._items, item);
	}

	/**
	 * @inheritDoc
	 */
	containsKey(key: string): boolean {
		return this.get(key) !== undefined;
	}

	/**
	 * @inheritDoc
	 */
	keyOf(item: T): string {
		return DictionaryUtils.keyOf(this._items, item);
	}

	/**
	 * @inheritDoc
	 */
	every(callback: (item: T, key: string) => any, scope?: any): boolean {
		return DictionaryUtils.every(this._items, callback, scope || this);
	}

	/**
	 * @inheritDoc
	 */
	some(callback: (item: T, key: string) => any, scope?: any): boolean {
		return DictionaryUtils.some(this._items, callback, scope || this);
	}

	/**
	 * @inheritDoc
	 */
	forEach(callback: (item: T, key: string) => any, scope?: any): void {
		DictionaryUtils.forEach(this._items, callback, scope || this);
	}

	/**
	 * @inheritDoc
	 */
	findKey(callback: (item: T, key: string) => any, scope?: any): string {
		return DictionaryUtils.findKey(this._items, callback, scope || this);
	}

	/**
	 * @inheritDoc
	 */
	find(callback: (item: T, key: string) => any, scope?: any): T {
		return DictionaryUtils.find(this._items, callback, scope || this);
	}

	/**
	 * @inheritDoc
	 */
	toSorted(callback?: (item: T, key: string) => any, scope?: any, order?: number): IList<T> {
		return new List<T>(DictionaryUtils.toSorted(this._items, callback, scope || this, order), this.getKey, SILENT | ADAPTER);
	}

	/**
	 * @inheritDoc
	 */
	toSortedComparing(compare?: (t1: T, t2: T, k1: string, k2: string) => number, scope?: any, order?: number): IList<T> {
		return new List<T>(DictionaryUtils.toSortedComparing(this._items, compare, scope || this, order), this.getKey, SILENT | ADAPTER);
	}

	/**
	 * @inheritDoc
	 */
	getSortingKeys(callback?: (item: T, key: string) => any, scope?: any, order?: number): IList<string> {
		return new List<string>(DictionaryUtils.getSortingKeys(this._items, callback, scope || this, order), String, SILENT | ADAPTER);
	}

	/**
	 * @inheritDoc
	 */
	getSortingKeysComparing(compare?: (t1: T, t2: T, k1: string, k2: string) => number, scope?: any, order?: number): IList<string> {
		return new List<string>(DictionaryUtils.getSortingKeysComparing(this._items, compare, scope || this, order), String, SILENT | ADAPTER);
	}

	/**
	 * @inheritDoc
	 */
	filter(callback: (item: T, key: string) => any, scope?: any): IMap<T> {
		return new Map<T>(DictionaryUtils.filter(this._items, callback, scope || this), this.getKey, SILENT | ADAPTER);
	}

	/**
	 * @inheritDoc
	 */
	count(callback: (item: T, key: string) => any, scope?: any): number {
		return DictionaryUtils.count(this._items, callback, scope || this);
	}

	/**
	 * @inheritDoc
	 */
	map<U>(callback: (item: T, key: string) => U, scope?: any, getKey?: (item: U) => any): IMap<U> {
		return new Map<U>(DictionaryUtils.map(this._items, callback, scope || this), getKey, SILENT | ADAPTER);
	}

	/**
	 * @inheritDoc
	 */
	index(callback: (item: T, key: string) => any, scope?: any): IMap<T> {
		return new Map<T>(DictionaryUtils.index(this._items, callback, scope || this), this.getKey, SILENT | ADAPTER);
	}

	/**
	 * @inheritDoc
	 */
	reduce<U>(reducer: Reducer<T, U>): U;

	/**
	 * @inheritDoc
	 */
	reduce<U>(callback: (accumulator: U, item: T, key: string) => U, initial: U): U;

	/**
	 * @inheritDoc
	 */
	reduce<U>(reducer: Reducer<T, U> | ((accumulator: U, item: T, key: string) => U), initial?: U): U {
		return (typeof reducer === "function") ?
			DictionaryUtils.reduce<T, U>(this.items, reducer, initial) :
			DictionaryUtils.reduce<T, U>(this.items, reducer);
	}

	/**
	 * @inheritDoc
	 */
	max(callback?: (item: T, key: string) => any, scope?: any, order?: number): T {
		return DictionaryUtils.max(this._items, callback, scope, order);
	}

	/**
	 * @inheritDoc
	 */
	maxKey(callback?: (item: T, key: string) => any, scope?: any, order?: number): string {
		return DictionaryUtils.maxKey(this._items, callback, scope, order);
	}

	/**
	 * @inheritDoc
	 */
	maxComparing(compare?: (t1: T, t2: T, k1: string, k2: string) => number, scope?: any, order?: number): T {
		return DictionaryUtils.maxComparing(this._items, compare, scope, order);
	}

	/**
	 * @inheritDoc
	 */
	maxKeyComparing(compare?: (t1: T, t2: T, k1: string, k2: string) => number, scope?: any, order?: number): string {
		return DictionaryUtils.maxKeyComparing(this._items, compare, scope, order);
	}

	/**
	 * @inheritDoc
	 */
	min(callback?: (item: T, key: string) => any, scope?: any, order?: number): T {
		return DictionaryUtils.min(this._items, callback, scope, order);
	}

	/**
	 * @inheritDoc
	 */
	minKey(callback?: (item: T, key: string) => any, scope?: any, order?: number): string {
		return DictionaryUtils.minKey(this._items, callback, scope, order);
	}

	/**
	 * @inheritDoc
	 */
	minComparing(compare?: (t1: T, t2: T, k1: string, k2: string) => number, scope?: any, order?: number): T {
		return DictionaryUtils.minComparing(this._items, compare, scope, order);
	}

	/**
	 * @inheritDoc
	 */
	minKeyComparing(compare?: (t1: T, t2: T, k1: string, k2: string) => number, scope?: any, order?: number): string {
		return DictionaryUtils.minKeyComparing(this._items, compare, scope, order);
	}

	/**
	 * @inheritDoc
	 */
	toArray(): T[] {
		return DictionaryUtils.toArray(this._items);
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
		return new Set<T>(this.toArray(), this.getKey, true);
	}

	/**
	 * @inheritDoc
	 */
	toDictionary(): Dictionary<T> {
		return apply<T>({}, this._items);
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
		return this.toSet();
	}

	/**
	 * @inheritDoc
	 */
	asDictionary(): Dictionary<T> {
		return this._items;
	}

	/**
	 * @inheritDoc
	 */
	tryPut(key: string, item: T): Some<T> {
		const result = DictionaryUtils.tryPut(this._items, key, item);
		if (result === undefined) {
			return undefined;
		}
		const removedItem = result.value;
		if (removedItem === undefined) {
			this._length.set(this._length.get() + 1);
		}
		if (!this.silent) {
			const removedItems: Dictionary<T> = {};
			if (removedItem !== undefined) {
				removedItems[key] = removedItem;
			}
			const addedItems: Dictionary<T> = {};
			addedItems[key] = item;
			const spliceResult = {removedItems: removedItems, addedItems: addedItems};
			this._spliceEvent.dispatch({sender: this, spliceResult: spliceResult});
			this._changeEvent.dispatch({sender: this});
		}
		if (removedItem !== undefined && this._ownsItems) {
			(<Destroyable><any>removedItem).destroy();
		}
		return result;
	}

	/**
	 * @inheritDoc
	 */
	put(key: string, item: T): T {
		const result = this.tryPut(key, item);
		return (result !== undefined) ? result.value : this.get(key);
	}

	/**
	 * @inheritDoc
	 */
	putAll(items: Dictionary<T>) {
		if (!this.silent) {
			this.tryPutAll(items);
			return;
		}
		for (var key in items) {
			this.tryPut(key, items[key]);
		}
	}

	/**
	 * @inheritDoc
	 */
	putAllVerbose(items: Dictionary<T>): IMap.SpliceResult<T> {
		var spliceResult = this.tryPutAll(items);
		return (spliceResult !== undefined) ? spliceResult : {removedItems: {}, addedItems: {}};
	}

	/**
	 * @inheritDoc
	 */
	tryPutAll(items: Dictionary<T>): IMap.SpliceResult<T> {
		return this.trySplice([], items);
	}

	/**
	 * @inheritDoc
	 */
	setKey(oldKey: string, newKey: string): T {
		this.trySetKey(oldKey, newKey);
		return this._items[newKey];
	}

	/**
	 * @inheritDoc
	 */
	trySetKey(oldKey: string, newKey: string): T {
		const item = DictionaryUtils.trySetKey(this._items, oldKey, newKey);
		if (item === undefined) {
			return undefined;
		}
		if (!this.silent) {
			this._reindexEvent.dispatch({sender: this, keyMap: {[oldKey]: newKey}});
			this._changeEvent.dispatch({sender: this});
		}
		return item;
	}

	/**
	 * @inheritDoc
	 */
	tryRemove(key: string): T {
		const item = DictionaryUtils.tryRemove(this._items, key);
		if (item === undefined) {
			return undefined;
		}
		this._length.set(this._length.get() - 1);
		if (!this.silent) {
			const spliceResult: IMap.SpliceResult<T> = {addedItems: {}, removedItems: {[key]: item}};
			this._spliceEvent.dispatch({sender: this, spliceResult: spliceResult});
			this._changeEvent.dispatch({sender: this});
		}
		if (this._ownsItems) {
			(<Destroyable><any>item).destroy();
		}
		return item;
	}

	/**
	 * @inheritDoc
	 */
	remove(key: string): T {
		return this.tryRemove(key);
	}

	/**
	 * @inheritDoc
	 */
	removeItem(item: T): string {
		var key = this.keyOf(item);
		if (key !== undefined) {
			this.tryRemove(key);
		}
		return key;
	}

	/**
	 * @inheritDoc
	 */
	removeAll(keys: string[]) {
		if (!this.silent) {
			this.tryRemoveAll(keys);
			return;
		}
		for (let i = 0, l = keys.length; i < l; ++i) {
			this.tryRemove(keys[i]);
		}
	}

	/**
	 * @inheritDoc
	 */
	removeAllVerbose(keys: string[]): Dictionary<T> {
		const items = this.tryRemoveAll(keys);
		return (items !== undefined) ? items : {};
	}

	/**
	 * @inheritDoc
	 */
	tryRemoveAll(keys: string[]): Dictionary<T> {
		const spliceResult = this.trySplice(keys, {});
		if (spliceResult !== undefined) {
			return spliceResult.removedItems;
		}
		return undefined;
	}

	/**
	 * @inheritDoc
	 */
	removeItems(items: T[]) {
		const itemSet = VidSet.fromArray<T>(items, this.getKey);
		const newItems = DictionaryUtils.filter(this._items, function (item) {
			return !itemSet.contains(item);
		});
		this.performSplice(newItems);
	}

	/**
	 * @inheritDoc
	 */
	clear(): Dictionary<T> {
		if (this._length.get() === 0) {
			return undefined;
		}
		let items: Dictionary<T>;
		this._length.set(0);
		if (this._adapter) {
			items = DictionaryUtils.tryClear(this._items);
		} else {
			items = this._items;
			this._items = {};
		}
		this._clearEvent.dispatch({sender: this, items: items});
		this._changeEvent.dispatch({sender: this});
		if (this._ownsItems) {
			ArrayUtils.backEvery(DictionaryUtils.toArray(items), destroy);
		}
		return items;
	}

	/**
	 * @inheritDoc
	 */
	splice(removedKeys: string[], updatedItems: Dictionary<T>): IMap.SpliceResult<T> {
		var spliceResult = this.trySplice(removedKeys, updatedItems);
		return (spliceResult !== undefined) ? spliceResult : {removedItems: {}, addedItems: {}};
	}

	/**
	 * @inheritDoc
	 */
	trySplice(removedKeys: string[], updatedItems: Dictionary<T>): IMap.SpliceResult<T> {
		const spliceResult = DictionaryUtils.trySplice(this._items, removedKeys, updatedItems);
		if (spliceResult === undefined) {
			return undefined;
		}
		this._length.set(this._length.get() + DictionaryUtils.getLength(spliceResult.addedItems) - DictionaryUtils.getLength(spliceResult.removedItems));
		this._spliceEvent.dispatch({sender: this, spliceResult: spliceResult});
		this._changeEvent.dispatch({sender: this});
		if (this._ownsItems) {
			ArrayUtils.backEvery(DictionaryUtils.toArray(spliceResult.removedItems), destroy);
		}
		return spliceResult;
	}

	/**
	 * @inheritDoc
	 */
	reindex(keyMap: Dictionary<string>): Dictionary<string> {
		var result = this.tryReindex(keyMap);
		return (result !== undefined) ? result : {};
	}

	/**
	 * @inheritDoc
	 */
	tryReindex(keyMap: Dictionary<string>): Dictionary<string> {
		const result = DictionaryUtils.tryReindex(this._items, keyMap);
		if (result === undefined) {
			return undefined;
		}
		this._reindexEvent.dispatch({sender: this, keyMap: result});
		this._changeEvent.dispatch({sender: this});
		return result;
	}

	/**
	 * @inheritDoc
	 */
	detectSplice(newItems: Dictionary<T>): IMap.SpliceParams<T> {
		return DictionaryUtils.detectSplice(this._items, newItems);
	}

	/**
	 * @inheritDoc
	 */
	detectReindex(newItems: Dictionary<T>): Dictionary<string> {
		return DictionaryUtils.detectReindex(this._items, newItems, this.getKey);
	}

	/**
	 * @inheritDoc
	 */
	performSplice(newItems: Dictionary<T>) {
		var params = this.detectSplice(newItems);
		if (params !== undefined) {
			this.trySplice(params.removedKeys, params.updatedItems);
		}
	}

	/**
	 * @inheritDoc
	 */
	performReindex(newItems: Dictionary<T>) {
		var keyMap = this.detectReindex(newItems);
		if (keyMap !== undefined) {
			this.tryReindex(keyMap);
		}
	}

	/**
	 * @inheritDoc
	 */
	equal(map: Dictionary<T>): boolean {
		return DictionaryUtils.equal(this._items, map);
	}
}

export default Map;
