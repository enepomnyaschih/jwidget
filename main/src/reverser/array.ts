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
import DestroyableReadonlyBindableArray from '../DestroyableReadonlyBindableArray';
import IBindableArray from '../IBindableArray';
import IndexCount from '../IndexCount';
import IndexItems from '../IndexItems';
import BindableArray from '../BindableArray';
import ReadonlyBindableArray from '../ReadonlyBindableArray';

/**
 * Array reverser.
 */
class ArrayReverser<T> extends Class {
	private _targetCreated: boolean;
	private _target: IBindableArray<T>;

	/**
	 * @param source Source array.
	 * @param config Reverser configuration.
	 */
	constructor(readonly source: ReadonlyBindableArray<T>, config: ArrayReverser.Config<T> = {}) {
		super();
		this._targetCreated = config.target == null;
		this._target = this._targetCreated ? new BindableArray<T>(source.getKey, source.silent) : config.target;
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
	 * Target array.
	 */
	get target(): ReadonlyBindableArray<T> {
		return this._target;
	}

	private _reverse(items: T[]) {
		items = items.concat();
		items.reverse();
		return items;
	}

	private _onSplice(message: IBindableArray.SpliceMessage<T>) {
		var spliceResult = message.spliceResult;
		var oldLength = this._target.length.get();
		var newLength = oldLength;

		var segmentsToRemove = spliceResult.removedSegments.map((indexItems) => {
			var length = indexItems.items.length;
			var index = oldLength - indexItems.index - length;
			newLength -= length;
			return new IndexCount(index, length);
		});
		segmentsToRemove.reverse();

		var addedSegments = spliceResult.addedSegments.concat();
		addedSegments.reverse();

		addedSegments.forEach(indexItems => {
			newLength += indexItems.items.length;
		});

		var segmentsToAdd = addedSegments.map(indexItems => {
			var items = indexItems.items;
			var length = items.length;
			var index = newLength - indexItems.index - length;
			return new IndexItems<T>(index, this._reverse(items));
		});

		this._target.trySplice(segmentsToRemove, segmentsToAdd);
	}

	private _onReplace(message: IBindableArray.ReplaceMessage<T>) {
		this._target.trySet(this._target.length.get() - message.index - 1, message.newItem);
	}

	private _onMove(message: IBindableArray.MoveMessage<T>) {
		this._target.tryMove(
			this._target.length.get() - message.fromIndex - 1,
			this._target.length.get() - message.toIndex - 1);
	}

	private _onClear() {
		this._target.clear();
	}

	private _onReorder(message: IBindableArray.ReorderMessage<T>) {
		var indexArray = message.indexArray;
		var length = indexArray.length;
		var indexes = new Array<number>(indexArray.length);
		for (var i = 0; i < length; ++i) {
			indexes[length - i - 1] = length - indexArray[i] - 1;
		}
		this._target.tryReorder(indexes);
	}
}

export default ArrayReverser;

namespace ArrayReverser {
	/**
	 * ArrayReverser configuration.
	 */
	export interface Config<T> {
		/**
		 * Target array. By default, created automatically.
		 */
		readonly target?: IBindableArray<T>;
	}
}

/**
 * Reverses arrays and starts synchronization.
 * @param source Source array.
 * @returns Reversed array.
 */
export function reverseArray<T>(source: ReadonlyBindableArray<T>): DestroyableReadonlyBindableArray<T> {
	if (source.silent) {
		return source.toReversed();
	}
	const target = new BindableArray<T>(source.getKey);
	return target.owning(new ArrayReverser<T>(source, {target}));
}
