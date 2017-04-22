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
import ICollectionCounterReconfig from './ICollectionCounterReconfig';
import Watchable from '../Watchable';

/**
 * Counter for collection items which match the specified filter.
 * Builds new JW.Property&lt;number&gt;, containing the number of items for which callback
 * function returns !== false.
 * If original collection is observable, starts continuous synchronization.
 *
 *     var source = new JW.ObservableArray<number>([1, 2, 3]);
 *     var counter = source.createCounter({
 *         filterItem: function(x) { return x % 2 === 1; }
 *     });
 *     var target = counter.target;
 *     assert.strictEqual(target.get(), 2); // two odd numbers: 1, 3
 *
 *     source.addAll([4, 7, 1, 6]);
 *     assert.strictEqual(target.get(), 4); // four odd numbers: 1, 3, 7, 1
 *
 *     counter.destroy();
 *
 * Use [[JW.AbstractCollection.createCounter|createCounter]] method to create the synchronizer.
 * The method selects a synchronizer implementation which fits better (simple or observable).
 *
 * You can pass target property in config option:
 *
 *     var source = new JW.ObservableSet();
 *     var target = new JW.Property<number>(0);
 *     var counter = source.createCounter({
 *         target: target,
 *         filterItem: this._filterItem,
 *         scope: this
 *     });
 *
 * In simple cases, [[JW.AbstractCollection.$$count|$$count]] shorthand can be used instead.
 * It returns the target property right away:
 *
 *     var source = new JW.ObservableArray<number>([1, 2, 3]);
 *     var target = source.$$count(function(x) { return x % 2 === 1; });
 *     assert.strictEqual(target.get(), 2); // two odd numbers: 1, 3
 *
 *     source.addAll([4, 7, 1, 6]);
 *     assert.strictEqual(target.get(), 4); // four odd numbers: 1, 3, 7, 1
 *
 *     target.destroy();
 *
 * You may use [[JW.AbstractCollection.Filterer|Filterer]] instead
 * of counter, but counter works much faster because it doesn't create a filtered collection.
 *
 *     var source = new JW.ObservableArray();
 *
 *     // via filterer
 *     var filterer = source.createFilterer({
 *         filterItem: this._filterItem,
 *         scope: this
 *     });
 *     var count = filterer.target.length; // JW.Property<number>
 *
 *     // via counter, works faster
 *     var counter = source.createCounter({
 *         filterItem: this._filterItem,
 *         scope: this
 *     });
 *     var count = counter.target; // JW.Property<number>
 *
 * Counter works correctly for observable collections only.
 *
 * @param T Collection item type.
 */
interface ICollectionCounter<T> extends IClass {
	/**
	 * Target property.
	 */
	target: Watchable<number>;

	/**
	 * Changes counter configuration and recounts matching items.
	 * @param config Options to modify.
	 */
	reconfigure(config: ICollectionCounterReconfig<T>): void;

	/**
	 * Recounts matching items. Call this method when collection item properties change the way that
	 * they must be refiltered.
	 */
	recount(): void;
}

export default ICollectionCounter;
