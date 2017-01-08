import {destroy} from './Core';
import AbstractSet from './AbstractSet';
import Dictionary from './Dictionary';
import Event from './Event';
import IArray from './IArray';
import IClass from './IClass';
import IMap from './IMap';
import ISet from './ISet';
import ISetSpliceResult from './ISetSpliceResult';
import JWArray from './JWArray';
import JWMap from './JWMap';
import JWSet from './JWSet';
import ObservableArray from './ObservableArray';
import ObservableMap from './ObservableMap';
import Property from './Property';
import * as ArrayUtils from './ArrayUtils';

/**
 * Observable implementation of [[JW.AbstractSet]].
 *
 * @param T Collection item type.
 */
export default class ObservableSet<T extends IClass> extends AbstractSet<T> {
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
	spliceEvent: Event<SpliceEventParams<T>> = new Event<SpliceEventParams<T>>();

	/**
	 * Set is cleared. Triggered in result of calling:
	 *
	 * * [[clear]]
	 * * [[$clear]]
	 * * [[tryClear]]
	 */
	clearEvent: Event<ItemsEventParams<T>> = new Event<ItemsEventParams<T>>();

	/**
	 * Set is changed. Triggered right after one of events:
	 *
	 * * [[spliceEvent]]
	 * * [[clearEvent]]
	 */
	changeEvent: Event<EventParams<T>> = new Event<EventParams<T>>();

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
	constructor(items?: any, adapter?: boolean) {
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
		return new JWSet<T>(this.filter(callback, scope), true);
	}

	/**
	 * @inheritdoc
	 */
	$map<U extends IClass>(callback: (item: T) => U, scope?: any): ISet<U> {
		return new JWSet<U>(this.map(callback, scope), true);
	}

	/**
	 * @inheritdoc
	 */
	$toSorted(callback?: (item: T) => any, scope?: any, order?: number): IArray<T> {
		return new JWArray<T>(this.toSorted(callback, scope, order), true);
	}

	/**
	 * @inheritdoc
	 */
	$toSortedComparing(compare?: (t1: T, t2: T) => number, scope?: any, order?: number): IArray<T> {
		return new JWArray<T>(this.toSortedComparing(compare, scope, order), true);
	}

	/**
	 * @inheritdoc
	 */
	$index(callback: (item: T) => string, scope?: any): IMap<T> {
		return new JWMap<T>(this.index(callback, scope), true);
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
	$asArray(): IArray<T> {
		return new JWArray<T>(this.asArray(), true);
	}

	/**
	 * @inheritdoc
	 */
	$toSet(): ISet<T> {
		return new JWSet<T>(this.toSet(), true);
	}

	/**
	 * @inheritdoc
	 */
	$addAll(items: T[]): IArray<T> {
		return new JWArray<T>(this.addAll(items), true);
	}

	/**
	 * @inheritdoc
	 */
	$removeAll(items: T[]): IArray<T> {
		return new JWArray<T>(this.removeAll(items), true);
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
		var items = this._tryClear();
		if (items === undefined) {
			return undefined;
		}
		this.length.set(0);
		this.clearEvent.trigger({ sender: this, items: items });
		this.changeEvent.trigger({ sender: this });
		if (this._ownsItems) {
			ArrayUtils.backEvery(items, destroy);
		}
		return items;
	}

	/**
	 * @inheritdoc
	 */
	trySplice(removedItems: T[], addedItems: T[]): ISetSpliceResult<T> {
		var spliceResult = this._trySplice(removedItems, addedItems);
		if (spliceResult === undefined) {
			return undefined;
		}
		this.length.set(this.getLength());
		this.spliceEvent.trigger({ sender: this, spliceResult: spliceResult });
		this.changeEvent.trigger({ sender: this });
		if (this._ownsItems) {
			ArrayUtils.backEvery(spliceResult.removedItems, destroy);
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
	spliceResult: ISetSpliceResult<T>;
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
