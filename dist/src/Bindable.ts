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

import Destroyable from "./Destroyable";

/**
 * Used to notify some objects (clients) about certain events (for example, field value change).
 * Remember to destroy the event attachments to prevent side effects.
 */
interface Bindable<P> {
	/**
	 * Starts listening to the event.
	 *
	 * Whenever the event is triggered with `trigger` method, specified handler function
	 * is called in specified scope.
	 *
	 * You can stop listening the event by destroying the returned EventAttachment instance.
	 *
	 * @param handler Event handler function.
	 * @param scope `handler` call scope.
	 */
	bind(handler: (params: P) => void, scope?: any): Destroyable;
}

export default Bindable;
