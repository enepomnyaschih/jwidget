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

import Bindable from "./Bindable";
import Destroyable from "./Destroyable";
import ValueChangeEventParams from "./ValueChangeEventParams";

/**
 * The observable property. A convenient way to keep an object in sync with another object.
 * Provides a number of model and view bindings.
 */
interface Watchable<V> extends Destroyable {
	/**
	 * Property value is changed. Triggered in result of `set` method call if the value has been changed.
	 */
	changeEvent: Bindable<ValueChangeEventParams<V>>;

	/**
	 * Returns property value.
	 */
	get(): V;

	/**
	 * Builds a new property containing the result of the callback function called
	 * on this property value. To stop synchronization, destroy the result property.
	 * In comparison to `mapObject` method, doesn't destroy the previously assigned target values.
	 * To map multiple properties, use `Mapper`.
	 *
	 * @param callback Mapping function.
	 * @param scope `callback` call scope. Defaults to the property itself.
	 */
	map<U>(callback: (value: V) => U, scope?: any): Watchable<U>;

	/**
	 * Builds a new property containing the result of the callback function called
	 * on this property value. To stop synchronization, destroy the result property.
	 * In comparison to `mapObject` method, destroys the previously assigned target values.
	 * To map multiple properties, use `Mapper`.
	 *
	 * @param callback Mapping function.
	 * @param scope `callback` call scope. Defaults to the property itself.
	 */
	mapDestroyable<U extends Destroyable>(callback: (value: V) => U, scope?: any): Watchable<U>;
}

export default Watchable;
