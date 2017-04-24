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
 * Converter to array (orderer). Converts source collection to array.
 * Adds new items to the end of array.
 * If original collection is observable, starts continuous synchronization.
 *
 *     var map = new JW.ObservableMap<string>({a: "A", b: "B"});
 *     var orderer = map.createOrderer();
 *     var array = orderer.target;
 *
 *     assert.strictEqual(array.get(0), "A");
 *     assert.strictEqual(array.get(1), "B");
 *
 *     // Target array is automatically synchronized with original observable collection
 *     map.set("C", "c");
 *     assert.strictEqual(array.get(2), "C");
 *
 *     orderer.destroy();
 *
 * **Notice:** All items of source collection must be different.
 *
 * Use [[JW.AbstractCollection.createOrderer|createOrderer]] method to create the synchronizer.
 * The method selects a synchronizer implementation which fits better (simple or observable).
 *
 * You can pass target array in config option:
 *
 *     var array = new JW.Array();
 *     var orderer = collection.createOrderer({
 *         target: array
 *     });
 *
 * In simple cases, [[JW.AbstractCollection.$$toArray|$$toArray]] shorthand can be used instead.
 * It returns the target array right away:
 *
 *     var map = new JW.ObservableMap<string>({a: "A", b: "B"});
 *     var array = map.$$toArray();
 *
 *     assert.strictEqual(array.get(0), "A");
 *     assert.strictEqual(array.get(1), "B");
 *
 *     // Target array is automatically synchronized with original observable collection
 *     map.set("C", "c");
 *     assert.strictEqual(array.get(2), "C");
 *
 *     array.destroy();
 *
 * Synchronizer rules:
 *
 * - Target array is stored in [[target]] property.
 * - All items of source collection are added to [[target]]
 * immediately on synchronizer initialization.
 * - All items are removed from [[target]] on synchronizer destruction.
 * - You can pass target array in [[Orderer.Config.target|target]] config option.
 * In this case, you are responsible for its destruction (though items will be removed
 * automatically on synchronizer destruction anyway).
 * - If [[Orderer.Config.target|target]] is not passed, it will be created automatically. Synchronizer will select
 * appropriate [[target]] implementation (simple or observable). In this
 * case, [[target]] will be destroyed automatically on synchronizer destruction.
 * - You can convert multiple collections into one array, if all items are different.
 *
 * @param T Collection item type.
 */
interface ICollectionOrderer<T extends IClass> extends IClass {
	/**
	 * Target array.
	 */
	readonly target: IArray<T>;
}

export default ICollectionOrderer;
