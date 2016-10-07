import {destroy, destroyForcibly, Dictionary, Proxy} from '../../core/Core';
import {Class} from '../../core/Class';
import {IClass} from '../../core/IClass';
import {Destroyable} from '../../core/Destroyable';
import {Event} from '../../core/Event';
import {Property} from '../../property/Property';
import * as Collections from '../interfaces/ICollection';
import {AbstractMap} from '../abstracts/AbstractMap';
import {Array} from './Array';
import {IArray} from '../interfaces/IArray';
import * as ArrayUtils from '../utils/Array';
import {Map} from './Map';
import {IMap} from '../interfaces/IMap';
import * as Maps from '../interfaces/IMap';
import * as MapUtils from '../utils/Map';
import {Set} from './Set';
import {ISet} from '../interfaces/ISet';
import {ObservableArray} from './ObservableArray';
import {ObservableSet} from './ObservableSet';

/**
 * Observable implementation of [[JW.AbstractMap]].
 *
 * @param T Collection item type.
 */
export class ObservableMap<T> extends AbstractMap<T> {
	/**
	 * Collection length. **Don't modify manually!**
	 */
	length: Property<number>;

	/**
	 * Items are removed from map, items are added to map and items are updated in map.
	 * Triggered in result of calling:
	 *
	 * * [[set]]
	 * * [[trySet]]
	 * * [[setAll]]
	 * * [[trySetAll]]
	 * * [[remove]]
	 * * [[tryRemove]]
	 * * [[removeItem]]
	 * * [[removeAll]]
	 * * [[tryRemoveAll]]
	 * * [[removeItems]]
	 * * [[splice]]
	 * * [[trySplice]]
	 * * [[performSplice]]
	 */
	spliceEvent: Event<ObservableMap.SpliceEventParams<T>> = new Event<ObservableMap.SpliceEventParams<T>>();

	/**
	 * Keys of items are changed in map. Triggered in result of calling:
	 *
	 * * [[setKey]]
	 * * [[trySetKey]]
	 * * [[reindex]]
	 * * [[tryReindex]]
	 * * [[performReindex]]
	 */
	reindexEvent: Event<ObservableMap.ReindexEventParams<T>> = new Event<ObservableMap.ReindexEventParams<T>>();

	/**
	 * Map is cleared. Triggered in result of calling:
	 *
	 * * [[clear]]
	 * * [[$clear]]
	 * * [[tryClear]]
	 */
	clearEvent: Event<ObservableMap.ItemsEventParams<T>> = new Event<ObservableMap.ItemsEventParams<T>>();

	/**
	 * Map is changed. Triggered right after one of events:
	 *
	 * * [[spliceEvent]]
	 * * [[reindexEvent]]
	 * * [[clearEvent]]
	 */
	changeEvent: Event<ObservableMap.EventParams<T>> = new Event<ObservableMap.EventParams<T>>();

	/**
	 * @inheritdoc
	 */
	constructor(items?: Dictionary<T>, adapter?: boolean) {
		super(items, adapter);
		this.length = new Property<number>(this.getLength());
	}

	/**
	 * @inheritdoc
	 */
	ownItems(): ObservableMap<T> {
		super.ownItems();
		return this;
	}

	/**
	 * @inheritdoc
	 */
	protected destroyObject() {
		this.changeEvent.destroy();
		this.clearEvent.destroy();
		this.reindexEvent.destroy();
		this.spliceEvent.destroy();
		this.length.destroy();
		super.destroyObject();
	}

	/**
	 * @inheritdoc
	 */
	$getKeys(): IArray<string> {
		return new Array<string>(this.getKeys(), true);
	}

	/**
	 * @inheritdoc
	 */
	$toSorted(callback?: (item: T, key: string) => any, scope?: any, order?: number): IArray<T> {
		return new Array<T>(this.toSorted(callback, scope, order), true);
	}

	/**
	 * @inheritdoc
	 */
	$toSortedComparing(compare?: (t1: T, t2: T, k1: string, k2: string) => number, scope?: any, order?: number): IArray<T> {
		return new Array<T>(this.toSortedComparing(compare, scope, order), true);
	}

	/**
	 * @inheritdoc
	 */
	$getSortingKeys(callback?: (item: T, key: string) => any, scope?: any, order?: number): IArray<string> {
		return new Array<string>(this.getSortingKeys(callback, scope, order), true);
	}

