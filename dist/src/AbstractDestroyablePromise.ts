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

import Class from "./Class";
import Destroyable from "./Destroyable";
import DestroyablePromise from "./DestroyablePromise";
import {isDestroyablePromise} from "./DestroyablePromise";

abstract class AbstractDestroyablePromise<T> extends Class implements DestroyablePromise<T> {
	constructor(readonly native: Promise<T>) {
		super();
	}

	then<U>(onFulfilled?: (value: T) => U | Thenable<U>, onRejected?: (error: any) => U | Thenable<U>): DestroyablePromise<U>;
	then<U>(onFulfilled?: (value: T) => U | Thenable<U>, onRejected?: (error: any) => void): DestroyablePromise<U>;
	then<U>(onFulfilled?: (value: T) => U | Thenable<U>, onRejected?: (error: any) => any): DestroyablePromise<U> {
		return ChainedDestroyablePromise.then(this, onFulfilled, onRejected);
	}

	catch<U>(onRejected?: (error: any) => U | Thenable<U>): DestroyablePromise<U> {
		return ChainedDestroyablePromise.fail(this, onRejected);
	}
}

export default AbstractDestroyablePromise;

class ChainedDestroyablePromise<T> extends AbstractDestroyablePromise<T> {
	constructor(native: Promise<T>, private baseDestroyable: Destroyable) {
		super(native);
	}

	destroy() {
		if (this.baseDestroyable) {
			this.baseDestroyable.destroy();
		}
	}

	// These methods use private stuff, so they must be present in the body
	static then<T, U>(base: DestroyablePromise<T>,
		onFulfilled?: (value: T) => U | Thenable<U>,
		onRejected?: (error: any) => U | Thenable<U>): DestroyablePromise<U> {

		const chain: ChainedDestroyablePromise<U> = new ChainedDestroyablePromise<U>(base.native.then<U>(
			onFulfilled ? (result: any) => ChainedDestroyablePromise.handleChain<U>(chain, onFulfilled(result)) : null,
			onRejected ? (error: any) => ChainedDestroyablePromise.handleChain<U>(chain, onRejected(error)) : null
		), base);
		return chain;
	}

	static fail<T, U>(base: DestroyablePromise<T>,
		onRejected?: (error: any) => U | Thenable<U>): DestroyablePromise<U> {

		const chain: ChainedDestroyablePromise<U> = new ChainedDestroyablePromise<U>(base.native.catch<U>(
			onRejected ? (error: any) => ChainedDestroyablePromise.handleChain<U>(chain, onRejected(error)) : null
		), base);
		return chain;
	}

	private static handleChain<U>(chain: ChainedDestroyablePromise<U>, result: any): U | Thenable<U> {
		if (!isDestroyablePromise(result)) {
			chain.baseDestroyable = null;
			return result;
		}
		const destroyable = <DestroyablePromise<U>>result;
		chain.baseDestroyable = destroyable;
		return destroyable.native;
	}
}
