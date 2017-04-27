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
import IList from '../IList';
import IndexCount from '../IndexCount';
import IndexItems from '../IndexItems';
import List from '../List';

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
class ListReverser<T> extends Class {
	private _targetCreated: boolean;

	/**
	 * Target array.
	 */
	readonly target: IList<T>;

	/**
	 * Creates synchronizer.
	 * [[JW.List.createReverser|createReverser]] method is preferred instead.
	 *
	 * @param source Source array.
	 * @param config Configuration.
	 */
	constructor(readonly source: IList<T>, config: ListReverser.Config<T> = {}) {
		super();
		this._targetCreated = config.target == null;
		this.target = this._targetCreated ? new List<T>(source.getKey, source.silent) : config.target;
		this.target.tryAddAll(this._reverse(source.items));
		this.own(source.spliceEvent.listen(this._onSplice, this));
		this.own(source.replaceEvent.listen(this._onReplace, this));
		this.own(source.moveEvent.listen(this._onMove, this));
		this.own(source.clearEvent.listen(this._onClear, this));
		this.own(source.reorderEvent.listen(this._onReorder, this));
	}

	/**
	 * @inheritdoc
	 */
	destroyObject() {
		this.target.clear();
		if (this._targetCreated) {
			this.target.destroy();
		}
		super.destroyObject();
	}

	private _reverse(items: T[]) {
		items = items.concat();
		items.reverse();
		return items;
	}

	private _onSplice(params: IList.SpliceEventParams<T>) {
		var spliceResult = params.spliceResult;
		var oldLength = this.target.length.get();
		var newLength = oldLength;

		var removeParamsList = spliceResult.removedItemsList.map((indexItems) => {
			var length = indexItems.items.length;
			var index = oldLength - indexItems.index - length;
			newLength -= length;
			return new IndexCount(index, length);
		});
		removeParamsList.reverse();

		var addedItemsList = spliceResult.addedItemsList.concat();
		addedItemsList.reverse();

		addedItemsList.forEach((indexItems) => {
			newLength += indexItems.items.length;
		});

		var addParamsList = addedItemsList.map((indexItems) => {
			var items = indexItems.items;
			var length = items.length;
			var index = newLength - indexItems.index - length;
			return new IndexItems<T>(index, this._reverse(items));
		});

		this.target.trySplice(removeParamsList, addParamsList);
	}

	private _onReplace(params: IList.ReplaceEventParams<T>) {
		this.target.trySet(params.newItem, this.target.length.get() - params.index - 1);
	}

	private _onMove(params: IList.MoveEventParams<T>) {
		this.target.tryMove(
			this.target.length.get() - params.fromIndex - 1,
			this.target.length.get() - params.toIndex - 1);
	}

	private _onClear() {
		this.target.clear();
	}

	private _onReorder(params: IList.ReorderEventParams<T>) {
		var indexArray = params.indexArray;
		var length = indexArray.length;
		var indexes = new Array<number>(indexArray.length);
		for (var i = 0; i < length; ++i) {
			indexes[length - i - 1] = length - indexArray[i] - 1;
		}
		this.target.tryReorder(indexes);
	}
}

export default ListReverser;

namespace ListReverser {
	/**
	 * [[JW.List.Reverser]] configuration.
	 *
	 * @param T Collection item type.
	 */
	export interface Config<T> {
		/**
		 * Target array. By default, created automatically.
		 */
		readonly target?: IList<T>;
	}
}

export function reverseList<T>(source: IList<T>): IList<T> {
	if (source.silent) {
		return source.$toReversed();
	}
	const result = new List<T>(source.getKey);
	return result.owning(new ListReverser<T>(source, {
		target: result
	}));
}