	/**
	 * @inheritdoc
	 */
	$getSortingKeysComparing(compare?: (t1: T, t2: T, k1: string, k2: string) => number, scope?: any, order?: number): IArray<string> {
		return new Array<string>(this.getSortingKeysComparing(compare, scope, order), true);
	}

	/**
	 * @inheritdoc
	 */
	$filter(callback: (item: T, key: string) => boolean, scope?: any): IMap<T> {
		return new Map<T>(this.filter(callback, scope || this), true);
	}

	/**
	 * @inheritdoc
	 */
	$map<U>(callback: (item: T, key: string) => U, scope?: any): IMap<U> {
		return new Map<U>(this.map(callback, scope || this), true);
	}

	/**
	 * @inheritdoc
	 */
	$index(callback: (item: T, key: string) => string, scope?: any): IMap<T> {
		return new Map<T>(this.index(callback, scope), true);
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
	$asArray(): IArray<T> {
		return new Array<T>(this.asArray(), true);
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
	trySet(item: T, key: string): Proxy<T> {
		var result = this._trySet(item, key);
		if (result === undefined) {
			return;
		}
		var removedItems: Dictionary<T> = {};
		var removedItem = result.value;
		if (removedItem !== undefined) {
			removedItems[key] = removedItem;
		}
		var addedItems: Dictionary<T> = {};
		addedItems[key] = item;
		var spliceResult = { removedItems: removedItems, addedItems: addedItems };
		this.length.set(this.getLength());
		this.spliceEvent.trigger({ sender: this, spliceResult: spliceResult });
		this.changeEvent.trigger({ sender: this });
		if (removedItem !== undefined && this._ownsItems) {
			(<Destroyable><any>removedItem).destroy();
		}
		return result;
	}

	/**
	 * @inheritdoc
	 */
	setAll(items: Dictionary<T>) {
		this.trySetAll(items);
	}

	/**
	 * @inheritdoc
	 */
	trySetKey(oldKey: string, newKey: string): T {
		var item = super.trySetKey(oldKey, newKey);
		if (item === undefined) {
			return;
		}
		this.reindexEvent.trigger({ sender: this, keyMap: MapUtils.single(oldKey, newKey) });
		this.changeEvent.trigger({ sender: this });
		return item;
	}

	/**
	 * @inheritdoc
	 */
	tryRemove(key: string): T {
		var item = this._tryRemove(key);
		if (item === undefined) {
			return;
		}
		var spliceResult: Maps.SpliceResult<T> = { addedItems: {}, removedItems: MapUtils.single(key, item) };
		this.length.set(this.getLength());
		this.spliceEvent.trigger({ sender: this, spliceResult: spliceResult });
		this.changeEvent.trigger({ sender: this });
		if (this._ownsItems) {
			(<Destroyable><any>item).destroy();
		}
		return item;
	}

	/**
	 * @inheritdoc
	 */
	removeAll(keys: string[]) {
		this.tryRemoveAll(keys);
	}

	/**
	 * @inheritdoc
	 */
	$removeAllVerbose(keys: string[]): IMap<T> {
		return new Map<T>(this.removeAllVerbose(keys), true);
	}

	/**
	 * @inheritdoc
	 */
	trySplice(removedKeys: string[], updatedItems: Dictionary<T>): Maps.SpliceResult<T> {
		var spliceResult = this._trySplice(removedKeys, updatedItems);
		if (spliceResult === undefined) {
			return;
		}
		this.length.set(this.getLength());
		this.spliceEvent.trigger({ sender: this, spliceResult: spliceResult });
		this.changeEvent.trigger({ sender: this });
		if (this._ownsItems) {
			ArrayUtils.backEvery(MapUtils.toArray(spliceResult.removedItems), destroyForcibly);
		}
		return spliceResult;
	}

	/**
	 * @inheritdoc
	 */
	tryClear(): Dictionary<T> {
		var items = this._tryClear();
		if (items === undefined) {
			return;
		}
		this.length.set(0);
		this.clearEvent.trigger({ sender: this, items: items });
		this.changeEvent.trigger({ sender: this });
		if (this._ownsItems) {
			ArrayUtils.backEvery(MapUtils.toArray(items), destroyForcibly);
		}
		return items;
	}

	/**
	 * @inheritdoc
	 */
	$clear(): IMap<T> {
		return new Map<T>(this.clear(), true);
	}

	/**
	 * @inheritdoc
	 */
	tryReindex(keyMap: Dictionary<string>): Dictionary<string> {
		var result = super.tryReindex(keyMap);
		if (result === undefined) {
			return;
		}
		this.reindexEvent.trigger({ sender: this, keyMap: result });
		this.changeEvent.trigger({ sender: this });
		return result;
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
	$$filter(callback: (item: T) => boolean, scope?: any): ObservableMap<T> {
		var result = new ObservableMap<T>();
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
	$$mapValues<U>(callback: (item: T) => U, scope?: any): ObservableMap<U> {
		var result = new ObservableMap<U>();
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
	$$mapObjects<U extends Destroyable>(callback: (item: T) => U, scope?: any): ObservableMap<U> {
		var result = new ObservableMap<U>();
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
	createEmpty<U>(): ObservableMap<U> {
		return new ObservableMap<U>();
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
	createMapper<U>(config: Maps.MapperConfig<T, U>): ObservableMap.Mapper<T, U> {
		return new ObservableMap.Mapper<T, U>(this, config);
	}

	/**
	 * @inheritdoc
	 */
	createFilterer(config: Maps.FiltererConfig<T>): ObservableMap.Filterer<T> {
		return new ObservableMap.Filterer<T>(this, config);
	}

	/**
	 * @inheritdoc
	 */
	createCounter(config: Collections.CounterConfig<T>): ObservableMap.Counter<T> {
		return new ObservableMap.Counter<T>(this, config);
	}

	/**
	 * @inheritdoc
	 */
	createObserver(config: Collections.ObserverConfig<T>): ObservableMap.Observer<T> {
		return new ObservableMap.Observer<T>(this, config);
	}

	/**
	 * @inheritdoc
	 */
	createOrderer(config?: Collections.OrdererConfig<any>): ObservableMap.Orderer<any> {
		return new ObservableMap.Orderer<any>(this, config);
	}

	/**
	 * @inheritdoc
	 */
	createSorterComparing(config?: Collections.SorterComparingConfig<T>): ObservableMap.SorterComparing<T> {
		return new ObservableMap.SorterComparing<T>(this, config);
	}

	/**
	 * @inheritdoc
	 */
	createIndexer(config: Collections.IndexerConfig<T>): ObservableMap.Indexer<T> {
		return new ObservableMap.Indexer<T>(this, config);
	}

	/**
	 * @inheritdoc
	 */
	createLister(config?: Collections.ListerConfig<any>): ObservableMap.Lister<any> {
		return new ObservableMap.Lister<any>(this, config);
	}

	/**
	 * @inheritdoc
	 */
	createInserter(config: Maps.InserterConfig<T>): ObservableMap.Inserter<T> {
		return new ObservableMap.Inserter<T>(this, config);
	}
}

export module ObservableMap {
	/**
	 * [[JW.ObservableMap]] event parameters.
	 */
	export interface EventParams<T> {
		/**
		 * Event sender.
		 */
		sender: ObservableMap<T>;
	}

	/**
	 * Parameters of [[JW.ObservableMap]]'s [[JW.ObservableMap.spliceEvent]].
	 */
	export interface SpliceEventParams<T> extends EventParams<T> {
		/**
		 * Result of [[JW.ObservableMap.splice]] method.
		 */
		spliceResult: Maps.SpliceResult<T>;
	}

	/**
	 * Parameters of [[JW.ObservableMap]]'s [[JW.ObservableMap.reindexEvent]].
	 */
	export interface ReindexEventParams<T> extends EventParams<T> {
		/**
		 * Map of changed keys.
		 */
		keyMap: Dictionary<string>;
	}

	/**
	 * Parameters of [[JW.ObservableMap]]'s [[JW.ObservableMap.clearEvent]].
	 */
	export interface ItemsEventParams<T> extends EventParams<T> {
		/**
		 * Old map contents.
		 */
		items: Dictionary<T>;
	}

	/**
	 * [[JW.AbstractCollection.Counter|Counter]] implementation for [[JW.ObservableMap]].
	 */
	export class Counter<T> extends AbstractMap.Counter<T> {
		/**
		 * @inheritdoc
		 */
		constructor(source: ObservableMap<T>, config: Collections.CounterConfig<T>) {
			super(source, config);
			this.own(source.spliceEvent.bind(this._onSplice, this));
			this.own(source.clearEvent.bind(this._onClear, this));
		}

		private _onSplice(params: SpliceEventParams<T>) {
			var spliceResult = params.spliceResult;
			this.target.set(this.target.get() -
				MapUtils.count(spliceResult.removedItems, this._filterItem, this._scope) +
				MapUtils.count(spliceResult.addedItems, this._filterItem, this._scope));
		}

		private _onClear(params: ItemsEventParams<T>) {
			this.target.set(0);
		}
	}

	/**
	 * [[JW.AbstractCollection.Filterer|Filterer]] implementation for [[JW.ObservableMap]].
	 */
	export class Filterer<T> extends AbstractMap.Filterer<T> {
		/**
		 * @inheritdoc
		 */
		constructor(source: ObservableMap<T>, config: Maps.FiltererConfig<T>) {
			super(source, config);
			this.own(source.spliceEvent.bind(this._onSplice, this));
			this.own(source.reindexEvent.bind(this._onReindex, this));
			this.own(source.clearEvent.bind(this._onClear, this));
		}

		private _onSplice(params: SpliceEventParams<T>) {
			var spliceResult = params.spliceResult;
			this.target.trySplice(
				MapUtils.getKeys(spliceResult.removedItems),
				MapUtils.filter(spliceResult.addedItems, this._filterItem, this._scope));
		}

		private _onReindex(params: ReindexEventParams<T>) {
			this.target.tryReindex(params.keyMap);
		}

		private _onClear(params: ItemsEventParams<T>) {
			this.target.tryRemoveAll(MapUtils.getKeys(params.items));
		}
	}

	/**
	 * [[JW.AbstractCollection.Indexer|Indexer]] implementation for [[JW.ObservableMap]].
	 */
	export class Indexer<T> extends AbstractMap.Indexer<T> {
		/**
		 * @inheritdoc
		 */
		constructor(source: ObservableMap<T>, config: Collections.IndexerConfig<T>) {
			super(source, config);
			this.own(source.spliceEvent.bind(this._onSplice, this));
			this.own(source.clearEvent.bind(this._onClear, this));
		}

		private _onSplice(params: SpliceEventParams<T>) {
			var spliceResult = params.spliceResult;
			this.target.trySplice(
				this._keys(MapUtils.toArray(spliceResult.removedItems)),
				this._index(MapUtils.toArray(spliceResult.addedItems)));
		}

		private _onClear(params: ItemsEventParams<T>) {
			this.target.tryRemoveAll(
				this._keys(MapUtils.toArray(params.items)));
		}
	}

	/**
	 * [[JW.AbstractMap.Inserter|Inserter]] implementation for [[JW.ObservableMap]].
	 */
	export class Inserter<T> extends AbstractMap.Inserter<T> {
		/**
		 * @inheritdoc
		 */
		constructor(source: ObservableMap<T>, config?: Maps.InserterConfig<T>) {
			super(source, config);
			this.own(source.spliceEvent.bind(this._onSplice, this));
			this.own(source.reindexEvent.bind(this._onReindex, this));
			this.own(source.clearEvent.bind(this._onClear, this));
		}

		private _onSplice(params: SpliceEventParams<T>) {
			var spliceResult = params.spliceResult;
			this._removeItems(spliceResult.removedItems);
			this._addItems(spliceResult.addedItems);
		}

		private _onReindex(params: ReindexEventParams<T>) {
			var keyMap = params.keyMap;
			for (var oldKey in keyMap) {
				var newKey = keyMap[oldKey];
				var item = this.source.get(newKey);
				if (this._removeItem) {
					this._removeItem.call(this._scope, oldKey, item);
				}
				if (this._addItem) {
					this._addItem.call(this._scope, item, newKey);
				}
			}
		}

		private _onClear(params: ItemsEventParams<T>) {
			this._doClearItems(params.items);
		}
	}

	/**
	 * [[JW.AbstractCollection.Lister|Lister]] implementation for [[JW.ObservableMap]].
	 */
	export class Lister<T extends Class> extends AbstractMap.Lister<T> {
		/**
		 * @inheritdoc
		 */
		constructor(source: ObservableMap<T>, config: Collections.ListerConfig<T>) {
			super(source, config);
			this.own(source.spliceEvent.bind(this._onSplice, this));
			this.own(source.clearEvent.bind(this._onClear, this));
		}

		private _onSplice(params: SpliceEventParams<T>) {
			var spliceResult = params.spliceResult;
			this.target.trySplice(
				MapUtils.toArray(spliceResult.removedItems),
				MapUtils.toArray(spliceResult.addedItems));
		}

		private _onClear(params: ItemsEventParams<T>) {
			this.target.tryRemoveAll(
				MapUtils.toArray(params.items));
		}
	}

	/**
	 * [[JW.AbstractCollection.Mapper|Mapper]] implementation for [[JW.ObservableMap]].
	 */
	export class Mapper<T, U> extends AbstractMap.Mapper<T, U> {
		/**
		 * @inheritdoc
		 */
		constructor(source: ObservableMap<T>, config: Maps.MapperConfig<T, U>) {
			super(source, config);
			this.own(source.spliceEvent.bind(this._onSplice, this));
			this.own(source.reindexEvent.bind(this._onReindex, this));
			this.own(source.clearEvent.bind(this._onClear, this));
		}

		private _onSplice(params: SpliceEventParams<T>) {
			var sourceResult = params.spliceResult;
			var removedDatas = sourceResult.removedItems;
			var addedDatas = sourceResult.addedItems;
			var targetResult = this.target.trySplice(
				MapUtils.getRemovedKeys(removedDatas, addedDatas),
				this._createItems(addedDatas));
			if (targetResult !== undefined) {
				this._destroyItems(targetResult.removedItems, removedDatas);
			}
		}

		private _onReindex(params: ReindexEventParams<T>) {
			this.target.tryReindex(params.keyMap);
		}

		private _onClear(params: ItemsEventParams<T>) {
			var datas = params.items;
			this._destroyItems(this.target.tryRemoveAll(MapUtils.getKeys(datas)), datas);
		}
	}

	/**
	 * [[JW.AbstractCollection.Observer|Observer]] implementation for [[JW.ObservableMap]].
	 */
	export class Observer<T> extends AbstractMap.Observer<T> {
		/**
		 * @inheritdoc
		 */
		constructor(source: ObservableMap<T>, config: Collections.ObserverConfig<T>) {
			super(source, config);
			this.own(source.spliceEvent.bind(this._onSplice, this));
			this.own(source.clearEvent.bind(this._onClear, this));
			if (this._change) {
				this.own(source.changeEvent.bind(this._onChange, this));
			}
		}

		private _onSplice(params: SpliceEventParams<T>) {
			var spliceResult = params.spliceResult;
			this._removeItems(MapUtils.toArray(spliceResult.removedItems));
			this._addItems(MapUtils.toArray(spliceResult.addedItems));
		}

		private _onClear(params: ItemsEventParams<T>) {
			this._doClearItems(MapUtils.toArray(params.items));
		}
	}

	/**
	 * [[JW.AbstractCollection.Orderer|Orderer]] implementation for [[JW.ObservableMap]].
	 */
	export class Orderer<T extends IClass> extends AbstractMap.Orderer<T> {
		/**
		 * @inheritdoc
		 */
		constructor(source: ObservableMap<T>, config: Collections.OrdererConfig<T>) {
			super(source, config);
			this.own(source.spliceEvent.bind(this._onSplice, this));
			this.own(source.clearEvent.bind(this._onClear, this));
		}

		private _onSplice(params: SpliceEventParams<T>) {
			var spliceResult = params.spliceResult;
			this._splice(
				MapUtils.toSet(spliceResult.removedItems),
				MapUtils.toSet(spliceResult.addedItems));
		}

		private _onClear(params: ItemsEventParams<T>) {
			this.target.removeItems(
				MapUtils.toArray(params.items));
		}
	}

	/**
	 * [[JW.AbstractCollection.SorterComparing|SorterComparing]] implementation for [[JW.ObservableMap]].
	 */
	export class SorterComparing<T> extends AbstractMap.SorterComparing<T> {
		/**
		 * @inheritdoc
		 */
		constructor(source: ObservableMap<T>, config: Collections.SorterComparingConfig<T>) {
			super(source, config);
			this.own(source.spliceEvent.bind(this._onSplice, this));
			this.own(source.clearEvent.bind(this._onClear, this));
		}

		private _onSplice(params: SpliceEventParams<T>) {
			var spliceResult = params.spliceResult;
			this._splice(
				MapUtils.toArray(spliceResult.removedItems),
				MapUtils.toArray(spliceResult.addedItems));
		}

		private _onClear(params: ItemsEventParams<T>) {
			this._splice(MapUtils.toArray(params.items), []);
		}
	}
}
