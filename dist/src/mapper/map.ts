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

import DestroyableReadOnlyMap from '../DestroyableReadOnlyMap';
import Destructor from '../Destructor';
import Dictionary from '../Dictionary';
import * as DictionaryUtils from '../DictionaryUtils';
import IMap from '../IMap';
import {destroy} from '../index';
import Map from '../Map';
import ReadOnlyMap from '../ReadOnlyMap';
import AbstractMapper from './AbstractMapper';

/**
 * [[JW.Abstract.Mapper|Mapper]] implementation for [[JW.Map]].
 */
class MapMapper<T, U> extends AbstractMapper<T, U> {
	private _targetCreated: boolean;

	/**
	 * @inheritdoc
	 */
	readonly source: ReadOnlyMap<T>;

	/**
	 * @inheritdoc
	 */
	readonly target: IMap<U>;

	/**
	 * @inheritdoc
	 */
	constructor(source: ReadOnlyMap<T>, create: (data: T) => U, config: MapMapper.FullConfig<T, U> = {}) {
		super(source, create, config);
		this._targetCreated = config.target == null;
		this.target = this._targetCreated ? new Map<U>(config.getKey, this.source.silent) : config.target;
		this.target.tryPutAll(this._createItems(source.items));
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
	export interface FullConfig<T, U> extends AbstractMapper.Config<T, U> {
		/**
		 * @inheritdoc
		 */
		readonly target?: IMap<U>;
	}
}

export function mapMap<T, U>(source: ReadOnlyMap<T>, create: (sourceValue: T) => U,
		config: AbstractMapper.Config<T, U> = {}): DestroyableReadOnlyMap<U> {
	if (!source.silent) {
		const target = new Map<U>(config.getKey);
		return target.owning(new MapMapper<T, U>(source, create, {
			target,
			destroy: config.destroy,
			scope: config.scope
		}));
	}
	const target = source.map(create, config.scope, config.getKey);
	if (config.destroy === destroy) {
		target.ownItems();
	} else if (config.destroy) {
		const sourceValues = DictionaryUtils.clone(source.items);
		target.own(new Destructor(() => target.every((item, key) => {
			config.destroy.call(config.scope, item, sourceValues[key]);
			return true;
		})));
	}
	return target;
}
