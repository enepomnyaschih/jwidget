/// <reference path="../jwlib.ref.ts" />

module JW {
	/**
	 * Watches source [[JW.Property]] modification and copies
	 * its value to target property.
	 *
	 *     var source = new JW.Property<number>(1);
	 *     var target = new JW.Property<number>();
	 *     var copier = new JW.Copier<number>(source, {target: target});
	 *     assert.strictEqual(1, target.get());
	 *     source.set(2);
	 *     assert.strictEqual(2, target.get());
	 *
	 * If target is omitted in constructor, it is created automatically. Notice
	 * that copier owns it in this case.
	 *
	 *     var source = new JW.Property<number>(1);
	 *     var target = new JW.Copier<number>(this.source).target;
	 *     assert.strictEqual(1, target.get());
	 *
	 * [[JW.Property]] has a shorthand method [[JW.Property.bindTo|bindTo]] for the same purpose:
	 *
	 *     var source = new JW.Property<number>(1);
	 *     var target = new JW.Property<number>();
	 *     target.bindTo(source);
	 *     assert.strictEqual(1, target.get());
	 *
	 * @param T Property value type.
	 */
	export class Copier<T> extends Class {
		private _targetCreated: boolean;

		/**
		 * Target property.
		 */
		target: Property<T>;

		/**
		 * @param source Source property.
		 * @param config Configuration.
		 */
		constructor(public source: Property<T>, config?: Copier.Config<T>) {
			super();
			config = config || {};
			this._targetCreated = config.target == null;
			this.target = this._targetCreated ? new Property<T>() : config.target;
			this._update();
			this.own(source.changeEvent.bind(this._update, this));
		}

		protected destroyObject() {
			if (this._targetCreated) {
				this.target.destroy();
			}
			this.source = null;
			this.target = null;
			super.destroyObject();
		}

		private _update() {
			this.target.set(this.source.get());
		}
	}

	export module Copier {
		/**
		 * [[JW.Copier]] configuration.
		 *
		 * @param T Property value type.
		 */
		export interface Config<T> {
			/**
			 * Target property. By default, created automatically.
			 */
			target?: Property<T>;
		}
	}
}
