import {array} from '../core/globals';
import {destroy, destroyForcibly, Dictionary, Proxy} from '../core/Core';
import {Class} from '../core/Class';
import {Destroyable} from '../core/Destroyable';
import {Event} from '../core/Event';
import {Property} from '../property/Property';
import {AbstractCollection} from './AbstractCollection';
import {AbstractArray} from './AbstractArray';
import {Array} from './Array';
import {ObservableMap} from './ObservableMap';
import {ObservableSet} from './ObservableSet';

/**
 * Observable implementation of [[JW.AbstractArray]].
 *
 * @param T Collection item type.
 */
export class ObservableArray<T> extends AbstractArray<T> {
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
	spliceEvent: Event<ObservableArray.SpliceEventParams<T>> = new Event<ObservableArray.SpliceEventParams<T>>();

	/**
	 * Item is replaced in array. Triggered in result of calling:
	 *
	 * * [[set]]
	 * * [[trySet]]
	 */
	replaceEvent: Event<ObservableArray.ReplaceEventParams<T>> = new Event<ObservableArray.ReplaceEventParams<T>>();

	/**
	 * Item is moved in array. Triggered in result of calling:
	 *
	 * * [[move]]
	 * * [[tryMove]]
	 */
	moveEvent: Event<ObservableArray.MoveEventParams<T>> = new Event<ObservableArray.MoveEventParams<T>>();

	/**
	 * Array is cleared. Triggered in result of calling:
	 * * [[clear]]
	 * * [[$clear]]
	 * * [[tryClear]]
	 */
	clearEvent: Event<ObservableArray.ItemsEventParams<T>> = new Event<ObservableArray.ItemsEventParams<T>>();

	/**
	 * Items are reordered in array. Triggered in result of calling:
	 *
	 * * [[reorder]]
	 * * [[tryReorder]]
	 * * [[performReorder]]
	 * * [[sort]]
	 * * [[sortComparing]]
	 */
	reorderEvent: Event<ObservableArray.ReorderEventParams<T>> = new Event<ObservableArray.ReorderEventParams<T>>();

