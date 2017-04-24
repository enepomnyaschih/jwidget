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

import Class from '../Class';
import Dictionary from '../Dictionary';
import ICollection from '../ICollection';
import ICollectionIndexer from './ICollectionIndexer';
import ICollectionIndexerConfig from './ICollectionIndexerConfig';
import IMap from '../IMap';
import Map from '../Map';

/**
 * Collection indexer.
 * Builds new map by rule: key is the result of indexer function call, value is the corresponding item.
 * If original collection is observable, starts continuous synchronization.
 * Can be used for fast item search by key (for example, by ID).
 *
 *     interface Item {
 *         id: number;
 *         label: string;
 *     }
 *
 *     var array = new JW.ObservableArray<Item>([{id: 9, label: "The item"}]);
 *     var indexer = array.createIndexer({
 *         getKey: function(item) { return String(item.id); },
 *         scope: this
 *     });
 *     var map = indexer.target;
 *
 *     // Get an item with ID = 9
 *     assert.strictEqual(map.get(9).label, "The item");
 *     assert.strictEqual(map.get(5), undefined);
 *
 *     // Target map is automatically synchronized with original observable array
 *     array.add({id: 5, label: "New item"});
 *     assert.strictEqual(map.get(5).label, "New item");
 *
 *     indexer.destroy();
 *
 * **Notice:** All items of source collection must have different (unique) string keys.
 *
 * Use [[JW.AbstractCollection.createFilterer|createFilterer]] method to create the synchronizer.
 * The method selects a synchronizer implementation which fits better (simple or observable).
 *
 * You can pass target map in config option:
 *
 *     var map = new JW.Map();
 *     var indexer = collection.createIndexer({
 *         target: map,
 *         getKey: function(item) { return String(item.id); },
 *         scope: this
 *     });
 *
 * In simple cases, [[JW.AbstractCollection.$$index|$$index]] shorthand can be used instead.
 * It returns the target map right away:
 *
 *     var array = new JW.ObservableArray<Item>([{id: 9, label: "The item"}]);
 *     var map = array.$$index(function(item) { return String(item.id); });
 *
 *     // Get an item with ID = 9
 *     assert.strictEqual(map.get(9).label, "The item");
 *     assert.strictEqual(map.get(5), undefined);
 *
 *     // Target map is automatically synchronized with original observable array
 *     array.add({id: 5, label: "New item"});
 *     assert.strictEqual(map.get(5).label, "New item");
 *
 *     map.destroy();
 *
 * Synchronizer rules:
 *
 * - Target map is stored in [[target]] property.
 * - All items of source collection are added to [[target]] immediately
 * on synchronizer initialization.
 * - All items are removed from [[target]] on synchronizer destruction.
 * - You can pass target map in
 * [[Indexer.Config.target|target]] config option.
 * In this case, you are responsible for its destruction (though items will be removed
 * automatically on synchronizer destruction anyway).
 * - If [[Indexer.Config.target|target]]
 * is not passed, it will be created automatically. Synchronizer will select
 * appropriate [[target]] implementation (simple or observable). In this
 * case, [[target]] will be destroyed automatically on synchronizer destruction.
 * - You can index multiple collections into one map, if keys of all items are different.
 *
 * @param T Collection item type.
 */
abstract class AbstractCollectionIndexer<T> extends Class implements ICollectionIndexer<T> {
	private _targetCreated: boolean;

	/**
	 * @hidden
	 */
	protected _getKey: (item: T) => any;

	/**
	 * @hidden
	 */
	protected _scope: any;

	/**
	 * Target map.
	 */
	readonly target: IMap<T>;

	/**
	 * Creates synchronizer.
	 * [[JW.AbstractCollection.createIndexer|createIndexer]] method is preferred instead.
	 *
	 * @param source Source collection.
	 * @param config Configuration.
	 */
	constructor(readonly source: ICollection<T>, config: ICollectionIndexerConfig<T>) {
		super();
		this._getKey = config.getKey;
		this._scope = config.scope || this;
		this._targetCreated = config.target == null;
		this.target = this._targetCreated ? new Map<T>(source.silent) : config.target;
		this.target.trySetAll(this._index(source.asArray()));
	}

	/**
	 * @inheritdoc
	 */
	protected destroyObject() {
		this.target.tryRemoveAll(this._keys(this.source.asArray()));
		if (this._targetCreated) {
			this.target.destroy();
		}
		this._getKey = null;
		this._scope = null;
		super.destroyObject();
	}

	/**
	 * @hidden
	 */
	protected _index(items: T[]): Dictionary<T> {
		var index: Dictionary<T> = {};
		for (var i = 0, l = items.length; i < l; ++i) {
			var item = items[i];
			index[this._getKey.call(this._scope, item)] = item;
		}
		return index;
	}

	/**
	 * @hidden
	 */
	protected _keys(items: T[]): string[] {
		var keys: string[] = [];
		for (var i = 0, l = items.length; i < l; ++i) {
			keys.push(this._getKey.call(this._scope, items[i]));
		}
		return keys;
	}
}

export default AbstractCollectionIndexer;
