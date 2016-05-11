/// <reference path="../jwlib.ref.ts" />

module JW {
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
	export class Functor<T> extends Class {
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
			Array.each(sources, this.watch, this);
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
			var values = Array.map(this.sources, byMethod("get"));
			this.target.set(this.callback.apply(this.scope, values));
		}
	}

	export module Functor {
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
}