	/**
	 * Array is changed. Triggered right after one of events:
	 *
	 * * [[spliceEvent]]
	 * * [[replaceEvent]]
	 * * [[moveEvent]]
	 * * [[clearEvent]]
	 * * [[reorderEvent]]
	 */
	changeEvent: Event<ObservableArray.EventParams<T>> = new Event<ObservableArray.EventParams<T>>();

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
	trySet(item: T, index: number): Proxy<T> {
		var oldItem = Array.trySet(this.items, item, index);
		if (oldItem === undefined) {
			return;
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
		var item = super.tryMove(fromIndex, toIndex);
		if (item === undefined) {
			return;
		}
		this.moveEvent.trigger({ sender: this, fromIndex: fromIndex, toIndex: toIndex, item: item });
		this.changeEvent.trigger({ sender: this });
		return item;
	}

	/**
	 * @inheritdoc
	 */
	tryClear(): T[] {
		var oldItems = Array.tryClear(this.items);
		if (oldItems === undefined) {
			return;
		}
		this.length.set(0);
		this.clearEvent.trigger({ sender: this, items: oldItems });
		this.changeEvent.trigger({ sender: this });
		if (this._ownsItems) {
			Array.backEvery(oldItems, destroyForcibly);
		}
		return oldItems;
	}

	/**
	 * @inheritdoc
	 */
	trySplice(removeParamsList: AbstractArray.IndexCount[], addParamsList: AbstractArray.IndexItems<T>[]): AbstractArray.SpliceResult<T> {
		var result = Array.trySplice(this.items, removeParamsList, addParamsList);
		if (result === undefined) {
			return;
		}
		this.length.set(this.getLength());
		this.spliceEvent.trigger({ sender: this, spliceResult: result });
		this.changeEvent.trigger({ sender: this });
		if (this._ownsItems) {
			Array.backEvery(result.getRemovedItems(), destroyForcibly);
		}
		return result;
	}

	/**
	 * @inheritdoc
	 */
	tryReorder(indexArray: number[]): T[] {
		var items = super.tryReorder(indexArray);
		if (items === undefined) {
			return;
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
		var indices = array<number>(length);
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
	createMapper<U>(config: AbstractArray.Mapper.Config<T, U>): ObservableArray.Mapper<T, U> {
		return new ObservableArray.Mapper<T, U>(this, config);
	}

	/**
	 * @inheritdoc
	 */
	createFilterer(config: AbstractArray.Filterer.Config<T>): ObservableArray.Filterer<T> {
		return new ObservableArray.Filterer<T>(this, config);
	}

	/**
	 * @inheritdoc
	 */
	createCounter(config: AbstractCollection.Counter.Config<T>): ObservableArray.Counter<T> {
		return new ObservableArray.Counter<T>(this, config);
	}

	/**
	 * @inheritdoc
	 */
	createObserver(config: AbstractCollection.Observer.Config<T>): ObservableArray.Observer<T> {
		return new ObservableArray.Observer<T>(this, config);
	}

	/**
	 * @inheritdoc
	 */
	createOrderer(config?: AbstractCollection.Orderer.Config<any>): ObservableArray.Orderer<any> {
		return new ObservableArray.Orderer<any>(this, config);
	}

	/**
	 * @inheritdoc
	 */
	createSorterComparing(config?: AbstractCollection.SorterComparing.Config<T>): ObservableArray.SorterComparing<T> {
		return new ObservableArray.SorterComparing<T>(this, config);
	}

	/**
	 * @inheritdoc
	 */
	createIndexer(config: AbstractCollection.Indexer.Config<T>): ObservableArray.Indexer<T> {
		return new ObservableArray.Indexer<T>(this, config);
	}

	/**
	 * @inheritdoc
	 */
	createLister(config?: AbstractCollection.Lister.Config<any>): ObservableArray.Lister<any> {
		return new ObservableArray.Lister<any>(this, config);
	}

	/**
	 * @inheritdoc
	 */
	createInserter(config: AbstractArray.Inserter.Config<T>): ObservableArray.Inserter<T> {
		return new ObservableArray.Inserter<T>(this, config);
	}

	/**
	 * @inheritdoc
	 */
	createMerger<U>(config?: AbstractArray.Merger.Config<U>): ObservableArray.Merger<U> {
		return new ObservableArray.Merger<U>(<ObservableArray<any>>this, config);
	}

	// type definition in argument breaks compiler for some reason
	/**
	 * @inheritdoc
	 */
	createMergerBunch(merger: any): Class {
		return new ObservableArray.Merger.Bunch<T>(merger, this);
	}

	/**
	 * @inheritdoc
	 */
	createReverser(config?: AbstractArray.Reverser.Config<T>): ObservableArray.Reverser<T> {
		return new ObservableArray.Reverser<T>(this, config);
	}

	/**
	 * @hidden
	 */
	_createMergerTarget<T>(): ObservableArray<T> {
		return new ObservableArray<T>();
	}
}

export module ObservableArray {
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
		spliceResult: AbstractArray.SpliceResult<T>;
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

	/**
	 * [[JW.AbstractCollection.Counter|Counter]] implementation for [[JW.ObservableArray]].
	 */
	export class Counter<T> extends AbstractArray.Counter<T> {
		/**
		 * @inheritdoc
		 */
		constructor(source: ObservableArray<T>, config: AbstractCollection.Counter.Config<T>) {
			super(source, config);
			this.own(source.spliceEvent.bind(this._onSplice, this));
			this.own(source.replaceEvent.bind(this._onReplace, this));
			this.own(source.clearEvent.bind(this._onClear, this));
		}

		private _onSplice(params: SpliceEventParams<T>) {
			var spliceResult = params.spliceResult;
			var value = this.target.get();
			Array.every(spliceResult.removedItemsList, (indexItems) => {
				value -= Array.count(indexItems.items, this._filterItem, this._scope);
				return true;
			});
			Array.every(spliceResult.addedItemsList, (indexItems) => {
				value += Array.count(indexItems.items, this._filterItem, this._scope);
				return true;
			});
			this.target.set(value);
		}

		private _onReplace(params: ReplaceEventParams<T>) {
			var oldFiltered = this._filterItem.call(this._scope, params.oldItem) !== false;
			var newFiltered = this._filterItem.call(this._scope, params.newItem) !== false;
			if (oldFiltered && !newFiltered) {
				this.target.set(this.target.get() - 1);
			} else if (!oldFiltered && newFiltered) {
				this.target.set(this.target.get() + 1);
			}
		}

		private _onClear(params: ItemsEventParams<T>) {
			this.target.set(0);
		}
	}

	/**
	 * [[JW.AbstractCollection.Filterer|Filterer]] implementation for [[JW.ObservableArray]].
	 */
	export class Filterer<T> extends AbstractArray.Filterer<T> {
		/**
		 * @inheritdoc
		 */
		constructor(source: ObservableArray<T>, config: AbstractArray.Filterer.Config<T>) {
			super(source, config);
			this.own(source.spliceEvent.bind(this._onSplice, this));
			this.own(source.replaceEvent.bind(this._onReplace, this));
			this.own(source.moveEvent.bind(this._onMove, this));
			this.own(source.clearEvent.bind(this._onClear, this));
			this.own(source.reorderEvent.bind(this._onReorder, this));
		}

		private _onSplice(params: SpliceEventParams<T>) {
			var spliceResult = params.spliceResult;
			this._splice(spliceResult.removedItemsList, spliceResult.addedItemsList);
		}

		private _onReplace(params: ReplaceEventParams<T>) {
			var oldFiltered = this._filtered[params.index] !== 0;
			var newFiltered = this._filterItem.call(this._scope, params.newItem) !== false;
			if (!oldFiltered && !newFiltered) {
				return;
			}
			var index = this._countFiltered(0, params.index);
			this._filtered[params.index] = newFiltered ? 1 : 0;
			if (!newFiltered) {
				this.target.tryRemove(index);
			} else if (!oldFiltered) {
				this.target.tryAdd(params.newItem, index);
			} else {
				this.target.trySet(params.newItem, index);
			}
		}

		private _onMove(params: MoveEventParams<T>) {
			if (this._filtered[params.fromIndex] !== 0) {
				var fromIndex: number, toIndex: number;
				if (params.fromIndex < params.toIndex) {
					fromIndex = this._countFiltered(0, params.fromIndex);
					toIndex = fromIndex + this._countFiltered(params.fromIndex + 1, params.toIndex - params.fromIndex);
				} else {
					toIndex = this._countFiltered(0, params.toIndex);
					fromIndex = toIndex + this._countFiltered(params.toIndex, params.fromIndex - params.toIndex);
				}
				this.target.tryMove(fromIndex, toIndex);
			}
			Array.tryMove(this._filtered, params.fromIndex, params.toIndex);
		}

		private _onClear(params: ItemsEventParams<T>) {
			this.target.tryClear();
		}

		private _onReorder(params: ReorderEventParams<T>) {
			var targetIndex = 0;
			var targetIndexWhichMovesToI: Dictionary<number> = {};
			for (var sourceIndex = 0, l = this._filtered.length; sourceIndex < l; ++sourceIndex) {
				if (this._filtered[sourceIndex] !== 0) {
					targetIndexWhichMovesToI[params.indexArray[sourceIndex]] = targetIndex++;
				}
			}
			Array.tryReorder(this._filtered, params.indexArray);

			var targetIndex = 0;
			var indexes = array<number>(this.target.getLength());
			for (var sourceIndex = 0, l = this._filtered.length; sourceIndex < l; ++sourceIndex) {
				if (this._filtered[sourceIndex] !== 0) {
					indexes[targetIndexWhichMovesToI[sourceIndex]] = targetIndex++;
				}
			}

			this.target.tryReorder(indexes);
		}
	}

	/**
	 * [[JW.AbstractCollection.Indexer|Indexer]] implementation for [[JW.ObservableArray]].
	 */
	export class Indexer<T> extends AbstractArray.Indexer<T> {
		/**
		 * @inheritdoc
		 */
		constructor(source: ObservableArray<T>, config: AbstractCollection.Indexer.Config<T>) {
			super(source, config);
			this.own(source.spliceEvent.bind(this._onSplice, this));
			this.own(source.replaceEvent.bind(this._onReplace, this));
			this.own(source.clearEvent.bind(this._onClear, this));
		}

		private _onSplice(params: SpliceEventParams<T>) {
			var spliceResult = params.spliceResult;
			this.target.trySplice(
				this._keys(spliceResult.getRemovedItems()),
				this._index(spliceResult.getAddedItems()));
		}

		private _onReplace(params: ReplaceEventParams<T>) {
			this.target.trySplice(
				this._keys([params.oldItem]),
				this._index([params.newItem]));
		}

		private _onClear(params: ItemsEventParams<T>) {
			this.target.tryRemoveAll(
				this._keys(params.items));
		}
	}

	/**
	 * [[JW.AbstractArray.Inserter|Inserter]] implementation for [[JW.ObservableArray]].
	 */
	export class Inserter<T> extends AbstractArray.Inserter<T> {
		/**
		 * @inheritdoc
		 */
		constructor(source: ObservableArray<T>, config?: AbstractArray.Inserter.Config<T>) {
			super(source, config);
			this.own(source.spliceEvent.bind(this._onSplice, this));
			this.own(source.replaceEvent.bind(this._onReplace, this));
			this.own(source.moveEvent.bind(this._onMove, this));
			this.own(source.clearEvent.bind(this._onClear, this));
			this.own(source.reorderEvent.bind(this._onReorder, this));
		}

		private _onSplice(params: SpliceEventParams<T>) {
			var spliceResult = params.spliceResult;
			var oldItems = spliceResult.oldItems;
			var removedItems = spliceResult.getRemovedItems();

			// if there is an effective clearing function, just reset the controller
			if (this._clearItems && (3 * removedItems.length > 2 * oldItems.length)) {
				this._clearItems.call(this._scope, oldItems);
				this._addItems(this.source.getItems(), 0);
				return;
			}

			// else, splice the elements
			var removedItemsList = spliceResult.removedItemsList;
			var addedItemsList = spliceResult.addedItemsList;
			for (var i = removedItemsList.length - 1; i >= 0; --i) {
				var removeRarams = removedItemsList[i];
				this._removeItems(removeRarams.items, removeRarams.index);
			}
			for (var i = 0, l = addedItemsList.length; i < l; ++i) {
				var addParams = addedItemsList[i];
				this._addItems(addParams.items, addParams.index);
			}
		}

		private _onReplace(params: ReplaceEventParams<T>) {
			if (this._removeItem) {
				this._removeItem.call(this._scope, params.oldItem, params.index);
			}
			if (this._addItem) {
				this._addItem.call(this._scope, params.newItem, params.index);
			}
		}

		private _onMove(params: MoveEventParams<T>) {
			if (this._removeItem) {
				this._removeItem.call(this._scope, params.item, params.fromIndex);
			}
			if (this._addItem) {
				this._addItem.call(this._scope, params.item, params.toIndex);
			}
		}

		private _onClear(params: ItemsEventParams<T>) {
			this._doClearItems(params.items);
		}

		private _onReorder(params: ReorderEventParams<T>) {
			this._doClearItems(params.items);
			this._addItems(this.source.getItems(), 0);
		}
	}

	/**
	 * [[JW.AbstractCollection.Lister|Lister]] implementation for [[JW.ObservableArray]].
	 */
	export class Lister<T extends Class> extends AbstractArray.Lister<T> {
		/**
		 * @inheritdoc
		 */
		constructor(source: ObservableArray<T>, config: AbstractCollection.Lister.Config<T>) {
			super(source, config);
			this.own(source.spliceEvent.bind(this._onSplice, this));
			this.own(source.replaceEvent.bind(this._onReplace, this));
			this.own(source.clearEvent.bind(this._onClear, this));
		}

		private _onSplice(params: SpliceEventParams<T>) {
			var spliceResult = params.spliceResult;
			this.target.trySplice(spliceResult.getRemovedItems(), spliceResult.getAddedItems());
		}

		private _onReplace(params: ReplaceEventParams<T>) {
			this.target.trySplice([params.oldItem], [params.newItem]);
		}

		private _onClear(params: ItemsEventParams<T>) {
			this.target.tryRemoveAll(params.items);
		}
	}

	/**
	 * [[JW.AbstractCollection.Mapper|Mapper]] implementation for [[JW.ObservableArray]].
	 */
	export class Mapper<T, U> extends AbstractArray.Mapper<T, U> {
		/**
		 * @inheritdoc
		 */
		constructor(source: ObservableArray<T>, config: AbstractArray.Mapper.Config<T, U>) {
			super(source, config);
			this.own(source.spliceEvent.bind(this._onSplice, this));
			this.own(source.replaceEvent.bind(this._onReplace, this));
			this.own(source.moveEvent.bind(this._onMove, this));
			this.own(source.clearEvent.bind(this._onClear, this));
			this.own(source.reorderEvent.bind(this._onReorder, this));
		}

		private _onSplice(params: SpliceEventParams<T>) {
			var sourceResult = params.spliceResult;
			var sourceAddedItemsList = sourceResult.addedItemsList;
			var targetAddParamsList: AbstractArray.IndexItems<U>[] = [];
			for (var i = 0, l = sourceAddedItemsList.length; i < l; ++i) {
				var addParams = sourceAddedItemsList[i];
				targetAddParamsList.push(new AbstractArray.IndexItems(
					addParams.index, this._createItems(addParams.items)));
			}
			var targetResult = this.target.trySplice(sourceResult.getRemoveParamsList(), targetAddParamsList);
			var sourceRemovedItemsList = sourceResult.removedItemsList;
			var targetRemovedItemsList = targetResult.removedItemsList;
			for (var i = targetRemovedItemsList.length - 1; i >= 0; --i) {
				this._destroyItems(targetRemovedItemsList[i].items, sourceRemovedItemsList[i].items);
			}
		}

		private _onReplace(params: ReplaceEventParams<T>) {
			var newItem = this._createItem.call(this._scope, params.newItem);
			var oldItem = this.target.trySet(newItem, params.index).value;
			this._destroyItem.call(this._scope, oldItem, params.oldItem);
		}

		private _onMove(params: MoveEventParams<T>) {
			this.target.tryMove(params.fromIndex, params.toIndex);
		}

		private _onClear(params: ItemsEventParams<T>) {
			this._destroyItems(this.target.tryClear(), params.items);
		}

		private _onReorder(params: ReorderEventParams<T>) {
			this.target.tryReorder(params.indexArray);
		}
	}

	/**
	 * [[JW.AbstractArray.Merger|Merger]] implementation for [[JW.ObservableArray]].
	 */
	export class Merger<T> extends AbstractArray.Merger<T> {
		/**
		 * @inheritdoc
		 */
		constructor(source: ObservableArray<AbstractArray<T>>, config?: AbstractArray.Merger.Config<T>) {
			super(source, config);
			this.own(source.spliceEvent.bind(this._onSplice, this));
			this.own(source.replaceEvent.bind(this._onReplace, this));
			this.own(source.moveEvent.bind(this._onMove, this));
			this.own(source.clearEvent.bind(this._onClear, this));
			this.own(source.reorderEvent.bind(this._onReorder, this));
		}

		private _getIndexes(bunches: AbstractArray<T>[]): number[] {
			var currentIndex = 0;
			var indexes = Array.map(bunches, function (bunch) {
				var index = currentIndex;
				currentIndex += bunch.getLength();
				return index;
			}, this);
			indexes.push(currentIndex);
			return indexes;
		}

		private _onSplice(params: SpliceEventParams<AbstractArray<T>>) {
			var spliceResult = params.spliceResult;
			var indexes = this._getIndexes(spliceResult.oldItems);
			var removeParamsList = Array.map(spliceResult.removedItemsList, (indexItems) => {
				return new AbstractArray.IndexCount(indexes[indexItems.index], this._count(indexItems.items));
			}, this);
			Array.backEvery(spliceResult.removedItemsList, (indexItems) => {
				indexes.splice(indexItems.index, indexItems.items.length);
				var count = this._count(indexItems.items);
				for (var i = indexItems.index; i < indexes.length; ++i) {
					indexes[i] -= count;
				}
				return true;
			}, this);
			var addParamsList = Array.map(spliceResult.addedItemsList, (indexItems) => {
				return new AbstractArray.IndexItems<T>(indexes[indexItems.index], this._merge(indexItems.items));
			}, this);
			this.target.trySplice(removeParamsList, addParamsList);
		}

		private _onReplace(params: ReplaceEventParams<AbstractArray<T>>) {
			var index = this._count(this.source.getItems(), 0, params.index);
			this.target.trySplice(
				[new AbstractArray.IndexCount(index, params.oldItem.getLength())],
				[new AbstractArray.IndexItems<T>(index, params.newItem.getItems())]);
		}

		private _onMove(params: MoveEventParams<AbstractArray<T>>) {
			var count = params.item.getLength();
			var indexes = array<number>(this.target.getLength());
			var currentIndex = 0;

			function shiftBunch(bunchLength, shift) {
				for (var j = 0; j < bunchLength; ++j) {
					indexes[currentIndex] = currentIndex + shift;
					++currentIndex;
				}
			}

			for (var i = 0, l = Math.min(params.fromIndex, params.toIndex); i < l; ++i) {
				shiftBunch(this.source.get(i).getLength(), 0);
			}
			if (params.fromIndex <= params.toIndex) {
				// [1], [2], [3], [4], [5]		[2] move to 3
				// [1], [3], [4], [2], [5]
				shiftBunch(count, this._count(this.source.getItems(), params.fromIndex, params.toIndex - params.fromIndex));
				for (var i = params.fromIndex; i < params.toIndex; ++i) {
					shiftBunch(this.source.get(i).getLength(), -count);
				}
			} else {
				// [1], [2], [3], [4], [5]		[4] move to 1
				// [1], [4], [2], [3], [5]
				for (var i = params.toIndex + 1; i <= params.fromIndex; ++i) {
					shiftBunch(this.source.get(i).getLength(), count);
				}
				shiftBunch(count, -this._count(this.source.getItems(), params.toIndex + 1, params.fromIndex - params.toIndex));
			}
			for (var i = Math.max(params.fromIndex, params.toIndex) + 1, l = this.source.getLength(); i < l; ++i) {
				shiftBunch(this.source.get(i).getLength(), 0);
			}

			this.target.tryReorder(indexes);
		}

		private _onClear(params: ItemsEventParams<AbstractArray<T>>) {
			this.target.tryClear();
		}

		private _onReorder(params: ReorderEventParams<AbstractArray<T>>) {
			var oldIndexes = this._getIndexes(params.items);
			var newIndexes = this._getIndexes(this.source.getItems());
			var indexes = array<number>(this.target.getLength());
			for (var i = 0, l = params.items.length; i < l; ++i) {
				var bunch = params.items[i];
				var oldIndex = oldIndexes[i];
				var newIndex = newIndexes[params.indexArray[i]];
				for (var j = 0, m = bunch.getLength(); j < m; ++j) {
					indexes[oldIndex + j] = newIndex + j;
				}
			}
			this.target.tryReorder(indexes);
		}
	}

	/**
	 * @hidden
	 */
	export module Merger {
		export class Bunch<T> extends Class {
			private source: AbstractArray<AbstractArray<T>>;
			private target: AbstractArray<T>;
			private bunch: ObservableArray<T>;

			constructor(merger: Merger<T>, bunch: ObservableArray<T>) {
				super();
				this.source = merger.source;
				this.target = merger.target;
				this.bunch = bunch;
				this.own(bunch.spliceEvent.bind(this._onSplice, this));
				this.own(bunch.replaceEvent.bind(this._onReplace, this));
				this.own(bunch.moveEvent.bind(this._onMove, this));
				this.own(bunch.clearEvent.bind(this._onClear, this));
				this.own(bunch.reorderEvent.bind(this._onReorder, this));
			}

			private _getIndex(): number {
				var bunches = this.source.getItems();
				var index = 0;
				for (var i = 0, l = bunches.length; i < l; ++i) {
					var bunch = bunches[i];
					if (bunch === this.bunch) {
						return index;
					}
					index += bunch.getLength();
				}
				console.warn("JW.ObservableArray.Merger object is corrupted");
				return 0;
			}

			private _onSplice(params: SpliceEventParams<T>) {
				var spliceResult = params.spliceResult;
				var index = this._getIndex();
				var removeParamsList = Array.map(spliceResult.removedItemsList, (indexItems) => {
					return new AbstractArray.IndexCount(indexItems.index + index, indexItems.items.length);
				});
				var addParamsList = Array.map(spliceResult.addedItemsList, (indexItems) => {
					return new AbstractArray.IndexItems<T>(indexItems.index + index, indexItems.items.concat());
				});
				this.target.trySplice(removeParamsList, addParamsList);
			}

			private _onReplace(params: ReplaceEventParams<T>) {
				this.target.trySet(params.newItem, this._getIndex() + params.index);
			}

			private _onMove(params: MoveEventParams<T>) {
				var index = this._getIndex();
				this.target.tryMove(index + params.fromIndex, index + params.toIndex);
			}

			private _onClear(params: ItemsEventParams<T>) {
				this.target.tryRemoveAll(this._getIndex(), params.items.length);
			}

			private _onReorder(params: ReorderEventParams<T>) {
				var index = this._getIndex();
				var bunchIndexArray = params.indexArray;
				var bunchLength = bunchIndexArray.length;
				var targetLength = this.target.getLength();
				var targetIndexArray = array<number>(targetLength);
				for (var i = 0; i < index; ++i) {
					targetIndexArray[i] = i;
				}
				for (var i = 0; i < bunchLength; ++i) {
					targetIndexArray[index + i] = index + bunchIndexArray[i];
				}
				for (var i = index + bunchLength; i < targetLength; ++i) {
					targetIndexArray[i] = i;
				}
				this.target.tryReorder(targetIndexArray);
			}
		}
	}

	/**
	 * [[JW.AbstractCollection.Observer|Observer]] implementation for [[JW.ObservableArray]].
	 */
	export class Observer<T> extends AbstractArray.Observer<T> {
		/**
		 * @inheritdoc
		 */
		constructor(source: ObservableArray<T>, config: AbstractCollection.Observer.Config<T>) {
			super(source, config);
			this.own(source.spliceEvent.bind(this._onSplice, this));
			this.own(source.replaceEvent.bind(this._onReplace, this));
			this.own(source.clearEvent.bind(this._onClear, this));
			if (this._change) {
				this.own(source.changeEvent.bind(this._onChange, this));
			}
		}

		private _onSplice(params: SpliceEventParams<T>) {
			var spliceResult = params.spliceResult;
			var oldItems = spliceResult.oldItems;
			var removedItems = spliceResult.getRemovedItems();

			if (this._clearItems && (3 * removedItems.length > 2 * oldItems.length)) {
				// if there is an effective clearing function, just reset the controller
				this._clearItems.call(this._scope, oldItems);
				this._addItems(this.source.getItems());
			} else {
				// else, splice the elements
				this._removeItems(removedItems);
				this._addItems(spliceResult.getAddedItems());
			}
		}

		private _onReplace(params: ReplaceEventParams<T>) {
			if (this._removeItem) {
				this._removeItem.call(this._scope, params.oldItem);
			}
			if (this._addItem) {
				this._addItem.call(this._scope, params.newItem);
			}
		}

		private _onClear(params: ItemsEventParams<T>) {
			this._doClearItems(params.items);
		}
	}

	/**
	 * [[JW.AbstractCollection.Orderer|Orderer]] implementation for [[JW.ObservableArray]].
	 */
	export class Orderer<T extends Class> extends AbstractArray.Orderer<T> {
		/**
		 * @inheritdoc
		 */
		constructor(source: ObservableArray<T>, config: AbstractCollection.Orderer.Config<T>) {
			super(source, config);
			this.own(source.spliceEvent.bind(this._onSplice, this));
			this.own(source.replaceEvent.bind(this._onReplace, this));
			this.own(source.clearEvent.bind(this._onClear, this));
		}

		private _onSplice(params: SpliceEventParams<T>) {
			var spliceResult = params.spliceResult;
			this._splice(
				Array.toSet(spliceResult.getRemovedItems()),
				Array.toSet(spliceResult.getAddedItems()));
		}

		private _onReplace(params: ReplaceEventParams<T>) {
			var index = this.target.keyOf(params.oldItem);
			this.target.trySplice(
				[new AbstractArray.IndexCount(index, 1)],
				[new AbstractArray.IndexItems(this.target.getLength() - 1, [params.newItem])]);
		}

		private _onClear(params: ItemsEventParams<T>) {
			this.target.removeItems(params.items);
		}
	}

	/**
	 * [[JW.AbstractArray.Reverser|Reverser]] implementation for [[JW.ObservableArray]].
	 */
	export class Reverser<T> extends AbstractArray.Reverser<T> {
		/**
		 * @inheritdoc
		 */
		constructor(source: ObservableArray<T>, config?: AbstractArray.Reverser.Config<T>) {
			super(source, config);
			this.own(source.spliceEvent.bind(this._onSplice, this));
			this.own(source.replaceEvent.bind(this._onReplace, this));
			this.own(source.moveEvent.bind(this._onMove, this));
			this.own(source.clearEvent.bind(this._onClear, this));
			this.own(source.reorderEvent.bind(this._onReorder, this));
		}

		private _onSplice(params: SpliceEventParams<T>) {
			var spliceResult = params.spliceResult;
			var oldLength = this.target.getLength();
			var newLength = oldLength;

			var removeParamsList = Array.map(spliceResult.removedItemsList, (indexItems) => {
				var length = indexItems.items.length;
				var index = oldLength - indexItems.index - length;
				newLength -= length;
				return new AbstractArray.IndexCount(index, length);
			});
			removeParamsList.reverse();

			var addedItemsList = spliceResult.addedItemsList.concat();
			addedItemsList.reverse();

			Array.each(addedItemsList, (indexItems) => {
				newLength += indexItems.items.length;
			});

			var addParamsList = Array.map(addedItemsList, (indexItems) => {
				var items = indexItems.items;
				var length = items.length;
				var index = newLength - indexItems.index - length;
				return new AbstractArray.IndexItems<T>(index, this._reverse(items));
			});

			this.target.trySplice(removeParamsList, addParamsList);
		}

		private _onReplace(params: ReplaceEventParams<T>) {
			this.target.trySet(params.newItem, this.target.getLength() - params.index - 1);
		}

		private _onMove(params: MoveEventParams<T>) {
			this.target.tryMove(
				this.target.getLength() - params.fromIndex - 1,
				this.target.getLength() - params.toIndex - 1);
		}

		private _onClear(params: ItemsEventParams<T>) {
			this.target.tryClear();
		}

		private _onReorder(params: ReorderEventParams<T>) {
			var indexArray = params.indexArray;
			var length = indexArray.length;
			var indexes = array<number>(indexArray.length);
			for (var i = 0; i < length; ++i) {
				indexes[length - i - 1] = length - indexArray[i] - 1;
			}
			this.target.tryReorder(indexes);
		}
	}

	/**
	 * [[JW.AbstractCollection.SorterComparing|SorterComparing]] implementation for [[JW.ObservableArray]].
	 */
	export class SorterComparing<T> extends AbstractArray.SorterComparing<T> {
		/**
		 * @inheritdoc
		 */
		constructor(source: ObservableArray<T>, config: AbstractCollection.SorterComparing.Config<T>) {
			super(source, config);
			this.own(source.spliceEvent.bind(this._onSplice, this));
			this.own(source.replaceEvent.bind(this._onReplace, this));
			this.own(source.clearEvent.bind(this._onClear, this));
		}

		private _onSplice(params: SpliceEventParams<T>) {
			var spliceResult = params.spliceResult;
			this._splice(spliceResult.getRemovedItems(), spliceResult.getAddedItems());
		}

		private _onReplace(params: ReplaceEventParams<T>) {
			this._splice([params.oldItem], [params.newItem]);
		}

		private _onClear(params: ItemsEventParams<T>) {
			this._splice(params.items, []);
		}
	}
}
