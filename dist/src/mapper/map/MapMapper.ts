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
import IMap from '../../IMap';
import IMapMapper from './IMapMapper';
import IMapMapperConfig from './IMapMapperConfig';
import JWMap from '../../JWMap';

/**
 * [[JW.AbstractCollection.Mapper|Mapper]] implementation for [[JW.Map]].
 */
export default class MapMapper<T, U> extends AbstractCollectionMapper<T, U> implements IMapMapper<T, U> {
	private _targetCreated: boolean;

	/**
	 * @inheritdoc
	 */
	source: IMap<T>;

	/**
	 * @inheritdoc
	 */
	target: IMap<U>;

	/**
	 * @inheritdoc
	 */
	constructor(source: IMap<T>, config: IMapMapperConfig<T, U>) {
		super(source, config);
		this._targetCreated = config.target == null;
		this.target = this._targetCreated ? new JWMap<U>(this.source.isSilent()) : config.target;
		this.target.trySetAll(this._createItems(source.getJson()));
	}

	/**
	 * @inheritdoc
	 */
	protected destroyObject() {
		this._destroyItems(this.target.removeAllVerbose(this.source.getKeys()), this.source.getJson());
		if (this._targetCreated) {
			this.target.destroy();
		}
		super.destroyObject();
	}

	/**
	 * @hidden
	 */
	protected _createItems(datas: Dictionary<T>): Dictionary<U> {
		var items: Dictionary<U> = {};
		for (var key in datas) {
			items[key] = this._createItem.call(this._scope, datas[key]);
		}
		return items;
	}

	/**
	 * @hidden
	 */
	protected _destroyItems(items: Dictionary<U>, datas: Dictionary<T>) {
		if (this._destroyItem === undefined) {
			return;
		}
		for (var key in items) {
			this._destroyItem.call(this._scope, items[key], datas[key]);
		}
	}
}
