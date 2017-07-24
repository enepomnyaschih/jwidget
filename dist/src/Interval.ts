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

import Destroyable from './Destroyable';

export default class Interval implements Destroyable {
	private interval: number;

	/**
	 * @param callback Timeout callback function.
	 * @param scope Call scope of callback.
	 * @param ms Timeout delay in milliseconds.
	 */
	constructor(callback: () => any, ms?: number);
	constructor(callback: () => any, scope: any, ms?: number);
	constructor(callback: () => any, scope?: any, ms?: number) {
		if ((scope != null) && (typeof scope === "object")) {
			callback = callback.bind(scope);
		} else if (typeof scope === "number") {
			ms = scope;
		}
		this.interval = setInterval(callback, ms);
	}

	destroy() {
		clearInterval(this.interval);
	}
}
