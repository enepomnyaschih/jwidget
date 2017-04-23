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

import IClass from '../IClass';
import ISet from '../ISet';

/**
 * Converter to set.
 * If original collection is observable, starts continuous synchronization.
 * Can be used for fast item existance detection.
 *
 *     // Create two dummy collection items
 *     var x = new JW.Class();
 *     var y = new JW.Class();
 *
 *     // Initialize collection and synchronizer
 *     var array = new JW.ObservableArray<JW.Class>([x]);
 *     var lister = array.createLister();
 *     var set = lister.target;
 *
 *     assert.ok(set.contains(x));
 *     assert.ok(!set.contains(y));
 *
 *     // Target set is automatically synchronized with original observable array
 *     array.add(y);
 *     assert.ok(set.contains(y));
 *
 *     lister.destroy();
 *
 * **Notice:** All items of source collection must be different (i.e. have unique _iid).
 *
 * Use [[JW.AbstractCollection.createLister|createLister]] method to create the synchronizer.
 * The method selects a synchronizer implementation which fits better (simple or observable).
 *
 * You can pass target collection in config option:
 *
 *     var set = new JW.Set<JW.Class>();
 *     var lister = collection.createLister({
 *         target: set
 *     });
 *
 * In simple cases, [[JW.AbstractCollection.$$toSet|$$toSet]] shorthand can be used instead.
 * It returns the target set right away:
 *
 *     // Create two dummy collection items
 *     var x = new JW.Class();
 *     var y = new JW.Class();
 *
 *     // Initialize collections
 *     var array = new JW.ObservableArray<JW.Class>([x]);
 *     var set = array.$$toSet();
 *
 *     assert.ok(set.contains(x));
 *     assert.ok(!set.contains(y));
 *
 *     // Target set is automatically synchronized with original observable array
 *     array.add(y);
 *     assert.ok(set.contains(y));
 *
 *     set.destroy();
 *
 * Synchronizer rules:
 *
 * - Target set is stored in [[target]] property.
 * - All items of source collection are added to [[target]] immediately on synchronizer initialization.
 * - All items are removed from [[target]] on synchronizer destruction.
 * - You can pass target set in
 * [[Lister.Config.target|target]] config option.
 * In this case, you are responsible for its destruction (though items will be removed
 * automatically on synchronizer destruction anyway).
 * - If [[Lister.Config.target|target]]
 * is not passed, it will be created automatically. Synchronizer will select
 * appropriate [[target]] implementation (simple or observable). In this
 * case, [[target]] will be destroyed automatically on synchronizer destruction.
 * - You can convert multiple collections into one set, if all items are different.
 *
 * @param T Collection item type.
 */
interface ICollectionLister<T extends IClass> extends IClass {
	/**
	 * Target set.
	 */
	readonly target: ISet<T>;
}

export default ICollectionLister;
