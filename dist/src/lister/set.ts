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

import AbstractCollectionLister from './AbstractCollectionLister';
import Identifiable from '../Identifiable';
import ISet from '../ISet';
import Set from '../Set';

/**
 * [[JW.AbstractCollection.Lister|Lister]] implementation for [[JW.Set]].
 */
export default class SetLister<T extends Identifiable> extends AbstractCollectionLister<T> {
	/**
	 * @inheritdoc
	 */
	readonly source: ISet<T>;

	/**
	 * @inheritdoc
	 */
	constructor(source: ISet<T>, config: AbstractCollectionLister.Config<T>) {
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

export function setToSet<T extends Identifiable>(source: ISet<T>): ISet<T> {
	if (source.silent) {
		return source.$toSet();
	}
	const result = new Set<T>();
	return result.owning(new SetLister<T>(source, {
		target: result
	}));
}
