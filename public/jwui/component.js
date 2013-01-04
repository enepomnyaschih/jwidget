/*
	JW base UI component.
	
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

JW.UI.Component = JW.ObservableConfig.extend({
	plugins         : null,     // [optional] Array of JW.UI.Plugin
	cls             : null,     // [optional] String or Array of String
	visible         : true,     // [optional] Boolean
	childBox        : null,     // [optional] String
	html            : null,     // [optional] String
	
	// The next options correspond to addChild method specification
	renderParent    : null,     // [optional] JW.UI.Component
	renderPosition  : null,     // [optional] JW.UI.Component.AddConfig
	
	// The next options should be used for root components only
	renderTo        : null,     // [optional] jQuery element
	renderAs        : null,     // [optional] jQuery element
	
	el              : null,     // [readonly] jQuery element
	appended        : false,    // [readonly] Boolean
	
	plainChildren   : null,     // [readonly] Array of JW.UI.Component
	namedChildren   : null,     // [readonly] Map from string to JW.UI.Component
	freeChildren    : null,     // [readonly] Array of JW.UI.Component
	
	init: function(config)
	{
		this._super(config);
		
		this._initComponent();
		this._render();
	},
	
	destroy: function()
	{
		if (!this.el)
			return;
		
		this.remove();
		
		var plugins       = this.plugins;
		var plainChildren = this.plainChildren;
		var namedChildren = this.namedChildren;
		var freeChildren  = this.freeChildren;
		
		this.plugins = [];
		this.removeChildren();
		
		JW.eachByMethod(plugins,       "destroy");
		JW.eachByMethod(plainChildren, "destroy");
		JW.eachByMethod(namedChildren, "destroy");
		JW.eachByMethod(freeChildren,  "destroy");
		
		this.destroyComponent();
		
		if (this.el)
			this.el.remove();
		
		delete this.plugins;
		delete this.renderParent;
		delete this.renderTo;
		delete this.renderAs;
		delete this.el;
		delete this.plainChildren;
		delete this.namedChildren;
		delete this.freeChildren;
		
		this._super();
	},
	
	/**
	 * Component initialization.
	 * Override this to specify initial values for component properties.
	 * You can build plugins array here, these plugins will prepend ones from config object.
	 * Append superclass method call.
	 */
	initComponent: function()
	{
	},
	
	/**
	 * Component rendering.
	 * Override this to render component's HTML.
	 * Template is applied here and all elements are defined.
	 * You can customize elements' properties in this method and finish rendering.
	 * Prepend superclass method call.
	 */
	render: function()
	{
	},
	
	/**
	 * After append to DOM.
	 * Override this to specify any initialization actions that require element
	 * to be inserted into DOM.
	 * Use renderParent or addChild EVERYWHERE to get this work.
	 * Prepend superclass method call.
	 */
	afterAppend: function()
	{
	},
	
	/**
	 * Layout the component.
	 * Use renderParent or addChild EVERYWHERE to get this work.
	 * Prepend superclass method call.
	 */
	doLayout: function()
	{
	},
	
	/**
	 * Layout component totally.
	 */
	doLayoutAll: function()
	{
		if (!this.el || !this.el.parents("body").length)
			return;
		
		this.doLayout();
		JW.eachByMethod(this.plugins,       "doLayout");
		JW.eachByMethod(this.plainChildren, "doLayoutAll");
		JW.eachByMethod(this.namedChildren, "doLayoutAll");
		JW.eachByMethod(this.freeChildren,  "doLayoutAll");
	},
	
	/**
	 * Component destructor.
	 */
	destroyComponent: function()
	{
	},
	
	/**
	 * Get plugin instance by its xtype.
	 */
	getPlugin: function(xtype)
	{
		return JW.searchBy(this.plugins, "xtype", xtype);
	},
	
	/**
	 * Focus first element with "auto-focus" class.
	 */
	focus: function()
	{
		jQuery(this.el.find(".auto-focus")[0]).focus();
	},
	
	/**
	 * Returns jQuery element where children should be inserted by default.
	 */
	getChildBox: function()
	{
		if (!JW.isSet(this.childBox))
			return this.el;
		
		return this.getChildEl(this.childBox);
	},
	
	/**
	 * Add child. Opposite to appendTo.
	 */
	addChild: function(
		cmp,    // [required] JW.UI.Component
		config) // [optional] JW.UI.Component.AddConfig or Number or String or jQuery element
	{
		if (!JW.isSet(config))
			config = {};
		else if (typeof config === "number")
			config = { index : config };
		else if (typeof config === "string")
			config = { id : config };
		else if (JW.UI.isElement(config))
			config = { el : config };
		
		cmp.remove();
		
		if (config.id)
			this.restoreElement(config.id);
		
		var el = config.el || this.getChildEl(config.id);
		
		if (!config.index && !config.insert && el)
		{
			el.replaceBy(cmp.el);
			if (config.id)
				delete this[this.getChildElName(config.id)];
			
			if (config.id)
				this.namedChildren[config.id] = cmp;
			else
				this.freeChildren.push(cmp);
		}
		else
		{
			if (el)
			{
				if (JW.isSet(config.index))
					el.insert(cmp.el, config.index);
				else
					el.append(cmp.el);
				
				this.freeChildren.push(cmp);
			}
			else
			{
				var index = JW.defn(config.index, this.plainChildren.length);
				this.getChildBox().insert(cmp.el, index);
				this.plainChildren.splice(config.index, 0, cmp);
			}
		}
		
		cmp.parent = this;
		cmp._afterAppend();
	},
	
	/**
	 * Remove component from the parent and DOM.
	 */
	remove: function()
	{
		if (this.parent)
		{
			this.parent._removeChild(this);
			delete this.parent;
		}
		
		this.el.detach();
	},
	
	/**
	 * Remove all children.
	 */
	removeChildren: function()
	{
		var children = this.getChildren();
		JW.each(children, function(cmp) {
			delete cmp.parent;
			cmp.remove();
		}, this);
		
		this.plainChildren = [];
		this.namedChildren = {};
		this.freeChildren  = [];
		
		return children;
	},
	
	/**
	 * Replaces named child with empty element and returns one.
	 */
	restoreElement: function(id)
	{
		var elName = this.getChildElName(id);
		if (this[elName])
			return this[elName];
		
		var existingCmp = this.namedChildren[id];
		this[elName] = jQuery('<div class="' + this.getChildElClass(id) + '" />');
		existingCmp.el.after(this[elName]);
		existingCmp.remove();
		
		return this[elName];
	},
	
	/**
	 * Removes child at specified position and returns one.
	 */
	removeChild: function(index)
	{
		var cmp = this.plainChildren[index];
		this.plainChildren[index].remove();
		return cmp;
	},
	
	/**
	 * Removes element by id.
	 */
	removeEl: function(id)
	{
		var elName = this.getChildElName(id);
		if (!this[elName])
			return;
		
		this[elName].remove();
		delete this[elName];
	},
	
	/**
	 * Get all children.
	 */
	getChildren: function()
	{
		return this.plainChildren.concat(JW.getValuesArray(this.namedChildren), this.freeChildren);
	},
	
	/**
	 * Get named child.
	 */
	getChildEl: function(id)
	{
		if (!JW.isSet(id))
			return null;
		
		return this[this.getChildElName(id)];
	},
	
	/**
	 * Get named child name.
	 */
	getChildElName: function(id)
	{
		if (!JW.isSet(id))
			return "el";
		
		return JW.String.camel(id) + "El";
	},
	
	/**
	 * Get named child CSS class.
	 */
	getChildElClass: function(id)
	{
		return JW.map(JW.filter([ this.jwClass, id ], JW.isSet), JW.String.hyphen).join("-");
	},
	
	_initComponent: function()
	{
		var cls = JW.makeArray(this.cls);
		this.cls = [];
		
		var plugins = this.plugins || [];
		this.plugins = [];
		
		this.plainChildren = [];
		this.namedChildren = {};
		this.freeChildren  = [];
		
		this.initComponent();
		
		this.cls = JW.makeArray(this.cls).concat(cls);
		
		this.plugins = this.plugins.concat(plugins);
		for (var i = 0; i < this.plugins.length; ++i)
			this.plugins[i].attach(this);
	},
	
	_render: function()
	{
		this._applyTemplate();
		
		this.render();
		for (var i = 0; i < this.plugins.length; ++i)
			this.plugins[i].render();
		
		this._applyRenderTo();
	},
	
	_applyTemplate: function()
	{
		this.el = jQuery(this.html || this.templates.main);
		this.el.addClass(this.cls.join(" "));
		
		if (!this.visible)
			this.el.hide();
		
		this.jwClass = this.el.attr("jwclass");
		if (this.jwClass)
		{
			this.el.removeAttr("jwclass");
			this.el.addClass(this.jwClass);
		}
		
		var anchorEls = this.el.find("[jwid]");
		for (var i = 0; i < anchorEls.length; ++i)
		{
			var anchorEl = jQuery(anchorEls[i]);
			var jwId = anchorEl.attr("jwid");
			this[JW.String.camel(jwId) + "El"] = anchorEl;
			anchorEl.removeAttr("jwid");
			anchorEl.addClass(this.getChildElClass(jwId));
		}
	},
	
	_applyRenderTo: function()
	{
		if (this.renderParent)
			this.renderParent.addChild(this, this.renderPosition);
		
		if (this.renderTo)
			jQuery(this.renderTo).insert(this.el);
		
		if (this.renderAs)
			jQuery(this.renderAs).replaceBy(this.el);
		
		this._afterAppend();
	},
	
	_afterAppend: function()
	{
		if (this.appended || !this.el)
			return;
		
		if (this.parent && !this.parent.appended)
			return;
		
		if (!this.parent && !this.el.parents("body").length)
			return;
		
		this.appended = true;
		this.afterAppend();
		JW.eachByMethod(this.plainChildren, "_afterAppend");
		JW.eachByMethod(this.namedChildren, "_afterAppend");
		JW.eachByMethod(this.freeChildren,  "_afterAppend");
		JW.eachByMethod(this.plugins,        "afterAppend");
		
		this.doLayoutAll();
	},
	
	_removeChild: function(cmp)
	{
		JW.Array.removeItem(this.plainChildren, cmp);
		JW.Array.removeItem(this.freeChildren,  cmp);
		
		var namedChildren = JW.apply({}, this.namedChildren);
		for (var i in namedChildren)
		{
			if (namedChildren[i] == cmp)
				delete this.namedChildren[i];
		}
	}
});

JW.UI.template(JW.UI.Component, {
	main: '<div />'
});
