import {destroy} from './Core';
import AbstractArray from './AbstractArray';
import Class from './Class';
import Destroyable from './Destroyable';
import Event from './Event';
import IArray from './IArray';
import IArraySpliceParams from './IArraySpliceParams';
import IArraySpliceResult from './IArraySpliceResult';
import IClass from './IClass';
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
	spliceEvent: Event<SpliceEventParams<T>> = new Event<SpliceEventParams<T>>();

	/**
	 * Item is replaced in array. Triggered in result of calling:
	 *
	 * * [[set]]
	 * * [[trySet]]
	 */
	replaceEvent: Event<ReplaceEventParams<T>> = new Event<ReplaceEventParams<T>>();

	/**
	 * Item is moved in array. Triggered in result of calling:
	 *
	 * * [[move]]
	 * * [[tryMove]]
	 */
	moveEvent: Event<MoveEventParams<T>> = new Event<MoveEventParams<T>>();

	/**
	 * Array is cleared. Triggered in result of calling:
	 * * [[clear]]
	 * * [[$clear]]
	 * * [[tryClear]]
	 */
	clearEvent: Event<ItemsEventParams<T>> = new Event<ItemsEventParams<T>>();

	/**
	 * Items are reordered in array. Triggered in result of calling:
	 *
	 * * [[reorder]]
	 * * [[tryReorder]]
	 * * [[performReorder]]
	 * * [[sort]]
	 * * [[sortComparing]]
	 */
	reorderEvent: Event<ReorderEventParams<T>> = new Event<ReorderEventParams<T>>();

	/**
	 * Array is changed. Triggered right after one of events:
	 *
	 * * [[spliceEvent]]
	 * * [[replaceEvent]]
	 * * [[moveEvent]]
	 * * [[clearEvent]]
	 * * [[reorderEvent]]
	 */
	changeEvent: Event<EventParams<T>> = new Event<EventParams<T>>();

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
	ownItems(): ObservableArray<T> {
		super.ownItems();
		return this;
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
	$$toSortedComparing(compare?: (t1: T, t2: T) => number, scope?: any, order?: number): ObservableArray<T> {
		var result = new ObservableArray<T>();
		result.own(this.createSorterComparing({
			target: result,
			compare: compare,
			scope: scope || this,
			order: order
		}));
		return result;
	}

	/**
	 * @inheritdoc
	 */
	$$index(callback: (item: T) => string, scope?: any): ObservableMap<T> {
		var result = new ObservableMap<T>();
		result.own(this.createIndexer({
			target: result,
			getKey: callback,
			scope: scope || this
		}));
		return result;
	}

	/**
	 * @inheritdoc
	 */
	$$toArray(): ObservableArray<T> {
		var result = new ObservableArray<T>();
		result.own(this.createOrderer({
			target: result
		}));
		return result;
	}

	/**
	 * @inheritdoc
	 */
	$$toSet(): ObservableSet<any> {
		var result = new ObservableSet<any>();
		result.own(this.createLister({
			target: result
		}));
		return result;
	}

	/**
	 * @inheritdoc
	 */
	$$filter(callback: (item: T) => boolean, scope?: any): ObservableArray<T> {
		var result = new ObservableArray<T>();
		result.own(this.createFilterer({
			target: result,
			filterItem: callback,
			scope: scope || this
		}));
		return result;
	}

	/**
	 * @inheritdoc
	 */
	$$count(callback: (item: T) => boolean, scope?: any): Property<number> {
		var result = new Property(0);
		result.own(this.createCounter({
			target: result,
			filterItem: callback,
			scope: scope || this
		}));
		return result;
	}

	/**
	 * @inheritdoc
	 */
	$$mapValues<U>(callback: (item: T) => U, scope?: any): ObservableArray<U> {
		var result = new ObservableArray<U>();
		result.own(this.createMapper({
			target: result,
			createItem: callback,
			scope: scope || this
		}));
		return result;
	}

	/**
	 * @inheritdoc
	 */
	$$mapObjects<U extends Destroyable>(callback: (item: T) => U, scope?: any): ObservableArray<U> {
		var result = new ObservableArray<U>();
		result.own(this.createMapper({
			target: result,
			createItem: callback,
			destroyItem: destroy,
			scope: scope || this
		}));
		return result;
	}

	/**
	 * @inheritdoc
	 */
	$$toReversed(): ObservableArray<T> {
		var result = new ObservableArray<T>();
		result.own(this.createReverser({
			target: result
		}));
		return result;
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

	/**
	 * @inheritdoc
	 */
	createMapper<U>(config: Arrays.MapperConfig<T, U>): ObservableArray.Mapper<T, U> {
		return new ObservableArray.Mapper<T, U>(this, config);
	}

	/**
	 * @inheritdoc
	 */
	createFilterer(config: Arrays.FiltererConfig<T>): ObservableArray.Filterer<T> {
		return new ObservableArray.Filterer<T>(this, config);
	}

	/**
	 * @inheritdoc
	 */
	createCounter(config: Collections.CounterConfig<T>): ObservableArray.Counter<T> {
		return new ObservableArray.Counter<T>(this, config);
	}

	/**
	 * @inheritdoc
	 */
	createObserver(config: Collections.ObserverConfig<T>): ObservableArray.Observer<T> {
		return new ObservableArray.Observer<T>(this, config);
	}

	/**
	 * @inheritdoc
	 */
	createOrderer(config?: Collections.OrdererConfig<any>): ObservableArray.Orderer<any> {
		return new ObservableArray.Orderer<any>(this, config);
	}

	/**
	 * @inheritdoc
	 */
	createSorterComparing(config?: Collections.SorterComparingConfig<T>): ObservableArray.SorterComparing<T> {
		return new ObservableArray.SorterComparing<T>(this, config);
	}

	/**
	 * @inheritdoc
	 */
	createIndexer(config: Collections.IndexerConfig<T>): ObservableArray.Indexer<T> {
		return new ObservableArray.Indexer<T>(this, config);
	}

	/**
	 * @inheritdoc
	 */
	createLister(config?: Collections.ListerConfig<any>): ObservableArray.Lister<any> {
		return new ObservableArray.Lister<any>(this, config);
	}

	/**
	 * @inheritdoc
	 */
	createInserter(config: Arrays.InserterConfig<T>): ObservableArray.Inserter<T> {
		return new ObservableArray.Inserter<T>(this, config);
	}

	/**
	 * @inheritdoc
	 */
	createMerger<U>(config?: Arrays.MergerConfig<U>): ObservableArray.Merger<U> {
		return new ObservableArray.Merger<U>(<ObservableArray<any>>this, config);
	}

	// type definition in argument breaks compiler for some reason
	/**
	 * @inheritdoc
	 */
	_createMergerBunch(merger: any): IClass {
		return new ObservableArray.Merger.Bunch<T>(merger, this);
	}

	/**
	 * @inheritdoc
	 */
	createReverser(config?: Arrays.ReverserConfig<T>): ObservableArray.Reverser<T> {
		return new ObservableArray.Reverser<T>(this, config);
	}

	/**
	 * @hidden
	 */
	_createMergerTarget<T>(): ObservableArray<T> {
		return new ObservableArray<T>();
	}
}

/**
 * [[JW.ObservableArray]] event parameters.
 */
export interface EventParams<T> {
	/**
	 * Event sender.
	 */
	sender: ObservableArray<T>;
}

/**
 * Parameters of [[JW.ObservableArray]]'s [[JW.ObservableArray.spliceEvent]].
 */
export interface SpliceEventParams<T> extends EventParams<T> {
	/**
	 * Result of [[JW.ObservableArray.splice]] method.
	 */
	spliceResult: IArraySpliceResult<T>;
}

/**
 * Parameters of [[JW.ObservableArray]]'s [[JW.ObservableArray.moveEvent]].
 */
export interface MoveEventParams<T> extends EventParams<T> {
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
export interface ReplaceEventParams<T> extends EventParams<T> {
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
export interface ItemsEventParams<T> extends EventParams<T> {
	/**
	 * Old array contents.
	 */
	items: T[];
}

/**
 * Parameters of [[JW.ObservableArray]]'s [[JW.ObservableArray.reorderEvent]].
 */
export interface ReorderEventParams<T> extends ItemsEventParams<T> {
	/**
	 * Indexes of items in reordered array.
	 */
	indexArray: number[];
}
