/*
MIT License

Copyright (c) 2021 Egor Nepomnyaschih

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

import Class from '../Class';
import Component from '../Component';
import * as DomUtils from '../DomUtils';
import ReadonlyBindableSet from '../ReadonlyBindableSet';

export default class ComponentObserver extends Class {
	private len: number = 0;

	constructor(source: ReadonlyBindableSet<Component>, private el: HTMLElement) {
		super();
		this.own(source.onSplice.listen(spliceResult => {
			for (const value of spliceResult.deletedValues) {
				this._removeValue(value);
			}
			for (const value of spliceResult.addedValues) {
				this._addValue(value);
			}
		}));
		this.own(source.onClear.listen(values => {
			for (const value of values) {
				this._removeValue(value);
			}
		}))
	}

	private _addValue(value: Component) {
		const parent = this.el;
		const anchor = parent.childNodes[this.len];
		const child = value.el[0];
		if (anchor != null) {
			parent.insertBefore(child, anchor);
		} else {
			parent.appendChild(child);
		}
		++this.len;
		value._afterAppend();
	}

	private _removeValue(value: Component) {
		DomUtils.remove(value.el[0]);
		--this.len;
	}
}
