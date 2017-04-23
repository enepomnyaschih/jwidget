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

import {cmp} from '../Core';
import Class from '../Class';
import IArray from '../IArray';
import ICollection from '../ICollection';
import ICollectionSorterComparing from './ICollectionSorterComparing';
import ICollectionSorterComparingConfig from './ICollectionSorterComparingConfig';
import IIndexCount from '../IIndexCount';
import IIndexItems from '../IIndexItems';
import IndexCount from '../IndexCount';
import IndexItems from '../IndexItems';
import List from '../List';
import * as ArrayUtils from '../ArrayUtils';

/**
 * Converter to array (sorter by comparer).
 * Converts source collection to array. Adds new items into such locations that target array is always kept in sorted
 * state. If original collection is observable, starts continuous synchronization.
 * Sorting is performed by comparing function defined by user.
 *
 *     interface Item {
 *         id: number;
 *         title: string;
 *     }
 *
 *     var source = new JW.ObservableArray<Item>([
 *         {title: "apple", id: 3},
 *         {title: "Carrot", id: 1},
 *         {title: "Apple", id: 2}
 *     ]);
 *
 *     // Sort by title case-insensitively, and then by id
 *     var sorter = source.createSorterComparing({
 *         compare: function(x, y) {
 *             return JW.cmp(x.title, y.title, true) || JW.cmp(x.id, y.id);
 *         },
 *         scope: this
 *     });
 *     var target = sorter.target;
 *
 *     assert.strictEqual(target.get(0).id, 2); // Apple
 *     assert.strictEqual(target.get(1).id, 3); // apple
 *     assert.strictEqual(target.get(2).id, 1); // Carrot
 *
 *     // Target array is automatically synchronized with original observable collection
 *     source.add({title: "Banana", id: 4});
 *     assert.strictEqual(target.get(0).id, 2); // Apple
 *     assert.strictEqual(target.get(1).id, 3); // apple
 *     assert.strictEqual(target.get(2).id, 4); // Banana
 *     assert.strictEqual(target.get(3).id, 1); // Carrot
 *
 *     sorter.destroy();
 *
 * Use [[JW.AbstractCollection.createSorterComparing|createSorterComparing]] method to create the synchronizer.
 * The method selects a synchronizer implementation which fits better (simple or observable).
 *
 * You can pass target array in config option:
 *
 *     var array = new JW.Array();
 *     var sorter = collection.createSorterComparing({
 *         target: array,
 *         compare: function(x, y) {
 *             return JW.cmp(x.title, y.title, true) || JW.cmp(x.id, y.id);
 *         },
 *         scope: this
 *     });
 *
 * In simple cases, [[JW.AbstractCollection.$$toSortedComparing|$$toSortedComparing]] shorthand can be used instead.
 * It returns the target array right away:
 *
 *     var source = new JW.ObservableArray<Item>([
 *         {title: "apple", id: 3},
 *         {title: "Carrot", id: 1},
 *         {title: "Apple", id: 2}
 *     ]);
 *
 *     // Sort by title case-insensitively, and then by id
 *     var target = source.$$toSortedComparing(function(x, y) {
 *         return JW.cmp(x.title, y.title, true) || JW.cmp(x.id, y.id);
 *     });
 *
 *     assert(target.get(0).id === 2); // Apple
 *     assert(target.get(1).id === 3); // apple
 *     assert(target.get(2).id === 1); // Carrot
 *
 *     // Target array is automatically synchronized with original observable collection
 *     source.add({title: "Banana", id: 4});
 *     assert(target.get(0).id === 2); // Apple
 *     assert(target.get(1).id === 3); // apple
 *     assert(target.get(2).id === 4); // Banana
 *     assert(target.get(3).id === 1); // Carrot
 *
 *     target.destroy();
 *
 * Synchronizer rules:
 *
 * - Target array is stored in [[target]] property.
 * - All items of source collection are added to [[target]]
 * immediately on synchronizer initialization.
 * - All items are removed from [[target]] on synchronizer destruction.
 * - You can pass target array in
 * [[SorterComparing.Config.target|target]] config option.
 * In this case, you are responsible for its destruction (though items will be removed
 * automatically on synchronizer destruction anyway).
 * - If [[SorterComparing.Config.target|target]]
 * is not passed, it will be created automatically. Synchronizer will select
 * appropriate [[target]] implementation (simple or observable). In this
 * case, [[target]] will be destroyed automatically on synchronizer destruction.
 * - You can sort multiple collections into one array.
 *
 * @param T Collection item type.
 */
