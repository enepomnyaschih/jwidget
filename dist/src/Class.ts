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
 *
 * See [[IClass]] for details.
 */
class Class implements IClass {
	private static _lastIid: number = 0;
	private _ownagePool: Destroyable[] = null;

	/**
	 * @inheritdoc
	 */
	_iid: number;

	constructor() {
		this._iid = ++Class._lastIid;
	}

	/**
	 * @inheritdoc
	 */
	own<T extends Destroyable>(obj: T): T {
		this._ownagePool = this._ownagePool || [];
		this._ownagePool.push(obj);
		return obj;
	}

	/**
	 * @inheritdoc
	 */
	owning(obj: Destroyable): this {
		this.own(obj);
		return this;
	}

	/**
	 * Class destructor invocation method. Destroys all aggregated objects and calls #destroyObject method.
	 * You must call this method explicitly from outside, because JavaScript doesn't support automatic class destructor
	 * calling.
	 *
	 *     const object = new MyClass();
	 *
	 *     // ...
	 *
	 *     // Once object is not needed anymore, destroy it
	 *     object.destroy();
	 *
	 * Alternatively (and optimally), you should use [[own]] method to aggregate this object inside another one.
	 *
	 * You can override [[destroy]] method in a subclass to do some preliminary work before aggregated objects destruction.
	 * For example, [[Component]] overrides this method to remove child components before their destruction,
	 * because child components are usually aggregated inside the component. However, in the majority of cases,
	 * you should override [[destroyObject]] method instead to customize destruction logic.
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
	 * remember to call superclass destructor at the end of the method:
	 *
	 *     destroyObject: function() {
	 *         // Release resources
	 *         ...
	 *         // Call superclass destructor
	 *         super.destroyObject();
	 *     }
	 */
	protected destroyObject() {}
}

export default Class;
