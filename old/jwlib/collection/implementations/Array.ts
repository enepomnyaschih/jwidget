import {destroyForcibly, Proxy} from '../../core/Core';
import {Destroyable} from '../../core/Destroyable';
import {IClass} from '../../core/IClass';
import {ObservableArray} from './ObservableArray';
import {AbstractArray} from '../abstracts/AbstractArray';
import {IArray} from '../interfaces/IArray';
import * as Arrays from '../interfaces/IArray';
import * as ArrayUtils from '../utils/Array';
import {Map} from './Map';
import {IMap} from '../interfaces/IMap';
import {Set} from './Set';
import {ISet} from '../interfaces/ISet';

/**
 * Simple implementation of [[JW.AbstractArray]].
 *
 * @param T Collection item type.
 */
export class Array<T> extends AbstractArray<T> {
	/**
	 * @inheritdoc
	 */
	constructor(items?: T[], adapter?: boolean) {
		super(items, adapter);
	}

	/**
	 * @inheritdoc
	 */
	ownItems(): Array<T> {
		super.ownItems();
		return this;
	}

	/**
	 * @inheritdoc
	 */
	$getKeys(): IArray<number> {
		return new Array<number>(this.getKeys(), true);
	}

	/**
	 * @inheritdoc
	 */
	$toSorted(callback?: (item: T, key: number) => any, scope?: any, order?: number): IArray<T> {
		return new Array<T>(this.toSorted(callback, scope, order), true);
	}

	/**
	 * @inheritdoc
	 */
	$toSortedComparing(compare?: (t1: T, t2: T, k1: number, k2: number) => number, scope?: any, order?: number): IArray<T> {
		return new Array<T>(this.toSortedComparing(compare, scope, order), true);
	}

	/**
	 * @inheritdoc
	 */
	$getSortingKeys(callback?: (item: T, key: number) => any, scope?: any, order?: number): IArray<number> {
		return new Array<number>(this.getSortingKeys(callback, scope, order), true);
	}

	/**
	 * @inheritdoc
	 */
	$getSortingKeysComparing(compare?: (t1: T, t2: T, k1: number, k2: number) => number, scope?: any, order?: number): IArray<number> {
		return new Array<number>(this.getSortingKeysComparing(compare, scope, order), true);
	}

	/**
	 * @inheritdoc
	 */
	$index(callback: (item: T, key: number) => string, scope?: any): IMap<T> {
		return new Map<T>(this.index(callback, scope), true);
	}

	/**
	 * @inheritdoc
	 */
	$filter(callback: (item: T, index: number) => boolean, scope?: any): IArray<T> {
		return new Array<T>(this.filter(callback, scope || this), true);
	}

	/**
	 * @inheritdoc
	 */
	$map<U>(callback: (item: T, index: number) => U, scope?: any): IArray<U> {
		return new Array<U>(this.map(callback, scope || this), true);
	}

	/**
	 * @inheritdoc
	 */
	$toArray(): IArray<T> {
		return new Array<T>(this.toArray(), true);
	}

	/**
	 * @inheritdoc
	 */
	$toMap(): IMap<T> {
		return new Map<T>(this.toMap(), true);
	}

	/**
	 * @inheritdoc
	 */
	$asMap(): IMap<T> {
		return new Map<T>(this.asMap(), true);
	}

	/**
	 * @inheritdoc
	 */
	$toSet(): ISet<any> {
		return new Set<any>(this.toSet(), true);
	}

	/**
	 * @inheritdoc
	 */
	$asSet(): ISet<any> {
		return new Set<any>(this.asSet(), true);
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
		return new Array<T>(this.removeAll(index, count), true);
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
		return new Array<T>(this.clear(), true);
	}

	/**
	 * @inheritdoc
	 */
	tryClear(): T[]{
		var items = ArrayUtils.tryClear(this.items);
		if ((items !== undefined) && this._ownsItems) {
			ArrayUtils.backEvery(items, destroyForcibly);
		}
		return items;
	}

	/**
	 * @inheritdoc
	 */
	trySplice(removeParamsList: Arrays.IndexCount[], addParamsList: Arrays.IndexItems<T>[]): Arrays.SpliceResult<T> {
		var spliceResult = ArrayUtils.trySplice(this.items, removeParamsList, addParamsList);
		if ((spliceResult !== undefined) && this._ownsItems) {
			ArrayUtils.backEvery(spliceResult.getRemovedItems(), destroyForcibly);
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
	detectSplice(newItems: T[], getKey?: (item: T) => any, scope?: any): Arrays.SpliceParams<T> {
		return ArrayUtils.detectSplice(this.items, newItems, getKey || this.getKey, scope || this);
	}

	/**
	 * @inheritdoc
	 */
	detectFilter(newItems: T[]): Arrays.IndexCount[]{
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
		return new Array(this.toReversed(), true);
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
		return ArrayUtils.indexOf(this.items, item);
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
	createEmpty<U>(): Array<U> {
		return new Array<U>();
	}

	/**
	 * @inheritdoc
	 */
	createEmptyArray<U>(): Array<U> {
		return new Array<U>();
	}

	/**
	 * @inheritdoc
	 */
	createEmptyMap<U>(): Map<U> {
		return new Map<U>();
	}

	/**
	 * @inheritdoc
	 */
	createEmptySet<U extends IClass>(): Set<U> {
		return new Set<U>();
	}

	/**
	 * @hidden
	 */
	_createMergerTarget<T>(): IArray<T> {
		return this.some((bunch) => { return bunch instanceof ObservableArray; }) ?
			new ObservableArray<T>() : new Array<T>();
	}
}
