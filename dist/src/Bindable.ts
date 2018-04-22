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

import DestroyableBindable from "./DestroyableBindable";
import Listenable from "./Listenable";
import Mapper from "./Mapper";

/**
 * Read-only container for a value.
 * Provides basic data binding functionality.
 */
interface Bindable<V> {
	/**
	 * Checks if this property never triggers events. This knowledge may help you do certain code optimizations.
	 */
	readonly silent: boolean;

	/**
	 * Property value is changed. Triggered in result of `set` method call if the value has been changed.
	 */
	readonly changeEvent: Listenable<Bindable.ChangeEventParams<V>>;

	/**
	 * Returns property value.
	 */
	get(): V;

	/**
	 * Builds a new property containing the result of the callback function called
	 * on this property value. To stop synchronization, destroy the resulting property.
	 * To map multiple properties, use `Mapper`.
	 *
	 * @param create Mapping function.
	 * @param config Configuration options.
	 */
	map<U>(create: (value: V) => U, config?: Mapper.Config<U>): DestroyableBindable<U>;
}

export default Bindable;

namespace Bindable {
	/**
	 * `Bindable.changeEvent` params.
	 */
	export interface ChangeEventParams<V> {
		/**
		 * Sender property.
		 */
		readonly sender: Bindable<V>;

		/**
		 * New value.
		 */
		readonly value: V;

		/**
		 * Old value.
		 */
		readonly oldValue: V;
	}
}
