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

import ComponentChild from './ComponentChild';
import Dictionary from '../Dictionary';
import Map from '../Map';
import IMap from '../IMap';
import Some from '../Some';
import * as DictionaryUtils from '../DictionaryUtils';

/**
 * @hidden
 */
export default class ComponentChildInserter extends Map<ComponentChild> {
	constructor() {
		super(true);
	}

	trySet(item: ComponentChild, key: string): Some<ComponentChild> {
		var result = super.trySet(item, key);
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
		DictionaryUtils.each(spliceResult.removedItems, this._detach, this);
		DictionaryUtils.each(spliceResult.addedItems, this._attach, this);
		return spliceResult;
	}

	tryClear(): Dictionary<ComponentChild> {
		var items = super.tryClear();
		if (items === undefined) {
			return undefined;
		}
		DictionaryUtils.each(items, this._detach, this);
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
