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
import ISet from '../ISet';
import ReadonlySet from '../ReadonlySet';
import Set from '../Set';
import AbstractConverterToSet from './AbstractConverterToSet';

/**
 * AbstractConverterToSet implementation for Set.
 */
export default class SetConverterToSet<T> extends AbstractConverterToSet<T> {
	/**
	 * Source set.
	 */
	readonly source: ReadonlySet<T>;

	/**
	 * @param source Source set.
	 * @param config Converter configuration.
	 */
	constructor(source: ReadonlySet<T>, config: AbstractConverterToSet.Config<T>) {
		super(source, config);
		this.own(source.spliceEvent.listen(this._onSplice, this));
		this.own(source.clearEvent.listen(this._onClear, this));
	}

	private _onSplice(params: ISet.SpliceEventParams<T>) {
		var spliceResult = params.spliceResult;
		this._target.trySplice(spliceResult.removedItems, spliceResult.addedItems);
	}

	private _onClear(params: ISet.ItemsEventParams<T>) {
		this._target.tryRemoveAll(params.items);
	}
}

/**
 * Creates a copy of a set and starts synchronization.
 * @param source Source set.
 * @returns Target set.
 */
export function setToSet<T>(source: ReadonlySet<T>): DestroyableReadonlySet<T> {
	if (source.silent) {
		return source.toSet();
	}
	const target = new Set<T>(source.getKey);
	return target.owning(new SetConverterToSet<T>(source, {target}));
}
