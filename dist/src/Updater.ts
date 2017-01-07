﻿import Class from './Class';
import Event from './Event';
import Property from './Property';

/**
 * Watches source [[JW.Property|properties]] modification and calls
 * the specified function passing property values as arguments. Also, the
 * function is called on updater initialization.
 *
 *     let frequency = new JW.Property<number>(106.2);
 *     let wave = new JW.Property<string>("FM");
 *     let updater = new JW.Updater([frequency, wave], (frequency: number, wave: string) => {
 *         console.log("Running radio on wave " + frequency + " " + wave);
 *     }, this);           // output: Running radio on wave 106.2 FM
 *     frequency.set(105); // output: Running radio on wave 105 FM
 *     wave.set("USW");    // output: Running radio on wave 105 USW
 */
class Updater extends Class {
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
		sources.forEach(this.watch, this);
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
		let values = this.sources.map((source) => source.get());
		this.callback.apply(this.scope, values);
	}
}

namespace Updater {
	/**
	 * [[JW.Updater]] callback.
	 */
	export interface Callback {
		(...sourceValues: any[]): any;
	}
}

export default Updater;