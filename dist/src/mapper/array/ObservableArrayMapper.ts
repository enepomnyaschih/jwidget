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
import IArray from '../../IArray';
import ArrayMapper from './ArrayMapper';
import IArrayMapperConfig from './IArrayMapperConfig';
import IIndexItems from '../../IIndexItems';
import IndexItems from '../../IndexItems';

/**
 * [[JW.AbstractCollection.Mapper|Mapper]] implementation for [[JW.ObservableArray]].
 */
export default class Mapper<T, U> extends ArrayMapper<T, U> {
	/**
	 * @inheritdoc
	 */
	constructor(source: IArray<T>, config: IArrayMapperConfig<T, U>) {
		super(source, config);
		this.own(source.spliceEvent.bind(this._onSplice, this));
		this.own(source.replaceEvent.bind(this._onReplace, this));
		this.own(source.moveEvent.bind(this._onMove, this));
		this.own(source.clearEvent.bind(this._onClear, this));
		this.own(source.reorderEvent.bind(this._onReorder, this));
	}

	private _onSplice(params: ArraySpliceEventParams<T>) {
		var sourceResult = params.spliceResult;
		var sourceAddedItemsList = sourceResult.addedItemsList;
		var targetAddParamsList: IIndexItems<U>[] = [];
		for (var i = 0, l = sourceAddedItemsList.length; i < l; ++i) {
			var addParams = sourceAddedItemsList[i];
			targetAddParamsList.push(new IndexItems(
				addParams.index, this._createItems(addParams.items)));
		}
		var targetResult = this.target.trySplice(sourceResult.removeParamsList, targetAddParamsList);
		var sourceRemovedItemsList = sourceResult.removedItemsList;
		var targetRemovedItemsList = targetResult.removedItemsList;
		for (var i = targetRemovedItemsList.length - 1; i >= 0; --i) {
			this._destroyItems(targetRemovedItemsList[i].items, sourceRemovedItemsList[i].items);
		}
	}

	private _onReplace(params: ArrayReplaceEventParams<T>) {
		var newItem = this._createItem.call(this._scope, params.newItem);
		var oldItem = this.target.trySet(newItem, params.index).value;
		this._destroyItem.call(this._scope, oldItem, params.oldItem);
	}

	private _onMove(params: ArrayMoveEventParams<T>) {
		this.target.tryMove(params.fromIndex, params.toIndex);
	}

	private _onClear(params: ArrayItemsEventParams<T>) {
		this._destroyItems(this.target.tryClear(), params.items);
	}

	private _onReorder(params: ArrayReorderEventParams<T>) {
		this.target.tryReorder(params.indexArray);
	}
}
