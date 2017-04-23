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

import {destroy, CollectionFlags, SILENT, ADAPTER} from './Core';
import AbstractArray from './AbstractArray';
import Destroyable from './Destroyable';
import IArray from './IArray';
import IArraySpliceParams from './IArraySpliceParams';
import IArraySpliceResult from './IArraySpliceResult';
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
	constructor(silent?: boolean);
	constructor(items: T[], flags?: CollectionFlags);
	constructor(a?: any, b?: CollectionFlags) {
		super(a, b);
	}

	/**
	 * @inheritdoc
	 */
	$getKeys(): IArray<number> {
		return new JWArray<number>(this.getKeys(), SILENT | ADAPTER);
	}

	/**
	 * @inheritdoc
	 */
	$toSorted(callback?: (item: T, key: number) => any, scope?: any, order?: number): IArray<T> {
		return new JWArray<T>(this.toSorted(callback, scope, order), SILENT | ADAPTER);
	}

	/**
	 * @inheritdoc
	 */
	$toSortedComparing(compare?: (t1: T, t2: T, k1: number, k2: number) => number, scope?: any, order?: number): IArray<T> {
		return new JWArray<T>(this.toSortedComparing(compare, scope, order), SILENT | ADAPTER);
	}

	/**
	 * @inheritdoc
	 */
	$getSortingKeys(callback?: (item: T, key: number) => any, scope?: any, order?: number): IArray<number> {
		return new JWArray<number>(this.getSortingKeys(callback, scope, order), SILENT | ADAPTER);
	}

	/**
	 * @inheritdoc
	 */
	$getSortingKeysComparing(compare?: (t1: T, t2: T, k1: number, k2: number) => number, scope?: any, order?: number): IArray<number> {
		return new JWArray<number>(this.getSortingKeysComparing(compare, scope, order), SILENT | ADAPTER);
	}

	/**
	 * @inheritdoc
	 */
	$index(callback: (item: T, key: number) => string, scope?: any): IMap<T> {
		return new JWMap<T>(this.index(callback, scope), SILENT | ADAPTER);
	}

	/**
	 * @inheritdoc
	 */
	$filter(callback: (item: T, index: number) => boolean, scope?: any): IArray<T> {
		return new JWArray<T>(this.filter(callback, scope || this), SILENT | ADAPTER);
	}

	/**
	 * @inheritdoc
	 */
	$map<U>(callback: (item: T, index: number) => U, scope?: any): IArray<U> {
		return new JWArray<U>(this.map(callback, scope || this), SILENT | ADAPTER);
	}

	/**
	 * @inheritdoc
	 */
	$toArray(): IArray<T> {
		return new JWArray<T>(this.toArray(), SILENT | ADAPTER);
	}

	/**
	 * @inheritdoc
	 */
	$toMap(): IMap<T> {
		return new JWMap<T>(this.toMap(), SILENT | ADAPTER);
	}

	/**
	 * @inheritdoc
	 */
	$asMap(): IMap<T> {
		return new JWMap<T>(this.asMap(), SILENT | ADAPTER);
	}

	/**
	 * @inheritdoc
	 */
	$toSet(): ISet<any> {
		return new JWSet<any>(this.toSet(), SILENT | ADAPTER);
	}

	/**
	 * @inheritdoc
	 */
	$asSet(): ISet<any> {
		return new JWSet<any>(this.asSet(), SILENT | ADAPTER);
	}

	/**
	 * @inheritdoc
	 */
	trySet(item: T, index: number): Proxy<T> {
		var oldProxy = ArrayUtils.trySet(this._items, item, index);
		if ((oldProxy !== undefined) && this._ownsItems) {
			(<Destroyable><any>oldProxy.value).destroy();
		}
		return oldProxy;
	}

	/**
	 * @inheritdoc
	 */
	$removeAll(index: number, count: number): IArray<T> {
		return new JWArray<T>(this.removeAll(index, count), SILENT | ADAPTER);
	}

	/**
	 * @inheritdoc
	 */
	tryMove(fromIndex: number, toIndex: number): T {
		return ArrayUtils.tryMove(this._items, fromIndex, toIndex);
	}

	/**
	 * @inheritdoc
	 */
	$clear(): IArray<T> {
		return new JWArray<T>(this.clear(), SILENT | ADAPTER);
	}

	/**
	 * @inheritdoc
	 */
	tryClear(): T[]{
		var items = ArrayUtils.tryClear(this._items);
		if ((items !== undefined) && this._ownsItems) {
			ArrayUtils.backEvery(items, destroy);
		}
		return items;
	}

	/**
	 * @inheritdoc
	 */
	trySplice(removeParamsList: IIndexCount[], addParamsList: IIndexItems<T>[]): IArraySpliceResult<T> {
		var spliceResult = ArrayUtils.trySplice(this._items, removeParamsList, addParamsList);
		if ((spliceResult !== undefined) && this._ownsItems) {
			ArrayUtils.backEvery(spliceResult.getRemovedItems(), destroy);
		}
		return spliceResult;
	}

	/**
	 * @inheritdoc
	 */
	tryReorder(indexArray: number[]): T[]{
		return ArrayUtils.tryReorder(this._items, indexArray);
	}

	/**
	 * @inheritdoc
	 */
	detectSplice(newItems: T[], getKey?: (item: T) => any, scope?: any): IArraySpliceParams<T> {
		return ArrayUtils.detectSplice(this._items, newItems, getKey || this.getKey, scope || this);
	}

	/**
	 * @inheritdoc
	 */
	detectFilter(newItems: T[]): IIndexCount[]{
		return ArrayUtils.detectFilter(this._items, newItems);
	}

	/**
	 * @inheritdoc
	 */
	detectReorder(newItems: T[], getKey?: (item: T) => any, scope?: any): number[] {
		return ArrayUtils.detectReorder(this._items, newItems, getKey || this.getKey, scope || this);
	}

	/**
	 * @inheritdoc
	 */
	detectSort(callback?: (item: T, index: number) => any, scope?: any, order?: number): number[]{
		return ArrayUtils.detectSort(this._items, callback, scope || this, order);
	}

	/**
	 * @inheritdoc
	 */
	detectSortComparing(compare?: (t1: T, t2: T, i1: number, i2: number) => number, scope?: any, order?: number): number[]{
		return ArrayUtils.detectSortComparing(this._items, compare, scope || this, order);
	}

	/**
	 * @inheritdoc
	 */
	toReversed(): T[] {
		return ArrayUtils.toReversed(this._items);
	}

	/**
	 * @inheritdoc
	 */
	$toReversed(): IArray<T> {
		return new JWArray(this.toReversed(), SILENT | ADAPTER);
	}

	/**
	 * @inheritdoc
	 */
	equal(arr: T[]): boolean {
		return ArrayUtils.equal(this._items, arr);
	}

	/**
	 * @inheritdoc
	 */
	collapse(depth: number): any[]{
		return ArrayUtils.collapse(this._items, depth);
	}

	/**
	 * @inheritdoc
	 */
	indexOf(item: T): number {
		return this._items.indexOf(item);
	}

	/**
	 * @inheritdoc
	 */
	backEvery(callback: (item: T, index: number) => boolean, scope?: any): boolean {
		return ArrayUtils.backEvery(this._items, callback, scope);
	}

	/**
	 * @inheritdoc
	 */
	binarySearch(value: T, compare?: (t1: T, t2: T) => number, scope?: any, order?: number): number {
		return ArrayUtils.binarySearch(this._items, value, compare, scope, order);
	}
}
