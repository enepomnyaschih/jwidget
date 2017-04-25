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

import {destroy} from '../Core';
import AbstractCollectionMapper from './AbstractCollectionMapper';
import Dictionary from '../Dictionary';
import IClass from '../IClass';
import ISet from '../ISet';
import Set from '../Set';

/**
 * [[JW.AbstractCollection.Mapper|Mapper]] implementation for [[JW.Set]].
 */
class SetMapper<T extends IClass, U extends IClass> extends AbstractCollectionMapper<T, U> {
	private _targetCreated: boolean;

	/**
	 * @hidden
	 */
	protected _items: Dictionary<U> = {};

	/**
	 * @inheritdoc
	 */
	readonly source: ISet<T>;

	/**
	 * @inheritdoc
	 */
	readonly target: ISet<U>;

	/**
	 * @inheritdoc
	 */
	constructor(source: ISet<T>, config: SetMapper.Config<T, U>) {
		super(source, config);
		this._targetCreated = config.target == null;
		this.target = this._targetCreated ? new Set<U>(this.source.silent) : config.target;
		this.target.tryAddAll(this._createItems(source.toArray()));
		this.own(source.spliceEvent.listen(this._onSplice, this));
		this.own(source.clearEvent.listen(this._onClear, this));
	}

	/**
	 * @inheritdoc
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
		return datas.map((data) => {
			return this._items[data.iid];
		}, this);
	}

	private _createItems(datas: T[]): U[] {
		var items: U[] = [];
		for (var i = 0, l = datas.length; i < l; ++i) {
			var data = datas[i];
			var item = this._create.call(this._scope || this, data);
			items.push(item);
			this._items[data.iid] = item;
		}
		return items;
	}

	private _destroyItems(datas: T[]) {
		if (this._destroy === undefined) {
			return;
		}
		for (var i = datas.length - 1; i >= 0; --i) {
			var data = datas[i];
			var iid = data.iid;
			var item = this._items[iid];
			delete this._items[iid];
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
	 * @inheritdoc
	 */
	export interface Config<T extends IClass, U extends IClass> extends AbstractCollectionMapper.Config<T, U> {
		/**
		 * @inheritdoc
		 */
		readonly target?: ISet<U>;
	}
}

export function mapSet<T extends IClass, U extends IClass>(source: ISet<T>, map: (item: T) => U, scope?: any): ISet<U> {
	if (source.silent) {
		return source.$map(map, scope);
	}
	const result = new Set<U>();
	return result.owning(new SetMapper<T, U>(source, {
		target: result,
		create: map,
		scope: scope
	}));
}

export function mapDestroyableSet<T extends IClass, U extends IClass>(source: ISet<T>, create: (item: T) => U, scope?: any): ISet<U> {
	if (source.silent) {
		return source.$map(create, scope).ownItems();
	}
	const result = new Set<U>();
	return result.owning(new SetMapper<T, U>(source, {
		target: result,
		create: create,
		destroy: destroy,
		scope: scope
	}));
}
