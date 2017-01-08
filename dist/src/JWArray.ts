import {destroy} from './Core';
import AbstractArray from './AbstractArray';
import Destroyable from './Destroyable';
import IArray from './IArray';
import IArraySpliceParams from './IArraySpliceParams';
import IArraySpliceResult from './IArraySpliceResult';
import IClass from './IClass';
import IIndexCount from './IIndexCount';
import IIndexItems from './IIndexItems';
import IMap from './IMap';
import ISet from './ISet';
import JWMap from './JWMap';
import JWSet from './JWSet';
import Proxy from './Proxy';
import * as ArrayUtils from './ArrayUtils';

/**
 * Simple implementation of [[JW.AbstractArray]].
 *
 * @param T Collection item type.
 */
export default class JWArray<T> extends AbstractArray<T> {
	/**
	 * @inheritdoc
	 */
	constructor(items?: T[], adapter?: boolean) {
		super(items, adapter);
	}

	/**
	 * @inheritdoc
	 */
	ownItems(): JWArray<T> {
		super.ownItems();
		return this;
	}

	/**
	 * @inheritdoc
	 */
	$getKeys(): IArray<number> {
		return new JWArray<number>(this.getKeys(), true);
	}

	/**
	 * @inheritdoc
	 */
	$toSorted(callback?: (item: T, key: number) => any, scope?: any, order?: number): IArray<T> {
		return new JWArray<T>(this.toSorted(callback, scope, order), true);
	}

	/**
	 * @inheritdoc
	 */
	$toSortedComparing(compare?: (t1: T, t2: T, k1: number, k2: number) => number, scope?: any, order?: number): IArray<T> {
		return new JWArray<T>(this.toSortedComparing(compare, scope, order), true);
	}

	/**
	 * @inheritdoc
	 */
	$getSortingKeys(callback?: (item: T, key: number) => any, scope?: any, order?: number): IArray<number> {
		return new JWArray<number>(this.getSortingKeys(callback, scope, order), true);
	}

	/**
	 * @inheritdoc
	 */
	$getSortingKeysComparing(compare?: (t1: T, t2: T, k1: number, k2: number) => number, scope?: any, order?: number): IArray<number> {
		return new JWArray<number>(this.getSortingKeysComparing(compare, scope, order), true);
	}

	/**
	 * @inheritdoc
	 */
	$index(callback: (item: T, key: number) => string, scope?: any): IMap<T> {
		return new JWMap<T>(this.index(callback, scope), true);
	}

	/**
	 * @inheritdoc
	 */
	$filter(callback: (item: T, index: number) => boolean, scope?: any): IArray<T> {
		return new JWArray<T>(this.filter(callback, scope || this), true);
	}

	/**
	 * @inheritdoc
	 */
	$map<U>(callback: (item: T, index: number) => U, scope?: any): IArray<U> {
		return new JWArray<U>(this.map(callback, scope || this), true);
	}

	/**
	 * @inheritdoc
	 */
	$toArray(): IArray<T> {
		return new JWArray<T>(this.toArray(), true);
	}

	/**
	 * @inheritdoc
	 */
	$toMap(): IMap<T> {
		return new JWMap<T>(this.toMap(), true);
	}

	/**
	 * @inheritdoc
	 */
	$asMap(): IMap<T> {
		return new JWMap<T>(this.asMap(), true);
	}

	/**
	 * @inheritdoc
	 */
	$toSet(): ISet<any> {
		return new JWSet<any>(this.toSet(), true);
	}

	/**
	 * @inheritdoc
	 */
	$asSet(): ISet<any> {
		return new JWSet<any>(this.asSet(), true);
	}

	/**
	 * @inheritdoc
	 */
	trySet(item: T, index: number): Proxy<T> {
		var oldProxy = ArrayUtils.trySet(this.items, item, index);
		if ((oldProxy !== undefined) && this._ownsItems) {
			(<Destroyable><any>oldProxy.value).destroy();
		}
		return oldProxy;
	}

	/**
	 * @inheritdoc
	 */
	$removeAll(index: number, count: number): IArray<T> {
		return new JWArray<T>(this.removeAll(index, count), true);
	}

	/**
	 * @inheritdoc
	 */
	tryMove(fromIndex: number, toIndex: number): T {
		return ArrayUtils.tryMove(this.items, fromIndex, toIndex);
	}

