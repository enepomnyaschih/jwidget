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
import Dispatcher from './Dispatcher';
import IDispatcher from './IDispatcher';
import IBindableArray from './IBindableArray';
import IBindableMap from './IBindableMap';
import {ADAPTER, CollectionFlags, destroy, SILENT} from './index';
import IndexCount from './IndexCount';
import IndexItems from './IndexItems';
import {vid, VidSet} from './internal';
import IProperty from './IProperty';
import IBindableSet from './IBindableSet';
import Listenable from './Listenable';
import ArraySpliceResult from './ArraySpliceResult';
import BindableMap from './BindableMap';
import Property from './Property';
import Reducer from './Reducer';
import BindableSet from './BindableSet';
import Some from './Some';

/**
 * Ordered collection of items. Each array item of has an index. Index of the first item is 0,
 * index of each consequent item is greater by 1.
 * @param T Item type.
 */
export default class BindableArray<T> extends Class implements IBindableArray<T> {
	private _ownsItems: Boolean = false;
	private _length: IProperty<number>;
	private _items: T[];

	private _onSplice: IDispatcher<IBindableArray.SpliceMessage<T>>;
	private _onReplace: IDispatcher<IBindableArray.ReplaceMessage<T>>;
	private _onMove: IDispatcher<IBindableArray.MoveMessage<T>>;
	private _onReorder: IDispatcher<IBindableArray.ReorderMessage<T>>;
	private _onClear: IDispatcher<IBindableArray.MessageWithItems<T>>;
	private _onChange: IDispatcher<IBindableArray.Message<T>>;

	/**
	 * @inheritDoc
	 */
	readonly getKey: (item: T) => any;

	/**
	 * @param silent Create a silent collection which means that it never dispatches any messages.
	 */
	constructor(silent?: boolean);

	/**
	 * @param getKey Function that identifies an item in this collection for optimization of some algorithms.
	 * @param silent Create a silent collection which means that it never dispatches any messages.
	 */
	constructor(getKey: (item: T) => any, silent?: boolean);

	/**
	 * @param items Initial array contents.
	 * @param flags Collection configuration flags.
	 */
	constructor(items: T[], flags?: CollectionFlags);

	/**
	 * @param items Initial array contents.
	 * @param getKey Function that identifies an item in this collection for optimization of some algorithms.
	 * @param flags Collection configuration flags.
	 */
	constructor(items: T[], getKey: (item: T) => any, flags?: CollectionFlags);
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
		const items: T[] = a;
		const silent = Boolean(c & SILENT);
		const adapter = (items != null) && Boolean(c & ADAPTER);

		this.getKey = b || vid;

		this._items = adapter ? items : items ? items.concat() : [];
		this._length = this.own(new Property(this._items.length, silent));

