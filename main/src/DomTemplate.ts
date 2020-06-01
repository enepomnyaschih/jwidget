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

import jQuery from 'jquery';
import AbstractTemplate from './AbstractTemplate';
import Dictionary from './Dictionary';
import TemplateOutput from './TemplateOutput';

/**
 * @hidden
 */
export default class DomTemplate extends AbstractTemplate {
	private el: HTMLElement;
	private output: TemplateOutput = null;
	private groups: Dictionary<HTMLElement[]>;

	/**
	 * Creates a template instance.
	 * @param el Element to process.
	 */
	constructor(el: HTMLElement | JQuery) {
		super();
		this.el = <any>jQuery(el)[0];
	}

	get requiresAfterAppend(): boolean {
		return true;
	}

	createElement(): TemplateOutput {
		if (this.output !== null) {
			return this.output;
		}
		this.groups = {};
		this._compileAttributes(this.el);
		var orderedGroups: Dictionary<HTMLElement[]> = {};
		for (var i = 0, l = this.ids.length; i < l; ++i) {
			var id = this.ids[i];
			orderedGroups[id] = this.groups[id];
		}
		this.output = {root: this.el, groups: orderedGroups};
		return this.output;
	}

	protected _addElement(id: string, el: HTMLElement, path: number[]) {
		path = path;
		this.groups[id] = this.groups[id] || [];
		this.groups[id].push(el);
	}
}
