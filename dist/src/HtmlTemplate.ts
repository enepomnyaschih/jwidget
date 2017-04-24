/*
	jWidget 2
	Copyright (C) 2017  Egor Nepomnyaschih
	enepomnyaschih@gmail.com
	https://github.com/enepomnyaschih/jwidget

	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU Lesser General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU Lesser General Public License for more details.

	You should have received a copy of the GNU Lesser General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

import AbstractTemplate from './AbstractTemplate';
import Dictionary from './Dictionary';
import TemplateOutput from './TemplateOutput';
import * as DomUtils from './DomUtils';

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
