import Dictionary from './Dictionary';
import * as DomUtils from './DomUtils';

export default function(template: string, id?: string): any;
export default function(tpls: Dictionary<string>): any;
export default function(tpl: any, id?: string): any {
	return function(target: any) {
		var tpls: Dictionary<string>;
		if (typeof tpl === 'string') {
			tpls = {};
			tpls[id || 'main'] = tpl;
		} else {
			tpls = tpl;
		}
		DomUtils.template(target, tpls);
	};
}
