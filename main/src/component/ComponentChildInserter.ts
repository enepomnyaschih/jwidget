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

import Dictionary from '../Dictionary';
import * as DictionaryUtils from '../DictionaryUtils';
import IBindableMap from '../IBindableMap';
import {iidStr} from '../index';
import BindableMap from '../BindableMap';
import Some from '../Some';
import ComponentChild from './ComponentChild';

/**
 * @hidden
 */
export default class ComponentChildInserter extends BindableMap<ComponentChild> {
	constructor() {
		super(iidStr, true);
	}

	tryPut(key: string, item: ComponentChild): Some<ComponentChild> {
		var result = super.tryPut(key, item);
		if (result === undefined) {
			return undefined;
		}
		var removedItem = result.value;
		if (removedItem) {
			removedItem.detach();
		}
		item.attach(key);
		return result;
	}

	trySetKey(oldKey: string, newKey: string): ComponentChild {
		var item = super.trySetKey(oldKey, newKey);
		if (item === undefined) {
			return undefined;
		}
		item.detach();
		item.attach(newKey);
		return item;
	}

	tryRemove(key: string): ComponentChild {
		var item = super.tryRemove(key);
		if (item === undefined) {
			return undefined;
		}
		item.detach();
		return item;
	}

	trySplice(removedKeys: string[], updatedItems: Dictionary<ComponentChild>): IBindableMap.SpliceResult<ComponentChild> {
		var spliceResult = super.trySplice(removedKeys, updatedItems);
		if (spliceResult === undefined) {
			return undefined;
		}
		DictionaryUtils.forEach(spliceResult.removedItems, this._detach, this);
		DictionaryUtils.forEach(spliceResult.addedItems, this._attach, this);
		return spliceResult;
	}

	clear(): Dictionary<ComponentChild> {
		var items = super.clear();
		if (items === undefined) {
			return undefined;
		}
		DictionaryUtils.forEach(items, this._detach, this);
		return items;
	}

	tryReindex(keyMap: Dictionary<string>): Dictionary<string> {
		var result = super.tryReindex(keyMap);
		if (result === undefined) {
			return undefined;
		}
		for (var oldKey in keyMap) {
			var newKey = keyMap[oldKey];
			var item = this.get(newKey);
			item.detach();
			item.attach(newKey);
		}
		return result;
	}

	_attach(item: ComponentChild, key: string) {
		item.attach(key);
	}

	_detach(item: ComponentChild) {
		item.detach();
	}
}
