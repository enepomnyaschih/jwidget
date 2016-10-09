import {byMethod} from '../core/Core';
import {Class} from '../core/Class';
import {Event} from '../core/Event';
import {Property} from './Property';
import * as ArrayUtils from '../collection/utils/Array';

/**
 * Watches source [[JW.Property|properties]] modification and calls
 * the specified function passing property values as arguments. Also, the
 * function is called on updater initialization.
 *
 *     var frequency = new JW.Property<number>(106.2);
 *     var wave = new JW.Property<string>("FM");
 *     var updater = new JW.Updater([frequency, wave], (frequency: number, wave: string) => {
 *         console.log("Running radio on wave " + frequency + " " + wave);
 *     }, this);           // output: Running radio on wave 106.2 FM
 *     frequency.set(105); // output: Running radio on wave 105 FM
 *     wave.set("USW");    // output: Running radio on wave 105 USW
 */
export class Updater extends Class {
	/**
	 * @param sources Source properties.
	 * @param callback Callback function.
	 * @param scope **callback** call scope. Defaults to updater itself.
	 */
	constructor(
		public sources: Property<any>[],
		private callback: Updater.Callback,
		private scope?: any)
	{
		super();
		this.scope = scope || this;
		this.update();
		ArrayUtils.each(sources, this.watch, this);
	}

	/**
	 * Watches specified event and issues function call on the event triggering.
	 * @param event Event.
	 * @returns this
	 */
	bind(event: Event<any>): Updater {
		this.own(event.bind(this.update, this));
		return this;
	}

	/**
	 * Watches specified property and issues function call on the property change.
	 * @param property Property.
	 * @returns this
	 */
	watch(property: Property<any>): Updater {
		return this.bind(property.changeEvent);
	}

	/**
	 * Calls function focibly.
	 */
	update() {
		var values = ArrayUtils.map(this.sources, byMethod("get"));
		this.callback.apply(this.scope, values);
	}
}

export module Updater {
	/**
	 * [[JW.Updater]] callback.
	 */
	export interface Callback {
		(...sourceValues: any[]);
	}
}
