/*!
	jWidget UI 0.3.1
	
	https://github.com/enepomnyaschih/jwui
	
	Copyright (C) 2012 Egor Nepomnyaschih
	
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

JW.ns("JW.UI");

JW.apply(JW.UI, {
	/**
	 * Templates definition.
	 * Use this function to build HTML templates for this component.
	 * Defined templates can be accessed as this.templates.<name>
	 */
	template: function(cls, tpls)
	{
		if (cls.prototype.Templates && cls.prototype.Templates.componentCls == cls)
		{
			JW.apply(cls.prototype.Templates.prototype, tpls);
		}
		else
		{
			cls.prototype.Templates = (cls.superclass.Templates || JW.Class).extend(tpls);
			cls.prototype.Templates.componentCls = cls;
			cls.prototype.templates = new cls.prototype.Templates();
		}
	},
	
	/**
	 * Test whether variable is jQuery element.
	 */
	isElement: function(v)
	{
		return v instanceof jQuery.fn.init;
	}
});

/**
 * Global JW.UI.windowEl and JW.UI.bodyEl variables definition.
 */
jQuery(function() {
	JW.UI.windowEl = jQuery(window);
	JW.UI.bodyEl   = jQuery(document.body);
});
