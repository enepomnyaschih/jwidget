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

import IMap from '../../IMap';
import IMapInserter from './IMapInserter';
import MapInserter from './MapInserter';

/**
 * [[JW.Map.Inserter|Inserter]] implementation for [[JW.ObservableMap]].
 */
export default class ObservableMapInserter<T> extends MapInserter<T> {
	/**
	 * @inheritdoc
	 */
	constructor(source: IMap<T>, config?: IMapInserter.Config<T>) {
		super(source, config);
		this.own(source.spliceEvent.bind(this._onSplice, this));
		this.own(source.reindexEvent.bind(this._onReindex, this));
		this.own(source.clearEvent.bind(this._onClear, this));
	}

	private _onSplice(params: IMap.SpliceEventParams<T>) {
		var spliceResult = params.spliceResult;
		this._removeItems(spliceResult.removedItems);
		this._addItems(spliceResult.addedItems);
	}

	private _onReindex(params: IMap.ReindexEventParams<T>) {
		var keyMap = params.keyMap;
		for (var oldKey in keyMap) {
			var newKey = keyMap[oldKey];
			var item = this.source.get(newKey);
			if (this._remove) {
				this._remove.call(this._scope, oldKey, item);
			}
			if (this._add) {
				this._add.call(this._scope, item, newKey);
			}
		}
	}

	private _onClear(params: IMap.ItemsEventParams<T>) {
		this._doClearItems(params.items);
	}
}
