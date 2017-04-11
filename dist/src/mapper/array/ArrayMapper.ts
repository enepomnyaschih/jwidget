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
import IArray from '../../IArray';
import IArrayMapper from './IArrayMapper';
import IArrayMapperConfig from './IArrayMapperConfig';

/**
 * [[JW.AbstractCollection.Mapper|Mapper]] implementation for [[JW.Array]].
 */
export default class ArrayMapper<T, U> extends AbstractCollectionMapper<T, U> implements IArrayMapper<T, U> {
	private _targetCreated: boolean;

	/**
	 * @inheritdoc
	 */
	source: IArray<T>;

	/**
	 * @inheritdoc
	 */
	target: IArray<U>;

	/**
	 * @inheritdoc
	 */
	constructor(source: IArray<T>, config: IArrayMapperConfig<T, U>) {
		super(source, config);
		this._targetCreated = config.target == null;
		this.target = this._targetCreated ? this.source.createEmpty<U>() : config.target;
		this.target.tryAddAll(this._createItems(this.source.getItems()));
	}

	/**
	 * @inheritdoc
	 */
	protected destroyObject() {
		this._destroyItems(this.target.clear(), this.source.getItems());
		if (this._targetCreated) {
			this.target.destroy();
		}
		super.destroyObject();
	}

	/**
	 * @hidden
	 */
	protected _createItems(datas: T[]): U[] {
		var items: U[] = [];
		for (var i = 0, l = datas.length; i < l; ++i) {
			items.push(this._createItem.call(this._scope, datas[i]));
		}
		return items;
	}

	/**
	 * @hidden
	 */
	protected _destroyItems(items: U[], datas: T[]) {
		if (this._destroyItem === undefined) {
			return;
		}
		for (var i = items.length - 1; i >= 0; --i) {
			this._destroyItem.call(this._scope, items[i], datas[i]);
		}
	}
}
