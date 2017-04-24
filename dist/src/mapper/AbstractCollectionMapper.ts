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
import ICollection from '../ICollection';

/**
 * Collection item converter.
 * Builds new collection of the same type, consisting of results of callback function
 * call for each collection item.
 * If original collection is observable, starts continuous synchronization.
 *
 *     var source = new JW.ObservableArray<number>([1, 2]);
 *     var mapper = source.createMapper<number>({
 *         createItem: function(x) { return 2 * x }
 *     });
 *     var target = source.target;
 *
 *     assert.strictEqual(target.get(0), 2);
 *     assert.strictEqual(target.get(1), 4);
 *
 *     // Target collection is automatically synchronized with original observable collection
 *     source.add(3);
 *     assert.strictEqual(target.get(2), 6);
 *
 *     mapper.destroy();
 *
 * Can be used for data convertion into view.
 *
 *     var mapper = dataCollection.createMapper<View>({
 *         createItem: (data) => { return new View(this, data); },
 *         destroyItem: JW.destroy,
 *         scope: this
 *     });
 *     var viewCollection = mapper.target;
 *
 * Use [[JW.AbstractCollection.createMapper|createMapper]] method to create the synchronizer.
 * The method selects a synchronizer implementation which fits better (simple or observable).
 *
 * You can pass target collection in config option:
 *
 *     var viewCollection = new JW.Array<View>();
 *     var mapper = dataCollection.createMapper<View>({
 *         target: viewCollection,
 *         createItem: (data) => { return new View(this, data); },
 *         destroyItem: JW.destroy,
 *         scope: this
 *     });
 *
 * In simple cases, [[JW.AbstractCollection.$$mapValues|$$mapValues]]
 * and [[JW.AbstractCollection.$$mapObjects|$$mapObjects]] shorthands can be used instead.
 * They return the target collection right away:
 *
 *     var viewCollection = dataCollection.$$mapObjects<View>((data) => {
 *         return new View(this, data);
 *     }, this);
 *
 *     // Once not needed anymore, destroy
 *     viewCollection.destroy();
 *
 * Synchronizer rules:
 *
 * - Target collection is stored in [[target]] property.
 * - All items of source collection are converted and added to [[target]]
 * immediately on synchronizer initialization.
 * - All items are removed from [[target]] and destroyed on synchronizer destruction.
 * - You can pass target map in
 * [[Mapper.Config.target|target]] config option.
 * In this case, you are responsible for its destruction (though items will be removed and destroyed
 * automatically on synchronizer destruction anyway).
 * - If [[Mapper.Config.target|target]]
 * is not passed, it will be created automatically. Synchronizer will select
 * appropriate [[target]] implementation (simple or observable). In this
 * case, [[target]] will be destroyed automatically on synchronizer destruction.
 * - The items are not recreated in target collection on source items reordering/reindexing,
 * but they are reordered/reindexed according to source collection modification.
 *
 * **Additional rules for different collection types**
 *
 * [[JW.List]]:
 *
 * - Target collection must be empty before initialization.
 * - You can't modify target collection manually and/or create other synchronizers with the same target collection.
 *
 * [[JW.Map]]:
 *
 * - A target collection can be synchronized with multiple source collections, if keys of all items are different.
 * - You can add items to target collection manually, if their keys differ from other collection keys.
 *
 * [[JW.Set]]:
 *
 * - A target collection can be synchronized with multiple source collections, if all items are different.
 * - You can add items to target collection manually, if they differ from other collection items.
 *
 * @param T Source collection item type.
 * @param U Target collection item type.
 */
abstract class AbstractCollectionMapper<T, U> extends Class {
	/**
	 * @hidden
	 */
	protected _create: (data: T) => U;

	/**
	 * @hidden
	 */
	protected _destroy: (item: U, data: T) => void;

	/**
	 * @hidden
	 */
	protected _scope: any;

	/**
	 * Target collection.
	 */
	readonly target: ICollection<U>;

	/**
	 * Creates synchronizer.
	 * [[JW.AbstractCollection.createMapper|createMapper]] method is preferred instead.
	 *
	 * @param source Source collection.
	 * @param config Configuration.
	 */
	constructor(readonly source: ICollection<T>, config: AbstractCollectionMapper.Config<T, U>) {
		super();
		this._create = config.create;
		this._destroy = config.destroy;
		this._scope = config.scope || this;
	}

	/**
	 * @inheritdoc
	 */
	protected destroyObject() {
		this._create = null;
		this._destroy = null;
		this._scope = null;
		super.destroyObject();
	}
}

export default AbstractCollectionMapper;

namespace AbstractCollectionMapper {
	/**
	 * [[JW.AbstractCollection.Mapper]] configuration.
	 *
	 * @param T Source collection item type.
	 * @param U Target collection item type.
	 */
	export interface Config<T, U> {
		/**
		 * Mapping function. Creates an item of target collection by item of source collection.
		 */
		readonly create: (data: T) => U;

		/**
		 * Item destructor. Destroys an item of target collection.
		 */
		readonly destroy?: (item: U, data: T) => void;

		/**
		 * [[createItem]] and [[destroyItem]] call scope.
		 * Defaults to synchronizer itself.
		 */
		readonly scope?: any;
	}
}
