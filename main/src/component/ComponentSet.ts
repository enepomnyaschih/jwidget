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

import Class from '../Class';
import Component from '../Component';
import * as DomUtils from '../DomUtils';
import SetMapper from "../mapper/set";
import ReadonlyBindableSet from '../ReadonlyBindableSet';
import ComponentObserver from './ComponentObserver';

/**
 * @hidden
 */
export default class ComponentSet extends Class {
	constructor(private parent: Component, private source: ReadonlyBindableSet<Component>, el: JQuery) {
		super();
		parent._collections[this.iid] = this;

		const mapper = this.own(new SetMapper<Component, Component>(source, (child) => {
			this.parent._initChild(child);
			return child;
		}, {
			destroy: (child) => {
				this.parent._doneChild(child);
			},
			getKey: source.getKey
		}));

		this.own(new ComponentObserver(mapper.target, el[0]));
	}

	destroy() {
		delete this.parent._collections[this.iid];
		super.destroy();
	}

	_afterAppend() {
		this.source.forEach(DomUtils._afterAppend);
	}
}
