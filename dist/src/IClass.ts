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

/**
 * Introduces object aggregation support.
 * If you call `a.own(b)`, then **b** is destroyed automatically on **a** destruction.
 * Default implementation is available in [[Class]].
 *
 *     class Book extends Class {
 *         cover = this.own(new Cover());
 *
 *         destroyObject() {
 *             console.log("Destroying book");
 *             super.destroyObject();
 *         }
 *     }
 *
 *     class Cover implements Destroyable {
 *         destroy() {
 *             console.log("Destroying cover");
 *         }
 *     }
 *
 *     const book = new Book();
 *     book.destroy();
 *
 * Output:
 *
 *     Destroying cover
 *     Destroying book
 *
 * Aggregated objects are destroyed in reverse order.
 */
interface IClass extends Destroyable {
	/**
	 * Instance ID.
	 *
	 * Auto-incremental object unique ID. Each [[IClass]] instance has such an identifier.
	 * Used, say, in [[AbstractSet]] as map key for quick item access.
	 */
	_iid: number;

	/**
	 * Aggregates the object. It means that the specified object is automatically destroyed
	 * on this object destruction. The aggregated objects are destroyed in reverse order.
	 * Returns the aggregated object, which makes it easy to use in field definition:
	 *
	 * 	private selected = this.own(new Property(false));
	 *
	 * @param obj Object to aggregate.
	 * @returns obj
	 */
	own<T extends Destroyable>(obj: T): T;

	/**
	 * Aggregates the object. It means that the specified object is automatically destroyed
	 * on this object destruction. The aggregated objects are destroyed in reverse order.
	 * Returns this object, which makes it easy to use in object instantiation:
	 *
	 * 	const items = new ObservableArray();
	 * 	return new Panel(items).owning(items);
	 *
	 * @param obj Object to aggregate.
	 * @returns this
	 */
	owning(obj: Destroyable): this;
}

export default IClass;
