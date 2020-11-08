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

import ArraySpliceResult from './ArraySpliceResult';
import * as ArrayUtils from "./ArrayUtils";
import {invert, isIdentity} from "./ArrayUtils";
import Bindable from './Bindable';
import Class from './Class';
import Dispatcher from './Dispatcher';
import IBindableArray from './IBindableArray';
import IDispatcher from './IDispatcher';
import {cmp, destroy, identity} from './index';
import IndexCount from './IndexCount';
import IndexItems from './IndexItems';
import {initReduceState} from "./internal";
import IProperty from './IProperty';
import Listenable from './Listenable';
import Property from './Property';
import Reducer from "./Reducer";

/**
 * Implementation of a bindable wrapper over a native array.
 */
export default class BindableArray<T> extends Class implements IBindableArray<T> {

	private _ownsValues = false;
	private readonly _length: IProperty<number>;
	private readonly _native: T[];

	private readonly _onSplice: IDispatcher<IBindableArray.SpliceResult<T>>;
	private readonly _onReplace: IDispatcher<IBindableArray.ReplaceMessage<T>>;
	private readonly _onMove: IDispatcher<IBindableArray.MoveMessage<T>>;
	private readonly _onReorder: IDispatcher<IBindableArray.ReorderMessage<T>>;
	private readonly _onClear: IDispatcher<readonly T[]>;
	private readonly _onChange: IDispatcher<void>;

	/**
	 * @param silent Create a silent array which means that it never dispatches any messages.
	 */
	constructor(silent?: boolean);

	/**
	 * @param contents Initial array contents.
	 * @param silent Create a silent array which means that it never dispatches any messages.
	 */
	constructor(contents: Iterable<T>, silent?: boolean);
	constructor(a?: any, b?: boolean) {
		super();
		if (typeof a === "boolean") {
			b = a;
			a = null;
		}
		const contents: T[] = a;
		const silent = b;

		this._native = [...(contents ?? [])];
		this._length = this.own(new Property(this._native.length, silent));

		this._onSplice = Dispatcher.make<IBindableArray.SpliceResult<T>>(silent);
		this._onReplace = Dispatcher.make<IBindableArray.ReplaceMessage<T>>(silent);
		this._onMove = Dispatcher.make<IBindableArray.MoveMessage<T>>(silent);
		this._onReorder = Dispatcher.make<IBindableArray.ReorderMessage<T>>(silent);
		this._onClear = Dispatcher.make<readonly T[]>(silent);
		this._onChange = Dispatcher.make<void>(silent);
	}

	protected destroyObject(): void {
		this.clear();
		super.destroyObject();
	}

	[Symbol.iterator](): IterableIterator<T> {
		return this._native[Symbol.iterator]();
	}

	get silent() {
		return this.onChange.dummy;
	}

	get length(): Bindable<number> {
		return this._length;
	}

	get native(): readonly T[] {
		return this._native;
	}

	get onSplice(): Listenable<IBindableArray.SpliceResult<T>> {
		return this._onSplice;
	}

	get onReplace(): Listenable<IBindableArray.ReplaceMessage<T>> {
		return this._onReplace;
	}

	get onMove(): Listenable<IBindableArray.MoveMessage<T>> {
		return this._onMove;
	}

	get onReorder(): Listenable<IBindableArray.ReorderMessage<T>> {
		return this._onReorder;
	}

	get onClear(): Listenable<readonly T[]> {
		return this._onClear;
	}

	get onChange(): Listenable<void> {
		return this._onChange;
	}

	ownValues(): this {
		this._ownsValues = true;
		return this;
	}

	get(index: number): T {
		return this._native[index];
	}

	includes(value: T): boolean {
		return this._native.includes(value);
	}

	indexOf(value: T): number {
		return this._native.indexOf(value);
	}

	lastIndexOf(value: T): number {
		return this._native.lastIndexOf(value);
	}

	every(callback: (value: T, index: number) => boolean): boolean {
		return this._native.every(callback);
	}

	some(callback: (value: T, index: number) => boolean): boolean {
		return this._native.some(callback);
	}

	forEach(callback: (value: T, index: number) => void): void {
		this._native.forEach(callback);
	}

	find(callback: (value: T, index: number) => boolean): T {
		return this._native.find(callback);
	}

	findIndex(callback: (value: T, index: number) => boolean): number {
		return this._native.findIndex(callback);
	}

	reduce<U>(reducer: Reducer<T, U>): U;
	reduce<U>(callback: (accumulator: U, value: T, index: number) => U, initial: U): U;
	reduce<U>(reducer: Reducer<T, U> | ((accumulator: U, value: T, index: number) => U), initial?: U): U {
		const {value, callback} = (typeof reducer !== "function") ? initReduceState(reducer) : {
			value: initial,
			callback: reducer
		};
		return this._native.reduce<U>(callback, value);
	}

