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

/// <reference types="jquery" />

import {Binding, UPDATE, WATCH} from '../../Core';
import Class from '../../Class';
import IProperty from '../../IProperty';
import ValueListener from './ValueListener';
import ValueUpdater from './ValueUpdater';
import Watchable from '../../Watchable';

/**
 * Result of [[JQuery.jwval|jwval]] method call. Destroy it to stop synchronization.
 */
class ValueBinding extends Class {
	/**
	 * @param el DOM element.
	 * @param property Property.
	 * @param binding Binding mode. Defaults to [[JW.Binding.UPDATE]].
	 * @param simple
	 * If true, watch-binding listens "change" event only. Defaults to false which enables
	 * reaction to any real-time field modification.
	 */
	constructor(el: JQuery, property: Watchable<any>, simple?: boolean);
	constructor(el: JQuery, property: IProperty<string>, binding: Binding, simple?: boolean);
	constructor(el: JQuery, property: any, binding: any = UPDATE, simple?: boolean) {
		super();
		if (typeof binding === "boolean") {
			simple = binding;
			binding = UPDATE;
		}
		if (binding & UPDATE) {
			this.own(new ValueUpdater(el, property));
		}
		if (binding & WATCH) {
			this.own(new ValueListener(el, {target: property, simple: simple}));
		}
	}
}

export default ValueBinding;
