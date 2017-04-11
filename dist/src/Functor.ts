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

import Class from './Class';
import Event from './Event';
import Property from './Property';

/**
 * Watches source [[JW.Property|properties]] modification and updates
 * a target property based on their values.
 *
 *     var value = new JW.Property<number>(1000);
 *     var unit = new JW.Property<string>("MW");
 *     var target = new JW.Property<string>();
 *     var functor = new JW.Functor<string>([value, unit], (value: number, unit: string) => {
 *         return value + " " + unit;
 *     }, this, {target: target});
 *     assert.strictEqual("1000 MW", target.get());
 *     value.set(1500);
 *     assert.strictEqual("1500 MW", target.get());
 *     unit.set("МВт"); // change localization to Russian
 *     assert.strictEqual("1500 МВт", target.get());
 *
 * If **target** is omitted in constructor, it is created automatically. Notice
 * that functor owns it in this case.
 *
 *     var value = new JW.Property<number>(1000);
 *     var unit = new JW.Property<string>("MW");
 *     var functor = new JW.Functor<string>([value, unit], (value: number, unit: string) => {
 *         return value + " " + unit;
 *     }, this);
 *     var target = functor.target;
 *     assert.strictEqual("1000 MW", target.get());
 *
 * Functor doesn't let you destroy a previously assigned value. Functor doesn't reset the value of target property
 * on destruction. Use [[JW.Mapper]] if you need these features.
 *
 * @param T Target property value type.
 */
class Functor<T> extends Class {
	private _targetCreated: boolean;

	/**
	 * Target property.
	 */
	target: Property<T>;

	/**
	 * @param sources Source properties.
	 * @param callback Calculates target property value based on source property values.
	 * @param scope **callback** call scope. Defaults to functor itself.
	 * @param config Configuration.
	 */
	constructor(
		public sources: Property<any>[],
		private callback: Functor.Callback<T>,
		private scope?: any,
		config?: Functor.Config<T>)
	{
		super();
		config = config || {};
		this.scope = scope || this;
		this._targetCreated = config.target == null;
		this.target = this._targetCreated ? new Property<T>() : config.target;
		this.update();
		sources.forEach(this.watch, this);
	}

	protected destroyObject() {
		if (this._targetCreated) {
			this.target.destroy();
		}
		this.sources = null;
		this.target = null;
		this.callback = null;
		this.scope = null;
		super.destroyObject();
	}

	/**
	 * Watches specified event and issues target value recalculation on
	 * the event triggering.
	 * @param event Event.
	 * @returns this
	 */
	bind(event: Event<any>): Functor<T> {
		this.own(event.bind(this.update, this));
		return this;
	}

	/**
	 * Watches specified property and issues target value recalculation on
	 * the property change.
	 * @param property Property.
	 * @returns this
	 */
	watch(property: Property<any>): Functor<T> {
		return this.bind(property.changeEvent);
	}

	/**
	 * Updates target property focibly.
	 */
	update() {
		var values = this.sources.map((source) => source.get());
		this.target.set(this.callback.apply(this.scope, values));
	}
}

namespace Functor {
	/**
	 * [[JW.Functor]] callback.
	 *
	 * @param T Target property value type.
	 */
	export interface Callback<T> {
		(...sourceValues: any[]): T;
	}

	/**
	 * [[JW.Functor]] configuration.
	 *
	 * @param T Target property value type.
	 */
	export interface Config<T> {
		/**
		 * Target property. By default, created automatically.
		 */
		target?: Property<T>;
	}
}

export default Functor;
