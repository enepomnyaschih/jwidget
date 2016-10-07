import {destroy, destroyForcibly, Dictionary} from '../../core/Core';
import {Class} from '../../core/Class';
import {IClass} from '../../core/IClass';
import {Event} from '../../core/Event';
import {Property} from '../../property/Property';
import * as Collections from '../interfaces/ICollections';
import {AbstractSet} from '../abstracts/AbstractSet';
import {Array} from './Array';
import {IArray} from '../interfaces/IArray';
import * as ArrayUtils from '../utils/Array';
import {Set} from './Set';
import {ISet} from '../interfaces/ISet';
import * as Sets from '../interfaces/ISet';
import {ObservableArray} from './ObservableArray';
import {ObservableMap} from './ObservableMap';

/**
 * Observable implementation of [[JW.AbstractSet]].
 *
 * @param T Collection item type.
 */
export class ObservableSet<T extends IClass> extends AbstractSet<T> {
	/**
	 * Collection length. **Don't modify manually!**
	 */
	length: Property<number>;

	/**
	 * Items are removed from set, items are added to set.
	 * Triggered in result of calling:
	 *
	 * * [[add]]
	 * * [[tryAdd]]
	 * * [[addAll]]
	 * * [[$addAll]]
	 * * [[tryAddAll]]
	 * * [[remove]]
	 * * [[tryRemove]]
	 * * [[removeItem]]
	 * * [[removeAll]]
	 * * [[$removeAll]]
	 * * [[tryRemoveAll]]
	 * * [[removeItems]]
	 * * [[splice]]
	 * * [[trySplice]]
	 * * [[performSplice]]
	 */
	spliceEvent: Event<ObservableSet.SpliceEventParams<T>> = new Event<ObservableSet.SpliceEventParams<T>>();

	/**
	 * Set is cleared. Triggered in result of calling:
	 *
	 * * [[clear]]
	 * * [[$clear]]
	 * * [[tryClear]]
	 */
	clearEvent: Event<ObservableSet.ItemsEventParams<T>> = new Event<ObservableSet.ItemsEventParams<T>>();

	/**
	 * Set is changed. Triggered right after one of events:
	 *
	 * * [[spliceEvent]]
	 * * [[clearEvent]]
	 */
	changeEvent: Event<ObservableSet.EventParams<T>> = new Event<ObservableSet.EventParams<T>>();

	/**
	 * @inheritdoc
	 */
	constructor();

	/**
	 * @inheritdoc
	 */
	constructor(items: T[]);

	/**
	 * @inheritdoc
	 */
	constructor(items: Dictionary<T>, adapter: boolean);
	constructor(items?, adapter?: boolean) {
		super(items, adapter);
		this.length = new Property<number>(this.getLength());
	}

	/**
	 * @inheritdoc
	 */
	ownItems(): ObservableSet<T> {
		super.ownItems();
		return this;
	}

	/**
	 * @inheritdoc
	 */
	protected destroyObject() {
		this.changeEvent.destroy();
		this.clearEvent.destroy();
		this.spliceEvent.destroy();
		this.length.destroy();
		super.destroyObject();
	}

	/**
	 * @inheritdoc
	 */
	$filter(callback: (item: T) => boolean, scope?: any): ISet<T> {
		return new Set<T>(this.filter(callback, scope), true);
	}

