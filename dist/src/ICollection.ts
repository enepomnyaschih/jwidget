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

import DestroyableReadOnlyCollection from './DestroyableReadOnlyCollection';
import IClass from './IClass';

/**
 * Abstract collection.
 *
 * There are 3 collection types:
 *
 * * [[IList]],
 * extends [[IIndexedCollection]]
 * * [[IMap]],
 * extends [[IIndexedCollection]]
 * * [[ISet]]
 *
 * You can convert collections to each other using their methods.
 *
 * Each collection has 2 implementations:
 *
 * * Simple collections:
 * [[JWArray]],
 * [[JWMap]],
 * [[JWSet]]
 * * Observable collection:
 * [[ObservableArray]],
 * [[ObservableMap]],
 * [[ObservableSet]]
 *
 * The difference is that the observable collection triggers events about its modifications.
 * It lets you to synchronize view with data on fly in accordance to Model-View architecture.
 *
 * Internally, simple collections are very similar to native JavaScript collections.
 * But their API is identical to observable collections' (excepting lack of events).
 * So you can use simple collections as a bridge between native JavaScript collections and
 * jWidget observable collections.
 *
 * The next synchronizers exist to connect observable collections to each other:
 *
 * * [[ICollectionMapper]] - Item mapper
 * * [[ICollectionFilterer]] - Filterer
 * * [[ICollectionCounter]] - Counter by filter
 * * [[ICollectionLister]] - Converter to set
 * * [[ICollectionIndexer]] - Converter to map (indexer)
 * * [[ICollectionOrderer]] - Converter to array (orderer)
 * * [[ICollectionSorterComparing]] - Converter to array (sorter by comparer)
 * * [[ICollectionObserver]] - Modification observer
 * * [[IListInserter]], [[IMapInserter]] - View synchronizers
 * * [[IListMerger]] - Array merger
 * * [[IListReverser]] - Array reverser
 *
 * Please keep the next rules in mind whenever you work with jWidget collections.
 *
 * 1) The majority of collection modification methods have 2 implementations: **tryMethod** and **method**.
 * These methods perform the same collection modification but return different result.
 * **tryMethod** is introduced for internal use mainly,
 * and *it always returns undefined if collection has not been modified*.
 * For example, [[tryClear]] returns undefined if collection is empty,
 * else it returns old collection contents.
 * **method** returns result in more friendly format.
 * For example, [[clear]] always returns old collection contents.
 * So, if you want to clear collection and destroy all items, [[clear]] method fits better:
 *
 *     ArrayUtils.each(array.clear(), destroy); // correct
 *     ArrayUtils.each(array.tryClear(), destroy); // incorrect: 'undefined' exception if array is empty
 *
 * 2) The majority of collection returning methods have 2 implementations: **method** and **$method**.
 * These methods perform the same modification but return the result in different format.
 *
 * * **method** returns native JavaScript collection: Array or Object.
 * * **$method** returns jWidget collection: [[JWArray]],
 * [[JWMap]] or [[JWSet]].
 *
 * Please use the method that's more convenient in your specific situation.
 * For example, **$method** is convenient for chaining algorithm method calls.
 * So, previous example can become more readable with [[$clear]] method:
 *
 *     array.$clear().each(destroy);
 *
 * But in the next example [[clear]] is still suitable:
 *
 *     set.addAll(array.clear());
 *
 * 3) It is better if all items in collection are not null/undefined and are all unique. Some methods like
 * [[performReorder]] require each item to have an unique key.
 * If two items of collection are equal, then their keys are equal as well, so this method won't work correctly.
 *
 * # Collection methods
 *
 * Content retrieving:
 *
 * * [[length]] - Collection length property.
 * * [[isEmpty]] - Checks collection for emptiness.
 * * [[getFirst]] - Returns first item in collection.
 * * [[containsItem]] - Does collection contain the item?
 *
 * Iteration algorithms:
 *
 * * [[every]] - Checks all items by criteria.
 * Returns true if all items match the criteria.
 * * [[some]] - Checks each item by criteria.
 * Returns true if some item matches the criteria.
 * * [[each]], [[forEach]] - Iterates items through.
 * * [[search]] - Finds item by criteria.
 * Returns first item matching the criteria.
 * * [[filter]], [[filter]] - Filters collection by criteria.
 * Builds new collection of the same type, consisting of items matching the criteria.
 * * [[count]], [[$count]] - Counts the items matching criteria.
 * * [[map]], [[map]] - Maps collection items.
 * Builds new collection of the same type, consisting of results of mapping function call for each collection item.
 * * [[toSorted]], [[$toSorted]],
 * [[toSortedComparing]], [[$toSortedComparing]] -
 * Builds array consisting of collection items sorted by indexer or comparer.
 * * [[index]], [[$index]] - Indexes collection.
 * Builds new map by rule: key is the result of indexer function call, value is the corresponding item.
 * * [[toArray]], [[$toArray]] - Builds new array consisting of collection items.
 * * [[toSet]], [[toSet]] - Builds new set consisting of collection items.
 * * [[asArray]], [[$asArray]] - Represents collection as array.
 * * [[asSet]], [[asSet]] - Represents collection as set.
 *
 * Collection modification:
 *
 * * [[removeItem]] - Removes first occurency of an item in collection.
 * * [[removeItems]] - Removes all occurencies of items in collection.
 * * [[clear]], [[$clear]], [[tryClear]] - Clears collection.
 *
 * Similar collection creation (for algorithms and synchronizers implementation):
 *
 * * [[createEmpty]] - Creates empty collection of the same type.
 * * [[createEmptyArray]] - Creates empty array of the same observability type.
 * * [[createEmptyMap]] - Creates empty map of the same observability type.
 * * [[createEmptySet]] - Creates empty set of the same observability type.
 *
 * All the same algorithms are also available for native JavaScript collections:
 *
 * * Array, see [[ArrayUtils]] functions.
 * * Object as map, see [[DictionaryUtils]] functions.
 * * Object as set, see [[SetUtils]] functions.
 */
interface ICollection<T> extends IClass, DestroyableReadOnlyCollection<T> {
	/**
	 * Makes this collection an owner of its items, which means that its items are alive as long as they are present in
	 * this collection. The item is destroyed when it leaves the
	 * collection, and all items are destroyed on the collection destruction.
	 * @returns this
	 */
	ownItems(): this;

	/**
	 * Removes first occurrence of an item in collection.
	 */
	removeItem(item: T): void;

	/**
	 * Removes all occurrences of items in collection.
	 */
	removeItems(items: T[]): void;

	/**
	 * Clears collection.
	 * @returns Old collection contents. If not modified - undefined.
	 */
	clear(): any;
}

export default ICollection;

namespace ICollection {
	/**
	 * `ICollection` event parameters.
	 */
	export interface EventParams<T> {
		/**
		 * Event sender.
		 */
		sender: ICollection<T>;
	}
}
