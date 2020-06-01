/*
MIT License

Copyright (c) 2020 Egor Nepomnyaschih

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

import jQuery from "jquery";
import IProperty from "./IProperty";
import Property from "./Property";

/**
 * Interface of `hash` object. Extension of IProperty<string> interface with `updating` status indicator and
 * `replaceState` optional parameter of `set` method.
 */
export interface IHash extends IProperty<string> {

	/**
	 * Indicates if hash assignment is in progress at the moment. While `updating` is true, `location.hash`
	 * gets modified and `changeEvent` gets triggered. Checking this flag in corresponding event handlers may prevent
	 * infinite loops and unexpected callback conflicts.
	 */
	readonly updating: boolean;

	/**
	 * Assigns `location.hash` to a new value and triggers `changeEvent`. Rises `updating` flag to prevent
	 * infinite loops and callback conflicts during this time.
	 * @param value New hash value to assign.
	 * @param replaceState Replace the current browser historical state rather than pushing a new state to the stack.
	 */
	set(value: string, replaceState?: boolean): void;
}

class Hash extends Property<string> implements IHash {

	private readonly redirectionDetectionInterval = 1000;
	private readonly redirectionDetectionLimit = 25;

	private redirectionStartTime = Number.NEGATIVE_INFINITY;
	private redirectionUrls: string[] = [];
	private redirectionLocked = false;

	private _updating = false;

	constructor() {
		super(location.hash.substr(1));
		if (hash != null) {
			throw new Error("Hash is a singleton. Unable to create more instances.")
		}
		hash = this;
		jQuery(window).on("hashchange", () => {
			this.set(location.hash.substr(1));
		});
	}

	get updating() {
		return this._updating;
	}

	set(value: string = "", replaceState?: boolean) {
		if (this.redirectionLocked) {
			return;
		}
		const oldValue = this.value;
		if (oldValue === value) {
			return;
		}

		const time = new Date().getTime();
		if (time - this.redirectionStartTime < this.redirectionDetectionInterval) {
			this.redirectionUrls.push(value);
			if (this.redirectionUrls.length > this.redirectionDetectionLimit) {
				console.error("Endless URL redirection detected. Preventing all further redirections. See URLs below. " +
					"If this information is not enough, please set breakpoint to this method and find out what causes " +
					"unexpected redirection calls. Probably you have misconfigured some router - " +
					"please check router names and parents.");
				console.log(this.redirectionUrls);
				this.redirectionLocked = true;
				return;
			}
		} else {
			this.redirectionStartTime = time;
			this.redirectionUrls = [value];
		}

		this._updating = true;
		this.value = value;
		if (replaceState && window.history && history.replaceState) {
			history.replaceState(null, "", location.pathname + "#" + value);
		} else {
			location.hash = "#" + value;
		}
		this._changeEvent.trigger({sender: this, value, oldValue});
		this._updating = false;
	}
}

/**
 * Instance of IHash singleton. Provides a transparent Property-compatible interface over `location.hash`
 * manipulations. Value of this property is always equal to `location.hash` without leading "#" symbol.
 * Has a built-in protection against infinite redirections.
 */
let hash: IHash = null; // An extra variable helps IntelliSense to find this import
new Hash();
export default hash;
