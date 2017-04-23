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

import AbstractCollectionMapper from '../AbstractCollectionMapper';
import Dictionary from '../../Dictionary';
import IClass from '../../IClass';
import ISet from '../../ISet';
import ISetMapper from './ISetMapper';
import ISetMapperConfig from './ISetMapperConfig';
import JWSet from '../../JWSet';

/**
 * [[JW.AbstractCollection.Mapper|Mapper]] implementation for [[JW.Set]].
 */
export default class SetMapper<T extends IClass, U extends IClass> extends AbstractCollectionMapper<T, U> implements ISetMapper<T, U> {
	private _targetCreated: boolean;

	/**
	 * @hidden
	 */
	protected _items: Dictionary<U> = {};

	/**
	 * @inheritdoc
	 */
	source: ISet<T>;

	/**
	 * @inheritdoc
	 */
	target: ISet<U>;

	/**
	 * @inheritdoc
	 */
	constructor(source: ISet<T>, config: ISetMapperConfig<T, U>) {
		super(source, config);
		this._targetCreated = config.target == null;
		this.target = this._targetCreated ? new JWSet<U>(this.source.isSilent()) : config.target;
		this.target.tryAddAll(this._createItems(source.toArray()));
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

	/**
	 * @hidden
	 */
	protected _getItems(datas: T[]): U[] {
		return datas.map((data) => {
			return this._items[data._iid];
		}, this);
	}

	/**
	 * @hidden
	 */
	protected _createItems(datas: T[]): U[] {
		var items: U[] = [];
		for (var i = 0, l = datas.length; i < l; ++i) {
			var data = datas[i];
			var item = this._createItem.call(this._scope || this, data);
			items.push(item);
			this._items[data._iid] = item;
		}
		return items;
	}

	/**
	 * @hidden
	 */
	protected _destroyItems(datas: T[]) {
		if (this._destroyItem === undefined) {
			return;
		}
		for (var i = datas.length - 1; i >= 0; --i) {
			var data = datas[i];
			var iid = data._iid;
			var item = this._items[iid];
			delete this._items[iid];
			this._destroyItem.call(this._scope || this, item, data);
		}
	}
}