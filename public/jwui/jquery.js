/*
	jWidget UI source file.
	
	Copyright (C) 2014 Egor Nepomnyaschih
	
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

/**
 * @class jQuery
 *
 * jQuery extension.
 */
jQuery.extend(jQuery.fn, {
	/**
	 * Creates jQuery event adapter managed by jWidget.
	 * Shorthand for JW.UI.JQEventAttachment creation.
	 * See JW.UI.JQEventAttachment for more details.
	 *
	 * @param {string} events One or more space-separated event types and optional namespaces, such as "click" or "keydown.myPlugin".
	 * @param {string} selector A selector string to filter the descendants of the selected elements that trigger the event. If the selector is null or omitted, the event is always triggered when it reaches the selected element.
	 * @param {Function} handler
	 *
	 * `handler(event: Event, target: DOMElement)`
	 *
	 * A function to execute when the event is triggered. The value `false` is also allowed as a shorthand for a function that simply does `return false`.
	 *
	 * @param {Object} [scope] Function call scope.
	 * @returns {JW.UI.JQEventAttachment} New event attachment.
	 */
	jwon: function(events, selector, handler, scope) {
		return new JW.UI.JQEventAttachment(this, events, selector, handler, scope);
	}
});
