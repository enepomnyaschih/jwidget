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

import {default as ObservableArray, ArrayItemsEventParams, ArrayReplaceEventParams, ArraySpliceEventParams} from '../../ObservableArray';
import ArrayObserver from './ArrayObserver';
import ICollectionObserverConfig from '../ICollectionObserverConfig';

/**
 * [[JW.AbstractCollection.Observer|Observer]] implementation for [[JW.ObservableArray]].
 */
export default class ObservableArrayObserver<T> extends ArrayObserver<T> {
	/**
	 * @inheritdoc
	 */
	constructor(source: ObservableArray<T>, config: ICollectionObserverConfig<T>) {
		super(source, config);
		this.own(source.spliceEvent.bind(this._onSplice, this));
		this.own(source.replaceEvent.bind(this._onReplace, this));
		this.own(source.clearEvent.bind(this._onClear, this));
		if (this._change) {
			this.own(source.changeEvent.bind(this._onChange, this));
		}
	}

	private _onSplice(params: ArraySpliceEventParams<T>) {
		var spliceResult = params.spliceResult;
		var oldItems = spliceResult.oldItems;
		var removedItems = spliceResult.getRemovedItems();

		if (this._clearItems && (3 * removedItems.length > 2 * oldItems.length)) {
			// if there is an effective clearing function, just reset the controller
			this._clearItems.call(this._scope, oldItems);
			this._addItems(this.source.getItems());
		} else {
			// else, splice the elements
			this._removeItems(removedItems);
			this._addItems(spliceResult.getAddedItems());
		}
	}

	private _onReplace(params: ArrayReplaceEventParams<T>) {
		if (this._removeItem) {
			this._removeItem.call(this._scope, params.oldItem);
		}
		if (this._addItem) {
			this._addItem.call(this._scope, params.newItem);
		}
	}

	private _onClear(params: ArrayItemsEventParams<T>) {
		this._doClearItems(params.items);
	}
}
