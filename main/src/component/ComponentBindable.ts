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

import Bindable from '../Bindable';
import Class from '../Class';
import Component from '../Component';
import Switcher from '../Switcher';

export default class ComponentBindable extends Class {
	constructor(private parent: Component, component: Bindable<Component>, private id: string) {
		super();
		parent._bindables.set(this.id, this);

		this.own(new Switcher<Component>(component, {
			init: child => {
				this.parent.children.set(this.id, child);
			},
			done: () => {
				this.parent.children.delete(this.id);
			}
		}));
	}

	destroy() {
		this.parent._bindables.delete(this.id);
		super.destroy();
	}
}
