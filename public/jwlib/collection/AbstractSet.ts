/// <reference path="../jwlib.ref.ts" />

module JW {
	/**
	 * Set is unordered collection optimized for items adding, removal and search. Unlike
	 * array and map, set can contain only [[JW.Class]] instances. Internal set representation is
	 * map from [[iid]] to items themselves.
	 *
	 * # Set methods
	 *
	 * **Difference compared to [[JW.AbstractCollection]] is in bold.**
	 *
	 * Content retrieving:
	 *
	 * * [[getLength]] - Returns count of items in collection.
	 * For observable collections, **length** property may come
	 * in handy if you want to track collection length dynamically.
	 * * [[isEmpty]] - Checks collection for emptiness.
	 * * [[getFirst]] - Returns first item in collection.
	 * * [[containsItem]] - Does collection contain the item?
	 * - **[[getJson]] - Returns internal representation of set.**
	 *
	 * Iteration algorithms:
	 *
	 * * [[every]] - Checks all items by criteria.
	 * Returns true if all items match the criteria.
	 * * [[some]] - Checks each item by criteria.
	 * Returns true if some item matches the criteria.
	 * * [[each]] - Iterates items through.
	 * * [[search]] - Finds item by criteria.
	 * Returns first item matching the criteria.
	 * * [[filter]], [[$filter]], [[$$filter]] - Filters collection by criteria.
	 * Builds new collection of the same type, consisting of items matching the criteria.
	 * * [[count]], [[$count]], [[$$count]] - Counts the items matching criteria.
	 * * [[map]], [[$map]], [[$$mapValues]], [[$$mapObjects]] - Maps collection items.
	 * Builds new collection of the same type, consisting of results of mapping function call for each collection item.
	 * * [[toSorted]], [[$toSorted]],
	 * [[toSortedComparing]], [[$toSortedComparing]],
	 * [[$$toSortedComparing]] -
	 * Builds array consisting of collection items sorted by indexer or comparer.
	 * * [[index]], [[$index]], [[$$index]] - Indexes collection.
	 * Builds new map by rule: key is the result of indexer function call, value is the corresponding item.
	 * * [[toArray]], [[$toArray]], [[$$toArray]] -
	 * Builds new array consisting of collection items.
	 * * [[toSet]], [[$toSet]], [[$$toSet]] -
	 * Builds new set consisting of collection items.
	 * * [[asArray]], [[$asArray]] - Represents collection as array.
	 * * [[asSet]], [[$asSet]] - Represents collection as set.
	 *
	 * Collection modification:
	 *
	 * - **[[add]], [[tryAdd]] - Adds item to set.**
	 * - **[[addAll]], [[$addAll]],
	 * [[tryAddAll]] - Adds multiple items to set.**
	 * - **[[remove]], [[tryRemove]] - Removes item from set.**
	 * - **[[removeAll]], [[$removeAll]],
	 * [[tryRemoveAll]] - Removes multiple items from set.**
	 * * [[removeItem]] - Removes first occurency of an item in collection.
	 * * [[removeItems]] - Removes all occurencies of items in collection.
	 * * [[clear]], [[$clear]], [[tryClear]] - Clears collection.
	 * - **[[splice]], [[trySplice]] - Removes and adds multiple items.**
	 * - **[[performSplice]] - Adjusts contents using [[splice]] method.**
	 *
	 * Synchronizers creation:
	 *
	 * * [[createMapper]] - Creates item mapper.
	 * Extended version of [[$$mapValues]] and [[$$mapObjects]] methods.
	 * * [[createFilterer]] - Creates filterer.
	 * Extended version of [[$$filter]] method.
	 * * [[createCounter]] - Creates matching item counter.
	 * Extended version of [[$$count]] method.
	 * * [[createLister]] - Creates converter to set.
	 * Extended version of [[$$toSet]] method.
	 * * [[createIndexer]] - Creates converter to map (indexer).
	 * Extended version of [[$$index]] method.
	 * * [[createOrderer]] - Creates converter to array (orderer).
	 * Extended version of [[$$toArray]] method.
	 * * [[createSorterComparing]] - Creates converter to array (sorter by comparer).
	 * Extended version of [[$$toSortedComparing]] method.
	 * * [[createObserver]] - Creates observer.
	 *
	 * Similar collection creation (for algorithms and synchronizers implementation):
	 *
	 * * [[createEmpty]] - Creates empty collection of the same type.
	 * * [[createEmptyArray]] - Creates empty array of the same observability type.
	 * * [[createEmptyMap]] - Creates empty map of the same observability type.
	 * * [[createEmptySet]] - Creates empty set of the same observability type.
	 *
	 * Other methods:
	 *
	 * - **[[detectSplice]] - Detects [[splice]] method arguments to adjust contents.**
	 * - **[[equal]] - Checks for equality to array.**
	 *
	 * All the same algorithms are also available for native JavaScript Object as set,
	 * see [[JW.Set]] static methods.
	 *
	 * @param T Collection item type.
	 */
	export abstract class AbstractSet<T extends Class> extends AbstractCollection<T> {
		private json: Dictionary<T>;
		private _length: number;
		private _adapter: boolean;

