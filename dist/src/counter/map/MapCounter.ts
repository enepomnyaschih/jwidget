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

import AbstractCollectionCounter from '../AbstractCollectionCounter';
import ICollectionCounter from '../ICollectionCounter';
import IMap from '../../IMap';
import IMapCounter from './IMapCounter';
import * as MapUtils from '../../MapUtils';

/**
 * [[JW.AbstractCollection.Counter|Counter]] implementation for [[JW.Map]].
 */
export default class MapCounter<T> extends AbstractCollectionCounter<T> implements IMapCounter<T> {
	/**
	 * @inheritdoc
	 */
	readonly source: IMap<T>;

	/**
	 * @inheritdoc
	 */
	constructor(source: IMap<T>, config: ICollectionCounter.Config<T>) {
		super(source, config);
		this.own(source.spliceEvent.bind(this._onSplice, this));
		this.own(source.clearEvent.bind(this._onClear, this));
	}

	private _onSplice(params: IMap.SpliceEventParams<T>) {
		var spliceResult = params.spliceResult;
		this._target.set(this._target.get() -
			MapUtils.count(spliceResult.removedItems, this._test, this._scope) +
			MapUtils.count(spliceResult.addedItems, this._test, this._scope));
	}

	private _onClear() {
		this._target.set(0);
	}
}
