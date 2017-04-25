﻿/*!
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
import Listenable from './Listenable';
import Watchable from './Watchable';

/**
 * Watches source [[JW.Property|properties]] modification and calls
 * the specified functions.
 *
 * [[JW.Switcher.Config.init|init]] function is called on switcher
 * initialization and on property change. The new values of the properties are passed as arguments.
 *
 * [[JW.Switcher.Config.done|done]] function is called on property
 * change and on switcher destruction. The old values of the properties are passed as arguments.
 *
 *     let property = new JW.Property<number>(1);
 *     let switcher = new JW.Switcher([property], {
 *         init: (value: number) => {
 *             console.log("Init " + value);
 *         },
 *         done: (value: number) => {
 *             console.log("Done " + value);
 *         },
 *         scope: this
 *     });                 // output: Init 1
 *     property.set(2);    // output: Done 1, Init 2
 *     property.set(null); // output: Done 2
 *     property.set(3);    // output: Init 3
 *     switcher.destroy(); // output: Done 3
 *
 * By default, switcher doesn't call the callbacks if at least one of the source values is null. You can change it
 * via [[JW.Switcher.Config.acceptNull|acceptNull]] option.
 *
 * Realistic use case for switcher is represented in the next example:
 *
 *     this.selectedFile = this.own(new JW.Property<File>());
 *     this.own(new JW.Switcher([this.selectedFile], {
 *         init: function(file) {
 *             file.selected.set(true);
 *         },
 *         done: function(file) {
 *             file.selected.set(false);
 *         },
 *         scope: this
 *     }));
 */
class Switcher extends Class {
	private _init: Switcher.Callback;
	private _done: Switcher.Callback;
	private _scope: any;
	private _sourceValues: any[];

	/**
	 * @param sources Source properties.
	 * @param config Configuration.
	 */
	constructor(
		readonly sources: Watchable<any>[],
		config?: Switcher.Config)
	{
		super();
		config = config || {};
		this._init = config.init;
		this._done = config.done;
		this._scope = config.scope || this;
		this._sourceValues = null;
		this._doInit();
		sources.forEach(this.watch, this);
	}

	protected destroyObject() {
		this._doDone();
		this._init = null;
		this._done = null;
		this._scope = null;
		this._sourceValues = null;
		super.destroyObject();
	}

	/**
	 * Watches specified event and issues switcher update on the event triggering.
	 * @param event Event.
	 * @returns this
	 */
	bind(event: Listenable<any>): this {
		return this.owning(event.listen(this.update, this));
	}

	/**
	 * Watches specified property and issues switcher update on the property change.
	 * @param property Property.
	 * @returns this
	 */
	watch(property: Watchable<any>): this {
		return this.bind(property.changeEvent);
	}

	/**
	 * Updates switcher forcibly.
	 */
	update() {
		this._doDone();
		this._doInit();
	}

	private _doInit() {
		this._sourceValues = this.sources.map((source) => source.get());
		if (this._init) {
			this._init.apply(this._scope, this._sourceValues);
		}
	}

	private _doDone() {
		if (this._sourceValues && this._done) {
			this._done.apply(this._scope, this._sourceValues);
		}
		this._sourceValues = null;
	}
}

namespace Switcher {
	/**
	 * [[JW.Switcher]] callback.
	 */
	export interface Callback {
		(...sourceValues: any[]): any;
	}

	/**
	 * [[JW.Switcher]] configuration.
	 */
	export interface Config {
		/**
		 * Value initialization callback.
		 */
		readonly init?: Callback;

		/**
		 * Value releasing callback.
		 */
		readonly done?: Callback;

		/**
		 * [[init]] and [[done]] call scope.
		 * Defaults to switcher itself.
		 */
		readonly scope?: any;
	}
}

export default Switcher;
