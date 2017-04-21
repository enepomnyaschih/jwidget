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

import Dictionary from './Dictionary';
import * as DomUtils from './DomUtils';

/**
 * Defines HTML templates for a `Component` subclass.
 *
 * @param template Template HTML string.
 * @param id Template name to add or override. Defaults to "main".
 */
export default function(template: string, id?: string): any;

/**
 * @param tpls Templates to add or override.
 */
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
