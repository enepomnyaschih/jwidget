/// <reference path="../jwlib.ref.ts" />

module JW {
	export class BaseTimeout extends Class {
		private _timeout: number;
		_init: (callback: () => any, delay?: number) => number;
		_done: (timeout: number) => void;

		/**
		 * @param callback Timeout callback function.
		 * @param scope Call scope of callback.
		 * @param delay Timeout delay.
		 */
		constructor(
			callback: () => any,
			scope: any,
			delay?: number)
		{
			super();
			if ((scope != null) && (typeof scope === "object")) {
				callback = inScope(callback, scope);
			} else if (typeof scope === "number") {
				delay = scope;
			}
			var init = this._init;
			this._timeout = init(callback, delay);
		}

		protected destroyObject() {
			var done = this._done;
			done(this._timeout);
			super.destroyObject();
		}
	}

	/**
	 * jWidget wrapper over setTimeout function.
	 * JW.Timeout destruction causes clearTimeout invocation.
	 * Convenient to use in combination with "own" method:
	 *
	 *     this.own(new JW.Timeout(this._update, this, 1000));
	 */
	export class Timeout extends BaseTimeout {}
	Timeout.prototype._init = setTimeout;
	Timeout.prototype._done = clearTimeout;

	/**
	 * jWidget wrapper over setInterval function.
	 * JW.Interval destruction causes clearInterval invocation.
	 * Convenient to use in combination with "own" method:
	 *
	 *     this.own(new JW.Interval(this._update, this, 1000));
	 */
	export class Interval extends BaseTimeout {}
	Interval.prototype._init = setInterval;
	Interval.prototype._done = clearInterval;
}
