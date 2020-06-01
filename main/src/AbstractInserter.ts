﻿/*
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

import Class from './Class';
import * as DomUtils from './DomUtils';
import ListInserter from './inserter/list';
import ReadonlyList from './ReadonlyList';

export default abstract class AbstractInserter<T> extends Class {
	/**
	 * @param source Child element list.
	 * @param el Parent element to insert children into.
	 */
	constructor(source: ReadonlyList<T>, readonly el: HTMLElement) {
		super();
		this.own(new ListInserter(source, {
			add: this._addItem,
			remove: this._removeItem,
			scope: this
		}));
	}

	protected abstract _getElement(item: T): HTMLElement;

	protected _addItem(item: T, index: number) {
		const parent = this.el;
		const anchor = parent.childNodes[index];
		const child = this._getElement(item);
		if (anchor != null) {
			parent.insertBefore(child, anchor);
		} else {
			parent.appendChild(child);
		}
	}

	protected _removeItem(item: T, _index: number) {
		DomUtils.remove(this._getElement(item));
	}
}
