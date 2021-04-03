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

import AbstractTemplate from './AbstractTemplate';
import * as DomUtils from './DomUtils';
import TemplateOutput from './TemplateOutput';

/**
 * HTML template. This class compiles the input template only once, and uses element cloning further on to
 * optimize rendering performance.
 */
export default class HtmlTemplate extends AbstractTemplate {

	private mirror: HTMLElement = null;
	private groups: Map<string, number[][]>;

	/**
	 * @param html Input HTML.
	 */
	constructor(readonly html: string) {
		super();
	}

	createElement(): TemplateOutput {
		this._compile();
		const root = <HTMLElement>(this.mirror.cloneNode(true));
		const groups = new Map<string, HTMLElement[]>();
		for (const id of this.ids) {
			groups.set(id, this.groups.get(id).map(
				path => path.reduce((el, index) => <HTMLElement>el.childNodes[index], root)));
		}
		return {root, groups};
	}

	protected _addElement(id: string, _el: HTMLElement, path: readonly number[]) {
		this.groups.set(id, this.groups.get(id) ?? []);
		this.groups.get(id).push(path.concat());
	}

	private _compile() {
		if (this.mirror !== null) {
			return;
		}
		this.mirror = DomUtils.parseHtml(this.html);
		this.groups = new Map<string, number[][]>();
		this._compileAttributes(this.mirror);
	}
}
