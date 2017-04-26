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

import {destroy} from '../index';
import AbstractCollectionMapper from './AbstractCollectionMapper';
import Destroyable from '../Destroyable';
import Dictionary from '../Dictionary';
import IMap from '../IMap';
import Map from '../Map';
import * as DictionaryUtils from '../DictionaryUtils';

/**
 * [[JW.AbstractCollection.Mapper|Mapper]] implementation for [[JW.Map]].
 */
class MapMapper<T, U> extends AbstractCollectionMapper<T, U> {
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
	constructor(source: IMap<T>, config: MapMapper.Config<T, U>) {
		super(source, config);
		this._targetCreated = config.target == null;
		this.target = this._targetCreated ? new Map<U>(this.source.silent) : config.target;
		this.target.trySetAll(this._createItems(source.items));
		this.own(source.spliceEvent.listen(this._onSplice, this));
		this.own(source.reindexEvent.listen(this._onReindex, this));
		this.own(source.clearEvent.listen(this._onClear, this));
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
			DictionaryUtils.getRemovedKeys(removedDatas, addedDatas),
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

export default MapMapper;

namespace MapMapper {
	/**
	 * @inheritdoc
	 */
	export interface Config<T, U> extends AbstractCollectionMapper.Config<T, U> {
		/**
		 * @inheritdoc
		 */
		readonly target?: IMap<U>;
	}
}

export function mapMap<T, U>(source: IMap<T>, map: (item: T) => U, scope?: any): IMap<U> {
	if (source.silent) {
		return source.map(map, scope);
	}
	const result = new Map<U>();
	return result.owning(new MapMapper<T, U>(source, {
		target: result,
		create: map,
		scope: scope
	}));
}

export function mapDestroyableMap<T, U extends Destroyable>(source: IMap<T>, create: (item: T) => U, scope?: any): IMap<U> {
	if (source.silent) {
		return source.map(create, scope).ownItems();
	}
	const result = new Map<U>();
	return result.owning(new MapMapper<T, U>(source, {
		target: result,
		create: create,
		destroy: destroy,
		scope: scope
	}));
}
