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
 *
 *     class Book extends JW.Class {
 *         cover: Cover = this.own(new Cover());
 *
 *         destroyObject() {
 *             console.log("Destroying book");
 *             super.destroyObject();
 *         }
 *     }
 *
 *     class Cover implements JW.Destroyable {
 *         destroy() {
 *             console.log("Destroying cover");
 *         }
 *     }
 *
 *     let book = new Book();
 *     book.destroy();
 *
 * Output:
 *
 *     Destroying cover
 *     Destroying book
 *
 * Aggregated objects are destroyed in reversive order.
 */
class Class implements IClass {
	private static _lastIid: number = 0;
	private _ownagePool: Destroyable[] = null;

	/**
	 * Instance ID.
	 *
	 * Auto-incremental object unique ID. Each JW.Class instance has such an identifier.
	 * Used in JW.AbstractSet as map key for quick item access.
	 */
	_iid: number;

	constructor() {
		this._iid = ++Class._lastIid;
	}

	/**
	 * Aggregate the specified object in a current one. It means that the specified object will be destroyed automatically
	 * on this object destruction. The aggregated objects are destroyed in a reversive order.
	 *
	 * @param obj An aggregated object.
	 * @returns An aggregated object (**obj**).
	 */
	own<T extends Destroyable>(obj: T): T {
		this._ownagePool = this._ownagePool || [];
		this._ownagePool.push(obj);
		return obj;
	}

	/**
	 * Class destructor invocation method. Destroys all aggregated objects and calls #destroyObject method.
	 * You must call this method explicitly from outside, because JavaScript doesn't support automatic class destructor
	 * calling.
	 *
	 *     let object = new MyClass();
	 *
	 *     // ...
	 *
	 *     // Once object is not needed anymore, destroy it
	 *     object.destroy();
	 *
	 * Alternatively (and optimally), you should use **own** method to aggregate this object inside another one.
	 *
	 * You can override **destroy** method in a subclass to do some preliminary work before aggregated objects destruction.
	 * For example, JW.UI.Component overrides this method to remove child components before their destruction,
	 * before child components are usually aggregated inside the component. However, in the majority of cases,
	 * you should override **destroyObject** method instead to customize destruction logic.
	 */
	destroy() {
		// TODO: assert(this._ownagePool != null);
		let pool = this._ownagePool;
		if (pool == null) {
			return;
		}
		this._ownagePool = null;
		for (let i = pool.length - 1; i >= 0; --i) {
			pool[i].destroy();
		}
		this.destroyObject();
	}

	/**
	 * Class destructor implementation. Called inside **destroy** method *after aggregated objects destruction*.
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
