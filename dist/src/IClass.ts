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

import Destroyable from './Destroyable';
import Identifiable from './Identifiable';

/**
 * The base class of all jWidget classes.
 * Introduces object aggregation support.
 * If you call `a.own(b)`, then **b** is destroyed automatically on **a** destruction.
 * You can aggregate any object implementing Destroyable.
 *
 * See online documentation for details.
 */
interface IClass extends Destroyable, Identifiable {
	/**
	 * Aggregates the object. It means that the specified object is automatically destroyed
	 * on this object destruction. The aggregated objects are destroyed in reverse order.
	 * Returns the aggregated object, which makes it easy to use in field definition.
	 *
	 * @param obj Object to aggregate.
	 */
	own<T extends Destroyable>(obj: T): T;

	/**
	 * Aggregates the object. It means that the specified object is automatically destroyed
	 * on this object destruction. The aggregated objects are destroyed in reverse order.
	 * Returns this object, which makes it easy to use in object instantiation.
	 *
	 * @param obj Object to aggregate.
	 */
	owning(obj: Destroyable): this;
}

export default IClass;
