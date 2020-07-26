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

import DestroyableReadonlyBindableArray from '../DestroyableReadonlyBindableArray';
import * as DictionaryUtils from '../DictionaryUtils';
import IBindableMap from '../IBindableMap';
import {VidSet} from '../internal';
import BindableArray from '../BindableArray';
import ReadonlyBindableMap from '../ReadonlyBindableMap';
import AbstractConverterToArray from './AbstractConverterToArray';

/**
 * AbstractConverterToArray implementation for maps.
 */
export default class MapConverterToArray<T> extends AbstractConverterToArray<T> {
	/**
	 * @param source Source map.
	 * @param config Converter configuration.
	 */
	constructor(readonly source: ReadonlyBindableMap<T>, config: AbstractConverterToArray.Config<T>) {
		super(config, source.getKey, source.silent);
		this._target.addAll(source.toArray());
		this.own(source.onSplice.listen(this._onSplice, this));
		this.own(source.onClear.listen(this._onClear, this));
	}

	/**
	 * @inheritDoc
	 */
	protected destroyObject() {
		this._target.removeItems(this.source.toArray());
		super.destroyObject();
	}

	private _onSplice(message: IBindableMap.SpliceMessage<T>) {
		var spliceResult = message.spliceResult;
		this._splice(
			VidSet.fromDictionary<T>(spliceResult.removedItems, this.source.getKey),
			VidSet.fromDictionary<T>(spliceResult.addedItems, this.source.getKey));
	}

	private _onClear(message: IBindableMap.MessageWithItems<T>) {
		this._target.removeItems(
			DictionaryUtils.toArray(message.items));
	}
}

/**
 * Converts a map to an array and start synchronization.
 * @param source Source map.
 * @returns Target array.
 */
export function mapToArray<T>(source: ReadonlyBindableMap<T>): DestroyableReadonlyBindableArray<T> {
	if (source.silent) {
		return source.toBindableArray();
	}
	const target = new BindableArray<T>(source.getKey);
	return target.owning(new MapConverterToArray<T>(source, {target}));
}