		/**
		 * This constructor should be used to create a new empty set.
		 */
		constructor();

		/**
		 * This constructor should be used to create a new set and copy the items into it.
		 *
		 * @param items Initial set contents.
		 */
		constructor(items: T[]);

		/**
		 * This constructor should be used to wrap the **items** rather than copying them
		 * into a new set. Since set is a map from [[iid]]
		 * to items, you must pass this map as a first argument.
		 *
		 * @param items Initial set contents.
		 * @param adapter Used to distinguish the constructor implementations and
		 * for consistency to other collections. Must be true.
		 */
		constructor(items: Dictionary<T>, adapter: boolean);
		constructor(items?, adapter?: boolean) {
			super();
			this._adapter = Boolean(adapter);
			this.json = this._adapter ? items : items ? Array.index(items, byField<string>("_iid")) : {};
			this._length = Set.getLength(this.json);
		}

		/**
		 * @inheritdoc
		 */
		ownItems(): AbstractSet<T> {
			super.ownItems();
			return this;
		}

		/**
		 * Returns item map - internal collection representation.
		 *
		 * **Caution: doesn't make a copy - please don't modify.**
		 */
		getJson(): Dictionary<T> {
			return this.json;
		}

		/**
		 * @inheritdoc
		 */
		getLength(): number {
			return this._length;
		}

		/**
		 * @inheritdoc
		 */
		isEmpty(): boolean {
			return this._length === 0;
		}

		/**
		 * @inheritdoc
		 */
		getFirst(): T {
			return Set.getFirst(this.json);
		}

		/**
		 * @inheritdoc
		 */
		containsItem(item: T): boolean {
			return this.json.hasOwnProperty(_JW.S(item._iid));
		}

		/**
		 * Shorthand to [[containsItem]].
		 */
		contains(item: T): boolean {
			return this.json.hasOwnProperty(_JW.S(item._iid));
		}

		/**
		 * @inheritdoc
		 */
		every(callback: (item: T) => boolean, scope?: any): boolean {
			return Set.every(this.json, callback, scope);
		}

		/**
		 * @inheritdoc
		 */
		toSorted(callback?: (item: T) => any, scope?: any, order?: number): T[] {
			return Set.toSorted(this.json, callback, scope || this, order);
		}

		/**
		 * @inheritdoc
		 */
		toSortedComparing(compare?: (t1: T, t2: T) => number, scope?: any, order?: number): T[] {
			return Set.toSortedComparing(this.json, compare, scope || this, order);
		}

		/**
		 * @inheritdoc
		 */
		filter(callback: (item: T) => boolean, scope?: any): Dictionary<T> {
			return Set.filter(this.json, callback, scope);
		}

		/**
		 * @inheritdoc
		 */
		$filter(callback: (item: T) => boolean, scope?: any): Set<T> {
			return Set.$filter(this.json, callback, scope);
		}

