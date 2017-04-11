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

import {default as ObservableArray, ArrayReplaceEventParams, ArraySpliceEventParams} from '../../ObservableArray';
import ArrayCounter from './ArrayCounter';
import ICollectionCounterConfig from '../ICollectionCounterConfig';
import * as ArrayUtils from '../../ArrayUtils';

/**
 * [[JW.AbstractCollection.Counter|Counter]] implementation for [[JW.ObservableArray]].
 */
export default class ObservableArrayCounter<T> extends ArrayCounter<T> {
	/**
	 * @inheritdoc
	 */
	constructor(source: ObservableArray<T>, config: ICollectionCounterConfig<T>) {
		super(source, config);
		this.own(source.spliceEvent.bind(this._onSplice, this));
		this.own(source.replaceEvent.bind(this._onReplace, this));
		this.own(source.clearEvent.bind(this._onClear, this));
	}

	private _onSplice(params: ArraySpliceEventParams<T>) {
		var spliceResult = params.spliceResult;
		var value = this.target.get();
		spliceResult.removedItemsList.forEach((indexItems) => {
			value -= ArrayUtils.count(indexItems.items, this._filterItem, this._scope);
		});
		spliceResult.addedItemsList.forEach((indexItems) => {
			value += ArrayUtils.count(indexItems.items, this._filterItem, this._scope);
		});
		this.target.set(value);
	}

	private _onReplace(params: ArrayReplaceEventParams<T>) {
		var oldFiltered = this._filterItem.call(this._scope, params.oldItem) !== false;
		var newFiltered = this._filterItem.call(this._scope, params.newItem) !== false;
		if (oldFiltered && !newFiltered) {
			this.target.set(this.target.get() - 1);
		} else if (!oldFiltered && newFiltered) {
			this.target.set(this.target.get() + 1);
		}
	}

	private _onClear() {
		this.target.set(0);
	}
}
