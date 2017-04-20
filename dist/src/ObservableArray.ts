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

import {destroy} from './Core';
import AbstractArray from './AbstractArray';
import Class from './Class';
import Event from './Event';
import IArray from './IArray';
import IArraySpliceParams from './IArraySpliceParams';
import IArraySpliceResult from './IArraySpliceResult';
import IIndexCount from './IIndexCount';
import IIndexItems from './IIndexItems';
import IMap from './IMap';
import ISet from './ISet';
import JWArray from './JWArray';
import JWMap from './JWMap';
import JWSet from './JWSet';
import ObservableMap from './ObservableMap';
import ObservableSet from './ObservableSet';
import Property from './Property';
import Proxy from './Proxy';
import * as ArrayUtils from './ArrayUtils';

/**
 * Observable implementation of [[JW.AbstractArray]].
 *
 * @param T Collection item type.
 */
export default class ObservableArray<T> extends AbstractArray<T> {
	/**
	 * Collection length. **Don't modify manually!**
	 */
	length: Property<number>;

	/**
	 * Items are removed from array and items are added to array. Triggered in result
	 * of calling:
	 *
	 * * [[add]]
	 * * [[tryAdd]]
	 * * [[addAll]]
	 * * [[tryAddAll]]
	 * * [[remove]]
	 * * [[tryRemove]]
	 * * [[removeItem]]
	 * * [[pop]]
	 * * [[removeAll]]
	 * * [[tryRemoveAll]]
	 * * [[removeItems]]
	 * * [[splice]]
	 * * [[trySplice]]
	 * * [[performSplice]]
	 */
	spliceEvent: Event<ArraySpliceEventParams<T>> = new Event<ArraySpliceEventParams<T>>();

	/**
	 * Item is replaced in array. Triggered in result of calling:
	 *
	 * * [[set]]
	 * * [[trySet]]
	 */
	replaceEvent: Event<ArrayReplaceEventParams<T>> = new Event<ArrayReplaceEventParams<T>>();

	/**
	 * Item is moved in array. Triggered in result of calling:
	 *
	 * * [[move]]
	 * * [[tryMove]]
	 */
	moveEvent: Event<ArrayMoveEventParams<T>> = new Event<ArrayMoveEventParams<T>>();

	/**
	 * Array is cleared. Triggered in result of calling:
	 * * [[clear]]
	 * * [[$clear]]
	 * * [[tryClear]]
	 */
	clearEvent: Event<ArrayItemsEventParams<T>> = new Event<ArrayItemsEventParams<T>>();

	/**
	 * Items are reordered in array. Triggered in result of calling:
	 *
	 * * [[reorder]]
	 * * [[tryReorder]]
	 * * [[performReorder]]
	 * * [[sort]]
	 * * [[sortComparing]]
	 */
	reorderEvent: Event<ArrayReorderEventParams<T>> = new Event<ArrayReorderEventParams<T>>();

	/**
	 * Array is changed. Triggered right after one of events:
	 *
	 * * [[spliceEvent]]
	 * * [[replaceEvent]]
	 * * [[moveEvent]]
	 * * [[clearEvent]]
	 * * [[reorderEvent]]
	 */
	changeEvent: Event<ArrayEventParams<T>> = new Event<ArrayEventParams<T>>();

	/**
	 * @inheritdoc
	 */
	constructor(items?: T[], adapter?: boolean) {
		super(items, adapter);
		this.length = new Property<number>(this.getLength());
	}

