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

import Destroyable from './Destroyable';
import IClass from './IClass';

/**
 * The base class of all jWidget classes.
 * Introduces object aggregation support.
 * If you call `a.own(b)`, then **b** is destroyed automatically on **a** destruction.
 * You can aggregate any object implementing `Destroyable`.
 *
 * See online documentation for details.
 */
class Class implements IClass {
	private static _lastIid: number = 0;
	private _ownagePool: Destroyable[] = null;

	/**
	 * Instance ID.
	 *
	 * Auto-incrementing object unique ID. Each IClass instance has such an identifier.
	 * Used, say, in AbstractSet as map key for quick item access.
	 */
	_iid: number;

	constructor() {
		this._iid = ++Class._lastIid;
	}

	/**
	 * Aggregates the object. It means that the specified object is automatically destroyed
	 * on this object destruction. The aggregated objects are destroyed in reverse order.
	 * Returns the aggregated object, which makes it easy to use in field definition.
	 *
	 * @param obj Object to aggregate.
	 */
	own<T extends Destroyable>(obj: T): T {
		this._ownagePool = this._ownagePool || [];
		this._ownagePool.push(obj);
		return obj;
	}

	/**
	 * Aggregates the object. It means that the specified object is automatically destroyed
	 * on this object destruction. The aggregated objects are destroyed in reverse order.
	 * Returns this object, which makes it easy to use in object instantiation.
	 *
	 * @param obj Object to aggregate.
	 */
	owning(obj: Destroyable): this {
		this.own(obj);
		return this;
	}

	/**
	 * Class destructor invocation method. Destroys all aggregated objects and calls destroyObject method.
	 * You must call this method explicitly from outside, because JavaScript doesn't support automatic class destructor
	 * calling.
	 */
	destroy() {
		// TODO: assert(this._ownagePool != null);
		const pool = this._ownagePool;
		if (pool != null) {
			this._ownagePool = null;
			for (let i = pool.length - 1; i >= 0; --i) {
				pool[i].destroy();
			}
		}
		this.destroyObject();
	}

	/**
	 * Class destructor implementation. Called inside [[destroy]] method *after aggregated objects destruction*.
	 * The logic of class instance destruction should be implemented here. If you override this method,
	 * remember to call `super.destroyObject()` at the end of the method.
	 */
	protected destroyObject() {}
}

export default Class;
