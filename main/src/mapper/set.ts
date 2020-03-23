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

import DestroyableReadonlySet from '../DestroyableReadonlySet';
import Destructor from '../Destructor';
import {destroy} from '../index';
import {VidMap} from '../internal';
import ISet from '../ISet';
import ReadonlySet from '../ReadonlySet';
import Set from '../Set';
import AbstractMapper from './AbstractMapper';

/**
 * AbstractMapper implementation for Set.
 * @param T Source collection item type.
 * @param U Target collection item type.
 */
class SetMapper<T, U> extends AbstractMapper<T, U> {
	private _targetCreated: boolean;

	/**
	 * @hidden
	 */
	protected _items: VidMap<T, U>;

	/**
	 * Source set.
	 */
	readonly source: ReadonlySet<T>;

	/**
	 * Target set.
	 */
	readonly target: ISet<U>;

	/**
	 * @param source Source set.
	 * @param create Mapping callback.
	 * @param config Mapper configuration.
	 */
	constructor(source: ReadonlySet<T>, create: (data: T) => U, config: SetMapper.FullConfig<T, U> = {}) {
		super(source, create, config);
		this._items = new VidMap<T, U>(source.getKey);
		this._targetCreated = config.target == null;
		this.target = this._targetCreated ? new Set<U>(config.getKey, this.source.silent) : config.target;
		this.target.tryAddAll(this._createItems(source.toArray()));
		this.own(source.spliceEvent.listen(this._onSplice, this));
		this.own(source.clearEvent.listen(this._onClear, this));
	}

	/**
	 * @inheritDoc
	 */
	protected destroyObject() {
		var datas = this.source.toArray();
		this.target.tryRemoveAll(this._getItems(datas));
		this._destroyItems(datas);
		if (this._targetCreated) {
			this.target.destroy();
		}
		super.destroyObject();
	}

	private _getItems(datas: T[]): U[] {
		return datas.map((data) => this._items.get(data));
	}

	private _createItems(datas: T[]): U[] {
		var items: U[] = [];
		for (var i = 0, l = datas.length; i < l; ++i) {
			var data = datas[i];
			var item = this._create.call(this._scope || this, data);
			items.push(item);
			this._items.put(data, item);
		}
		return items;
	}

	private _destroyItems(datas: T[]) {
		if (this._destroy === undefined) {
			return;
		}
		for (var i = datas.length - 1; i >= 0; --i) {
			var data = datas[i];
			var item = this._items.remove(data);
			this._destroy.call(this._scope || this, item, data);
		}
	}

	private _onSplice(params: ISet.SpliceEventParams<T>) {
		var spliceResult = params.spliceResult;
		var removedDatas = spliceResult.removedItems;
		var addedDatas = spliceResult.addedItems;
		this.target.trySplice(this._getItems(removedDatas), this._createItems(addedDatas));
		this._destroyItems(removedDatas);
	}

	private _onClear(params: ISet.ItemsEventParams<T>) {
		var datas = params.items;
		this.target.tryRemoveAll(this._getItems(datas));
		this._destroyItems(datas);
	}
}

export default SetMapper;

namespace SetMapper {
	/**
	 * SetMapper configuration.
	 * @param T Source collection item type.
	 * @param U Target collection item type.
	 */
	export interface FullConfig<T, U> extends AbstractMapper.Config<T, U> {
		/**
		 * Target set.
		 */
		readonly target?: ISet<U>;
	}
}

/**
 * Maps a set and starts synchronization.
 * @param source Source set.
 * @param create Mapping callback.
 * @param config Mapper configuration.
 * @returns Target set.
 */
export function mapSet<T, U>(source: ReadonlySet<T>, create: (sourceValue: T) => U,
                             config: AbstractMapper.Config<T, U> = {}): DestroyableReadonlySet<U> {
	if (!source.silent) {
		const target = new Set<U>(config.getKey);
		return target.owning(new SetMapper<T, U>(source, create, {
			target,
			destroy: config.destroy,
			scope: config.scope
		}));
	}
	const target = source.map(create, config.scope, config.getKey);
	if (config.destroy === destroy) {
		target.ownItems();
	} else if (config.destroy) {
		const items = new VidMap<T, U>(source.getKey);
		target.own(new Destructor(() => items.every((item, key) => {
			config.destroy.call(config.scope, item, key);
			return true;
		})));
	}
	return target;
}
