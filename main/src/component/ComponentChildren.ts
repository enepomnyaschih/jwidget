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

import Component from '../Component';
import Dictionary from '../Dictionary';
import * as DictionaryUtils from '../DictionaryUtils';
import IBindableMap from '../IBindableMap';
import {iidStr} from '../index';
import BindableMap from '../BindableMap';
import Some from '../Some';
import ComponentChild from './ComponentChild';
import ComponentChildInserter from './ComponentChildInserter';

/**
 * @hidden
 */
export default class ComponentChildren extends BindableMap<Component> {
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

	trySplice(removedKeys: string[], updatedItems: Dictionary<Component>): IBindableMap.SpliceResult<Component> {
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
