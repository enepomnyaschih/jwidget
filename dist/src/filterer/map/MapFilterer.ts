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

import AbstractCollectionFilterer from '../AbstractCollectionFilterer';
import IMap from '../../IMap';
import IMapFilterer from './IMapFilterer';
import IMapFiltererConfig from './IMapFiltererConfig';

/**
 * [[JW.AbstractCollection.Filterer|Filterer]] implementation for [[JW.Map]].
 */
export default class MapFilterer<T> extends AbstractCollectionFilterer<T> implements IMapFilterer<T> {
	private _targetCreated: boolean;

	/**
	 * @inheritdoc
	 */
	source: IMap<T>;

	/**
	 * @inheritdoc
	 */
	target: IMap<T>;

	/**
	 * @inheritdoc
	 */
	constructor(source: IMap<T>, config: IMapFiltererConfig<T>) {
		super(source, config);
		this._targetCreated = config.target == null;
		this.target = this._targetCreated ? this.source.createEmpty<T>() : config.target;
		this.target.trySetAll(source.filter(this._filterItem, this._scope));
	}

	/**
	 * @inheritdoc
	 */
	protected destroyObject() {
		this.target.tryRemoveAll(this.source.getKeys());
		if (this._targetCreated) {
			this.target.destroy();
		}
		super.destroyObject();
	}
}