	/**
	 * @inheritdoc
	 */
	protected destroyObject() {
		this.changeEvent.destroy();
		this.reorderEvent.destroy();
		this.clearEvent.destroy();
		this.moveEvent.destroy();
		this.replaceEvent.destroy();
		this.spliceEvent.destroy();
		this.length.destroy();
		super.destroyObject();
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
	$removeAll(index: number, count: number): IArray<T> {
		return new JWArray<T>(this.removeAll(index, count), true);
	}

	/**
	 * @inheritdoc
	 */
	trySet(item: T, index: number): Proxy<T> {
		var oldItem = ArrayUtils.trySet(this.items, item, index);
		if (oldItem === undefined) {
			return undefined;
		}
		this.replaceEvent.trigger({ sender: this, index: index, oldItem: oldItem.value, newItem: item });
		this.changeEvent.trigger({ sender: this });
		if (this._ownsItems) {
			(<any>oldItem.value).destroy();
		}
		return oldItem;
	}

	/**
	 * @inheritdoc
	 */
	tryMove(fromIndex: number, toIndex: number): T {
		var item = ArrayUtils.tryMove(this.items, fromIndex, toIndex);
		if (item === undefined) {
			return undefined;
		}
		this.moveEvent.trigger({ sender: this, fromIndex: fromIndex, toIndex: toIndex, item: item });
		this.changeEvent.trigger({ sender: this });
		return item;
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
	tryClear(): T[] {
		var oldItems = ArrayUtils.tryClear(this.items);
		if (oldItems === undefined) {
			return undefined;
		}
		this.length.set(0);
		this.clearEvent.trigger({ sender: this, items: oldItems });
		this.changeEvent.trigger({ sender: this });
		if (this._ownsItems) {
			ArrayUtils.backEvery(oldItems, destroy);
		}
		return oldItems;
	}

	/**
	 * @inheritdoc
	 */
	trySplice(removeParamsList: IIndexCount[], addParamsList: IIndexItems<T>[]): IArraySpliceResult<T> {
		var result = ArrayUtils.trySplice(this.items, removeParamsList, addParamsList);
		if (result === undefined) {
			return undefined;
		}
		this.length.set(this.getLength());
		this.spliceEvent.trigger({ sender: this, spliceResult: result });
		this.changeEvent.trigger({ sender: this });
		if (this._ownsItems) {
			ArrayUtils.backEvery(result.getRemovedItems(), destroy);
		}
		return result;
	}

	/**
	 * @inheritdoc
	 */
	tryReorder(indexArray: number[]): T[] {
		var items = ArrayUtils.tryReorder(this.items, indexArray);
		if (items === undefined) {
			return undefined;
		}
		this.reorderEvent.trigger({ sender: this, indexArray: indexArray, items: items });
		this.changeEvent.trigger({ sender: this });
		return items;
	}

	/**
	 * @inheritdoc
	 */
	reverse() {
		var length = this.getLength();
		var indices = new Array<number>(length);
		for (var i = 0; i < length; ++i) {
			indices[i] = length - i - 1;
		}
		this.reorder(indices);
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
	createEmpty<U>(): ObservableArray<U> {
		return new ObservableArray<U>();
	}

	/**
	 * @inheritdoc
	 */
	createEmptyArray<U>(): ObservableArray<U> {
		return new ObservableArray<U>();
	}

	/**
	 * @inheritdoc
	 */
	createEmptyMap<U>(): ObservableMap<U> {
		return new ObservableMap<U>();
	}

	/**
	 * @inheritdoc
	 */
	createEmptySet<U extends Class>(): ObservableSet<U> {
		return new ObservableSet<U>();
	}
}

/**
 * [[JW.ObservableArray]] event parameters.
 */
export interface ArrayEventParams<T> {
	/**
	 * Event sender.
	 */
	sender: ObservableArray<T>;
}

/**
 * Parameters of [[JW.ObservableArray]]'s [[JW.ObservableArray.spliceEvent]].
 */
export interface ArraySpliceEventParams<T> extends ArrayEventParams<T> {
	/**
	 * Result of [[JW.ObservableArray.splice]] method.
	 */
	spliceResult: IArraySpliceResult<T>;
}

/**
 * Parameters of [[JW.ObservableArray]]'s [[JW.ObservableArray.moveEvent]].
 */
export interface ArrayMoveEventParams<T> extends ArrayEventParams<T> {
	/**
	 * Where item is moved from.
	 */
	fromIndex: number;

	/**
	 * Where item is moved to.
	 */
	toIndex: number;

	/**
	 * The moved item.
	 */
	item: T;
}

/**
 * Parameters of [[JW.ObservableArray]]'s [[JW.ObservableArray.replaceEvent]].
 */
export interface ArrayReplaceEventParams<T> extends ArrayEventParams<T> {
	/**
	 * Index of the replaced item.
	 */
	index: number;

	/**
	 * Old item.
	 */
	oldItem: T;

	/**
	 * New item.
	 */
	newItem: T;
}

/**
 * Parameters of [[JW.ObservableArray]]'s [[JW.ObservableArray.clearEvent]].
 */
export interface ArrayItemsEventParams<T> extends ArrayEventParams<T> {
	/**
	 * Old array contents.
	 */
	items: T[];
}

/**
 * Parameters of [[JW.ObservableArray]]'s [[JW.ObservableArray.reorderEvent]].
 */
export interface ArrayReorderEventParams<T> extends ArrayItemsEventParams<T> {
	/**
	 * Indexes of items in reordered array.
	 */
	indexArray: number[];
}
