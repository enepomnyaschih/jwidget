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

import AbstractConverterToSet from './AbstractConverterToSet';
import DestroyableReadOnlySet from '../DestroyableReadOnlySet';
import IMap from '../IMap';
import ReadOnlyMap from '../ReadOnlyMap';
import Set from '../Set';
import * as DictionaryUtils from '../DictionaryUtils';

/**
 * [[JW.Abstract.Lister|Lister]] implementation for [[JW.Map]].
 */
export default class MapConverterToSet<T> extends AbstractConverterToSet<T> {
	/**
	 * @inheritdoc
	 */
	readonly source: ReadOnlyMap<T>;

	/**
	 * @inheritdoc
	 */
	constructor(source: ReadOnlyMap<T>, config: AbstractConverterToSet.Config<T>) {
		super(source, config);
		this.own(source.spliceEvent.listen(this._onSplice, this));
		this.own(source.clearEvent.listen(this._onClear, this));
	}

	private _onSplice(params: IMap.SpliceEventParams<T>) {
		var spliceResult = params.spliceResult;
		this.target.trySplice(
			DictionaryUtils.toArray(spliceResult.removedItems),
			DictionaryUtils.toArray(spliceResult.addedItems));
	}

	private _onClear(params: IMap.ItemsEventParams<T>) {
		this.target.tryRemoveAll(
			DictionaryUtils.toArray(params.items));
	}
}

export function mapToSet<T>(source: ReadOnlyMap<T>): DestroyableReadOnlySet<T> {
	if (source.silent) {
		return source.toSet();
	}
	const target = new Set<T>(source.getKey);
	return target.owning(new MapConverterToSet<T>(source, {target}));
}
