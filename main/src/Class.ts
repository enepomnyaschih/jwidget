/*
MIT License

Copyright (c) 2020 Egor Nepomnyaschih

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

import Destroyable from './Destroyable';
import IClass from './IClass';
import {newIid} from './index';

/**
 * Introduces object aggregation support.
 * If you call `a.own(b)`, then **b** is destroyed automatically on **a** destruction.
 * You can aggregate any object implementing `Destroyable`.
 *
 * See online documentation for details.
 */
class Class implements IClass {
	private _ownagePool: Destroyable[] = null;

	/**
	 * Instance ID.
	 *
	 * Auto-incrementing object unique ID. Each `IClass` instance has such an identifier.
	 * Used, say, in Set as map key for quick item access.
	 */
	readonly iid = newIid();

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
	 * Class destructor invocation method. Destroys all aggregated objects and calls `destroyObject` method.
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
	 * Class destructor implementation. Called inside `destroy` method *after aggregated objects destruction*.
	 * The logic of class instance destruction should be implemented here. If you override this method,
	 * remember to call `super.destroyObject()` at the end of the method.
	 */
	protected destroyObject() {}
}

export default Class;
