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

import Component from '../Component';
import ComponentChild from './ComponentChild';
import ComponentChildInserter from './ComponentChildInserter';
import Dictionary from '../Dictionary';
import IMap from '../IMap';
import Map from '../Map';
import Some from '../Some';
import * as DictionaryUtils from '../DictionaryUtils';

/**
 * @hidden
 */
export default class ComponentChildren extends Map<Component> {
	private target: ComponentChildInserter;

	constructor(private component: Component) {
		super(true);
		this.target = new ComponentChildInserter();
	}

	unrender() {
		this.target.destroy();
	}

	trySet(item: Component, key: string): Some<Component> {
		var result = super.trySet(item, key);
		if (result === undefined) {
			return undefined;
		}
		var child = new ComponentChild(this.component, item);
		this.target.trySet(child, key);
		return result;
	}

	trySetKey(oldKey: string, newKey: string): Component {
		var item = super.trySetKey(oldKey, newKey);
		if (item === undefined) {
			return undefined;
		}
		this.target.trySetKey(oldKey, newKey);
		return item;
	}

	tryRemove(key: string): Component {
		var item = super.tryRemove(key);
		if (item === undefined) {
			return undefined;
		}
		this.target.tryRemove(key);
		return item;
	}

	trySplice(removedKeys: string[], updatedItems: Dictionary<Component>): IMap.SpliceResult<Component> {
		var spliceResult = super.trySplice(removedKeys, updatedItems);
		if (spliceResult === undefined) {
			return undefined;
		}
		var removedItems = spliceResult.removedItems;
		var addedItems = spliceResult.addedItems;
		var children = DictionaryUtils.map(addedItems, (item) => {
			return new ComponentChild(this.component, item);
		}, this);
		this.target.trySplice(DictionaryUtils.getRemovedKeys(removedItems, addedItems), children);
		return spliceResult;
	}

	tryClear(): Dictionary<Component> {
		var items = super.tryClear();
		if (items === undefined) {
			return undefined;
		}
		this.target.tryClear();
		return items;
	}

	tryReindex(keyMap: Dictionary<string>): Dictionary<string> {
		var result = super.tryReindex(keyMap);
		if (result === undefined) {
			return undefined;
		}
		this.target.tryReindex(keyMap);
		return result;
	}
}
