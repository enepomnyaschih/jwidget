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
import DestroyableReadonlyList from '../DestroyableReadonlyList';
import IList from '../IList';
import IndexCount from '../IndexCount';
import IndexItems from '../IndexItems';
import List from '../List';
import ReadonlyList from '../ReadonlyList';

/**
 * List reverser.
 * @param T List item type.
 */
class ListReverser<T> extends Class {
	private _targetCreated: boolean;
	private _target: IList<T>;

	/**
	 * @param source Source list.
	 * @param config Reverser configuration.
	 */
	constructor(readonly source: ReadonlyList<T>, config: ListReverser.Config<T> = {}) {
		super();
		this._targetCreated = config.target == null;
		this._target = this._targetCreated ? new List<T>(source.getKey, source.silent) : config.target;
		this._target.addAll(this._reverse(source.items));
		this.own(source.spliceEvent.listen(this._onSplice, this));
		this.own(source.replaceEvent.listen(this._onReplace, this));
		this.own(source.moveEvent.listen(this._onMove, this));
		this.own(source.clearEvent.listen(this._onClear, this));
		this.own(source.reorderEvent.listen(this._onReorder, this));
	}

	/**
	 * @inheritDoc
	 */
	protected destroyObject() {
		this._target.clear();
		if (this._targetCreated) {
			this._target.destroy();
		}
		super.destroyObject();
	}

	/**
	 * Target list.
	 */
	get target(): ReadonlyList<T> {
		return this._target;
	}

	private _reverse(items: T[]) {
		items = items.concat();
		items.reverse();
		return items;
	}

	private _onSplice(params: IList.SpliceEventParams<T>) {
		var spliceResult = params.spliceResult;
		var oldLength = this._target.length.get();
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

		this._target.trySplice(removeParamsList, addParamsList);
	}

	private _onReplace(params: IList.ReplaceEventParams<T>) {
		this._target.trySet(this._target.length.get() - params.index - 1, params.newItem);
	}

	private _onMove(params: IList.MoveEventParams<T>) {
		this._target.tryMove(
			this._target.length.get() - params.fromIndex - 1,
			this._target.length.get() - params.toIndex - 1);
	}

	private _onClear() {
		this._target.clear();
	}

	private _onReorder(params: IList.ReorderEventParams<T>) {
		var indexArray = params.indexArray;
		var length = indexArray.length;
		var indexes = new Array<number>(indexArray.length);
		for (var i = 0; i < length; ++i) {
			indexes[length - i - 1] = length - indexArray[i] - 1;
		}
		this._target.tryReorder(indexes);
	}
}

export default ListReverser;

namespace ListReverser {
	/**
	 * ListReverser configuration.
	 * @param T List item type.
	 */
	export interface Config<T> {
		/**
		 * Target list. By default, created automatically.
		 */
		readonly target?: IList<T>;
	}
}

/**
 * Reverses lists and starts synchronization.
 * @param source Source list.
 * @returns Reversed list.
 */
export function reverseList<T>(source: ReadonlyList<T>): DestroyableReadonlyList<T> {
	if (source.silent) {
		return source.toReversed();
	}
	const target = new List<T>(source.getKey);
	return target.owning(new ListReverser<T>(source, {target}));
}
