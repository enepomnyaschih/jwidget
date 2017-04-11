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

import {default as ObservableSet, SetItemsEventParams, SetSpliceEventParams} from '../../ObservableSet';
import IClass from '../../IClass';
import ICollectionIndexerConfig from '../ICollectionIndexerConfig';
import SetIndexer from './SetIndexer';

/**
 * [[JW.AbstractCollection.Indexer|Indexer]] implementation for [[JW.ObservableSet]].
 */
export default class ObservableSetIndexer<T extends IClass> extends SetIndexer<T> {
	/**
	 * @inheritdoc
	 */
	constructor(source: ObservableSet<T>, config: ICollectionIndexerConfig<T>) {
		super(source, config);
		this.own(source.spliceEvent.bind(this._onSplice, this));
		this.own(source.clearEvent.bind(this._onClear, this));
	}

	private _onSplice(params: SetSpliceEventParams<T>) {
		var spliceResult = params.spliceResult;
		this.target.trySplice(
			this._keys(spliceResult.removedItems),
			this._index(spliceResult.addedItems));
	}

	private _onClear(params: SetItemsEventParams<T>) {
		this.target.tryRemoveAll(
			this._keys(params.items));
	}
}