	/**
	 * @inheritdoc
	 */
	$map<U extends IClass>(callback: (item: T) => U, scope?: any): ISet<U> {
		return new Set<T>(this.map(callback, scope), true);
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
	$toSet(): ISet<T> {
		return new Set<T>(this.toSet(), true);
	}

	/**
	 * @inheritdoc
	 */
	$addAll(items: T[]): IArray<T> {
		return new Array<T>(this.addAll(items), true);
	}

	/**
	 * @inheritdoc
	 */
	$removeAll(items: T[]): IArray<T> {
		return new Array<T>(this.removeAll(items), true);
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
	tryClear(): T[] {
		var items = this._tryClear();
		if (items === undefined) {
			return;
		}
		this.length.set(0);
		this.clearEvent.trigger({ sender: this, items: items });
		this.changeEvent.trigger({ sender: this });
		if (this._ownsItems) {
			ArrayUtils.backEvery(items, destroyForcibly);
		}
		return items;
	}

	/**
	 * @inheritdoc
	 */
	trySplice(removedItems: T[], addedItems: T[]): Sets.SpliceResult<T> {
		var spliceResult = this._trySplice(removedItems, addedItems);
		if (spliceResult === undefined) {
			return;
		}
		this.length.set(this.getLength());
		this.spliceEvent.trigger({ sender: this, spliceResult: spliceResult });
		this.changeEvent.trigger({ sender: this });
		if (this._ownsItems) {
			ArrayUtils.backEvery(spliceResult.removedItems, destroyForcibly);
		}
		return spliceResult;
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
	$$toSet(): ObservableSet<T> {
		var result = new ObservableSet<any>();
		result.own(this.createLister({
			target: result
		}));
		return result;
	}

	/**
	 * @inheritdoc
	 */
	$$filter(callback: (item: T) => boolean, scope?: any): ObservableSet<T> {
		var result = new ObservableSet<T>();
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
	$$mapValues<U extends IClass>(callback: (item: T) => U, scope?: any): ObservableSet<U> {
		var result = new ObservableSet<U>();
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
	$$mapObjects<U extends IClass>(callback: (item: T) => U, scope?: any): ObservableSet<U> {
		var result = new ObservableSet<U>();
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
	createEmpty<U extends IClass>(): ObservableSet<U> {
		return new ObservableSet<U>();
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
	createEmptySet<U extends IClass>(): ObservableSet<U> {
		return new ObservableSet<U>();
	}

	/**
	 * @inheritdoc
	 */
	createMapper<U extends IClass>(config: Sets.MapperConfig<T, U>): ObservableSet.Mapper<T, U> {
		return new ObservableSet.Mapper<T, U>(this, config);
	}

	/**
	 * @inheritdoc
	 */
	createFilterer(config: Sets.FiltererConfig<T>): ObservableSet.Filterer<T> {
		return new ObservableSet.Filterer<T>(this, config);
	}

	/**
	 * @inheritdoc
	 */
	createCounter(config: Collections.CounterConfig<T>): ObservableSet.Counter<T> {
		return new ObservableSet.Counter<T>(this, config);
	}

	/**
	 * @inheritdoc
	 */
	createObserver(config: Collections.ObserverConfig<T>): ObservableSet.Observer<T> {
		return new ObservableSet.Observer<T>(this, config);
	}

	/**
	 * @inheritdoc
	 */
	createOrderer(config?: Collections.OrdererConfig<T>): ObservableSet.Orderer<T> {
		return new ObservableSet.Orderer<T>(this, config);
	}

	/**
	 * @inheritdoc
	 */
	createSorterComparing(config?: Collections.SorterComparingConfig<T>): ObservableSet.SorterComparing<T> {
		return new ObservableSet.SorterComparing<T>(this, config);
	}

	/**
	 * @inheritdoc
	 */
	createIndexer(config: Collections.IndexerConfig<T>): ObservableSet.Indexer<T> {
		return new ObservableSet.Indexer<T>(this, config);
	}

	/**
	 * @inheritdoc
	 */
	createLister(config?: Collections.ListerConfig<T>): ObservableSet.Lister<T> {
		return new ObservableSet.Lister<T>(this, config);
	}
}

export module ObservableSet {
	/**
	 * [[JW.ObservableSet]] event parameters.
	 */
	export interface EventParams<T extends IClass> {
		/**
		 * Event sender.
		 */
		sender: ObservableSet<T>;
	}

	/**
	 * Parameters of [[JW.ObservableSet]]'s [[JW.ObservableSet.spliceEvent]].
	 */
	export interface SpliceEventParams<T extends IClass> extends EventParams<T> {
		/**
		 * Result of [[splice]] method.
		 */
		spliceResult: Sets.SpliceResult<T>;
	}

	/**
	 * Parameters of [[JW.ObservableSet]]'s [[JW.ObservableSet.clearEvent]].
	 */
	export interface ItemsEventParams<T extends IClass> extends EventParams<T> {
		/**
		 * Old set contents.
		 */
		items: T[];
	}

	/**
	 * [[JW.AbstractCollection.Counter|Counter]] implementation for [[JW.ObservableSet]].
	 */
	export class Counter<T extends IClass> extends AbstractSet.Counter<T> {
		/**
		 * @inheritdoc
		 */
		constructor(source: ObservableSet<T>, config: Collections.CounterConfig<T>) {
			super(source, config);
			this.own(source.spliceEvent.bind(this._onSplice, this));
			this.own(source.clearEvent.bind(this._onClear, this));
		}

		private _onSplice(params: SpliceEventParams<T>) {
			var spliceResult = params.spliceResult;
			this.target.set(this.target.get() -
				ArrayUtils.count(spliceResult.removedItems, this._filterItem, this._scope) +
				ArrayUtils.count(spliceResult.addedItems, this._filterItem, this._scope));
		}

		private _onClear(params: ItemsEventParams<T>) {
			this.target.set(0);
		}
	}

	/**
	 * [[JW.AbstractCollection.Filterer|Filterer]] implementation for [[JW.ObservableSet]].
	 */
	export class Filterer<T extends IClass> extends AbstractSet.Filterer<T> {
		/**
		 * @inheritdoc
		 */
		constructor(source: ObservableSet<T>, config: Sets.FiltererConfig<T>) {
			super(source, config);
			this.own(source.spliceEvent.bind(this._onSplice, this));
			this.own(source.clearEvent.bind(this._onClear, this));
		}

		private _onSplice(params: SpliceEventParams<T>) {
			var spliceResult = params.spliceResult;
			this.target.trySplice(
				spliceResult.removedItems,
				ArrayUtils.filter(spliceResult.addedItems, this._filterItem, this._scope));
		}

		private _onClear(params: ItemsEventParams<T>) {
			this.target.tryRemoveAll(params.items);
		}
	}

	/**
	 * [[JW.AbstractCollection.Indexer|Indexer]] implementation for [[JW.ObservableSet]].
	 */
	export class Indexer<T extends IClass> extends AbstractSet.Indexer<T> {
		/**
		 * @inheritdoc
		 */
		constructor(source: ObservableSet<T>, config: Collections.IndexerConfig<T>) {
			super(source, config);
			this.own(source.spliceEvent.bind(this._onSplice, this));
			this.own(source.clearEvent.bind(this._onClear, this));
		}

		private _onSplice(params: SpliceEventParams<T>) {
			var spliceResult = params.spliceResult;
			this.target.trySplice(
				this._keys(spliceResult.removedItems),
				this._index(spliceResult.addedItems));
		}

		private _onClear(params: ItemsEventParams<T>) {
			this.target.tryRemoveAll(
				this._keys(params.items));
		}
	}

	/**
	 * [[JW.AbstractCollection.Lister|Lister]] implementation for [[JW.ObservableSet]].
	 */
	export class Lister<T extends IClass> extends AbstractSet.Lister<T> {
		/**
		 * @inheritdoc
		 */
		constructor(source: ObservableSet<T>, config: Collections.ListerConfig<T>) {
			super(source, config);
			this.own(source.spliceEvent.bind(this._onSplice, this));
			this.own(source.clearEvent.bind(this._onClear, this));
		}

		private _onSplice(params: SpliceEventParams<T>) {
			var spliceResult = params.spliceResult;
			this.target.trySplice(spliceResult.removedItems, spliceResult.addedItems);
		}

		private _onClear(params: ItemsEventParams<T>) {
			this.target.tryRemoveAll(params.items);
		}
	}

	/**
	 * [[JW.AbstractCollection.Mapper|Mapper]] implementation for [[JW.ObservableSet]].
	 */
	export class Mapper<T extends IClass, U extends IClass> extends AbstractSet.Mapper<T, U> {
		/**
		 * @inheritdoc
		 */
		constructor(source: ObservableSet<T>, config: Sets.MapperConfig<T, U>) {
			super(source, config);
			this.own(source.spliceEvent.bind(this._onSplice, this));
			this.own(source.clearEvent.bind(this._onClear, this));
		}

		private _onSplice(params: SpliceEventParams<T>) {
			var spliceResult = params.spliceResult;
			var removedDatas = spliceResult.removedItems;
			var addedDatas = spliceResult.addedItems;
			this.target.trySplice(this._getItems(removedDatas), this._createItems(addedDatas));
			this._destroyItems(removedDatas);
		}

		private _onClear(params: ItemsEventParams<T>) {
			var datas = params.items;
			this.target.tryRemoveAll(this._getItems(datas));
			this._destroyItems(datas);
		}
	}

	/**
	 * [[JW.AbstractCollection.Observer|Observer]] implementation for [[JW.ObservableSet]].
	 */
	export class Observer<T extends IClass> extends AbstractSet.Observer<T> {
		/**
		 * @inheritdoc
		 */
		constructor(source: ObservableSet<T>, config: Collections.ObserverConfig<T>) {
			super(source, config);
			this.own(source.spliceEvent.bind(this._onSplice, this));
			this.own(source.clearEvent.bind(this._onClear, this));
			if (this._change) {
				this.own(source.changeEvent.bind(this._onChange, this));
			}
		}

		private _onSplice(params: SpliceEventParams<T>) {
			var spliceResult = params.spliceResult;
			this._removeItems(spliceResult.removedItems);
			this._addItems(spliceResult.addedItems);
		}

		private _onClear(params: ItemsEventParams<T>) {
			this._doClearItems(params.items);
		}
	}

	/**
	 * [[JW.AbstractCollection.Orderer|Orderer]] implementation for [[JW.ObservableSet]].
	 */
	export class Orderer<T extends IClass> extends AbstractSet.Orderer<T> {
		/**
		 * @inheritdoc
		 */
		constructor(source: ObservableSet<T>, config: Collections.OrdererConfig<T>) {
			super(source, config);
			this.own(source.spliceEvent.bind(this._onSplice, this));
			this.own(source.clearEvent.bind(this._onClear, this));
		}

		private _onSplice(params: SpliceEventParams<T>) {
			var spliceResult = params.spliceResult;
			this._splice(
				ArrayUtils.toSet(spliceResult.removedItems),
				ArrayUtils.toSet(spliceResult.addedItems));
		}

		private _onClear(params: ItemsEventParams<T>) {
			this.target.removeItems(params.items);
		}
	}

	/**
	 * [[JW.AbstractCollection.SorterComparing|SorterComparing]] implementation for [[JW.ObservableSet]].
	 */
	export class SorterComparing<T extends Class> extends AbstractSet.SorterComparing<T> {
		/**
		 * @inheritdoc
		 */
		constructor(source: ObservableSet<T>, config: Collections.SorterComparingConfig<T>) {
			super(source, config);
			this.own(source.spliceEvent.bind(this._onSplice, this));
			this.own(source.clearEvent.bind(this._onClear, this));
		}

		private _onSplice(params: SpliceEventParams<T>) {
			var spliceResult = params.spliceResult;
			this._splice(spliceResult.removedItems, spliceResult.addedItems);
		}

		private _onClear(params: ItemsEventParams<T>) {
			this._splice(params.items, []);
		}
	}
}
