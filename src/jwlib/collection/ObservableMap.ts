import {destroyForcibly, Dictionary, Proxy} from '../core/Core';
import {Class} from '../core/Class';
import {Destroyable} from '../core/Destroyable';
import {Event} from '../core/Event';
import {Property} from '../property/Property';
import {AbstractCollection} from './AbstractCollection';
import {AbstractMap} from './AbstractMap';
import {Array} from './Array';
import {Map} from './Map';
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
		this.reindexEvent.trigger({ sender: this, keyMap: Map.single(oldKey, newKey) });
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
		var spliceResult: AbstractMap.SpliceResult<T> = { addedItems: {}, removedItems: Map.single(key, item) };
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
	trySplice(removedKeys: string[], updatedItems: Dictionary<T>): AbstractMap.SpliceResult<T> {
		var spliceResult = this._trySplice(removedKeys, updatedItems);
		if (spliceResult === undefined) {
			return;
		}
		this.length.set(this.getLength());
		this.spliceEvent.trigger({ sender: this, spliceResult: spliceResult });
		this.changeEvent.trigger({ sender: this });
		if (this._ownsItems) {
			Array.backEvery(Map.toArray(spliceResult.removedItems), destroyForcibly);
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
			Array.backEvery(Map.toArray(items), destroyForcibly);
		}
		return items;
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
	createMapper<U>(config: AbstractMap.Mapper.Config<T, U>): ObservableMap.Mapper<T, U> {
		return new ObservableMap.Mapper<T, U>(this, config);
	}

	/**
	 * @inheritdoc
	 */
	createFilterer(config: AbstractMap.Filterer.Config<T>): ObservableMap.Filterer<T> {
		return new ObservableMap.Filterer<T>(this, config);
	}

	/**
	 * @inheritdoc
	 */
	createCounter(config: AbstractCollection.Counter.Config<T>): ObservableMap.Counter<T> {
		return new ObservableMap.Counter<T>(this, config);
	}

	/**
	 * @inheritdoc
	 */
	createObserver(config: AbstractCollection.Observer.Config<T>): ObservableMap.Observer<T> {
		return new ObservableMap.Observer<T>(this, config);
	}

	/**
	 * @inheritdoc
	 */
	createOrderer(config?: AbstractCollection.Orderer.Config<any>): ObservableMap.Orderer<any> {
		return new ObservableMap.Orderer<any>(this, config);
	}

	/**
	 * @inheritdoc
	 */
	createSorterComparing(config?: AbstractCollection.SorterComparing.Config<T>): ObservableMap.SorterComparing<T> {
		return new ObservableMap.SorterComparing<T>(this, config);
	}

	/**
	 * @inheritdoc
	 */
	createIndexer(config: AbstractCollection.Indexer.Config<T>): ObservableMap.Indexer<T> {
		return new ObservableMap.Indexer<T>(this, config);
	}

	/**
	 * @inheritdoc
	 */
	createLister(config?: AbstractCollection.Lister.Config<any>): ObservableMap.Lister<any> {
		return new ObservableMap.Lister<any>(this, config);
	}

	/**
	 * @inheritdoc
	 */
	createInserter(config: AbstractMap.Inserter.Config<T>): ObservableMap.Inserter<T> {
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
		spliceResult: AbstractMap.SpliceResult<T>;
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
		constructor(source: ObservableMap<T>, config: AbstractCollection.Counter.Config<T>) {
			super(source, config);
			this.own(source.spliceEvent.bind(this._onSplice, this));
			this.own(source.clearEvent.bind(this._onClear, this));
		}

		private _onSplice(params: SpliceEventParams<T>) {
			var spliceResult = params.spliceResult;
			this.target.set(this.target.get() -
				Map.count(spliceResult.removedItems, this._filterItem, this._scope) +
				Map.count(spliceResult.addedItems, this._filterItem, this._scope));
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
		constructor(source: ObservableMap<T>, config: AbstractMap.Filterer.Config<T>) {
			super(source, config);
			this.own(source.spliceEvent.bind(this._onSplice, this));
			this.own(source.reindexEvent.bind(this._onReindex, this));
			this.own(source.clearEvent.bind(this._onClear, this));
		}

		private _onSplice(params: SpliceEventParams<T>) {
			var spliceResult = params.spliceResult;
			this.target.trySplice(
				Map.getKeys(spliceResult.removedItems),
				Map.filter(spliceResult.addedItems, this._filterItem, this._scope));
		}

		private _onReindex(params: ReindexEventParams<T>) {
			this.target.tryReindex(params.keyMap);
		}

		private _onClear(params: ItemsEventParams<T>) {
			this.target.tryRemoveAll(Map.getKeys(params.items));
		}
	}

	/**
	 * [[JW.AbstractCollection.Indexer|Indexer]] implementation for [[JW.ObservableMap]].
	 */
	export class Indexer<T> extends AbstractMap.Indexer<T> {
		/**
		 * @inheritdoc
		 */
		constructor(source: ObservableMap<T>, config: AbstractCollection.Indexer.Config<T>) {
			super(source, config);
			this.own(source.spliceEvent.bind(this._onSplice, this));
			this.own(source.clearEvent.bind(this._onClear, this));
		}

		private _onSplice(params: SpliceEventParams<T>) {
			var spliceResult = params.spliceResult;
			this.target.trySplice(
				this._keys(Map.toArray(spliceResult.removedItems)),
				this._index(Map.toArray(spliceResult.addedItems)));
		}

		private _onClear(params: ItemsEventParams<T>) {
			this.target.tryRemoveAll(
				this._keys(Map.toArray(params.items)));
		}
	}

	/**
	 * [[JW.AbstractMap.Inserter|Inserter]] implementation for [[JW.ObservableMap]].
	 */
	export class Inserter<T> extends AbstractMap.Inserter<T> {
		/**
		 * @inheritdoc
		 */
		constructor(source: ObservableMap<T>, config?: AbstractMap.Inserter.Config<T>) {
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
		constructor(source: ObservableMap<T>, config: AbstractCollection.Lister.Config<T>) {
			super(source, config);
			this.own(source.spliceEvent.bind(this._onSplice, this));
			this.own(source.clearEvent.bind(this._onClear, this));
		}

		private _onSplice(params: SpliceEventParams<T>) {
			var spliceResult = params.spliceResult;
			this.target.trySplice(
				Map.toArray(spliceResult.removedItems),
				Map.toArray(spliceResult.addedItems));
		}

		private _onClear(params: ItemsEventParams<T>) {
			this.target.tryRemoveAll(
				Map.toArray(params.items));
		}
	}

	/**
	 * [[JW.AbstractCollection.Mapper|Mapper]] implementation for [[JW.ObservableMap]].
	 */
	export class Mapper<T, U> extends AbstractMap.Mapper<T, U> {
		/**
		 * @inheritdoc
		 */
		constructor(source: ObservableMap<T>, config: AbstractMap.Mapper.Config<T, U>) {
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
				Map.getRemovedKeys(removedDatas, addedDatas),
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
			this._destroyItems(this.target.tryRemoveAll(Map.getKeys(datas)), datas);
		}
	}

	/**
	 * [[JW.AbstractCollection.Observer|Observer]] implementation for [[JW.ObservableMap]].
	 */
	export class Observer<T> extends AbstractMap.Observer<T> {
		/**
		 * @inheritdoc
		 */
		constructor(source: ObservableMap<T>, config: AbstractCollection.Observer.Config<T>) {
			super(source, config);
			this.own(source.spliceEvent.bind(this._onSplice, this));
			this.own(source.clearEvent.bind(this._onClear, this));
			if (this._change) {
				this.own(source.changeEvent.bind(this._onChange, this));
			}
		}

		private _onSplice(params: SpliceEventParams<T>) {
			var spliceResult = params.spliceResult;
			this._removeItems(Map.toArray(spliceResult.removedItems));
			this._addItems(Map.toArray(spliceResult.addedItems));
		}

		private _onClear(params: ItemsEventParams<T>) {
			this._doClearItems(Map.toArray(params.items));
		}
	}

	/**
	 * [[JW.AbstractCollection.Orderer|Orderer]] implementation for [[JW.ObservableMap]].
	 */
	export class Orderer<T extends Class> extends AbstractMap.Orderer<T> {
		/**
		 * @inheritdoc
		 */
		constructor(source: ObservableMap<T>, config: AbstractCollection.Orderer.Config<T>) {
			super(source, config);
			this.own(source.spliceEvent.bind(this._onSplice, this));
			this.own(source.clearEvent.bind(this._onClear, this));
		}

		private _onSplice(params: SpliceEventParams<T>) {
			var spliceResult = params.spliceResult;
			this._splice(
				Map.toSet(spliceResult.removedItems),
				Map.toSet(spliceResult.addedItems));
		}

		private _onClear(params: ItemsEventParams<T>) {
			this.target.removeItems(
				Map.toArray(params.items));
		}
	}

	/**
	 * [[JW.AbstractCollection.SorterComparing|SorterComparing]] implementation for [[JW.ObservableMap]].
	 */
	export class SorterComparing<T> extends AbstractMap.SorterComparing<T> {
		/**
		 * @inheritdoc
		 */
		constructor(source: ObservableMap<T>, config: AbstractCollection.SorterComparing.Config<T>) {
			super(source, config);
			this.own(source.spliceEvent.bind(this._onSplice, this));
			this.own(source.clearEvent.bind(this._onClear, this));
		}

		private _onSplice(params: SpliceEventParams<T>) {
			var spliceResult = params.spliceResult;
			this._splice(
				Map.toArray(spliceResult.removedItems),
				Map.toArray(spliceResult.addedItems));
		}

		private _onClear(params: ItemsEventParams<T>) {
			this._splice(Map.toArray(params.items), []);
		}
	}
}
