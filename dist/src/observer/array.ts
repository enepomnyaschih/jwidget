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

import AbstractCollectionObserver from './AbstractCollectionObserver';
import IList from '../IList';

/**
 * [[JW.AbstractCollection.Observer|Observer]] implementation for [[JW.Array]].
 */
export default class ArrayObserver<T> extends AbstractCollectionObserver<T> {
	/**
	 * @inheritdoc
	 */
	readonly source: IList<T>;

	/**
	 * @inheritdoc
	 */
	constructor(source: IList<T>, config: AbstractCollectionObserver.Config<T>) {
		super(source, config);
		this.own(source.spliceEvent.bind(this._onSplice, this));
		this.own(source.replaceEvent.bind(this._onReplace, this));
		this.own(source.clearEvent.bind(this._onClear, this));
		if (this._change) {
			this.own(source.changeEvent.bind(this._onChange, this));
		}
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