abstract class AbstractCollectionSorterComparing<T> extends Class implements ICollectionSorterComparing<T> {
	private _targetCreated: boolean;

	/**
	 * @hidden
	 */
	protected _compare: (x: T, y: T) => number;

	/**
	 * @hidden
	 */
	protected _scope: any;

	/**
	 * @hidden
	 */
	protected _order: number;

	/**
	 * Target array.
	 */
	target: IArray<T>;

	/**
	 * Creates synchronizer.
	 * [[JW.AbstractCollection.createSorterComparing|createSorterComparing]] method is preferred instead.
	 *
	 * @param source Source collection.
	 * @param config Configuration.
	 */
	constructor(public source: ICollection<T>, config: ICollectionSorterComparingConfig<T>) {
		super();
		this._compare = config.compare || cmp;
		this._order = config.order || 1;
		this._scope = config.scope || this;
		this._targetCreated = config.target == null;
		this.target = this._targetCreated ? new List<T>(source.silent) : config.target;
		this._splice([], source.asArray());
	}

	/**
	 * @inheritdoc
	 */
	protected destroyObject() {
		this._splice(this.source.asArray(), []);
		if (this._targetCreated) {
			this.target.destroy();
		}
		this.source = null;
		this.target = null;
		this._compare = null;
		this._scope = null;
		super.destroyObject();
	}

	/**
	 * Resorts target array forcibly. Call this method on sorting factors modification.
	 */
	resort() {
		this.target.sortComparing(this._compare, this._scope, this._order);
	}

	/**
	 * @hidden
	 */
	protected _splice(removedItems: T[], addedItems: T[]) {
		var removedItemsSorted = ArrayUtils.toSortedComparing(removedItems, this._compare, this._scope, this._order);
		var addedItemsSorted = ArrayUtils.toSortedComparing(addedItems, this._compare, this._scope, this._order);
		removedItems = new Array<T>(removedItems.length);
		addedItems = new Array<T>(addedItems.length);
		var iRemoved = 0;
		var iAdded = 0;
		var jRemoved = 0;
		var jAdded = 0;
		// ignore out the items which are removed and added at the same time
		while ((iRemoved < removedItemsSorted.length) || (iAdded < addedItemsSorted.length)) {
			var removedItem = removedItemsSorted[iRemoved];
			var addedItem = addedItemsSorted[iAdded];
			var c = cmp(removedItem === undefined, addedItem === undefined) ||
				(this._order * this._compare.call(this._scope, removedItem, addedItem));
			if (c < 0) {
				removedItems[jRemoved++] = removedItem;
				++iRemoved;
			} else if (c > 0) {
				addedItems[jAdded++] = addedItem;
				++iAdded;
			} else {
				++iRemoved;
				++iAdded;
			}
		}
		removedItems.splice(jRemoved, removedItems.length - jRemoved);
		addedItems.splice(jAdded, addedItems.length - jAdded);

		var iAdds = 0;
		var addShift = 0;
		var removeParamsList: IIndexCount[] = [];
		var addParamsList: IIndexItems<T>[] = [];
		var removeParams: IIndexCount = null;
		for (var iTarget = 0, lTarget = this.target.length.get(); iTarget < lTarget; ++iTarget) {
			var value = this.target.get(iTarget);
			if (removedItems[ArrayUtils.binarySearch(removedItems, value, this._compare, this._scope, this._order) - 1] === value) {
				if (!removeParams) {
					removeParams = new IndexCount(iTarget, 1);
				} else {
					removeParams = new IndexCount(removeParams.index, removeParams.count + 1);
				}
				--addShift;
			} else {
				removeParamsList.push(removeParams);
				removeParams = null;
				var addParams = new IndexItems<T>(iTarget + addShift, []);
				while ((iAdds < addedItems.length) && (this._order * this._compare.call(this._scope, addedItems[iAdds], value) < 0)) {
					addParams.items.push(addedItems[iAdds++]);
					++addShift;
				}
				if (addParams.items.length !== 0) {
					addParamsList.push(addParams);
				}
			}
		}
		if (iAdds < addedItems.length) {
			addParamsList.push(new IndexItems<T>(iTarget + addShift, addedItems.slice(iAdds)));
		}
		if (removeParams) {
			removeParamsList.push(removeParams);
		}
		this.target.trySplice(removeParamsList, addParamsList);
	}
}

export default AbstractCollectionSorterComparing;