	reduceRight<U>(reducer: Reducer<T, U>): U;
	reduceRight<U>(callback: (accumulator: U, value: T, index: number) => U, initial: U): U;
	reduceRight<U>(reducer: Reducer<T, U> | ((accumulator: U, value: T, index: number) => U), initial?: U): U {
		const {value, callback} = (typeof reducer !== "function") ? initReduceState(reducer) : {
			value: initial,
			callback: reducer
		};
		return this._native.reduceRight<U>(callback, value);
	}

	add(value: T, index?: number) {
		this.addAll([value], index);
	}

	addAll(values: readonly T[], index?: number) {
		if (index === undefined) {
			index = this._native.length;
		}
		this.trySplice([], [new IndexItems<T>(index, values)]);
	}

	set(index: number, newValue: T): T {
		const result = this.trySet(index, newValue);
		return (result !== undefined) ? result : this._native[index];
	}

	trySet(index: number, newValue: T): T {
		const oldValue = this._native[index];
		if (newValue === oldValue) {
			return undefined;
		}
		this._native[index] = newValue;
		this._onReplace.dispatch({index, oldValue, newValue});
		this._onChange.dispatch();
		if (this._ownsValues) {
			(<any>oldValue).destroy();
		}
		return oldValue;
	}

	remove(index: number): T {
		return this.tryRemoveAll(index, 1)[0];
	}

	removeAll(index: number, count: number): readonly T[] {
		return this.tryRemoveAll(index, count) || [];
	}

	tryRemoveAll(index: number, count: number): readonly T[] {
		const result = this.trySplice([new IndexCount(index, count)], []);
		return (result !== undefined) ? result.removedSegments[0].items : undefined;
	}

	removeValues(values: Iterable<T>) {
		const valueSet = new Set(values);
		const newContents = this._native.filter(item => !valueSet.has(item));
		this.performFilter(newContents);
	}

	move(fromIndex: number, toIndex: number): T {
		this.tryMove(fromIndex, toIndex);
		return this._native[toIndex];
	}

	tryMove(fromIndex: number, toIndex: number): T {
		if (fromIndex === toIndex) {
			return undefined;
		}
		const value = this._native[fromIndex];
		this._native.splice(fromIndex, 1);
		this._native.splice(toIndex, 0, value);
		this._onMove.dispatch({fromIndex, toIndex, value});
		this._onChange.dispatch();
		return value;
	}

	clear(): readonly T[] {
		if (this._native.length === 0) {
			return [];
		}
		const oldContents = this._native.concat();
		this._native.splice(0, this._native.length);
		this._length.set(0);
		this._onClear.dispatch(oldContents);
		this._onChange.dispatch();
		if (this._ownsValues) {
			ArrayUtils.backForEach(oldContents, destroy);
		}
		return oldContents;
	}

	splice(segmentsToRemove: Iterable<IBindableArray.IndexCount>,
		   segmentsToAdd: Iterable<IBindableArray.IndexItems<T>>): IBindableArray.SpliceResult<T> {
		const result = this.trySplice(segmentsToRemove, segmentsToAdd);
		return (result !== undefined) ? result : new ArraySpliceResult(this._native.concat(), [], []);
	}

	trySplice(segmentsToRemove: Iterable<IBindableArray.IndexCount>,
			  segmentsToAdd: Iterable<IBindableArray.IndexItems<T>>): IBindableArray.SpliceResult<T> {
		const result = ArrayUtils.trySplice(this._native, segmentsToRemove, segmentsToAdd);
		if (result === undefined) {
			return undefined;
		}
		this._length.set(this._native.length);
		if (this._length.get() === 0) {
			this._onClear.dispatch(result.oldContents);
		} else {
			this._onSplice.dispatch(result);
		}
		this._onChange.dispatch();
		if (this._ownsValues) {
			ArrayUtils.backForEach(result.removedItems, destroy);
		}
		return result;
	}

	reorder(indexMapping: readonly number[]) {
		this.tryReorder(indexMapping);
	}

	tryReorder(indexMapping: readonly number[]): readonly T[] {
		const oldContents = ArrayUtils.tryReorder(this._native, indexMapping);
		if (oldContents === undefined) {
			return undefined;
		}
		this._onReorder.dispatch({indexMapping, oldContents});
		this._onChange.dispatch();
		return oldContents;
	}

