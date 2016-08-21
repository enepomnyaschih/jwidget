import {Destroyable} from './Destroyable';

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
 *     var book = new Book();
 *     book.destroy();
 *
 * Output:
 *
 *     Destroying cover
 *     Destroying book
 *
 * Aggregated objects are destroyed in reversive order.
 */
export class Class implements Destroyable {
	private static _lastIid: number = 0;
	private _ownagePool: Destroyable[] = [];

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
		this._ownagePool.push(obj);
		return obj;
	}

	/**
	 * Class destructor invocation method. Destroys all aggregated objects and calls #destroyObject method.
	 * You must call this method explicitly from outside, because JavaScript doesn't support automatic class destructor
	 * calling.
	 *
	 *     var object = new MyClass();
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
		var pool = this._ownagePool;
		this._ownagePool = null;
		for (var i = pool.length - 1; i >= 0; --i) {
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
