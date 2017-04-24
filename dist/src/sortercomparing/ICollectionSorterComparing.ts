/*!
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

import IArray from '../IArray';
import IClass from '../IClass';

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
interface ICollectionSorterComparing<T> extends IClass {
	/**
	 * Target array.
	 */
	readonly target: IArray<T>;

	/**
	 * Resorts target array forcibly. Call this method on sorting factors modification.
	 */
	resort(): void;
}

export default ICollectionSorterComparing;
