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

import AttrUpdater from './AttrUpdater';
import IClass from '../../IClass';
import Property from '../../Property';

/**
 * Watches string property modification and updates the specified attribute of the DOM element.
 * Returns [[JW.UI.AttrUpdater]] instance. Destroy it to stop synchronization.
 *
 *     // Bind "title" attribute to title property value
 *     this.own(el.jwattr("title", title));
 *
 * <iframe style="border: 1px solid green; padding: 10px;" width="730" height="180" src="http://enepomnyaschih.github.io/mt/1.4/jwui-property-jwattr.html"></iframe>
 *
 * @param attr DOM element attribute name.
 * @param property Attribute value.
 */
export default function attr(el: JQuery, attr: string, property: Property<any>): IClass {
	return new AttrUpdater(el, attr, property);
}
