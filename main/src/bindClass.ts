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

import Bindable from './Bindable';
import Class from './Class';
import Destroyable from './Destroyable';

class ClassUpdater extends Class {
	constructor(private el: ClassUpdaterElement, private cls: string, private property: Bindable<any>) {
		super();
		this._update();
		this.own(property.onChange.listen(this._update, this));
	}

	private _update() {
		this.el.toggleClass(this.cls, !!this.property.get());
	}
}

class ClassNameUpdater extends Class {
	constructor(private el: ClassNameUpdaterElement, property: Bindable<string>) {
		super();
		this.el.addClass(property.get());
		this.own(property.onChange.listen(({value, oldValue}) => {
			this.el.removeClass(oldValue);
			this.el.addClass(value);
		}));
	}
}

/**
 * Watches boolean property modification and updates the specified CSS class presence in the DOM element.
 * @param el DOM element.
 * @param cls CSS class name.
 * @param property Boolean property to bind CSS class to.
 * @returns Binding object. You must destroy it to stop the synchronization.
 */
export default function bindClass(el: ClassUpdaterElement, cls: string, property: Bindable<string>): Destroyable;

/**
 * Watches string property modification and updates CSS class name in the DOM element.
 * @param el DOM element.
 * @param cls CSS class name.
 * @returns Binding object. You must destroy it to stop the synchronization.
 */
export default function bindClass(el: ClassNameUpdaterElement, cls: Bindable<string>): Destroyable;
export default function bindClass(el: any, a: any, b?: any): Destroyable {
	return (b != null) ? new ClassUpdater(el, a, b) : new ClassNameUpdater(el, a);
}

export interface ClassUpdaterElement {
	toggleClass(cls: string, value: boolean): void;
}

export interface ClassNameUpdaterElement {

	addClass(cls: string): void;

	removeClass(cls: string): void;
}
