﻿/*
MIT License

Copyright (c) 2021 Egor Nepomnyaschih

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
import Dispatcher from './Dispatcher';
import IBindableSet from './IBindableSet';
import IDispatcher from './IDispatcher';
import {destroy} from './index';
import IProperty from './IProperty';
import Listenable from './Listenable';
import Property from './Property';

/**
 * Implementation of a bindable wrapper over a native set.
 */
class BindableSet<T> extends Class implements IBindableSet<T> {

	private _ownsValues = false;
	private _size: IProperty<number>;
	private _native: Set<T>;

	private _onSplice: IDispatcher<IBindableSet.SpliceResult<T>>;
	private _onClear: IDispatcher<ReadonlySet<T>>;
	private _onChange: IDispatcher<void>;

	/**
	 * @param silent Create a silent set which means that it never dispatches any messages.
	 */
	constructor(silent?: boolean);

	/**
	 * @param contents Initial set contents.
	 * @param silent Create a silent set which means that it never dispatches any messages.
	 */
	constructor(contents: Iterable<T>, silent?: boolean);
	constructor(a?: any, b?: boolean) {
		super();
		if (typeof a === "boolean") {
			b = a;
			a = null;
		}
		const contents: Set<T> = a;
		const silent = b;

		this._native = new Set(contents);
		this._size = this.own(new Property(this._native.size, silent));

		this._onSplice = Dispatcher.make<IBindableSet.SpliceResult<T>>(silent);
		this._onClear = Dispatcher.make<ReadonlySet<T>>(silent);
		this._onChange = Dispatcher.make<void>(silent);
	}

	protected destroyObject() {
		this.tryClear();
		super.destroyObject();
	}

	[Symbol.iterator](): IterableIterator<T> {
		return this._native[Symbol.iterator]();
	}

	get silent() {
		return this.onChange.dummy;
	}

	get size(): Bindable<number> {
		return this._size;
	}

	get native(): ReadonlySet<T> {
		return this._native;
	}

	get onSplice(): Listenable<IBindableSet.SpliceResult<T>> {
		return this._onSplice;
	}

	get onClear(): Listenable<ReadonlySet<T>> {
		return this._onClear;
	}

	get onChange(): Listenable<void> {
		return this._onChange;
	}

	ownValues(): this {
		this._ownsValues = true;
		return this;
	}

	has(value: T): boolean {
		return this._native.has(value);
	}

	forEach(callback: (value: T) => void) {
		this._native.forEach(callback);
	}

	add(value: T): boolean {
		return this.trySplice([], [value]) !== undefined;
	}

	addAll(values: Iterable<T>): ReadonlySet<T> {
		const result = this.tryAddAll(values);
		return (result !== undefined) ? result : new Set();
	}

	tryAddAll(values: Iterable<T>): ReadonlySet<T> {
		const spliceResult = this.trySplice([], values);
		return (spliceResult !== undefined) ? spliceResult.addedValues : undefined;
	}

	delete(value: T): boolean {
		return this.trySplice([value], []) !== undefined;
	}

	deleteAll(values: Iterable<T>): ReadonlySet<T> {
		const result = this.tryDeleteAll(values);
		return (result !== undefined) ? result : new Set();
	}

	tryDeleteAll(values: Iterable<T>): ReadonlySet<T> {
		const spliceResult = this.trySplice(values, []);
		return (spliceResult !== undefined) ? spliceResult.deletedValues : undefined;
	}

	clear(): ReadonlySet<T> {
		return this.tryClear() ?? new Set<T>();
	}

	tryClear(): ReadonlySet<T> {
		if (this._size.get() === 0) {
			return undefined;
		}
		const oldContents = new Set(this._native);
		this._native.clear();
		this._size.set(0);
		this._onClear.dispatch(oldContents);
		this._onChange.dispatch();
		if (this._ownsValues) {
			oldContents.forEach(destroy);
		}
		return oldContents;
	}

	splice(valuesToDelete: Iterable<T>, valuesToAdd: Iterable<T>): IBindableSet.SpliceResult<T> {
		const spliceResult = this.trySplice(valuesToDelete, valuesToAdd);
		return (spliceResult !== undefined) ? spliceResult : {addedValues: new Set(), deletedValues: new Set()};
	}

	trySplice(valuesToDelete: Iterable<T>, valuesToAdd: Iterable<T>): IBindableSet.SpliceResult<T> {
		const addedValues = new Set<T>();
		for (const value of valuesToAdd) {
			if (!this._native.has(value)) {
				this._native.add(value);
				addedValues.add(value);
			}
		}
		const valuesToAddSet = new Set(valuesToAdd);
		const deletedValues = new Set<T>();
		for (const value of valuesToDelete) {
			if (!valuesToAddSet.has(value) && this._native.has(value)) {
				this._native.delete(value);
				deletedValues.add(value);
			}
		}
		if (deletedValues.size === 0 && addedValues.size === 0) {
			return undefined;
		}

		const spliceResult: IBindableSet.SpliceResult<T> = {deletedValues: deletedValues, addedValues};
		this._size.set(this._size.get() - deletedValues.size + addedValues.size);
		if (this._size.get() === 0) {
			this._onClear.dispatch(deletedValues);
		} else {
			this._onSplice.dispatch(spliceResult);
		}
		this._onChange.dispatch();
		if (this._ownsValues) {
			deletedValues.forEach(destroy);
		}
		return spliceResult;
	}

	detectSplice(newContents: Iterable<T>): IBindableSet.SpliceParams<T> {
		const valuesToDelete = new Set<T>();
		const valuesToAdd = new Set<T>();
		const oldValues = this._native;
		const newValues = new Set(newContents);
		for (let value of oldValues) {
			if (!newValues.has(value)) {
				valuesToDelete.add(value);
			}
		}
		for (let value of newValues) {
			if (!oldValues.has(value)) {
				valuesToAdd.add(value);
			}
		}
		return (valuesToDelete.size === 0 && valuesToAdd.size === 0) ? undefined : {valuesToDelete: valuesToDelete, valuesToAdd};
	}

	performSplice(newContents: Iterable<T>) {
		const spliceParams = this.detectSplice(newContents);
		if (spliceParams !== undefined) {
			this.trySplice(spliceParams.valuesToDelete, spliceParams.valuesToAdd);
		}
	}
}

export default BindableSet;
