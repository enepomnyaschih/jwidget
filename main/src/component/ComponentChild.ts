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
import * as DomUtils from '../DomUtils';
import Identifiable from '../Identifiable';
import {newIid} from '../index';

/**
 * @hidden
 */
export default class ComponentChild implements Identifiable {
	private _name: string;
	private _el: JQuery;

	readonly iid = newIid();

	constructor(private parent: Component, private child: Component) {}

	attach(name: string) {
		// JW.assertNull(this.name);
		this._name = name;
		this._el = this.parent._elements[name];
		this.parent._initChild(this.child);
		this.parent._elements[name] = this.child.el;
		DomUtils.replace(this._el[0], this.child.el[0], true);
		this.child._afterAppend();
	}

	detach() {
		// JW.assertString(this.name, JW.isNotBlank);
		if (this.parent._elements[this._name] === this.child.el) {
			this.parent._elements[this._name] = this._el;
		}
		DomUtils.replace(this.child.el[0], this._el[0]);
		this.parent._doneChild(this.child);
		this._el = null;
		this._name = null;
	}
}
