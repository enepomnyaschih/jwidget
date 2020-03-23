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

import Dictionary from '../Dictionary';
import * as DictionaryUtils from '../DictionaryUtils';
import IMap from '../IMap';
import {iidStr} from '../index';
import Map from '../Map';
import Some from '../Some';
import ComponentChild from './ComponentChild';

/**
 * @hidden
 */
export default class ComponentChildInserter extends Map<ComponentChild> {
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

	trySplice(removedKeys: string[], updatedItems: Dictionary<ComponentChild>): IMap.SpliceResult<ComponentChild> {
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
