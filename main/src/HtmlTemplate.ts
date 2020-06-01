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

import AbstractTemplate from './AbstractTemplate';
import Dictionary from './Dictionary';
import * as DomUtils from './DomUtils';
import TemplateOutput from './TemplateOutput';

/**
 * HTML template. This class compiles the input template only once, and uses element cloning further on to
 * optimize rendering performance.
 */
export default class HtmlTemplate extends AbstractTemplate {
	private mirror: HTMLElement = null;
	private groups: Dictionary<number[][]>;

	/**
	 * @param html Input HTML.
	 */
	constructor(readonly html: string) {
		super();
	}

	/**
	 * @inheritdoc
	 */
	createElement(): TemplateOutput {
		this._compile();
		var root = <HTMLElement>(this.mirror.cloneNode(true));
		var groups: Dictionary<HTMLElement[]> = {};
		for (var index = 0, count = this.ids.length; index < count; ++index) {
			var id = this.ids[index];
			var paths = this.groups[id];
			var groupSize = paths.length;
			var group = new Array(groupSize);
			for (var i = 0; i < groupSize; ++i) {
				var path = paths[i];
				var el = root;
				for (var j = 0, n = path.length; j < n; ++j) {
					el = <HTMLElement>(el.childNodes[path[j]]);
				}
				group[i] = el;
			}
			groups[id] = group;
		}
		return { root: root, groups: groups };
	}

	protected _addElement(id: string, el: HTMLElement, path: number[]) {
		el = el;
		this.groups[id] = this.groups[id] || [];
		this.groups[id].push(path.concat());
	}

	private _compile() {
		if (this.mirror !== null) {
			return;
		}
		this.mirror = DomUtils.parseHtml(this.html);
		this.groups = {};
		this._compileAttributes(this.mirror);
	}
}
