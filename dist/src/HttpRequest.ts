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

import ChainedDestroyablePromise from "./ChainedDestroyablePromise";
import DestroyablePromise from "./DestroyablePromise";

export default class HttpRequest<T> implements DestroyablePromise<T> {
	private aborted = false;
	private _native: Promise<T>;

	constructor(private xhr?: JQueryXHR, private factory?: (response: any) => T) {
		this._native = new Promise<T>((resolve, reject) => {
			if (!this.xhr) {
				reject();
			}
			this.xhr.then((response) => {
				resolve(this.factory ? this.factory(response) : response);
			}, (request) => {
				if (!this.aborted) {
					reject(request);
				}
			});
		});
	}

	get native() {
		return this._native;
	}

	destroy() {
		this.aborted = true;
		this.xhr.abort();
	}

	then<U>(onFulfilled?: (value: T) => U | Thenable<U>, onRejected?: (error: any) => U | Thenable<U>): DestroyablePromise<U>;
	then<U>(onFulfilled?: (value: T) => U | Thenable<U>, onRejected?: (error: any) => void): DestroyablePromise<U>;
	then<U>(onFulfilled?: (value: T) => U | Thenable<U>, onRejected?: (error: any) => any): DestroyablePromise<U> {
		return new ChainedDestroyablePromise(this._native.then(onFulfilled, onRejected), this);
	}

	catch<U>(onRejected?: (error: any) => U | Thenable<U>): DestroyablePromise<U> {
		return new ChainedDestroyablePromise(this._native.catch(onRejected), this);
	}
}
