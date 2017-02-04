import Class from './Class';

abstract class BaseTimeout extends Class {
	private _timeout: number;

	/**
	 * @param callback Timeout callback function.
	 * @param scope Call scope of callback.
	 * @param delay Timeout delay.
	 */
	constructor(callback: () => any, delay?: number);
	constructor(callback: () => any, scope: any, delay?: number);
	constructor(callback: () => any, scope?: any, delay?: number) {
		super();
		if ((scope != null) && (typeof scope === "object")) {
			callback = callback.bind(scope);
		} else if (typeof scope === "number") {
			delay = scope;
		}
		var init = this._init;
		this._timeout = init(callback, delay);
	}

	protected destroyObject() {
		this._done(this._timeout);
		super.destroyObject();
	}

	protected abstract _init(callback: () => any, delay?: number): number;
	protected abstract _done(timeout: number): void;
}

export default BaseTimeout;
