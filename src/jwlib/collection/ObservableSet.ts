import {destroyForcibly, Dictionary} from '../core/Core';
import {Class} from '../core/Class';
import {Event} from '../core/Event';
import {Property} from '../property/Property';
import {AbstractCollection} from './AbstractCollection';
import {AbstractSet} from './AbstractSet';
import {Array} from './Array';
import {ObservableArray} from './ObservableArray';
import {ObservableMap} from './ObservableMap';

/**
 * Observable implementation of [[JW.AbstractSet]].
 *
 * @param T Collection item type.
 */
export class ObservableSet<T extends Class> extends AbstractSet<T> {
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
	tryClear(): T[] {
		var items = this._tryClear();
		if (items === undefined) {
			return;
		}
		this.length.set(0);
		this.clearEvent.trigger({ sender: this, items: items });
		this.changeEvent.trigger({ sender: this });
		if (this._ownsItems) {
			Array.backEvery(items, destroyForcibly);
		}
		return items;
	}

	/**
	 * @inheritdoc
	 */
	trySplice(removedItems: T[], addedItems: T[]): AbstractSet.SpliceResult<T> {
		var spliceResult = this._trySplice(removedItems, addedItems);
		if (spliceResult === undefined) {
			return;
		}
		this.length.set(this.getLength());
		this.spliceEvent.trigger({ sender: this, spliceResult: spliceResult });
		this.changeEvent.trigger({ sender: this });
		if (this._ownsItems) {
			Array.backEvery(spliceResult.removedItems, destroyForcibly);
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
	$$mapValues<U extends Class>(callback: (item: T) => U, scope?: any): ObservableSet<U> {
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
	$$mapObjects<U extends Class>(callback: (item: T) => U, scope?: any): ObservableSet<U> {
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
	createEmpty<U extends Class>(): ObservableSet<U> {
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
	createEmptySet<U extends Class>(): ObservableSet<U> {
		return new ObservableSet<U>();
	}

	/**
	 * @inheritdoc
	 */
	createMapper<U extends Class>(config: AbstractSet.Mapper.Config<T, U>): ObservableSet.Mapper<T, U> {
		return new ObservableSet.Mapper<T, U>(this, config);
	}

	/**
	 * @inheritdoc
	 */
	createFilterer(config: AbstractSet.Filterer.Config<T>): ObservableSet.Filterer<T> {
		return new ObservableSet.Filterer<T>(this, config);
	}

	/**
	 * @inheritdoc
	 */
	createCounter(config: AbstractCollection.Counter.Config<T>): ObservableSet.Counter<T> {
		return new ObservableSet.Counter<T>(this, config);
	}

	/**
	 * @inheritdoc
	 */
	createObserver(config: AbstractCollection.Observer.Config<T>): ObservableSet.Observer<T> {
		return new ObservableSet.Observer<T>(this, config);
	}

	/**
	 * @inheritdoc
	 */
	createOrderer(config?: AbstractCollection.Orderer.Config<T>): ObservableSet.Orderer<T> {
		return new ObservableSet.Orderer<T>(this, config);
	}

	/**
	 * @inheritdoc
	 */
	createSorterComparing(config?: AbstractCollection.SorterComparing.Config<T>): ObservableSet.SorterComparing<T> {
		return new ObservableSet.SorterComparing<T>(this, config);
	}

	/**
	 * @inheritdoc
	 */
	createIndexer(config: AbstractCollection.Indexer.Config<T>): ObservableSet.Indexer<T> {
		return new ObservableSet.Indexer<T>(this, config);
	}

	/**
	 * @inheritdoc
	 */
	createLister(config?: AbstractCollection.Lister.Config<T>): ObservableSet.Lister<T> {
		return new ObservableSet.Lister<T>(this, config);
	}
}

export module ObservableSet {
	/**
	 * [[JW.ObservableSet]] event parameters.
	 */
	export interface EventParams<T extends Class> {
		/**
		 * Event sender.
		 */
		sender: ObservableSet<T>;
	}

	/**
	 * Parameters of [[JW.ObservableSet]]'s [[JW.ObservableSet.spliceEvent]].
	 */
	export interface SpliceEventParams<T extends Class> extends EventParams<T> {
		/**
		 * Result of [[splice]] method.
		 */
		spliceResult: AbstractSet.SpliceResult<T>;
	}

	/**
	 * Parameters of [[JW.ObservableSet]]'s [[JW.ObservableSet.clearEvent]].
	 */
	export interface ItemsEventParams<T extends Class> extends EventParams<T> {
		/**
		 * Old set contents.
		 */
		items: T[];
	}

	/**
	 * [[JW.AbstractCollection.Counter|Counter]] implementation for [[JW.ObservableSet]].
	 */
	export class Counter<T extends Class> extends AbstractSet.Counter<T> {
		/**
		 * @inheritdoc
		 */
		constructor(source: ObservableSet<T>, config: AbstractCollection.Counter.Config<T>) {
			super(source, config);
			this.own(source.spliceEvent.bind(this._onSplice, this));
			this.own(source.clearEvent.bind(this._onClear, this));
		}

		private _onSplice(params: SpliceEventParams<T>) {
			var spliceResult = params.spliceResult;
			this.target.set(this.target.get() -
				Array.count(spliceResult.removedItems, this._filterItem, this._scope) +
				Array.count(spliceResult.addedItems, this._filterItem, this._scope));
		}

		private _onClear(params: ItemsEventParams<T>) {
			this.target.set(0);
		}
	}

	/**
	 * [[JW.AbstractCollection.Filterer|Filterer]] implementation for [[JW.ObservableSet]].
	 */
	export class Filterer<T extends Class> extends AbstractSet.Filterer<T> {
		/**
		 * @inheritdoc
		 */
		constructor(source: ObservableSet<T>, config: AbstractSet.Filterer.Config<T>) {
			super(source, config);
			this.own(source.spliceEvent.bind(this._onSplice, this));
			this.own(source.clearEvent.bind(this._onClear, this));
		}

		private _onSplice(params: SpliceEventParams<T>) {
			var spliceResult = params.spliceResult;
			this.target.trySplice(
				spliceResult.removedItems,
				Array.filter(spliceResult.addedItems, this._filterItem, this._scope));
		}

		private _onClear(params: ItemsEventParams<T>) {
			this.target.tryRemoveAll(params.items);
		}
	}

	/**
	 * [[JW.AbstractCollection.Indexer|Indexer]] implementation for [[JW.ObservableSet]].
	 */
	export class Indexer<T extends Class> extends AbstractSet.Indexer<T> {
		/**
		 * @inheritdoc
		 */
		constructor(source: ObservableSet<T>, config: AbstractCollection.Indexer.Config<T>) {
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
	export class Lister<T extends Class> extends AbstractSet.Lister<T> {
		/**
		 * @inheritdoc
		 */
		constructor(source: ObservableSet<T>, config: AbstractCollection.Lister.Config<T>) {
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
	export class Mapper<T extends Class, U extends Class> extends AbstractSet.Mapper<T, U> {
		/**
		 * @inheritdoc
		 */
		constructor(source: ObservableSet<T>, config: AbstractSet.Mapper.Config<T, U>) {
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
	export class Observer<T extends Class> extends AbstractSet.Observer<T> {
		/**
		 * @inheritdoc
		 */
		constructor(source: ObservableSet<T>, config: AbstractCollection.Observer.Config<T>) {
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
	export class Orderer<T extends Class> extends AbstractSet.Orderer<T> {
		/**
		 * @inheritdoc
		 */
		constructor(source: ObservableSet<T>, config: AbstractCollection.Orderer.Config<T>) {
			super(source, config);
			this.own(source.spliceEvent.bind(this._onSplice, this));
			this.own(source.clearEvent.bind(this._onClear, this));
		}

		private _onSplice(params: SpliceEventParams<T>) {
			var spliceResult = params.spliceResult;
			this._splice(
				Array.toSet(spliceResult.removedItems),
				Array.toSet(spliceResult.addedItems));
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
		constructor(source: ObservableSet<T>, config: AbstractCollection.SorterComparing.Config<T>) {
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
