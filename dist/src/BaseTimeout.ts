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

import Destroyable from './Destroyable';

abstract class BaseTimeout implements Destroyable {
	private _timeout: number;

	/**
	 * @param callback Timeout callback function.
	 * @param scope Call scope of callback.
	 * @param delay Timeout delay.
	 */
	constructor(callback: () => any, delay?: number);
	constructor(callback: () => any, scope: any, delay?: number);
	constructor(callback: () => any, scope?: any, delay?: number) {
		if ((scope != null) && (typeof scope === "object")) {
			callback = callback.bind(scope);
		} else if (typeof scope === "number") {
			delay = scope;
		}
		var init = this._init;
		this._timeout = init(callback, delay);
	}

	destroy() {
		this._done(this._timeout);
	}

	protected abstract _init(callback: () => any, delay?: number): number;
	protected abstract _done(timeout: number): void;
}

export default BaseTimeout;