		/**
		 * @inheritdoc
		 */
		$$filter(callback: (item: T) => boolean, scope?: any): AbstractSet<T> {
			return this.$filter(callback, scope);
		}

		/**
		 * @inheritdoc
		 */
		count(callback: (item: T) => boolean, scope?: any): number {
			return Set.count(this.json, callback, scope);
		}

		/**
		 * @inheritdoc
		 */
		map<U extends Class>(callback: (item: T) => U, scope?: any): Dictionary<U> {
			return Set.map(this.json, callback, scope);
		}

		/**
		 * @inheritdoc
		 */
		$map<U extends Class>(callback: (item: T) => U, scope?: any): Set<U> {
			return Set.$map(this.json, callback, scope);
		}

		/**
		 * @inheritdoc
		 */
		$$mapValues<U extends Class>(callback: (item: T) => U, scope?: any): AbstractSet<U> {
			return this.$map(callback, scope);
		}

		/**
		 * @inheritdoc
		 */
		$$mapObjects<U extends Class>(callback: (item: T) => U, scope?: any): AbstractSet<U> {
			return this.$map(callback, scope);
		}

		/**
		 * @inheritdoc
		 */
		toSet(): Dictionary<T> {
			return apply<T>({}, this.json);
		}

		/**
		 * @inheritdoc
		 */
		$toSet(): Set<T> {
			return new Set<T>(this.toSet(), true);
		}

		/**
		 * @inheritdoc
		 */
		asSet(): Dictionary<T> {
			return this.json;
		}

		/**
		 * @inheritdoc
		 */
		$asSet(): AbstractSet<T> {
			return this;
		}

		/**
		 * Adds an item to set if one is absent.
		 * @returns Item is added successfully. False if item is already present.
		 */
		add(item: T): boolean {
			return this.tryAdd(item) !== undefined;
		}

		/**
		 * Adds an item to set if one is absent.
		 * @returns Item is added successfully. If collection is not modified, returns undefined.
		 * In other words, this method may return true or undefined.
		 */
		tryAdd(item: T): boolean {
			if (this.trySplice([], [item]) !== undefined) {
				return true;
			}
		}

		/**
		 * Adds multiple items to set, ones that are absent.
		 * @returns The added items.
		 */
		addAll(items: T[]): T[] {
			var result = this.tryAddAll(items);
			return (result !== undefined) ? result : [];
		}

		/**
		 * Adds multiple items to set, ones that are absent.
		 * @returns The added items.
		 */
		$addAll(items: T[]): Array<T> {
			return new Array<T>(this.addAll(items), true);
		}

		/**
		 * Adds multiple items to set, ones that are absent.
		 * @returns The added items.
		 * If collection is not modified, returns undefined.
		 */
		tryAddAll(items: T[]): T[] {
			var spliceResult = this.trySplice([], items);
			if (spliceResult !== undefined) {
				return spliceResult.addedItems;
			}
		}

		/**
		 * Removes an item from set if one is present.
		 * @returns Item is removed successfully. Returns false if item is already absent.
		 */
		remove(item: T): boolean {
			return this.tryRemove(item) !== undefined;
		}

		/**
		 * Removes an item from set if one is present.
		 * @returns Item is removed successfully. If collection is not modified, returns undefined.
		 * In other words, this method may return true or undefined.
		 */
		tryRemove(item: T): boolean {
			if (this.trySplice([item], []) !== undefined) {
				return true;
			}
		}

		/**
		 * @inheritdoc
		 */
		removeItem(item: T) {
			this.tryRemove(item);
		}

		/**
		 * Removes multiple items from set, ones that are present.
		 * @returns The removed items.
		 */
		removeAll(items: T[]): T[] {
			var result = this.tryRemoveAll(items);
			return (result !== undefined) ? result : [];
		}

		/**
		 * Removes multiple items from set, ones that are present.
		 * @returns The removed items.
		 */
		$removeAll(items: T[]): Array<T> {
			return new Array<T>(this.removeAll(items), true);
		}

