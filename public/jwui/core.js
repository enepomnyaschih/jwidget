/*!
	jWidget UI 0.7
	
	http://enepomnyaschih.github.io/jwidget/#!/guide/enhome
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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
 * @class JW.UI
 *
 * Main jWidget UI library namespace.
 */
JW.UI = {
	/**
	 * Defines HTML templates for specified JW.UI.Component subclass.
	 * 
	 * You can define multiple templates for any subclass of JW.UI.Component. Each template has a name.
	 * You can get component template via JW.UI.Component.templates dictionary.
	 * 
	 * Templates are inherited together with component classes.
	 * 
	 * Each component class has at least one template, its name is `main`. This is the main template which is
	 * used to render the component. By default, `main` equals to `<div />`.
	 * Usually, `main` template is enough for the majority of components. This template is applied automatically,
	 * unlike other templates which should be applied manually.
	 * 
	 * JW.UI.template function is called automatically if you attach `jw.html` files via
	 * [jWidget SDK](https://github.com/enepomnyaschih/jwsdk/wiki/en). See
	 * [Getting started. Part 6. Project infrastructure](#!/guide/ensample6) for details.
	 *
	 * @static
	 * @param {Function} cls JW.UI.Component subclass.
	 * @param {Object} tpls Templates to add or override.
	 */
	template: function(cls, tpls) {
		if (cls.prototype.Templates && cls.prototype.Templates.componentCls == cls) {
			JW.apply(cls.prototype.Templates.prototype, tpls);
		} else {
			cls.prototype.Templates = (cls.superclass.Templates || JW.Class).extend(tpls);
			cls.prototype.Templates.componentCls = cls;
			cls.prototype.templates = new cls.prototype.Templates();
		}
	},
	
	/**
	 * Checks whether x is [jQuery element](http://api.jquery.com/).
	 * @static
	 * @param {Mixed} x
	 * @returns {boolean} Result.
	 */
	isElement: function(v) {
		return v instanceof jQuery.fn.init;
	},
	
	/**
	 * Calls `preventDefault` method for [jQuery event](http://api.jquery.com/category/events/event-object/).
	 * 
	 * Use this way:
	 * 
	 *     el.click(JW.UI.preventDefault);
	 * 
	 * Shorthand for
	 * 
	 *     el.click(JW.byMethod("preventDefault"));
	 * 
	 * and
	 * 
	 *     el.click(function(e) { e.preventDefault(); });
	 * 
	 * @static
	 * @param {Object} event jQuery event.
	 */
	preventDefault: function(event) {
		event.preventDefault();
	}
};

jQuery(function() {
	JW.UI.windowEl = jQuery(window);
	JW.UI.bodyEl   = jQuery(document.body);
});