	detectSplice(newContents: readonly T[]): IBindableArray.SpliceParams<T> {
		const segmentsToRemove: IBindableArray.IndexCount[] = [];
		const segmentsToAdd: IBindableArray.IndexItems<T>[] = [];
		const oldIndexMap = new Map<T, number>();
		for (let i = 0, l = this._native.length; i < l; ++i) {
			oldIndexMap.set(this._native[i], i);
		}
		let nextOldIndex = 0;
		let offset = 0;
		let newItemBuffer: T[] = [];

		function flush() {
			if (newItemBuffer.length === 0) {
				return;
			}
			segmentsToAdd.push(new IndexItems<T>(offset + nextOldIndex, newItemBuffer));
			offset += newItemBuffer.length;
			newItemBuffer = [];
		}

		function testRemove(oldIndex: number) {
			if (oldIndex > nextOldIndex) {
				const count = oldIndex - nextOldIndex;
				segmentsToRemove.push(new IndexCount(nextOldIndex, count));
				offset -= count;
			}
		}

		for (let newIndex = 0, l = newContents.length; newIndex < l; ++newIndex) {
			const item = newContents[newIndex];
			const oldIndex = oldIndexMap.get(item);
			if ((oldIndex === undefined) || (oldIndex < nextOldIndex)) {
				newItemBuffer.push(item);
			} else {
				flush();
				testRemove(oldIndex);
				nextOldIndex = oldIndex + 1;
			}
		}
		flush();
		testRemove(this._native.length);
		if ((segmentsToRemove.length !== 0) || (segmentsToAdd.length !== 0)) {
			return {segmentsToRemove, segmentsToAdd};
		}
		return undefined;
	}

	detectFilter(newContents: readonly T[]): readonly IBindableArray.IndexCount[] {
		const segmentsToRemove: IBindableArray.IndexCount[] = [];
		let oldIndex = 0;
		const oldLength = this._native.length;
		const newLength = newContents.length;
		for (let newIndex = 0; newIndex <= newLength; ++newIndex) {
			const newItem = newContents[newIndex];
			let count = 0;
			while ((oldIndex + count < oldLength) && (this._native[oldIndex + count] !== newItem)) {
				++count;
			}
			if (count !== 0) {
				segmentsToRemove.push(new IndexCount(oldIndex, count));
			}
			oldIndex += count + 1;
		}
		return (segmentsToRemove.length !== 0) ? segmentsToRemove : undefined;
	}

	detectReorder(newContents: readonly T[]): readonly number[] {
		const indexArray: number[] = [];
		const newIndexMap = new Map<T, number>();
		for (let i = 0, l = newContents.length; i < l; ++i) {
			newIndexMap.set(newContents[i], i);
		}
		for (let i = 0, l = this._native.length; i < l; ++i) {
			indexArray.push(newIndexMap.get(this._native[i]));
		}
		return isIdentity(indexArray) ? undefined : indexArray;
	}

	detectSort(callback: (item: T, index: number) => any = identity, order: number = 1): readonly number[] {
		const pairs = this._native.map((item, index): [number, T] => [index, callback(item, index)]);
		pairs.sort((x, y) => order * cmp(x[1], y[1]));
		const indexes = pairs.map(pair => pair[0]);
		return isIdentity(indexes) ? undefined : invert(indexes);
	}

	detectSortComparing(compare: (t1: T, t2: T, i1: number, i2: number) => number = cmp, order: number = 1): readonly number[] {
		const pairs = this._native.map((item, index): [number, T] => [index, item]);
		pairs.sort((x, y) => order * compare(x[1], y[1], x[0], y[0]));
		const indexes = pairs.map(pair => pair[0]);
		return isIdentity(indexes) ? undefined : invert(indexes);
	}

	performSplice(newContents: readonly T[]) {
		const params = this.detectSplice(newContents);
		if (params !== undefined) {
			this.trySplice(params.segmentsToRemove, params.segmentsToAdd);
		}
	}

	performFilter(newContents: readonly T[]) {
		const params = this.detectFilter(newContents);
		if (params !== undefined) {
			this.trySplice(params, []);
		}
	}

	performReorder(newContents: T[]) {
		const indexMapping = this.detectReorder(newContents);
		if (indexMapping !== undefined) {
			this.tryReorder(indexMapping);
		}
	}

	sort(callback?: (item: T, index: number) => any, order?: number) {
		const indexMapping = this.detectSort(callback, order);
		if (indexMapping !== undefined) {
			this.tryReorder(indexMapping);
		}
	}

	sortComparing(compare?: (t1: T, t2: T, i1: number, i2: number) => number, order?: number) {
		const indexMapping = this.detectSortComparing(compare, order);
		if (indexMapping !== undefined) {
			this.tryReorder(indexMapping);
		}
	}

	reverse() {
		if (this.silent) {
			this._native.reverse();
			return;
		}
		const length = this.length.get();
		const indices = new Array<number>(length);
		for (let i = 0; i < length; ++i) {
			indices[i] = length - i - 1;
		}
		this.reorder(indices);
	}
}
