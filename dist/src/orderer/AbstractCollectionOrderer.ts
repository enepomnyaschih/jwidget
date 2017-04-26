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

import Class from '../Class';
import Dictionary from '../Dictionary';
import IList from '../IList';
import IClass from '../IClass';
import ICollection from '../ICollection';
import IndexItems from '../IndexItems';
import List from '../List';
import * as DictionaryUtils from '../DictionaryUtils';

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
abstract class AbstractCollectionOrderer<T extends IClass> extends Class {
	private _targetCreated: boolean;

	/**
	 * Target array.
	 */
	readonly target: IList<T>;

	/**
	 * Creates synchronizer.
	 * [[JW.AbstractCollection.createOrderer|createOrderer]] method is preferred instead.
	 *
	 * @param source Source collection.
	 * @param config Configuration.
	 */
	constructor(readonly source: ICollection<T>, config: AbstractCollectionOrderer.Config<T> = {}) {
		super();
		this._targetCreated = config.target == null;
		this.target = this._targetCreated ? new List<T>(source.silent) : config.target;
		this.target.tryAddAll(source.asArray());
	}

	/**
	 * @inheritdoc
	 */
	protected destroyObject() {
		this.target.removeItems(this.source.asArray());
		if (this._targetCreated) {
			this.target.destroy();
		}
		super.destroyObject();
	}

	/**
	 * @hidden
	 */
	protected _splice(removedItemsSet: Dictionary<T>, addedItemsSet: Dictionary<T>) {
		var filteredItems = this.target.filter((item) => {
			return !removedItemsSet.hasOwnProperty(String(item.iid)) || !addedItemsSet.hasOwnProperty(String(item.iid));
		});
		var addedItems = DictionaryUtils.toArray(addedItemsSet).filter((item) => {
			return !removedItemsSet.hasOwnProperty(String(item.iid));
		});
		this.target.trySplice(
			this.target.detectFilter(filteredItems) || [],
			[new IndexItems(filteredItems.length, addedItems)]);
	}
}

export default AbstractCollectionOrderer;

namespace AbstractCollectionOrderer {
	/**
	 * [[JW.AbstractCollection.Orderer]] configuration.
	 *
	 * @param T Collection item type.
	 */
	export interface Config<T extends IClass> {
		/**
		 * Target array. By default, created automatically.
		 */
		readonly target?: IList<T>;
	}
}
