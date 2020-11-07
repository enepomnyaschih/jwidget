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

import Bindable from './Bindable';
import Class from './Class';
import Destroyable from './Destroyable';
import Dispatcher from './Dispatcher';
import IBindableMap from './IBindableMap';
import IDispatcher from './IDispatcher';
import IProperty from './IProperty';
import Listenable from './Listenable';
import Property from './Property';
import Some from './Some';

/**
 * Implementation of a bindable wrapper over a native map.
 */
class BindableMap<K, V> extends Class implements IBindableMap<K, V> {

	private _ownsValues = false;
	private _size: IProperty<number>;
	private _native: Map<K, V>;

	private _onSplice: IDispatcher<IBindableMap.SpliceResult<K, V>>;
	private _onReindex: IDispatcher<ReadonlyMap<K, K>>;
	private _onClear: IDispatcher<ReadonlyMap<K, V>>;
	private _onChange: IDispatcher<void>;

	/**
	 * @param silent Create a silent map which means that it never dispatches any messages.
	 */
	constructor(silent?: boolean);

	/**
	 * @param contents Initial map contents.
	 * @param silent Create a silent map which means that it never dispatches any messages.
	 */
	constructor(contents: Iterable<readonly [K, V]>, silent?: boolean);
	constructor(a?: any, b?: boolean) {
		super();
		if (typeof a === "boolean") {
			b = a;
			a = null;
		}
		const contents: Map<K, V> = a;
		const silent = b;

		this._native = new Map(contents);
		this._size = this.own(new Property(this._native.size, silent));

		this._onSplice = Dispatcher.make<IBindableMap.SpliceResult<K, V>>(silent);
		this._onReindex = Dispatcher.make<ReadonlyMap<K, K>>(silent);
		this._onClear = Dispatcher.make<ReadonlyMap<K, V>>(silent);
		this._onChange = Dispatcher.make<void>(silent);
	}

	protected destroyObject() {
		this.tryClear();
		super.destroyObject();
	}

	[Symbol.iterator](): IterableIterator<[K, V]> {
		return this._native[Symbol.iterator]();
	}

	get silent() {
		return this.onChange.dummy;
	}

	get size(): Bindable<number> {
		return this._size;
	}

	get native(): ReadonlyMap<K, V> {
		return this._native;
	}

	get onSplice(): Listenable<IBindableMap.SpliceResult<K, V>> {
		return this._onSplice;
	}

	get onReindex(): Listenable<ReadonlyMap<K, K>> {
		return this._onReindex;
	}

	get onClear(): Listenable<ReadonlyMap<K, V>> {
		return this._onClear;
	}

	get onChange(): Listenable<void> {
		return this._onChange;
	}

	ownValues(): this {
		this._ownsValues = true;
		return this;
	}

	has(key: K): boolean {
		return this._native.has(key);
	}

	get(key: K): V {
		return this._native.get(key);
	}

	keys(): IterableIterator<K> {
		return this._native.keys();
	}

	values(): IterableIterator<V> {
		return this._native.values();
	}

	entries(): IterableIterator<readonly [K, V]> {
		return this._native.entries();
	}

	forEach(callback: (value: V, key: K) => void): void {
		this._native.forEach(callback);
	}

	set(key: K, value: V): V {
		const result = this.trySet(key, value);
		return (result !== undefined) ? result.value : this._native.get(key);
	}

	trySet(key: K, value: V): Some<V> {
		const oldValue = this._native.get(key);
		if (value === oldValue) {
			return undefined;
		}
		this._native.set(key, value);
		if (oldValue === undefined) {
			this._size.set(this._size.get() + 1);
		}
		if (!this.silent) {
			const removedEntries = new Map<K, V>();
			if (oldValue !== undefined) {
				removedEntries.set(key, oldValue);
			}
			const addedEntries = new Map<K, V>();
			addedEntries.set(key, value);
			this._onSplice.dispatch({removedEntries, addedEntries});
			this._onChange.dispatch();
		}
		if (oldValue !== undefined && this._ownsValues) {
			(<Destroyable><any>oldValue).destroy();
		}
		return {value: oldValue};
	}

	setAll(entries: ReadonlyMap<K, V>) {
		if (!this.silent) {
			this.trySetAll(entries);
			return;
		}
		for (let [key, value] of entries) {
			this.trySet(key, value);
		}
	}

	trySetAll(entries: ReadonlyMap<K, V>): IBindableMap.SpliceResult<K, V> {
		return this.trySplice([], entries);
	}

	setKey(oldKey: K, newKey: K) {
		const value = this.trySetKey(oldKey, newKey);
		return (value !== undefined) ? value : this._native.get(newKey);
	}

	trySetKey(oldKey: K, newKey: K) {
		if (oldKey === newKey) {
			return undefined;
		}
		const value = this._native.get(oldKey);
		if (value === undefined) {
			return undefined;
		}
		this._native.delete(oldKey);
		this._native.set(newKey, value);
		if (!this.silent) {
			this._onReindex.dispatch(new Map([[oldKey, newKey]]));
			this._onChange.dispatch();
		}
		return value;
	}

	remove(key: K) {
		const value = this._native.get(key);
		if (value === undefined) {
			return undefined;
		}
		this._native.delete(key);
		this._size.set(this._size.get() - 1);
		if (!this.silent) {
			const spliceResult: IBindableMap.SpliceResult<K, V> = {
				addedEntries: new Map(),
				removedEntries: new Map([[key, value]])
			};
			this._onSplice.dispatch(spliceResult);
			this._onChange.dispatch();
		}
		if (this._ownsValues) {
			(<Destroyable><any>value).destroy();
		}
		return value;
	}

