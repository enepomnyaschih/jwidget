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
 * [[JW.Abstract.Lister|Lister]] implementation for [[JW.Set]].
 */
export default class SetConverterToSet<T> extends AbstractConverterToSet<T> {
	/**
	 * @inheritdoc
	 */
	readonly source: ReadonlySet<T>;

	/**
	 * @inheritdoc
	 */
	constructor(source: ReadonlySet<T>, config: AbstractConverterToSet.Config<T>) {
		super(source, config);
		this.own(source.spliceEvent.listen(this._onSplice, this));
		this.own(source.clearEvent.listen(this._onClear, this));
	}

	private _onSplice(params: ISet.SpliceEventParams<T>) {
		var spliceResult = params.spliceResult;
		this.target.trySplice(spliceResult.removedItems, spliceResult.addedItems);
	}

	private _onClear(params: ISet.ItemsEventParams<T>) {
		this.target.tryRemoveAll(params.items);
	}
}

export function setToSet<T>(source: ReadonlySet<T>): DestroyableReadonlySet<T> {
	if (source.silent) {
		return source.toSet();
	}
	const target = new Set<T>(source.getKey);
	return target.owning(new SetConverterToSet<T>(source, {target}));
}
