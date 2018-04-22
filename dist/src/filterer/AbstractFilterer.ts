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
import ReadOnlyCollection from '../ReadOnlyCollection';

/**
 * Collection filterer.
 * Builds new collection of the same type, consisting of items for which callback
 * function returns !== false.
 * If original collection is observable, starts continuous synchronization.
 * Keeps item order in array.
 *
 *     var source = new JW.ObservableArray<number>([1, 2, 3]);
 *     var filterer = source.createFilterer({
 *         filterItem: function(x) { return x % 2 === 1; }
 *     });
 *     var target = filterer.target;
 *     assert.ok(target.equal([1, 3]));
 *
 *     source.addAll([4, 7, 1, 6]);
 *     assert.ok(target.equal([1, 3, 7, 1]));
 *
 *     source.move(2, 6); // move "3" item to the end
 *     assert.ok(target.equal([1, 7, 1, 3]));
 *
 *     filterer.destroy();
 *
 * Use [[JW.Abstract.createFilterer|createFilterer]] method to create the synchronizer.
 * The method selects a synchronizer implementation which fits better (simple or observable).
 *
 * You can pass target collection in config option:
 *
 *     var source = new JW.ObservableSet();
 *     var target = new JW.Set();
 *     var filterer = source.createFilterer({
 *         target: target,
 *         filterItem: this._filterItem,
 *         scope: this
 *     });
 *
 * In simple cases, [[JW.Abstract.$filter|$filter]] shorthand can be used instead.
 * It returns the target collection right away:
 *
 *     var source = new JW.ObservableArray<number>([1, 2, 3]);
 *     var target = source.$filter(function(x) { return x % 2 === 1; });
 *     assert.ok(target.equal([1, 3]));
 *
 *     source.addAll([4, 7, 1, 6]);
 *     assert.ok(target.equal([1, 3, 7, 1]));
 *
 *     source.move(2, 6); // move "3" item to the end
 *     assert.ok(target.equal([1, 7, 1, 3]));
 *
 *     target.destroy();
 *
 * Synchronizer rules:
 *
 * - Target collection is stored in [[target]] property.
 * - Filtered items are added to [[target]] immediately on synchronizer initialization.
 * - All items are removed from [[target]] on synchronizer destruction.
 * - You can pass target collection in
 * [[Filterer.Config.target|target]] config option.
 * In this case, you are responsible for its destruction (though items will be removed
 * automatically on synchronizer destruction anyway).
 * - If [[Filterer.Config.target|target]]
 * is not passed, it will be created automatically. Synchronizer will select
 * appropriate [[target]] implementation (simple or observable). In this
 * case, [[target]] will be destroyed automatically on synchronizer destruction.
 *
 * **Additional rules for different collection types**
 *
 * [[JW.List]]:
 *
 * - Target collection must be empty before initialization.
 * - A target collection can be synchronized with one source collection only.
 *
 * [[JW.Map]]:
 *
 * - A target collection can be synchronized with multiple source collections, if keys of all items are different.
 * - You can add items to target collection manually, if their keys differ from source collection keys.
 *
 * [[JW.Set]]:
 *
 * - A target collection can be synchronized with multiple source collections, if all items are different.
 * - You can add items to target collection manually, if they differ from source collection items.
 *
 * @param T Collection item type.
 */
abstract class AbstractFilterer<T> extends Class {
	/**
	 * @hidden
	 */
	protected _scope: any;

	/**
	 * Target collection.
	 */
	readonly target: ReadOnlyCollection<T>;

	/**
	 * Creates synchronizer.
	 * [[JW.Abstract.createFilterer|createFilterer]] method is preferred instead.
	 *
	 * @param source Source collection.
	 * @param config Configuration.
	 */
	constructor(readonly source: ReadOnlyCollection<T>, protected _test: (item: T) => any,
				config: AbstractFilterer.Config = {}) {
		super();
		this._scope = config.scope || this;
	}

	/**
	 * @inheritdoc
	 */
	protected destroyObject() {
		this._test = null;
		this._scope = null;
		super.destroyObject();
	}
}

export default AbstractFilterer;

namespace AbstractFilterer {
	/**
	 * [[JW.Abstract.Filterer]] configuration.
	 *
	 * @param T Collection item type.
	 */
	export interface Config {
		/**
		 * [[filterItem]] call scope.
		 * Defaults to synchronizer itself.
		 */
		readonly scope?: any;
	}
}
