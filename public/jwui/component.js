/*
	jWidget UI source file.
	
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

JW.UI.Component = function(config) {
	JW.UI.Component._super.call(this);
	config = config || {};
	this.rootClass = config.rootClass;
	this.template = config.template;
	this.parent = null;
	this.wasAfterAppend = false;
	this.destroyed = false;
	this.el = null;
	this.replacedEl = null;
	this.children = null;
	this.allChildren = null;
	this._elements = null;
	this._childMapper = null;
	this._arrays = null;
},

JW.extend(JW.UI.Component, JW.Class, {
	/*
	Optional
	String rootClass;
	String template;
	
	Fields
	JW.UI.Component parent;
	Boolean wasAfterAppend;
	Boolean destroyed;
	
	Fields (rendering)
	Element el;
	Element replacedEl;
	JW.ObservableMap<JW.UI.Component> children; // named children
	Set<JW.UI.Component> allChildren; // children + (arrays' contents)
	Map<Element> _elements;
	JW.ObservableMap.Mapper<JW.UI.Component, JW.UI.Component.Child> _childMapper;
	Set<JW.UI.Component.Array> _arrays;
	*/
	
	destroy: function() {
		if (this.parent) {
			throw new Error("JW.UI.Component.destroy must be used for root and detached components only");
		}
		if (this.destroyed) {
			return;
		}
		this.destroyed = true;
		if (this.el) {
			this.el.remove();
			JW.Set.eachByMethod(this._arrays, "destroy");
			this._arrays = null;
			
			this.destroyComponent();
			
			this._childMapper.destroy();
			this._childMapper = null;
			this.children.eachByMethod("destroy");
			this.children.destroy();
			this.children = null;
		}
		this.allChildren = null;
		this._elements = null;
		this.el = null;
		this._super();
	},
	
	beforeRender: function() {},
	
	renderComponent: function() {},
	
	afterAppend: function() {},
	
	destroyComponent: function() {},
	
	render: function(replacedEl) {
		if (this.el) {
			return;
		}
		this.replacedEl = replacedEl;
		this.el = jQuery(this.template || this.templates.main);
		this._elements = {};
		this.allChildren = {};
		this.children = new JW.ObservableMap();
		this._arrays = {};
		this.rootClass = this.rootClass || this.el.attr("jwclass");
		if (this.rootClass) {
			this.el.removeAttr("jwclass");
			this.el.addClass(this.rootClass);
		}
		var anchorEls = this.el.find("[jwid]");
		for (var i = 0; i < anchorEls.length; ++i) {
			var anchorEl = jQuery(anchorEls[i]);
			var jwId = anchorEl.attr("jwid");
			this._elements[jwId] = anchorEl;
			anchorEl.removeAttr("jwid");
			anchorEl.addClass(this.getElementClass(jwId));
		}
		this._childMapper = this.children.createMapper({
			source      : this.children,
			createItem  : function(child, name) { return new JW.UI.Component.Child(this, child, name); },
			destroyItem : function(componentChild) { componentChild.destroy(); },
			scope       : this
		});
		this.beforeRender();
		var elements = JW.apply({}, this._elements);
		for (var jwId in elements) {
			var anchorEl = elements[jwId];
			var jwIdCamel = JW.String.camel(jwId);
			var renderMethodName = "render" + JW.String.capitalize(jwIdCamel);
			if (typeof this[renderMethodName] === "function") {
				var result = this[renderMethodName](anchorEl);
				if (result instanceof JW.UI.Component) {
					this.children.set(result, jwId);
				} else if ((result instanceof JW.Array) || (result instanceof JW.ObservableArray)) {
					this.addArray(result, jwId);
				} else if (result === false) {
					this.removeElement(jwId);
				}
			}
		}
		this.renderComponent();
	},
	
	renderTo: function(el) {
		this.render();
		jQuery(el).insert(this.el);
		this._afterAppend();
	},
	
	renderAs: function(el) {
		this.render(el);
		jQuery(el).replaceBy(this.el, true);
		this._afterAppend();
	},
	
	remove: function() {
		if (this.parent) {
			throw new Error("JW.UI.Component.remove must be used for root components only");
		}
		this.el.detach();
	},
	
	getElement: function(id) {
		return this._elements[id];
	},
	
	setElement: function(el, id) {
		this._elements[id] = el;
	},
	
	getElementClass: function(id) {
		return JW.Array.map(JW.Array.filter([ this.rootClass, id ], JW.isSet), JW.String.hyphen).join("-");
	},
	
	removeElement: function(id) {
		var el = this._elements[id];
		if (!el) {
			return;
		}
		el.remove();
		delete this._elements[id];
	},
	
	addArray: function(source, el) {
		return new JW.UI.Component.Array(this, source, this._getElement(el));
	},
	
	_afterAppend: function() {
		if (this.wasAfterAppend || !this.el) {
			return;
		}
		if (this.parent && !this.parent.wasAfterAppend) {
			return;
		}
		if (!this.parent && !this.el.parents("body").length) {
			return;
		}
		this.wasAfterAppend = true;
		this.afterAppend();
		JW.Set.eachByMethod(this.allChildren, "_afterAppend");
	},
	
	_initChild: function(component, replacedEl) {
		component.render(replacedEl);
		component.parent = this;
		JW.Set.add(this.allChildren, component);
	},
	
	_doneChild: function(component) {
		JW.Set.remove(this.allChildren, component);
		component.parent = null;
	},
	
	_getElement: function(el) {
		return (typeof el === "string") ? this.getElement(el) : (el || this.el);
	}
});

JW.UI.template(JW.UI.Component, {
	main: '<div />'
});

JW.UI.Component.EventParams = function(sender) {
	JW.UI.Component.EventParams._super.call(this, sender);
};

JW.extend(JW.UI.Component.EventParams, JW.EventParams, {
	/*
	Fields
	JW.UI.Component sender;
	*/
});