		/**
		 * Removes multiple items from set, ones that are present.
		 * @returns The removed items.
		 * If collection is not modified, returns undefined.
		 */
		tryRemoveAll(items: T[]): T[] {
			var spliceResult = this.trySplice(items, []);
			if (spliceResult !== undefined) {
				return spliceResult.removedItems;
			}
		}

		/**
		 * @inheritdoc
		 */
		removeItems(items: T[]) {
			this.tryRemoveAll(items);
		}

		/**
		 * @inheritdoc
		 */
		clear(): T[] {
			var items = this.tryClear();
			return (items !== undefined) ? items : [];
		}

		/**
		 * @inheritdoc
		 */
		$clear(): Array<T> {
			return new Array<T>(this.clear(), true);
		}

		/**
		 * @inheritdoc
		 */
		tryClear(): T[] {
			var items = this._tryClear();
			if (items !== undefined && this._ownsItems) {
				Array.backEvery(items, destroyForcibly);
			}
			return items;
		}

		_tryClear(): T[] {
			if (this._length === 0) {
				return;
			}
			var items: T[];
			this._length = 0;
			if (this._adapter) {
				items = JW.Set.tryClear(this.json);
			} else {
				items = this.toArray();
				this.json = {};
			}
			return items;
		}

		/**
		 * Removes and adds multiple items in set. Universal optimized granular operation of removal/insertion.
		 * @param removedItems Items to remove.
		 * @param addedItems Items to add.
		 * @returns Splice result. Never returns null or undefined.
		 */
		splice(removedItems: T[], addedItems: T[]): AbstractSet.SpliceResult<T> {
			var spliceResult = this.trySplice(removedItems, addedItems);
			return (spliceResult !== undefined) ? spliceResult : { addedItems: [], removedItems: [] };
		}

		/**
		 * Removes and adds multiple items in set. Universal optimized granular operation of removal/insertion.
		 * @param removedItems Items to remove.
		 * @param addedItems Items to add.
		 * @returns Splice result.
		 * If collection is not modified, returns undefined.
		 */
		trySplice(removedItems: T[], addedItems: T[]): AbstractSet.SpliceResult<T> {
			var spliceResult = this._trySplice(removedItems, addedItems);
			if ((spliceResult !== undefined) && this._ownsItems) {
				Array.backEvery(spliceResult.removedItems, destroyForcibly);
			}
			return spliceResult;
		}

		_trySplice(removedItems: T[], addedItems: T[]): AbstractSet.SpliceResult<T> {
			var spliceResult = Set.trySplice(this.json, removedItems, addedItems);
			if (spliceResult !== undefined) {
				this._length += spliceResult.addedItems.length - spliceResult.removedItems.length;
				return spliceResult;
			}
		}

		/**
		 * Detects [[splice]] method arguments to adjust set contents to **newItems**.
		 * Determines which items should be removed and which ones should be added.
		 * @param newItems New set contents.
		 * @returns [[splice]] method arguments. If no method call required, returns undefined.
		 */
		detectSplice(newItems: T[]): AbstractSet.SpliceParams<T> {
			return Set.detectSplice(this.json, newItems);
		}

		/**
		 * Adjusts set contents to **newItems** using [[detectSplice]] and
		 * [[splice]] methods.
		 * @param newItems New set contents.
		 */
		performSplice(newItems: T[]) {
			var spliceParams = this.detectSplice(newItems);
			if (spliceParams !== undefined) {
				this.trySplice(spliceParams.removedItems, spliceParams.addedItems);
			}
		}

		/**
		 * Checks for equality (===) to array, item by item.
		 */
		equal(array: T[]): boolean {
			return Set.equal(this.json, array);
		}

		/**
		 * @inheritdoc
		 */
		abstract createEmpty<U extends Class>(): AbstractSet<U>;

		/**
		 * @inheritdoc
		 */
		createMapper<U extends Class>(config: AbstractSet.Mapper.Config<T, U>): AbstractSet.Mapper<T, U> {
			return new AbstractSet.Mapper<T, U>(this, config);
		}

		/**
		 * @inheritdoc
		 */
		createFilterer(config: AbstractSet.Filterer.Config<T>): AbstractSet.Filterer<T> {
			return new AbstractSet.Filterer<T>(this, config);
		}

