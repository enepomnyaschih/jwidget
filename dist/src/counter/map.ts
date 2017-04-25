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

import AbstractCollectionCounter from './AbstractCollectionCounter';
import DestroyableBindable from '../DestroyableBindable';
import IMap from '../IMap';
import Property from '../Property';
import * as DictionaryUtils from '../DictionaryUtils';

/**
 * [[JW.AbstractCollection.Counter|Counter]] implementation for [[JW.Map]].
 */
export default class MapCounter<T> extends AbstractCollectionCounter<T> {
	/**
	 * @inheritdoc
	 */
	readonly source: IMap<T>;

	/**
	 * @inheritdoc
	 */
	constructor(source: IMap<T>, config: AbstractCollectionCounter.Config<T>) {
		super(source, config);
		this.own(source.spliceEvent.listen(this._onSplice, this));
		this.own(source.clearEvent.listen(this._onClear, this));
	}

	private _onSplice(params: IMap.SpliceEventParams<T>) {
		var spliceResult = params.spliceResult;
		this._target.set(this._target.get() -
			DictionaryUtils.count(spliceResult.removedItems, this._test, this._scope) +
			DictionaryUtils.count(spliceResult.addedItems, this._test, this._scope));
	}

	private _onClear() {
		this._target.set(0);
	}
}

export function countMap<T>(source: IMap<T>, test: (item: T) => boolean, scope?: any): DestroyableBindable<number> {
	if (source.silent) {
		return new Property(source.count(test, scope), true);
	}
	const result = new Property(0);
	return result.owning(new MapCounter<T>(source, {
		target: result,
		test: test,
		scope: scope
	}));
}
