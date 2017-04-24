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

import IArray from '../../IArray';
import ArrayReverser from './ArrayReverser';
import IArrayReverser from './IArrayReverser';
import IndexCount from '../../IndexCount';
import IndexItems from '../../IndexItems';

/**
 * [[JW.List.Reverser|Reverser]] implementation for [[JW.ObservableArray]].
 */
export default class ObservableArrayReverser<T> extends ArrayReverser<T> {
	/**
	 * @inheritdoc
	 */
	constructor(source: IArray<T>, config?: IArrayReverser.Config<T>) {
		super(source, config);
		this.own(source.spliceEvent.bind(this._onSplice, this));
		this.own(source.replaceEvent.bind(this._onReplace, this));
		this.own(source.moveEvent.bind(this._onMove, this));
		this.own(source.clearEvent.bind(this._onClear, this));
		this.own(source.reorderEvent.bind(this._onReorder, this));
	}

	private _onSplice(params: IArray.SpliceEventParams<T>) {
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

	private _onReplace(params: IArray.ReplaceEventParams<T>) {
		this.target.trySet(params.newItem, this.target.length.get() - params.index - 1);
	}

	private _onMove(params: IArray.MoveEventParams<T>) {
		this.target.tryMove(
			this.target.length.get() - params.fromIndex - 1,
			this.target.length.get() - params.toIndex - 1);
	}

	private _onClear() {
		this.target.tryClear();
	}

	private _onReorder(params: IArray.ReorderEventParams<T>) {
		var indexArray = params.indexArray;
		var length = indexArray.length;
		var indexes = new Array<number>(indexArray.length);
		for (var i = 0; i < length; ++i) {
			indexes[length - i - 1] = length - indexArray[i] - 1;
		}
		this.target.tryReorder(indexes);
	}
}