		/**
		 * @inheritdoc
		 */
		createCounter(config: AbstractCollection.Counter.Config<T>): AbstractSet.Counter<T> {
			return new AbstractSet.Counter<T>(this, config);
		}

		/**
		 * @inheritdoc
		 */
		createObserver(config: AbstractCollection.Observer.Config<T>): AbstractSet.Observer<T> {
			return new AbstractSet.Observer<T>(this, config);
		}

		/**
		 * @inheritdoc
		 */
		createOrderer(config?: AbstractCollection.Orderer.Config<T>): AbstractSet.Orderer<T> {
			return new AbstractSet.Orderer<T>(this, config);
		}

		/**
		 * @inheritdoc
		 */
		createSorterComparing(config?: AbstractCollection.SorterComparing.Config<T>): AbstractSet.SorterComparing<T> {
			return new AbstractSet.SorterComparing<T>(this, config);
		}

		/**
		 * @inheritdoc
		 */
		createIndexer(config: AbstractCollection.Indexer.Config<T>): AbstractSet.Indexer<T> {
			return new AbstractSet.Indexer<T>(this, config);
		}

		/**
		 * @inheritdoc
		 */
		createLister(config?: AbstractCollection.Lister.Config<T>): AbstractSet.Lister<T> {
			return new AbstractSet.Lister<T>(this, config);
		}
	}

	export module AbstractSet {
		/**
		 * [[JW.AbstractSet.splice]] method arguments.
		 * Returned by [[JW.AbstractSet.detectSplice]] method.
		 *
		 * @param T Item type.
		 */
		export interface SpliceParams<T> {
			/**
			 * Items to remove.
			 */
			removedItems: T[];

			/**
			 * Items to add.
			 */
			addedItems: T[];
		}

		/**
		 * [[JW.AbstractSet.splice]] method result.
		 *
		 * @param T Item type.
		 */
		export interface SpliceResult<T> {
			removedItems: T[];
			addedItems: T[];
		}

		/**
		 * [[JW.AbstractCollection.Counter|Counter]] implementation for [[JW.Set]].
		 */
		export class Counter<T extends Class> extends AbstractCollection.Counter<T> {
			/**
			 * @inheritdoc
			 */
			public source: AbstractSet<T>;

			/**
			 * @inheritdoc
			 */
			constructor(source: AbstractSet<T>, config: AbstractCollection.Counter.Config<T>) {
				super(source, config);
			}
		}

		/**
		 * [[JW.AbstractCollection.Filterer|Filterer]] implementation for [[JW.Set]].
		 */
		export class Filterer<T extends Class> extends AbstractCollection.Filterer<T> {
			/**
			 * @inheritdoc
			 */
			source: AbstractSet<T>;

			/**
			 * @inheritdoc
			 */
			target: AbstractSet<T>;

			/**
			 * @inheritdoc
			 */
			constructor(source: AbstractSet<T>, config: Filterer.Config<T>) {
				super(source, config);
				this.target.tryAddAll(source.$toArray().filter(this._filterItem, this._scope));
			}

			/**
			 * @inheritdoc
			 */
			protected destroyObject() {
				this.target.tryRemoveAll(this.source.toArray());
				super.destroyObject();
			}
		}

		export module Filterer {
			/**
			 * @inheritdoc
			 */
			export interface Config<T extends Class> extends AbstractCollection.Filterer.Config<T> {
				/**
				 * @inheritdoc
				 */
				target?: AbstractSet<T>;
			}
		}

		/**
		 * [[JW.AbstractCollection.Indexer|Indexer]] implementation for [[JW.Set]].
		 */
		export class Indexer<T extends Class> extends AbstractCollection.Indexer<T> {
			/**
			 * @inheritdoc
			 */
			public source: AbstractSet<T>;

			/**
			 * @inheritdoc
			 */
			constructor(source: AbstractSet<T>, config: AbstractCollection.Indexer.Config<T>) {
				super(source, config);
			}
		}

