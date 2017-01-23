import AbstractTemplate from './AbstractTemplate';
import Dictionary from './Dictionary';
import TemplateOutput from './TemplateOutput';

/**
 * @hidden
 */
export default class DomTemplate extends AbstractTemplate {
	el: HTMLElement;
	output: TemplateOutput = null;
	requiresAfterAppend: boolean = true;
	groups: Dictionary<HTMLElement[]>

	constructor(el: HTMLElement);
	constructor(el: JQuery);
	constructor(el: any) {
		super();
		this.el = jQuery(el)[0];
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

	_addElement(id: string, el: HTMLElement, path: number[]) {
		path = path;
		this.groups[id] = this.groups[id] || [];
		this.groups[id].push(el);
	}
}
