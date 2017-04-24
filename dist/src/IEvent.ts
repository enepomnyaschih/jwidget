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

import Destroyable from "./Destroyable";
import Bindable from "./Bindable";

/**
 * Extension of `Bindable` interface with `trigger` method.
 */
interface IEvent<P> extends Bindable<P>, Destroyable {
	/**
	 * Triggers event, i.e. calls all bound handlers.
	 * @param params Event params.
	 */
	trigger(params?: P): void;

	/**
	 * Class destructor invocation method. Unbinds all event handlers.
	 * As opposed to the majority of classes, you can call event's `destroy` method multiple times.
	 */
	destroy(): void;
}

export default IEvent;
