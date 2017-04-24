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

import Class from '../../Class';
import IArray from '../../IArray';
import IArrayReverser from './IArrayReverser';
import IArrayReverserConfig from './IArrayReverserConfig';
import List from '../../List';

/**
 * Array reverser. Builds array containing all items of source array in reversed order.
 * If original collection is observable, starts continuous synchronization.
 *
 *     var source = new JW.ObservableArray([1, 2, 3]);
 *     var reverser = source.createReverser();
 *     var target = reverser.target;
 *     assert(target.equal([3, 2, 1]));
 *
 *     source.add(4);
 *     assert(target.equal([4, 3, 2, 1]));
 *
 *     source.remove(2);
 *     assert(target.equal([4, 2, 1]));
 *
 *     reverser.destroy();
 *
 * Use [[JW.List.createReverser|createReverser]] method to create the synchronizer.
 * The method will select which synchronizer implementation fits better (simple or observable).
 *
 * You can pass target array in config option:
 *
 *     var source = new JW.Array();
 *     var target = new JW.Array();
 *     var reverser = source.createReverser({
 *         target: target
 *     });
 *
 * In simple cases, [[JW.List.$$toReversed|$$toReversed]] shorthand can be used instead. It returns the target array right away:
 *
 *     var source = new JW.ObservableArray([1, 2, 3]);
 *     var target = source.$$toReversed();
 *     assert(target.equal([3, 2, 1]));
 *
 *     source.add(4);
 *     assert(target.equal([4, 3, 2, 1]));
 *
 *     source.remove(2);
 *     assert(target.equal([4, 2, 1]));
 *
 *     target.destroy();
 *
 * Synchronizer rules:
 *
 * - Target array is stored in [[target]] property.
 * - Target array must be empty before initialization.
 * - You can't modify target array manually and/or create other synchronizers with the same target array.
 * - All items of source array are added to [[target]]
 * immediately on synchronizer initialization.
 * - All items are removed from [[target]] on synchronizer destruction.
 * - You can pass target array in [[Reverser.Config.target|target]] config option.
 * In this case, you are responsible for its destruction (though items will be removed
 * automatically on synchronizer destruction anyway).
 * - If [[Reverser.Config.target|target]]
 * is not passed, it will be created automatically. Synchronizer will select
 * appropriate [[target]] implementation (simple or observable). In this
 * case, [[target]] will be destroyed automatically on synchronizer destruction.
 *
 * @param T Array item type.
 */
export default class ArrayReverser<T> extends Class implements IArrayReverser<T> {
	private _targetCreated: boolean;

	/**
	 * Target array.
	 */
	readonly target: IArray<T>;

	/**
	 * Creates synchronizer.
	 * [[JW.List.createReverser|createReverser]] method is preferred instead.
	 *
	 * @param source Source array.
	 * @param config Configuration.
	 */
	constructor(readonly source: IArray<T>, config: IArrayReverserConfig<T> = {}) {
		super();
		this._targetCreated = config.target == null;
		this.target = this._targetCreated ? new List<T>(source.silent) : config.target;
		this.target.tryAddAll(this._reverse(source.items));
	}

	/**
	 * @inheritdoc
	 */
	destroyObject() {
		this.target.tryClear();
		if (this._targetCreated) {
			this.target.destroy();
		}
		super.destroyObject();
	}

	/**
	 * @hidden
	 */
	protected _reverse(items: T[]) {
		items = items.concat();
		items.reverse();
		return items;
	}
}
