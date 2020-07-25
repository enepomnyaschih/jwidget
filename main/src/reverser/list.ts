/*
MIT License

Copyright (c) 2020 Egor Nepomnyaschih

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
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
		this.own(source.onSplice.listen(this._onSplice, this));
		this.own(source.onReplace.listen(this._onReplace, this));
		this.own(source.onMove.listen(this._onMove, this));
		this.own(source.onClear.listen(this._onClear, this));
		this.own(source.onReorder.listen(this._onReorder, this));
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

	private _onSplice(params: IList.SpliceMessage<T>) {
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

	private _onReplace(params: IList.ReplaceMessage<T>) {
		this._target.trySet(this._target.length.get() - params.index - 1, params.newItem);
	}

	private _onMove(params: IList.MoveMessage<T>) {
		this._target.tryMove(
			this._target.length.get() - params.fromIndex - 1,
			this._target.length.get() - params.toIndex - 1);
	}

	private _onClear() {
		this._target.clear();
	}

	private _onReorder(params: IList.ReorderMessage<T>) {
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
