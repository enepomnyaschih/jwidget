/*
	jWidget UI source file.
	
	Copyright (C) 2015 Egor Nepomnyaschih
	
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
 * @class
 * Watches source string {@link JW.Property property} modification and updates
 * the CSS class name in the DOM element.
 * Applied on initialization as well.
 *
 *     var color = new JW.Property("red");
 *
 *     // Next command adds "red" CSS class to the element
 *     var updater = new JW.UI.ClassNameUpdater($("#myelem"), color);
 *
 *     // Next command removes "red" CSS class from the element and adds "blue" class instead
 *     color.{@link JW.Property#set set}("blue");
 *
 *     // Next command removes "blue" CSS class from the element
 *     color.{@link JW.Property#set set}(null);
 *
 *     // Next command adds "green" CSS class to the element
 *     color.{@link JW.Property#set set}("green");
 *
 *     // Next command removes "green" CSS class from the element and stops synchronization
 *     updater.{@link JW.UI.ClassNameUpdater#destroy destroy}();
 *
 * **Caution:** Updater doesn't check if the class of the same name is already present in the element.
 * If that's the case, it will remove the class on the next property value change. However, it won't
 * touch the other classes, e.g. it doesn't remove "elem" class in the example above.
 *
 * Method {@link jQuery#jwclass jwclass} is a shorthand for synchronizer creation.
 *
 *     var color = new JW.Property("red");
 *     var updater = $("#myelem"){@link jQuery#jwclass jwclass}(color);
 *     color.{@link JW.Property#set set}("blue");
 *     updater.{@link JW.UI.ClassNameUpdater#destroy destroy}();
 *
 * @extends JW.Class
 *
 * @constructor
 * @param {jQuery} el DOM element.
 * @param {JW.Property} property `<String>` Source property.
 */
JW.UI.ClassNameUpdater = function(el, property) {
	JW.UI.ClassNameUpdater._super.call(this);
	this.el = jQuery(el);
	this.own(new JW.Switcher([property], {
		init: function(value) { this.el.addClass(value); },
		done: function(value) { this.el.removeClass(value); },
		scope: this
	}));
};

JW.extend(JW.UI.ClassNameUpdater, JW.Class);
