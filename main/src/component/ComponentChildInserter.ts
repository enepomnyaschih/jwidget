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

import BindableMap from '../BindableMap';
import IBindableMap from '../IBindableMap';
import Some from '../Some';
import ComponentChild from './ComponentChild';

export default class ComponentChildInserter extends BindableMap<string, ComponentChild> {

	constructor() {
		super(true);
	}

	trySet(key: string, value: ComponentChild): Some<ComponentChild> {
		const result = super.trySet(key, value);
		if (result === undefined) {
			return undefined;
		}
		const removedValue = result.value;
		if (removedValue) {
			removedValue.detach();
		}
		value.attach(key);
		return result;
	}

	trySetKey(oldKey: string, newKey: string): ComponentChild {
		const item = super.trySetKey(oldKey, newKey);
		if (item === undefined) {
			return undefined;
		}
		item.detach();
		item.attach(newKey);
		return item;
	}

	remove(key: string): ComponentChild {
		const item = super.remove(key);
		if (item === undefined) {
			return undefined;
		}
		item.detach();
		return item;
	}

	trySplice(keysToRemove: Iterable<string>,
			  entriesToUpdate: ReadonlyMap<string, ComponentChild>): IBindableMap.SpliceResult<string, ComponentChild> {
		const spliceResult = super.trySplice(keysToRemove, entriesToUpdate);
		if (spliceResult === undefined) {
			return undefined;
		}
		spliceResult.removedEntries.forEach(this._detach, this);
		spliceResult.addedEntries.forEach(this._attach, this);
		return spliceResult;
	}

	clear(): Map<string, ComponentChild> {
		const oldContents = super.clear();
		if (oldContents === undefined) {
			return undefined;
		}
		oldContents.forEach(this._detach, this);
		return oldContents;
	}

	tryReindex(keyMapping: ReadonlyMap<string, string>): Map<string, string> {
		const result = super.tryReindex(keyMapping);
		if (result === undefined) {
			return undefined;
		}
		for (let newKey of keyMapping.values()) {
			const value = this.get(newKey);
			value.detach();
			value.attach(newKey);
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
