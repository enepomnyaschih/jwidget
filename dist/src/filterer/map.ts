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

import AbstractCollectionFilterer from './AbstractCollectionFilterer';
import IMap from '../IMap';
import Map from '../Map';
import * as MapUtils from '../MapUtils';

/**
 * [[JW.AbstractCollection.Filterer|Filterer]] implementation for [[JW.Map]].
 */
class MapFilterer<T> extends AbstractCollectionFilterer<T> {
	private _targetCreated: boolean;

	/**
	 * @inheritdoc
	 */
	readonly source: IMap<T>;

	/**
	 * @inheritdoc
	 */
	readonly target: IMap<T>;

	/**
	 * @inheritdoc
	 */
	constructor(source: IMap<T>, config: MapFilterer.Config<T>) {
		super(source, config);
		this._targetCreated = config.target == null;
		this.target = this._targetCreated ? new Map<T>(this.source.silent) : config.target;
		this.target.trySetAll(source.filter(this._test, this._scope));
		this.own(source.spliceEvent.bind(this._onSplice, this));
		this.own(source.reindexEvent.bind(this._onReindex, this));
		this.own(source.clearEvent.bind(this._onClear, this));
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

	private _onSplice(params: IMap.SpliceEventParams<T>) {
		var spliceResult = params.spliceResult;
		this.target.trySplice(
			Object.keys(spliceResult.removedItems),
			MapUtils.filter(spliceResult.addedItems, this._test, this._scope));
	}

	private _onReindex(params: IMap.ReindexEventParams<T>) {
		this.target.tryReindex(params.keyMap);
	}

	private _onClear(params: IMap.ItemsEventParams<T>) {
		this.target.tryRemoveAll(Object.keys(params.items));
	}
}

export default MapFilterer;

namespace MapFilterer {
	/**
	 * @inheritdoc
	 */
	export interface Config<T> extends AbstractCollectionFilterer.Config<T> {
		/**
		 * @inheritdoc
		 */
		readonly target?: IMap<T>;
	}
}

export function filterMap<T>(source: IMap<T>, test: (item: T) => boolean, scope?: any): IMap<T> {
	if (source.silent) {
		return source.$filter(test, scope);
	}
	var result = new Map<T>();
	result.own(new MapFilterer<T>(source, {
		target: result,
		test: test,
		scope: scope
	}));
	return result;
}
