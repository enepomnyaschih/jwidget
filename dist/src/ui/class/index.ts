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

import ClassNameUpdater from './ClassNameUpdater';
import ClassUpdater from './ClassUpdater';
import IClass from '../../IClass';
import Property from '../../Property';

/**
 * DOM element CSS class management method.
 *
 * Watches boolean property modification and updates the specified CSS class presence in the DOM element.
 * Returns [[JW.UI.ClassUpdater]] instance. Destroy it to stop synchronization.
 *
 *     // Bind "checked" CSS class to checked property value
 *     this.own(el.jwclass("checked", checked));
 *
 * <iframe style="border: 1px solid green; padding: 10px;" width="730" height="220" src="http://enepomnyaschih.github.io/mt/1.4/jwui-property-jwclass-bool.html"></iframe>
 *
 * @param cls CSS class name.
 * @param property Boolean property to bind CSS class to.
 */
export default function cls(el: JQuery, cls: string, property: Property<boolean>): IClass;

/**
 * DOM element CSS class management method.
 *
 * Watches string property modification and updates CSS class name in the DOM element.
 * Returns [[JW.UI.ClassNameUpdater]] instance. Destroy it to stop synchronization.
 *
 * **Caution:** Method doesn't check if the class of the same name is already present in the element.
 * If that's the case, it will remove the class on the next property value change. However, it won't
 * touch the other classes, e.g. it doesn't remove "application-rect" class in the example below.
 *
 *     // Bind CSS class name to color property value
 *     this.own(el.jwclass(color));
 *
 * <iframe style="border: 1px solid green; padding: 10px;" width="730" height="250" src="http://enepomnyaschih.github.io/mt/1.4/jwui-property-jwclass-string.html"></iframe>
 *
 * @param cls CSS class name.
 */
export default function cls(el: JQuery, cls: Property<string>): IClass;
export default function cls(el: JQuery, a: any, b?: any): IClass {
	return (b != null) ? new ClassUpdater(el, a, b) : new ClassNameUpdater(el, a);
}
