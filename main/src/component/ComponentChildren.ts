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
import Component from '../Component';
import IBindableMap from '../IBindableMap';
import {map} from "../MapUtils";
import {getDifference} from "../SetUtils";
import Some from '../Some';
import ComponentChild from './ComponentChild';
import ComponentChildInserter from './ComponentChildInserter';

export default class ComponentChildren extends BindableMap<string, Component> {

	private target: ComponentChildInserter;

	constructor(private component: Component) {
		super(true);
		this.target = new ComponentChildInserter();
	}

	unrender() {
		this.target.destroy();
	}

	trySet(key: string, value: Component): Some<Component> {
		const result = super.trySet(key, value);
		if (result === undefined) {
			return undefined;
		}
		const child = new ComponentChild(this.component, value);
		this.target.trySet(key, child);
		return result;
	}

	trySetKey(oldKey: string, newKey: string): Component {
		const value = super.trySetKey(oldKey, newKey);
		if (value === undefined) {
			return undefined;
		}
		this.target.trySetKey(oldKey, newKey);
		return value;
	}

	remove(key: string): Component {
		const value = super.remove(key);
		if (value === undefined) {
			return undefined;
		}
		this.target.remove(key);
		return value;
	}

	trySplice(keysToRemove: Iterable<string>,
			  entriesToUpdate: ReadonlyMap<string, Component>): IBindableMap.SpliceResult<string, Component> {
		const spliceResult = super.trySplice(keysToRemove, entriesToUpdate);
		if (spliceResult === undefined) {
			return undefined;
		}
		const {removedEntries, addedEntries} = spliceResult;
		const children = map(addedEntries, value => new ComponentChild(this.component, value));
		this.target.trySplice(getDifference(removedEntries.keys(), addedEntries), children);
		return spliceResult;
	}

	clear(): Map<string, Component> {
		const oldContents = super.clear();
		if (oldContents === undefined) {
			return undefined;
		}
		this.target.clear();
		return oldContents;
	}

	tryReindex(keyMapping: ReadonlyMap<string, string>): Map<string, string> {
		const result = super.tryReindex(keyMapping);
		if (result === undefined) {
			return undefined;
		}
		this.target.tryReindex(keyMapping);
		return result;
	}
}
