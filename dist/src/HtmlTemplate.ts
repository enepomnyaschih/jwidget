import AbstractTemplate from './AbstractTemplate';
import Dictionary from './Dictionary';
import TemplateOutput from './TemplateOutput';
import * as DomUtils from './DomUtils';

/**
 * HTML template. This class compiles the input template only once, and uses element cloning further on to
 * optimize rendering performance.
 */
export default class HtmlTemplate extends AbstractTemplate {
	/**
	 * @hidden
	 */
	mirror: HTMLElement = null;

	/**
	 * @hidden
	 */
	groups: Dictionary<number[][]>;

	/**
	 * @param html Input HTML.
	 */
	constructor(public html: string) {
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

	/**
	 * @hidden
	 */
	_addElement(id: string, el: HTMLElement, path: number[]) {
		el = el;
		this.groups[id] = this.groups[id] || [];
		this.groups[id].push(path.concat());
	}

	/**
	 * @hidden
	 */
	private _compile() {
		if (this.mirror !== null) {
			return;
		}
		this.mirror = DomUtils.parseHtml(this.html);
		this.groups = {};
		this._compileAttributes(this.mirror);
	}
}
