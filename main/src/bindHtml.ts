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

class HtmlUpdater extends Class {
	/**
	 * @param el DOM element.
	 * @param property Source property.
	 */
	constructor(private el: HtmlUpdaterElement, private property: Bindable<string>) {
		super();
		this._update();
		this.own(property.onChange.listen(this._update, this));
	}

	private _update() {
		this.el.html(this.property.get());
	}
}

/**
 * Watches string property modification and updates inner HTML of the DOM element.
 * @param el DOM element.
 * @param property HTML value.
 * @returns Binding object. You must destroy it to stop the synchronization.
 */
export default function bindHtml(el: HtmlUpdaterElement, property: Bindable<string>): Destroyable {
	return new HtmlUpdater(el, property);
}

export interface HtmlUpdaterElement {
	html(html: string): void;
}
