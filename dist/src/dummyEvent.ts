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
import dummyDestroyable from "./dummyDestroyable";
import IEvent from "./IEvent";

class DummyEvent implements IEvent<any> {

	get dummy() {
		return true;
	}

	purge(): void {
	}

	listen(_handler: (params: any) => any, _scope?: any): Destroyable {
		return dummyDestroyable;
	}

	trigger(_params?: any): void {
	}
}

/**
 * Dummy implementation of `Listenable<any>` interface.
 * As opposed to `Event`, doesn't really bind the event handlers, just pretends it does that.
 */
const dummyEvent = <IEvent<any>>(new DummyEvent()); // An extra variable helps IntelliSense to find this import
export default dummyEvent;
