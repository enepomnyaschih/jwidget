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
import Property from '../../Property';
import RadioListener from './RadioListener';
import RadioUpdater from './RadioUpdater';

/**
 * Result of [[JQuery.jwradio|jwradio]] method call. Destroy it to stop synchronization.
 */
class RadioBinding extends Class {
	/**
	 * @param el Container DOM element.
	 * @param name Radios "name" attribute.
	 * @param property Property.
	 * @param binding Binding mode. Defaults to [[JW.Binding.UPDATE]].
	 */
	constructor(el: JQuery, name: string, property: Property<string>, binding: Binding = UPDATE) {
		super();
		if (binding & UPDATE) {
			this.own(new RadioUpdater(el, name, property));
		}
		if (binding & WATCH) {
			this.own(new RadioListener(el, name, {target: property}));
		}
	}
}

export default RadioBinding;
