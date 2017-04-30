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
import IList from '../IList';
import IndexItems from '../IndexItems';
import List from '../List';

/**
 * [[JW.AbstractCollection.Mapper|Mapper]] implementation for [[JW.Array]].
 */
class ListMapper<T, U> extends AbstractCollectionMapper<T, U> {
	private _targetCreated: boolean;

	/**
	 * @inheritdoc
	 */
	readonly source: IList<T>;

	/**
	 * @inheritdoc
	 */
	readonly target: IList<U>;

	/**
	 * @inheritdoc
	 */
	constructor(source: IList<T>, config: ListMapper.Config<T, U>) {
		super(source, config);
		this._targetCreated = config.target == null;
		this.target = this._targetCreated ? new List<U>(config.getKey, this.source.silent) : config.target;
		this.target.tryAddAll(this._createItems(this.source.items));
		this.own(source.spliceEvent.listen(this._onSplice, this));
		this.own(source.replaceEvent.listen(this._onReplace, this));
		this.own(source.moveEvent.listen(this._onMove, this));
		this.own(source.clearEvent.listen(this._onClear, this));
		this.own(source.reorderEvent.listen(this._onReorder, this));
	}

	/**
	 * @inheritdoc
	 */
	protected destroyObject() {
		this._destroyItems(this.target.clear() || [], this.source.items);
		if (this._targetCreated) {
			this.target.destroy();
		}
		super.destroyObject();
	}

	private _createItems(datas: T[]): U[] {
		var items: U[] = [];
		for (var i = 0, l = datas.length; i < l; ++i) {
			items.push(this._create.call(this._scope, datas[i]));
		}
		return items;
	}

	private _destroyItems(items: U[], datas: T[]) {
		if (this._destroy === undefined) {
			return;
		}
		for (var i = items.length - 1; i >= 0; --i) {
			this._destroy.call(this._scope, items[i], datas[i]);
		}
	}

	private _onSplice(params: IList.SpliceEventParams<T>) {
		var sourceResult = params.spliceResult;
		var sourceAddedItemsList = sourceResult.addedItemsList;
		var targetAddParamsList: IList.IndexItems<U>[] = [];
		for (var i = 0, l = sourceAddedItemsList.length; i < l; ++i) {
			var addParams = sourceAddedItemsList[i];
			targetAddParamsList.push(new IndexItems(
				addParams.index, this._createItems(addParams.items)));
		}
		var targetResult = this.target.trySplice(sourceResult.removeParamsList, targetAddParamsList);
		var sourceRemovedItemsList = sourceResult.removedItemsList;
		var targetRemovedItemsList = targetResult.removedItemsList;
		for (var i = targetRemovedItemsList.length - 1; i >= 0; --i) {
			this._destroyItems(targetRemovedItemsList[i].items, sourceRemovedItemsList[i].items);
		}
	}

	private _onReplace(params: IList.ReplaceEventParams<T>) {
		var newItem = this._create.call(this._scope, params.newItem);
		var oldItem = this.target.tryPut(params.index, newItem).value;
		this._destroy.call(this._scope, oldItem, params.oldItem);
	}

	private _onMove(params: IList.MoveEventParams<T>) {
		this.target.tryMove(params.fromIndex, params.toIndex);
	}

	private _onClear(params: IList.ItemsEventParams<T>) {
		this._destroyItems(this.target.clear(), params.items);
	}

	private _onReorder(params: IList.ReorderEventParams<T>) {
		this.target.tryReorder(params.indexArray);
	}
}

export default ListMapper;

namespace ListMapper {
	/**
	 * @inheritdoc
	 */
	export interface Config<T, U> extends AbstractCollectionMapper.Config<T, U> {
		/**
		 * @inheritdoc
		 */
		readonly target?: IList<U>;
	}
}

export function mapList<T, U>(source: IList<T>,
		map: (item: T) => U, scope?: any, getKey?: (item: U) => string): IList<U> {
	if (source.silent) {
		return source.map(map, scope, getKey);
	}
	const result = new List<U>(getKey);
	return result.owning(new ListMapper<T, U>(source, {
		target: result,
		create: map,
		scope: scope
	}));
}

export function mapDestroyableList<T, U extends Destroyable>(source: IList<T>,
		create: (item: T) => U, scope?: any, getKey?: (item: U) => string): IList<U> {
	if (source.silent) {
		return source.map(create, scope, getKey).ownItems();
	}
	const result = new List<U>(getKey);
	return result.owning(new ListMapper<T, U>(source, {
		target: result,
		create: create,
		destroy: destroy,
		scope: scope
	}));
}
