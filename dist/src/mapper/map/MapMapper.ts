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

import AbstractCollectionMapper from '../AbstractCollectionMapper';
import Dictionary from '../../Dictionary';
import IMap from '../../IMap';
import IMapMapper from './IMapMapper';
import Map from '../../Map';
import * as MapUtils from '../../MapUtils';

/**
 * [[JW.AbstractCollection.Mapper|Mapper]] implementation for [[JW.Map]].
 */
export default class MapMapper<T, U> extends AbstractCollectionMapper<T, U> implements IMapMapper<T, U> {
	private _targetCreated: boolean;

	/**
	 * @inheritdoc
	 */
	readonly source: IMap<T>;

	/**
	 * @inheritdoc
	 */
	readonly target: IMap<U>;

	/**
	 * @inheritdoc
	 */
	constructor(source: IMap<T>, config: IMapMapper.Config<T, U>) {
		super(source, config);
		this._targetCreated = config.target == null;
		this.target = this._targetCreated ? new Map<U>(this.source.silent) : config.target;
		this.target.trySetAll(this._createItems(source.items));
		this.own(source.spliceEvent.bind(this._onSplice, this));
		this.own(source.reindexEvent.bind(this._onReindex, this));
		this.own(source.clearEvent.bind(this._onClear, this));
	}

	/**
	 * @inheritdoc
	 */
	protected destroyObject() {
		this._destroyItems(this.target.removeAllVerbose(this.source.getKeys()), this.source.items);
		if (this._targetCreated) {
			this.target.destroy();
		}
		super.destroyObject();
	}

	private _createItems(datas: Dictionary<T>): Dictionary<U> {
		var items: Dictionary<U> = {};
		for (var key in datas) {
			items[key] = this._create.call(this._scope, datas[key]);
		}
		return items;
	}

	private _destroyItems(items: Dictionary<U>, datas: Dictionary<T>) {
		if (this._destroy === undefined) {
			return;
		}
		for (var key in items) {
			this._destroy.call(this._scope, items[key], datas[key]);
		}
	}

	private _onSplice(params: IMap.SpliceEventParams<T>) {
		var sourceResult = params.spliceResult;
		var removedDatas = sourceResult.removedItems;
		var addedDatas = sourceResult.addedItems;
		var targetResult = this.target.trySplice(
			MapUtils.getRemovedKeys(removedDatas, addedDatas),
			this._createItems(addedDatas));
		if (targetResult !== undefined) {
			this._destroyItems(targetResult.removedItems, removedDatas);
		}
	}

	private _onReindex(params: IMap.ReindexEventParams<T>) {
		this.target.tryReindex(params.keyMap);
	}

	private _onClear(params: IMap.ItemsEventParams<T>) {
		var datas = params.items;
		this._destroyItems(this.target.tryRemoveAll(Object.keys(datas)), datas);
	}
}
