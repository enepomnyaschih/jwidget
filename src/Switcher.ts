import {isNotNil} from './Core';
import Class from './Class';
import Event from './Event';
import Property from './Property';

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
	private _acceptNull: boolean;
	private _sourceValues: any[];

	/**
	 * @param sources Source properties.
	 * @param config Configuration.
	 */
	constructor(
		public sources: Property<any>[],
		config?: Switcher.Config)
	{
		super();
		config = config || {};
		this._init = config.init;
		this._done = config.done;
		this._scope = config.scope || this;
		this._acceptNull = config.acceptNull || false;
		this._sourceValues = null;
		this._doInit();
		sources.forEach(this.watch, this);
	}

	protected destroyObject() {
		this._doDone();
		this.sources = null;
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
	bind(event: Event<any>): Switcher {
		this.own(event.bind(this.update, this));
		return this;
	}

	/**
	 * Watches specified property and issues switcher update on the property change.
	 * @param property Property.
	 * @returns this
	 */
	watch(property: Property<any>): Switcher {
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
		let values = this.sources.map((source) => source.get());
		this._sourceValues = (this._acceptNull || values.every(isNotNil)) ? values : null;
		if (this._sourceValues && this._init) {
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
		init?: Callback;

		/**
		 * Value releasing callback.
		 */
		done?: Callback;

		/**
		 * [[init]] and [[done]] call scope.
		 * Defaults to switcher itself.
		 */
		scope?: any;

		/**
		 * If false, functions won't be called if at least one of the source values is null.
		 */
		acceptNull?: boolean;
	}
}

export default Switcher;