	/**
	 * @inheritdoc
	 */
	$clear(): IArray<T> {
		return new JWArray<T>(this.clear(), true);
	}

	/**
	 * @inheritdoc
	 */
	tryClear(): T[]{
		var items = ArrayUtils.tryClear(this.items);
		if ((items !== undefined) && this._ownsItems) {
			ArrayUtils.backEvery(items, destroy);
		}
		return items;
	}

	/**
	 * @inheritdoc
	 */
	trySplice(removeParamsList: IIndexCount[], addParamsList: IIndexItems<T>[]): IArraySpliceResult<T> {
		var spliceResult = ArrayUtils.trySplice(this.items, removeParamsList, addParamsList);
		if ((spliceResult !== undefined) && this._ownsItems) {
			ArrayUtils.backEvery(spliceResult.getRemovedItems(), destroy);
		}
		return spliceResult;
	}

	/**
	 * @inheritdoc
	 */
	tryReorder(indexArray: number[]): T[]{
		return ArrayUtils.tryReorder(this.items, indexArray);
	}

	/**
	 * @inheritdoc
	 */
	detectSplice(newItems: T[], getKey?: (item: T) => any, scope?: any): IArraySpliceParams<T> {
		return ArrayUtils.detectSplice(this.items, newItems, getKey || this.getKey, scope || this);
	}

	/**
	 * @inheritdoc
	 */
	detectFilter(newItems: T[]): IIndexCount[]{
		return ArrayUtils.detectFilter(this.items, newItems);
	}

	/**
	 * @inheritdoc
	 */
	detectReorder(newItems: T[], getKey?: (item: T) => any, scope?: any): number[] {
		return ArrayUtils.detectReorder(this.items, newItems, getKey || this.getKey, scope || this);
	}

	/**
	 * @inheritdoc
	 */
	detectSort(callback?: (item: T, index: number) => any, scope?: any, order?: number): number[]{
		return ArrayUtils.detectSort(this.items, callback, scope || this, order);
	}

	/**
	 * @inheritdoc
	 */
	detectSortComparing(compare?: (t1: T, t2: T, i1: number, i2: number) => number, scope?: any, order?: number): number[]{
		return ArrayUtils.detectSortComparing(this.items, compare, scope || this, order);
	}

	/**
	 * @inheritdoc
	 */
	merge(): any[] {
		return ArrayUtils.merge(this.map(function(item: any): any[] {
			return item.getItems();
		}, this));
	}

	/**
	 * @inheritdoc
	 */
	toReversed(): T[] {
		return ArrayUtils.toReversed(this.items);
	}

	/**
	 * @inheritdoc
	 */
	$toReversed(): IArray<T> {
		return new JWArray(this.toReversed(), true);
	}

	/**
	 * @inheritdoc
	 */
	equal(arr: T[]): boolean {
		return ArrayUtils.equal(this.items, arr);
	}

	/**
	 * @inheritdoc
	 */
	collapse(depth: number): any[]{
		return ArrayUtils.collapse(this.items, depth);
	}

	/**
	 * @inheritdoc
	 */
	indexOf(item: T): number {
		return this.items.indexOf(item);
	}

	/**
	 * @inheritdoc
	 */
	backEvery(callback: (item: T, index: number) => boolean, scope?: any): boolean {
		return ArrayUtils.backEvery(this.items, callback, scope);
	}

	/**
	 * @inheritdoc
	 */
	binarySearch(value: T, compare?: (t1: T, t2: T) => number, scope?: any, order?: number): number {
		return ArrayUtils.binarySearch(this.items, value, compare, scope, order);
	}

	/**
	 * @inheritdoc
	 */
	createEmpty<U>(): JWArray<U> {
		return new JWArray<U>();
	}

	/**
	 * @inheritdoc
	 */
	createEmptyArray<U>(): JWArray<U> {
		return new JWArray<U>();
	}

	/**
	 * @inheritdoc
	 */
	createEmptyMap<U>(): JWMap<U> {
		return new JWMap<U>();
	}

	/**
	 * @inheritdoc
	 */
	createEmptySet<U extends IClass>(): JWSet<U> {
		return new JWSet<U>();
	}
}
