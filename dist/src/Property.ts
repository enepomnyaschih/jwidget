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
import Class from "./Class";
import DestroyableBindable from "./DestroyableBindable";
import Event from "./Event";
import IEvent from "./IEvent";
import {destroy} from "./index";
import IProperty from "./IProperty";
import Listenable from "./Listenable";
import {default as Mapper, mapProperties} from "./Mapper";

/**
 * Container for a value. Provides basic data binding functionality.
 */
export default class Property<V> extends Class implements IProperty<V> {
	private _ownsValue = false;

	protected _changeEvent: IEvent<Bindable.ChangeEventParams<V>>;

	/**
	 * Constructs a property and sets initial value.
	 * @param value Initial value.
	 * @param silent If true, uses `dummyEvent` implementation for `changeEvent.
	 */
	constructor(protected value: V = null, silent: boolean = false) {
		super();
		this._changeEvent = Event.make<Bindable.ChangeEventParams<V>>(silent);
	}

	protected destroyObject() {
		if (this._ownsValue) {
			destroy(this.value);
		}
		super.destroyObject();
	}

	/**
	 * Checks if this property never triggers events. This knowledge may help you do certain code optimizations.
	 */
	get silent() {
		return this._changeEvent.dummy;
	}

	/**
	 * Property value is changed. Triggered in result of `set` method call if the value has been changed.
	 */
	get changeEvent(): Listenable<Bindable.ChangeEventParams<V>> {
		return this._changeEvent;
	}

	/**
	 * Returns current property value.
	 * Think twice before calling this method - probably it makes sense to use some kind of binding instead?
	 */
	get(): V {
		return this.value;
	}

	/**
	 * Changes property value and triggers `changeEvent` if the value has been changed.
	 * @param value New value to set.
	 */
	set(value: V) {
		if (value === undefined) {
			value = null;
		}
		const oldValue = this.value;
		if (oldValue === value) {
			return;
		}
		this.value = value;
		this._changeEvent.trigger({ sender: this, value: value, oldValue: oldValue });
		if (this._ownsValue) {
			destroy(oldValue);
		}
	}

	/**
	 * Makes this property an owner of its value. It means that the value is
	 * destroyed automatically on reassignment or destruction of the
	 * property.
	 */
	ownValue(): this {
		this._ownsValue = true;
		return this;
	}

	/**
	 * Builds a new property containing the result of the callback function called
	 * on this property value. To stop synchronization, destroy the result property.
	 * In comparison to `mapDestroyable` method, doesn't destroy the previously assigned target values.
	 * To map multiple properties, use `Mapper`.
	 *
	 * @param create Mapping function.
	 * @param config Mapping configuration.
	 */
	map<U>(create: (value: V) => U, config?: Mapper.Config<U>): DestroyableBindable<U> {
		return mapProperties([this], create, config);
	}
}
