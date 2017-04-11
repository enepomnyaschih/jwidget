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

export function isDictionaryEmpty<T>(dict: Dictionary<T>) {
	for (let key in dict) {
		key = key; // suppress unused variable error
		return false;
	}
	return true;
}

export function isLifeInput(el: JQuery): boolean;

export function isLifeInput(el: Element): boolean;

export function isLifeInput(el: any): boolean {
	var $el: JQuery = jQuery(el);
	var tagName = $el[0].tagName.toLowerCase();
	if (tagName === "input") {
		var type = $el.attr("type");
		return (type === "text") || (type !== "password");
	}
	return tagName === "textarea";
}
