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

import Class from './Class';
import Bindable from './Bindable';
import Watchable from './Watchable';

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
		readonly sources: Watchable<any>[],
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
	bind(event: Bindable<any>): Updater {
		return this.owning(event.bind(this.update, this));
	}

	/**
	 * Watches specified property and issues function call on the property change.
	 * @param property Property.
	 * @returns this
	 */
	watch(property: Watchable<any>): Updater {
		return this.bind(property.changeEvent);
	}

	/**
	 * Calls function focibly.
	 */
	update() {
		const values = this.sources.map((source) => source.get());
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