		this._onSplice = Dispatcher.make<IBindableArray.SpliceMessage<T>>(silent);
		this._onReplace = Dispatcher.make<IBindableArray.ReplaceMessage<T>>(silent);
		this._onMove = Dispatcher.make<IBindableArray.MoveMessage<T>>(silent);
		this._onReorder = Dispatcher.make<IBindableArray.ReorderMessage<T>>(silent);
		this._onClear = Dispatcher.make<IBindableArray.MessageWithItems<T>>(silent);
		this._onChange = Dispatcher.make<IBindableArray.Message<T>>(silent);
	}

	protected destroyObject(): void {
		this.clear();
		super.destroyObject();
	}

	/**
	 * @inheritDoc
	 */
	get silent() {
		return this.onChange.dummy;
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
		return this._items[0];
	}

	/**
	 * @inheritDoc
	 */
	get last(): T {
		return this._items[this._items.length - 1];
	}

	/**
	 * @inheritDoc
	 */
	get lastIndex(): number {
		var l = this._items.length;
		return (l !== 0) ? (l - 1) : undefined;
	}

	/**
	 * @inheritDoc
	 */
	get items(): T[] {
		return this._items;
	}

	/**
	 * @inheritDoc
	 */
	get onSplice(): Listenable<IBindableArray.SpliceMessage<T>> {
		return this._onSplice;
	}

	/**
	 * @inheritDoc
	 */
	get onReplace(): Listenable<IBindableArray.ReplaceMessage<T>> {
		return this._onReplace;
	}

	/**
	 * @inheritDoc
	 */
	get onMove(): Listenable<IBindableArray.MoveMessage<T>> {
		return this._onMove;
	}

	/**
	 * @inheritDoc
	 */
	get onClear(): Listenable<IBindableArray.MessageWithItems<T>> {
		return this._onClear;
	}

	/**
	 * @inheritDoc
	 */
	get onReorder(): Listenable<IBindableArray.ReorderMessage<T>> {
		return this._onReorder;
	}

	/**
	 * @inheritDoc
	 */
	get onChange(): Listenable<IBindableArray.Message<T>> {
		return this._onChange;
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
	clone(): IBindableArray<T> {
		return new BindableArray<T>(this.items, this.getKey, this.silent ? SILENT : 0);
	}

	/**
	 * @inheritDoc
	 */
	get(index: number): T {
		return this._items[index];
	}

	/**
	 * @inheritDoc
	 */
	contains(item: T): boolean {
		return ArrayUtils.contains(this._items, item);
	}

	/**
	 * @inheritDoc
	 */
	every(callback: (item: T, index: number) => any, scope?: any): boolean {
		return this._items.every(callback, scope || this);
	}

	/**
	 * @inheritDoc
	 */
	some(callback: (item: T, index: number) => any, scope?: any): boolean {
		return this._items.some(callback, scope || this);
	}

	/**
	 * @inheritDoc
	 */
	forEach(callback: (item: T, index: number) => any, scope?: any): void {
		this._items.forEach(callback, scope || this);
	}

	/**
	 * @inheritDoc
	 */
	findIndex(callback: (item: T, index: number) => any, scope?: any): number {
		return ArrayUtils.findIndex(this._items, callback, scope);
	}

	/**
	 * @inheritDoc
	 */
	find(callback: (item: T, index: number) => any, scope?: any): T {
		return ArrayUtils.find(this._items, callback, scope);
	}

	/**
	 * @inheritDoc
	 */
	toSorted(callback?: (item: T, index: number) => any, scope?: any, order?: number): IBindableArray<T> {
		return new BindableArray<T>(ArrayUtils.toSorted(this._items, callback, scope || this, order), this.getKey, SILENT | ADAPTER);
	}

	/**
	 * @inheritDoc
	 */
	toSortedComparing(compare?: (t1: T, t2: T, k1: number, k2: number) => number, scope?: any, order?: number): IBindableArray<T> {
		return new BindableArray<T>(ArrayUtils.toSortedComparing(this._items, compare, scope || this, order), this.getKey, SILENT | ADAPTER);
	}

	/**
	 * @inheritDoc
	 */
	getSortingIndices(callback?: (item: T, index: number) => any, scope?: any, order?: number): IBindableArray<number> {
		return new BindableArray<number>(ArrayUtils.getSortingIndices(this._items, callback, scope || this, order), String, SILENT | ADAPTER);
	}

	/**
	 * @inheritDoc
	 */
	getSortingIndicesComparing(compare?: (t1: T, t2: T, k1: number, k2: number) => number, scope?: any, order?: number): IBindableArray<number> {
		return new BindableArray<number>(ArrayUtils.getSortingIndicesComparing(this._items, compare, scope || this, order), String, SILENT | ADAPTER);
	}

	/**
	 * @inheritDoc
	 */
	index(callback: (item: T, index: number) => any, scope?: any): IBindableMap<T> {
		return new BindableMap<T>(ArrayUtils.index(this._items, callback, scope), this.getKey, SILENT | ADAPTER);
	}

	/**
	 * @inheritDoc
	 */
	filter(callback: (item: T, index: number) => any, scope?: any): IBindableArray<T> {
		return new BindableArray<T>(this._items.filter(callback, scope || this), this.getKey, SILENT | ADAPTER);
	}

	/**
	 * @inheritDoc
	 */
	count(callback: (item: T, index: number) => any, scope?: any): number {
		return ArrayUtils.count(this._items, callback, scope || this);
	}

	/**
	 * @inheritDoc
	 */
	map<U>(callback: (item: T, index: number) => U, scope?: any, getKey?: (item: U) => any): IBindableArray<U> {
		return new BindableArray<U>(this._items.map(callback, scope || this), getKey, SILENT | ADAPTER);
	}

	/**
	 * @inheritDoc
	 */
	reduce<U>(reducer: Reducer<T, U>): U;
	/**
	 * @inheritDoc
	 */
	reduce<U>(callback: (accumulator: U, item: T, index: number) => U, initial: U): U;
	reduce<U>(reducer: Reducer<T, U> | ((accumulator: U, item: T, index: number) => U), initial?: U): U {
		return (typeof reducer === "function") ?
			this.items.reduce<U>(reducer, initial) :
			ArrayUtils.reduce<T, U>(this.items, reducer);
	}

	/**
	 * @inheritDoc
	 */
	max(callback?: (item: T, index: number) => any, scope?: any, order?: number): T {
		return ArrayUtils.max(this._items, callback, scope, order);
	}

	/**
	 * @inheritDoc
	 */
	maxIndex(callback?: (item: T, index: number) => any, scope?: any, order?: number): number {
		return ArrayUtils.maxIndex(this._items, callback, scope, order);
	}

	/**
	 * @inheritDoc
	 */
	maxComparing(compare?: (t1: T, t2: T, i1: number, i2: number) => number, scope?: any, order?: number): T {
		return ArrayUtils.maxComparing(this._items, compare, scope, order);
	}

	/**
	 * @inheritDoc
	 */
	maxIndexComparing(compare?: (t1: T, t2: T, i1: number, i2: number) => number, scope?: any, order?: number): number {
		return ArrayUtils.maxIndexComparing(this._items, compare, scope, order);
	}

	/**
	 * @inheritDoc
	 */
	min(callback?: (item: T, index: number) => any, scope?: any, order?: number): T {
		return ArrayUtils.min(this._items, callback, scope, order);
	}

	/**
	 * @inheritDoc
	 */
	minIndex(callback?: (item: T, index: number) => any, scope?: any, order?: number): number {
		return ArrayUtils.minIndex(this._items, callback, scope, order);
	}

	/**
	 * @inheritDoc
	 */
	minComparing(compare?: (t1: T, t2: T, i1: number, i2: number) => number, scope?: any, order?: number): T {
		return ArrayUtils.minComparing(this._items, compare, scope, order);
	}

	/**
	 * @inheritDoc
	 */
	minIndexComparing(compare?: (t1: T, t2: T, i1: number, i2: number) => number, scope?: any, order?: number): number {
		return ArrayUtils.minIndexComparing(this._items, compare, scope, order);
	}

	/**
	 * @inheritDoc
	 */
	toArray(): T[] {
		return this._items.concat();
	}

	/**
	 * @inheritDoc
	 */
	toBindableArray(): IBindableArray<T> {
		return new BindableArray<T>(this.toArray(), this.getKey, SILENT | ADAPTER);
	}

	/**
	 * @inheritDoc
	 */
	toSet(): IBindableSet<T> {
		return new BindableSet<T>(this.toArray(), this.getKey, true);
	}

	/**
	 * @inheritDoc
	 */
	asArray(): T[] {
		return this._items;
	}

	/**
	 * @inheritDoc
	 */
	asBindableArray(): IBindableArray<T> {
		return this;
	}

	/**
	 * @inheritDoc
	 */
	asSet(): IBindableSet<T> {
		return this.toSet();
	}

	/**
	 * @inheritDoc
	 */
	add(item: T, index?: number) {
		this.addAll([item], index);
	}

	/**
	 * @inheritDoc
	 */
	addAll(items: T[], index?: number) {
		if (index === undefined) {
			index = this._items.length;
		}
		this.trySplice([], [new IndexItems<T>(index, items)]);
	}

	/**
	 * @inheritDoc
	 */
	trySet(index: number, item: T): Some<T> {
		const oldProxy = ArrayUtils.trySet(this._items, index, item);
		if (oldProxy === undefined) {
			return undefined;
		}
		this._onReplace.dispatch({sender: this, index: index, oldItem: oldProxy.value, newItem: item});
		this._onChange.dispatch({sender: this});
		if (this._ownsItems) {
			(<any>oldProxy.value).destroy();
		}
		return oldProxy;
	}

	/**
	 * @inheritDoc
	 */
	set(index: number, item: T): T {
		const result = this.trySet(index, item);
		return (result !== undefined) ? result.value : this.get(index);
	}

	/**
	 * @inheritDoc
	 */
	remove(index: number): T {
		const result = this.tryRemoveAll(index, 1);
		if (result !== undefined) {
			return result[0];
		}
		return undefined;
	}

	/**
	 * @inheritDoc
	 */
	removeItem(item: T): number {
		const key = this.indexOf(item);
		if (key !== -1) {
			this.remove(key);
		}
		return key;
	}

	/**
	 * @inheritDoc
	 */
	removeAll(index: number, count: number): T[] {
		var result = this.tryRemoveAll(index, count);
		return result || [];
	}

	/**
	 * @inheritDoc
	 */
	tryRemoveAll(index: number, count: number): T[] {
		var result = this.trySplice([new IndexCount(index, count)], []);
		if (result !== undefined) {
			return result.removedSegments[0].items;
		}
		return undefined;
	}

	/**
	 * @inheritDoc
	 */
	removeItems(items: T[]) {
		const itemSet = VidSet.fromArray<T>(items, this.getKey);
		const newItems = this._items.filter((item) => !itemSet.contains(item));
		this.performFilter(newItems);
	}

	/**
	 * @inheritDoc
	 */
	move(fromIndex: number, toIndex: number): T {
		this.tryMove(fromIndex, toIndex);
		return this.get(toIndex);
	}

	/**
	 * @inheritDoc
	 */
	tryMove(fromIndex: number, toIndex: number): T {
		var item = ArrayUtils.tryMove(this._items, fromIndex, toIndex);
		if (item === undefined) {
			return undefined;
		}
		this._onMove.dispatch({sender: this, fromIndex: fromIndex, toIndex: toIndex, item: item});
		this._onChange.dispatch({sender: this});
		return item;
	}

	/**
	 * @inheritDoc
	 */
	clear(): T[] {
		var oldItems = ArrayUtils.tryClear(this._items);
		if (oldItems === undefined) {
			return undefined;
		}
		this._length.set(0);
		this._onClear.dispatch({sender: this, items: oldItems});
		this._onChange.dispatch({sender: this});
		if (this._ownsItems) {
			ArrayUtils.backEvery(oldItems, destroy);
		}
		return oldItems;
	}

	/**
	 * @inheritDoc
	 */
	splice(segmentsToRemove: IBindableArray.IndexCount[], segmentsToAdd: IBindableArray.IndexItems<T>[]): IBindableArray.SpliceResult<T> {
		var result = this.trySplice(segmentsToRemove, segmentsToAdd);
		return (result !== undefined) ? result : new ArraySpliceResult(this._items.concat(), [], []);
	}

	/**
	 * @inheritDoc
	 */
	trySplice(segmentsToRemove: IBindableArray.IndexCount[], segmentsToAdd: IBindableArray.IndexItems<T>[]): IBindableArray.SpliceResult<T> {
		var result = ArrayUtils.trySplice(this._items, segmentsToRemove, segmentsToAdd);
		if (result === undefined) {
			return undefined;
		}
		this._length.set(this._items.length);
		this._onSplice.dispatch({sender: this, spliceResult: result});
		this._onChange.dispatch({sender: this});
		if (this._ownsItems) {
			ArrayUtils.backEvery(result.removedItems, destroy);
		}
		return result;
	}

	/**
	 * @inheritDoc
	 */
	reorder(indexArray: number[]) {
		this.tryReorder(indexArray);
	}

	/**
	 * @inheritDoc
	 */
	tryReorder(indexArray: number[]): T[] {
		var items = ArrayUtils.tryReorder(this._items, indexArray);
		if (items === undefined) {
			return undefined;
		}
		this._onReorder.dispatch({sender: this, indexArray: indexArray, items: items});
		this._onChange.dispatch({sender: this});
		return items;
	}

	/**
	 * @inheritDoc
	 */
	detectSplice(newItems: T[]): IBindableArray.SpliceParams<T> {
		return ArrayUtils.detectSplice(this._items, newItems, this.getKey);
	}

	/**
	 * @inheritDoc
	 */
	detectFilter(newItems: T[]): IBindableArray.IndexCount[] {
		return ArrayUtils.detectFilter(this._items, newItems);
	}

	/**
	 * @inheritDoc
	 */
	detectReorder(newItems: T[]): number[] {
		return ArrayUtils.detectReorder(this._items, newItems, this.getKey);
	}

	/**
	 * @inheritDoc
	 */
	detectSort(callback?: (item: T, index: number) => any, scope?: any, order?: number): number[] {
		return ArrayUtils.detectSort(this._items, callback, scope || this, order);
	}

	/**
	 * @inheritDoc
	 */
	detectSortComparing(compare?: (t1: T, t2: T, i1: number, i2: number) => number, scope?: any, order?: number): number[] {
		return ArrayUtils.detectSortComparing(this._items, compare, scope || this, order);
	}

	/**
	 * @inheritDoc
	 */
	performSplice(newItems: T[]) {
		var params = this.detectSplice(newItems);
		if (params !== undefined) {
			this.trySplice(params.segmentsToRemove, params.segmentsToAdd);
		}
	}

	/**
	 * @inheritDoc
	 */
	performFilter(newItems: T[]) {
		var params = this.detectFilter(newItems);
		if (params !== undefined) {
			this.trySplice(params, []);
		}
	}

	/**
	 * @inheritDoc
	 */
	performReorder(newItems: T[]) {
		var indexArray = this.detectReorder(newItems);
		if (indexArray !== undefined) {
			this.tryReorder(indexArray);
		}
	}

	/**
	 * @inheritDoc
	 */
	sort(callback?: (item: T, index: number) => any, scope?: any, order?: number) {
		var indexArray = this.detectSort(callback, scope, order);
		if (indexArray !== undefined) {
			this.tryReorder(indexArray);
		}
	}

	/**
	 * @inheritDoc
	 */
	sortComparing(compare?: (t1: T, t2: T, i1: number, i2: number) => number, scope?: any, order?: number) {
		var indexArray = this.detectSortComparing(compare, scope, order);
		if (indexArray !== undefined) {
			this.tryReorder(indexArray);
		}
	}

	/**
	 * @inheritDoc
	 */
	reverse() {
		if (this.silent) {
			this._items.reverse();
			return;
		}
		var length = this.length.get();
		var indices = new Array<number>(length);
		for (var i = 0; i < length; ++i) {
			indices[i] = length - i - 1;
		}
		this.reorder(indices);
	}

	/**
	 * @inheritDoc
	 */
	toReversed(): IBindableArray<T> {
		return new BindableArray(ArrayUtils.toReversed(this._items), this.getKey, SILENT | ADAPTER);
	}

	/**
	 * @inheritDoc
	 */
	equal(arr: T[]): boolean {
		return ArrayUtils.equal(this._items, arr);
	}

	/**
	 * @inheritDoc
	 */
	indexOf(item: T): number {
		return this._items.indexOf(item);
	}

	/**
	 * @inheritDoc
	 */
	backEvery(callback: (item: T, index: number) => any, scope?: any): boolean {
		return ArrayUtils.backEvery(this._items, callback, scope);
	}

	/**
	 * @inheritDoc
	 */
	pop(): T {
		if (this._items.length !== 0) {
			return this.remove(this._items.length - 1);
		}
		return undefined;
	}

	/**
	 * @inheritDoc
	 */
	binarySearch(value: T, compare?: (t1: T, t2: T) => number, scope?: any, order?: number): number {
		return ArrayUtils.binarySearch(this._items, value, compare, scope, order);
	}
}
