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
	this._childrenCreated = !config.children;
	this.children = config.children || new JW.ObservableMap();
	this.parent = null;
	this.el = null;
	this.wasAfterAppend = false;
	this.destroyed = false;
	this._elements = {};
	this.allChildren = new JW.ObservableSet();
	this._childMapper = null;
	this._observableArrays = [];
},

JW.extend(JW.UI.Component, JW.Class, {
	/*
	Optional
	String rootClass;
	String template;
	JW.ObservableMap<JW.UI.Component> children; // named children
	
	Fields
	Boolean _childrenCreated;
	JW.UI.Component parent;
	Element el;
	Boolean wasAfterAppend;
	Boolean destroyed;
	Map<Element> _elements;
	JW.ObservableSet<JW.UI.Component> allChildren; // children + (arrays' contents)
	JW.ObservableMap.Mapper<JW.UI.Component, JW.UI.Component.Child> _childMapper;
	Array<JW.UI.Component.ObservableArray> _observableArrays;
	*/
	
	destroy: function() {
		if (this.destroyed) {
			return;
		}
		this.destroyed = true;
		if (this.el) {
			this.el.remove();
			this.destroyComponent();
			this._childMapper.destroy();
		}
		this.allChildren.eachByMethod("destroy");
		JW.Array.eachByMethod(this._observableArrays, "destroy");
		this.allChildren.destroy();
		if (this._childrenCreated) {
			this.children.destroy();
		}
		this._observableArrays = null;
		this._childMapper = null;
		this.allChildren = null;
		this.children = null;
		this.parent = null;
		this._elements = null;
		this.el = null;
		this._super();
	},
	
	renderComponent: function() {},
	
	afterAppend: function() {},
	
	destroyComponent: function() {},
	
	render: function() {
		if (this.el) {
			return;
		}
		this.el = jQuery(this.template || this.templates.main);
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
		this._childMapper = new JW.ObservableMap.Mapper({
			source      : this.children,
			createItem  : function(child, name) { return new JW.UI.Component.Child(this, child, name); },
			destroyItem : function(componentChild) { componentChild.destroy(); },
			scope       : this
		});
		this.renderComponent();
		for (var jwId in this._elements) {
			var anchorEl = this._elements[jwId];
			var jwIdCamel = JW.String.camel(jwId);
			var renderMethodName = "render" + JW.String.capitalize(jwIdCamel);
			if (typeof this[renderMethodName] === "function") {
				this.children.set(this[renderMethodName].call(this), jwId);
			}
		}
	},
	
	renderTo: function(el) {
		this.render();
		jQuery(el).insert(this.el);
		this._afterAppend();
	},
	
	renderAs: function(el) {
		this.render();
		jQuery(el).replaceBy(this.el);
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
		el = this._getElement(el);
		for (var i = 0, l = source.length; i < l; ++i) {
			var component = source[i];
			this._initChild(component);
			el.append(component.el);
			component._afterAppend();
		}
	},
	
	addObservableArray: function(source, el) {
		this._observableArrays.push(new JW.UI.Component.ObservableArray(this, source, this._getElement(el)));
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
		this.allChildren.eachByMethod("_afterAppend");
	},
	
	_initChild: function(component) {
		component.render();
		component.parent = this;
		this.allChildren.add(component);
	},
	
	_doneChild: function(component) {
		this.allChildren.remove(component);
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
