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

import {ArrayItemsEventParams, ArrayMoveEventParams, ArrayReorderEventParams, ArrayReplaceEventParams, ArraySpliceEventParams} from '../../IArray';
import Class from '../../Class';
import IArray from '../../IArray';
import IndexCount from '../../IndexCount';
import IndexItems from '../../IndexItems';

/**
 * @hidden
 */
export default class Bunch<T> extends Class {
	private source: IArray<IArray<T>>;
	private target: IArray<T>;
	private bunch: IArray<T>;

	constructor(source: IArray<IArray<T>>, target: IArray<T>, bunch: IArray<T>) {
		super();
		this.source = source;
		this.target = target;
		this.bunch = bunch;
		this.own(bunch.spliceEvent.bind(this._onSplice, this));
		this.own(bunch.replaceEvent.bind(this._onReplace, this));
		this.own(bunch.moveEvent.bind(this._onMove, this));
		this.own(bunch.clearEvent.bind(this._onClear, this));
		this.own(bunch.reorderEvent.bind(this._onReorder, this));
	}

	private _getIndex(): number {
		var bunches = this.source.items;
		var index = 0;
		for (var i = 0, l = bunches.length; i < l; ++i) {
			var bunch = bunches[i];
			if (bunch === this.bunch) {
				return index;
			}
			index += bunch.length.get();
		}
		console.warn("JW.ObservableArray.Merger object is corrupted");
		return 0;
	}

	private _onSplice(params: ArraySpliceEventParams<T>) {
		var spliceResult = params.spliceResult;
		var index = this._getIndex();
		var removeParamsList = spliceResult.removedItemsList.map((indexItems) => {
			return new IndexCount(indexItems.index + index, indexItems.items.length);
		});
		var addParamsList = spliceResult.addedItemsList.map((indexItems) => {
			return new IndexItems<T>(indexItems.index + index, indexItems.items.concat());
		});
		this.target.trySplice(removeParamsList, addParamsList);
	}

	private _onReplace(params: ArrayReplaceEventParams<T>) {
		this.target.trySet(params.newItem, this._getIndex() + params.index);
	}

	private _onMove(params: ArrayMoveEventParams<T>) {
		var index = this._getIndex();
		this.target.tryMove(index + params.fromIndex, index + params.toIndex);
	}

	private _onClear(params: ArrayItemsEventParams<T>) {
		this.target.tryRemoveAll(this._getIndex(), params.items.length);
	}

	private _onReorder(params: ArrayReorderEventParams<T>) {
		var index = this._getIndex();
		var bunchIndexArray = params.indexArray;
		var bunchLength = bunchIndexArray.length;
		var targetLength = this.target.length.get();
		var targetIndexArray = new Array<number>(targetLength);
		for (var i = 0; i < index; ++i) {
			targetIndexArray[i] = i;
		}
		for (var i = 0; i < bunchLength; ++i) {
			targetIndexArray[index + i] = index + bunchIndexArray[i];
		}
		for (var i = index + bunchLength; i < targetLength; ++i) {
			targetIndexArray[i] = i;
		}
		this.target.tryReorder(targetIndexArray);
	}
}
