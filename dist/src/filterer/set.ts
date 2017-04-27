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
import ISet from '../ISet';
import Set from '../Set';

/**
 * [[JW.AbstractCollection.Filterer|Filterer]] implementation for [[JW.Set]].
 */
class SetFilterer<T> extends AbstractCollectionFilterer<T> {
	private _targetCreated: boolean;

	/**
	 * @inheritdoc
	 */
	readonly source: ISet<T>;

	/**
	 * @inheritdoc
	 */
	readonly target: ISet<T>;

	/**
	 * @inheritdoc
	 */
	constructor(source: ISet<T>, config: SetFilterer.Config<T>) {
		super(source, config);
		this._targetCreated = config.target == null;
		this.target = this._targetCreated ? new Set<T>(this.source.silent) : config.target;
		this.target.tryAddAll(source.toList().items.filter(this._test, this._scope));
		this.own(source.spliceEvent.listen(this._onSplice, this));
		this.own(source.clearEvent.listen(this._onClear, this));
	}

	/**
	 * @inheritdoc
	 */
	protected destroyObject() {
		this.target.tryRemoveAll(this.source.toArray());
		if (this._targetCreated) {
			this.target.destroy();
		}
		super.destroyObject();
	}

	private _onSplice(params: ISet.SpliceEventParams<T>) {
		var spliceResult = params.spliceResult;
		this.target.trySplice(
			spliceResult.removedItems,
			spliceResult.addedItems.filter(this._test, this._scope));
	}

	private _onClear(params: ISet.ItemsEventParams<T>) {
		this.target.tryRemoveAll(params.items);
	}
}

export default SetFilterer;

namespace SetFilterer {
	/**
	 * @inheritdoc
	 */
	export interface Config<T> extends AbstractCollectionFilterer.Config<T> {
		/**
		 * @inheritdoc
		 */
		readonly target?: ISet<T>;
	}
}

export function filterSet<T>(source: ISet<T>, test: (item: T) => boolean, scope?: any): ISet<T> {
	if (source.silent) {
		return source.filter(test, scope);
	}
	const result = new Set<T>();
	return result.owning(new SetFilterer<T>(source, {
		target: result,
		test: test,
		scope: scope
	}));
}