	removeAll(keys: Iterable<K>) {
		if (!this.silent) {
			this.tryRemoveAll(keys);
			return;
		}
		for (let key of keys) {
			this.remove(key);
		}
	}

	tryRemoveAll(keys: Iterable<K>) {
		const spliceResult = this.trySplice(keys, new Map());
		return (spliceResult !== undefined) ? <Map<K, V>>spliceResult.removedEntries : undefined;
	}

	clear(): Map<K, V> {
		return this.tryClear() ?? new Map<K, V>();
	}

	tryClear(): Map<K, V> {
		if (this._size.get() === 0) {
			return undefined;
		}
		const oldContents = new Map(this._native);
		this._native.clear();
		this._size.set(0);
		this._onClear.dispatch(oldContents);
		this._onChange.dispatch();
		if (this._ownsValues) {
			oldContents.forEach((value: any) => {
				value.destroy();
			});
		}
		return oldContents;
	}

	splice(keysToRemove: Iterable<K>, entriesToUpdate: ReadonlyMap<K, V>): IBindableMap.SpliceResult<K, V> {
		const spliceResult = this.trySplice(keysToRemove, entriesToUpdate);
		return (spliceResult !== undefined) ? spliceResult : {removedEntries: new Map(), addedEntries: new Map()};
	}

	trySplice(keysToRemove: Iterable<K>, entriesToUpdate: ReadonlyMap<K, V>): IBindableMap.SpliceResult<K, V> {
		const removedEntries = new Map<K, V>();
		for (let key of keysToRemove) {
			if (entriesToUpdate.has(key)) {
				continue;
			}
			const value = this._native.get(key);
			if (value === undefined) {
				continue;
			}
			this._native.delete(key);
			removedEntries.set(key, value);
		}

		const addedEntries = new Map<K, V>();
		for (let [key, value] of entriesToUpdate) {
			const oldValue = this._native.get(key);
			if (value === oldValue) {
				continue;
			}
			this._native.set(key, value);
			addedEntries.set(key, value);
			if (oldValue !== undefined) {
				removedEntries.set(key, oldValue);
			}
		}

		if (removedEntries.size === 0 && addedEntries.size === 0) {
			return undefined;
		}
		const spliceResult: IBindableMap.SpliceResult<K, V> = {removedEntries, addedEntries};
		this._size.set(this._size.get() + addedEntries.size - removedEntries.size);
		if (this._size.get() === 0) {
			this._onClear.dispatch(removedEntries);
		} else {
			this._onSplice.dispatch(spliceResult);
		}
		this._onChange.dispatch();
		if (this._ownsValues) {
			removedEntries.forEach((value: any) => {
				value.destroy();
			});
		}
		return spliceResult;
	}

	reindex(keyMapping: ReadonlyMap<K, K>): Map<K, K> {
		const result = this.tryReindex(keyMapping);
		return (result !== undefined) ? result : new Map();
	}

	tryReindex(keyMapping: ReadonlyMap<K, K>): Map<K, K> {
		const sanitizedMapping = new Map<K, K>();
		for (let [oldKey, newKey] of keyMapping) {
			if (newKey !== undefined && newKey !== oldKey && this._native.has(oldKey)) {
				sanitizedMapping.set(oldKey, newKey);
			}
		}
		if (sanitizedMapping.size === 0) {
			return undefined;
		}

		const newKeys = new Set<K>();
		for (let newKey of sanitizedMapping.values()) {
			newKeys.add(newKey);
		}

		const removedKeys: K[] = [];
		const updatedEntries = new Map<K, V>();
		for (let [oldKey, newKey] of sanitizedMapping) {
			updatedEntries.set(newKey, this._native.get(oldKey));
			if (!newKeys.has(oldKey)) {
				removedKeys.push(oldKey);
			}
		}

		for (let key of removedKeys) {
			this._native.delete(key);
		}
		for (let [key, value] of updatedEntries) {
			this._native.set(key, value);
		}
		this._onReindex.dispatch(sanitizedMapping);
		this._onChange.dispatch();
		return sanitizedMapping;
	}

	detectSplice(newContents: ReadonlyMap<K, V>): IBindableMap.SpliceParams<K, V> {
		const keysToRemove: K[] = [];
		const entriesToUpdate = new Map<K, V>();
		for (let key of this._native.keys()) {
			if (!newContents.has(key)) {
				keysToRemove.push(key);
			}
		}
		for (let [key, value] of newContents) {
			if (value !== this._native.get(key)) {
				entriesToUpdate.set(key, value);
			}
		}
		return (keysToRemove.length === 0 && entriesToUpdate.size === 0) ? undefined : {keysToRemove, entriesToUpdate};
	}

	detectReindex(newContents: ReadonlyMap<K, V>): ReadonlyMap<K, K> {
		const newValueKeys = new Map<V, K>();
		for (let [key, value] of newContents) {
			newValueKeys.set(value, key);
		}
		const keyMap = new Map<K, K>();
		for (let [oldKey, value] of this._native) {
			const newKey = newValueKeys.get(value);
			if (oldKey !== newKey) {
				keyMap.set(oldKey, newKey);
			}
		}
		return keyMap.size === 0 ? undefined : keyMap;
	}

	performSplice(newContents: ReadonlyMap<K, V>) {
		const params = this.detectSplice(newContents);
		if (params !== undefined) {
			this.trySplice(params.keysToRemove, params.entriesToUpdate);
		}
	}

	performReindex(newContents: ReadonlyMap<K, V>) {
		const keyMap = this.detectReindex(newContents);
		if (keyMap !== undefined) {
			this.tryReindex(keyMap);
		}
	}
}

export default BindableMap;
