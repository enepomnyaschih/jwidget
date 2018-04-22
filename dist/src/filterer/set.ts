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

import DestroyableReadOnlySet from '../DestroyableReadOnlySet';
import ISet from '../ISet';
import ReadOnlySet from '../ReadOnlySet';
import Set from '../Set';
import AbstractFilterer from './AbstractFilterer';

/**
 * [[JW.Abstract.Filterer|Filterer]] implementation for [[JW.Set]].
 */
class SetFilterer<T> extends AbstractFilterer<T> {
	private _targetCreated: boolean;

	/**
	 * @inheritdoc
	 */
	readonly source: ReadOnlySet<T>;

	/**
	 * @inheritdoc
	 */
	readonly target: ISet<T>;

	/**
	 * @inheritdoc
	 */
	constructor(source: ReadOnlySet<T>, test: (item: T) => any,
				config: SetFilterer.Config<T> = {}) {
		super(source, test, config);
		this._targetCreated = config.target == null;
		this.target = this._targetCreated ? new Set<T>(source.getKey, this.source.silent) : config.target;
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
	export interface Config<T> extends AbstractFilterer.Config {
		/**
		 * @inheritdoc
		 */
		readonly target?: ISet<T>;
	}
}

export function filterSet<T>(source: ReadOnlySet<T>, test: (item: T) => any,
							 scope?: any): DestroyableReadOnlySet<T> {
	if (source.silent) {
		return source.filter(test, scope);
	}
	const target = new Set<T>(source.getKey);
	return target.owning(new SetFilterer<T>(source, test, {target, scope}));
}
