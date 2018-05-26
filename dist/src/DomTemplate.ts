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

/**
 * @hidden
 */
export default class DomTemplate extends AbstractTemplate {
	private el: HTMLElement;
	private output: TemplateOutput = null;
	private groups: Dictionary<HTMLElement[]>

	constructor(el: HTMLElement | JQuery) {
		super();
		this.el = jQuery(el)[0];
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
