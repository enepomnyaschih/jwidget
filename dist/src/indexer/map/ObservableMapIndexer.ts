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

import {default as ObservableMap, MapItemsEventParams, MapSpliceEventParams} from '../../ObservableMap';
import ICollectionIndexerConfig from '../ICollectionIndexerConfig';
import MapIndexer from './MapIndexer';
import * as MapUtils from '../../MapUtils';

/**
 * [[JW.AbstractCollection.Indexer|Indexer]] implementation for [[JW.ObservableMap]].
 */
export default class ObservableMapIndexer<T> extends MapIndexer<T> {
	/**
	 * @inheritdoc
	 */
	constructor(source: ObservableMap<T>, config: ICollectionIndexerConfig<T>) {
		super(source, config);
		this.own(source.spliceEvent.bind(this._onSplice, this));
		this.own(source.clearEvent.bind(this._onClear, this));
	}

	private _onSplice(params: MapSpliceEventParams<T>) {
		var spliceResult = params.spliceResult;
		this.target.trySplice(
			this._keys(MapUtils.toArray(spliceResult.removedItems)),
			this._index(MapUtils.toArray(spliceResult.addedItems)));
	}

	private _onClear(params: MapItemsEventParams<T>) {
		this.target.tryRemoveAll(
			this._keys(MapUtils.toArray(params.items)));
	}
}
