/*!
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

import Destroyable from '../../Destroyable';
import HtmlUpdater from './HtmlUpdater';
import Watchable from '../../Watchable';

/**
 * Watches string property modification and updates inner HTML of the DOM element.
 * Returns [[JW.UI.HtmlUpdater]] instance. Destroy it to stop synchronization.
 *
 *     // Bind inner HTML to html property value
 *     this.own(el.jwhtml(html));
 *
 * <iframe style="border: 1px solid green; padding: 10px;" width="730" height="220" src="http://enepomnyaschih.github.io/mt/1.4/jwui-property-jwhtml.html"></iframe>
 *
 * @param property HTML value.
 */
export default function html(el: JQuery, property: Watchable<any>): Destroyable {
	return new HtmlUpdater(el, property);
}
