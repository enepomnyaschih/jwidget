/*
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

import Property from "./Property";

/**
 * Current page hash (without leading "#"). As of jWidget 1.4.1, two-way bound to location.hash.
 * This is a singleton available as [[hash]].
 */
export class Hash extends Property<string> {
	private readonly redirectionDetectionInterval = 1000;
	private readonly redirectionDetectionLimit = 25;

	private redirectionStartTime = Number.NEGATIVE_INFINITY;
	private redirectionUrls: string[] = [];
	private redirectionLocked = false;

	private _updating = false;

	constructor() {
		super(location.hash.substr(1));
		$(window).on("hashchange", () => {
			this.set(location.hash.substr(1));
		});
	}

	get updating() {
		return this._updating;
	}

	/**
	 * Changes current page hash to the specified value.
	 *
	 * @param value New page hash value.
	 * @param replaceState If true, browser history forgets the current state, so that
	 * "Back" button returns you two steps back instead of one. Useful for automatic page redirections.
	 */
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

const hash = new Hash(); // An extra variable helps IntelliSense to find this import
export default hash;
