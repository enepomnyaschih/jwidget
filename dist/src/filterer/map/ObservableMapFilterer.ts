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

import {MapItemsEventParams, MapReindexEventParams, MapSpliceEventParams} from '../../IMap';
import IMap from '../../IMap';
import IMapFiltererConfig from './IMapFiltererConfig';
import MapFilterer from './MapFilterer';
import * as MapUtils from '../../MapUtils';

/**
 * [[JW.AbstractCollection.Filterer|Filterer]] implementation for [[JW.ObservableMap]].
 */
export default class ObservableMapFilterer<T> extends MapFilterer<T> {
	/**
	 * @inheritdoc
	 */
	constructor(source: IMap<T>, config: IMapFiltererConfig<T>) {
		super(source, config);
		this.own(source.spliceEvent.bind(this._onSplice, this));
		this.own(source.reindexEvent.bind(this._onReindex, this));
		this.own(source.clearEvent.bind(this._onClear, this));
	}

	private _onSplice(params: MapSpliceEventParams<T>) {
		var spliceResult = params.spliceResult;
		this.target.trySplice(
			Object.keys(spliceResult.removedItems),
			MapUtils.filter(spliceResult.addedItems, this._test, this._scope));
	}

	private _onReindex(params: MapReindexEventParams<T>) {
		this.target.tryReindex(params.keyMap);
	}

	private _onClear(params: MapItemsEventParams<T>) {
		this.target.tryRemoveAll(Object.keys(params.items));
	}
}
