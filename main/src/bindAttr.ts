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

class AttrUpdater extends Class {
	constructor(private el: JQuery, private attr: string, private property: Bindable<any>) {
		super();
		this._update();
		this.own(property.onChange.listen(this._update, this));
	}

	private _update() {
		this.el.attr(this.attr, this.property.get());
	}
}

/**
 * Watches string property modification and updates the specified attribute of the DOM element.
 * Destroy the returned object to stop synchronization.
 * @param el DOM element.
 * @param attr Attribute name.
 * @param property Attribute value to assign.
 */
export default function bindAttr(el: JQuery, attr: string, property: Bindable<any>): Destroyable {
	return new AttrUpdater(el, attr, property);
}
