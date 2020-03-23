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

import Class from '../Class';
import ISet from '../ISet';
import ReadonlyCollection from '../ReadonlyCollection';
import Set from '../Set';
import ReadonlySet from "../ReadonlySet";

/**
 * Converter to set.
 * @param T Collection item type.
 */
abstract class AbstractConverterToSet<T> extends Class {
	private _targetCreated: boolean;

	/**
	 * @hidden
	 */
	protected _target: ISet<T>;

	/**
	 * @param source Source collection.
	 * @param config Converter configuration.
	 */
	constructor(readonly source: ReadonlyCollection<T>, config: AbstractConverterToSet.Config<T> = {}) {
		super();
		this._targetCreated = config.target == null;
		this._target = this._targetCreated ? new Set<T>(source.getKey, source.silent) : config.target;
		this._target.tryAddAll(source.asArray());
	}

	/**
	 * Target set.
	 */
	get target(): ReadonlySet<T> {
		return this._target;
	}

	/**
	 * @inheritDoc
	 */
	protected destroyObject() {
		this._target.tryRemoveAll(this.source.asArray());
		if (this._targetCreated) {
			this._target.destroy();
		}
		super.destroyObject();
	}
}

export default AbstractConverterToSet;

namespace AbstractConverterToSet {
	/**
	 * AbstractLister configuration.
	 * @param T Collection item type.
	 */
	export interface Config<T> {
		/**
		 * Target set. By default, created automatically.
		 */
		readonly target?: ISet<T>;
	}
}
