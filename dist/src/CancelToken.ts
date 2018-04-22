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
import Event from "./Event";

export default class CancelToken implements Destroyable {

	private _event = new Event<any>();

	get cancelled() {
		return this._event == null;
	}

	addHandler(handler: () => any, scope?: any): Destroyable {
		if (this._event) {
			return this._event.listen(handler, scope);
		} else {
			handler.call(scope);
			return dummyDestroyable;
		}
	}

	destroy() {
		this._event.trigger();
		this._event.purge();
		this._event = null;
	}
}

export abstract class AsyncOperation<T> {

	constructor(private cancelToken?: CancelToken) {
	}

	protected abstract run(resolve: (value?: T | Thenable<T>) => void, reject: (error?: any) => void): void;

	protected abstract cancel(): void;

	getPromise(): Promise<T> {
		if (!this.cancelToken) {
			return new Promise((resolve, reject) => this.run(resolve, reject));
		}
		if (this.cancelToken.cancelled) {
			return new Promise<T>(() => null);
		}
		const attachment = this.cancelToken.addHandler(this.cancel, this);
		return new Promise<T>((resolve, reject) => {
			this.run((value?: T | Thenable<T>) => {
				attachment.destroy();
				resolve(value);
			}, (error?: any) => {
				attachment.destroy();
				reject(error);
			})
		});
	}
}
