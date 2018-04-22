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

import Component from '../Component';
import Dictionary from '../Dictionary';
import * as DictionaryUtils from '../DictionaryUtils';
import IMap from '../IMap';
import {iidStr} from '../index';
import Map from '../Map';
import Some from '../Some';
import ComponentChild from './ComponentChild';
import ComponentChildInserter from './ComponentChildInserter';

/**
 * @hidden
 */
export default class ComponentChildren extends Map<Component> {
	private target: ComponentChildInserter;

	constructor(private component: Component) {
		super(iidStr, true);
		this.target = new ComponentChildInserter();
	}

	unrender() {
		this.target.destroy();
	}

	tryPut(key: string, item: Component): Some<Component> {
		const result = super.tryPut(key, item);
		if (result === undefined) {
			return undefined;
		}
		const child = new ComponentChild(this.component, item);
		this.target.tryPut(key, child);
		return result;
	}

	trySetKey(oldKey: string, newKey: string): Component {
		const item = super.trySetKey(oldKey, newKey);
		if (item === undefined) {
			return undefined;
		}
		this.target.trySetKey(oldKey, newKey);
		return item;
	}

	tryRemove(key: string): Component {
		const item = super.tryRemove(key);
		if (item === undefined) {
			return undefined;
		}
		this.target.tryRemove(key);
		return item;
	}

	trySplice(removedKeys: string[], updatedItems: Dictionary<Component>): IMap.SpliceResult<Component> {
		const spliceResult = super.trySplice(removedKeys, updatedItems);
		if (spliceResult === undefined) {
			return undefined;
		}
		const removedItems = spliceResult.removedItems;
		const addedItems = spliceResult.addedItems;
		const children = DictionaryUtils.map(addedItems, (item) => {
			return new ComponentChild(this.component, item);
		}, this);
		this.target.trySplice(DictionaryUtils.getRemovedKeys(removedItems, addedItems), children);
		return spliceResult;
	}

	clear(): Dictionary<Component> {
		const items = super.clear();
		if (items === undefined) {
			return undefined;
		}
		this.target.clear();
		return items;
	}

	tryReindex(keyMap: Dictionary<string>): Dictionary<string> {
		const result = super.tryReindex(keyMap);
		if (result === undefined) {
			return undefined;
		}
		this.target.tryReindex(keyMap);
		return result;
	}
}
