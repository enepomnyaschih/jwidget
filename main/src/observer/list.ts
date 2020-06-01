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

import IList from '../IList';
import ReadonlyList from '../ReadonlyList';
import AbstractObserver from './AbstractObserver';

/**
 * AbstractObserver implementation for List.
 */
export default class ListObserver<T> extends AbstractObserver<T> {
	/**
	 * Source list.
	 */
	readonly source: ReadonlyList<T>;

	/**
	 * @param source Source list.
	 * @param config Observer configuration.
	 */
	constructor(source: ReadonlyList<T>, config: AbstractObserver.Config<T>) {
		super(source, config);
		this.own(source.spliceEvent.listen(this._onSplice, this));
		this.own(source.replaceEvent.listen(this._onReplace, this));
		this.own(source.clearEvent.listen(this._onClear, this));
	}

	private _onSplice(params: IList.SpliceEventParams<T>) {
		var spliceResult = params.spliceResult;
		var oldItems = spliceResult.oldItems;
		var removedItems = spliceResult.removedItems;

		if (this._clear && (3 * removedItems.length > 2 * oldItems.length)) {
			// if there is an effective clearing function, just reset the controller
			this._clear.call(this._scope, oldItems);
			this._addItems(this.source.items);
		} else {
			// else, splice the elements
			this._removeItems(removedItems);
			this._addItems(spliceResult.addedItems);
		}
	}

	private _onReplace(params: IList.ReplaceEventParams<T>) {
		if (this._remove) {
			this._remove.call(this._scope, params.oldItem);
		}
		if (this._add) {
			this._add.call(this._scope, params.newItem);
		}
	}

	private _onClear(params: IList.ItemsEventParams<T>) {
		this._doClearItems(params.items);
	}
}
