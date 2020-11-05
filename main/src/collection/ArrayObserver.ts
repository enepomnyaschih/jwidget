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

import IBindableArray from '../IBindableArray';
import ReadonlyBindableArray from '../ReadonlyBindableArray';
import AbstractObserver from './AbstractObserver';

/**
 * AbstractObserver implementation for arrays.
 */
export default class ArrayObserver<T> extends AbstractObserver<T> {
	/**
	 * @param source Source array.
	 * @param config Observer configuration.
	 */
	constructor(readonly source: ReadonlyBindableArray<T>, config: AbstractObserver.Config<T>) {
		super(config);
		this._addItems(source.native);
		this.own(source.onSplice.listen(this._onSplice, this));
		this.own(source.onReplace.listen(this._onReplace, this));
		this.own(source.onClear.listen(this._onClear, this));
	}

	protected destroyObject() {
		if (this.source.native.length !== 0) {
			this._doClearItems(this.source.native);
		}
		super.destroyObject();
	}

	private _onSplice(spliceResult: IBindableArray.SpliceResult<T>) {
		const {oldContents, removedItems} = spliceResult;
		if (this._clear && (3 * removedItems.length > 2 * oldContents.length)) {
			// if there is an effective clearing function, just reset the controller
			this._clear(oldContents);
			this._addItems(this.source.native);
		} else {
			// else, splice the elements
			this._removeItems(removedItems);
			this._addItems(spliceResult.addedItems);
		}
	}

	private _onReplace(message: IBindableArray.ReplaceMessage<T>) {
		if (this._remove) {
			this._remove(message.oldValue);
		}
		if (this._add) {
			this._add(message.newValue);
		}
	}

	private _onClear(oldContents: readonly T[]) {
		this._doClearItems(oldContents);
	}
}
