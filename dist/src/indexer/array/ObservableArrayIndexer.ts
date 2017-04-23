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

import {ArrayItemsEventParams, ArrayReplaceEventParams, ArraySpliceEventParams} from '../../IArray';
import IArray from '../../IArray';
import ArrayIndexer from './ArrayIndexer';
import ICollectionIndexerConfig from '../ICollectionIndexerConfig';

/**
 * [[JW.AbstractCollection.Indexer|Indexer]] implementation for [[JW.ObservableArray]].
 */
export default class ObservableArrayIndexer<T> extends ArrayIndexer<T> {
	/**
	 * @inheritdoc
	 */
	constructor(source: IArray<T>, config: ICollectionIndexerConfig<T>) {
		super(source, config);
		this.own(source.spliceEvent.bind(this._onSplice, this));
		this.own(source.replaceEvent.bind(this._onReplace, this));
		this.own(source.clearEvent.bind(this._onClear, this));
	}

	private _onSplice(params: ArraySpliceEventParams<T>) {
		var spliceResult = params.spliceResult;
		this.target.trySplice(
			this._keys(spliceResult.getRemovedItems()),
			this._index(spliceResult.getAddedItems()));
	}

	private _onReplace(params: ArrayReplaceEventParams<T>) {
		this.target.trySplice(
			this._keys([params.oldItem]),
			this._index([params.newItem]));
	}

	private _onClear(params: ArrayItemsEventParams<T>) {
		this.target.tryRemoveAll(
			this._keys(params.items));
	}
}