		/**
		 * [[JW.AbstractCollection.Lister|Lister]] implementation for [[JW.Set]].
		 */
		export class Lister<T extends Class> extends AbstractCollection.Lister<T> {
			/**
			 * @inheritdoc
			 */
			public source: AbstractSet<T>;

			/**
			 * @inheritdoc
			 */
			constructor(source: AbstractSet<T>, config: AbstractCollection.Lister.Config<T>) {
				super(source, config);
			}
		}

		/**
		 * [[JW.AbstractCollection.Mapper|Mapper]] implementation for [[JW.Set]].
		 */
		export class Mapper<T extends Class, U extends Class> extends AbstractCollection.Mapper<T, U> {
			/**
			 * @hidden
			 */
			protected _items: Dictionary<U> = {};

			/**
			 * @inheritdoc
			 */
			source: AbstractSet<T>;

			/**
			 * @inheritdoc
			 */
			target: AbstractSet<U>;

			/**
			 * @inheritdoc
			 */
			constructor(source: AbstractSet<T>, config: AbstractSet.Mapper.Config<T, U>) {
				super(source, config);
				this.target.tryAddAll(this._createItems(source.toArray()));
			}

			/**
			 * @inheritdoc
			 */
			protected destroyObject() {
				var datas = this.source.toArray();
				this.target.tryRemoveAll(this._getItems(datas));
				this._destroyItems(datas);
				super.destroyObject();
			}

			/**
			 * @hidden
			 */
			protected _getItems(datas: T[]): U[] {
				return Array.map(datas, (data) => {
					return this._items[data._iid];
				}, this);
			}

			/**
			 * @hidden
			 */
			protected _createItems(datas: T[]): U[] {
				var items: U[] = [];
				for (var i = 0, l = datas.length; i < l; ++i) {
					var data = datas[i];
					var item = this._createItem.call(this._scope || this, data);
					items.push(item);
					this._items[data._iid] = item;
				}
				return items;
			}

			/**
			 * @hidden
			 */
			protected _destroyItems(datas: T[]) {
				if (this._destroyItem === undefined) {
					return;
				}
				for (var i = datas.length - 1; i >= 0; --i) {
					var data = datas[i];
					var iid = data._iid;
					var item = this._items[iid];
					delete this._items[iid];
					this._destroyItem.call(this._scope || this, item, data);
				}
			}
		}

		export module Mapper {
			/**
			 * @inheritdoc
			 */
			export interface Config<T extends Class, U extends Class> extends AbstractCollection.Mapper.Config<T, U> {
				/**
				 * @inheritdoc
				 */
				target?: AbstractSet<U>;
			}
		}

		/**
		 * [[JW.AbstractCollection.Observer|Observer]] implementation for [[JW.Set]].
		 */
		export class Observer<T extends Class> extends AbstractCollection.Observer<T> {
			/**
			 * @inheritdoc
			 */
			source: AbstractSet<T>;

			/**
			 * @inheritdoc
			 */
			constructor(source: AbstractSet<T>, config: AbstractCollection.Observer.Config<T>) {
				super(source, config);
			}
		}

		/**
		 * [[JW.AbstractCollection.Orderer|Orderer]] implementation for [[JW.Set]].
		 */
		export class Orderer<T extends Class> extends AbstractCollection.Orderer<T> {
			/**
			 * @inheritdoc
			 */
			public source: AbstractSet<T>;

			/**
			 * @inheritdoc
			 */
			constructor(source: AbstractSet<T>, config: AbstractCollection.Orderer.Config<T>) {
				super(source, config);
			}
		}

		/**
		 * [[JW.AbstractCollection.SorterComparing|SorterComparing]] implementation for [[JW.Set]].
		 */
		export class SorterComparing<T extends Class> extends AbstractCollection.SorterComparing<T> {
			/**
			 * @inheritdoc
			 */
			public source: AbstractSet<T>;

			/**
			 * @inheritdoc
			 */
			constructor(source: AbstractSet<T>, config: AbstractCollection.SorterComparing.Config<T>) {
				super(source, config);
			}
		}
	}
}
