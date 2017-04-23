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

import {MapItemsEventParams, MapSpliceEventParams} from '../../IMap';
import IMap from '../../IMap';
import IClass from '../../IClass';
import ICollectionOrdererConfig from '../ICollectionOrdererConfig';
import MapOrderer from './MapOrderer';
import * as MapUtils from '../../MapUtils';

/**
 * [[JW.AbstractCollection.Orderer|Orderer]] implementation for [[JW.ObservableMap]].
 */
export default class ObservableMapOrderer<T extends IClass> extends MapOrderer<T> {
	/**
	 * @inheritdoc
	 */
	constructor(source: IMap<T>, config: ICollectionOrdererConfig<T>) {
		super(source, config);
		this.own(source.spliceEvent.bind(this._onSplice, this));
		this.own(source.clearEvent.bind(this._onClear, this));
	}

	private _onSplice(params: MapSpliceEventParams<T>) {
		var spliceResult = params.spliceResult;
		this._splice(
			MapUtils.toSet(spliceResult.removedItems),
			MapUtils.toSet(spliceResult.addedItems));
	}

	private _onClear(params: MapItemsEventParams<T>) {
		this.target.removeItems(
			MapUtils.toArray(params.items));
	}
}
